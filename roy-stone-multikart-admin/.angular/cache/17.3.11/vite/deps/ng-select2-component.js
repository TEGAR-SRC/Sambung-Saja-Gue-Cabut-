import {
  BidiModule,
  Directionality,
  ESCAPE,
  Platform,
  ScrollDispatcher,
  ScrollingModule,
  ViewportRuler,
  _getEventTarget,
  _isTestEnvironment,
  coerceArray,
  coerceCssPixelValue,
  hasModifierKey,
  supportsScrollBehavior
} from "./chunk-3BA3PILK.js";
import {
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgForm,
  ReactiveFormsModule
} from "./chunk-3NU2C6MS.js";
import {
  CommonModule,
  DOCUMENT,
  Location,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-GY65V5CF.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  Attribute,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver$1,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-LVVQT43K.js";
import {
  fromEvent,
  merge
} from "./chunk-INSCHJF3.js";
import "./chunk-6FQGPHO4.js";
import {
  Subject,
  Subscription,
  filter,
  map,
  mergeMap,
  of,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttleTime
} from "./chunk-LVRZVOCT.js";
import "./chunk-W44PFRPX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// node_modules/@angular/cdk/fesm2022/portal.mjs
function throwNullPortalError() {
  throw Error("Must provide a portal to attach");
}
function throwPortalAlreadyAttachedError() {
  throw Error("Host already has a portal attached");
}
function throwPortalOutletAlreadyDisposedError() {
  throw Error("This PortalOutlet has already been disposed");
}
function throwUnknownPortalTypeError() {
  throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
}
function throwNullPortalOutletError() {
  throw Error("Attempting to attach a portal to a null PortalOutlet");
}
function throwNoPortalAttachedError() {
  throw Error("Attempting to detach a portal that is not attached to a host");
}
var Portal = class {
  /** Attach this portal to a host. */
  attach(host) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (host == null) {
        throwNullPortalOutletError();
      }
      if (host.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
    }
    this._attachedHost = host;
    return host.attach(this);
  }
  /** Detach this portal from its host */
  detach() {
    let host = this._attachedHost;
    if (host != null) {
      this._attachedHost = null;
      host.detach();
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwNoPortalAttachedError();
    }
  }
  /** Whether this portal is attached to a host. */
  get isAttached() {
    return this._attachedHost != null;
  }
  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host) {
    this._attachedHost = host;
  }
};
var ComponentPortal = class extends Portal {
  constructor(component, viewContainerRef, injector, componentFactoryResolver, projectableNodes) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.componentFactoryResolver = componentFactoryResolver;
    this.projectableNodes = projectableNodes;
  }
};
var TemplatePortal = class extends Portal {
  constructor(templateRef, viewContainerRef, context, injector) {
    super();
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.context = context;
    this.injector = injector;
  }
  get origin() {
    return this.templateRef.elementRef;
  }
  /**
   * Attach the portal to the provided `PortalOutlet`.
   * When a context is provided it will override the `context` property of the `TemplatePortal`
   * instance.
   */
  attach(host, context = this.context) {
    this.context = context;
    return super.attach(host);
  }
  detach() {
    this.context = void 0;
    return super.detach();
  }
};
var DomPortal = class extends Portal {
  constructor(element) {
    super();
    this.element = element instanceof ElementRef ? element.nativeElement : element;
  }
};
var BasePortalOutlet = class {
  constructor() {
    this._isDisposed = false;
    this.attachDomPortal = null;
  }
  /** Whether this host has an attached portal. */
  hasAttached() {
    return !!this._attachedPortal;
  }
  /** Attaches a portal. */
  attach(portal) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!portal) {
        throwNullPortalError();
      }
      if (this.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
      if (this._isDisposed) {
        throwPortalOutletAlreadyDisposedError();
      }
    }
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this._attachedPortal = portal;
      return this.attachTemplatePortal(portal);
    } else if (this.attachDomPortal && portal instanceof DomPortal) {
      this._attachedPortal = portal;
      return this.attachDomPortal(portal);
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwUnknownPortalTypeError();
    }
  }
  /** Detaches a previously attached portal. */
  detach() {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }
    this._invokeDisposeFn();
  }
  /** Permanently dispose of this portal host. */
  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }
    this._invokeDisposeFn();
    this._isDisposed = true;
  }
  /** @docs-private */
  setDisposeFn(fn) {
    this._disposeFn = fn;
  }
  _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
};
var DomPortalOutlet = class extends BasePortalOutlet {
  /**
   * @param outletElement Element into which the content is projected.
   * @param _componentFactoryResolver Used to resolve the component factory.
   *   Only required when attaching component portals.
   * @param _appRef Reference to the application. Only used in component portals when there
   *   is no `ViewContainerRef` available.
   * @param _defaultInjector Injector to use as a fallback when the portal being attached doesn't
   *   have one. Only used for component portals.
   * @param _document Reference to the document. Used when attaching a DOM portal. Will eventually
   *   become a required parameter.
   */
  constructor(outletElement, _componentFactoryResolver, _appRef, _defaultInjector, _document) {
    super();
    this.outletElement = outletElement;
    this._componentFactoryResolver = _componentFactoryResolver;
    this._appRef = _appRef;
    this._defaultInjector = _defaultInjector;
    this.attachDomPortal = (portal) => {
      if (!this._document && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Cannot attach DOM portal without _document constructor parameter");
      }
      const element = portal.element;
      if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("DOM portal content must be attached to a parent node.");
      }
      const anchorNode = this._document.createComment("dom-portal");
      element.parentNode.insertBefore(anchorNode, element);
      this.outletElement.appendChild(element);
      this._attachedPortal = portal;
      super.setDisposeFn(() => {
        if (anchorNode.parentNode) {
          anchorNode.parentNode.replaceChild(element, anchorNode);
        }
      });
    };
    this._document = _document;
  }
  /**
   * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
   * @param portal Portal to be attached
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !resolver) {
      throw Error("Cannot attach component portal to outlet without a ComponentFactoryResolver.");
    }
    const componentFactory = resolver.resolveComponentFactory(portal.component);
    let componentRef;
    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.injector, portal.projectableNodes || void 0);
      this.setDisposeFn(() => componentRef.destroy());
    } else {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._appRef) {
        throw Error("Cannot attach component portal to outlet without an ApplicationRef.");
      }
      componentRef = componentFactory.create(portal.injector || this._defaultInjector || Injector.NULL);
      this._appRef.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        if (this._appRef.viewCount > 0) {
          this._appRef.detachView(componentRef.hostView);
        }
        componentRef.destroy();
      });
    }
    this.outletElement.appendChild(this._getComponentRootNode(componentRef));
    this._attachedPortal = portal;
    return componentRef;
  }
  /**
   * Attaches a template portal to the DOM as an embedded view.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    let viewContainer = portal.viewContainerRef;
    let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    viewRef.rootNodes.forEach((rootNode) => this.outletElement.appendChild(rootNode));
    viewRef.detectChanges();
    this.setDisposeFn(() => {
      let index = viewContainer.indexOf(viewRef);
      if (index !== -1) {
        viewContainer.remove(index);
      }
    });
    this._attachedPortal = portal;
    return viewRef;
  }
  /**
   * Clears out a portal from the DOM.
   */
  dispose() {
    super.dispose();
    this.outletElement.remove();
  }
  /** Gets the root HTMLElement for an instantiated component. */
  _getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
  }
};
var CdkPortal = class _CdkPortal extends TemplatePortal {
  constructor(templateRef, viewContainerRef) {
    super(templateRef, viewContainerRef);
  }
  static {
    this.ɵfac = function CdkPortal_Factory(t) {
      return new (t || _CdkPortal)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkPortal,
      selectors: [["", "cdkPortal", ""]],
      exportAs: ["cdkPortal"],
      standalone: true,
      features: [ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortal, [{
    type: Directive,
    args: [{
      selector: "[cdkPortal]",
      exportAs: "cdkPortal",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }], null);
})();
var TemplatePortalDirective = class _TemplatePortalDirective extends CdkPortal {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵTemplatePortalDirective_BaseFactory;
      return function TemplatePortalDirective_Factory(t) {
        return (ɵTemplatePortalDirective_BaseFactory || (ɵTemplatePortalDirective_BaseFactory = ɵɵgetInheritedFactory(_TemplatePortalDirective)))(t || _TemplatePortalDirective);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TemplatePortalDirective,
      selectors: [["", "cdk-portal", ""], ["", "portal", ""]],
      exportAs: ["cdkPortal"],
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: CdkPortal,
        useExisting: _TemplatePortalDirective
      }]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatePortalDirective, [{
    type: Directive,
    args: [{
      selector: "[cdk-portal], [portal]",
      exportAs: "cdkPortal",
      providers: [{
        provide: CdkPortal,
        useExisting: TemplatePortalDirective
      }],
      standalone: true
    }]
  }], null, null);
})();
var CdkPortalOutlet = class _CdkPortalOutlet extends BasePortalOutlet {
  constructor(_componentFactoryResolver, _viewContainerRef, _document) {
    super();
    this._componentFactoryResolver = _componentFactoryResolver;
    this._viewContainerRef = _viewContainerRef;
    this._isInitialized = false;
    this.attached = new EventEmitter();
    this.attachDomPortal = (portal) => {
      if (!this._document && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Cannot attach DOM portal without _document constructor parameter");
      }
      const element = portal.element;
      if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("DOM portal content must be attached to a parent node.");
      }
      const anchorNode = this._document.createComment("dom-portal");
      portal.setAttachedHost(this);
      element.parentNode.insertBefore(anchorNode, element);
      this._getRootNode().appendChild(element);
      this._attachedPortal = portal;
      super.setDisposeFn(() => {
        if (anchorNode.parentNode) {
          anchorNode.parentNode.replaceChild(element, anchorNode);
        }
      });
    };
    this._document = _document;
  }
  /** Portal associated with the Portal outlet. */
  get portal() {
    return this._attachedPortal;
  }
  set portal(portal) {
    if (this.hasAttached() && !portal && !this._isInitialized) {
      return;
    }
    if (this.hasAttached()) {
      super.detach();
    }
    if (portal) {
      super.attach(portal);
    }
    this._attachedPortal = portal || null;
  }
  /** Component or view reference that is attached to the portal. */
  get attachedRef() {
    return this._attachedRef;
  }
  ngOnInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    super.dispose();
    this._attachedRef = this._attachedPortal = null;
  }
  /**
   * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
   *
   * @param portal Portal to be attached to the portal outlet.
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    portal.setAttachedHost(this);
    const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
    const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
    const componentFactory = resolver.resolveComponentFactory(portal.component);
    const ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.injector, portal.projectableNodes || void 0);
    if (viewContainerRef !== this._viewContainerRef) {
      this._getRootNode().appendChild(ref.hostView.rootNodes[0]);
    }
    super.setDisposeFn(() => ref.destroy());
    this._attachedPortal = portal;
    this._attachedRef = ref;
    this.attached.emit(ref);
    return ref;
  }
  /**
   * Attach the given TemplatePortal to this PortalHost as an embedded View.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    portal.setAttachedHost(this);
    const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    super.setDisposeFn(() => this._viewContainerRef.clear());
    this._attachedPortal = portal;
    this._attachedRef = viewRef;
    this.attached.emit(viewRef);
    return viewRef;
  }
  /** Gets the root node of the portal outlet. */
  _getRootNode() {
    const nativeElement = this._viewContainerRef.element.nativeElement;
    return nativeElement.nodeType === nativeElement.ELEMENT_NODE ? nativeElement : nativeElement.parentNode;
  }
  static {
    this.ɵfac = function CdkPortalOutlet_Factory(t) {
      return new (t || _CdkPortalOutlet)(ɵɵdirectiveInject(ComponentFactoryResolver$1), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(DOCUMENT));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkPortalOutlet,
      selectors: [["", "cdkPortalOutlet", ""]],
      inputs: {
        portal: [InputFlags.None, "cdkPortalOutlet", "portal"]
      },
      outputs: {
        attached: "attached"
      },
      exportAs: ["cdkPortalOutlet"],
      standalone: true,
      features: [ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortalOutlet, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalOutlet]",
      exportAs: "cdkPortalOutlet",
      standalone: true
    }]
  }], () => [{
    type: ComponentFactoryResolver$1
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    portal: [{
      type: Input,
      args: ["cdkPortalOutlet"]
    }],
    attached: [{
      type: Output
    }]
  });
})();
var PortalHostDirective = class _PortalHostDirective extends CdkPortalOutlet {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵPortalHostDirective_BaseFactory;
      return function PortalHostDirective_Factory(t) {
        return (ɵPortalHostDirective_BaseFactory || (ɵPortalHostDirective_BaseFactory = ɵɵgetInheritedFactory(_PortalHostDirective)))(t || _PortalHostDirective);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PortalHostDirective,
      selectors: [["", "cdkPortalHost", ""], ["", "portalHost", ""]],
      inputs: {
        portal: [InputFlags.None, "cdkPortalHost", "portal"]
      },
      exportAs: ["cdkPortalHost"],
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: CdkPortalOutlet,
        useExisting: _PortalHostDirective
      }]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalHostDirective, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalHost], [portalHost]",
      exportAs: "cdkPortalHost",
      inputs: [{
        name: "portal",
        alias: "cdkPortalHost"
      }],
      providers: [{
        provide: CdkPortalOutlet,
        useExisting: PortalHostDirective
      }],
      standalone: true
    }]
  }], null, null);
})();
var PortalModule = class _PortalModule {
  static {
    this.ɵfac = function PortalModule_Factory(t) {
      return new (t || _PortalModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PortalModule,
      imports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
      exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalModule, [{
    type: NgModule,
    args: [{
      imports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
      exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/overlay.mjs
var scrollBehaviorSupported = supportsScrollBehavior();
var BlockScrollStrategy = class {
  constructor(_viewportRuler, document) {
    this._viewportRuler = _viewportRuler;
    this._previousHTMLStyles = {
      top: "",
      left: ""
    };
    this._isEnabled = false;
    this._document = document;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach() {
  }
  /** Blocks page-level scroll while the attached overlay is open. */
  enable() {
    if (this._canBeEnabled()) {
      const root = this._document.documentElement;
      this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
      this._previousHTMLStyles.left = root.style.left || "";
      this._previousHTMLStyles.top = root.style.top || "";
      root.style.left = coerceCssPixelValue(-this._previousScrollPosition.left);
      root.style.top = coerceCssPixelValue(-this._previousScrollPosition.top);
      root.classList.add("cdk-global-scrollblock");
      this._isEnabled = true;
    }
  }
  /** Unblocks page-level scroll while the attached overlay is open. */
  disable() {
    if (this._isEnabled) {
      const html = this._document.documentElement;
      const body = this._document.body;
      const htmlStyle = html.style;
      const bodyStyle = body.style;
      const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || "";
      const previousBodyScrollBehavior = bodyStyle.scrollBehavior || "";
      this._isEnabled = false;
      htmlStyle.left = this._previousHTMLStyles.left;
      htmlStyle.top = this._previousHTMLStyles.top;
      html.classList.remove("cdk-global-scrollblock");
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = "auto";
      }
      window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
        bodyStyle.scrollBehavior = previousBodyScrollBehavior;
      }
    }
  }
  _canBeEnabled() {
    const html = this._document.documentElement;
    if (html.classList.contains("cdk-global-scrollblock") || this._isEnabled) {
      return false;
    }
    const body = this._document.body;
    const viewport = this._viewportRuler.getViewportSize();
    return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
  }
};
function getMatScrollStrategyAlreadyAttachedError() {
  return Error(`Scroll strategy has already been attached.`);
}
var CloseScrollStrategy = class {
  constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._config = _config;
    this._scrollSubscription = null;
    this._detach = () => {
      this.disable();
      if (this._overlayRef.hasAttached()) {
        this._ngZone.run(() => this._overlayRef.detach());
      }
    };
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables the closing of the attached overlay on scroll. */
  enable() {
    if (this._scrollSubscription) {
      return;
    }
    const stream = this._scrollDispatcher.scrolled(0).pipe(filter((scrollable) => {
      return !scrollable || !this._overlayRef.overlayElement.contains(scrollable.getElementRef().nativeElement);
    }));
    if (this._config && this._config.threshold && this._config.threshold > 1) {
      this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
      this._scrollSubscription = stream.subscribe(() => {
        const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
        if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) {
          this._detach();
        } else {
          this._overlayRef.updatePosition();
        }
      });
    } else {
      this._scrollSubscription = stream.subscribe(this._detach);
    }
  }
  /** Disables the closing the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
};
var NoopScrollStrategy = class {
  /** Does nothing, as this scroll strategy is a no-op. */
  enable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  disable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  attach() {
  }
};
function isElementScrolledOutsideView(element, scrollContainers) {
  return scrollContainers.some((containerBounds) => {
    const outsideAbove = element.bottom < containerBounds.top;
    const outsideBelow = element.top > containerBounds.bottom;
    const outsideLeft = element.right < containerBounds.left;
    const outsideRight = element.left > containerBounds.right;
    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
  });
}
function isElementClippedByScrolling(element, scrollContainers) {
  return scrollContainers.some((scrollContainerRect) => {
    const clippedAbove = element.top < scrollContainerRect.top;
    const clippedBelow = element.bottom > scrollContainerRect.bottom;
    const clippedLeft = element.left < scrollContainerRect.left;
    const clippedRight = element.right > scrollContainerRect.right;
    return clippedAbove || clippedBelow || clippedLeft || clippedRight;
  });
}
var RepositionScrollStrategy = class {
  constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._viewportRuler = _viewportRuler;
    this._ngZone = _ngZone;
    this._config = _config;
    this._scrollSubscription = null;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables repositioning of the attached overlay on scroll. */
  enable() {
    if (!this._scrollSubscription) {
      const throttle = this._config ? this._config.scrollThrottle : 0;
      this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
        this._overlayRef.updatePosition();
        if (this._config && this._config.autoClose) {
          const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
          const {
            width,
            height
          } = this._viewportRuler.getViewportSize();
          const parentRects = [{
            width,
            height,
            bottom: height,
            right: width,
            top: 0,
            left: 0
          }];
          if (isElementScrolledOutsideView(overlayRect, parentRects)) {
            this.disable();
            this._ngZone.run(() => this._overlayRef.detach());
          }
        }
      });
    }
  }
  /** Disables repositioning of the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
};
var ScrollStrategyOptions = class _ScrollStrategyOptions {
  constructor(_scrollDispatcher, _viewportRuler, _ngZone, document) {
    this._scrollDispatcher = _scrollDispatcher;
    this._viewportRuler = _viewportRuler;
    this._ngZone = _ngZone;
    this.noop = () => new NoopScrollStrategy();
    this.close = (config) => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone, this._viewportRuler, config);
    this.block = () => new BlockScrollStrategy(this._viewportRuler, this._document);
    this.reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);
    this._document = document;
  }
  static {
    this.ɵfac = function ScrollStrategyOptions_Factory(t) {
      return new (t || _ScrollStrategyOptions)(ɵɵinject(ScrollDispatcher), ɵɵinject(ViewportRuler), ɵɵinject(NgZone), ɵɵinject(DOCUMENT));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ScrollStrategyOptions,
      factory: _ScrollStrategyOptions.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollStrategyOptions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ScrollDispatcher
  }, {
    type: ViewportRuler
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var OverlayConfig = class {
  constructor(config) {
    this.scrollStrategy = new NoopScrollStrategy();
    this.panelClass = "";
    this.hasBackdrop = false;
    this.backdropClass = "cdk-overlay-dark-backdrop";
    this.disposeOnNavigation = false;
    if (config) {
      const configKeys = Object.keys(config);
      for (const key of configKeys) {
        if (config[key] !== void 0) {
          this[key] = config[key];
        }
      }
    }
  }
};
var ConnectedOverlayPositionChange = class {
  constructor(connectionPair, scrollableViewProperties) {
    this.connectionPair = connectionPair;
    this.scrollableViewProperties = scrollableViewProperties;
  }
};
function validateVerticalPosition(property, value) {
  if (value !== "top" && value !== "bottom" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "top", "bottom" or "center".`);
  }
}
function validateHorizontalPosition(property, value) {
  if (value !== "start" && value !== "end" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "start", "end" or "center".`);
  }
}
var BaseOverlayDispatcher = class _BaseOverlayDispatcher {
  constructor(document) {
    this._attachedOverlays = [];
    this._document = document;
  }
  ngOnDestroy() {
    this.detach();
  }
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    this.remove(overlayRef);
    this._attachedOverlays.push(overlayRef);
  }
  /** Remove an overlay from the list of attached overlay refs. */
  remove(overlayRef) {
    const index = this._attachedOverlays.indexOf(overlayRef);
    if (index > -1) {
      this._attachedOverlays.splice(index, 1);
    }
    if (this._attachedOverlays.length === 0) {
      this.detach();
    }
  }
  static {
    this.ɵfac = function BaseOverlayDispatcher_Factory(t) {
      return new (t || _BaseOverlayDispatcher)(ɵɵinject(DOCUMENT));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BaseOverlayDispatcher,
      factory: _BaseOverlayDispatcher.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseOverlayDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var OverlayKeyboardDispatcher = class _OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
  constructor(document, _ngZone) {
    super(document);
    this._ngZone = _ngZone;
    this._keydownListener = (event) => {
      const overlays = this._attachedOverlays;
      for (let i = overlays.length - 1; i > -1; i--) {
        if (overlays[i]._keydownEvents.observers.length > 0) {
          const keydownEvents = overlays[i]._keydownEvents;
          if (this._ngZone) {
            this._ngZone.run(() => keydownEvents.next(event));
          } else {
            keydownEvents.next(event);
          }
          break;
        }
      }
    };
  }
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      if (this._ngZone) {
        this._ngZone.runOutsideAngular(() => this._document.body.addEventListener("keydown", this._keydownListener));
      } else {
        this._document.body.addEventListener("keydown", this._keydownListener);
      }
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      this._document.body.removeEventListener("keydown", this._keydownListener);
      this._isAttached = false;
    }
  }
  static {
    this.ɵfac = function OverlayKeyboardDispatcher_Factory(t) {
      return new (t || _OverlayKeyboardDispatcher)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OverlayKeyboardDispatcher,
      factory: _OverlayKeyboardDispatcher.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayKeyboardDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: NgZone,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var OverlayOutsideClickDispatcher = class _OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
  constructor(document, _platform, _ngZone) {
    super(document);
    this._platform = _platform;
    this._ngZone = _ngZone;
    this._cursorStyleIsSet = false;
    this._pointerDownListener = (event) => {
      this._pointerDownEventTarget = _getEventTarget(event);
    };
    this._clickListener = (event) => {
      const target = _getEventTarget(event);
      const origin = event.type === "click" && this._pointerDownEventTarget ? this._pointerDownEventTarget : target;
      this._pointerDownEventTarget = null;
      const overlays = this._attachedOverlays.slice();
      for (let i = overlays.length - 1; i > -1; i--) {
        const overlayRef = overlays[i];
        if (overlayRef._outsidePointerEvents.observers.length < 1 || !overlayRef.hasAttached()) {
          continue;
        }
        if (overlayRef.overlayElement.contains(target) || overlayRef.overlayElement.contains(origin)) {
          break;
        }
        const outsidePointerEvents = overlayRef._outsidePointerEvents;
        if (this._ngZone) {
          this._ngZone.run(() => outsidePointerEvents.next(event));
        } else {
          outsidePointerEvents.next(event);
        }
      }
    };
  }
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      const body = this._document.body;
      if (this._ngZone) {
        this._ngZone.runOutsideAngular(() => this._addEventListeners(body));
      } else {
        this._addEventListeners(body);
      }
      if (this._platform.IOS && !this._cursorStyleIsSet) {
        this._cursorOriginalValue = body.style.cursor;
        body.style.cursor = "pointer";
        this._cursorStyleIsSet = true;
      }
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      const body = this._document.body;
      body.removeEventListener("pointerdown", this._pointerDownListener, true);
      body.removeEventListener("click", this._clickListener, true);
      body.removeEventListener("auxclick", this._clickListener, true);
      body.removeEventListener("contextmenu", this._clickListener, true);
      if (this._platform.IOS && this._cursorStyleIsSet) {
        body.style.cursor = this._cursorOriginalValue;
        this._cursorStyleIsSet = false;
      }
      this._isAttached = false;
    }
  }
  _addEventListeners(body) {
    body.addEventListener("pointerdown", this._pointerDownListener, true);
    body.addEventListener("click", this._clickListener, true);
    body.addEventListener("auxclick", this._clickListener, true);
    body.addEventListener("contextmenu", this._clickListener, true);
  }
  static {
    this.ɵfac = function OverlayOutsideClickDispatcher_Factory(t) {
      return new (t || _OverlayOutsideClickDispatcher)(ɵɵinject(DOCUMENT), ɵɵinject(Platform), ɵɵinject(NgZone, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OverlayOutsideClickDispatcher,
      factory: _OverlayOutsideClickDispatcher.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayOutsideClickDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Platform
  }, {
    type: NgZone,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var OverlayContainer = class _OverlayContainer {
  constructor(document, _platform) {
    this._platform = _platform;
    this._document = document;
  }
  ngOnDestroy() {
    this._containerElement?.remove();
  }
  /**
   * This method returns the overlay container element. It will lazily
   * create the element the first time it is called to facilitate using
   * the container in non-browser environments.
   * @returns the container element
   */
  getContainerElement() {
    if (!this._containerElement) {
      this._createContainer();
    }
    return this._containerElement;
  }
  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body.
   */
  _createContainer() {
    const containerClass = "cdk-overlay-container";
    if (this._platform.isBrowser || _isTestEnvironment()) {
      const oppositePlatformContainers = this._document.querySelectorAll(`.${containerClass}[platform="server"], .${containerClass}[platform="test"]`);
      for (let i = 0; i < oppositePlatformContainers.length; i++) {
        oppositePlatformContainers[i].remove();
      }
    }
    const container = this._document.createElement("div");
    container.classList.add(containerClass);
    if (_isTestEnvironment()) {
      container.setAttribute("platform", "test");
    } else if (!this._platform.isBrowser) {
      container.setAttribute("platform", "server");
    }
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
  static {
    this.ɵfac = function OverlayContainer_Factory(t) {
      return new (t || _OverlayContainer)(ɵɵinject(DOCUMENT), ɵɵinject(Platform));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OverlayContainer,
      factory: _OverlayContainer.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Platform
  }], null);
})();
var OverlayRef = class {
  constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location, _outsideClickDispatcher, _animationsDisabled = false) {
    this._portalOutlet = _portalOutlet;
    this._host = _host;
    this._pane = _pane;
    this._config = _config;
    this._ngZone = _ngZone;
    this._keyboardDispatcher = _keyboardDispatcher;
    this._document = _document;
    this._location = _location;
    this._outsideClickDispatcher = _outsideClickDispatcher;
    this._animationsDisabled = _animationsDisabled;
    this._backdropElement = null;
    this._backdropClick = new Subject();
    this._attachments = new Subject();
    this._detachments = new Subject();
    this._locationChanges = Subscription.EMPTY;
    this._backdropClickHandler = (event) => this._backdropClick.next(event);
    this._backdropTransitionendHandler = (event) => {
      this._disposeBackdrop(event.target);
    };
    this._keydownEvents = new Subject();
    this._outsidePointerEvents = new Subject();
    if (_config.scrollStrategy) {
      this._scrollStrategy = _config.scrollStrategy;
      this._scrollStrategy.attach(this);
    }
    this._positionStrategy = _config.positionStrategy;
  }
  /** The overlay's HTML element */
  get overlayElement() {
    return this._pane;
  }
  /** The overlay's backdrop HTML element. */
  get backdropElement() {
    return this._backdropElement;
  }
  /**
   * Wrapper around the panel element. Can be used for advanced
   * positioning where a wrapper with specific styling is
   * required around the overlay pane.
   */
  get hostElement() {
    return this._host;
  }
  /**
   * Attaches content, given via a Portal, to the overlay.
   * If the overlay is configured to have a backdrop, it will be created.
   *
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal) {
    if (!this._host.parentElement && this._previousHostParent) {
      this._previousHostParent.appendChild(this._host);
    }
    const attachResult = this._portalOutlet.attach(portal);
    if (this._positionStrategy) {
      this._positionStrategy.attach(this);
    }
    this._updateStackingOrder();
    this._updateElementSize();
    this._updateElementDirection();
    if (this._scrollStrategy) {
      this._scrollStrategy.enable();
    }
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      if (this.hasAttached()) {
        this.updatePosition();
      }
    });
    this._togglePointerEvents(true);
    if (this._config.hasBackdrop) {
      this._attachBackdrop();
    }
    if (this._config.panelClass) {
      this._toggleClasses(this._pane, this._config.panelClass, true);
    }
    this._attachments.next();
    this._keyboardDispatcher.add(this);
    if (this._config.disposeOnNavigation) {
      this._locationChanges = this._location.subscribe(() => this.dispose());
    }
    this._outsideClickDispatcher.add(this);
    if (typeof attachResult?.onDestroy === "function") {
      attachResult.onDestroy(() => {
        if (this.hasAttached()) {
          this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
        }
      });
    }
    return attachResult;
  }
  /**
   * Detaches an overlay from a portal.
   * @returns The portal detachment result.
   */
  detach() {
    if (!this.hasAttached()) {
      return;
    }
    this.detachBackdrop();
    this._togglePointerEvents(false);
    if (this._positionStrategy && this._positionStrategy.detach) {
      this._positionStrategy.detach();
    }
    if (this._scrollStrategy) {
      this._scrollStrategy.disable();
    }
    const detachmentResult = this._portalOutlet.detach();
    this._detachments.next();
    this._keyboardDispatcher.remove(this);
    this._detachContentWhenStable();
    this._locationChanges.unsubscribe();
    this._outsideClickDispatcher.remove(this);
    return detachmentResult;
  }
  /** Cleans up the overlay from the DOM. */
  dispose() {
    const isAttached = this.hasAttached();
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._disposeScrollStrategy();
    this._disposeBackdrop(this._backdropElement);
    this._locationChanges.unsubscribe();
    this._keyboardDispatcher.remove(this);
    this._portalOutlet.dispose();
    this._attachments.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._outsidePointerEvents.complete();
    this._outsideClickDispatcher.remove(this);
    this._host?.remove();
    this._previousHostParent = this._pane = this._host = null;
    if (isAttached) {
      this._detachments.next();
    }
    this._detachments.complete();
  }
  /** Whether the overlay has attached content. */
  hasAttached() {
    return this._portalOutlet.hasAttached();
  }
  /** Gets an observable that emits when the backdrop has been clicked. */
  backdropClick() {
    return this._backdropClick;
  }
  /** Gets an observable that emits when the overlay has been attached. */
  attachments() {
    return this._attachments;
  }
  /** Gets an observable that emits when the overlay has been detached. */
  detachments() {
    return this._detachments;
  }
  /** Gets an observable of keydown events targeted to this overlay. */
  keydownEvents() {
    return this._keydownEvents;
  }
  /** Gets an observable of pointer events targeted outside this overlay. */
  outsidePointerEvents() {
    return this._outsidePointerEvents;
  }
  /** Gets the current overlay configuration, which is immutable. */
  getConfig() {
    return this._config;
  }
  /** Updates the position of the overlay based on the position strategy. */
  updatePosition() {
    if (this._positionStrategy) {
      this._positionStrategy.apply();
    }
  }
  /** Switches to a new position strategy and updates the overlay position. */
  updatePositionStrategy(strategy) {
    if (strategy === this._positionStrategy) {
      return;
    }
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._positionStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      this.updatePosition();
    }
  }
  /** Update the size properties of the overlay. */
  updateSize(sizeConfig) {
    this._config = __spreadValues(__spreadValues({}, this._config), sizeConfig);
    this._updateElementSize();
  }
  /** Sets the LTR/RTL direction for the overlay. */
  setDirection(dir) {
    this._config = __spreadProps(__spreadValues({}, this._config), {
      direction: dir
    });
    this._updateElementDirection();
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, true);
    }
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, false);
    }
  }
  /**
   * Returns the layout direction of the overlay panel.
   */
  getDirection() {
    const direction = this._config.direction;
    if (!direction) {
      return "ltr";
    }
    return typeof direction === "string" ? direction : direction.value;
  }
  /** Switches to a new scroll strategy. */
  updateScrollStrategy(strategy) {
    if (strategy === this._scrollStrategy) {
      return;
    }
    this._disposeScrollStrategy();
    this._scrollStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      strategy.enable();
    }
  }
  /** Updates the text direction of the overlay panel. */
  _updateElementDirection() {
    this._host.setAttribute("dir", this.getDirection());
  }
  /** Updates the size of the overlay element based on the overlay config. */
  _updateElementSize() {
    if (!this._pane) {
      return;
    }
    const style = this._pane.style;
    style.width = coerceCssPixelValue(this._config.width);
    style.height = coerceCssPixelValue(this._config.height);
    style.minWidth = coerceCssPixelValue(this._config.minWidth);
    style.minHeight = coerceCssPixelValue(this._config.minHeight);
    style.maxWidth = coerceCssPixelValue(this._config.maxWidth);
    style.maxHeight = coerceCssPixelValue(this._config.maxHeight);
  }
  /** Toggles the pointer events for the overlay pane element. */
  _togglePointerEvents(enablePointer) {
    this._pane.style.pointerEvents = enablePointer ? "" : "none";
  }
  /** Attaches a backdrop for this overlay. */
  _attachBackdrop() {
    const showingClass = "cdk-overlay-backdrop-showing";
    this._backdropElement = this._document.createElement("div");
    this._backdropElement.classList.add("cdk-overlay-backdrop");
    if (this._animationsDisabled) {
      this._backdropElement.classList.add("cdk-overlay-backdrop-noop-animation");
    }
    if (this._config.backdropClass) {
      this._toggleClasses(this._backdropElement, this._config.backdropClass, true);
    }
    this._host.parentElement.insertBefore(this._backdropElement, this._host);
    this._backdropElement.addEventListener("click", this._backdropClickHandler);
    if (!this._animationsDisabled && typeof requestAnimationFrame !== "undefined") {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          if (this._backdropElement) {
            this._backdropElement.classList.add(showingClass);
          }
        });
      });
    } else {
      this._backdropElement.classList.add(showingClass);
    }
  }
  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  _updateStackingOrder() {
    if (this._host.nextSibling) {
      this._host.parentNode.appendChild(this._host);
    }
  }
  /** Detaches the backdrop (if any) associated with the overlay. */
  detachBackdrop() {
    const backdropToDetach = this._backdropElement;
    if (!backdropToDetach) {
      return;
    }
    if (this._animationsDisabled) {
      this._disposeBackdrop(backdropToDetach);
      return;
    }
    backdropToDetach.classList.remove("cdk-overlay-backdrop-showing");
    this._ngZone.runOutsideAngular(() => {
      backdropToDetach.addEventListener("transitionend", this._backdropTransitionendHandler);
    });
    backdropToDetach.style.pointerEvents = "none";
    this._backdropTimeout = this._ngZone.runOutsideAngular(() => setTimeout(() => {
      this._disposeBackdrop(backdropToDetach);
    }, 500));
  }
  /** Toggles a single CSS class or an array of classes on an element. */
  _toggleClasses(element, cssClasses, isAdd) {
    const classes = coerceArray(cssClasses || []).filter((c) => !!c);
    if (classes.length) {
      isAdd ? element.classList.add(...classes) : element.classList.remove(...classes);
    }
  }
  /** Detaches the overlay content next time the zone stabilizes. */
  _detachContentWhenStable() {
    this._ngZone.runOutsideAngular(() => {
      const subscription = this._ngZone.onStable.pipe(takeUntil(merge(this._attachments, this._detachments))).subscribe(() => {
        if (!this._pane || !this._host || this._pane.children.length === 0) {
          if (this._pane && this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, false);
          }
          if (this._host && this._host.parentElement) {
            this._previousHostParent = this._host.parentElement;
            this._host.remove();
          }
          subscription.unsubscribe();
        }
      });
    });
  }
  /** Disposes of a scroll strategy. */
  _disposeScrollStrategy() {
    const scrollStrategy = this._scrollStrategy;
    if (scrollStrategy) {
      scrollStrategy.disable();
      if (scrollStrategy.detach) {
        scrollStrategy.detach();
      }
    }
  }
  /** Removes a backdrop element from the DOM. */
  _disposeBackdrop(backdrop) {
    if (backdrop) {
      backdrop.removeEventListener("click", this._backdropClickHandler);
      backdrop.removeEventListener("transitionend", this._backdropTransitionendHandler);
      backdrop.remove();
      if (this._backdropElement === backdrop) {
        this._backdropElement = null;
      }
    }
    if (this._backdropTimeout) {
      clearTimeout(this._backdropTimeout);
      this._backdropTimeout = void 0;
    }
  }
};
var boundingBoxClass = "cdk-overlay-connected-position-bounding-box";
var cssUnitPattern = /([A-Za-z%]+)$/;
var FlexibleConnectedPositionStrategy = class {
  /** Ordered list of preferred positions, from most to least desirable. */
  get positions() {
    return this._preferredPositions;
  }
  constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
    this._viewportRuler = _viewportRuler;
    this._document = _document;
    this._platform = _platform;
    this._overlayContainer = _overlayContainer;
    this._lastBoundingBoxSize = {
      width: 0,
      height: 0
    };
    this._isPushed = false;
    this._canPush = true;
    this._growAfterOpen = false;
    this._hasFlexibleDimensions = true;
    this._positionLocked = false;
    this._viewportMargin = 0;
    this._scrollables = [];
    this._preferredPositions = [];
    this._positionChanges = new Subject();
    this._resizeSubscription = Subscription.EMPTY;
    this._offsetX = 0;
    this._offsetY = 0;
    this._appliedPanelClasses = [];
    this.positionChanges = this._positionChanges;
    this.setOrigin(connectedTo);
  }
  /** Attaches this position strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && overlayRef !== this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("This position strategy is already attached to an overlay");
    }
    this._validatePositions();
    overlayRef.hostElement.classList.add(boundingBoxClass);
    this._overlayRef = overlayRef;
    this._boundingBox = overlayRef.hostElement;
    this._pane = overlayRef.overlayElement;
    this._isDisposed = false;
    this._isInitialRender = true;
    this._lastPosition = null;
    this._resizeSubscription.unsubscribe();
    this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
      this._isInitialRender = true;
      this.apply();
    });
  }
  /**
   * Updates the position of the overlay element, using whichever preferred position relative
   * to the origin best fits on-screen.
   *
   * The selection of a position goes as follows:
   *  - If any positions fit completely within the viewport as-is,
   *      choose the first position that does so.
   *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
   *      choose the position with the greatest available size modified by the positions' weight.
   *  - If pushing is enabled, take the position that went off-screen the least and push it
   *      on-screen.
   *  - If none of the previous criteria were met, use the position that goes off-screen the least.
   * @docs-private
   */
  apply() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return;
    }
    this._clearPanelClasses();
    this._resetOverlayElementStyles();
    this._resetBoundingBoxStyles();
    this._viewportRect = this._getNarrowedViewportRect();
    this._originRect = this._getOriginRect();
    this._overlayRect = this._pane.getBoundingClientRect();
    this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
    const originRect = this._originRect;
    const overlayRect = this._overlayRect;
    const viewportRect = this._viewportRect;
    const containerRect = this._containerRect;
    const flexibleFits = [];
    let fallback;
    for (let pos of this._preferredPositions) {
      let originPoint = this._getOriginPoint(originRect, containerRect, pos);
      let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
      let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
      if (overlayFit.isCompletelyWithinViewport) {
        this._isPushed = false;
        this._applyPosition(pos, originPoint);
        return;
      }
      if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
        flexibleFits.push({
          position: pos,
          origin: originPoint,
          overlayRect,
          boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
        });
        continue;
      }
      if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
        fallback = {
          overlayFit,
          overlayPoint,
          originPoint,
          position: pos,
          overlayRect
        };
      }
    }
    if (flexibleFits.length) {
      let bestFit = null;
      let bestScore = -1;
      for (const fit of flexibleFits) {
        const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
        if (score > bestScore) {
          bestScore = score;
          bestFit = fit;
        }
      }
      this._isPushed = false;
      this._applyPosition(bestFit.position, bestFit.origin);
      return;
    }
    if (this._canPush) {
      this._isPushed = true;
      this._applyPosition(fallback.position, fallback.originPoint);
      return;
    }
    this._applyPosition(fallback.position, fallback.originPoint);
  }
  detach() {
    this._clearPanelClasses();
    this._lastPosition = null;
    this._previousPushAmount = null;
    this._resizeSubscription.unsubscribe();
  }
  /** Cleanup after the element gets destroyed. */
  dispose() {
    if (this._isDisposed) {
      return;
    }
    if (this._boundingBox) {
      extendStyles(this._boundingBox.style, {
        top: "",
        left: "",
        right: "",
        bottom: "",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: ""
      });
    }
    if (this._pane) {
      this._resetOverlayElementStyles();
    }
    if (this._overlayRef) {
      this._overlayRef.hostElement.classList.remove(boundingBoxClass);
    }
    this.detach();
    this._positionChanges.complete();
    this._overlayRef = this._boundingBox = null;
    this._isDisposed = true;
  }
  /**
   * This re-aligns the overlay element with the trigger in its last calculated position,
   * even if a position higher in the "preferred positions" list would now fit. This
   * allows one to re-align the panel without changing the orientation of the panel.
   */
  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    const lastPosition = this._lastPosition;
    if (lastPosition) {
      this._originRect = this._getOriginRect();
      this._overlayRect = this._pane.getBoundingClientRect();
      this._viewportRect = this._getNarrowedViewportRect();
      this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
      const originPoint = this._getOriginPoint(this._originRect, this._containerRect, lastPosition);
      this._applyPosition(lastPosition, originPoint);
    } else {
      this.apply();
    }
  }
  /**
   * Sets the list of Scrollable containers that host the origin element so that
   * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
   * Scrollable must be an ancestor element of the strategy's origin element.
   */
  withScrollableContainers(scrollables) {
    this._scrollables = scrollables;
    return this;
  }
  /**
   * Adds new preferred positions.
   * @param positions List of positions options for this overlay.
   */
  withPositions(positions) {
    this._preferredPositions = positions;
    if (positions.indexOf(this._lastPosition) === -1) {
      this._lastPosition = null;
    }
    this._validatePositions();
    return this;
  }
  /**
   * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
   * @param margin Required margin between the overlay and the viewport edge in pixels.
   */
  withViewportMargin(margin) {
    this._viewportMargin = margin;
    return this;
  }
  /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
  withFlexibleDimensions(flexibleDimensions = true) {
    this._hasFlexibleDimensions = flexibleDimensions;
    return this;
  }
  /** Sets whether the overlay can grow after the initial open via flexible width/height. */
  withGrowAfterOpen(growAfterOpen = true) {
    this._growAfterOpen = growAfterOpen;
    return this;
  }
  /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
  withPush(canPush = true) {
    this._canPush = canPush;
    return this;
  }
  /**
   * Sets whether the overlay's position should be locked in after it is positioned
   * initially. When an overlay is locked in, it won't attempt to reposition itself
   * when the position is re-applied (e.g. when the user scrolls away).
   * @param isLocked Whether the overlay should locked in.
   */
  withLockedPosition(isLocked = true) {
    this._positionLocked = isLocked;
    return this;
  }
  /**
   * Sets the origin, relative to which to position the overlay.
   * Using an element origin is useful for building components that need to be positioned
   * relatively to a trigger (e.g. dropdown menus or tooltips), whereas using a point can be
   * used for cases like contextual menus which open relative to the user's pointer.
   * @param origin Reference to the new origin.
   */
  setOrigin(origin) {
    this._origin = origin;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the x-axis.
   * @param offset New offset in the X axis.
   */
  withDefaultOffsetX(offset) {
    this._offsetX = offset;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the y-axis.
   * @param offset New offset in the Y axis.
   */
  withDefaultOffsetY(offset) {
    this._offsetY = offset;
    return this;
  }
  /**
   * Configures that the position strategy should set a `transform-origin` on some elements
   * inside the overlay, depending on the current position that is being applied. This is
   * useful for the cases where the origin of an animation can change depending on the
   * alignment of the overlay.
   * @param selector CSS selector that will be used to find the target
   *    elements onto which to set the transform origin.
   */
  withTransformOriginOn(selector) {
    this._transformOriginSelector = selector;
    return this;
  }
  /**
   * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
   */
  _getOriginPoint(originRect, containerRect, pos) {
    let x;
    if (pos.originX == "center") {
      x = originRect.left + originRect.width / 2;
    } else {
      const startX = this._isRtl() ? originRect.right : originRect.left;
      const endX = this._isRtl() ? originRect.left : originRect.right;
      x = pos.originX == "start" ? startX : endX;
    }
    if (containerRect.left < 0) {
      x -= containerRect.left;
    }
    let y;
    if (pos.originY == "center") {
      y = originRect.top + originRect.height / 2;
    } else {
      y = pos.originY == "top" ? originRect.top : originRect.bottom;
    }
    if (containerRect.top < 0) {
      y -= containerRect.top;
    }
    return {
      x,
      y
    };
  }
  /**
   * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
   * origin point to which the overlay should be connected.
   */
  _getOverlayPoint(originPoint, overlayRect, pos) {
    let overlayStartX;
    if (pos.overlayX == "center") {
      overlayStartX = -overlayRect.width / 2;
    } else if (pos.overlayX === "start") {
      overlayStartX = this._isRtl() ? -overlayRect.width : 0;
    } else {
      overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
    }
    let overlayStartY;
    if (pos.overlayY == "center") {
      overlayStartY = -overlayRect.height / 2;
    } else {
      overlayStartY = pos.overlayY == "top" ? 0 : -overlayRect.height;
    }
    return {
      x: originPoint.x + overlayStartX,
      y: originPoint.y + overlayStartY
    };
  }
  /** Gets how well an overlay at the given point will fit within the viewport. */
  _getOverlayFit(point, rawOverlayRect, viewport, position) {
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    let {
      x,
      y
    } = point;
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      x += offsetX;
    }
    if (offsetY) {
      y += offsetY;
    }
    let leftOverflow = 0 - x;
    let rightOverflow = x + overlay.width - viewport.width;
    let topOverflow = 0 - y;
    let bottomOverflow = y + overlay.height - viewport.height;
    let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
    let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
    let visibleArea = visibleWidth * visibleHeight;
    return {
      visibleArea,
      isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
      fitsInViewportVertically: visibleHeight === overlay.height,
      fitsInViewportHorizontally: visibleWidth == overlay.width
    };
  }
  /**
   * Whether the overlay can fit within the viewport when it may resize either its width or height.
   * @param fit How well the overlay fits in the viewport at some position.
   * @param point The (x, y) coordinates of the overlay at some position.
   * @param viewport The geometry of the viewport.
   */
  _canFitWithFlexibleDimensions(fit, point, viewport) {
    if (this._hasFlexibleDimensions) {
      const availableHeight = viewport.bottom - point.y;
      const availableWidth = viewport.right - point.x;
      const minHeight = getPixelValue(this._overlayRef.getConfig().minHeight);
      const minWidth = getPixelValue(this._overlayRef.getConfig().minWidth);
      const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
      const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
      return verticalFit && horizontalFit;
    }
    return false;
  }
  /**
   * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
   * the viewport, the top-left corner will be pushed on-screen (with overflow occurring on the
   * right and bottom).
   *
   * @param start Starting point from which the overlay is pushed.
   * @param rawOverlayRect Dimensions of the overlay.
   * @param scrollPosition Current viewport scroll position.
   * @returns The point at which to position the overlay after pushing. This is effectively a new
   *     originPoint.
   */
  _pushOverlayOnScreen(start, rawOverlayRect, scrollPosition) {
    if (this._previousPushAmount && this._positionLocked) {
      return {
        x: start.x + this._previousPushAmount.x,
        y: start.y + this._previousPushAmount.y
      };
    }
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    const viewport = this._viewportRect;
    const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
    const overflowBottom = Math.max(start.y + overlay.height - viewport.height, 0);
    const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
    const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
    let pushX = 0;
    let pushY = 0;
    if (overlay.width <= viewport.width) {
      pushX = overflowLeft || -overflowRight;
    } else {
      pushX = start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0;
    }
    if (overlay.height <= viewport.height) {
      pushY = overflowTop || -overflowBottom;
    } else {
      pushY = start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0;
    }
    this._previousPushAmount = {
      x: pushX,
      y: pushY
    };
    return {
      x: start.x + pushX,
      y: start.y + pushY
    };
  }
  /**
   * Applies a computed position to the overlay and emits a position change.
   * @param position The position preference
   * @param originPoint The point on the origin element where the overlay is connected.
   */
  _applyPosition(position, originPoint) {
    this._setTransformOrigin(position);
    this._setOverlayElementStyles(originPoint, position);
    this._setBoundingBoxStyles(originPoint, position);
    if (position.panelClass) {
      this._addPanelClasses(position.panelClass);
    }
    if (this._positionChanges.observers.length) {
      const scrollVisibility = this._getScrollVisibility();
      if (position !== this._lastPosition || !this._lastScrollVisibility || !compareScrollVisibility(this._lastScrollVisibility, scrollVisibility)) {
        const changeEvent = new ConnectedOverlayPositionChange(position, scrollVisibility);
        this._positionChanges.next(changeEvent);
      }
      this._lastScrollVisibility = scrollVisibility;
    }
    this._lastPosition = position;
    this._isInitialRender = false;
  }
  /** Sets the transform origin based on the configured selector and the passed-in position.  */
  _setTransformOrigin(position) {
    if (!this._transformOriginSelector) {
      return;
    }
    const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector);
    let xOrigin;
    let yOrigin = position.overlayY;
    if (position.overlayX === "center") {
      xOrigin = "center";
    } else if (this._isRtl()) {
      xOrigin = position.overlayX === "start" ? "right" : "left";
    } else {
      xOrigin = position.overlayX === "start" ? "left" : "right";
    }
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
    }
  }
  /**
   * Gets the position and size of the overlay's sizing container.
   *
   * This method does no measuring and applies no styles so that we can cheaply compute the
   * bounds for all positions and choose the best fit based on these results.
   */
  _calculateBoundingBoxRect(origin, position) {
    const viewport = this._viewportRect;
    const isRtl = this._isRtl();
    let height, top, bottom;
    if (position.overlayY === "top") {
      top = origin.y;
      height = viewport.height - top + this._viewportMargin;
    } else if (position.overlayY === "bottom") {
      bottom = viewport.height - origin.y + this._viewportMargin * 2;
      height = viewport.height - bottom + this._viewportMargin;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
      const previousHeight = this._lastBoundingBoxSize.height;
      height = smallestDistanceToViewportEdge * 2;
      top = origin.y - smallestDistanceToViewportEdge;
      if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
        top = origin.y - previousHeight / 2;
      }
    }
    const isBoundedByRightViewportEdge = position.overlayX === "start" && !isRtl || position.overlayX === "end" && isRtl;
    const isBoundedByLeftViewportEdge = position.overlayX === "end" && !isRtl || position.overlayX === "start" && isRtl;
    let width, left, right;
    if (isBoundedByLeftViewportEdge) {
      right = viewport.width - origin.x + this._viewportMargin * 2;
      width = origin.x - this._viewportMargin;
    } else if (isBoundedByRightViewportEdge) {
      left = origin.x;
      width = viewport.right - origin.x;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
      const previousWidth = this._lastBoundingBoxSize.width;
      width = smallestDistanceToViewportEdge * 2;
      left = origin.x - smallestDistanceToViewportEdge;
      if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
        left = origin.x - previousWidth / 2;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  /**
   * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
   * origin's connection point and stretches to the bounds of the viewport.
   *
   * @param origin The point on the origin element where the overlay is connected.
   * @param position The position preference
   */
  _setBoundingBoxStyles(origin, position) {
    const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
    if (!this._isInitialRender && !this._growAfterOpen) {
      boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
      boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
    }
    const styles = {};
    if (this._hasExactPosition()) {
      styles.top = styles.left = "0";
      styles.bottom = styles.right = styles.maxHeight = styles.maxWidth = "";
      styles.width = styles.height = "100%";
    } else {
      const maxHeight = this._overlayRef.getConfig().maxHeight;
      const maxWidth = this._overlayRef.getConfig().maxWidth;
      styles.height = coerceCssPixelValue(boundingBoxRect.height);
      styles.top = coerceCssPixelValue(boundingBoxRect.top);
      styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
      styles.width = coerceCssPixelValue(boundingBoxRect.width);
      styles.left = coerceCssPixelValue(boundingBoxRect.left);
      styles.right = coerceCssPixelValue(boundingBoxRect.right);
      if (position.overlayX === "center") {
        styles.alignItems = "center";
      } else {
        styles.alignItems = position.overlayX === "end" ? "flex-end" : "flex-start";
      }
      if (position.overlayY === "center") {
        styles.justifyContent = "center";
      } else {
        styles.justifyContent = position.overlayY === "bottom" ? "flex-end" : "flex-start";
      }
      if (maxHeight) {
        styles.maxHeight = coerceCssPixelValue(maxHeight);
      }
      if (maxWidth) {
        styles.maxWidth = coerceCssPixelValue(maxWidth);
      }
    }
    this._lastBoundingBoxSize = boundingBoxRect;
    extendStyles(this._boundingBox.style, styles);
  }
  /** Resets the styles for the bounding box so that a new positioning can be computed. */
  _resetBoundingBoxStyles() {
    extendStyles(this._boundingBox.style, {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      height: "",
      width: "",
      alignItems: "",
      justifyContent: ""
    });
  }
  /** Resets the styles for the overlay pane so that a new positioning can be computed. */
  _resetOverlayElementStyles() {
    extendStyles(this._pane.style, {
      top: "",
      left: "",
      bottom: "",
      right: "",
      position: "",
      transform: ""
    });
  }
  /** Sets positioning styles to the overlay element. */
  _setOverlayElementStyles(originPoint, position) {
    const styles = {};
    const hasExactPosition = this._hasExactPosition();
    const hasFlexibleDimensions = this._hasFlexibleDimensions;
    const config = this._overlayRef.getConfig();
    if (hasExactPosition) {
      const scrollPosition = this._viewportRuler.getViewportScrollPosition();
      extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
      extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
    } else {
      styles.position = "static";
    }
    let transformString = "";
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      transformString += `translateX(${offsetX}px) `;
    }
    if (offsetY) {
      transformString += `translateY(${offsetY}px)`;
    }
    styles.transform = transformString.trim();
    if (config.maxHeight) {
      if (hasExactPosition) {
        styles.maxHeight = coerceCssPixelValue(config.maxHeight);
      } else if (hasFlexibleDimensions) {
        styles.maxHeight = "";
      }
    }
    if (config.maxWidth) {
      if (hasExactPosition) {
        styles.maxWidth = coerceCssPixelValue(config.maxWidth);
      } else if (hasFlexibleDimensions) {
        styles.maxWidth = "";
      }
    }
    extendStyles(this._pane.style, styles);
  }
  /** Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayY(position, originPoint, scrollPosition) {
    let styles = {
      top: "",
      bottom: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    if (position.overlayY === "bottom") {
      const documentHeight = this._document.documentElement.clientHeight;
      styles.bottom = `${documentHeight - (overlayPoint.y + this._overlayRect.height)}px`;
    } else {
      styles.top = coerceCssPixelValue(overlayPoint.y);
    }
    return styles;
  }
  /** Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayX(position, originPoint, scrollPosition) {
    let styles = {
      left: "",
      right: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    let horizontalStyleProperty;
    if (this._isRtl()) {
      horizontalStyleProperty = position.overlayX === "end" ? "left" : "right";
    } else {
      horizontalStyleProperty = position.overlayX === "end" ? "right" : "left";
    }
    if (horizontalStyleProperty === "right") {
      const documentWidth = this._document.documentElement.clientWidth;
      styles.right = `${documentWidth - (overlayPoint.x + this._overlayRect.width)}px`;
    } else {
      styles.left = coerceCssPixelValue(overlayPoint.x);
    }
    return styles;
  }
  /**
   * Gets the view properties of the trigger and overlay, including whether they are clipped
   * or completely outside the view of any of the strategy's scrollables.
   */
  _getScrollVisibility() {
    const originBounds = this._getOriginRect();
    const overlayBounds = this._pane.getBoundingClientRect();
    const scrollContainerBounds = this._scrollables.map((scrollable) => {
      return scrollable.getElementRef().nativeElement.getBoundingClientRect();
    });
    return {
      isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
      isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
      isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
      isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
    };
  }
  /** Subtracts the amount that an element is overflowing on an axis from its length. */
  _subtractOverflows(length, ...overflows) {
    return overflows.reduce((currentValue, currentOverflow) => {
      return currentValue - Math.max(currentOverflow, 0);
    }, length);
  }
  /** Narrows the given viewport rect by the current _viewportMargin. */
  _getNarrowedViewportRect() {
    const width = this._document.documentElement.clientWidth;
    const height = this._document.documentElement.clientHeight;
    const scrollPosition = this._viewportRuler.getViewportScrollPosition();
    return {
      top: scrollPosition.top + this._viewportMargin,
      left: scrollPosition.left + this._viewportMargin,
      right: scrollPosition.left + width - this._viewportMargin,
      bottom: scrollPosition.top + height - this._viewportMargin,
      width: width - 2 * this._viewportMargin,
      height: height - 2 * this._viewportMargin
    };
  }
  /** Whether the we're dealing with an RTL context */
  _isRtl() {
    return this._overlayRef.getDirection() === "rtl";
  }
  /** Determines whether the overlay uses exact or flexible positioning. */
  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed;
  }
  /** Retrieves the offset of a position along the x or y axis. */
  _getOffset(position, axis) {
    if (axis === "x") {
      return position.offsetX == null ? this._offsetX : position.offsetX;
    }
    return position.offsetY == null ? this._offsetY : position.offsetY;
  }
  /** Validates that the current position match the expected values. */
  _validatePositions() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._preferredPositions.length) {
        throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");
      }
      this._preferredPositions.forEach((pair) => {
        validateHorizontalPosition("originX", pair.originX);
        validateVerticalPosition("originY", pair.originY);
        validateHorizontalPosition("overlayX", pair.overlayX);
        validateVerticalPosition("overlayY", pair.overlayY);
      });
    }
  }
  /** Adds a single CSS class or an array of classes on the overlay panel. */
  _addPanelClasses(cssClasses) {
    if (this._pane) {
      coerceArray(cssClasses).forEach((cssClass) => {
        if (cssClass !== "" && this._appliedPanelClasses.indexOf(cssClass) === -1) {
          this._appliedPanelClasses.push(cssClass);
          this._pane.classList.add(cssClass);
        }
      });
    }
  }
  /** Clears the classes that the position strategy has applied from the overlay panel. */
  _clearPanelClasses() {
    if (this._pane) {
      this._appliedPanelClasses.forEach((cssClass) => {
        this._pane.classList.remove(cssClass);
      });
      this._appliedPanelClasses = [];
    }
  }
  /** Returns the DOMRect of the current origin. */
  _getOriginRect() {
    const origin = this._origin;
    if (origin instanceof ElementRef) {
      return origin.nativeElement.getBoundingClientRect();
    }
    if (origin instanceof Element) {
      return origin.getBoundingClientRect();
    }
    const width = origin.width || 0;
    const height = origin.height || 0;
    return {
      top: origin.y,
      bottom: origin.y + height,
      left: origin.x,
      right: origin.x + width,
      height,
      width
    };
  }
};
function extendStyles(destination, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
}
function getPixelValue(input) {
  if (typeof input !== "number" && input != null) {
    const [value, units] = input.split(cssUnitPattern);
    return !units || units === "px" ? parseFloat(value) : null;
  }
  return input || null;
}
function getRoundedBoundingClientRect(clientRect) {
  return {
    top: Math.floor(clientRect.top),
    right: Math.floor(clientRect.right),
    bottom: Math.floor(clientRect.bottom),
    left: Math.floor(clientRect.left),
    width: Math.floor(clientRect.width),
    height: Math.floor(clientRect.height)
  };
}
function compareScrollVisibility(a, b) {
  if (a === b) {
    return true;
  }
  return a.isOriginClipped === b.isOriginClipped && a.isOriginOutsideView === b.isOriginOutsideView && a.isOverlayClipped === b.isOverlayClipped && a.isOverlayOutsideView === b.isOverlayOutsideView;
}
var wrapperClass = "cdk-global-overlay-wrapper";
var GlobalPositionStrategy = class {
  constructor() {
    this._cssPosition = "static";
    this._topOffset = "";
    this._bottomOffset = "";
    this._alignItems = "";
    this._xPosition = "";
    this._xOffset = "";
    this._width = "";
    this._height = "";
    this._isDisposed = false;
  }
  attach(overlayRef) {
    const config = overlayRef.getConfig();
    this._overlayRef = overlayRef;
    if (this._width && !config.width) {
      overlayRef.updateSize({
        width: this._width
      });
    }
    if (this._height && !config.height) {
      overlayRef.updateSize({
        height: this._height
      });
    }
    overlayRef.hostElement.classList.add(wrapperClass);
    this._isDisposed = false;
  }
  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   * @param value New top offset.
   */
  top(value = "") {
    this._bottomOffset = "";
    this._topOffset = value;
    this._alignItems = "flex-start";
    return this;
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   * @param value New left offset.
   */
  left(value = "") {
    this._xOffset = value;
    this._xPosition = "left";
    return this;
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   * @param value New bottom offset.
   */
  bottom(value = "") {
    this._topOffset = "";
    this._bottomOffset = value;
    this._alignItems = "flex-end";
    return this;
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   * @param value New right offset.
   */
  right(value = "") {
    this._xOffset = value;
    this._xPosition = "right";
    return this;
  }
  /**
   * Sets the overlay to the start of the viewport, depending on the overlay direction.
   * This will be to the left in LTR layouts and to the right in RTL.
   * @param offset Offset from the edge of the screen.
   */
  start(value = "") {
    this._xOffset = value;
    this._xPosition = "start";
    return this;
  }
  /**
   * Sets the overlay to the end of the viewport, depending on the overlay direction.
   * This will be to the right in LTR layouts and to the left in RTL.
   * @param offset Offset from the edge of the screen.
   */
  end(value = "") {
    this._xOffset = value;
    this._xPosition = "end";
    return this;
  }
  /**
   * Sets the overlay width and clears any previously set width.
   * @param value New width for the overlay
   * @deprecated Pass the `width` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  width(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        width: value
      });
    } else {
      this._width = value;
    }
    return this;
  }
  /**
   * Sets the overlay height and clears any previously set height.
   * @param value New height for the overlay
   * @deprecated Pass the `height` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  height(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        height: value
      });
    } else {
      this._height = value;
    }
    return this;
  }
  /**
   * Centers the overlay horizontally with an optional offset.
   * Clears any previously set horizontal position.
   *
   * @param offset Overlay offset from the horizontal center.
   */
  centerHorizontally(offset = "") {
    this.left(offset);
    this._xPosition = "center";
    return this;
  }
  /**
   * Centers the overlay vertically with an optional offset.
   * Clears any previously set vertical position.
   *
   * @param offset Overlay offset from the vertical center.
   */
  centerVertically(offset = "") {
    this.top(offset);
    this._alignItems = "center";
    return this;
  }
  /**
   * Apply the position to the element.
   * @docs-private
   */
  apply() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parentStyles = this._overlayRef.hostElement.style;
    const config = this._overlayRef.getConfig();
    const {
      width,
      height,
      maxWidth,
      maxHeight
    } = config;
    const shouldBeFlushHorizontally = (width === "100%" || width === "100vw") && (!maxWidth || maxWidth === "100%" || maxWidth === "100vw");
    const shouldBeFlushVertically = (height === "100%" || height === "100vh") && (!maxHeight || maxHeight === "100%" || maxHeight === "100vh");
    const xPosition = this._xPosition;
    const xOffset = this._xOffset;
    const isRtl = this._overlayRef.getConfig().direction === "rtl";
    let marginLeft = "";
    let marginRight = "";
    let justifyContent = "";
    if (shouldBeFlushHorizontally) {
      justifyContent = "flex-start";
    } else if (xPosition === "center") {
      justifyContent = "center";
      if (isRtl) {
        marginRight = xOffset;
      } else {
        marginLeft = xOffset;
      }
    } else if (isRtl) {
      if (xPosition === "left" || xPosition === "end") {
        justifyContent = "flex-end";
        marginLeft = xOffset;
      } else if (xPosition === "right" || xPosition === "start") {
        justifyContent = "flex-start";
        marginRight = xOffset;
      }
    } else if (xPosition === "left" || xPosition === "start") {
      justifyContent = "flex-start";
      marginLeft = xOffset;
    } else if (xPosition === "right" || xPosition === "end") {
      justifyContent = "flex-end";
      marginRight = xOffset;
    }
    styles.position = this._cssPosition;
    styles.marginLeft = shouldBeFlushHorizontally ? "0" : marginLeft;
    styles.marginTop = shouldBeFlushVertically ? "0" : this._topOffset;
    styles.marginBottom = this._bottomOffset;
    styles.marginRight = shouldBeFlushHorizontally ? "0" : marginRight;
    parentStyles.justifyContent = justifyContent;
    parentStyles.alignItems = shouldBeFlushVertically ? "flex-start" : this._alignItems;
  }
  /**
   * Cleans up the DOM changes from the position strategy.
   * @docs-private
   */
  dispose() {
    if (this._isDisposed || !this._overlayRef) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parent = this._overlayRef.hostElement;
    const parentStyles = parent.style;
    parent.classList.remove(wrapperClass);
    parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = "";
    this._overlayRef = null;
    this._isDisposed = true;
  }
};
var OverlayPositionBuilder = class _OverlayPositionBuilder {
  constructor(_viewportRuler, _document, _platform, _overlayContainer) {
    this._viewportRuler = _viewportRuler;
    this._document = _document;
    this._platform = _platform;
    this._overlayContainer = _overlayContainer;
  }
  /**
   * Creates a global position strategy.
   */
  global() {
    return new GlobalPositionStrategy();
  }
  /**
   * Creates a flexible position strategy.
   * @param origin Origin relative to which to position the overlay.
   */
  flexibleConnectedTo(origin) {
    return new FlexibleConnectedPositionStrategy(origin, this._viewportRuler, this._document, this._platform, this._overlayContainer);
  }
  static {
    this.ɵfac = function OverlayPositionBuilder_Factory(t) {
      return new (t || _OverlayPositionBuilder)(ɵɵinject(ViewportRuler), ɵɵinject(DOCUMENT), ɵɵinject(Platform), ɵɵinject(OverlayContainer));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OverlayPositionBuilder,
      factory: _OverlayPositionBuilder.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayPositionBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ViewportRuler
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Platform
  }, {
    type: OverlayContainer
  }], null);
})();
var nextUniqueId = 0;
var Overlay = class _Overlay {
  constructor(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality, _location, _outsideClickDispatcher, _animationsModuleType) {
    this.scrollStrategies = scrollStrategies;
    this._overlayContainer = _overlayContainer;
    this._componentFactoryResolver = _componentFactoryResolver;
    this._positionBuilder = _positionBuilder;
    this._keyboardDispatcher = _keyboardDispatcher;
    this._injector = _injector;
    this._ngZone = _ngZone;
    this._document = _document;
    this._directionality = _directionality;
    this._location = _location;
    this._outsideClickDispatcher = _outsideClickDispatcher;
    this._animationsModuleType = _animationsModuleType;
  }
  /**
   * Creates an overlay.
   * @param config Configuration applied to the overlay.
   * @returns Reference to the created overlay.
   */
  create(config) {
    const host = this._createHostElement();
    const pane = this._createPaneElement(host);
    const portalOutlet = this._createPortalOutlet(pane);
    const overlayConfig = new OverlayConfig(config);
    overlayConfig.direction = overlayConfig.direction || this._directionality.value;
    return new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher, this._animationsModuleType === "NoopAnimations");
  }
  /**
   * Gets a position builder that can be used, via fluent API,
   * to construct and configure a position strategy.
   * @returns An overlay position builder.
   */
  position() {
    return this._positionBuilder;
  }
  /**
   * Creates the DOM element for an overlay and appends it to the overlay container.
   * @returns Newly-created pane element
   */
  _createPaneElement(host) {
    const pane = this._document.createElement("div");
    pane.id = `cdk-overlay-${nextUniqueId++}`;
    pane.classList.add("cdk-overlay-pane");
    host.appendChild(pane);
    return pane;
  }
  /**
   * Creates the host element that wraps around an overlay
   * and can be used for advanced positioning.
   * @returns Newly-create host element.
   */
  _createHostElement() {
    const host = this._document.createElement("div");
    this._overlayContainer.getContainerElement().appendChild(host);
    return host;
  }
  /**
   * Create a DomPortalOutlet into which the overlay content can be loaded.
   * @param pane The DOM element to turn into a portal outlet.
   * @returns A portal outlet for the given DOM element.
   */
  _createPortalOutlet(pane) {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }
    return new DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector, this._document);
  }
  static {
    this.ɵfac = function Overlay_Factory(t) {
      return new (t || _Overlay)(ɵɵinject(ScrollStrategyOptions), ɵɵinject(OverlayContainer), ɵɵinject(ComponentFactoryResolver$1), ɵɵinject(OverlayPositionBuilder), ɵɵinject(OverlayKeyboardDispatcher), ɵɵinject(Injector), ɵɵinject(NgZone), ɵɵinject(DOCUMENT), ɵɵinject(Directionality), ɵɵinject(Location), ɵɵinject(OverlayOutsideClickDispatcher), ɵɵinject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _Overlay,
      factory: _Overlay.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ScrollStrategyOptions
  }, {
    type: OverlayContainer
  }, {
    type: ComponentFactoryResolver$1
  }, {
    type: OverlayPositionBuilder
  }, {
    type: OverlayKeyboardDispatcher
  }, {
    type: Injector
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Directionality
  }, {
    type: Location
  }, {
    type: OverlayOutsideClickDispatcher
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }, {
      type: Optional
    }]
  }], null);
})();
var defaultPositionList = [{
  originX: "start",
  originY: "bottom",
  overlayX: "start",
  overlayY: "top"
}, {
  originX: "start",
  originY: "top",
  overlayX: "start",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "top",
  overlayX: "end",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "bottom",
  overlayX: "end",
  overlayY: "top"
}];
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken("cdk-connected-overlay-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  }
});
var CdkOverlayOrigin = class _CdkOverlayOrigin {
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  static {
    this.ɵfac = function CdkOverlayOrigin_Factory(t) {
      return new (t || _CdkOverlayOrigin)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkOverlayOrigin,
      selectors: [["", "cdk-overlay-origin", ""], ["", "overlay-origin", ""], ["", "cdkOverlayOrigin", ""]],
      exportAs: ["cdkOverlayOrigin"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOverlayOrigin, [{
    type: Directive,
    args: [{
      selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]",
      exportAs: "cdkOverlayOrigin",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var CdkConnectedOverlay = class _CdkConnectedOverlay {
  /** The offset in pixels for the overlay connection point on the x-axis */
  get offsetX() {
    return this._offsetX;
  }
  set offsetX(offsetX) {
    this._offsetX = offsetX;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** The offset in pixels for the overlay connection point on the y-axis */
  get offsetY() {
    return this._offsetY;
  }
  set offsetY(offsetY) {
    this._offsetY = offsetY;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** Whether the overlay should be disposed of when the user goes backwards/forwards in history. */
  get disposeOnNavigation() {
    return this._disposeOnNavigation;
  }
  set disposeOnNavigation(value) {
    this._disposeOnNavigation = value;
  }
  // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
  constructor(_overlay, templateRef, viewContainerRef, scrollStrategyFactory, _dir) {
    this._overlay = _overlay;
    this._dir = _dir;
    this._backdropSubscription = Subscription.EMPTY;
    this._attachSubscription = Subscription.EMPTY;
    this._detachSubscription = Subscription.EMPTY;
    this._positionSubscription = Subscription.EMPTY;
    this._disposeOnNavigation = false;
    this._ngZone = inject(NgZone);
    this.viewportMargin = 0;
    this.open = false;
    this.disableClose = false;
    this.hasBackdrop = false;
    this.lockPosition = false;
    this.flexibleDimensions = false;
    this.growAfterOpen = false;
    this.push = false;
    this.backdropClick = new EventEmitter();
    this.positionChange = new EventEmitter();
    this.attach = new EventEmitter();
    this.detach = new EventEmitter();
    this.overlayKeydown = new EventEmitter();
    this.overlayOutsideClick = new EventEmitter();
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    this._scrollStrategyFactory = scrollStrategyFactory;
    this.scrollStrategy = this._scrollStrategyFactory();
  }
  /** The associated overlay reference. */
  get overlayRef() {
    return this._overlayRef;
  }
  /** The element's layout direction. */
  get dir() {
    return this._dir ? this._dir.value : "ltr";
  }
  ngOnDestroy() {
    this._attachSubscription.unsubscribe();
    this._detachSubscription.unsubscribe();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }
  ngOnChanges(changes) {
    if (this._position) {
      this._updatePositionStrategy(this._position);
      this._overlayRef.updateSize({
        width: this.width,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight
      });
      if (changes["origin"] && this.open) {
        this._position.apply();
      }
    }
    if (changes["open"]) {
      this.open ? this._attachOverlay() : this._detachOverlay();
    }
  }
  /** Creates an overlay */
  _createOverlay() {
    if (!this.positions || !this.positions.length) {
      this.positions = defaultPositionList;
    }
    const overlayRef = this._overlayRef = this._overlay.create(this._buildConfig());
    this._attachSubscription = overlayRef.attachments().subscribe(() => this.attach.emit());
    this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
    overlayRef.keydownEvents().subscribe((event) => {
      this.overlayKeydown.next(event);
      if (event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)) {
        event.preventDefault();
        this._detachOverlay();
      }
    });
    this._overlayRef.outsidePointerEvents().subscribe((event) => {
      const origin = this._getOriginElement();
      const target = _getEventTarget(event);
      if (!origin || origin !== target && !origin.contains(target)) {
        this.overlayOutsideClick.next(event);
      }
    });
  }
  /** Builds the overlay config based on the directive's inputs */
  _buildConfig() {
    const positionStrategy = this._position = this.positionStrategy || this._createPositionStrategy();
    const overlayConfig = new OverlayConfig({
      direction: this._dir,
      positionStrategy,
      scrollStrategy: this.scrollStrategy,
      hasBackdrop: this.hasBackdrop,
      disposeOnNavigation: this.disposeOnNavigation
    });
    if (this.width || this.width === 0) {
      overlayConfig.width = this.width;
    }
    if (this.height || this.height === 0) {
      overlayConfig.height = this.height;
    }
    if (this.minWidth || this.minWidth === 0) {
      overlayConfig.minWidth = this.minWidth;
    }
    if (this.minHeight || this.minHeight === 0) {
      overlayConfig.minHeight = this.minHeight;
    }
    if (this.backdropClass) {
      overlayConfig.backdropClass = this.backdropClass;
    }
    if (this.panelClass) {
      overlayConfig.panelClass = this.panelClass;
    }
    return overlayConfig;
  }
  /** Updates the state of a position strategy, based on the values of the directive inputs. */
  _updatePositionStrategy(positionStrategy) {
    const positions = this.positions.map((currentPosition) => ({
      originX: currentPosition.originX,
      originY: currentPosition.originY,
      overlayX: currentPosition.overlayX,
      overlayY: currentPosition.overlayY,
      offsetX: currentPosition.offsetX || this.offsetX,
      offsetY: currentPosition.offsetY || this.offsetY,
      panelClass: currentPosition.panelClass || void 0
    }));
    return positionStrategy.setOrigin(this._getOrigin()).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector);
  }
  /** Returns the position strategy of the overlay to be set on the overlay config */
  _createPositionStrategy() {
    const strategy = this._overlay.position().flexibleConnectedTo(this._getOrigin());
    this._updatePositionStrategy(strategy);
    return strategy;
  }
  _getOrigin() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef;
    } else {
      return this.origin;
    }
  }
  _getOriginElement() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef.nativeElement;
    }
    if (this.origin instanceof ElementRef) {
      return this.origin.nativeElement;
    }
    if (typeof Element !== "undefined" && this.origin instanceof Element) {
      return this.origin;
    }
    return null;
  }
  /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
  _attachOverlay() {
    if (!this._overlayRef) {
      this._createOverlay();
    } else {
      this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop;
    }
    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._templatePortal);
    }
    if (this.hasBackdrop) {
      this._backdropSubscription = this._overlayRef.backdropClick().subscribe((event) => {
        this.backdropClick.emit(event);
      });
    } else {
      this._backdropSubscription.unsubscribe();
    }
    this._positionSubscription.unsubscribe();
    if (this.positionChange.observers.length > 0) {
      this._positionSubscription = this._position.positionChanges.pipe(takeWhile(() => this.positionChange.observers.length > 0)).subscribe((position) => {
        this._ngZone.run(() => this.positionChange.emit(position));
        if (this.positionChange.observers.length === 0) {
          this._positionSubscription.unsubscribe();
        }
      });
    }
  }
  /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
  _detachOverlay() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
  }
  static {
    this.ɵfac = function CdkConnectedOverlay_Factory(t) {
      return new (t || _CdkConnectedOverlay)(ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY), ɵɵdirectiveInject(Directionality, 8));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkConnectedOverlay,
      selectors: [["", "cdk-connected-overlay", ""], ["", "connected-overlay", ""], ["", "cdkConnectedOverlay", ""]],
      inputs: {
        origin: [InputFlags.None, "cdkConnectedOverlayOrigin", "origin"],
        positions: [InputFlags.None, "cdkConnectedOverlayPositions", "positions"],
        positionStrategy: [InputFlags.None, "cdkConnectedOverlayPositionStrategy", "positionStrategy"],
        offsetX: [InputFlags.None, "cdkConnectedOverlayOffsetX", "offsetX"],
        offsetY: [InputFlags.None, "cdkConnectedOverlayOffsetY", "offsetY"],
        width: [InputFlags.None, "cdkConnectedOverlayWidth", "width"],
        height: [InputFlags.None, "cdkConnectedOverlayHeight", "height"],
        minWidth: [InputFlags.None, "cdkConnectedOverlayMinWidth", "minWidth"],
        minHeight: [InputFlags.None, "cdkConnectedOverlayMinHeight", "minHeight"],
        backdropClass: [InputFlags.None, "cdkConnectedOverlayBackdropClass", "backdropClass"],
        panelClass: [InputFlags.None, "cdkConnectedOverlayPanelClass", "panelClass"],
        viewportMargin: [InputFlags.None, "cdkConnectedOverlayViewportMargin", "viewportMargin"],
        scrollStrategy: [InputFlags.None, "cdkConnectedOverlayScrollStrategy", "scrollStrategy"],
        open: [InputFlags.None, "cdkConnectedOverlayOpen", "open"],
        disableClose: [InputFlags.None, "cdkConnectedOverlayDisableClose", "disableClose"],
        transformOriginSelector: [InputFlags.None, "cdkConnectedOverlayTransformOriginOn", "transformOriginSelector"],
        hasBackdrop: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayHasBackdrop", "hasBackdrop", booleanAttribute],
        lockPosition: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayLockPosition", "lockPosition", booleanAttribute],
        flexibleDimensions: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayFlexibleDimensions", "flexibleDimensions", booleanAttribute],
        growAfterOpen: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayGrowAfterOpen", "growAfterOpen", booleanAttribute],
        push: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayPush", "push", booleanAttribute],
        disposeOnNavigation: [InputFlags.HasDecoratorInputTransform, "cdkConnectedOverlayDisposeOnNavigation", "disposeOnNavigation", booleanAttribute]
      },
      outputs: {
        backdropClick: "backdropClick",
        positionChange: "positionChange",
        attach: "attach",
        detach: "detach",
        overlayKeydown: "overlayKeydown",
        overlayOutsideClick: "overlayOutsideClick"
      },
      exportAs: ["cdkConnectedOverlay"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkConnectedOverlay, [{
    type: Directive,
    args: [{
      selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]",
      exportAs: "cdkConnectedOverlay",
      standalone: true
    }]
  }], () => [{
    type: Overlay
  }, {
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    origin: [{
      type: Input,
      args: ["cdkConnectedOverlayOrigin"]
    }],
    positions: [{
      type: Input,
      args: ["cdkConnectedOverlayPositions"]
    }],
    positionStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayPositionStrategy"]
    }],
    offsetX: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetX"]
    }],
    offsetY: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetY"]
    }],
    width: [{
      type: Input,
      args: ["cdkConnectedOverlayWidth"]
    }],
    height: [{
      type: Input,
      args: ["cdkConnectedOverlayHeight"]
    }],
    minWidth: [{
      type: Input,
      args: ["cdkConnectedOverlayMinWidth"]
    }],
    minHeight: [{
      type: Input,
      args: ["cdkConnectedOverlayMinHeight"]
    }],
    backdropClass: [{
      type: Input,
      args: ["cdkConnectedOverlayBackdropClass"]
    }],
    panelClass: [{
      type: Input,
      args: ["cdkConnectedOverlayPanelClass"]
    }],
    viewportMargin: [{
      type: Input,
      args: ["cdkConnectedOverlayViewportMargin"]
    }],
    scrollStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayScrollStrategy"]
    }],
    open: [{
      type: Input,
      args: ["cdkConnectedOverlayOpen"]
    }],
    disableClose: [{
      type: Input,
      args: ["cdkConnectedOverlayDisableClose"]
    }],
    transformOriginSelector: [{
      type: Input,
      args: ["cdkConnectedOverlayTransformOriginOn"]
    }],
    hasBackdrop: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayHasBackdrop",
        transform: booleanAttribute
      }]
    }],
    lockPosition: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayLockPosition",
        transform: booleanAttribute
      }]
    }],
    flexibleDimensions: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayFlexibleDimensions",
        transform: booleanAttribute
      }]
    }],
    growAfterOpen: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayGrowAfterOpen",
        transform: booleanAttribute
      }]
    }],
    push: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayPush",
        transform: booleanAttribute
      }]
    }],
    disposeOnNavigation: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayDisposeOnNavigation",
        transform: booleanAttribute
      }]
    }],
    backdropClick: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    attach: [{
      type: Output
    }],
    detach: [{
      type: Output
    }],
    overlayKeydown: [{
      type: Output
    }],
    overlayOutsideClick: [{
      type: Output
    }]
  });
})();
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition();
}
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
  provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
};
var OverlayModule = class _OverlayModule {
  static {
    this.ɵfac = function OverlayModule_Factory(t) {
      return new (t || _OverlayModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _OverlayModule,
      imports: [BidiModule, PortalModule, ScrollingModule, CdkConnectedOverlay, CdkOverlayOrigin],
      exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollingModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER],
      imports: [BidiModule, PortalModule, ScrollingModule, ScrollingModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, PortalModule, ScrollingModule, CdkConnectedOverlay, CdkOverlayOrigin],
      exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollingModule],
      providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER]
    }]
  }], null, null);
})();
var FullscreenOverlayContainer = class _FullscreenOverlayContainer extends OverlayContainer {
  constructor(_document, platform) {
    super(_document, platform);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this._fullScreenEventName && this._fullScreenListener) {
      this._document.removeEventListener(this._fullScreenEventName, this._fullScreenListener);
    }
  }
  _createContainer() {
    super._createContainer();
    this._adjustParentForFullscreenChange();
    this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
  }
  _adjustParentForFullscreenChange() {
    if (!this._containerElement) {
      return;
    }
    const fullscreenElement = this.getFullscreenElement();
    const parent = fullscreenElement || this._document.body;
    parent.appendChild(this._containerElement);
  }
  _addFullscreenChangeListener(fn) {
    const eventName = this._getEventName();
    if (eventName) {
      if (this._fullScreenListener) {
        this._document.removeEventListener(eventName, this._fullScreenListener);
      }
      this._document.addEventListener(eventName, fn);
      this._fullScreenListener = fn;
    }
  }
  _getEventName() {
    if (!this._fullScreenEventName) {
      const _document = this._document;
      if (_document.fullscreenEnabled) {
        this._fullScreenEventName = "fullscreenchange";
      } else if (_document.webkitFullscreenEnabled) {
        this._fullScreenEventName = "webkitfullscreenchange";
      } else if (_document.mozFullScreenEnabled) {
        this._fullScreenEventName = "mozfullscreenchange";
      } else if (_document.msFullscreenEnabled) {
        this._fullScreenEventName = "MSFullscreenChange";
      }
    }
    return this._fullScreenEventName;
  }
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
   */
  getFullscreenElement() {
    const _document = this._document;
    return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
  }
  static {
    this.ɵfac = function FullscreenOverlayContainer_Factory(t) {
      return new (t || _FullscreenOverlayContainer)(ɵɵinject(DOCUMENT), ɵɵinject(Platform));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FullscreenOverlayContainer,
      factory: _FullscreenOverlayContainer.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Platform
  }], null);
})();

