import {
  isPlatformServer
} from "./chunk-GY65V5CF.js";
import {
  APP_BOOTSTRAP_LISTENER,
  ErrorHandler,
  INJECTOR$1,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  SkipSelf,
  _global,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-LVVQT43K.js";
import {
  forkJoin,
  isObservable
} from "./chunk-INSCHJF3.js";
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  defaultIfEmpty,
  distinctUntilChanged,
  exhaustMap,
  filter,
  from,
  map,
  mergeMap,
  of,
  pairwise,
  share,
  shareReplay,
  startWith,
  take,
  takeUntil,
  tap,
  throwError
} from "./chunk-LVRZVOCT.js";

// node_modules/@ngxs/store/fesm2015/ngxs-store-internals.js
var NgxsBootstrapper = class {
  constructor() {
    this.bootstrap$ = new ReplaySubject(1);
  }
  get appBootstrapped$() {
    return this.bootstrap$.asObservable();
  }
  /**
   * This event will be emitted after attaching `ComponentRef` of the root component
   * to the tree of views, that's a signal that application has been fully rendered
   */
  bootstrap() {
    this.bootstrap$.next(true);
    this.bootstrap$.complete();
  }
};
NgxsBootstrapper.ɵfac = function NgxsBootstrapper_Factory(t) {
  return new (t || NgxsBootstrapper)();
};
NgxsBootstrapper.ɵprov = ɵɵdefineInjectable({
  token: NgxsBootstrapper,
  factory: NgxsBootstrapper.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsBootstrapper, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function defaultEqualityCheck(a, b) {
  return a === b;
}
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }
  return true;
}
function memoize(func, equalityCheck = defaultEqualityCheck) {
  let lastArgs = null;
  let lastResult = null;
  function memoized() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      lastResult = func.apply(null, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  }
  memoized.reset = function() {
    lastArgs = null;
    lastResult = null;
  };
  return memoized;
}
var InitialState = class {
  static set(state) {
    this._value = state;
  }
  static pop() {
    const state = this._value;
    this._value = {};
    return state;
  }
};
InitialState._value = {};
var INITIAL_STATE_TOKEN = new InjectionToken("INITIAL_STATE_TOKEN", {
  providedIn: "root",
  factory: () => InitialState.pop()
});
var ɵNGXS_STATE_FACTORY = new InjectionToken("ɵNGXS_STATE_FACTORY");
var ɵNGXS_STATE_CONTEXT_FACTORY = new InjectionToken("ɵNGXS_STATE_CONTEXT_FACTORY");

// node_modules/@ngxs/store/fesm2015/ngxs-store-operators.js
function isStateOperator(value) {
  return typeof value === "function";
}

