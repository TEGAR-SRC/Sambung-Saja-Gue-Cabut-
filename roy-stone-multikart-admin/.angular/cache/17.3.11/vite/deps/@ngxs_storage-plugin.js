import {
  InitState,
  NGXS_PLUGINS,
  StateToken,
  UpdateState,
  actionMatcher,
  getValue,
  setValue
} from "./chunk-SLJTJLER.js";
import {
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-GY65V5CF.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-LVVQT43K.js";
import "./chunk-INSCHJF3.js";
import "./chunk-6FQGPHO4.js";
import {
  tap
} from "./chunk-LVRZVOCT.js";
import "./chunk-W44PFRPX.js";
import "./chunk-ASLTLD6L.js";

// node_modules/@ngxs/storage-plugin/fesm2015/ngxs-storage-plugin.js
var NG_DEV_MODE$4 = typeof ngDevMode === "undefined" || ngDevMode;
var NGXS_STORAGE_PLUGIN_OPTIONS = new InjectionToken(NG_DEV_MODE$4 ? "NGXS_STORAGE_PLUGIN_OPTIONS" : "");
var STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE$4 ? "STORAGE_ENGINE" : "");
var DEFAULT_STATE_KEY = "@@STATE";
function storageOptionsFactory(options) {
  return Object.assign({
    key: [DEFAULT_STATE_KEY],
    storage: 0,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    beforeSerialize: (obj) => obj,
    afterDeserialize: (obj) => obj
  }, options);
}
function engineFactory(options, platformId) {
  if (isPlatformServer(platformId)) {
    return null;
  }
  if (options.storage === 0) {
    return localStorage;
  } else if (options.storage === 1) {
    return sessionStorage;
  }
  return null;
}
function getStorageKey(key, options) {
  return options && options.namespace ? `${options.namespace}:${key}` : key;
}
function isKeyWithExplicitEngine(key) {
  return key != null && !!key.engine;
}
var META_OPTIONS_KEY = "NGXS_OPTIONS_META";
function exctractStringKey(storageKey) {
  if (isKeyWithExplicitEngine(storageKey)) {
    storageKey = storageKey.key;
  }
  if (storageKey.hasOwnProperty(META_OPTIONS_KEY)) {
    storageKey = storageKey[META_OPTIONS_KEY].name;
  }
  return storageKey instanceof StateToken ? storageKey.getName() : storageKey;
}
var NG_DEV_MODE$3 = typeof ngDevMode === "undefined" || ngDevMode;
var FINAL_NGXS_STORAGE_PLUGIN_OPTIONS = new InjectionToken(NG_DEV_MODE$3 ? "FINAL_NGXS_STORAGE_PLUGIN_OPTIONS" : "");
function createFinalStoragePluginOptions(injector, options) {
  const storageKeys = Array.isArray(options.key) ? options.key : [options.key];
  const keysWithEngines = storageKeys.map((storageKey) => {
    const key = exctractStringKey(storageKey);
    const engine = isKeyWithExplicitEngine(storageKey) ? injector.get(storageKey.engine) : injector.get(STORAGE_ENGINE);
    return {
      key,
      engine
    };
  });
  return Object.assign(Object.assign({}, options), {
    keysWithEngines
  });
}
var NG_DEV_MODE$2 = typeof ngDevMode === "undefined" || ngDevMode;
var NgxsStoragePlugin = class {
  constructor(_options, _platformId) {
    this._options = _options;
    this._platformId = _platformId;
    this._keysWithEngines = this._options.keysWithEngines;
    this._usesDefaultStateKey = this._keysWithEngines.length === 1 && this._keysWithEngines[0].key === DEFAULT_STATE_KEY;
  }
  handle(state, event, next) {
    var _a;
    if (isPlatformServer(this._platformId)) {
      return next(state, event);
    }
    const matches = actionMatcher(event);
    const isInitAction = matches(InitState);
    const isUpdateAction = matches(UpdateState);
    const isInitOrUpdateAction = isInitAction || isUpdateAction;
    let hasMigration = false;
    if (isInitOrUpdateAction) {
      const addedStates = isUpdateAction && event.addedStates;
      for (const {
        key,
        engine
      } of this._keysWithEngines) {
        if (!this._usesDefaultStateKey && addedStates) {
          const dotNotationIndex = key.indexOf(DOT);
          const stateName = dotNotationIndex > -1 ? key.slice(0, dotNotationIndex) : key;
          if (!addedStates.hasOwnProperty(stateName)) {
            continue;
          }
        }
        const storageKey = getStorageKey(key, this._options);
        let storedValue = engine.getItem(storageKey);
        if (storedValue !== "undefined" && storedValue != null) {
          try {
            const newVal = this._options.deserialize(storedValue);
            storedValue = this._options.afterDeserialize(newVal, key);
          } catch (_b) {
            if (NG_DEV_MODE$2) {
              console.error(`Error ocurred while deserializing the ${storageKey} store value, falling back to empty object, the value obtained from the store: `, storedValue);
            }
            storedValue = {};
          }
          (_a = this._options.migrations) === null || _a === void 0 ? void 0 : _a.forEach((strategy) => {
            const versionMatch = strategy.version === getValue(storedValue, strategy.versionKey || "version");
            const keyMatch = !strategy.key && this._usesDefaultStateKey || strategy.key === key;
            if (versionMatch && keyMatch) {
              storedValue = strategy.migrate(storedValue);
              hasMigration = true;
            }
          });
          if (!this._usesDefaultStateKey) {
            state = setValue(state, key, storedValue);
          } else {
            if (storedValue && addedStates && Object.keys(addedStates).length > 0) {
              storedValue = Object.keys(addedStates).reduce((accumulator, addedState) => {
                if (storedValue.hasOwnProperty(addedState)) {
                  accumulator[addedState] = storedValue[addedState];
                }
                return accumulator;
              }, {});
            }
            state = Object.assign(Object.assign({}, state), storedValue);
          }
        }
      }
    }
    return next(state, event).pipe(tap((nextState) => {
      if (isInitOrUpdateAction && !hasMigration) {
        return;
      }
      for (const {
        key,
        engine
      } of this._keysWithEngines) {
        let storedValue = nextState;
        const storageKey = getStorageKey(key, this._options);
        if (key !== DEFAULT_STATE_KEY) {
          storedValue = getValue(nextState, key);
        }
        try {
          const newStoredValue = this._options.beforeSerialize(storedValue, key);
          engine.setItem(storageKey, this._options.serialize(newStoredValue));
        } catch (error) {
          if (NG_DEV_MODE$2) {
            if (error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
              console.error(`The ${storageKey} store value exceeds the browser storage quota: `, storedValue);
            } else {
              console.error(`Error ocurred while serializing the ${storageKey} store value, value not updated, the value obtained from the store: `, storedValue);
            }
          }
        }
      }
    }));
  }
};
NgxsStoragePlugin.ɵfac = function NgxsStoragePlugin_Factory(t) {
  return new (t || NgxsStoragePlugin)(ɵɵinject(FINAL_NGXS_STORAGE_PLUGIN_OPTIONS), ɵɵinject(PLATFORM_ID));
};
NgxsStoragePlugin.ɵprov = ɵɵdefineInjectable({
  token: NgxsStoragePlugin,
  factory: NgxsStoragePlugin.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePlugin, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [FINAL_NGXS_STORAGE_PLUGIN_OPTIONS]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, null);
})();
var DOT = ".";
var NG_DEV_MODE$1 = typeof ngDevMode === "undefined" || ngDevMode;
var USER_OPTIONS = new InjectionToken(NG_DEV_MODE$1 ? "USER_OPTIONS" : "");
var NgxsStoragePluginModule = class _NgxsStoragePluginModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsStoragePluginModule,
      providers: [{
        provide: NGXS_PLUGINS,
        useClass: NgxsStoragePlugin,
        multi: true
      }, {
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: NGXS_STORAGE_PLUGIN_OPTIONS,
        useFactory: storageOptionsFactory,
        deps: [USER_OPTIONS]
      }, {
        provide: STORAGE_ENGINE,
        useFactory: engineFactory,
        deps: [NGXS_STORAGE_PLUGIN_OPTIONS, PLATFORM_ID]
      }, {
        provide: FINAL_NGXS_STORAGE_PLUGIN_OPTIONS,
        useFactory: createFinalStoragePluginOptions,
        deps: [Injector, NGXS_STORAGE_PLUGIN_OPTIONS]
      }]
    };
  }
};
NgxsStoragePluginModule.ɵfac = function NgxsStoragePluginModule_Factory(t) {
  return new (t || NgxsStoragePluginModule)();
};
NgxsStoragePluginModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsStoragePluginModule
});
NgxsStoragePluginModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePluginModule, [{
    type: NgModule
  }], null, null);
})();
var NG_DEV_MODE = typeof ngDevMode === "undefined" || ngDevMode;
var LOCAL_STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE ? "LOCAL_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? localStorage : null
});
var SESSION_STORAGE_ENGINE = new InjectionToken(NG_DEV_MODE ? "SESSION_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? sessionStorage : null
});
export {
  LOCAL_STORAGE_ENGINE,
  NGXS_STORAGE_PLUGIN_OPTIONS,
  NgxsStoragePlugin,
  NgxsStoragePluginModule,
  SESSION_STORAGE_ENGINE,
  STORAGE_ENGINE
};
//# sourceMappingURL=@ngxs_storage-plugin.js.map