// node_modules/ng-select2-component/node_modules/ngx-infinite-scroll/fesm2020/ngx-infinite-scroll.mjs
var NgxInfiniteScrollService = class {
  constructor() {
  }
};
NgxInfiniteScrollService.ɵfac = function NgxInfiniteScrollService_Factory(t) {
  return new (t || NgxInfiniteScrollService)();
};
NgxInfiniteScrollService.ɵprov = ɵɵdefineInjectable({
  token: NgxInfiniteScrollService,
  factory: NgxInfiniteScrollService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxInfiniteScrollService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
function resolveContainerElement(selector, scrollWindow, defaultElement, fromRoot) {
  const hasWindow = window && !!window.document && window.document.documentElement;
  let container = hasWindow && scrollWindow ? window : defaultElement;
  if (selector) {
    const containerIsString = selector && hasWindow && typeof selector === "string";
    container = containerIsString ? findElement(selector, defaultElement.nativeElement, fromRoot) : selector;
    if (!container) {
      throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");
    }
  }
  return container;
}
function findElement(selector, customRoot, fromRoot) {
  const rootEl = fromRoot ? window.document : customRoot;
  return rootEl.querySelector(selector);
}
function inputPropChanged(prop) {
  return prop && !prop.firstChange;
}
function hasWindowDefined() {
  return typeof window !== "undefined";
}
var VerticalProps = {
  clientHeight: "clientHeight",
  offsetHeight: "offsetHeight",
  scrollHeight: "scrollHeight",
  pageYOffset: "pageYOffset",
  offsetTop: "offsetTop",
  scrollTop: "scrollTop",
  top: "top"
};
var HorizontalProps = {
  clientHeight: "clientWidth",
  offsetHeight: "offsetWidth",
  scrollHeight: "scrollWidth",
  pageYOffset: "pageXOffset",
  offsetTop: "offsetLeft",
  scrollTop: "scrollLeft",
  top: "left"
};
var AxisResolver = class {
  constructor(vertical = true) {
    this.vertical = vertical;
    this.propsMap = vertical ? VerticalProps : HorizontalProps;
  }
  clientHeightKey() {
    return this.propsMap.clientHeight;
  }
  offsetHeightKey() {
    return this.propsMap.offsetHeight;
  }
  scrollHeightKey() {
    return this.propsMap.scrollHeight;
  }
  pageYOffsetKey() {
    return this.propsMap.pageYOffset;
  }
  offsetTopKey() {
    return this.propsMap.offsetTop;
  }
  scrollTopKey() {
    return this.propsMap.scrollTop;
  }
  topKey() {
    return this.propsMap.top;
  }
};
function shouldTriggerEvents(alwaysCallback, shouldFireScrollEvent2, isTriggeredCurrentTotal) {
  if (alwaysCallback && shouldFireScrollEvent2) {
    return true;
  }
  if (!isTriggeredCurrentTotal && shouldFireScrollEvent2) {
    return true;
  }
  return false;
}
function createResolver({
  windowElement,
  axis
}) {
  return createResolverWithContainer({
    axis,
    isWindow: isElementWindow(windowElement)
  }, windowElement);
}
function createResolverWithContainer(resolver, windowElement) {
  const container = resolver.isWindow || windowElement && !windowElement.nativeElement ? windowElement : windowElement.nativeElement;
  return __spreadProps(__spreadValues({}, resolver), {
    container
  });
}
function isElementWindow(windowElement) {
  const isWindow = ["Window", "global"].some((obj) => Object.prototype.toString.call(windowElement).includes(obj));
  return isWindow;
}
function getDocumentElement(isContainerWindow, windowElement) {
  return isContainerWindow ? windowElement.document.documentElement : null;
}
function calculatePoints(element, resolver) {
  const height = extractHeightForElement(resolver);
  return resolver.isWindow ? calculatePointsForWindow(height, element, resolver) : calculatePointsForElement(height, element, resolver);
}
function calculatePointsForWindow(height, element, resolver) {
  const {
    axis,
    container,
    isWindow
  } = resolver;
  const {
    offsetHeightKey,
    clientHeightKey
  } = extractHeightPropKeys(axis);
  const scrolled = height + getElementPageYOffset(getDocumentElement(isWindow, container), axis, isWindow);
  const nativeElementHeight = getElementHeight(element.nativeElement, isWindow, offsetHeightKey, clientHeightKey);
  const totalToScroll = getElementOffsetTop(element.nativeElement, axis, isWindow) + nativeElementHeight;
  return {
    height,
    scrolled,
    totalToScroll,
    isWindow
  };
}
function calculatePointsForElement(height, element, resolver) {
  const {
    axis,
    container
  } = resolver;
  const scrolled = container[axis.scrollTopKey()];
  const totalToScroll = container[axis.scrollHeightKey()];
  return {
    height,
    scrolled,
    totalToScroll,
    isWindow: false
  };
}
function extractHeightPropKeys(axis) {
  return {
    offsetHeightKey: axis.offsetHeightKey(),
    clientHeightKey: axis.clientHeightKey()
  };
}
function extractHeightForElement({
  container,
  isWindow,
  axis
}) {
  const {
    offsetHeightKey,
    clientHeightKey
  } = extractHeightPropKeys(axis);
  return getElementHeight(container, isWindow, offsetHeightKey, clientHeightKey);
}
function getElementHeight(elem, isWindow, offsetHeightKey, clientHeightKey) {
  if (isNaN(elem[offsetHeightKey])) {
    const docElem = getDocumentElement(isWindow, elem);
    return docElem ? docElem[clientHeightKey] : 0;
  } else {
    return elem[offsetHeightKey];
  }
}
function getElementOffsetTop(elem, axis, isWindow) {
  const topKey = axis.topKey();
  if (!elem.getBoundingClientRect) {
    return;
  }
  return elem.getBoundingClientRect()[topKey] + getElementPageYOffset(elem, axis, isWindow);
}
function getElementPageYOffset(elem, axis, isWindow) {
  const pageYOffset = axis.pageYOffsetKey();
  const scrollTop = axis.scrollTopKey();
  const offsetTop = axis.offsetTopKey();
  if (isNaN(window.pageYOffset)) {
    return getDocumentElement(isWindow, elem)[scrollTop];
  } else if (elem.ownerDocument) {
    return elem.ownerDocument.defaultView[pageYOffset];
  } else {
    return elem[offsetTop];
  }
}
function shouldFireScrollEvent(container, distance = {
  down: 0,
  up: 0
}, scrollingDown) {
  let remaining;
  let containerBreakpoint;
  if (container.totalToScroll <= 0) {
    return false;
  }
  const scrolledUntilNow = container.isWindow ? container.scrolled : container.height + container.scrolled;
  if (scrollingDown) {
    remaining = (container.totalToScroll - scrolledUntilNow) / container.totalToScroll;
    const distanceDown = distance?.down ? distance.down : 0;
    containerBreakpoint = distanceDown / 10;
  } else {
    const totalHiddenContentHeight = container.scrolled + (container.totalToScroll - scrolledUntilNow);
    remaining = container.scrolled / totalHiddenContentHeight;
    const distanceUp = distance?.up ? distance.up : 0;
    containerBreakpoint = distanceUp / 10;
  }
  const shouldFireEvent = remaining <= containerBreakpoint;
  return shouldFireEvent;
}
function isScrollingDownwards(lastScrollPosition, container) {
  return lastScrollPosition < container.scrolled;
}
function getScrollStats(lastScrollPosition, container, distance) {
  const scrollDown = isScrollingDownwards(lastScrollPosition, container);
  return {
    fire: shouldFireScrollEvent(container, distance, scrollDown),
    scrollDown
  };
}
var ScrollState = class {
  constructor({
    totalToScroll
  }) {
    this.lastScrollPosition = 0;
    this.lastTotalToScroll = 0;
    this.totalToScroll = 0;
    this.triggered = {
      down: 0,
      up: 0
    };
    this.totalToScroll = totalToScroll;
  }
  updateScrollPosition(position) {
    return this.lastScrollPosition = position;
  }
  updateTotalToScroll(totalToScroll) {
    if (this.lastTotalToScroll !== totalToScroll) {
      this.lastTotalToScroll = this.totalToScroll;
      this.totalToScroll = totalToScroll;
    }
  }
  updateScroll(scrolledUntilNow, totalToScroll) {
    this.updateScrollPosition(scrolledUntilNow);
    this.updateTotalToScroll(totalToScroll);
  }
  updateTriggeredFlag(scroll, isScrollingDown) {
    if (isScrollingDown) {
      this.triggered.down = scroll;
    } else {
      this.triggered.up = scroll;
    }
  }
  isTriggeredScroll(totalToScroll, isScrollingDown) {
    return isScrollingDown ? this.triggered.down === totalToScroll : this.triggered.up === totalToScroll;
  }
};
function createScroller(config) {
  const {
    scrollContainer,
    scrollWindow,
    element,
    fromRoot
  } = config;
  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot)
  });
  const scrollState = new ScrollState({
    totalToScroll: calculatePoints(element, resolver)
  });
  const options = {
    container: resolver.container,
    throttle: config.throttle
  };
  const distance = {
    up: config.upDistance,
    down: config.downDistance
  };
  return attachScrollEvent(options).pipe(mergeMap(() => of(calculatePoints(element, resolver))), map((positionStats) => toInfiniteScrollParams(scrollState.lastScrollPosition, positionStats, distance)), tap(({
    stats
  }) => scrollState.updateScroll(stats.scrolled, stats.totalToScroll)), filter(({
    fire,
    scrollDown,
    stats: {
      totalToScroll
    }
  }) => shouldTriggerEvents(config.alwaysCallback, fire, scrollState.isTriggeredScroll(totalToScroll, scrollDown))), tap(({
    scrollDown,
    stats: {
      totalToScroll
    }
  }) => {
    scrollState.updateTriggeredFlag(totalToScroll, scrollDown);
  }), map(toInfiniteScrollAction));
}
function attachScrollEvent(options) {
  let obs = fromEvent(options.container, "scroll");
  if (options.throttle) {
    obs = obs.pipe(throttleTime(options.throttle, void 0, {
      leading: true,
      trailing: true
    }));
  }
  return obs;
}
function toInfiniteScrollParams(lastScrollPosition, stats, distance) {
  const {
    scrollDown,
    fire
  } = getScrollStats(lastScrollPosition, stats, distance);
  return {
    scrollDown,
    fire,
    stats
  };
}
var InfiniteScrollActions = {
  DOWN: "[NGX_ISE] DOWN",
  UP: "[NGX_ISE] UP"
};
function toInfiniteScrollAction(response) {
  const {
    scrollDown,
    stats: {
      scrolled: currentScrollPosition
    }
  } = response;
  return {
    type: scrollDown ? InfiniteScrollActions.DOWN : InfiniteScrollActions.UP,
    payload: {
      currentScrollPosition
    }
  };
}
var InfiniteScrollDirective = class {
  constructor(element, zone) {
    this.element = element;
    this.zone = zone;
    this.scrolled = new EventEmitter();
    this.scrolledUp = new EventEmitter();
    this.infiniteScrollDistance = 2;
    this.infiniteScrollUpDistance = 1.5;
    this.infiniteScrollThrottle = 150;
    this.infiniteScrollDisabled = false;
    this.infiniteScrollContainer = null;
    this.scrollWindow = true;
    this.immediateCheck = false;
    this.horizontal = false;
    this.alwaysCallback = false;
    this.fromRoot = false;
  }
  ngAfterViewInit() {
    if (!this.infiniteScrollDisabled) {
      this.setup();
    }
  }
  ngOnChanges({
    infiniteScrollContainer,
    infiniteScrollDisabled,
    infiniteScrollDistance
  }) {
    const containerChanged = inputPropChanged(infiniteScrollContainer);
    const disabledChanged = inputPropChanged(infiniteScrollDisabled);
    const distanceChanged = inputPropChanged(infiniteScrollDistance);
    const shouldSetup = !disabledChanged && !this.infiniteScrollDisabled || disabledChanged && !infiniteScrollDisabled.currentValue || distanceChanged;
    if (containerChanged || disabledChanged || distanceChanged) {
      this.destroyScroller();
      if (shouldSetup) {
        this.setup();
      }
    }
  }
  setup() {
    if (hasWindowDefined()) {
      this.zone.runOutsideAngular(() => {
        this.disposeScroller = createScroller({
          fromRoot: this.fromRoot,
          alwaysCallback: this.alwaysCallback,
          disable: this.infiniteScrollDisabled,
          downDistance: this.infiniteScrollDistance,
          element: this.element,
          horizontal: this.horizontal,
          scrollContainer: this.infiniteScrollContainer,
          scrollWindow: this.scrollWindow,
          throttle: this.infiniteScrollThrottle,
          upDistance: this.infiniteScrollUpDistance
        }).subscribe((payload) => this.handleOnScroll(payload));
      });
    }
  }
  handleOnScroll({
    type,
    payload
  }) {
    const emitter = type === InfiniteScrollActions.DOWN ? this.scrolled : this.scrolledUp;
    if (hasObservers(emitter)) {
      this.zone.run(() => emitter.emit(payload));
    }
  }
  ngOnDestroy() {
    this.destroyScroller();
  }
  destroyScroller() {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }
};
InfiniteScrollDirective.ɵfac = function InfiniteScrollDirective_Factory(t) {
  return new (t || InfiniteScrollDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
InfiniteScrollDirective.ɵdir = ɵɵdefineDirective({
  type: InfiniteScrollDirective,
  selectors: [["", "infiniteScroll", ""], ["", "infinite-scroll", ""], ["", "data-infinite-scroll", ""]],
  inputs: {
    infiniteScrollDistance: "infiniteScrollDistance",
    infiniteScrollUpDistance: "infiniteScrollUpDistance",
    infiniteScrollThrottle: "infiniteScrollThrottle",
    infiniteScrollDisabled: "infiniteScrollDisabled",
    infiniteScrollContainer: "infiniteScrollContainer",
    scrollWindow: "scrollWindow",
    immediateCheck: "immediateCheck",
    horizontal: "horizontal",
    alwaysCallback: "alwaysCallback",
    fromRoot: "fromRoot"
  },
  outputs: {
    scrolled: "scrolled",
    scrolledUp: "scrolledUp"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InfiniteScrollDirective, [{
    type: Directive,
    args: [{
      selector: "[infiniteScroll], [infinite-scroll], [data-infinite-scroll]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    scrolled: [{
      type: Output
    }],
    scrolledUp: [{
      type: Output
    }],
    infiniteScrollDistance: [{
      type: Input
    }],
    infiniteScrollUpDistance: [{
      type: Input
    }],
    infiniteScrollThrottle: [{
      type: Input
    }],
    infiniteScrollDisabled: [{
      type: Input
    }],
    infiniteScrollContainer: [{
      type: Input
    }],
    scrollWindow: [{
      type: Input
    }],
    immediateCheck: [{
      type: Input
    }],
    horizontal: [{
      type: Input
    }],
    alwaysCallback: [{
      type: Input
    }],
    fromRoot: [{
      type: Input
    }]
  });
})();
function hasObservers(emitter) {
  return emitter.observed ?? emitter.observers.length > 0;
}
var InfiniteScrollModule = class {
};
InfiniteScrollModule.ɵfac = function InfiniteScrollModule_Factory(t) {
  return new (t || InfiniteScrollModule)();
};
InfiniteScrollModule.ɵmod = ɵɵdefineNgModule({
  type: InfiniteScrollModule,
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective]
});
InfiniteScrollModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InfiniteScrollModule, [{
    type: NgModule,
    args: [{
      declarations: [InfiniteScrollDirective],
      exports: [InfiniteScrollDirective],
      imports: [],
      providers: []
    }]
  }], null, null);
})();