// node_modules/@ngxs/store/fesm2015/ngxs-store.js
function getActionTypeFromInstance(action) {
  if (action.constructor && action.constructor.type) {
    return action.constructor.type;
  } else {
    return action.type;
  }
}
function actionMatcher(action1) {
  const type1 = getActionTypeFromInstance(action1);
  return function(action2) {
    return type1 === getActionTypeFromInstance(action2);
  };
}
var setValue = (obj, prop, val) => {
  obj = Object.assign({}, obj);
  const split = prop.split(".");
  const lastIndex = split.length - 1;
  split.reduce((acc, part, index) => {
    if (index === lastIndex) {
      acc[part] = val;
    } else {
      acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : Object.assign({}, acc[part]);
    }
    return acc && acc[part];
  }, obj);
  return obj;
};
var getValue = (obj, prop) => prop.split(".").reduce((acc, part) => acc && acc[part], obj);
var isObject$1 = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};
var mergeDeep = (base, ...sources) => {
  if (!sources.length)
    return base;
  const source = sources.shift();
  if (isObject$1(base) && isObject$1(source)) {
    for (const key in source) {
      if (isObject$1(source[key])) {
        if (!base[key])
          Object.assign(base, {
            [key]: {}
          });
        mergeDeep(base[key], source[key]);
      } else {
        Object.assign(base, {
          [key]: source[key]
        });
      }
    }
  }
  return mergeDeep(base, ...sources);
};
function throwStateNameError(name) {
  throw new Error(`${name} is not a valid state name. It needs to be a valid object property name.`);
}
function throwStateNamePropertyError() {
  throw new Error(`States must register a 'name' property.`);
}
function throwStateUniqueError(current, newName, oldName) {
  throw new Error(`State name '${current}' from ${newName} already exists in ${oldName}.`);
}
function throwStateDecoratorError(name) {
  throw new Error(`States must be decorated with @State() decorator, but "${name}" isn't.`);
}
function throwActionDecoratorError() {
  throw new Error("@Action() decorator cannot be used with static methods.");
}
function throwSelectorDecoratorError() {
  throw new Error("Selectors only work on methods.");
}
function getZoneWarningMessage() {
  return "Your application was bootstrapped with nooped zone and your execution strategy requires an actual NgZone!\nPlease set the value of the executionStrategy property to NoopNgxsExecutionStrategy.\nNgxsModule.forRoot(states, { executionStrategy: NoopNgxsExecutionStrategy })";
}
function getUndecoratedStateInIvyWarningMessage(name) {
  return `'${name}' class should be decorated with @Injectable() right after the @State() decorator`;
}
function throwSelectFactoryNotConnectedError() {
  throw new Error("You have forgotten to import the NGXS module!");
}
function throwPatchingArrayError() {
  throw new Error("Patching arrays is not supported.");
}
function throwPatchingPrimitiveError() {
  throw new Error("Patching primitives is not supported.");
}
var DispatchOutsideZoneNgxsExecutionStrategy = class {
  constructor(_ngZone, _platformId) {
    this._ngZone = _ngZone;
    this._platformId = _platformId;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      verifyZoneIsNotNooped(_ngZone);
    }
  }
  enter(func) {
    if (isPlatformServer(this._platformId)) {
      return this.runInsideAngular(func);
    }
    return this.runOutsideAngular(func);
  }
  leave(func) {
    return this.runInsideAngular(func);
  }
  runInsideAngular(func) {
    if (NgZone.isInAngularZone()) {
      return func();
    }
    return this._ngZone.run(func);
  }
  runOutsideAngular(func) {
    if (NgZone.isInAngularZone()) {
      return this._ngZone.runOutsideAngular(func);
    }
    return func();
  }
};
DispatchOutsideZoneNgxsExecutionStrategy.ɵfac = function DispatchOutsideZoneNgxsExecutionStrategy_Factory(t) {
  return new (t || DispatchOutsideZoneNgxsExecutionStrategy)(ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID));
};
DispatchOutsideZoneNgxsExecutionStrategy.ɵprov = ɵɵdefineInjectable({
  token: DispatchOutsideZoneNgxsExecutionStrategy,
  factory: DispatchOutsideZoneNgxsExecutionStrategy.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DispatchOutsideZoneNgxsExecutionStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: NgZone
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, null);
})();
function verifyZoneIsNotNooped(ngZone) {
  if (ngZone instanceof NgZone) {
    return;
  }
  console.warn(getZoneWarningMessage());
}
var ROOT_OPTIONS = new InjectionToken("ROOT_OPTIONS");
var ROOT_STATE_TOKEN = new InjectionToken("ROOT_STATE_TOKEN");
var FEATURE_STATE_TOKEN = new InjectionToken("FEATURE_STATE_TOKEN");
var NGXS_PLUGINS = new InjectionToken("NGXS_PLUGINS");
var META_KEY = "NGXS_META";
var META_OPTIONS_KEY = "NGXS_OPTIONS_META";
var SELECTOR_META_KEY = "NGXS_SELECTOR_META";
var NgxsConfig = class {
  constructor() {
    this.defaultsState = {};
    this.selectorOptions = {
      injectContainerState: true,
      suppressErrors: true
      // TODO: default is true in v3, will change in v4
    };
    this.compatibility = {
      strictContentSecurityPolicy: false
    };
    this.executionStrategy = DispatchOutsideZoneNgxsExecutionStrategy;
  }
};
NgxsConfig.ɵfac = function NgxsConfig_Factory(t) {
  return new (t || NgxsConfig)();
};
NgxsConfig.ɵprov = ɵɵdefineInjectable({
  token: NgxsConfig,
  factory: function NgxsConfig_Factory2(t) {
    let r = null;
    if (t) {
      r = new t();
    } else {
      r = ((options) => mergeDeep(new NgxsConfig(), options))(ɵɵinject(ROOT_OPTIONS));
    }
    return r;
  },
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: (options) => mergeDeep(new NgxsConfig(), options),
      deps: [ROOT_OPTIONS]
    }]
  }], function() {
    return [];
  }, null);
})();
var NgxsSimpleChange = class {
  constructor(previousValue, currentValue, firstChange) {
    this.previousValue = previousValue;
    this.currentValue = currentValue;
    this.firstChange = firstChange;
  }
};
var NoopNgxsExecutionStrategy = class {
  enter(func) {
    return func();
  }
  leave(func) {
    return func();
  }
};
NoopNgxsExecutionStrategy.ɵfac = function NoopNgxsExecutionStrategy_Factory(t) {
  return new (t || NoopNgxsExecutionStrategy)();
};
NoopNgxsExecutionStrategy.ɵprov = ɵɵdefineInjectable({
  token: NoopNgxsExecutionStrategy,
  factory: NoopNgxsExecutionStrategy.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopNgxsExecutionStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var USER_PROVIDED_NGXS_EXECUTION_STRATEGY = new InjectionToken("USER_PROVIDED_NGXS_EXECUTION_STRATEGY");
var NGXS_EXECUTION_STRATEGY = new InjectionToken("NGXS_EXECUTION_STRATEGY", {
  providedIn: "root",
  factory: () => {
    const injector = inject(INJECTOR$1);
    const executionStrategy = injector.get(USER_PROVIDED_NGXS_EXECUTION_STRATEGY);
    return executionStrategy ? injector.get(executionStrategy) : injector.get(typeof _global.Zone !== "undefined" ? DispatchOutsideZoneNgxsExecutionStrategy : NoopNgxsExecutionStrategy);
  }
});
function ensureStoreMetadata$1(target) {
  if (!target.hasOwnProperty(META_KEY)) {
    const defaultMetadata = {
      name: null,
      actions: {},
      defaults: {},
      path: null,
      makeRootSelector(context) {
        return context.getStateGetter(defaultMetadata.name);
      },
      children: []
    };
    Object.defineProperty(target, META_KEY, {
      value: defaultMetadata
    });
  }
  return getStoreMetadata$1(target);
}
function getStoreMetadata$1(target) {
  return target[META_KEY];
}
function ensureSelectorMetadata$1(target) {
  if (!target.hasOwnProperty(SELECTOR_META_KEY)) {
    const defaultMetadata = {
      makeRootSelector: null,
      originalFn: null,
      containerClass: null,
      selectorName: null,
      getSelectorOptions: () => ({})
    };
    Object.defineProperty(target, SELECTOR_META_KEY, {
      value: defaultMetadata
    });
  }
  return getSelectorMetadata$1(target);
}
function getSelectorMetadata$1(target) {
  return target[SELECTOR_META_KEY];
}
function compliantPropGetter(paths) {
  const copyOfPaths = paths.slice();
  return (obj) => copyOfPaths.reduce((acc, part) => acc && acc[part], obj);
}
function fastPropGetter(paths) {
  const segments = paths;
  let seg = "store." + segments[0];
  let i = 0;
  const l = segments.length;
  let expr = seg;
  while (++i < l) {
    expr = expr + " && " + (seg = seg + "." + segments[i]);
  }
  const fn = new Function("store", "return " + expr + ";");
  return fn;
}
function propGetter(paths, config) {
  if (config && config.compatibility && config.compatibility.strictContentSecurityPolicy) {
    return compliantPropGetter(paths);
  } else {
    return fastPropGetter(paths);
  }
}
function buildGraph(stateClasses) {
  const findName = (stateClass) => {
    const meta = stateClasses.find((g) => g === stateClass);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !meta) {
      throw new Error(`Child state not found: ${stateClass}. \r
You may have forgotten to add states to module`);
    }
    return meta[META_KEY].name;
  };
  return stateClasses.reduce((result, stateClass) => {
    const {
      name,
      children
    } = stateClass[META_KEY];
    result[name] = (children || []).map(findName);
    return result;
  }, {});
}
function nameToState(states) {
  return states.reduce((result, stateClass) => {
    const meta = stateClass[META_KEY];
    result[meta.name] = stateClass;
    return result;
  }, {});
}
function findFullParentPath(obj, newObj = {}) {
  const visit = (child, keyToFind) => {
    for (const key in child) {
      if (child.hasOwnProperty(key) && child[key].indexOf(keyToFind) >= 0) {
        const parent = visit(child, key);
        return parent !== null ? `${parent}.${key}` : key;
      }
    }
    return null;
  };
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const parent = visit(obj, key);
      newObj[key] = parent ? `${parent}.${key}` : key;
    }
  }
  return newObj;
}
function topologicalSort(graph) {
  const sorted = [];
  const visited = {};
  const visit = (name, ancestors = []) => {
    if (!Array.isArray(ancestors)) {
      ancestors = [];
    }
    ancestors.push(name);
    visited[name] = true;
    graph[name].forEach((dep) => {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && ancestors.indexOf(dep) >= 0) {
        throw new Error(`Circular dependency '${dep}' is required by '${name}': ${ancestors.join(" -> ")}`);
      }
      if (visited[dep]) {
        return;
      }
      visit(dep, ancestors.slice(0));
    });
    if (sorted.indexOf(name) < 0) {
      sorted.push(name);
    }
  };
  Object.keys(graph).forEach((k) => visit(k));
  return sorted.reverse();
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null || typeof obj === "function";
}
function ofAction(...allowedTypes) {
  return ofActionOperator(allowedTypes);
}
function ofActionDispatched(...allowedTypes) {
  return ofActionOperator(allowedTypes, [
    "DISPATCHED"
    /* Dispatched */
  ]);
}
function ofActionSuccessful(...allowedTypes) {
  return ofActionOperator(allowedTypes, [
    "SUCCESSFUL"
    /* Successful */
  ]);
}
function ofActionCanceled(...allowedTypes) {
  return ofActionOperator(allowedTypes, [
    "CANCELED"
    /* Canceled */
  ]);
}
function ofActionCompleted(...allowedTypes) {
  const allowedStatuses = [
    "SUCCESSFUL",
    "CANCELED",
    "ERRORED"
    /* Errored */
  ];
  return ofActionOperator(allowedTypes, allowedStatuses, mapActionResult);
}
function ofActionErrored(...allowedTypes) {
  return ofActionOperator(allowedTypes, [
    "ERRORED"
    /* Errored */
  ]);
}
function ofActionOperator(allowedTypes, statuses, mapOperator = mapAction) {
  const allowedMap = createAllowedActionTypesMap(allowedTypes);
  const allowedStatusMap = statuses && createAllowedStatusesMap(statuses);
  return function(o) {
    return o.pipe(filterStatus(allowedMap, allowedStatusMap), mapOperator());
  };
}
function filterStatus(allowedTypes, allowedStatuses) {
  return filter((ctx) => {
    const actionType = getActionTypeFromInstance(ctx.action);
    const typeMatch = allowedTypes[actionType];
    const statusMatch = allowedStatuses ? allowedStatuses[ctx.status] : true;
    return typeMatch && statusMatch;
  });
}
function mapActionResult() {
  return map(({
    action,
    status,
    error
  }) => {
    return {
      action,
      result: {
        successful: "SUCCESSFUL" === status,
        canceled: "CANCELED" === status,
        error
      }
    };
  });
}
function mapAction() {
  return map((ctx) => ctx.action);
}
function createAllowedActionTypesMap(types) {
  return types.reduce((filterMap, klass) => {
    filterMap[getActionTypeFromInstance(klass)] = true;
    return filterMap;
  }, {});
}
function createAllowedStatusesMap(statuses) {
  return statuses.reduce((filterMap, status) => {
    filterMap[status] = true;
    return filterMap;
  }, {});
}
function leaveNgxs(ngxsExecutionStrategy) {
  return (source) => {
    return new Observable((sink) => {
      return source.subscribe({
        next(value) {
          ngxsExecutionStrategy.leave(() => sink.next(value));
        },
        error(error) {
          ngxsExecutionStrategy.leave(() => sink.error(error));
        },
        complete() {
          ngxsExecutionStrategy.leave(() => sink.complete());
        }
      });
    });
  };
}
var InternalNgxsExecutionStrategy = class {
  constructor(_executionStrategy) {
    this._executionStrategy = _executionStrategy;
  }
  enter(func) {
    return this._executionStrategy.enter(func);
  }
  leave(func) {
    return this._executionStrategy.leave(func);
  }
};
InternalNgxsExecutionStrategy.ɵfac = function InternalNgxsExecutionStrategy_Factory(t) {
  return new (t || InternalNgxsExecutionStrategy)(ɵɵinject(NGXS_EXECUTION_STRATEGY));
};
InternalNgxsExecutionStrategy.ɵprov = ɵɵdefineInjectable({
  token: InternalNgxsExecutionStrategy,
  factory: InternalNgxsExecutionStrategy.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalNgxsExecutionStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NGXS_EXECUTION_STRATEGY]
      }]
    }];
  }, null);
})();
function orderedQueueOperation(operation) {
  const callsQueue = [];
  let busyPushingNext = false;
  return function callOperation(...args) {
    if (busyPushingNext) {
      callsQueue.unshift(args);
      return;
    }
    busyPushingNext = true;
    operation(...args);
    while (callsQueue.length > 0) {
      const nextCallArgs = callsQueue.pop();
      nextCallArgs && operation(...nextCallArgs);
    }
    busyPushingNext = false;
  };
}
var OrderedSubject = class extends Subject {
  constructor() {
    super(...arguments);
    this._orderedNext = orderedQueueOperation((value) => super.next(value));
  }
  next(value) {
    this._orderedNext(value);
  }
};
var OrderedBehaviorSubject = class extends BehaviorSubject {
  constructor(value) {
    super(value);
    this._orderedNext = orderedQueueOperation((value2) => super.next(value2));
    this._currentValue = value;
  }
  getValue() {
    return this._currentValue;
  }
  next(value) {
    this._currentValue = value;
    this._orderedNext(value);
  }
};
var InternalActions = class extends OrderedSubject {
  ngOnDestroy() {
    this.complete();
  }
};
InternalActions.ɵfac = /* @__PURE__ */ (() => {
  let ɵInternalActions_BaseFactory;
  return function InternalActions_Factory(t) {
    return (ɵInternalActions_BaseFactory || (ɵInternalActions_BaseFactory = ɵɵgetInheritedFactory(InternalActions)))(t || InternalActions);
  };
})();
InternalActions.ɵprov = ɵɵdefineInjectable({
  token: InternalActions,
  factory: InternalActions.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalActions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var Actions = class extends Observable {
  constructor(internalActions$, internalExecutionStrategy) {
    const sharedInternalActions$ = internalActions$.pipe(
      leaveNgxs(internalExecutionStrategy),
      // The `InternalActions` subject emits outside of the Angular zone.
      // We have to re-enter the Angular zone for any incoming consumer.
      // The `share()` operator reduces the number of change detections.
      // This would call leave only once for any stream emission across all active subscribers.
      share()
    );
    super((observer) => {
      const childSubscription = sharedInternalActions$.subscribe({
        next: (ctx) => observer.next(ctx),
        error: (error) => observer.error(error),
        complete: () => observer.complete()
      });
      observer.add(childSubscription);
    });
  }
};
Actions.ɵfac = function Actions_Factory(t) {
  return new (t || Actions)(ɵɵinject(InternalActions), ɵɵinject(InternalNgxsExecutionStrategy));
};
Actions.ɵprov = ɵɵdefineInjectable({
  token: Actions,
  factory: Actions.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Actions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: InternalActions
    }, {
      type: InternalNgxsExecutionStrategy
    }];
  }, null);
})();
var compose = (funcs) => (...args) => {
  const curr = funcs.shift();
  return curr(...args, (...nextArgs) => compose(funcs)(...nextArgs));
};
function ngxsErrorHandler(internalErrorReporter, ngxsExecutionStrategy) {
  return (source) => {
    let subscribed = false;
    source.subscribe({
      error: (error) => {
        ngxsExecutionStrategy.enter(() => Promise.resolve().then(() => {
          if (!subscribed) {
            ngxsExecutionStrategy.leave(() => internalErrorReporter.reportErrorSafely(error));
          }
        }));
      }
    });
    return new Observable((subscriber) => {
      subscribed = true;
      return source.pipe(leaveNgxs(ngxsExecutionStrategy)).subscribe(subscriber);
    });
  };
}
var InternalErrorReporter = class {
  constructor(_injector) {
    this._injector = _injector;
    this._errorHandler = null;
  }
  reportErrorSafely(error) {
    if (this._errorHandler === null) {
      this._errorHandler = this._injector.get(ErrorHandler);
    }
    try {
      this._errorHandler.handleError(error);
    } catch (_a) {
    }
  }
};
InternalErrorReporter.ɵfac = function InternalErrorReporter_Factory(t) {
  return new (t || InternalErrorReporter)(ɵɵinject(Injector));
};
InternalErrorReporter.ɵprov = ɵɵdefineInjectable({
  token: InternalErrorReporter,
  factory: InternalErrorReporter.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalErrorReporter, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Injector
    }];
  }, null);
})();
var StateStream = class extends OrderedBehaviorSubject {
  constructor() {
    super({});
  }
  ngOnDestroy() {
    this.complete();
  }
};
StateStream.ɵfac = function StateStream_Factory(t) {
  return new (t || StateStream)();
};
StateStream.ɵprov = ɵɵdefineInjectable({
  token: StateStream,
  factory: StateStream.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateStream, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var PluginManager = class {
  constructor(_parentManager, _pluginHandlers) {
    this._parentManager = _parentManager;
    this._pluginHandlers = _pluginHandlers;
    this.plugins = [];
    this.registerHandlers();
  }
  get rootPlugins() {
    return this._parentManager && this._parentManager.plugins || this.plugins;
  }
  registerHandlers() {
    const pluginHandlers = this.getPluginHandlers();
    this.rootPlugins.push(...pluginHandlers);
  }
  getPluginHandlers() {
    const handlers = this._pluginHandlers || [];
    return handlers.map((plugin) => plugin.handle ? plugin.handle.bind(plugin) : plugin);
  }
};
PluginManager.ɵfac = function PluginManager_Factory(t) {
  return new (t || PluginManager)(ɵɵinject(PluginManager, 12), ɵɵinject(NGXS_PLUGINS, 8));
};
PluginManager.ɵprov = ɵɵdefineInjectable({
  token: PluginManager,
  factory: PluginManager.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PluginManager, [{
    type: Injectable
  }], function() {
    return [{
      type: PluginManager,
      decorators: [{
        type: Optional
      }, {
        type: SkipSelf
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NGXS_PLUGINS]
      }, {
        type: Optional
      }]
    }];
  }, null);
})();
var InternalDispatchedActionResults = class extends Subject {
};
InternalDispatchedActionResults.ɵfac = /* @__PURE__ */ (() => {
  let ɵInternalDispatchedActionResults_BaseFactory;
  return function InternalDispatchedActionResults_Factory(t) {
    return (ɵInternalDispatchedActionResults_BaseFactory || (ɵInternalDispatchedActionResults_BaseFactory = ɵɵgetInheritedFactory(InternalDispatchedActionResults)))(t || InternalDispatchedActionResults);
  };
})();
InternalDispatchedActionResults.ɵprov = ɵɵdefineInjectable({
  token: InternalDispatchedActionResults,
  factory: InternalDispatchedActionResults.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalDispatchedActionResults, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var InternalDispatcher = class {
  constructor(_actions, _actionResults, _pluginManager, _stateStream, _ngxsExecutionStrategy, _internalErrorReporter) {
    this._actions = _actions;
    this._actionResults = _actionResults;
    this._pluginManager = _pluginManager;
    this._stateStream = _stateStream;
    this._ngxsExecutionStrategy = _ngxsExecutionStrategy;
    this._internalErrorReporter = _internalErrorReporter;
  }
  /**
   * Dispatches event(s).
   */
  dispatch(actionOrActions) {
    const result = this._ngxsExecutionStrategy.enter(() => this.dispatchByEvents(actionOrActions));
    return result.pipe(ngxsErrorHandler(this._internalErrorReporter, this._ngxsExecutionStrategy));
  }
  dispatchByEvents(actionOrActions) {
    if (Array.isArray(actionOrActions)) {
      if (actionOrActions.length === 0)
        return of(this._stateStream.getValue());
      return forkJoin(actionOrActions.map((action) => this.dispatchSingle(action)));
    } else {
      return this.dispatchSingle(actionOrActions);
    }
  }
  dispatchSingle(action) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const type = getActionTypeFromInstance(action);
      if (!type) {
        const error = new Error(`This action doesn't have a type property: ${action.constructor.name}`);
        return throwError(error);
      }
    }
    const prevState = this._stateStream.getValue();
    const plugins = this._pluginManager.plugins;
    return compose([...plugins, (nextState, nextAction) => {
      if (nextState !== prevState) {
        this._stateStream.next(nextState);
      }
      const actionResult$ = this.getActionResultStream(nextAction);
      actionResult$.subscribe((ctx) => this._actions.next(ctx));
      this._actions.next({
        action: nextAction,
        status: "DISPATCHED"
        /* Dispatched */
      });
      return this.createDispatchObservable(actionResult$);
    }])(prevState, action).pipe(shareReplay());
  }
  getActionResultStream(action) {
    return this._actionResults.pipe(filter(
      (ctx) => ctx.action === action && ctx.status !== "DISPATCHED"
      /* Dispatched */
    ), take(1), shareReplay());
  }
  createDispatchObservable(actionResult$) {
    return actionResult$.pipe(exhaustMap((ctx) => {
      switch (ctx.status) {
        case "SUCCESSFUL":
          return of(this._stateStream.getValue());
        case "ERRORED":
          return throwError(ctx.error);
        default:
          return EMPTY;
      }
    })).pipe(shareReplay());
  }
};
InternalDispatcher.ɵfac = function InternalDispatcher_Factory(t) {
  return new (t || InternalDispatcher)(ɵɵinject(InternalActions), ɵɵinject(InternalDispatchedActionResults), ɵɵinject(PluginManager), ɵɵinject(StateStream), ɵɵinject(InternalNgxsExecutionStrategy), ɵɵinject(InternalErrorReporter));
};
InternalDispatcher.ɵprov = ɵɵdefineInjectable({
  token: InternalDispatcher,
  factory: InternalDispatcher.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: InternalActions
    }, {
      type: InternalDispatchedActionResults
    }, {
      type: PluginManager
    }, {
      type: StateStream
    }, {
      type: InternalNgxsExecutionStrategy
    }, {
      type: InternalErrorReporter
    }];
  }, null);
})();
var deepFreeze = (o) => {
  Object.freeze(o);
  const oIsFunction = typeof o === "function";
  const hasOwnProp = Object.prototype.hasOwnProperty;
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (hasOwnProp.call(o, prop) && (oIsFunction ? prop !== "caller" && prop !== "callee" && prop !== "arguments" : true) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
};
var InternalStateOperations = class {
  constructor(_stateStream, _dispatcher, _config) {
    this._stateStream = _stateStream;
    this._dispatcher = _dispatcher;
    this._config = _config;
  }
  /**
   * Returns the root state operators.
   */
  getRootStateOperations() {
    const rootStateOperations = {
      getState: () => this._stateStream.getValue(),
      setState: (newState) => this._stateStream.next(newState),
      dispatch: (actionOrActions) => this._dispatcher.dispatch(actionOrActions)
    };
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      return this._config.developmentMode ? ensureStateAndActionsAreImmutable(rootStateOperations) : rootStateOperations;
    } else {
      return rootStateOperations;
    }
  }
  setStateToTheCurrentWithNew(results) {
    const stateOperations = this.getRootStateOperations();
    const currentState = stateOperations.getState();
    stateOperations.setState(Object.assign(Object.assign({}, currentState), results.defaults));
  }
};
InternalStateOperations.ɵfac = function InternalStateOperations_Factory(t) {
  return new (t || InternalStateOperations)(ɵɵinject(StateStream), ɵɵinject(InternalDispatcher), ɵɵinject(NgxsConfig));
};
InternalStateOperations.ɵprov = ɵɵdefineInjectable({
  token: InternalStateOperations,
  factory: InternalStateOperations.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalStateOperations, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: StateStream
    }, {
      type: InternalDispatcher
    }, {
      type: NgxsConfig
    }];
  }, null);
})();
function ensureStateAndActionsAreImmutable(root) {
  return {
    getState: () => root.getState(),
    setState: (value) => {
      const frozenValue = deepFreeze(value);
      return root.setState(frozenValue);
    },
    dispatch: (actions) => {
      return root.dispatch(actions);
    }
  };
}
function simplePatch(value) {
  return (existingState) => {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (Array.isArray(value)) {
        throwPatchingArrayError();
      } else if (typeof value !== "object") {
        throwPatchingPrimitiveError();
      }
    }
    const newState = Object.assign({}, existingState);
    for (const key in value) {
      newState[key] = value[key];
    }
    return newState;
  };
}
var StateContextFactory = class {
  constructor(_internalStateOperations) {
    this._internalStateOperations = _internalStateOperations;
  }
  /**
   * Create the state context
   */
  createStateContext(mappedStore) {
    const root = this._internalStateOperations.getRootStateOperations();
    return {
      getState() {
        const currentAppState = root.getState();
        return getState(currentAppState, mappedStore.path);
      },
      patchState(val) {
        const currentAppState = root.getState();
        const patchOperator = simplePatch(val);
        return setStateFromOperator(root, currentAppState, patchOperator, mappedStore.path);
      },
      setState(val) {
        const currentAppState = root.getState();
        return isStateOperator(val) ? setStateFromOperator(root, currentAppState, val, mappedStore.path) : setStateValue(root, currentAppState, val, mappedStore.path);
      },
      dispatch(actions) {
        return root.dispatch(actions);
      }
    };
  }
};
StateContextFactory.ɵfac = function StateContextFactory_Factory(t) {
  return new (t || StateContextFactory)(ɵɵinject(InternalStateOperations));
};
StateContextFactory.ɵprov = ɵɵdefineInjectable({
  token: StateContextFactory,
  factory: StateContextFactory.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateContextFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: InternalStateOperations
    }];
  }, null);
})();
function setStateValue(root, currentAppState, newValue, path) {
  const newAppState = setValue(currentAppState, path, newValue);
  root.setState(newAppState);
  return newAppState;
}
function setStateFromOperator(root, currentAppState, stateOperator, path) {
  const local = getState(currentAppState, path);
  const newValue = stateOperator(local);
  return setStateValue(root, currentAppState, newValue, path);
}
function getState(currentAppState, path) {
  return getValue(currentAppState, path);
}
var stateNameRegex = new RegExp("^[a-zA-Z0-9_]+$");
function ensureStateNameIsValid(name) {
  if (!name) {
    throwStateNamePropertyError();
  } else if (!stateNameRegex.test(name)) {
    throwStateNameError(name);
  }
}
function ensureStateNameIsUnique(stateName, state, statesByName) {
  const existingState = statesByName[stateName];
  if (existingState && existingState !== state) {
    throwStateUniqueError(stateName, state.name, existingState.name);
  }
}
function ensureStatesAreDecorated(stateClasses) {
  stateClasses.forEach((stateClass) => {
    if (!getStoreMetadata$1(stateClass)) {
      throwStateDecoratorError(stateClass.name);
    }
  });
}
function ensureStateClassIsInjectable(stateClass) {
  if (jit_hasInjectableAnnotation(stateClass) || aot_hasNgInjectableDef(stateClass)) {
    return;
  }
  console.warn(getUndecoratedStateInIvyWarningMessage(stateClass.name));
}
function aot_hasNgInjectableDef(stateClass) {
  return !!stateClass.ɵprov;
}
function jit_hasInjectableAnnotation(stateClass) {
  const annotations = stateClass.__annotations__ || [];
  return annotations.some((annotation) => (annotation === null || annotation === void 0 ? void 0 : annotation.ngMetadataName) === "Injectable");
}
var InitState = class {
};
InitState.type = "@@INIT";
var UpdateState = class {
  constructor(addedStates) {
    this.addedStates = addedStates;
  }
};
UpdateState.type = "@@UPDATE_STATE";
var NGXS_DEVELOPMENT_OPTIONS = new InjectionToken("NGXS_DEVELOPMENT_OPTIONS", {
  providedIn: "root",
  factory: () => ({
    warnOnUnhandledActions: true
  })
});
var NgxsUnhandledActionsLogger = class {
  constructor(options) {
    this._ignoredActions = /* @__PURE__ */ new Set([InitState.type, UpdateState.type]);
    if (typeof options.warnOnUnhandledActions === "object") {
      this.ignoreActions(...options.warnOnUnhandledActions.ignore);
    }
  }
  /**
   * Adds actions to the internal list of actions that should be ignored.
   */
  ignoreActions(...actions) {
    for (const action of actions) {
      this._ignoredActions.add(action.type);
    }
  }
  /** @internal */
  warn(action) {
    const actionShouldBeIgnored = Array.from(this._ignoredActions).some((type) => type === getActionTypeFromInstance(action));
    if (actionShouldBeIgnored) {
      return;
    }
    action = action.constructor && action.constructor.name !== "Object" ? action.constructor.name : action.type;
    console.warn(`The ${action} action has been dispatched but hasn't been handled. This may happen if the state with an action handler for this action is not registered.`);
  }
};
NgxsUnhandledActionsLogger.ɵfac = function NgxsUnhandledActionsLogger_Factory(t) {
  return new (t || NgxsUnhandledActionsLogger)(ɵɵinject(NGXS_DEVELOPMENT_OPTIONS));
};
NgxsUnhandledActionsLogger.ɵprov = ɵɵdefineInjectable({
  token: NgxsUnhandledActionsLogger,
  factory: NgxsUnhandledActionsLogger.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsUnhandledActionsLogger, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NGXS_DEVELOPMENT_OPTIONS]
      }]
    }];
  }, null);
})();
var NG_DEV_MODE = typeof ngDevMode === "undefined" || ngDevMode;
var StateFactory = class _StateFactory {
  constructor(_injector, _config, _parentFactory, _actions, _actionResults, _stateContextFactory, _initialState) {
    this._injector = _injector;
    this._config = _config;
    this._parentFactory = _parentFactory;
    this._actions = _actions;
    this._actionResults = _actionResults;
    this._stateContextFactory = _stateContextFactory;
    this._initialState = _initialState;
    this._actionsSubscription = null;
    this._states = [];
    this._statesByName = {};
    this._statePaths = {};
    this.getRuntimeSelectorContext = memoize(() => {
      const stateFactory = this;
      function resolveGetter(key) {
        const path = stateFactory.statePaths[key];
        return path ? propGetter(path.split("."), stateFactory._config) : null;
      }
      const context = this._parentFactory ? this._parentFactory.getRuntimeSelectorContext() : {
        getStateGetter(key) {
          let getter = resolveGetter(key);
          if (getter) {
            return getter;
          }
          return (...args) => {
            if (!getter) {
              getter = resolveGetter(key);
            }
            return getter ? getter(...args) : void 0;
          };
        },
        getSelectorOptions(localOptions) {
          const globalSelectorOptions = stateFactory._config.selectorOptions;
          return Object.assign(Object.assign({}, globalSelectorOptions), localOptions || {});
        }
      };
      return context;
    });
  }
  get states() {
    return this._parentFactory ? this._parentFactory.states : this._states;
  }
  get statesByName() {
    return this._parentFactory ? this._parentFactory.statesByName : this._statesByName;
  }
  get statePaths() {
    return this._parentFactory ? this._parentFactory.statePaths : this._statePaths;
  }
  static _cloneDefaults(defaults) {
    let value = defaults;
    if (Array.isArray(defaults)) {
      value = defaults.slice();
    } else if (isObject(defaults)) {
      value = Object.assign({}, defaults);
    } else if (defaults === void 0) {
      value = {};
    }
    return value;
  }
  ngOnDestroy() {
    var _a;
    (_a = this._actionsSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  /**
   * Add a new state to the global defs.
   */
  add(stateClasses) {
    if (NG_DEV_MODE) {
      ensureStatesAreDecorated(stateClasses);
    }
    const {
      newStates
    } = this.addToStatesMap(stateClasses);
    if (!newStates.length)
      return [];
    const stateGraph = buildGraph(newStates);
    const sortedStates = topologicalSort(stateGraph);
    const paths = findFullParentPath(stateGraph);
    const nameGraph = nameToState(newStates);
    const bootstrappedStores = [];
    for (const name of sortedStates) {
      const stateClass = nameGraph[name];
      const path = paths[name];
      const meta = stateClass[META_KEY];
      this.addRuntimeInfoToMeta(meta, path);
      if (NG_DEV_MODE) {
        ensureStateClassIsInjectable(stateClass);
      }
      const stateMap = {
        name,
        path,
        isInitialised: false,
        actions: meta.actions,
        instance: this._injector.get(stateClass),
        defaults: _StateFactory._cloneDefaults(meta.defaults)
      };
      if (!this.hasBeenMountedAndBootstrapped(name, path)) {
        bootstrappedStores.push(stateMap);
      }
      this.states.push(stateMap);
    }
    return bootstrappedStores;
  }
  /**
   * Add a set of states to the store and return the defaults
   */
  addAndReturnDefaults(stateClasses) {
    const classes = stateClasses || [];
    const mappedStores = this.add(classes);
    const defaults = mappedStores.reduce((result, mappedStore) => setValue(result, mappedStore.path, mappedStore.defaults), {});
    return {
      defaults,
      states: mappedStores
    };
  }
  connectActionHandlers() {
    if (this._parentFactory || this._actionsSubscription !== null) {
      return;
    }
    const dispatched$ = new Subject();
    this._actionsSubscription = this._actions.pipe(filter(
      (ctx) => ctx.status === "DISPATCHED"
      /* Dispatched */
    ), mergeMap((ctx) => {
      dispatched$.next(ctx);
      const action = ctx.action;
      return this.invokeActions(dispatched$, action).pipe(map(() => ({
        action,
        status: "SUCCESSFUL"
        /* Successful */
      })), defaultIfEmpty({
        action,
        status: "CANCELED"
        /* Canceled */
      }), catchError((error) => of({
        action,
        status: "ERRORED",
        error
      })));
    })).subscribe((ctx) => this._actionResults.next(ctx));
  }
  /**
   * Invoke actions on the states.
   */
  invokeActions(dispatched$, action) {
    const type = getActionTypeFromInstance(action);
    const results = [];
    let actionHasBeenHandled = false;
    for (const metadata of this.states) {
      const actionMetas = metadata.actions[type];
      if (actionMetas) {
        for (const actionMeta of actionMetas) {
          const stateContext = this._stateContextFactory.createStateContext(metadata);
          try {
            let result = metadata.instance[actionMeta.fn](stateContext, action);
            if (result instanceof Promise) {
              result = from(result);
            }
            if (isObservable(result)) {
              result = result.pipe(mergeMap((value) => {
                if (value instanceof Promise) {
                  return from(value);
                }
                if (isObservable(value)) {
                  return value;
                }
                return of(value);
              }), defaultIfEmpty({}));
              if (actionMeta.options.cancelUncompleted) {
                result = result.pipe(takeUntil(dispatched$.pipe(ofActionDispatched(action))));
              }
            } else {
              result = of({}).pipe(shareReplay());
            }
            results.push(result);
          } catch (e) {
            results.push(throwError(e));
          }
          actionHasBeenHandled = true;
        }
      }
    }
    if (NG_DEV_MODE && !actionHasBeenHandled) {
      const unhandledActionsLogger = this._injector.get(NgxsUnhandledActionsLogger, null);
      if (unhandledActionsLogger) {
        unhandledActionsLogger.warn(action);
      }
    }
    if (!results.length) {
      results.push(of({}));
    }
    return forkJoin(results);
  }
  addToStatesMap(stateClasses) {
    const newStates = [];
    const statesMap = this.statesByName;
    for (const stateClass of stateClasses) {
      const stateName = getStoreMetadata$1(stateClass).name;
      if (NG_DEV_MODE) {
        ensureStateNameIsUnique(stateName, stateClass, statesMap);
      }
      const unmountedState = !statesMap[stateName];
      if (unmountedState) {
        newStates.push(stateClass);
        statesMap[stateName] = stateClass;
      }
    }
    return {
      newStates
    };
  }
  addRuntimeInfoToMeta(meta, path) {
    this.statePaths[meta.name] = path;
    meta.path = path;
  }
  hasBeenMountedAndBootstrapped(name, path) {
    const valueIsBootstrappedInInitialState = getValue(this._initialState, path) !== void 0;
    return this.statesByName[name] && valueIsBootstrappedInInitialState;
  }
};
StateFactory.ɵfac = function StateFactory_Factory(t) {
  return new (t || StateFactory)(ɵɵinject(Injector), ɵɵinject(NgxsConfig), ɵɵinject(StateFactory, 12), ɵɵinject(InternalActions), ɵɵinject(InternalDispatchedActionResults), ɵɵinject(StateContextFactory), ɵɵinject(INITIAL_STATE_TOKEN, 8));
};
StateFactory.ɵprov = ɵɵdefineInjectable({
  token: StateFactory,
  factory: StateFactory.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateFactory, [{
    type: Injectable
  }], function() {
    return [{
      type: Injector
    }, {
      type: NgxsConfig
    }, {
      type: StateFactory,
      decorators: [{
        type: Optional
      }, {
        type: SkipSelf
      }]
    }, {
      type: InternalActions
    }, {
      type: InternalDispatchedActionResults
    }, {
      type: StateContextFactory
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [INITIAL_STATE_TOKEN]
      }]
    }];
  }, null);
})();
function createRootSelectorFactory(selectorMetaData, selectors, memoizedSelectorFn) {
  return (context) => {
    const {
      argumentSelectorFunctions,
      selectorOptions
    } = getRuntimeSelectorInfo(context, selectorMetaData, selectors);
    return function selectFromRoot(rootState) {
      const results = argumentSelectorFunctions.map((argFn) => argFn(rootState));
      try {
        return memoizedSelectorFn(...results);
      } catch (ex) {
        if (ex instanceof TypeError && selectorOptions.suppressErrors) {
          return void 0;
        }
        throw ex;
      }
    };
  };
}
function createMemoizedSelectorFn(originalFn, creationMetadata) {
  const containerClass = creationMetadata && creationMetadata.containerClass;
  const wrappedFn = function wrappedSelectorFn(...args) {
    const returnValue = originalFn.apply(containerClass, args);
    if (returnValue instanceof Function) {
      const innerMemoizedFn = memoize.apply(null, [returnValue]);
      return innerMemoizedFn;
    }
    return returnValue;
  };
  const memoizedFn = memoize(wrappedFn);
  Object.setPrototypeOf(memoizedFn, originalFn);
  return memoizedFn;
}
function getRuntimeSelectorInfo(context, selectorMetaData, selectors = []) {
  const localSelectorOptions = selectorMetaData.getSelectorOptions();
  const selectorOptions = context.getSelectorOptions(localSelectorOptions);
  const selectorsToApply = getSelectorsToApply(selectors, selectorOptions, selectorMetaData.containerClass);
  const argumentSelectorFunctions = selectorsToApply.map((selector) => {
    const factory = getRootSelectorFactory(selector);
    return factory(context);
  });
  return {
    selectorOptions,
    argumentSelectorFunctions
  };
}
function getSelectorsToApply(selectors = [], selectorOptions, containerClass) {
  const selectorsToApply = [];
  const canInjectContainerState = selectors.length === 0 || selectorOptions.injectContainerState;
  if (containerClass && canInjectContainerState) {
    const metadata = getStoreMetadata$1(containerClass);
    if (metadata) {
      selectorsToApply.push(containerClass);
    }
  }
  if (selectors) {
    selectorsToApply.push(...selectors);
  }
  return selectorsToApply;
}
function getRootSelectorFactory(selector) {
  const metadata = getSelectorMetadata$1(selector) || getStoreMetadata$1(selector);
  return metadata && metadata.makeRootSelector || (() => selector);
}
var Store = class {
  constructor(_stateStream, _internalStateOperations, _config, _internalExecutionStrategy, _stateFactory, initialStateValue) {
    this._stateStream = _stateStream;
    this._internalStateOperations = _internalStateOperations;
    this._config = _config;
    this._internalExecutionStrategy = _internalExecutionStrategy;
    this._stateFactory = _stateFactory;
    this._selectableStateStream = this._stateStream.pipe(leaveNgxs(this._internalExecutionStrategy), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.initStateStream(initialStateValue);
  }
  /**
   * Dispatches event(s).
   */
  dispatch(actionOrActions) {
    return this._internalStateOperations.getRootStateOperations().dispatch(actionOrActions);
  }
  select(selector) {
    const selectorFn = this.getStoreBoundSelectorFn(selector);
    return this._selectableStateStream.pipe(map(selectorFn), catchError((err) => {
      const {
        suppressErrors
      } = this._config.selectorOptions;
      if (err instanceof TypeError && suppressErrors) {
        return of(void 0);
      }
      return throwError(err);
    }), distinctUntilChanged(), leaveNgxs(this._internalExecutionStrategy));
  }
  selectOnce(selector) {
    return this.select(selector).pipe(take(1));
  }
  selectSnapshot(selector) {
    const selectorFn = this.getStoreBoundSelectorFn(selector);
    return selectorFn(this._stateStream.getValue());
  }
  /**
   * Allow the user to subscribe to the root of the state
   */
  subscribe(fn) {
    return this._selectableStateStream.pipe(leaveNgxs(this._internalExecutionStrategy)).subscribe(fn);
  }
  /**
   * Return the raw value of the state.
   */
  snapshot() {
    return this._internalStateOperations.getRootStateOperations().getState();
  }
  /**
   * Reset the state to a specific point in time. This method is useful
   * for plugin's who need to modify the state directly or unit testing.
   */
  reset(state) {
    return this._internalStateOperations.getRootStateOperations().setState(state);
  }
  getStoreBoundSelectorFn(selector) {
    const makeSelectorFn = getRootSelectorFactory(selector);
    const runtimeContext = this._stateFactory.getRuntimeSelectorContext();
    return makeSelectorFn(runtimeContext);
  }
  initStateStream(initialStateValue) {
    const value = this._stateStream.value;
    const storeIsEmpty = !value || Object.keys(value).length === 0;
    if (storeIsEmpty) {
      const defaultStateNotEmpty = Object.keys(this._config.defaultsState).length > 0;
      const storeValues = defaultStateNotEmpty ? Object.assign(Object.assign({}, this._config.defaultsState), initialStateValue) : initialStateValue;
      this._stateStream.next(storeValues);
    }
  }
};
Store.ɵfac = function Store_Factory(t) {
  return new (t || Store)(ɵɵinject(StateStream), ɵɵinject(InternalStateOperations), ɵɵinject(NgxsConfig), ɵɵinject(InternalNgxsExecutionStrategy), ɵɵinject(StateFactory), ɵɵinject(INITIAL_STATE_TOKEN, 8));
};
Store.ɵprov = ɵɵdefineInjectable({
  token: Store,
  factory: Store.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Store, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: StateStream
    }, {
      type: InternalStateOperations
    }, {
      type: NgxsConfig
    }, {
      type: InternalNgxsExecutionStrategy
    }, {
      type: StateFactory
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [INITIAL_STATE_TOKEN]
      }]
    }];
  }, null);
})();
var SelectFactory = class _SelectFactory {
  constructor(store, config) {
    _SelectFactory.store = store;
    _SelectFactory.config = config;
  }
  ngOnDestroy() {
    _SelectFactory.store = null;
    _SelectFactory.config = null;
  }
};
SelectFactory.store = null;
SelectFactory.config = null;
SelectFactory.ɵfac = function SelectFactory_Factory(t) {
  return new (t || SelectFactory)(ɵɵinject(Store), ɵɵinject(NgxsConfig));
};
SelectFactory.ɵprov = ɵɵdefineInjectable({
  token: SelectFactory,
  factory: SelectFactory.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Store
    }, {
      type: NgxsConfig
    }];
  }, null);
})();
var LifecycleStateManager = class {
  constructor(_store, _internalErrorReporter, _internalStateOperations, _stateContextFactory, _bootstrapper) {
    this._store = _store;
    this._internalErrorReporter = _internalErrorReporter;
    this._internalStateOperations = _internalStateOperations;
    this._stateContextFactory = _stateContextFactory;
    this._bootstrapper = _bootstrapper;
    this._destroy$ = new Subject();
  }
  ngOnDestroy() {
    this._destroy$.next();
  }
  ngxsBootstrap(action, results) {
    this._internalStateOperations.getRootStateOperations().dispatch(action).pipe(filter(() => !!results), tap(() => this._invokeInitOnStates(results.states)), mergeMap(() => this._bootstrapper.appBootstrapped$), filter((appBootstrapped) => !!appBootstrapped), catchError((error) => {
      this._internalErrorReporter.reportErrorSafely(error);
      return EMPTY;
    }), takeUntil(this._destroy$)).subscribe(() => this._invokeBootstrapOnStates(results.states));
  }
  _invokeInitOnStates(mappedStores) {
    for (const mappedStore of mappedStores) {
      const instance = mappedStore.instance;
      if (instance.ngxsOnChanges) {
        this._store.select((state) => getValue(state, mappedStore.path)).pipe(startWith(void 0), pairwise(), takeUntil(this._destroy$)).subscribe(([previousValue, currentValue]) => {
          const change = new NgxsSimpleChange(previousValue, currentValue, !mappedStore.isInitialised);
          instance.ngxsOnChanges(change);
        });
      }
      if (instance.ngxsOnInit) {
        instance.ngxsOnInit(this._getStateContext(mappedStore));
      }
      mappedStore.isInitialised = true;
    }
  }
  _invokeBootstrapOnStates(mappedStores) {
    for (const mappedStore of mappedStores) {
      const instance = mappedStore.instance;
      if (instance.ngxsAfterBootstrap) {
        instance.ngxsAfterBootstrap(this._getStateContext(mappedStore));
      }
    }
  }
  _getStateContext(mappedStore) {
    return this._stateContextFactory.createStateContext(mappedStore);
  }
};
LifecycleStateManager.ɵfac = function LifecycleStateManager_Factory(t) {
  return new (t || LifecycleStateManager)(ɵɵinject(Store), ɵɵinject(InternalErrorReporter), ɵɵinject(InternalStateOperations), ɵɵinject(StateContextFactory), ɵɵinject(NgxsBootstrapper));
};
LifecycleStateManager.ɵprov = ɵɵdefineInjectable({
  token: LifecycleStateManager,
  factory: LifecycleStateManager.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LifecycleStateManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Store
    }, {
      type: InternalErrorReporter
    }, {
      type: InternalStateOperations
    }, {
      type: StateContextFactory
    }, {
      type: NgxsBootstrapper
    }];
  }, null);
})();
var NgxsRootModule = class {
  constructor(factory, internalStateOperations, _store, _select, states = [], lifecycleStateManager) {
    const results = factory.addAndReturnDefaults(states);
    internalStateOperations.setStateToTheCurrentWithNew(results);
    factory.connectActionHandlers();
    lifecycleStateManager.ngxsBootstrap(new InitState(), results);
  }
};
NgxsRootModule.ɵfac = function NgxsRootModule_Factory(t) {
  return new (t || NgxsRootModule)(ɵɵinject(StateFactory), ɵɵinject(InternalStateOperations), ɵɵinject(Store), ɵɵinject(SelectFactory), ɵɵinject(ROOT_STATE_TOKEN, 8), ɵɵinject(LifecycleStateManager));
};
NgxsRootModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsRootModule
});
NgxsRootModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsRootModule, [{
    type: NgModule
  }], function() {
    return [{
      type: StateFactory
    }, {
      type: InternalStateOperations
    }, {
      type: Store
    }, {
      type: SelectFactory
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [ROOT_STATE_TOKEN]
      }]
    }, {
      type: LifecycleStateManager
    }];
  }, null);
})();
var NgxsFeatureModule = class _NgxsFeatureModule {
  constructor(_store, internalStateOperations, factory, states = [], lifecycleStateManager) {
    const flattenedStates = _NgxsFeatureModule.flattenStates(states);
    const results = factory.addAndReturnDefaults(flattenedStates);
    if (results.states.length) {
      internalStateOperations.setStateToTheCurrentWithNew(results);
      lifecycleStateManager.ngxsBootstrap(new UpdateState(results.defaults), results);
    }
  }
  static flattenStates(states = []) {
    return states.reduce((total, values) => total.concat(values), []);
  }
};
NgxsFeatureModule.ɵfac = function NgxsFeatureModule_Factory(t) {
  return new (t || NgxsFeatureModule)(ɵɵinject(Store), ɵɵinject(InternalStateOperations), ɵɵinject(StateFactory), ɵɵinject(FEATURE_STATE_TOKEN, 8), ɵɵinject(LifecycleStateManager));
};
NgxsFeatureModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsFeatureModule
});
NgxsFeatureModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsFeatureModule, [{
    type: NgModule
  }], function() {
    return [{
      type: Store
    }, {
      type: InternalStateOperations
    }, {
      type: StateFactory
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [FEATURE_STATE_TOKEN]
      }]
    }, {
      type: LifecycleStateManager
    }];
  }, null);
})();
var NgxsModule = class _NgxsModule {
  /**
   * Root module factory
   */
  static forRoot(states = [], options = {}) {
    return {
      ngModule: NgxsRootModule,
      providers: [StateFactory, PluginManager, ...states, ..._NgxsModule.ngxsTokenProviders(states, options)]
    };
  }
  /**
   * Feature module factory
   */
  static forFeature(states = []) {
    return {
      ngModule: NgxsFeatureModule,
      providers: [
        // This is required on the feature level, see comments in `state-factory.ts`.
        StateFactory,
        PluginManager,
        ...states,
        {
          provide: FEATURE_STATE_TOKEN,
          multi: true,
          useValue: states
        }
      ]
    };
  }
  static ngxsTokenProviders(states, options) {
    return [{
      provide: USER_PROVIDED_NGXS_EXECUTION_STRATEGY,
      useValue: options.executionStrategy
    }, {
      provide: ROOT_STATE_TOKEN,
      useValue: states
    }, {
      provide: ROOT_OPTIONS,
      useValue: options
    }, {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: _NgxsModule.appBootstrapListenerFactory,
      multi: true,
      deps: [NgxsBootstrapper]
    }, {
      provide: ɵNGXS_STATE_CONTEXT_FACTORY,
      useExisting: StateContextFactory
    }, {
      provide: ɵNGXS_STATE_FACTORY,
      useExisting: StateFactory
    }];
  }
  static appBootstrapListenerFactory(bootstrapper) {
    return () => bootstrapper.bootstrap();
  }
};
NgxsModule.ɵfac = function NgxsModule_Factory(t) {
  return new (t || NgxsModule)();
};
NgxsModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsModule
});
NgxsModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsModule, [{
    type: NgModule
  }], null, null);
})();
function Action(actions, options) {
  return (target, name) => {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const isStaticMethod = target.hasOwnProperty("prototype");
      if (isStaticMethod) {
        throwActionDecoratorError();
      }
    }
    const meta = ensureStoreMetadata$1(target.constructor);
    if (!Array.isArray(actions)) {
      actions = [actions];
    }
    for (const action of actions) {
      const type = action.type;
      if (!meta.actions[type]) {
        meta.actions[type] = [];
      }
      meta.actions[type].push({
        fn: name,
        options: options || {},
        type
      });
    }
  };
}
function State(options) {
  return (target) => {
    const stateClass = target;
    const meta = ensureStoreMetadata$1(stateClass);
    const inheritedStateClass = Object.getPrototypeOf(stateClass);
    const optionsWithInheritance = getStateOptions(inheritedStateClass, options);
    mutateMetaData({
      meta,
      inheritedStateClass,
      optionsWithInheritance
    });
    stateClass[META_OPTIONS_KEY] = optionsWithInheritance;
  };
}
function getStateOptions(inheritedStateClass, options) {
  const inheritanceOptions = inheritedStateClass[META_OPTIONS_KEY] || {};
  return Object.assign(Object.assign({}, inheritanceOptions), options);
}
function mutateMetaData(params) {
  const {
    meta,
    inheritedStateClass,
    optionsWithInheritance
  } = params;
  const {
    children,
    defaults,
    name
  } = optionsWithInheritance;
  const stateName = typeof name === "string" ? name : name && name.getName() || null;
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    ensureStateNameIsValid(stateName);
  }
  if (inheritedStateClass.hasOwnProperty(META_KEY)) {
    const inheritedMeta = inheritedStateClass[META_KEY] || {};
    meta.actions = Object.assign(Object.assign({}, meta.actions), inheritedMeta.actions);
  }
  meta.children = children;
  meta.defaults = defaults;
  meta.name = stateName;
}
var DOLLAR_CHAR_CODE = 36;
function createSelectObservable(selector) {
  if (!SelectFactory.store) {
    throwSelectFactoryNotConnectedError();
  }
  return SelectFactory.store.select(selector);
}
function createSelectorFn(name, rawSelector, paths = []) {
  rawSelector = !rawSelector ? removeDollarAtTheEnd(name) : rawSelector;
  if (typeof rawSelector === "string") {
    const propsArray = paths.length ? [rawSelector, ...paths] : rawSelector.split(".");
    return propGetter(propsArray, SelectFactory.config);
  }
  return rawSelector;
}
function removeDollarAtTheEnd(name) {
  const lastCharIndex = name.length - 1;
  const dollarAtTheEnd = name.charCodeAt(lastCharIndex) === DOLLAR_CHAR_CODE;
  return dollarAtTheEnd ? name.slice(0, lastCharIndex) : name;
}
function Select(rawSelector, ...paths) {
  return function(target, key) {
    const name = key.toString();
    const selectorId = `__${name}__selector`;
    const selector = createSelectorFn(name, rawSelector, paths);
    Object.defineProperties(target, {
      [selectorId]: {
        writable: true,
        enumerable: false,
        configurable: true
      },
      [name]: {
        enumerable: true,
        configurable: true,
        get() {
          return this[selectorId] || (this[selectorId] = createSelectObservable(selector));
        }
      }
    });
  };
}
var SELECTOR_OPTIONS_META_KEY = "NGXS_SELECTOR_OPTIONS_META";
var selectorOptionsMetaAccessor = {
  getOptions: (target) => {
    return target && target[SELECTOR_OPTIONS_META_KEY] || {};
  },
  defineOptions: (target, options) => {
    if (!target)
      return;
    target[SELECTOR_OPTIONS_META_KEY] = options;
  }
};
function setupSelectorMetadata(originalFn, creationMetadata) {
  const selectorMetaData = ensureSelectorMetadata$1(originalFn);
  selectorMetaData.originalFn = originalFn;
  let getExplicitSelectorOptions = () => ({});
  if (creationMetadata) {
    selectorMetaData.containerClass = creationMetadata.containerClass;
    selectorMetaData.selectorName = creationMetadata.selectorName || null;
    getExplicitSelectorOptions = creationMetadata.getSelectorOptions || getExplicitSelectorOptions;
  }
  const selectorMetaDataClone = Object.assign({}, selectorMetaData);
  selectorMetaData.getSelectorOptions = () => getLocalSelectorOptions(selectorMetaDataClone, getExplicitSelectorOptions());
  return selectorMetaData;
}
function getLocalSelectorOptions(selectorMetaData, explicitOptions) {
  return Object.assign(Object.assign(Object.assign(Object.assign({}, selectorOptionsMetaAccessor.getOptions(selectorMetaData.containerClass) || {}), selectorOptionsMetaAccessor.getOptions(selectorMetaData.originalFn) || {}), selectorMetaData.getSelectorOptions() || {}), explicitOptions);
}
function SelectorOptions(options) {
  return function decorate(target, methodName, descriptor) {
    if (methodName) {
      descriptor || (descriptor = Object.getOwnPropertyDescriptor(target, methodName));
      const originalFn = descriptor.value || descriptor.originalFn;
      if (originalFn) {
        selectorOptionsMetaAccessor.defineOptions(originalFn, options);
      }
    } else {
      selectorOptionsMetaAccessor.defineOptions(target, options);
    }
  };
}
function ensureStoreMetadata(target) {
  return ensureStoreMetadata$1(target);
}
function getStoreMetadata(target) {
  return getStoreMetadata$1(target);
}
function ensureSelectorMetadata(target) {
  return ensureSelectorMetadata$1(target);
}
function getSelectorMetadata(target) {
  return getSelectorMetadata$1(target);
}
function createSelector(selectors, projector, creationMetadata) {
  const memoizedFn = createMemoizedSelectorFn(projector, creationMetadata);
  const selectorMetaData = setupSelectorMetadata(projector, creationMetadata);
  selectorMetaData.makeRootSelector = createRootSelectorFactory(selectorMetaData, selectors, memoizedFn);
  return memoizedFn;
}
function Selector(selectors) {
  return (target, key, descriptor) => {
    descriptor || (descriptor = Object.getOwnPropertyDescriptor(target, key));
    const originalFn = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (originalFn && typeof originalFn !== "function") {
        throwSelectorDecoratorError();
      }
    }
    const memoizedFn = createSelector(selectors, originalFn, {
      containerClass: target,
      selectorName: key.toString(),
      getSelectorOptions() {
        return {};
      }
    });
    const newDescriptor = {
      configurable: true,
      get() {
        return memoizedFn;
      }
    };
    newDescriptor["originalFn"] = originalFn;
    return newDescriptor;
  };
}
var StateToken = class {
  constructor(name) {
    this.name = name;
    const selectorMetadata = ensureSelectorMetadata$1(this);
    selectorMetadata.makeRootSelector = (runtimeContext) => {
      return runtimeContext.getStateGetter(this.name);
    };
  }
  getName() {
    return this.name;
  }
  toString() {
    return `StateToken[${this.name}]`;
  }
};
var NgxsDevelopmentModule = class _NgxsDevelopmentModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsDevelopmentModule,
      providers: [NgxsUnhandledActionsLogger, {
        provide: NGXS_DEVELOPMENT_OPTIONS,
        useValue: options
      }]
    };
  }
};
NgxsDevelopmentModule.ɵfac = function NgxsDevelopmentModule_Factory(t) {
  return new (t || NgxsDevelopmentModule)();
};
NgxsDevelopmentModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsDevelopmentModule
});
NgxsDevelopmentModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsDevelopmentModule, [{
    type: NgModule
  }], null, null);
})();
function ensureValidSelector(selector, context = {}) {
  const noun = context.noun || "selector";
  const prefix = context.prefix ? context.prefix + ": " : "";
  ensureValueProvided(selector, {
    noun,
    prefix: context.prefix
  });
  const metadata = getSelectorMetadata$1(selector) || getStoreMetadata$1(selector);
  if (!metadata) {
    throw new Error(`${prefix}The value provided as the ${noun} is not a valid selector.`);
  }
}
function ensureValueProvided(value, context = {}) {
  const noun = context.noun || "value";
  const prefix = context.prefix ? context.prefix + ": " : "";
  if (!value) {
    throw new Error(`${prefix}A ${noun} must be provided.`);
  }
}
function createModelSelector(selectorMap) {
  const selectorKeys = Object.keys(selectorMap);
  const selectors = Object.values(selectorMap);
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    ensureValidSelectorMap({
      prefix: "[createModelSelector]",
      selectorMap,
      selectorKeys,
      selectors
    });
  }
  return createSelector(selectors, (...args) => {
    return selectorKeys.reduce((obj, key, index) => {
      obj[key] = args[index];
      return obj;
    }, {});
  });
}
function ensureValidSelectorMap({
  prefix,
  selectorMap,
  selectorKeys,
  selectors
}) {
  ensureValueProvided(selectorMap, {
    prefix,
    noun: "selector map"
  });
  ensureValueProvided(typeof selectorMap === "object", {
    prefix,
    noun: "valid selector map"
  });
  ensureValueProvided(selectorKeys.length, {
    prefix,
    noun: "non-empty selector map"
  });
  selectors.forEach((selector, index) => ensureValidSelector(selector, {
    prefix,
    noun: `selector for the '${selectorKeys[index]}' property`
  }));
}
function createPickSelector(selector, keys) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    ensureValidSelector(selector, {
      prefix: "[createPickSelector]"
    });
  }
  const validKeys = keys.filter(Boolean);
  const selectors = validKeys.map((key) => createSelector([selector], (s) => s[key]));
  return createSelector([...selectors], (...props) => {
    return validKeys.reduce((acc, key, index) => {
      acc[key] = props[index];
      return acc;
    }, {});
  });
}
function createPropertySelectors(parentSelector) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    ensureValidSelector(parentSelector, {
      prefix: "[createPropertySelectors]",
      noun: "parent selector"
    });
  }
  const cache = {};
  return new Proxy({}, {
    get(_target, prop) {
      const selector = cache[prop] || createSelector([parentSelector], (s) => s === null || s === void 0 ? void 0 : s[prop]);
      cache[prop] = selector;
      return selector;
    }
  });
}

export {
  getActionTypeFromInstance,
  actionMatcher,
  setValue,
  getValue,
  NGXS_PLUGINS,
  NgxsSimpleChange,
  NoopNgxsExecutionStrategy,
  ofAction,
  ofActionDispatched,
  ofActionSuccessful,
  ofActionCanceled,
  ofActionCompleted,
  ofActionErrored,
  Actions,
  StateStream,
  InitState,
  UpdateState,
  NgxsUnhandledActionsLogger,
  Store,
  NgxsRootModule,
  NgxsFeatureModule,
  NgxsModule,
  Action,
  State,
  Select,
  SelectorOptions,
  ensureStoreMetadata,
  getStoreMetadata,
  ensureSelectorMetadata,
  getSelectorMetadata,
  createSelector,
  Selector,
  StateToken,
  NgxsDevelopmentModule,
  createModelSelector,
  createPickSelector,
  createPropertySelectors
};
//# sourceMappingURL=chunk-SLJTJLER.js.map
