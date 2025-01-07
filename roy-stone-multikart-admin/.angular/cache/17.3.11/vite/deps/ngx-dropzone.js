import {
  DomSanitizer
} from "./chunk-FNX6IRXA.js";
import "./chunk-5SZJE72U.js";
import {
  CommonModule,
  NgIf
} from "./chunk-GY65V5CF.js";
import {
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  InputFlags,
  NgModule,
  Output,
  Self,
  ViewChild,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-LVVQT43K.js";
import "./chunk-INSCHJF3.js";
import "./chunk-6FQGPHO4.js";
import "./chunk-LVRZVOCT.js";
import "./chunk-W44PFRPX.js";
import {
  __async
} from "./chunk-ASLTLD6L.js";

// node_modules/ngx-dropzone/fesm2020/ngx-dropzone.mjs
var _c0 = [[["ngx-dropzone-label"]]];
var _c1 = ["ngx-dropzone-label"];
function NgxDropzonePreviewComponent_ngx_dropzone_remove_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-dropzone-remove-badge", 1);
    ɵɵlistener("click", function NgxDropzonePreviewComponent_ngx_dropzone_remove_badge_1_Template_ngx_dropzone_remove_badge_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._remove($event));
    });
    ɵɵelementEnd();
  }
}
var _c2 = ["fileInput"];
var _c3 = [[["ngx-dropzone-preview"]], "*", [["ngx-dropzone-label"]]];
var _c4 = ["ngx-dropzone-preview", "*", "ngx-dropzone-label"];
function NgxDropzoneComponent_ng_content_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2, ["*ngIf", "!_hasPreviews"]);
  }
}
function NgxDropzoneImagePreviewComponent_ngx_dropzone_remove_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-dropzone-remove-badge", 2);
    ɵɵlistener("click", function NgxDropzoneImagePreviewComponent_ngx_dropzone_remove_badge_2_Template_ngx_dropzone_remove_badge_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._remove($event));
    });
    ɵɵelementEnd();
  }
}
function NgxDropzoneVideoPreviewComponent_video_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "video", 2);
    ɵɵlistener("click", function NgxDropzoneVideoPreviewComponent_video_0_Template_video_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelement(1, "source", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("src", ctx_r1.sanitizedVideoSrc, ɵɵsanitizeUrl);
  }
}
function NgxDropzoneVideoPreviewComponent_ngx_dropzone_remove_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-dropzone-remove-badge", 4);
    ɵɵlistener("click", function NgxDropzoneVideoPreviewComponent_ngx_dropzone_remove_badge_2_Template_ngx_dropzone_remove_badge_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._remove($event));
    });
    ɵɵelementEnd();
  }
}
var NgxDropzoneLabelDirective = class {
};
NgxDropzoneLabelDirective.ɵfac = function NgxDropzoneLabelDirective_Factory(t) {
  return new (t || NgxDropzoneLabelDirective)();
};
NgxDropzoneLabelDirective.ɵdir = ɵɵdefineDirective({
  type: NgxDropzoneLabelDirective,
  selectors: [["ngx-dropzone-label"]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneLabelDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-dropzone-label"
    }]
  }], null, null);
})();
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}
function coerceNumberProperty(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value)) ? Number(value) : null;
}
var NgxDropzoneRemoveBadgeComponent = class {
};
NgxDropzoneRemoveBadgeComponent.ɵfac = function NgxDropzoneRemoveBadgeComponent_Factory(t) {
  return new (t || NgxDropzoneRemoveBadgeComponent)();
};
NgxDropzoneRemoveBadgeComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxDropzoneRemoveBadgeComponent,
  selectors: [["ngx-dropzone-remove-badge"]],
  decls: 3,
  vars: 0,
  consts: [["x1", "0", "y1", "0", "x2", "10", "y2", "10"], ["x1", "0", "y1", "10", "x2", "10", "y2", "0"]],
  template: function NgxDropzoneRemoveBadgeComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵnamespaceSVG();
      ɵɵelementStart(0, "svg");
      ɵɵelement(1, "line", 0)(2, "line", 1);
      ɵɵelementEnd();
    }
  },
  styles: ["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}[_nghost-%COMP%]:hover{background:#aeaeae}[_nghost-%COMP%] > svg[_ngcontent-%COMP%]{height:10px;width:10px}[_nghost-%COMP%] > svg[_ngcontent-%COMP%] > line[_ngcontent-%COMP%]{stroke-width:2px;stroke:#fff}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneRemoveBadgeComponent, [{
    type: Component,
    args: [{
      selector: "ngx-dropzone-remove-badge",
      template: `
    <svg>
      <line x1="0" y1="0" x2="10" y2="10" />
      <line x1="0" y1="10" x2="10" y2="0" />
    </svg>
  `,
      styles: [":host{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}:host:hover{background:#aeaeae}:host>svg{height:10px;width:10px}:host>svg>line{stroke-width:2px;stroke:#fff}\n"]
    }]
  }], null, null);
})();
var KEY_CODE;
(function(KEY_CODE2) {
  KEY_CODE2[KEY_CODE2["BACKSPACE"] = 8] = "BACKSPACE";
  KEY_CODE2[KEY_CODE2["DELETE"] = 46] = "DELETE";
})(KEY_CODE || (KEY_CODE = {}));
var NgxDropzonePreviewComponent = class {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
    this._removable = false;
    this.removed = new EventEmitter();
    this.tabIndex = 0;
  }
  /** The file to preview. */
  set file(value) {
    this._file = value;
  }
  get file() {
    return this._file;
  }
  /** Allow the user to remove files. */
  get removable() {
    return this._removable;
  }
  set removable(value) {
    this._removable = coerceBooleanProperty(value);
  }
  keyEvent(event) {
    switch (event.keyCode) {
      case KEY_CODE.BACKSPACE:
      case KEY_CODE.DELETE:
        this.remove();
        break;
      default:
        break;
    }
  }
  /** We use the HostBinding to pass these common styles to child components. */
  get hostStyle() {
    const styles = `
			display: flex;
			height: 140px;
			min-height: 140px;
			min-width: 180px;
			max-width: 180px;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
			margin: 10px;
			border-radius: 5px;
			position: relative;
		`;
    return this.sanitizer.bypassSecurityTrustStyle(styles);
  }
  /** Remove method to be used from the template. */
  _remove(event) {
    event.stopPropagation();
    this.remove();
  }
  /** Remove the preview item (use from component code). */
  remove() {
    if (this._removable) {
      this.removed.next(this.file);
    }
  }
  readFile() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          console.error(`FileReader failed on file ${this.file.name}.`);
          reject(e);
        };
        if (!this.file) {
          return reject("No file to read. Please provide a file using the [file] Input property.");
        }
        reader.readAsDataURL(this.file);
      });
    });
  }
};
NgxDropzonePreviewComponent.ɵfac = function NgxDropzonePreviewComponent_Factory(t) {
  return new (t || NgxDropzonePreviewComponent)(ɵɵdirectiveInject(DomSanitizer));
};
NgxDropzonePreviewComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxDropzonePreviewComponent,
  selectors: [["ngx-dropzone-preview"]],
  hostVars: 3,
  hostBindings: function NgxDropzonePreviewComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keyup", function NgxDropzonePreviewComponent_keyup_HostBindingHandler($event) {
        return ctx.keyEvent($event);
      });
    }
    if (rf & 2) {
      ɵɵhostProperty("tabindex", ctx.tabIndex);
      ɵɵstyleMap(ctx.hostStyle);
    }
  },
  inputs: {
    file: "file",
    removable: "removable"
  },
  outputs: {
    removed: "removed"
  },
  ngContentSelectors: _c1,
  decls: 2,
  vars: 1,
  consts: [[3, "click", 4, "ngIf"], [3, "click"]],
  template: function NgxDropzonePreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵprojection(0);
      ɵɵtemplate(1, NgxDropzonePreviewComponent_ngx_dropzone_remove_badge_1_Template, 1, 0, "ngx-dropzone-remove-badge", 0);
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.removable);
    }
  },
  dependencies: [NgxDropzoneRemoveBadgeComponent, NgIf],
  styles: ["[_nghost-%COMP%]{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}[_nghost-%COMP%]:hover, [_nghost-%COMP%]:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}[_nghost-%COMP%]:hover   ngx-dropzone-remove-badge[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:1}[_nghost-%COMP%]   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:0}[_nghost-%COMP%]     ngx-dropzone-label{overflow-wrap:break-word}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzonePreviewComponent, [{
    type: Component,
    args: [{
      selector: "ngx-dropzone-preview",
      template: `
		<ng-content select="ngx-dropzone-label"></ng-content>
		<ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
		</ngx-dropzone-remove-badge>
	`,
      styles: [":host{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host:hover,:host:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host ::ng-deep ngx-dropzone-label{overflow-wrap:break-word}\n"]
    }]
  }], function() {
    return [{
      type: DomSanitizer
    }];
  }, {
    file: [{
      type: Input
    }],
    removable: [{
      type: Input
    }],
    removed: [{
      type: Output
    }],
    keyEvent: [{
      type: HostListener,
      args: ["keyup", ["$event"]]
    }],
    hostStyle: [{
      type: HostBinding,
      args: ["style"]
    }],
    tabIndex: [{
      type: HostBinding,
      args: ["tabindex"]
    }]
  });
})();
var NgxDropzoneService = class {
  parseFileList(files, accept, maxFileSize, multiple) {
    const addedFiles = [];
    const rejectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!this.isAccepted(file, accept)) {
        this.rejectFile(rejectedFiles, file, "type");
        continue;
      }
      if (maxFileSize && file.size > maxFileSize) {
        this.rejectFile(rejectedFiles, file, "size");
        continue;
      }
      if (!multiple && addedFiles.length >= 1) {
        this.rejectFile(rejectedFiles, file, "no_multiple");
        continue;
      }
      addedFiles.push(file);
    }
    const result = {
      addedFiles,
      rejectedFiles
    };
    return result;
  }
  isAccepted(file, accept) {
    if (accept === "*") {
      return true;
    }
    const acceptFiletypes = accept.split(",").map((it) => it.toLowerCase().trim());
    const filetype = file.type.toLowerCase();
    const filename = file.name.toLowerCase();
    const matchedFileType = acceptFiletypes.find((acceptFiletype) => {
      if (acceptFiletype.endsWith("/*")) {
        return filetype.split("/")[0] === acceptFiletype.split("/")[0];
      }
      if (acceptFiletype.startsWith(".")) {
        return filename.endsWith(acceptFiletype);
      }
      return acceptFiletype == filetype;
    });
    return !!matchedFileType;
  }
  rejectFile(rejectedFiles, file, reason) {
    const rejectedFile = file;
    rejectedFile.reason = reason;
    rejectedFiles.push(rejectedFile);
  }
};
NgxDropzoneService.ɵfac = function NgxDropzoneService_Factory(t) {
  return new (t || NgxDropzoneService)();
};
NgxDropzoneService.ɵprov = ɵɵdefineInjectable({
  token: NgxDropzoneService,
  factory: NgxDropzoneService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneService, [{
    type: Injectable
  }], null, null);
})();
var NgxDropzoneComponent = class {
  constructor(service) {
    this.service = service;
    this.change = new EventEmitter();
    this.accept = "*";
    this._disabled = false;
    this._multiple = true;
    this._maxFileSize = void 0;
    this._expandable = false;
    this._disableClick = false;
    this._processDirectoryDrop = false;
    this._isHovered = false;
  }
  get _hasPreviews() {
    return !!this._previewChildren.length;
  }
  /** Disable any user interaction with the component. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    if (this._isHovered) {
      this._isHovered = false;
    }
  }
  /** Allow the selection of multiple files. */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = coerceBooleanProperty(value);
  }
  /** Set the maximum size a single file may have. */
  get maxFileSize() {
    return this._maxFileSize;
  }
  set maxFileSize(value) {
    this._maxFileSize = coerceNumberProperty(value);
  }
  /** Allow the dropzone container to expand vertically. */
  get expandable() {
    return this._expandable;
  }
  set expandable(value) {
    this._expandable = coerceBooleanProperty(value);
  }
  /** Open the file selector on click. */
  get disableClick() {
    return this._disableClick;
  }
  set disableClick(value) {
    this._disableClick = coerceBooleanProperty(value);
  }
  /** Allow dropping directories. */
  get processDirectoryDrop() {
    return this._processDirectoryDrop;
  }
  set processDirectoryDrop(value) {
    this._processDirectoryDrop = coerceBooleanProperty(value);
  }
  /** Show the native OS file explorer to select files. */
  _onClick() {
    if (!this.disableClick) {
      this.showFileSelector();
    }
  }
  _onDragOver(event) {
    if (this.disabled) {
      return;
    }
    this.preventDefault(event);
    this._isHovered = true;
  }
  _onDragLeave() {
    this._isHovered = false;
  }
  _onDrop(event) {
    if (this.disabled) {
      return;
    }
    this.preventDefault(event);
    this._isHovered = false;
    if (!this.processDirectoryDrop || !DataTransferItem.prototype.webkitGetAsEntry) {
      this.handleFileDrop(event.dataTransfer.files);
    } else {
      const droppedItems = event.dataTransfer.items;
      if (droppedItems.length > 0) {
        const droppedFiles = [];
        const droppedDirectories = [];
        for (let i = 0; i < droppedItems.length; i++) {
          const entry = droppedItems[i].webkitGetAsEntry();
          if (entry.isFile) {
            droppedFiles.push(event.dataTransfer.files[i]);
          } else if (entry.isDirectory) {
            droppedDirectories.push(entry);
          }
        }
        const droppedFilesList = new DataTransfer();
        droppedFiles.forEach((droppedFile) => {
          droppedFilesList.items.add(droppedFile);
        });
        if (!droppedDirectories.length && droppedFilesList.items.length) {
          this.handleFileDrop(droppedFilesList.files);
        }
        if (droppedDirectories.length) {
          const extractFilesFromDirectoryCalls = [];
          for (const droppedDirectory of droppedDirectories) {
            extractFilesFromDirectoryCalls.push(this.extractFilesFromDirectory(droppedDirectory));
          }
          Promise.all(extractFilesFromDirectoryCalls).then((allExtractedFiles) => {
            allExtractedFiles.reduce((a, b) => [...a, ...b]).forEach((extractedFile) => {
              droppedFilesList.items.add(extractedFile);
            });
            this.handleFileDrop(droppedFilesList.files);
          });
        }
      }
    }
  }
  extractFilesFromDirectory(directory) {
    function getFileFromFileEntry(fileEntry) {
      return __async(this, null, function* () {
        try {
          return yield new Promise((resolve, reject) => fileEntry.file(resolve, reject));
        } catch (err) {
          console.log("Error converting a fileEntry to a File: ", err);
        }
      });
    }
    return new Promise((resolve, reject) => {
      const files = [];
      const dirReader = directory.createReader();
      const readEntries = () => {
        dirReader.readEntries((dirItems) => __async(this, null, function* () {
          if (!dirItems.length) {
            resolve(files);
          } else {
            const fileEntries = dirItems.filter((dirItem) => dirItem.isFile);
            for (const fileEntry of fileEntries) {
              const file = yield getFileFromFileEntry(fileEntry);
              files.push(file);
            }
            readEntries();
          }
        }));
      };
      readEntries();
    });
  }
  showFileSelector() {
    if (!this.disabled) {
      this._fileInput.nativeElement.click();
    }
  }
  _onFilesSelected(event) {
    const files = event.target.files;
    this.handleFileDrop(files);
    this._fileInput.nativeElement.value = "";
    this.preventDefault(event);
  }
  handleFileDrop(files) {
    const result = this.service.parseFileList(files, this.accept, this.maxFileSize, this.multiple);
    this.change.next({
      addedFiles: result.addedFiles,
      rejectedFiles: result.rejectedFiles,
      source: this
    });
  }
  preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  }
};
NgxDropzoneComponent.ɵfac = function NgxDropzoneComponent_Factory(t) {
  return new (t || NgxDropzoneComponent)(ɵɵdirectiveInject(NgxDropzoneService, 2));
};
NgxDropzoneComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxDropzoneComponent,
  selectors: [["ngx-dropzone"], ["", "ngx-dropzone", ""]],
  contentQueries: function NgxDropzoneComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, NgxDropzonePreviewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._previewChildren = _t);
    }
  },
  viewQuery: function NgxDropzoneComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c2, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._fileInput = _t.first);
    }
  },
  hostVars: 8,
  hostBindings: function NgxDropzoneComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgxDropzoneComponent_click_HostBindingHandler() {
        return ctx._onClick();
      })("dragover", function NgxDropzoneComponent_dragover_HostBindingHandler($event) {
        return ctx._onDragOver($event);
      })("dragleave", function NgxDropzoneComponent_dragleave_HostBindingHandler() {
        return ctx._onDragLeave();
      })("drop", function NgxDropzoneComponent_drop_HostBindingHandler($event) {
        return ctx._onDrop($event);
      });
    }
    if (rf & 2) {
      ɵɵclassProp("ngx-dz-disabled", ctx.disabled)("expandable", ctx.expandable)("unclickable", ctx.disableClick)("ngx-dz-hovered", ctx._isHovered);
    }
  },
  inputs: {
    accept: "accept",
    disabled: "disabled",
    multiple: "multiple",
    maxFileSize: "maxFileSize",
    expandable: "expandable",
    disableClick: "disableClick",
    processDirectoryDrop: "processDirectoryDrop",
    id: "id",
    ariaLabel: [InputFlags.None, "aria-label", "ariaLabel"],
    ariaLabelledby: [InputFlags.None, "aria-labelledby", "ariaLabelledby"],
    ariaDescribedBy: [InputFlags.None, "aria-describedby", "ariaDescribedBy"]
  },
  outputs: {
    change: "change"
  },
  features: [ɵɵProvidersFeature([NgxDropzoneService])],
  ngContentSelectors: _c4,
  decls: 5,
  vars: 8,
  consts: [["fileInput", ""], ["type", "file", 3, "change", "id", "multiple", "accept", "disabled"], [4, "ngIf"]],
  template: function NgxDropzoneComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵprojectionDef(_c3);
      ɵɵelementStart(0, "input", 1, 0);
      ɵɵlistener("change", function NgxDropzoneComponent_Template_input_change_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx._onFilesSelected($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(2, NgxDropzoneComponent_ng_content_2_Template, 1, 0, "ng-content", 2);
      ɵɵprojection(3);
      ɵɵprojection(4, 1);
    }
    if (rf & 2) {
      ɵɵproperty("id", ctx.id)("multiple", ctx.multiple)("accept", ctx.accept)("disabled", ctx.disabled);
      ɵɵattribute("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedBy);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", !ctx._hasPreviews);
    }
  },
  dependencies: [NgIf],
  styles: ["[_nghost-%COMP%]{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}.ngx-dz-hovered[_nghost-%COMP%]{border-style:solid}.ngx-dz-disabled[_nghost-%COMP%]{opacity:.5;cursor:no-drop;pointer-events:none}.expandable[_nghost-%COMP%]{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}.unclickable[_nghost-%COMP%]{cursor:default}[_nghost-%COMP%]     ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus +   ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneComponent, [{
    type: Component,
    args: [{
      selector: "ngx-dropzone, [ngx-dropzone]",
      providers: [NgxDropzoneService],
      template: '<input #fileInput type="file" [id]="id" [multiple]="multiple" [accept]="accept" [disabled]="disabled"\n  (change)="_onFilesSelected($event)" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledby"\n  [attr.aria-describedby]="ariaDescribedBy">\n<ng-content select="ngx-dropzone-label" *ngIf="!_hasPreviews"></ng-content>\n<ng-content select="ngx-dropzone-preview"></ng-content>\n<ng-content></ng-content>\n',
      styles: [":host{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}:host.ngx-dz-hovered{border-style:solid}:host.ngx-dz-disabled{opacity:.5;cursor:no-drop;pointer-events:none}:host.expandable{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}:host.unclickable{cursor:default}:host ::ng-deep ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}:host input{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host input:focus+::ng-deep ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}\n"]
    }]
  }], function() {
    return [{
      type: NgxDropzoneService,
      decorators: [{
        type: Self
      }]
    }];
  }, {
    _previewChildren: [{
      type: ContentChildren,
      args: [NgxDropzonePreviewComponent, {
        descendants: true
      }]
    }],
    _fileInput: [{
      type: ViewChild,
      args: ["fileInput", {
        static: true
      }]
    }],
    change: [{
      type: Output
    }],
    accept: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["class.ngx-dz-disabled"]
    }],
    multiple: [{
      type: Input
    }],
    maxFileSize: [{
      type: Input
    }],
    expandable: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["class.expandable"]
    }],
    disableClick: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["class.unclickable"]
    }],
    processDirectoryDrop: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedBy: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    _isHovered: [{
      type: HostBinding,
      args: ["class.ngx-dz-hovered"]
    }],
    _onClick: [{
      type: HostListener,
      args: ["click"]
    }],
    _onDragOver: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    _onDragLeave: [{
      type: HostListener,
      args: ["dragleave"]
    }],
    _onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }]
  });
})();
var NgxDropzoneImagePreviewComponent = class extends NgxDropzonePreviewComponent {
  constructor(sanitizer) {
    super(sanitizer);
    this.defaultImgLoading = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiByZ2IoMjQxLCAyNDIsIDI0Mykgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIyNHB4IiBoZWlnaHQ9IjIyNHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2U9IiM4NWEyYjYiIHN0cm9rZS1kYXNoYXJyYXk9IjIxLjk5MTE0ODU3NTEyODU1MiAyMS45OTExNDg1NzUxMjg1NTIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGR1cj0iMS4xNjI3OTA2OTc2NzQ0MTg0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZT0iI2JiY2VkZCIgc3Ryb2tlLWRhc2hhcnJheT0iMTUuNzA3OTYzMjY3OTQ4OTY2IDE1LjcwNzk2MzI2Nzk0ODk2NiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE1LjcwNzk2MzI2Nzk0ODk2NiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxLjE2Mjc5MDY5NzY3NDQxODRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOy0zNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==";
    this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(this.defaultImgLoading);
  }
  /** The file to preview. */
  set file(value) {
    this._file = value;
    this.renderImage();
  }
  get file() {
    return this._file;
  }
  ngOnInit() {
    this.renderImage();
  }
  renderImage() {
    this.readFile().then((img) => setTimeout(() => this.imageSrc = img)).catch((err) => console.error(err));
  }
};
NgxDropzoneImagePreviewComponent.ɵfac = function NgxDropzoneImagePreviewComponent_Factory(t) {
  return new (t || NgxDropzoneImagePreviewComponent)(ɵɵdirectiveInject(DomSanitizer));
};
NgxDropzoneImagePreviewComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxDropzoneImagePreviewComponent,
  selectors: [["ngx-dropzone-image-preview"]],
  inputs: {
    file: "file"
  },
  features: [ɵɵProvidersFeature([{
    provide: NgxDropzonePreviewComponent,
    useExisting: NgxDropzoneImagePreviewComponent
  }]), ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 3,
  vars: 2,
  consts: [[3, "src"], [3, "click", 4, "ngIf"], [3, "click"]],
  template: function NgxDropzoneImagePreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵelement(0, "img", 0);
      ɵɵprojection(1);
      ɵɵtemplate(2, NgxDropzoneImagePreviewComponent_ngx_dropzone_remove_badge_2_Template, 1, 0, "ngx-dropzone-remove-badge", 1);
    }
    if (rf & 2) {
      ɵɵproperty("src", ctx.imageSrc, ɵɵsanitizeUrl);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.removable);
    }
  },
  dependencies: [NgxDropzoneRemoveBadgeComponent, NgIf],
  styles: ["[_nghost-%COMP%]{min-width:unset!important;max-width:unset!important;padding:0!important}[_nghost-%COMP%]:hover   img[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   img[_ngcontent-%COMP%]{opacity:.7}[_nghost-%COMP%]:hover   ngx-dropzone-remove-badge[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:1}[_nghost-%COMP%]   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:0}[_nghost-%COMP%]   img[_ngcontent-%COMP%]{max-height:100%;border-radius:5px;opacity:.8}[_nghost-%COMP%]     ngx-dropzone-label{position:absolute;overflow-wrap:break-word}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneImagePreviewComponent, [{
    type: Component,
    args: [{
      selector: "ngx-dropzone-image-preview",
      template: `
    <img [src]="imageSrc" />
		<ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`,
      providers: [{
        provide: NgxDropzonePreviewComponent,
        useExisting: NgxDropzoneImagePreviewComponent
      }],
      styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover img,:host:focus img{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host img{max-height:100%;border-radius:5px;opacity:.8}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"]
    }]
  }], function() {
    return [{
      type: DomSanitizer
    }];
  }, {
    file: [{
      type: Input
    }]
  });
})();
var NgxDropzoneVideoPreviewComponent = class extends NgxDropzonePreviewComponent {
  constructor(sanitizer) {
    super(sanitizer);
  }
  ngOnInit() {
    if (!this.file) {
      console.error("No file to read. Please provide a file using the [file] Input property.");
      return;
    }
    this.videoSrc = URL.createObjectURL(this.file);
    this.sanitizedVideoSrc = this.sanitizer.bypassSecurityTrustUrl(this.videoSrc);
  }
  ngOnDestroy() {
    URL.revokeObjectURL(this.videoSrc);
  }
};
NgxDropzoneVideoPreviewComponent.ɵfac = function NgxDropzoneVideoPreviewComponent_Factory(t) {
  return new (t || NgxDropzoneVideoPreviewComponent)(ɵɵdirectiveInject(DomSanitizer));
};
NgxDropzoneVideoPreviewComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxDropzoneVideoPreviewComponent,
  selectors: [["ngx-dropzone-video-preview"]],
  features: [ɵɵProvidersFeature([{
    provide: NgxDropzonePreviewComponent,
    useExisting: NgxDropzoneVideoPreviewComponent
  }]), ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 3,
  vars: 2,
  consts: [["controls", "", 3, "click", 4, "ngIf"], [3, "click", 4, "ngIf"], ["controls", "", 3, "click"], [3, "src"], [3, "click"]],
  template: function NgxDropzoneVideoPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵtemplate(0, NgxDropzoneVideoPreviewComponent_video_0_Template, 2, 1, "video", 0);
      ɵɵprojection(1);
      ɵɵtemplate(2, NgxDropzoneVideoPreviewComponent_ngx_dropzone_remove_badge_2_Template, 1, 0, "ngx-dropzone-remove-badge", 1);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.sanitizedVideoSrc);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.removable);
    }
  },
  dependencies: [NgxDropzoneRemoveBadgeComponent, NgIf],
  styles: ["[_nghost-%COMP%]{min-width:unset!important;max-width:unset!important;padding:0!important}[_nghost-%COMP%]:hover   video[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   video[_ngcontent-%COMP%]{opacity:.7}[_nghost-%COMP%]:hover   ngx-dropzone-remove-badge[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:1}[_nghost-%COMP%]   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:0}[_nghost-%COMP%]   video[_ngcontent-%COMP%]{max-height:100%;border-radius:5px}[_nghost-%COMP%]     ngx-dropzone-label{position:absolute;overflow-wrap:break-word}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneVideoPreviewComponent, [{
    type: Component,
    args: [{
      selector: "ngx-dropzone-video-preview",
      template: `
    <video *ngIf="sanitizedVideoSrc" controls (click)="$event.stopPropagation()">
      <source [src]="sanitizedVideoSrc" />
    </video>
    <ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`,
      providers: [{
        provide: NgxDropzonePreviewComponent,
        useExisting: NgxDropzoneVideoPreviewComponent
      }],
      styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover video,:host:focus video{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host video{max-height:100%;border-radius:5px}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"]
    }]
  }], function() {
    return [{
      type: DomSanitizer
    }];
  }, null);
})();
var NgxDropzoneModule = class {
};
NgxDropzoneModule.ɵfac = function NgxDropzoneModule_Factory(t) {
  return new (t || NgxDropzoneModule)();
};
NgxDropzoneModule.ɵmod = ɵɵdefineNgModule({
  type: NgxDropzoneModule,
  declarations: [NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent, NgxDropzoneImagePreviewComponent, NgxDropzoneRemoveBadgeComponent, NgxDropzoneVideoPreviewComponent],
  imports: [CommonModule],
  exports: [NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent, NgxDropzoneImagePreviewComponent, NgxDropzoneRemoveBadgeComponent, NgxDropzoneVideoPreviewComponent]
});
NgxDropzoneModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDropzoneModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent, NgxDropzoneImagePreviewComponent, NgxDropzoneRemoveBadgeComponent, NgxDropzoneVideoPreviewComponent],
      exports: [NgxDropzoneComponent, NgxDropzoneLabelDirective, NgxDropzonePreviewComponent, NgxDropzoneImagePreviewComponent, NgxDropzoneRemoveBadgeComponent, NgxDropzoneVideoPreviewComponent]
    }]
  }], null, null);
})();
export {
  NgxDropzoneComponent,
  NgxDropzoneImagePreviewComponent,
  NgxDropzoneLabelDirective,
  NgxDropzoneModule,
  NgxDropzonePreviewComponent,
  NgxDropzoneRemoveBadgeComponent,
  NgxDropzoneVideoPreviewComponent
};
//# sourceMappingURL=ngx-dropzone.js.map