// node_modules/ng-select2-component/fesm2020/ng-select2-component.mjs
var _c0 = ["selection"];
var _c1 = ["results"];
var _c2 = ["searchInput"];
var _c3 = ["dropdown"];
var _c4 = ["result"];
var _c5 = [[["select2-label"]], [["select2-hint"]]];
var _c6 = ["select2-label", "select2-hint"];
function Select2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
}
function Select2_span_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, " ");
    ɵɵelementEnd();
  }
}
function Select2_span_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 25);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r1.select2Option.label, ɵɵsanitizeHtml);
  }
}
function Select2_span_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 22);
    ɵɵtemplate(1, Select2_span_8_span_1_Template, 2, 0, "span", 18)(2, Select2_span_8_span_2_Template, 1, 1, "span", 23);
    ɵɵelementStart(3, "span", 24);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("title", (ctx_r1.select2Option == null ? null : ctx_r1.select2Option.label) || "");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.select2Option);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.select2Option);
    ɵɵadvance();
    ɵɵclassProp("select2-selection__placeholder__option", ctx_r1.option);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder);
  }
}
function Select2_span_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 26);
    ɵɵlistener("click", function Select2_span_9_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.reset($event));
    });
    ɵɵtext(1, "×");
    ɵɵelementEnd();
  }
}
function Select2_span_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 27);
  }
}
function Select2_ul_11_li_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 32);
    ɵɵlistener("click", function Select2_ul_11_li_3_span_1_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const op_r5 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.removeSelection($event, op_r5));
    });
    ɵɵtext(1, "×");
    ɵɵelementEnd();
  }
}
function Select2_ul_11_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 30);
    ɵɵtemplate(1, Select2_ul_11_li_3_span_1_Template, 2, 0, "span", 31);
    ɵɵelement(2, "span", 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const op_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("title", op_r5.label);
    ɵɵadvance();
    ɵɵproperty("ngIf", !(ctx_r1.disabled || ctx_r1.readonly));
    ɵɵadvance();
    ɵɵproperty("innerHTML", op_r5.label, ɵɵsanitizeHtml);
  }
}
function Select2_ul_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 28)(1, "span", 24);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, Select2_ul_11_li_3_Template, 3, 3, "li", 29);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("select2-selection__placeholder__option", (ctx_r1.select2Options == null ? null : ctx_r1.select2Options.length) > 0);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.option)("ngForTrackBy", ctx_r1.trackBy);
  }
}
function Select2_ng_container_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select2_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select2_ng_container_12_ng_container_1_Template, 1, 0, "ng-container", 33);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const containerTemplate_r6 = ɵɵreference(17);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", containerTemplate_r6);
  }
}
function Select2_ng_template_15_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select2_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select2_ng_template_15_ng_container_0_Template, 1, 0, "ng-container", 33);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const containerTemplate_r6 = ɵɵreference(17);
    ɵɵproperty("ngTemplateOutlet", containerTemplate_r6);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_strong_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "strong", 25);
  }
  if (rf & 2) {
    const groupOrOption_r8 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", groupOrOption_r8.label, ɵɵsanitizeHtml);
    ɵɵattribute("class", "select2-results__group" + (groupOrOption_r8.classes ? " " + groupOrOption_r8.classes : ""));
  }
}
function Select2_ng_template_16_ng_container_9_li_1_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select2_ng_template_16_ng_container_9_li_1_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 49);
  }
  if (rf & 2) {
    const groupOrOption_r8 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.getTemplate(groupOrOption_r8, "group"))("ngTemplateOutletContext", groupOrOption_r8);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_li_5_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 52);
  }
  if (rf & 2) {
    const option_r10 = ɵɵnextContext().$implicit;
    ɵɵproperty("innerHTML", option_r10.label, ɵɵsanitizeHtml);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_li_5_ng_template_3_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_li_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select2_ng_template_16_ng_container_9_li_1_li_5_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 49);
  }
  if (rf & 2) {
    const option_r10 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.getTemplate(option_r10, "option"))("ngTemplateOutletContext", option_r10);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_li_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 50, 6);
    ɵɵlistener("mouseenter", function Select2_ng_template_16_ng_container_9_li_1_li_5_Template_li_mouseenter_0_listener() {
      const option_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.mouseenter(option_r10));
    })("click", function Select2_ng_template_16_ng_container_9_li_1_li_5_Template_li_click_0_listener() {
      const option_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.click(option_r10));
    });
    ɵɵtemplate(2, Select2_ng_template_16_ng_container_9_li_1_li_5_div_2_Template, 1, 1, "div", 51)(3, Select2_ng_template_16_ng_container_9_li_1_li_5_ng_template_3_Template, 1, 2, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r10 = ctx.$implicit;
    const j_r11 = ctx.index;
    const liGroup_r12 = ɵɵreference(4);
    const i_r13 = ɵɵnextContext(2).index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.getOptionStyle(option_r10));
    ɵɵproperty("id", option_r10.id || ctx_r1.id + "-option-" + i_r13 + "-" + j_r11);
    ɵɵattribute("aria-selected", ctx_r1.isSelected(option_r10))("aria-disabled", ctx_r1.isDisabled(option_r10));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.hasTemplate(option_r10, "option"))("ngIfElse", liGroup_r12);
  }
}
function Select2_ng_template_16_ng_container_9_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 45);
    ɵɵtemplate(1, Select2_ng_template_16_ng_container_9_li_1_strong_1_Template, 1, 2, "strong", 46)(2, Select2_ng_template_16_ng_container_9_li_1_ng_template_2_Template, 1, 2, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementStart(4, "ul", 47);
    ɵɵtemplate(5, Select2_ng_template_16_ng_container_9_li_1_li_5_Template, 5, 7, "li", 48);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const optGroup_r14 = ɵɵreference(3);
    const groupOrOption_r8 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.hasTemplate(groupOrOption_r8, "group"))("ngIfElse", optGroup_r14);
    ɵɵadvance(4);
    ɵɵproperty("ngForOf", groupOrOption_r8.options)("ngForTrackBy", ctx_r1.trackBy);
  }
}
function Select2_ng_template_16_ng_container_9_li_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 52);
  }
  if (rf & 2) {
    const groupOrOption_r8 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", groupOrOption_r8.label, ɵɵsanitizeHtml);
  }
}
function Select2_ng_template_16_ng_container_9_li_2_ng_template_3_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select2_ng_template_16_ng_container_9_li_2_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select2_ng_template_16_ng_container_9_li_2_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 49);
  }
  if (rf & 2) {
    const groupOrOption_r8 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.getTemplate(groupOrOption_r8, "option"))("ngTemplateOutletContext", groupOrOption_r8);
  }
}
function Select2_ng_template_16_ng_container_9_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 50, 6);
    ɵɵlistener("mouseenter", function Select2_ng_template_16_ng_container_9_li_2_Template_li_mouseenter_0_listener() {
      ɵɵrestoreView(_r15);
      const groupOrOption_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.mouseenter(groupOrOption_r8));
    })("click", function Select2_ng_template_16_ng_container_9_li_2_Template_li_click_0_listener() {
      ɵɵrestoreView(_r15);
      const groupOrOption_r8 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.click(groupOrOption_r8));
    });
    ɵɵtemplate(2, Select2_ng_template_16_ng_container_9_li_2_div_2_Template, 1, 1, "div", 51)(3, Select2_ng_template_16_ng_container_9_li_2_ng_template_3_Template, 1, 2, "ng-template", null, 8, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const li_r16 = ɵɵreference(4);
    const ctx_r16 = ɵɵnextContext();
    const groupOrOption_r8 = ctx_r16.$implicit;
    const i_r13 = ctx_r16.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.getOptionStyle(groupOrOption_r8));
    ɵɵproperty("id", groupOrOption_r8.id || ctx_r1.id + "-option-" + i_r13);
    ɵɵattribute("aria-selected", ctx_r1.isSelected(groupOrOption_r8))("aria-disabled", ctx_r1.isDisabled(groupOrOption_r8));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.hasTemplate(groupOrOption_r8, "option"))("ngIfElse", li_r16);
  }
}
function Select2_ng_template_16_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select2_ng_template_16_ng_container_9_li_1_Template, 6, 4, "li", 43)(2, Select2_ng_template_16_ng_container_9_li_2_Template, 5, 7, "li", 44);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const groupOrOption_r8 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", groupOrOption_r8.options);
    ɵɵadvance();
    ɵɵproperty("ngIf", !groupOrOption_r8.options);
  }
}
function Select2_ng_template_16_li_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "li", 53);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r1.noResultMessage, ɵɵsanitizeHtml);
  }
}
function Select2_ng_template_16_li_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "li", 54);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r1.maxResultsMessage, ɵɵsanitizeHtml);
  }
}
function Select2_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 34)(1, "div", 35, 2)(3, "div", 36)(4, "input", 37, 3);
    ɵɵlistener("keydown", function Select2_ng_template_16_Template_input_keydown_4_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.keyDown($event));
    })("keyup", function Select2_ng_template_16_Template_input_keyup_4_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.searchUpdate($event));
    })("change", function Select2_ng_template_16_Template_input_change_4_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.prevChange($event));
    });
    ɵɵelementEnd()();
    ɵɵelementStart(6, "div", 38)(7, "ul", 39, 4);
    ɵɵlistener("scrolled", function Select2_ng_template_16_Template_ul_scrolled_7_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScroll("down"));
    })("scrolledUp", function Select2_ng_template_16_Template_ul_scrolledUp_7_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onScroll("up"));
    })("keydown", function Select2_ng_template_16_Template_ul_keydown_7_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.keyDown($event));
    });
    ɵɵtemplate(9, Select2_ng_template_16_ng_container_9_Template, 3, 2, "ng-container", 40)(10, Select2_ng_template_16_li_10_Template, 1, 1, "li", 41)(11, Select2_ng_template_16_li_11_Template, 1, 1, "li", 42);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const results_r18 = ɵɵreference(8);
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("select2-container--open", ctx_r1.isOpen)("select2-overlay", ctx_r1.overlay)("select2-position-auto", ctx_r1.listPosition === "auto");
    ɵɵadvance();
    ɵɵclassProp("select2-dropdown--below", !ctx_r1.select2above)("select2-dropdown--above", ctx_r1.select2above);
    ɵɵadvance(2);
    ɵɵclassProp("select2-search--hide", ctx_r1.hideSearch());
    ɵɵadvance();
    ɵɵproperty("id", ctx_r1.id + "-search-field")("value", ctx_r1.searchText);
    ɵɵattribute("tabindex", ctx_r1.isOpen ? ctx_r1.tabIndex : "-1");
    ɵɵadvance(3);
    ɵɵstyleProp("max-height", ctx_r1.resultMaxHeight);
    ɵɵproperty("infiniteScrollDisabled", !ctx_r1.infiniteScroll && !ctx_r1.isOpen)("infiniteScrollDistance", ctx_r1.infiniteScrollDistance)("infiniteScrollThrottle", ctx_r1.infiniteScrollThrottle)("infiniteScrollContainer", results_r18);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.filteredData)("ngForTrackBy", ctx_r1.trackBy);
    ɵɵadvance();
    ɵɵproperty("ngIf", !(ctx_r1.filteredData == null ? null : ctx_r1.filteredData.length) && ctx_r1.noResultMessage);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.maxResultsExceeded);
  }
}
var timeout = 200;
var unicodePatterns = [{
  l: "a",
  s: /[ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]/gi
}, {
  l: "aa",
  s: /ꜳ/gi
}, {
  l: "ae",
  s: /[æǽǣ]/gi
}, {
  l: "ao",
  s: /ꜵ/gi
}, {
  l: "au",
  s: /ꜷ/gi
}, {
  l: "av",
  s: /[ꜹꜻ]/gi
}, {
  l: "ay",
  s: /ꜽ/gi
}, {
  l: "b",
  s: /[ⓑｂḃḅḇƀƃɓ]/gi
}, {
  l: "c",
  s: /[ⓒｃćĉċčçḉƈȼꜿↄ]/gi
}, {
  l: "d",
  s: /[ⓓｄḋďḍḑḓḏđƌɖɗꝺ]/gi
}, {
  l: "dz",
  s: /[ǳǆ]/gi
}, {
  l: "e",
  s: /[ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]/gi
}, {
  l: "f",
  s: /[ⓕｆḟƒꝼ]/gi
}, {
  l: "g",
  s: /[ⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]/gi
}, {
  l: "h",
  s: /[ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]/gi
}, {
  l: "hv",
  s: /ƕ/gi
}, {
  l: "i",
  s: /[ⓘｉìíîĩīĭİïḯỉǐȉȋịįḭɨı]/gi
}, {
  l: "j",
  s: /[ⓙｊĵǰɉ]/gi
}, {
  l: "k",
  s: /[ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]/gi
}, {
  l: "l",
  s: /[ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇꝆ]/gi
}, {
  l: "lj",
  s: /ǉ/gi
}, {
  l: "m",
  s: /[ⓜｍḿṁṃɱɯ]/gi
}, {
  l: "n",
  s: /[ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]/gi
}, {
  l: "nj",
  s: /ǌ/gi
}, {
  l: "o",
  s: /[ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔƟꝋꝍɵ]/gi
}, {
  l: "oi",
  s: /ƣ/gi
}, {
  l: "oe",
  s: /œ/gi
}, {
  l: "oo",
  s: /ꝏ/gi
}, {
  l: "ou",
  s: /ȣ/gi
}, {
  l: "p",
  s: /[ⓟｐṕṗƥᵽꝑꝓꝕ]/gi
}, {
  l: "q",
  s: /[ⓠｑɋꝗꝙ]/gi
}, {
  l: "r",
  s: /[ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]/gi
}, {
  l: "s",
  s: /[ⓢｓßẞśṥŝṡšṧṣṩșşȿꞩꞅẛ]/gi
}, {
  l: "t",
  s: /[ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]/gi
}, {
  l: "tz",
  s: /ꜩ/gi
}, {
  l: "u",
  s: /[ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]/gi
}, {
  l: "v",
  s: /[ⓥｖṽṿʋꝟʌ]/gi
}, {
  l: "vy",
  s: /ꝡ/gi
}, {
  l: "w",
  s: /[ⓦｗẁẃŵẇẅẘẉⱳ]/gi
}, {
  l: "x",
  s: /[ⓧｘẋẍ]/gi
}, {
  l: "y",
  s: /[ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]/gi
}, {
  l: "z",
  s: /[ⓩｚźẑżžẓẕƶȥɀⱬꝣ]/gi
}];
var defaultMinCountForSearch = 6;
var protectRegexp = new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g");
var Select2Utils = class _Select2Utils {
  static getOptionByValue(data, value) {
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = groupOrOption.options;
        if (options) {
          for (const option of options) {
            if (option.value === value) {
              return option;
            }
          }
        } else if (groupOrOption.value === value) {
          return groupOrOption;
        }
      }
    }
    return null;
  }
  static getOptionsByValue(data, value, multiple) {
    if (multiple) {
      const values = Array.isArray(value) ? value : [];
      const result = [];
      for (const v of values) {
        const option = _Select2Utils.getOptionByValue(data, v);
        if (option) {
          result.push(option);
        }
      }
      return result;
    }
    return _Select2Utils.getOptionByValue(data, value);
  }
  static getFirstAvailableOption(data) {
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = groupOrOption.options;
        if (options) {
          for (const option of options) {
            if (!option.disabled) {
              return option.value;
            }
          }
        } else {
          const option = groupOrOption;
          if (!option.disabled) {
            return option.value;
          }
        }
      }
    }
    return null;
  }
  static valueIsNotInFilteredData(filteredData, value) {
    if (_Select2Utils.isNullOrUndefined(value)) {
      return true;
    }
    for (const groupOrOption of filteredData) {
      const options = groupOrOption.options;
      if (options) {
        for (const option of options) {
          if (option.value === value) {
            return false;
          }
        }
      } else if (groupOrOption.value === value) {
        return false;
      }
    }
    return true;
  }
  // eslint-disable-next-line
  static getPreviousOption(filteredData, hoveringValue) {
    let findIt = _Select2Utils.isNullOrUndefined(hoveringValue);
    for (let i = filteredData.length - 1; i >= 0; i--) {
      const groupOrOption = filteredData[i];
      const options = groupOrOption.options;
      if (options) {
        for (let j = options.length - 1; j >= 0; j--) {
          const option = options[j];
          if (findIt && !option.disabled && !option.hide) {
            return option;
          }
          if (!findIt) {
            findIt = option.value === hoveringValue;
          }
        }
      } else {
        const option = groupOrOption;
        if (findIt && !option.disabled && !option.hide) {
          return option;
        }
        if (!findIt) {
          findIt = option.value === hoveringValue;
        }
      }
    }
    return null;
  }
  // eslint-disable-next-line
  static getNextOption(filteredData, hoveringValue) {
    let findIt = _Select2Utils.isNullOrUndefined(hoveringValue);
    for (const groupOrOption of filteredData) {
      const options = groupOrOption.options;
      if (options) {
        for (const option of options) {
          if (findIt) {
            if (!option.disabled && !option.hide) {
              return option;
            }
          } else if (!findIt) {
            findIt = option.value === hoveringValue;
          }
        }
      } else {
        const option = groupOrOption;
        if (findIt) {
          if (!option.disabled && !option.hide) {
            return option;
          }
        } else if (!findIt) {
          findIt = option.value === hoveringValue;
        }
      }
    }
    return null;
  }
  static getReduceData(data, maxResults = 0) {
    if (maxResults > 0) {
      let counter = 0;
      const result = [];
      for (const groupOrOption of data) {
        const options = groupOrOption.options;
        if (options) {
          const group = __spreadProps(__spreadValues({}, groupOrOption), {
            options: []
          });
          result.push(group);
          for (const item of options) {
            group.options.push(item);
            counter++;
            if (counter === maxResults) {
              return {
                result,
                reduce: true
              };
            }
          }
        } else {
          result.push(groupOrOption);
          counter++;
        }
        if (counter === maxResults) {
          return {
            result,
            reduce: true
          };
        }
      }
      return {
        result,
        reduce: false
      };
    } else {
      return {
        result: data,
        reduce: false
      };
    }
  }
  static getFilteredData(data, searchText, editPattern) {
    if (searchText) {
      const result = [];
      for (const groupOrOption of data) {
        const options = groupOrOption.options;
        if (options) {
          if (options.some((group) => _Select2Utils.containSearchText(group.label, searchText, editPattern))) {
            const filteredOptions = options.filter((group) => _Select2Utils.containSearchText(group.label, searchText, editPattern));
            result.push(__spreadProps(__spreadValues({}, groupOrOption), {
              options: filteredOptions
            }));
          }
        } else if (_Select2Utils.containSearchText(groupOrOption.label, searchText, editPattern)) {
          result.push(groupOrOption);
        }
      }
      return result;
    } else {
      return data;
    }
  }
  static getFilteredSelectedData(data, selectedOptions) {
    const result = [];
    for (const groupOrOption of data) {
      const options = groupOrOption.options;
      if (options) {
        const filteredOptions = options.filter((group) => _Select2Utils.isSelected(selectedOptions, group, true) === "false");
        if (filteredOptions.length) {
          result.push(__spreadProps(__spreadValues({}, groupOrOption), {
            options: filteredOptions
          }));
        }
      } else if (_Select2Utils.isSelected(selectedOptions, groupOrOption, true) === "false") {
        result.push(groupOrOption);
      }
    }
    return result;
  }
  static isSearchboxHiddex(data, minCountForSearch) {
    if (minCountForSearch === "" || minCountForSearch === void 0 || minCountForSearch === null || isNaN(+minCountForSearch)) {
      minCountForSearch = defaultMinCountForSearch;
    }
    const optionCount = _Select2Utils.getOptionsCount(data);
    return optionCount < +minCountForSearch;
  }
  static isSelected(options, option, multiple) {
    return multiple ? options && options.some((op) => op.value === option.value) ? "true" : "false" : options && option.value === options.value ? "true" : "false";
  }
  static removeSelection(options, option) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === option.value) {
        options.splice(i, 1);
        return;
      }
    }
  }
  static getOptionsCount(data) {
    let count = 0;
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = groupOrOption.options;
        if (options) {
          count += options.length;
        } else {
          count++;
        }
      }
    }
    return count;
  }
  static isNullOrUndefined(value) {
    return value === null || value === void 0;
  }
  static containSearchText(label, searchText, editPattern) {
    return searchText ? _Select2Utils.formatSansUnicode(label).match(new RegExp(_Select2Utils.formatPattern(searchText, editPattern), "i")) !== null : true;
  }
  static protectPattern(str) {
    return str.replace(protectRegexp, "\\$&");
  }
  static formatSansUnicode(str) {
    for (const unicodePattern of unicodePatterns) {
      str = str.replace(unicodePattern.s, unicodePattern.l);
    }
    return str;
  }
  static formatPattern(str, editPattern) {
    str = _Select2Utils.formatSansUnicode(_Select2Utils.protectPattern(str));
    if (editPattern && typeof editPattern === "function") {
      str = editPattern(str);
    }
    return str;
  }
};
var nextUniqueId2 = 0;
var displaySearchStatusList = ["default", "hidden", "always"];
var Select2 = class {
  constructor(_viewportRuler, _changeDetectorRef, _parentForm, _parentFormGroup, _control, tabIndex) {
    this._viewportRuler = _viewportRuler;
    this._changeDetectorRef = _changeDetectorRef;
    this._parentForm = _parentForm;
    this._parentFormGroup = _parentFormGroup;
    this._control = _control;
    this.minCharForSearch = 0;
    this.limitSelection = 0;
    this.listPosition = "below";
    this.styleMode = "default";
    this.maxResults = 0;
    this.maxResultsMessage = "Too many results…";
    this.infiniteScrollDistance = 1.5;
    this.infiniteScrollThrottle = 150;
    this.resultMaxHeight = "200px";
    this.update = new EventEmitter();
    this.open = new EventEmitter();
    this.close = new EventEmitter();
    this.focus = new EventEmitter();
    this.blur = new EventEmitter();
    this.search = new EventEmitter();
    this.scroll = new EventEmitter();
    this.removeOption = new EventEmitter();
    this.option = null;
    this.isOpen = false;
    this.focused = false;
    this.hoveringValue = null;
    this.innerSearchText = "";
    this._stateChanges = new Subject();
    this._disabled = false;
    this._required = false;
    this._readonly = false;
    this._multiple = false;
    this._overlay = false;
    this._resettable = false;
    this._hideSelectedItems = false;
    this._clickDetection = false;
    this._uid = `select2-${nextUniqueId2++}`;
    this._infiniteScroll = true;
    this._onTouched = () => {
    };
    this._onChange = () => {
    };
    this.id = this.id;
    this._tabIndex = parseInt(tabIndex, 10) || 0;
    if (this._control) {
      this._control.valueAccessor = this;
    }
    this._clickDetectionFc = this.clickDetection.bind(this);
  }
  /** data of options & optiongrps */
  set data(data) {
    this._data = data;
    this.updateFilteredData();
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = this._coerceBooleanProperty(value);
    this.ngOnInit();
  }
  /** use the material style */
  get overlay() {
    return this._overlay;
  }
  set overlay(value) {
    this._overlay = this._coerceBooleanProperty(value);
  }
  /** infinite scroll activated */
  get infiniteScroll() {
    return this._infiniteScroll;
  }
  set infiniteScroll(value) {
    this._infiniteScroll = this._coerceBooleanProperty(value);
  }
  get select2Options() {
    return this.multiple ? this.option : null;
  }
  get select2Option() {
    return this.multiple ? null : this.option;
  }
  get searchText() {
    return this.innerSearchText;
  }
  set searchText(text) {
    if (this.customSearchEnabled) {
      this.search.emit({
        component: this,
        value: this._value,
        search: text
      });
    }
    this.innerSearchText = text;
  }
  /** minimal data of show the search field */
  get minCountForSearch() {
    return this._minCountForSearch;
  }
  set minCountForSearch(value) {
    this._minCountForSearch = value;
    this.updateSearchBox();
  }
  /** Unique id of the element. */
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value || this._uid;
  }
  /** Whether the element is required. */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = this._coerceBooleanProperty(value);
  }
  /** Whether selected items should be hidden. */
  get disabled() {
    return this._control ? this._control.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = this._coerceBooleanProperty(value);
  }
  /** Whether items are hidden when has. */
  get hideSelectedItems() {
    return this._hideSelectedItems;
  }
  set hideSelectedItems(value) {
    this._hideSelectedItems = this._coerceBooleanProperty(value);
  }
  /** Whether the element is readonly. */
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = this._coerceBooleanProperty(value);
  }
  /** The input element's value. */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this.testValueChange(this._value, value)) {
      setTimeout(() => {
        this._value = value;
        this.writeValue(value);
      }, 10);
    }
  }
  /** Tab index for the select2 element. */
  get tabIndex() {
    return this.disabled ? -1 : this._tabIndex;
  }
  set tabIndex(value) {
    if (typeof value !== "undefined") {
      this._tabIndex = value;
    }
  }
  /** reset with no selected value */
  get resettable() {
    return this._resettable;
  }
  set resettable(value) {
    this._resettable = this._coerceBooleanProperty(value);
  }
  get ariaInvalid() {
    return this._isErrorState();
  }
  get classMaterial() {
    return this.styleMode === "material";
  }
  get classNostyle() {
    return this.styleMode === "noStyle";
  }
  get select2above() {
    return !this.overlay ? this.listPosition === "above" : this._isAbobeOverlay();
  }
  get _positions() {
    if (this.listPosition === "auto") {
      [{
        originX: "start",
        originY: "bottom",
        overlayX: "start",
        overlayY: "bottom"
      }, {
        originX: "start",
        originY: "top",
        overlayX: "start",
        overlayY: "top"
      }];
    } else {
      return null;
    }
  }
  get resultsElement() {
    return this.resultContainer?.nativeElement;
  }
  ngOnInit() {
    this._viewportRuler.change(100).subscribe(() => {
      if (this.isOpen) {
        this.triggerRect();
      }
    });
    const option = Select2Utils.getOptionsByValue(this._data, this._control ? this._control.value : this.value, this.multiple);
    if (option !== null) {
      this.option = option;
    }
    if (!Array.isArray(option)) {
      this.hoveringValue = this.value;
    }
    this.updateSearchBox();
  }
  ngAfterViewInit() {
    this.cdkConnectedOverlay.positionChange.subscribe((posChange) => {
      if (this.listPosition === "auto" && posChange.connectionPair?.originY && this._overlayPosition !== posChange.connectionPair.originY) {
        this.triggerRect();
        this._overlayPosition = posChange.connectionPair.originY;
        this._changeDetectorRef.detectChanges();
      }
    });
    this.selectionElement = this.selection.nativeElement;
    this.triggerRect();
  }
  ngDoCheck() {
    this.updateSearchBox();
    this._dirtyCheckNativeValue();
    if (this._triggerRect) {
      if (this.overlayWidth !== this._triggerRect.width) {
        this.overlayWidth = this._triggerRect.width;
      }
      if (this._dropdownRect?.height > 0 && this.overlayHeight !== this._dropdownRect.height) {
        this.overlayHeight = this.listPosition === "auto" ? this._dropdownRect.height : 0;
      }
    }
  }
  ngOnDestroy() {
    window.document.body.removeEventListener("click", this._clickDetectionFc);
  }
  updateSearchBox() {
    const hidden = this.customSearchEnabled ? false : Select2Utils.isSearchboxHiddex(this._data, this._minCountForSearch);
    if (this.isSearchboxHidden !== hidden) {
      this.isSearchboxHidden = hidden;
    }
  }
  hideSearch() {
    const displaySearchStatus = displaySearchStatusList.indexOf(this.displaySearchStatus) > -1 ? this.displaySearchStatus : "default";
    return displaySearchStatus === "default" && this.isSearchboxHidden || displaySearchStatus === "hidden";
  }
  getOptionStyle(option) {
    return "select2-results__option " + (option.hide ? "select2-results__option--hide " : "") + (option.value === this.hoveringValue ? "select2-results__option--highlighted " : "") + (option.classes || "");
  }
  mouseenter(option) {
    if (!option.disabled) {
      this.hoveringValue = option.value;
    }
  }
  click(option) {
    if (this.testSelection(option)) {
      this.select(option);
    }
  }
  reset(e) {
    this.select(null);
    e.preventDefault();
    e.stopPropagation();
  }
  prevChange(event) {
    event.stopPropagation();
  }
  toggleOpenAndClose() {
    if (this.disabled) {
      return;
    }
    this._focus(true);
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.innerSearchText = "";
      this.updateFilteredData();
      this._focusSearchboxOrResultsElement();
      setTimeout(() => {
        if (this.option) {
          const option = this.option instanceof Array ? this.option[0] : this.option;
          this.updateScrollFromOption(option);
        } else if (this.resultsElement) {
          this.resultsElement.scrollTop = 0;
        }
        setTimeout(() => {
          this.triggerRect();
          this.cdkConnectedOverlay?.overlayRef?.updatePosition();
        }, 100);
      });
      this.open.emit(this);
    } else {
      this.close.emit(this);
    }
    if (this.isOpen && !this._clickDetection) {
      setTimeout(() => {
        window.document.body.addEventListener("click", this._clickDetectionFc, false);
        this._clickDetection = true;
      }, timeout);
    }
    this._changeDetectorRef.markForCheck();
  }
  hasTemplate(option, defaut) {
    return this.templates instanceof TemplateRef || this.templates?.[option.templateId] instanceof TemplateRef || this.templates?.[defaut] instanceof TemplateRef;
  }
  getTemplate(option, defaut) {
    return this.hasTemplate(option, defaut) ? this.templates[option.templateId] || this.templates[defaut] || this.templates : void 0;
  }
  triggerRect() {
    this._triggerRect = this.selectionElement.getBoundingClientRect();
    this._dropdownRect = this.dropdown?.nativeElement ? this.dropdown.nativeElement.getBoundingClientRect() : void 0;
  }
  testSelection(option) {
    if (option.disabled) {
      return false;
    }
    if (!this.multiple || !this.limitSelection || Array.isArray(this._value) && this._value.length < this.limitSelection) {
      return true;
    }
    return false;
  }
  testValueChange(value1, value2) {
    if ((value1 === null || value1 === void 0) && (value2 === null || value2 === void 0) || value1 === value2) {
      return false;
    }
    if (this.multiple && value1?.length && value2?.length && value1.length === value2.length) {
      for (const e1 of value1) {
        const test = value2.indexOf(e1) > -1;
        if (!test) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
  updateFilteredData() {
    setTimeout(() => {
      let result = this._data;
      if (this.multiple && this.hideSelectedItems) {
        result = Select2Utils.getFilteredSelectedData(result, this.option);
      }
      if (!this.customSearchEnabled && this.searchText && this.searchText.length >= +this.minCharForSearch) {
        result = Select2Utils.getFilteredData(result, this.searchText, this.editPattern);
      }
      if (this.maxResults > 0) {
        const data = Select2Utils.getReduceData(result, +this.maxResults);
        result = data.result;
        this.maxResultsExceeded = data.reduce;
      } else {
        this.maxResultsExceeded = false;
      }
      if (Select2Utils.valueIsNotInFilteredData(result, this.hoveringValue)) {
        this.hoveringValue = Select2Utils.getFirstAvailableOption(result);
      }
      this.filteredData = result;
      this._changeDetectorRef.markForCheck();
    });
  }
  clickDetection(e) {
    if (!this.ifParentContainsClass(e.target, "selection")) {
      if (this.isOpen && !this.ifParentContainsClass(e.target, "select2-dropdown")) {
        this.toggleOpenAndClose();
      }
      if (!this.ifParentContainsId(e.target, this._id)) {
        this.clickExit();
      }
    } else if (this.isOpen && !this.ifParentContainsId(e.target, this._id)) {
      this.toggleOpenAndClose();
      this.clickExit();
    }
  }
  clickExit() {
    this._focus(false);
    window.document.body.removeEventListener("click", this._clickDetectionFc);
    this._clickDetection = false;
  }
  ifParentContainsClass(element, cssClass) {
    return this.getParentElementByClass(element, cssClass) !== null;
  }
  ifParentContainsId(element, id) {
    return this.getParentElementById(element, id) !== null;
  }
  getParentElementByClass(element, cssClass) {
    if (this.containClasses(element, cssClass.trim().split(/\s+/))) {
      return element;
    }
    return element.parentElement ? this.getParentElementByClass(element.parentElement, cssClass) : null;
  }
  getParentElementById(element, id) {
    if (element.id === id) {
      return element;
    }
    return element.parentElement ? this.getParentElementById(element.parentElement, id) : null;
  }
  containClasses(element, cssClasses) {
    if (!element.classList) {
      return false;
    }
    for (const cssClass of cssClasses) {
      if (!element.classList.contains(cssClass)) {
        return false;
      }
    }
    return true;
  }
  focusin() {
    if (!this.disabled) {
      this._focus(true);
    }
  }
  focusout() {
    if (this.selectionElement && !this.selectionElement.classList.contains("select2-focused")) {
      this._focus(false);
      this._onTouched();
    }
  }
  select(option) {
    let value;
    if (option !== null) {
      if (this.multiple) {
        const options = this.option;
        const index = options.findIndex((op) => op.value === option.value);
        if (index === -1) {
          options.push(option);
        } else {
          options.splice(index, 1);
        }
        value = this.option.map((op) => op.value);
      } else {
        this.option = option;
        if (this.isOpen) {
          this.isOpen = false;
          this.close.emit(this);
          if (this.selectionElement) {
            this.selectionElement.focus();
          }
        }
        value = this.option.value;
      }
    } else {
      this.option = null;
    }
    if (this.multiple && this.hideSelectedItems) {
      this.updateFilteredData();
    }
    if (this._control) {
      this._onChange(value);
    } else {
      this._value = value;
    }
    this.update.emit({
      component: this,
      value,
      options: Array.isArray(this.option) ? this.option : this.option ? [this.option] : null
    });
  }
  keyDown(e) {
    if (this._testKey(e, ["ArrowDown", 40])) {
      this.moveDown();
      e.preventDefault();
    } else if (this._testKey(e, ["ArrowUp", 38])) {
      this.moveUp();
      e.preventDefault();
    } else if (this._testKey(e, ["Enter", 13])) {
      this.selectByEnter();
      e.preventDefault();
    } else if (this._testKey(e, ["Escape", "Tab", 9, 27]) && this.isOpen) {
      this.toggleOpenAndClose();
      this._focus(false);
    }
  }
  openKey(e) {
    if (this._testKey(e, ["ArrowDown", "ArrowUp", "Enter", 40, 38, 13])) {
      this.toggleOpenAndClose();
      e.preventDefault();
    } else if (this._testKey(e, ["Escape", "Tab", 9, 27])) {
      this._focus(false);
      this._onTouched();
    }
  }
  trackBy(_index, item) {
    return item.value;
  }
  searchUpdate(e) {
    this.searchText = e.target.value;
    this.updateFilteredData();
  }
  isSelected(option) {
    return Select2Utils.isSelected(this.option, option, this.multiple);
  }
  isDisabled(option) {
    return option.disabled ? "true" : "false";
  }
  removeSelection(e, option) {
    Select2Utils.removeSelection(this.option, option);
    if (this.multiple && this.hideSelectedItems) {
      this.updateFilteredData();
    }
    const value = this.option.map((op) => op.value);
    if (this._control) {
      this._onChange(value);
    } else {
      this._value = value;
    }
    this.update.emit({
      component: this,
      value,
      options: Array.isArray(this.option) ? this.option : this.option ? [this.option] : null
    });
    this.removeOption.emit({
      component: this,
      value,
      removedOption: option
    });
    e.preventDefault();
    e.stopPropagation();
    if (this.isOpen) {
      this._focusSearchboxOrResultsElement();
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value) {
    this._setSelectionByValue(value);
  }
  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Sets whether the component should be disabled.
   * Implemented as part of ControlValueAccessor.
   * @param isDisabled
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onScroll(way) {
    this.scroll.emit({
      component: this,
      way,
      search: this.innerSearchText
    });
  }
  _isErrorState() {
    const isInvalid = this._control && this._control.invalid;
    const isTouched = this._control && this._control.touched;
    const isSubmitted = this._parentFormGroup && this._parentFormGroup.submitted || this._parentForm && this._parentForm.submitted;
    return !!(isInvalid && (isTouched || isSubmitted));
  }
  moveUp() {
    this.updateScrollFromOption(Select2Utils.getPreviousOption(this.filteredData, this.hoveringValue));
  }
  moveDown() {
    this.updateScrollFromOption(Select2Utils.getNextOption(this.filteredData, this.hoveringValue));
  }
  updateScrollFromOption(option) {
    if (option) {
      this.hoveringValue = option.value;
      const domElement = this.results.find((r) => r.nativeElement.innerText.trim() === option.label);
      if (domElement && this.resultsElement) {
        this.resultsElement.scrollTop = 0;
        const listClientRect = this.resultsElement.getBoundingClientRect();
        const optionClientRect = domElement.nativeElement.getBoundingClientRect();
        this.resultsElement.scrollTop = optionClientRect.top - listClientRect.top;
      }
    }
  }
  selectByEnter() {
    if (this.hoveringValue) {
      const option = Select2Utils.getOptionByValue(this._data, this.hoveringValue);
      this.select(option);
    }
  }
  _testKey(event, refs = []) {
    return this._isKey(this._getKey(event), refs);
  }
  _getKey(event) {
    let code;
    if (event.key !== void 0) {
      code = event.key;
    } else if (event["keyIdentifier"] !== void 0) {
      code = event["keyIdentifier"];
    } else if (event["keyCode"] !== void 0) {
      code = event["keyCode"];
    } else {
      event.preventDefault();
    }
    return code;
  }
  _isKey(code, refs = []) {
    return refs && refs.length > 0 ? refs.indexOf(code) !== -1 : false;
  }
  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  _setSelectionByValue(value) {
    if (this.option || value !== void 0 && value !== null) {
      const isArray = Array.isArray(value);
      if (this.multiple && value && !isArray) {
        throw new Error("Non array value.");
      } else if (this._data) {
        if (this.multiple) {
          this.option = [];
          if (isArray) {
            const selectedValues = Select2Utils.getOptionsByValue(this._data, value, this.multiple);
            selectedValues.map((item) => this.select(item));
          }
        } else {
          this.select(Select2Utils.getOptionByValue(this._data, value));
        }
      } else if (this._control) {
        this._control.viewToModelUpdate(value);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Does some manual dirty checking on the native input `value` property. */
  _dirtyCheckNativeValue() {
    const newValue = this.value;
    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this._stateChanges.next();
    }
  }
  _coerceBooleanProperty(value) {
    return value != null && `${value}` !== "false";
  }
  _focusSearchboxOrResultsElement() {
    if (!this.isSearchboxHidden) {
      setTimeout(() => {
        if (this.searchInput && this.searchInput.nativeElement) {
          this.searchInput.nativeElement.focus();
        }
      });
    } else if (this.resultsElement) {
      this.resultsElement.focus();
    }
  }
  _focus(state) {
    if (!state && this.focused) {
      this.focused = state;
      this.blur.emit(this);
    } else if (state && !this.focused) {
      this.focused = state;
      this.focus.emit(this);
    }
  }
  _isAbobeOverlay() {
    return this.overlay && this._overlayPosition && this.listPosition === "auto" ? this._overlayPosition === "top" : this.listPosition === "above";
  }
};
Select2.ɵfac = function Select2_Factory(t) {
  return new (t || Select2)(ɵɵdirectiveInject(ViewportRuler), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NgForm, 8), ɵɵdirectiveInject(FormGroupDirective, 8), ɵɵdirectiveInject(NgControl, 10), ɵɵinjectAttribute("tabindex"));
};
Select2.ɵcmp = ɵɵdefineComponent({
  type: Select2,
  selectors: [["select2"]],
  viewQuery: function Select2_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(CdkConnectedOverlay, 5);
      ɵɵviewQuery(_c0, 7);
      ɵɵviewQuery(_c1, 5);
      ɵɵviewQuery(_c2, 5);
      ɵɵviewQuery(_c3, 5);
      ɵɵviewQuery(_c4, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cdkConnectedOverlay = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selection = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.resultContainer = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.searchInput = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdown = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.results = _t);
    }
  },
  hostVars: 8,
  hostBindings: function Select2_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵhostProperty("id", ctx.id);
      ɵɵattribute("aria-invalid", ctx.ariaInvalid);
      ɵɵclassProp("material", ctx.classMaterial)("nostyle", ctx.classNostyle)("select2-above", ctx.select2above);
    }
  },
  inputs: {
    data: "data",
    minCharForSearch: "minCharForSearch",
    displaySearchStatus: "displaySearchStatus",
    placeholder: "placeholder",
    customSearchEnabled: "customSearchEnabled",
    limitSelection: "limitSelection",
    listPosition: "listPosition",
    multiple: "multiple",
    overlay: "overlay",
    styleMode: "styleMode",
    noResultMessage: "noResultMessage",
    maxResults: "maxResults",
    maxResultsMessage: "maxResultsMessage",
    infiniteScrollDistance: "infiniteScrollDistance",
    infiniteScrollThrottle: "infiniteScrollThrottle",
    infiniteScroll: "infiniteScroll",
    editPattern: "editPattern",
    templates: "templates",
    resultMaxHeight: "resultMaxHeight",
    minCountForSearch: "minCountForSearch",
    id: "id",
    required: "required",
    disabled: "disabled",
    hideSelectedItems: "hideSelectedItems",
    readonly: "readonly",
    value: "value",
    tabIndex: "tabIndex",
    resettable: "resettable"
  },
  outputs: {
    update: "update",
    open: "open",
    close: "close",
    focus: "focus",
    blur: "blur",
    search: "search",
    scroll: "scroll",
    removeOption: "removeOption"
  },
  ngContentSelectors: _c6,
  decls: 18,
  vars: 26,
  consts: [["selection", "", "trigger", "cdkOverlayOrigin"], ["containerTemplate", ""], ["dropdown", ""], ["searchInput", ""], ["results", ""], ["optGroup", ""], ["result", ""], ["liGroup", ""], ["li", ""], [1, "select2-label", 3, "click"], ["class", "select2-required", 4, "ngIf"], [1, "select2", "select2-container", "select2-container--default", "select2-container--focus"], ["cdkOverlayOrigin", "", 1, "selection", 3, "click", "focus", "blur", "keydown"], ["role", "combobox", 1, "select2-selection"], ["class", "select2-selection__rendered", 3, "title", 4, "ngIf"], ["class", "select2-selection__reset", "role", "presentation", 3, "click", 4, "ngIf"], ["class", "select2-selection__arrow", "role", "presentation", 4, "ngIf"], ["class", "select2-selection__rendered", 4, "ngIf"], [4, "ngIf"], [1, "select2-subscript-wrapper"], ["cdkConnectedOverlay", "", "cdkConnectedOverlayHasBackdrop", "", "cdkConnectedOverlayBackdropClass", "select2-overlay-backdrop", 3, "backdropClick", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayPositions"], [1, "select2-required"], [1, "select2-selection__rendered", 3, "title"], [3, "innerHTML", 4, "ngIf"], [1, "select2-selection__placeholder"], [3, "innerHTML"], ["role", "presentation", 1, "select2-selection__reset", 3, "click"], ["role", "presentation", 1, "select2-selection__arrow"], [1, "select2-selection__rendered"], ["class", "select2-selection__choice", 3, "title", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "select2-selection__choice", 3, "title"], ["class", "select2-selection__choice__remove", "role", "presentation", 3, "click", 4, "ngIf"], ["role", "presentation", 1, "select2-selection__choice__remove", 3, "click"], [4, "ngTemplateOutlet"], [1, "select2-container", "select2-container--default", "select2-container-dropdown"], [1, "select2-dropdown"], [1, "select2-search", "select2-search--dropdown"], ["type", "search", "role", "textbox", "autocomplete", "off", "autocorrect", "off", "autocapitalize", "off", "spellcheck", "false", 1, "select2-search__field", 3, "keydown", "keyup", "change", "id", "value"], [1, "select2-results"], ["role", "tree", "tabindex", "-1", "infiniteScroll", "", 1, "select2-results__options", 3, "scrolled", "scrolledUp", "keydown", "infiniteScrollDisabled", "infiniteScrollDistance", "infiniteScrollThrottle", "infiniteScrollContainer"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "select2-no-result select2-results__option", 3, "innerHTML", 4, "ngIf"], ["class", "select2-too-much-result select2-results__option", 3, "innerHTML", 4, "ngIf"], ["class", "select2-results__option", "role", "group", 4, "ngIf"], ["role", "treeitem", 3, "id", "class", "mouseenter", "click", 4, "ngIf"], ["role", "group", 1, "select2-results__option"], [3, "innerHTML", 4, "ngIf", "ngIfElse"], [1, "select2-results__options", "select2-results__options--nested"], ["role", "treeitem", 3, "id", "class", "mouseenter", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "treeitem", 3, "mouseenter", "click", "id"], ["class", "select2-label-content", 3, "innerHTML", 4, "ngIf", "ngIfElse"], [1, "select2-label-content", 3, "innerHTML"], [1, "select2-no-result", "select2-results__option", 3, "innerHTML"], [1, "select2-too-much-result", "select2-results__option", 3, "innerHTML"]],
  template: function Select2_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵprojectionDef(_c5);
      ɵɵelementStart(0, "div", 9);
      ɵɵlistener("click", function Select2_Template_div_click_0_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.toggleOpenAndClose());
      });
      ɵɵprojection(1);
      ɵɵtemplate(2, Select2_span_2_Template, 1, 0, "span", 10);
      ɵɵelementEnd();
      ɵɵelementStart(3, "div", 11)(4, "div", 12, 0);
      ɵɵlistener("click", function Select2_Template_div_click_4_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.toggleOpenAndClose());
      })("focus", function Select2_Template_div_focus_4_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.focusin());
      })("blur", function Select2_Template_div_blur_4_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.focusout());
      })("keydown", function Select2_Template_div_keydown_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.openKey($event));
      });
      ɵɵelementStart(7, "div", 13);
      ɵɵtemplate(8, Select2_span_8_Template, 5, 6, "span", 14)(9, Select2_span_9_Template, 2, 0, "span", 15)(10, Select2_span_10_Template, 1, 0, "span", 16)(11, Select2_ul_11_Template, 4, 5, "ul", 17);
      ɵɵelementEnd()();
      ɵɵtemplate(12, Select2_ng_container_12_Template, 2, 1, "ng-container", 18);
      ɵɵelementStart(13, "div", 19);
      ɵɵprojection(14, 1);
      ɵɵelementEnd()();
      ɵɵtemplate(15, Select2_ng_template_15_Template, 1, 1, "ng-template", 20);
      ɵɵlistener("backdropClick", function Select2_Template_ng_template_backdropClick_15_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.toggleOpenAndClose());
      });
      ɵɵtemplate(16, Select2_ng_template_16_Template, 12, 25, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const trigger_r19 = ɵɵreference(6);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.required);
      ɵɵadvance();
      ɵɵclassProp("select2-container--below", !ctx.select2above)("select2-container--above", ctx.select2above)("select2-container--open", ctx.isOpen)("select2-container--disabled", ctx.disabled);
      ɵɵadvance();
      ɵɵclassProp("select2-focused", ctx.focused);
      ɵɵattribute("tabindex", !ctx.isOpen ? ctx.tabIndex : "-1");
      ɵɵadvance(3);
      ɵɵclassProp("select2-selection--multiple", ctx.multiple)("select2-selection--single", !ctx.multiple);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.multiple);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.multiple && ctx.resettable && ctx.select2Option && !(ctx.disabled || ctx.readonly));
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.multiple);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.multiple);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.overlay);
      ɵɵadvance(3);
      ɵɵproperty("cdkConnectedOverlayOrigin", trigger_r19)("cdkConnectedOverlayOpen", ctx.isOpen && ctx.overlay)("cdkConnectedOverlayMinWidth", ctx.overlayWidth)("cdkConnectedOverlayHeight", ctx.overlayHeight)("cdkConnectedOverlayPositions", ctx._positions);
    }
  },
  dependencies: [NgForOf, NgIf, NgTemplateOutlet, CdkConnectedOverlay, CdkOverlayOrigin, InfiniteScrollDirective],
  styles: ['.select2-label[_ngcontent-%COMP%]{color:#000;color:var(--select2-label-text-color, #000)}.select2-container[_ngcontent-%COMP%]{box-sizing:border-box;display:inline-block;margin:0;position:relative;vertical-align:middle;width:100%}.select2-container[_ngcontent-%COMP%]   .select2-container-dropdown[_ngcontent-%COMP%]{position:absolute;width:0px;opacity:0}.select2-container[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]{box-sizing:border-box;cursor:pointer;display:block;height:28px;-webkit-user-select:none;user-select:none}.select2-container[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]{display:block;padding:0 0 0 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto}.select2-container[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__clear[_ngcontent-%COMP%]{position:relative}.select2-container[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{box-sizing:border-box;cursor:pointer;display:block;min-height:32px;-webkit-user-select:none;user-select:none}.select2-container[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]{display:inline-block;overflow:hidden;padding-left:8px;text-overflow:ellipsis;white-space:nowrap}.select2-container[_ngcontent-%COMP%]   .select2-search--inline[_ngcontent-%COMP%]{float:left}.select2-container[_ngcontent-%COMP%]   .select2-search--inline[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]{box-sizing:border-box;border:none;font-size:100%;margin-top:5px;padding:0}.select2-container[_ngcontent-%COMP%]   .select2-search--inline[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]::-webkit-search-cancel-button{-webkit-appearance:none}.select2-dropdown[_ngcontent-%COMP%]{background:white;background:var(--select2-dropdown-background, white);border:1px solid #aaa;border:1px solid var(--select2-dropdown-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);box-sizing:border-box;display:block;position:absolute;width:100%;z-index:1051;height:0;overflow:hidden}.select2-dropdown[_ngcontent-%COMP%]   .select2-label-content[_ngcontent-%COMP%]{display:contents}.select2-results[_ngcontent-%COMP%]{display:block}.select2-results__options[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}.select2-results__option[_ngcontent-%COMP%]{padding:6px;-webkit-user-select:none;user-select:none;color:#000;color:var(--select2-option-text-color, #000)}.select2-results__option[aria-selected][_ngcontent-%COMP%]{cursor:pointer}.select2-container.select2-container-dropdown.select2-container--open[_ngcontent-%COMP%]{width:100%;opacity:1}.select2-container--open[_ngcontent-%COMP%]   .select2-dropdown[_ngcontent-%COMP%]{overflow:auto;height:auto}.select2-container--open[_ngcontent-%COMP%]   .select2-dropdown--above[_ngcontent-%COMP%]{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0;bottom:27px;display:flex;flex-direction:column-reverse}.select2-container--open[_ngcontent-%COMP%]   .select2-dropdown--below[_ngcontent-%COMP%]{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.select2-search--dropdown[_ngcontent-%COMP%]{display:block;padding:4px}.select2-search--dropdown[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]{padding:4px;width:100%;box-sizing:border-box}.select2-search--dropdown[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]::-webkit-search-cancel-button{-webkit-appearance:none}.select2-search--dropdown.select2-search--hide[_ngcontent-%COMP%]{display:none}.select2-close-mask[_ngcontent-%COMP%]{border:0;margin:0;padding:0;display:block;position:fixed;left:0;top:0;min-height:100%;min-width:100%;height:auto;width:auto;opacity:0;z-index:99;background:#fff;filter:alpha(opacity=0)}.select2-required[_ngcontent-%COMP%]:before{content:"*";color:red;color:var(--select2-required-color, red)}.select2-hidden-accessible[_ngcontent-%COMP%]{border:0!important;clip:rect(0 0 0 0)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;width:1px!important}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]{background:#fff;background:var(--select2-selection-background, #fff);border:1px solid #aaa;border:1px solid var(--select2-selection-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);display:flex}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]{color:#444;color:var(--select2-selection-text-color, #444);line-height:28px}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__clear[_ngcontent-%COMP%]{cursor:pointer;float:right;font-weight:700}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__placeholder[_ngcontent-%COMP%]{color:#999;color:var(--select2-placeholder-color, #999)}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-overflow:var(--select2-placeholder-overflow, ellipsis)}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__placeholder__option[_ngcontent-%COMP%]{display:none}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__reset[_ngcontent-%COMP%], .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__arrow[_ngcontent-%COMP%]{display:flex;width:20px;align-items:center;justify-content:center}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__arrow[_ngcontent-%COMP%]:before{content:" ";border-color:#888 transparent;border-color:var(--select2-arrow-color, #888) transparent;border-style:solid;border-width:5px 4px 0;height:0;width:0}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__reset[_ngcontent-%COMP%]{color:#999;color:var(--select2-reset-color, #999)}.select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]{background:#eee;background:var(--select2-selection-disabled-background, #eee);cursor:default}.select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__clear[_ngcontent-%COMP%]{display:none}.select2-container--default.select2-container--open[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__arrow[_ngcontent-%COMP%]:before{border-color:transparent transparent #888;border-color:transparent transparent var(--select2-arrow-color, #888);border-width:0 4px 5px}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{background:#fff;background:var(--select2-selection-background, #fff);border:1px solid #aaa;border:1px solid var(--select2-selection-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);cursor:text}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]{flex:1 1 auto;box-sizing:border-box;list-style:none;margin:0;padding:0 5px;width:100%}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__placeholder[_ngcontent-%COMP%]{display:block;width:100%;color:#999;color:var(--select2-placeholder-color, #999);margin-top:5px;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-overflow:var(--select2-placeholder-overflow, ellipsis)}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__placeholder__option[_ngcontent-%COMP%]{display:none}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__clear[_ngcontent-%COMP%]{cursor:pointer;float:right;font-weight:700;margin-top:5px;margin-right:10px}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__choice[_ngcontent-%COMP%]{color:#000;color:var(--select2-selection-choice-text-color, #000);background:#e4e4e4;background:var(--select2-selection-choice-background, #e4e4e4);border:1px solid #aaa;border:1px solid var(--select2-selection-choice-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);cursor:default;float:left;margin-right:5px;margin-top:5px;padding:0 5px}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__choice__remove[_ngcontent-%COMP%]{color:#999;color:var(--select2-selection-choice-close-color, #999);cursor:pointer;display:inline-block;font-weight:700;margin-right:2px}.select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__choice__remove[_ngcontent-%COMP%]:hover{color:#333;color:var(--select2-selection-choice-hover-close-color, #333)}.select2-container--default.select2-container--focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{border:solid #000 1px;border:solid var(--select2-selection-focus-border-color, #000) 1px;outline:none}.select2-container--default[_ngcontent-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .select2-container--default[_ngcontent-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{border:solid #000 1px;border:solid var(--select2-selection-focus-border-color, #000) 1px;outline:none}.select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{background:#eee;background:var(--select2-selection-disabled-background, #eee);cursor:default}.select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection__choice__remove[_ngcontent-%COMP%]{display:none}.select2-container--default.select2-container--open.select2-container--above[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .select2-container--default.select2-container--open.select2-container--above[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{border-top-left-radius:0;border-top-right-radius:0}.select2-container--default.select2-container--open.select2-container--below[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .select2-container--default.select2-container--open.select2-container--below[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{border-bottom-left-radius:0;border-bottom-right-radius:0}.select2-container--default[_ngcontent-%COMP%]   .select2-search--dropdown[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]{border:1px solid #aaa;border:1px solid var(--select2-search-border-color, #aaa);background:#fff;background:1px solid var(--select2-search-background, #fff);border-radius:0;border-radius:var(--select2-search-border-radius, 0px)}.select2-container--default[_ngcontent-%COMP%]   .select2-search--inline[_ngcontent-%COMP%]   .select2-search__field[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;box-shadow:none;-webkit-appearance:textfield}.select2-container--default[_ngcontent-%COMP%]   .select2-results[_ngcontent-%COMP%] > .select2-results__options[_ngcontent-%COMP%]{overflow-y:auto}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[role=group][_ngcontent-%COMP%]{padding:0}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[aria-disabled=true][_ngcontent-%COMP%]{color:#999;color:var(--select2-option-disabled-text-color, #999);background:transparent;background:var(--select2-option-disabled-background, transparent)}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[aria-selected=true][_ngcontent-%COMP%]{color:#000;color:var(--select2-option-selected-text-color, #000);background:#ddd;background:var(--select2-option-selected-background, #ddd)}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{padding-left:1em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__group[_ngcontent-%COMP%]{padding-left:0}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{margin-left:-1em;padding-left:2em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{margin-left:-2em;padding-left:3em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{margin-left:-3em;padding-left:4em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{margin-left:-4em;padding-left:5em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]   .select2-results__option[_ngcontent-%COMP%]{margin-left:-5em;padding-left:6em}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option--highlighted[aria-selected][_ngcontent-%COMP%]{background:#5897fb;background:var(--select2-option-highlighted-background, #5897fb);color:#fff;color:var(--select2-option-highlighted-text-color, #fff)}.select2-container--default[_ngcontent-%COMP%]   .select2-results__option--hide[_ngcontent-%COMP%]{display:none}.select2-container--default[_ngcontent-%COMP%]   .select2-results__group[_ngcontent-%COMP%]{cursor:default;display:block;padding:6px;color:gray;color:var(--select2-option-group-text-color, gray);background:transparent;background:var(--select2-option-group-background, transparent)}.select2-no-result[_ngcontent-%COMP%]{color:#888;color:var(--select2-no-result-color, #888);font-style:italic;font-style:var(--select2-no-result-font-style, italic)}.select2-too-much-result[_ngcontent-%COMP%]{color:#888;color:var(--select2-too-much-result-color, #888);font-style:italic;font-style:var(--select2-too-much-font-style, italic)}.nostyle[_nghost-%COMP%]   .select2-dropdown[_ngcontent-%COMP%]{border-color:transparent}.nostyle[_nghost-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .nostyle[_nghost-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{background:transparent;border-color:transparent}.nostyle[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-focused[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .nostyle[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%], .nostyle[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .nostyle[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{background:transparent;border-color:transparent}.material[_nghost-%COMP%]{display:inline-block;width:300px}.material[_nghost-%COMP%] > .select2-container[_ngcontent-%COMP%]{padding-bottom:1.29688em;vertical-align:inherit}.material[_nghost-%COMP%] > .select2-container[_ngcontent-%COMP%]   .selection[_ngcontent-%COMP%]{padding:.4375em 0;border-top:.84375em solid transparent;display:inline-flex;align-items:baseline;width:100%;height:auto}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{width:100%;border:0;border-radius:0;height:24px;box-sizing:border-box}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:before, .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:before{content:" ";display:block;position:absolute;bottom:1.65em;background:#ddd;background:var(--select2-material-underline, #ddd);height:1px;width:100%}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:after, .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:after{content:" ";display:block;position:absolute;bottom:1.63em;background:#5a419e;background:var(--select2-material-underline-active, #5a419e);height:2px;width:0%;left:50%;transition:none}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%], .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__rendered[_ngcontent-%COMP%]{padding-left:1px;line-height:inherit}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]   .select2-selection__placeholder[_ngcontent-%COMP%], .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]   .select2-selection__placeholder[_ngcontent-%COMP%]{display:block;color:#00000061;color:var(--select2-material-placeholder-color, rgba(0, 0, 0, .38));transition:transform .3s;position:absolute;transform-origin:0 21px;left:0;top:20px}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-container--open[_ngcontent-%COMP%]{left:0;bottom:1.6em}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection__placeholder__option[_ngcontent-%COMP%]{transform:translateY(-1.5em) scale(.75) perspective(100px) translateZ(.001px);width:133.33333%}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection__arrow[_ngcontent-%COMP%]{top:20px}.material[_nghost-%COMP%]   .select2-container--default.select2-container--open[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:after, .material[_nghost-%COMP%]   .select2-container--default.select2-container--open[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:after, .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-focused[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:after, .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:after{transition:width .3s cubic-bezier(.12,1,.77,1),left .3s cubic-bezier(.12,1,.77,1);width:100%;left:0%}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-dropdown[_ngcontent-%COMP%]{border-radius:0;border:0;box-shadow:0 5px 5px #00000080}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-results__option[aria-selected=true][_ngcontent-%COMP%], .material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-results__option--highlighted[aria-selected][_ngcontent-%COMP%]{background:rgba(0,0,0,.04);background:var(--select2-material-option-selected-background, rgba(0, 0, 0, .04));color:#000;color:var(--select2-material-option-highlighted-text-color, #000)}.material[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-results__option[aria-selected=true][_ngcontent-%COMP%]{color:#ff5722;color:var(--select2-material-option-selected-text-color, #ff5722)}.material[_nghost-%COMP%]   .select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .material[_nghost-%COMP%]   .select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{background:transparent}.material[_nghost-%COMP%]   .select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:before, .material[_nghost-%COMP%]   .select2-container--default.select2-container--disabled[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:before{background:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background:var(--select2-material-underline-disabled, linear-gradient(to right, rgba(0, 0, 0, .26) 0, rgba(0, 0, 0, .26) 33%, transparent 0));background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom}.material.ng-invalid.ng-touched[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:before, .material.ng-invalid.ng-touched[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%]:after, .material.ng-invalid.ng-touched[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:before, .material.ng-invalid.ng-touched[_nghost-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]:after{background:red;background:var(--select2-material-underline-invalid, red)}.material[_nghost-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], .material[_nghost-%COMP%]:not(.select2-container--open)   .select2-focused[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{border:0}.material[_nghost-%COMP%]   .select2-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;top:calc(100% - 1.72917em);font-size:75%;color:#888;color:var(--select2-hint-text-color, #888)}  .select2-overlay-backdrop{background:rgba(0,0,0,.32);background:var(--select2-overlay-backdrop, transparent)}  .cdk-overlay-container .select2-container .select2-dropdown.select2-dropdown--above{bottom:28px}  .cdk-overlay-container .select2-container--open.select2-position-auto .select2-dropdown{margin-bottom:28px}  .cdk-overlay-container .select2-container--open.select2-position-auto .select2-dropdown.select2-dropdown--above{bottom:0;margin-bottom:0;margin-top:28px}@supports (-moz-appearance: none){select2.material[_ngcontent-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], select2.material[_ngcontent-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{height:26px}}@supports (-ms-scroll-limit: 0){select2.material[_ngcontent-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--single[_ngcontent-%COMP%], select2.material[_ngcontent-%COMP%]   .select2-container--default[_ngcontent-%COMP%]   .select2-selection--multiple[_ngcontent-%COMP%]{height:25px}}']
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select2, [{
    type: Component,
    args: [{
      selector: "select2",
      template: `<div class="select2-label" (click)="toggleOpenAndClose()">
    <ng-content select="select2-label"></ng-content>
    <span *ngIf="required" class="select2-required"></span>
</div>
<div
    class="select2 select2-container select2-container--default select2-container--focus"
    [class.select2-container--below]="!select2above"
    [class.select2-container--above]="select2above"
    [class.select2-container--open]="isOpen"
    [class.select2-container--disabled]="disabled"
>
    <div
        class="selection"
        #selection
        #trigger="cdkOverlayOrigin"
        [attr.tabindex]="!this.isOpen ? tabIndex : '-1'"
        (click)="toggleOpenAndClose()"
        (focus)="focusin()"
        (blur)="focusout()"
        (keydown)="openKey($event)"
        cdkOverlayOrigin
        [class.select2-focused]="focused"
    >
        <div
            class="select2-selection"
            [class.select2-selection--multiple]="multiple"
            [class.select2-selection--single]="!multiple"
            role="combobox"
        >
            <span *ngIf="!multiple" class="select2-selection__rendered" [title]="select2Option?.label || ''">
                <span *ngIf="!select2Option">&nbsp;</span>
                <span *ngIf="select2Option" [innerHTML]="select2Option.label"></span>
                <span [class.select2-selection__placeholder__option]="option" class="select2-selection__placeholder">{{
                    placeholder
                }}</span>
            </span>
            <span
                (click)="reset($event)"
                *ngIf="!multiple && resettable && select2Option && !(disabled || readonly)"
                class="select2-selection__reset"
                role="presentation"
                >×</span
            >
            <span *ngIf="!multiple" class="select2-selection__arrow" role="presentation"> </span>
            <ul *ngIf="multiple" class="select2-selection__rendered">
                <span
                    [class.select2-selection__placeholder__option]="select2Options?.length > 0"
                    class="select2-selection__placeholder"
                    >{{ placeholder }}</span
                >
                <li *ngFor="let op of option; trackBy: trackBy" class="select2-selection__choice" [title]="op.label">
                    <span
                        *ngIf="!(disabled || readonly)"
                        (click)="removeSelection($event, op)"
                        class="select2-selection__choice__remove"
                        role="presentation"
                        >×</span
                    >
                    <span [innerHTML]="op.label"></span>
                </li>
            </ul>
        </div>
    </div>
    <ng-container *ngIf="!overlay">
        <ng-container *ngTemplateOutlet="containerTemplate"></ng-container>
    </ng-container>

    <div class="select2-subscript-wrapper">
        <ng-content select="select2-hint"></ng-content>
    </div>
</div>

<ng-template
    cdkConnectedOverlay
    cdkConnectedOverlayHasBackdrop
    cdkConnectedOverlayBackdropClass="select2-overlay-backdrop"
    [cdkConnectedOverlayOrigin]="trigger"
    [cdkConnectedOverlayOpen]="this.isOpen && overlay"
    [cdkConnectedOverlayMinWidth]="overlayWidth"
    [cdkConnectedOverlayHeight]="overlayHeight"
    [cdkConnectedOverlayPositions]="_positions"
    (backdropClick)="toggleOpenAndClose()"
>
    <ng-container *ngTemplateOutlet="containerTemplate"></ng-container>
</ng-template>

<ng-template #containerTemplate>
    <div
        class="select2-container select2-container--default select2-container-dropdown"
        [class.select2-container--open]="isOpen"
        [class.select2-overlay]="overlay"
        [class.select2-position-auto]="listPosition === 'auto'"
    >
        <div
            #dropdown
            class="select2-dropdown"
            [class.select2-dropdown--below]="!select2above"
            [class.select2-dropdown--above]="select2above"
        >
            <div class="select2-search select2-search--dropdown" [class.select2-search--hide]="hideSearch()">
                <input
                    #searchInput
                    [id]="id + '-search-field'"
                    [value]="searchText"
                    (keydown)="keyDown($event)"
                    (keyup)="searchUpdate($event)"
                    (change)="prevChange($event)"
                    class="select2-search__field"
                    type="search"
                    role="textbox"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    [attr.tabindex]="this.isOpen ? tabIndex : '-1'"
                />
            </div>
            <div class="select2-results">
                <ul
                    #results
                    class="select2-results__options"
                    [style.max-height]="resultMaxHeight"
                    role="tree"
                    tabindex="-1"
                    infiniteScroll
                    [infiniteScrollDisabled]="!infiniteScroll && !isOpen"
                    [infiniteScrollDistance]="infiniteScrollDistance"
                    [infiniteScrollThrottle]="infiniteScrollThrottle"
                    [infiniteScrollContainer]="results"
                    (scrolled)="onScroll('down')"
                    (scrolledUp)="onScroll('up')"
                    (keydown)="keyDown($event)"
                >
                    <ng-container *ngFor="let groupOrOption of filteredData; index as i; trackBy: trackBy">
                        <li *ngIf="groupOrOption.options" class="select2-results__option" role="group">
                            <strong
                                *ngIf="!hasTemplate(groupOrOption, 'group'); else optGroup"
                                [attr.class]="
                                    'select2-results__group' +
                                    (groupOrOption.classes ? ' ' + groupOrOption.classes : '')
                                "
                                [innerHTML]="groupOrOption.label"
                            ></strong>
                            <ng-template #optGroup>
                                <ng-container
                                    *ngTemplateOutlet="getTemplate(groupOrOption, 'group'); context: groupOrOption"
                                >
                                </ng-container>
                            </ng-template>

                            <ul class="select2-results__options select2-results__options--nested">
                                <li
                                    *ngFor="let option of groupOrOption.options; index as j; trackBy: trackBy"
                                    #result
                                    [id]="option.id || id + '-option-' + i + '-' + j"
                                    [class]="getOptionStyle(option)"
                                    role="treeitem"
                                    [attr.aria-selected]="isSelected(option)"
                                    [attr.aria-disabled]="isDisabled(option)"
                                    (mouseenter)="mouseenter(option)"
                                    (click)="click(option)"
                                >
                                    <div
                                        *ngIf="!hasTemplate(option, 'option'); else liGroup"
                                        class="select2-label-content"
                                        [innerHTML]="option.label"
                                    ></div>
                                    <ng-template #liGroup>
                                        <ng-container
                                            *ngTemplateOutlet="getTemplate(option, 'option'); context: option"
                                        >
                                        </ng-container>
                                    </ng-template>
                                </li>
                            </ul>
                        </li>
                        <li
                            *ngIf="!groupOrOption.options"
                            #result
                            [id]="groupOrOption.id || id + '-option-' + i"
                            [class]="getOptionStyle(groupOrOption)"
                            role="treeitem"
                            [attr.aria-selected]="isSelected(groupOrOption)"
                            [attr.aria-disabled]="isDisabled(groupOrOption)"
                            (mouseenter)="mouseenter(groupOrOption)"
                            (click)="click(groupOrOption)"
                        >
                            <div
                                *ngIf="!hasTemplate(groupOrOption, 'option'); else li"
                                [innerHTML]="groupOrOption.label"
                                class="select2-label-content"
                            ></div>
                            <ng-template #li>
                                <ng-container
                                    *ngTemplateOutlet="getTemplate(groupOrOption, 'option'); context: groupOrOption"
                                >
                                </ng-container>
                            </ng-template>
                        </li>
                    </ng-container>
                    <li
                        class="select2-no-result select2-results__option"
                        *ngIf="!filteredData?.length && noResultMessage"
                        [innerHTML]="noResultMessage"
                    ></li>
                    <li
                        class="select2-too-much-result select2-results__option"
                        *ngIf="maxResultsExceeded"
                        [innerHTML]="maxResultsMessage"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</ng-template>
`,
      styles: ['.select2-label{color:#000;color:var(--select2-label-text-color, #000)}.select2-container{box-sizing:border-box;display:inline-block;margin:0;position:relative;vertical-align:middle;width:100%}.select2-container .select2-container-dropdown{position:absolute;width:0px;opacity:0}.select2-container .select2-selection--single{box-sizing:border-box;cursor:pointer;display:block;height:28px;-webkit-user-select:none;user-select:none}.select2-container .select2-selection--single .select2-selection__rendered{display:block;padding:0 0 0 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto}.select2-container .select2-selection--single .select2-selection__clear{position:relative}.select2-container .select2-selection--multiple{box-sizing:border-box;cursor:pointer;display:block;min-height:32px;-webkit-user-select:none;user-select:none}.select2-container .select2-selection--multiple .select2-selection__rendered{display:inline-block;overflow:hidden;padding-left:8px;text-overflow:ellipsis;white-space:nowrap}.select2-container .select2-search--inline{float:left}.select2-container .select2-search--inline .select2-search__field{box-sizing:border-box;border:none;font-size:100%;margin-top:5px;padding:0}.select2-container .select2-search--inline .select2-search__field::-webkit-search-cancel-button{-webkit-appearance:none}.select2-dropdown{background:white;background:var(--select2-dropdown-background, white);border:1px solid #aaa;border:1px solid var(--select2-dropdown-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);box-sizing:border-box;display:block;position:absolute;width:100%;z-index:1051;height:0;overflow:hidden}.select2-dropdown .select2-label-content{display:contents}.select2-results{display:block}.select2-results__options{list-style:none;margin:0;padding:0}.select2-results__option{padding:6px;-webkit-user-select:none;user-select:none;color:#000;color:var(--select2-option-text-color, #000)}.select2-results__option[aria-selected]{cursor:pointer}.select2-container.select2-container-dropdown.select2-container--open{width:100%;opacity:1}.select2-container--open .select2-dropdown{overflow:auto;height:auto}.select2-container--open .select2-dropdown--above{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0;bottom:27px;display:flex;flex-direction:column-reverse}.select2-container--open .select2-dropdown--below{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.select2-search--dropdown{display:block;padding:4px}.select2-search--dropdown .select2-search__field{padding:4px;width:100%;box-sizing:border-box}.select2-search--dropdown .select2-search__field::-webkit-search-cancel-button{-webkit-appearance:none}.select2-search--dropdown.select2-search--hide{display:none}.select2-close-mask{border:0;margin:0;padding:0;display:block;position:fixed;left:0;top:0;min-height:100%;min-width:100%;height:auto;width:auto;opacity:0;z-index:99;background:#fff;filter:alpha(opacity=0)}.select2-required:before{content:"*";color:red;color:var(--select2-required-color, red)}.select2-hidden-accessible{border:0!important;clip:rect(0 0 0 0)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;width:1px!important}.select2-container--default .select2-selection--single{background:#fff;background:var(--select2-selection-background, #fff);border:1px solid #aaa;border:1px solid var(--select2-selection-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);display:flex}.select2-container--default .select2-selection--single .select2-selection__rendered{color:#444;color:var(--select2-selection-text-color, #444);line-height:28px}.select2-container--default .select2-selection--single .select2-selection__clear{cursor:pointer;float:right;font-weight:700}.select2-container--default .select2-selection--single .select2-selection__placeholder{color:#999;color:var(--select2-placeholder-color, #999)}.select2-container--default .select2-selection--single .select2-selection__placeholder span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-overflow:var(--select2-placeholder-overflow, ellipsis)}.select2-container--default .select2-selection--single .select2-selection__placeholder__option{display:none}.select2-container--default .select2-selection--single .select2-selection__reset,.select2-container--default .select2-selection--single .select2-selection__arrow{display:flex;width:20px;align-items:center;justify-content:center}.select2-container--default .select2-selection--single .select2-selection__arrow:before{content:" ";border-color:#888 transparent;border-color:var(--select2-arrow-color, #888) transparent;border-style:solid;border-width:5px 4px 0;height:0;width:0}.select2-container--default .select2-selection--single .select2-selection__reset{color:#999;color:var(--select2-reset-color, #999)}.select2-container--default.select2-container--disabled .select2-selection--single{background:#eee;background:var(--select2-selection-disabled-background, #eee);cursor:default}.select2-container--default.select2-container--disabled .select2-selection--single .select2-selection__clear{display:none}.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow:before{border-color:transparent transparent #888;border-color:transparent transparent var(--select2-arrow-color, #888);border-width:0 4px 5px}.select2-container--default .select2-selection--multiple{background:#fff;background:var(--select2-selection-background, #fff);border:1px solid #aaa;border:1px solid var(--select2-selection-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);cursor:text}.select2-container--default .select2-selection--multiple .select2-selection__rendered{flex:1 1 auto;box-sizing:border-box;list-style:none;margin:0;padding:0 5px;width:100%}.select2-container--default .select2-selection--multiple .select2-selection__rendered li{list-style:none}.select2-container--default .select2-selection--multiple .select2-selection__placeholder{display:block;width:100%;color:#999;color:var(--select2-placeholder-color, #999);margin-top:5px;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-overflow:var(--select2-placeholder-overflow, ellipsis)}.select2-container--default .select2-selection--multiple .select2-selection__placeholder__option{display:none}.select2-container--default .select2-selection--multiple .select2-selection__clear{cursor:pointer;float:right;font-weight:700;margin-top:5px;margin-right:10px}.select2-container--default .select2-selection--multiple .select2-selection__choice{color:#000;color:var(--select2-selection-choice-text-color, #000);background:#e4e4e4;background:var(--select2-selection-choice-background, #e4e4e4);border:1px solid #aaa;border:1px solid var(--select2-selection-choice-border-color, #aaa);border-radius:4px;border-radius:var(--select2-selection-border-radius, 4px);cursor:default;float:left;margin-right:5px;margin-top:5px;padding:0 5px}.select2-container--default .select2-selection--multiple .select2-selection__choice__remove{color:#999;color:var(--select2-selection-choice-close-color, #999);cursor:pointer;display:inline-block;font-weight:700;margin-right:2px}.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover{color:#333;color:var(--select2-selection-choice-hover-close-color, #333)}.select2-container--default.select2-container--focused .select2-selection--multiple{border:solid #000 1px;border:solid var(--select2-selection-focus-border-color, #000) 1px;outline:none}.select2-container--default:not(.select2-container--open) .select2-focused .select2-selection--single,.select2-container--default:not(.select2-container--open) .select2-focused .select2-selection--multiple{border:solid #000 1px;border:solid var(--select2-selection-focus-border-color, #000) 1px;outline:none}.select2-container--default.select2-container--disabled .select2-selection--multiple{background:#eee;background:var(--select2-selection-disabled-background, #eee);cursor:default}.select2-container--default.select2-container--disabled .select2-selection__choice__remove{display:none}.select2-container--default.select2-container--open.select2-container--above .select2-selection--single,.select2-container--default.select2-container--open.select2-container--above .select2-selection--multiple{border-top-left-radius:0;border-top-right-radius:0}.select2-container--default.select2-container--open.select2-container--below .select2-selection--single,.select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple{border-bottom-left-radius:0;border-bottom-right-radius:0}.select2-container--default .select2-search--dropdown .select2-search__field{border:1px solid #aaa;border:1px solid var(--select2-search-border-color, #aaa);background:#fff;background:1px solid var(--select2-search-background, #fff);border-radius:0;border-radius:var(--select2-search-border-radius, 0px)}.select2-container--default .select2-search--inline .select2-search__field{background:transparent;border:none;outline:none;box-shadow:none;-webkit-appearance:textfield}.select2-container--default .select2-results>.select2-results__options{overflow-y:auto}.select2-container--default .select2-results__option[role=group]{padding:0}.select2-container--default .select2-results__option[aria-disabled=true]{color:#999;color:var(--select2-option-disabled-text-color, #999);background:transparent;background:var(--select2-option-disabled-background, transparent)}.select2-container--default .select2-results__option[aria-selected=true]{color:#000;color:var(--select2-option-selected-text-color, #000);background:#ddd;background:var(--select2-option-selected-background, #ddd)}.select2-container--default .select2-results__option .select2-results__option{padding-left:1em}.select2-container--default .select2-results__option .select2-results__option .select2-results__group{padding-left:0}.select2-container--default .select2-results__option .select2-results__option .select2-results__option{margin-left:-1em;padding-left:2em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-2em;padding-left:3em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-3em;padding-left:4em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-4em;padding-left:5em}.select2-container--default .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option .select2-results__option{margin-left:-5em;padding-left:6em}.select2-container--default .select2-results__option--highlighted[aria-selected]{background:#5897fb;background:var(--select2-option-highlighted-background, #5897fb);color:#fff;color:var(--select2-option-highlighted-text-color, #fff)}.select2-container--default .select2-results__option--hide{display:none}.select2-container--default .select2-results__group{cursor:default;display:block;padding:6px;color:gray;color:var(--select2-option-group-text-color, gray);background:transparent;background:var(--select2-option-group-background, transparent)}.select2-no-result{color:#888;color:var(--select2-no-result-color, #888);font-style:italic;font-style:var(--select2-no-result-font-style, italic)}.select2-too-much-result{color:#888;color:var(--select2-too-much-result-color, #888);font-style:italic;font-style:var(--select2-too-much-font-style, italic)}:host.nostyle .select2-dropdown{border-color:transparent}:host.nostyle .select2-selection--single,:host.nostyle .select2-selection--multiple{background:transparent;border-color:transparent}:host.nostyle .select2-container--default .select2-focused .select2-selection--single,:host.nostyle .select2-container--default .select2-focused .select2-selection--multiple,:host.nostyle .select2-container--default:not(.select2-container--open) .select2-focused .select2-selection--single,:host.nostyle .select2-container--default:not(.select2-container--open) .select2-focused .select2-selection--multiple{background:transparent;border-color:transparent}:host.material{display:inline-block;width:300px}:host.material>.select2-container{padding-bottom:1.29688em;vertical-align:inherit}:host.material>.select2-container .selection{padding:.4375em 0;border-top:.84375em solid transparent;display:inline-flex;align-items:baseline;width:100%;height:auto}:host.material .select2-container--default .select2-selection--single,:host.material .select2-container--default .select2-selection--multiple{width:100%;border:0;border-radius:0;height:24px;box-sizing:border-box}:host.material .select2-container--default .select2-selection--single:before,:host.material .select2-container--default .select2-selection--multiple:before{content:" ";display:block;position:absolute;bottom:1.65em;background:#ddd;background:var(--select2-material-underline, #ddd);height:1px;width:100%}:host.material .select2-container--default .select2-selection--single:after,:host.material .select2-container--default .select2-selection--multiple:after{content:" ";display:block;position:absolute;bottom:1.63em;background:#5a419e;background:var(--select2-material-underline-active, #5a419e);height:2px;width:0%;left:50%;transition:none}:host.material .select2-container--default .select2-selection--single .select2-selection__rendered,:host.material .select2-container--default .select2-selection--multiple .select2-selection__rendered{padding-left:1px;line-height:inherit}:host.material .select2-container--default .select2-selection--single .select2-selection__placeholder,:host.material .select2-container--default .select2-selection--multiple .select2-selection__placeholder{display:block;color:#00000061;color:var(--select2-material-placeholder-color, rgba(0, 0, 0, .38));transition:transform .3s;position:absolute;transform-origin:0 21px;left:0;top:20px}:host.material .select2-container--default .select2-container--open{left:0;bottom:1.6em}:host.material .select2-container--default .select2-selection__placeholder__option{transform:translateY(-1.5em) scale(.75) perspective(100px) translateZ(.001px);width:133.33333%}:host.material .select2-container--default .select2-selection__arrow{top:20px}:host.material .select2-container--default.select2-container--open .select2-selection--single:after,:host.material .select2-container--default.select2-container--open .select2-selection--multiple:after,:host.material .select2-container--default .select2-focused .select2-selection--single:after,:host.material .select2-container--default .select2-focused .select2-selection--multiple:after{transition:width .3s cubic-bezier(.12,1,.77,1),left .3s cubic-bezier(.12,1,.77,1);width:100%;left:0%}:host.material .select2-container--default .select2-dropdown{border-radius:0;border:0;box-shadow:0 5px 5px #00000080}:host.material .select2-container--default .select2-results__option[aria-selected=true],:host.material .select2-container--default .select2-results__option--highlighted[aria-selected]{background:rgba(0,0,0,.04);background:var(--select2-material-option-selected-background, rgba(0, 0, 0, .04));color:#000;color:var(--select2-material-option-highlighted-text-color, #000)}:host.material .select2-container--default .select2-results__option[aria-selected=true]{color:#ff5722;color:var(--select2-material-option-selected-text-color, #ff5722)}:host.material .select2-container--default.select2-container--disabled .select2-selection--single,:host.material .select2-container--default.select2-container--disabled .select2-selection--multiple{background:transparent}:host.material .select2-container--default.select2-container--disabled .select2-selection--single:before,:host.material .select2-container--default.select2-container--disabled .select2-selection--multiple:before{background:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background:var(--select2-material-underline-disabled, linear-gradient(to right, rgba(0, 0, 0, .26) 0, rgba(0, 0, 0, .26) 33%, transparent 0));background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom}:host.material.ng-invalid.ng-touched .select2-container--default .select2-selection--single:before,:host.material.ng-invalid.ng-touched .select2-container--default .select2-selection--single:after,:host.material.ng-invalid.ng-touched .select2-container--default .select2-selection--multiple:before,:host.material.ng-invalid.ng-touched .select2-container--default .select2-selection--multiple:after{background:red;background:var(--select2-material-underline-invalid, red)}:host.material:not(.select2-container--open) .select2-focused .select2-selection--single,:host.material:not(.select2-container--open) .select2-focused .select2-selection--multiple{border:0}:host.material .select2-subscript-wrapper{position:absolute;top:calc(100% - 1.72917em);font-size:75%;color:#888;color:var(--select2-hint-text-color, #888)}::ng-deep .select2-overlay-backdrop{background:rgba(0,0,0,.32);background:var(--select2-overlay-backdrop, transparent)}::ng-deep .cdk-overlay-container .select2-container .select2-dropdown.select2-dropdown--above{bottom:28px}::ng-deep .cdk-overlay-container .select2-container--open.select2-position-auto .select2-dropdown{margin-bottom:28px}::ng-deep .cdk-overlay-container .select2-container--open.select2-position-auto .select2-dropdown.select2-dropdown--above{bottom:0;margin-bottom:0;margin-top:28px}@supports (-moz-appearance: none){select2.material .select2-container--default .select2-selection--single,select2.material .select2-container--default .select2-selection--multiple{height:26px}}@supports (-ms-scroll-limit: 0){select2.material .select2-container--default .select2-selection--single,select2.material .select2-container--default .select2-selection--multiple{height:25px}}\n']
    }]
  }], function() {
    return [{
      type: ViewportRuler
    }, {
      type: ChangeDetectorRef
    }, {
      type: NgForm,
      decorators: [{
        type: Optional
      }]
    }, {
      type: FormGroupDirective,
      decorators: [{
        type: Optional
      }]
    }, {
      type: NgControl,
      decorators: [{
        type: Self
      }, {
        type: Optional
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Attribute,
        args: ["tabindex"]
      }]
    }];
  }, {
    data: [{
      type: Input
    }],
    minCharForSearch: [{
      type: Input
    }],
    displaySearchStatus: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    customSearchEnabled: [{
      type: Input
    }],
    limitSelection: [{
      type: Input
    }],
    listPosition: [{
      type: Input
    }],
    multiple: [{
      type: Input
    }],
    overlay: [{
      type: Input
    }],
    styleMode: [{
      type: Input
    }],
    noResultMessage: [{
      type: Input
    }],
    maxResults: [{
      type: Input
    }],
    maxResultsMessage: [{
      type: Input
    }],
    infiniteScrollDistance: [{
      type: Input
    }],
    infiniteScrollThrottle: [{
      type: Input
    }],
    infiniteScroll: [{
      type: Input
    }],
    editPattern: [{
      type: Input
    }],
    templates: [{
      type: Input
    }],
    resultMaxHeight: [{
      type: Input
    }],
    update: [{
      type: Output
    }],
    open: [{
      type: Output
    }],
    close: [{
      type: Output
    }],
    focus: [{
      type: Output
    }],
    blur: [{
      type: Output
    }],
    search: [{
      type: Output
    }],
    scroll: [{
      type: Output
    }],
    removeOption: [{
      type: Output
    }],
    minCountForSearch: [{
      type: Input
    }],
    id: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["id"]
    }],
    required: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    hideSelectedItems: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    resettable: [{
      type: Input
    }],
    ariaInvalid: [{
      type: HostBinding,
      args: ["attr.aria-invalid"]
    }],
    classMaterial: [{
      type: HostBinding,
      args: ["class.material"]
    }],
    classNostyle: [{
      type: HostBinding,
      args: ["class.nostyle"]
    }],
    select2above: [{
      type: HostBinding,
      args: ["class.select2-above"]
    }],
    cdkConnectedOverlay: [{
      type: ViewChild,
      args: [CdkConnectedOverlay]
    }],
    selection: [{
      type: ViewChild,
      args: ["selection", {
        static: true
      }]
    }],
    resultContainer: [{
      type: ViewChild,
      args: ["results"]
    }],
    results: [{
      type: ViewChildren,
      args: ["result"]
    }],
    searchInput: [{
      type: ViewChild,
      args: ["searchInput"]
    }],
    dropdown: [{
      type: ViewChild,
      args: ["dropdown"]
    }]
  });
})();
var Select2Hint = class {
};
Select2Hint.ɵfac = function Select2Hint_Factory(t) {
  return new (t || Select2Hint)();
};
Select2Hint.ɵdir = ɵɵdefineDirective({
  type: Select2Hint,
  selectors: [["select2-hint"]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select2Hint, [{
    type: Directive,
    args: [{
      selector: "select2-hint"
    }]
  }], null, null);
})();
var Select2Label = class {
};
Select2Label.ɵfac = function Select2Label_Factory(t) {
  return new (t || Select2Label)();
};
Select2Label.ɵdir = ɵɵdefineDirective({
  type: Select2Label,
  selectors: [["select2-label"]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select2Label, [{
    type: Directive,
    args: [{
      selector: "select2-label"
    }]
  }], null, null);
})();
var Select2Module = class {
};
Select2Module.ɵfac = function Select2Module_Factory(t) {
  return new (t || Select2Module)();
};
Select2Module.ɵmod = ɵɵdefineNgModule({
  type: Select2Module,
  declarations: [Select2Hint, Select2Label, Select2],
  imports: [CommonModule, FormsModule, OverlayModule, ReactiveFormsModule, InfiniteScrollModule],
  exports: [FormsModule, ReactiveFormsModule, Select2Hint, Select2Label, Select2]
});
Select2Module.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, FormsModule, OverlayModule, ReactiveFormsModule, InfiniteScrollModule, FormsModule, ReactiveFormsModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select2Module, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule, OverlayModule, ReactiveFormsModule, InfiniteScrollModule],
      declarations: [Select2Hint, Select2Label, Select2],
      exports: [FormsModule, ReactiveFormsModule, Select2Hint, Select2Label, Select2]
    }]
  }], null, null);
})();
export {
  Select2,
  Select2Hint,
  Select2Label,
  Select2Module,
  Select2Utils,
  defaultMinCountForSearch,
  protectRegexp,
  timeout,
  unicodePatterns
};
//# sourceMappingURL=ng-select2-component.js.map
