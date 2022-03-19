var global = this;

function __esModule() {}

function setActiveSheet() {}

function onOpen() {}

function openDialog() {}

function openDialogBootstrap() {}

function openAboutSidebar() {}

function doGet() {}

function getSheetsData() {}

function addSheet() {}

function deleteSheet() {}

!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0, exports.setActiveSheet = exports.deleteSheet = exports.addSheet = exports.getSheetsData = exports.openAboutSidebar = exports.openDialogBootstrap = exports.openDialog = exports.onOpen = exports.doGet = void 0;
    var ui_1 = __webpack_require__(1);
    exports.onOpen = ui_1.onOpen, exports.openDialog = ui_1.openDialog, exports.openDialogBootstrap = ui_1.openDialogBootstrap, 
    exports.openAboutSidebar = ui_1.openAboutSidebar;
    var sheets_1 = __webpack_require__(2);
    exports.doGet = sheets_1.doGet, exports.getSheetsData = sheets_1.getSheetsData, 
    exports.addSheet = sheets_1.addSheet, exports.deleteSheet = sheets_1.deleteSheet, 
    exports.setActiveSheet = sheets_1.setActiveSheet, global.__esModule = exports.__esModule, 
    global.setActiveSheet = exports.setActiveSheet, global.onOpen = exports.onOpen, 
    global.openDialog = exports.openDialog, global.openDialogBootstrap = exports.openDialogBootstrap, 
    global.openAboutSidebar = exports.openAboutSidebar, global.doGet = exports.doGet, 
    global.getSheetsData = exports.getSheetsData, global.addSheet = exports.addSheet, 
    global.deleteSheet = exports.deleteSheet;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "onOpen", (function() {
        return onOpen;
    })), __webpack_require__.d(__webpack_exports__, "openDialog", (function() {
        return openDialog;
    })), __webpack_require__.d(__webpack_exports__, "openDialogBootstrap", (function() {
        return openDialogBootstrap;
    })), __webpack_require__.d(__webpack_exports__, "openAboutSidebar", (function() {
        return openAboutSidebar;
    }));
    var onOpen = function() {
        SpreadsheetApp.getUi().createMenu("My Sample React Project").addItem("Sheet Editor", "openDialog").addItem("Sheet Editor (Bootstrap)", "openDialogBootstrap").addItem("About me", "openAboutSidebar").addToUi();
    }, openDialog = function() {
        var html = HtmlService.createHtmlOutputFromFile("dialog-demo").setWidth(600).setHeight(600);
        SpreadsheetApp.getUi().showModalDialog(html, "Sheet Editor");
    }, openDialogBootstrap = function() {
        var html = HtmlService.createHtmlOutputFromFile("dialog-demo-bootstrap").setWidth(600).setHeight(600);
        SpreadsheetApp.getUi().showModalDialog(html, "Sheet Editor (Bootstrap)");
    }, openAboutSidebar = function() {
        var html = HtmlService.createHtmlOutputFromFile("sidebar-about-page");
        SpreadsheetApp.getUi().showSidebar(html);
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "doGet", (function() {
        return doGet;
    })), __webpack_require__.d(__webpack_exports__, "getSheetsData", (function() {
        return getSheetsData;
    })), __webpack_require__.d(__webpack_exports__, "addSheet", (function() {
        return addSheet;
    })), __webpack_require__.d(__webpack_exports__, "deleteSheet", (function() {
        return deleteSheet;
    })), __webpack_require__.d(__webpack_exports__, "setActiveSheet", (function() {
        return setActiveSheet;
    }));
    var doGet = function() {
        return HtmlService.createTemplateFromFile("dialog-demo-bootstrap.html").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1").setTitle("Web App").setFaviconUrl("https://img.icons8.com/windows/452/mandalorian.png");
    }, getSheets = function() {
        return SpreadsheetApp.getActive().getSheets();
    }, getSheetsData = function() {
        var activeSheetName = SpreadsheetApp.getActive().getSheetName();
        return getSheets().map((function(sheet, index) {
            var name = sheet.getName();
            return {
                name: name,
                index: index,
                isActive: name === activeSheetName
            };
        }));
    }, addSheet = function(sheetTitle) {
        return SpreadsheetApp.getActive().insertSheet(sheetTitle), getSheetsData();
    }, deleteSheet = function(sheetIndex) {
        var sheets = getSheets();
        return SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]), getSheetsData();
    }, setActiveSheet = function(sheetName) {
        return SpreadsheetApp.getActive().getSheetByName(sheetName).activate(), getSheetsData();
    };
} ]));