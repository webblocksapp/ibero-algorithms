(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('uuid'), require('@webblocksapp/class-validator'), require('rxjs'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ng-forms', ['exports', '@angular/core', '@angular/common', 'uuid', '@webblocksapp/class-validator', 'rxjs', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-forms'] = {}, global.ng.core, global.ng.common, global.uuid, global.classValidator, global.rxjs, global.ng.forms));
}(this, (function (exports, core, common, uuid, classValidator, rxjs, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var BaseModel = /** @class */ (function () {
        function BaseModel(DtoClass) {
            this.errors = [];
            this.map = [];
            this.submitted = false;
            this.resetTimes = new rxjs.BehaviorSubject(0);
            this.setDto(DtoClass);
        }
        BaseModel.prototype.setDto = function (DtoClass) {
            this.dtoObject = new DtoClass();
        };
        BaseModel.prototype.incrementResetTimes = function () {
            var currentValue = this.resetTimes.getValue();
            this.resetTimes.next(currentValue + 1);
        };
        BaseModel.prototype.resetDto = function () {
            var _this = this;
            var keys = Object.keys(this.dtoObject);
            keys.forEach(function (key) {
                _this.dtoObject[key] = null;
            });
        };
        BaseModel.prototype.getResetTimes = function () {
            return this.resetTimes;
        };
        BaseModel.prototype.getDto = function () {
            return this.dtoObject;
        };
        BaseModel.prototype.setValue = function (key, value) {
            this.dtoObject[key] = value || null;
        };
        BaseModel.prototype.getValue = function (key) {
            return this.dtoObject[key];
        };
        BaseModel.prototype.setSubmitted = function (flag) {
            this.submitted = flag;
        };
        BaseModel.prototype.getSubmitted = function () {
            return this.submitted;
        };
        BaseModel.prototype.setErrors = function (errors) {
            this.errors = Object.assign(this.errors, errors);
        };
        BaseModel.prototype.initMap = function () {
            var _this = this;
            var keys = Object.keys(this.dtoObject);
            keys.forEach(function (key) {
                var filteredMap = _this.map.filter(function (item) { return item.property === key; });
                if (filteredMap.length === 0) {
                    _this.map.push({ property: key, touched: false });
                }
            });
        };
        BaseModel.prototype.resetMap = function () {
            this.map = [];
            this.initMap();
        };
        BaseModel.prototype.setTouched = function (property, touched) {
            if (property === void 0) { property = null; }
            if (touched === void 0) { touched = true; }
            if (property) {
                this.map.map(function (item) {
                    if (item.property === property) {
                        item.touched = touched;
                    }
                });
            }
            else {
                this.map.map(function (item) {
                    item.touched = touched;
                });
            }
        };
        BaseModel.prototype.cleanError = function (fieldName) {
            this.errors = this.errors.filter(function (error) { return error.property !== fieldName; });
        };
        BaseModel.prototype.cleanErrors = function () {
            this.errors = [];
        };
        BaseModel.prototype.getErrors = function () {
            return this.errors;
        };
        BaseModel.prototype.getMap = function () {
            return this.map;
        };
        BaseModel.prototype.getPropertyMap = function (property) {
            var filteredMap = this.map.filter(function (item) { return item.property === property; });
            if (filteredMap.length > 0) {
                return filteredMap[0];
            }
            return null;
        };
        BaseModel.prototype.fill = function (data) {
            var _this = this;
            var objectKeys = Object.keys(data);
            objectKeys.forEach(function (key) {
                var value = data[key];
                _this.setValue(key, value);
            });
        };
        BaseModel.prototype.validate = function (validatorOptions) {
            var _this = this;
            return new Promise(function (resolve) {
                validatorOptions = Object.assign({
                    propertyName: undefined,
                    stopAtFirstError: true,
                }, validatorOptions);
                classValidator.validate(_this.dtoObject, validatorOptions).then(function (errors) {
                    if (errors.length === 0) {
                        _this.cleanErrors();
                        resolve({
                            isValid: true,
                            validatedData: _this.dtoObject,
                            errors: null,
                        });
                    }
                    if (errors.length > 0) {
                        _this.setErrors(errors);
                        resolve({ isValid: false, validatedData: null, errors: errors });
                    }
                    _this.setTouched();
                });
            });
        };
        BaseModel.prototype.validateField = function (fieldName, validatorOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                validatorOptions = Object.assign({
                    propertyName: fieldName,
                    stopAtFirstError: true,
                }, validatorOptions);
                classValidator.validate(_this.dtoObject, validatorOptions).then(function (errors) {
                    if (errors.length === 0) {
                        _this.cleanError(fieldName);
                        resolve(_this.dtoObject[fieldName]);
                    }
                    if (errors.length > 0) {
                        _this.setErrors(errors);
                        reject(errors);
                    }
                    _this.setTouched(fieldName);
                });
            });
        };
        BaseModel.prototype.reset = function () {
            this.cleanErrors();
            this.setSubmitted(false);
            this.resetDto();
            this.resetMap();
            this.incrementResetTimes();
        };
        return BaseModel;
    }());

    var setValueByPath = function (object, path, value) {
        var arrayPath = path.split('.');
        var iteratedObject = object;
        arrayPath.forEach(function (pathItem, index) {
            if (index === arrayPath.length - 1) {
                iteratedObject[pathItem] = value;
            }
            else {
                iteratedObject = iteratedObject[pathItem];
            }
        });
    };
    var ɵ0 = setValueByPath;

    var capitalize = function (str) {
        if (str)
            return str.charAt(0).toUpperCase() + str.slice(1);
        return null;
    };
    var ɵ0$1 = capitalize;

    var isNull = function (value) {
        if (value === undefined ||
            value === '' ||
            value === null ||
            (typeof value === 'object' && Object.entries(value).length === 0)) {
            return true;
        }
        return false;
    };
    var ɵ0$2 = isNull;

    var clone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    var ɵ0$3 = clone;

    // tslint:disable-next-line: no-conflicting-lifecycle
    // tslint:disable-next-line: directive-class-suffix
    var DataInputBase = /** @class */ (function () {
        function DataInputBase(differs, ngZone) {
            this.differs = differs;
            this.ngZone = ngZone;
            this.type = 'text';
            this.size = 'default';
            this.focusEvent = new core.EventEmitter();
            this.focusoutEvent = new core.EventEmitter();
            this.blurEvent = new core.EventEmitter();
            this.changeEvent = new core.EventEmitter();
            this.inputEvent = new core.EventEmitter();
            this.keydownEvent = new core.EventEmitter();
            this.keypressEvent = new core.EventEmitter();
            this.keyupEvent = new core.EventEmitter();
            this.clickEvent = new core.EventEmitter();
            this.dblclickEvent = new core.EventEmitter();
            this.mousedownEvent = new core.EventEmitter();
            this.mousemoveEvent = new core.EventEmitter();
            this.mouseoutEvent = new core.EventEmitter();
            this.mouseoverEvent = new core.EventEmitter();
            this.mouseupEvent = new core.EventEmitter();
            this.mousewheelEvent = new core.EventEmitter();
            this.wheelEvent = new core.EventEmitter();
            this.value = null;
            this.isReactiveForm = true;
            this.highlightOnValid = false;
            this.touched = false;
        }
        DataInputBase.prototype.ngOnInit = function () {
            this.alwaysSetConfigsOnInit();
            this.setConfigsOnInit();
        };
        DataInputBase.prototype.ngOnChanges = function (changes) {
            for (var propName in changes) {
                this.alwaysDetectPropertiesChanges(propName);
                this.detectPropertiesChanges(propName);
            }
        };
        // ----------------------------------------------------------------
        // ------- Component configs on init and changes detection  -------
        // ------------------ for computed attributes ---------------------
        // ----------------------------------------------------------------
        DataInputBase.prototype.alwaysSetConfigsOnInit = function () {
            this.setComponentUniqueId();
        };
        DataInputBase.prototype.setConfigsOnInit = function () { };
        DataInputBase.prototype.alwaysDetectPropertiesChanges = function (propName) {
            if (propName === 'size')
                this.getInputSize();
            if (propName === 'disabled')
                this.computeDisabledProperty();
            if (propName === 'readonly')
                this.computeReadonlyProperty();
        };
        DataInputBase.prototype.detectPropertiesChanges = function (propName) { };
        DataInputBase.prototype.setComponentUniqueId = function () {
            if (this.id === undefined)
                this.id = uuid.v4();
        };
        DataInputBase.prototype.getInputSize = function () {
            switch (this.size) {
                case 'default':
                    this.inputSize = '';
                    break;
                case 'large':
                    this.inputSize = 'input-group-lg';
                    break;
                case 'small':
                    this.inputSize = 'input-group-sm';
                    break;
                default:
                    this.inputSize = '';
                    break;
            }
        };
        DataInputBase.prototype.computeDisabledProperty = function () {
            switch (this.disabled) {
                case true:
                    this.disabled = true;
                    break;
                case false:
                    this.disabled = undefined;
                    break;
                default:
                    this.disabled = undefined;
                    break;
            }
        };
        DataInputBase.prototype.computeReadonlyProperty = function () {
            switch (this.readonly) {
                case true:
                    this.readonly = true;
                    break;
                case false:
                    this.readonly = undefined;
                    break;
                default:
                    this.readonly = undefined;
                    break;
            }
        };
        // --------------------------------------
        // ------- Component forms events -------
        // --------------------------------------
        DataInputBase.prototype.focus = function (event) {
            event = this.bindFocusEvents(event);
            this.focusEvent.emit(event);
        };
        DataInputBase.prototype.bindFocusEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.focusout = function (event) {
            event = this.bindFocusoutEvents(event);
            this.focusoutEvent.emit(event);
        };
        DataInputBase.prototype.bindFocusoutEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.blur = function (event) {
            event = this.bindBlurEvents(event);
            this.blurEvent.emit(event);
        };
        DataInputBase.prototype.bindBlurEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.change = function (event) {
            event = this.bindChangeEvents(event);
            this.changeEvent.emit(event);
        };
        DataInputBase.prototype.bindChangeEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.input = function (event) {
            event = this.bindInputEvents(event);
            this.inputEvent.emit(event);
        };
        DataInputBase.prototype.bindInputEvents = function (event) {
            return event;
        };
        // --------------------------------------
        // ----- Component keyboard events ------
        // --------------------------------------
        DataInputBase.prototype.keyup = function (event) {
            event = this.bindKeyupEvents(event);
            this.keyupEvent.emit(event);
        };
        DataInputBase.prototype.bindKeyupEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.keydown = function (event) {
            event = this.bindKeydownEvents(event);
            this.keydownEvent.emit(event);
        };
        DataInputBase.prototype.bindKeydownEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.keypress = function (event) {
            event = this.bindKeypressEvents(event);
            this.keypressEvent.emit(event);
        };
        DataInputBase.prototype.bindKeypressEvents = function (event) {
            return event;
        };
        // --------------------------------------
        // ----- Component mouse events ------
        // --------------------------------------
        DataInputBase.prototype.click = function (event) {
            event = this.bindClickEvents(event);
            this.clickEvent.emit(event);
        };
        DataInputBase.prototype.bindClickEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.dblclick = function (event) {
            event = this.bindDblclickEvents(event);
            this.dblclickEvent.emit(event);
        };
        DataInputBase.prototype.bindDblclickEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mousedown = function (event) {
            event = this.bindMousedownEvents(event);
            this.mousedownEvent.emit(event);
        };
        DataInputBase.prototype.bindMousedownEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mousemove = function (event) {
            event = this.bindMousemoveEvents(event);
            this.mousemoveEvent.emit(event);
        };
        DataInputBase.prototype.bindMousemoveEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mouseout = function (event) {
            event = this.bindMouseoutEvents(event);
            this.mouseoutEvent.emit(event);
        };
        DataInputBase.prototype.bindMouseoutEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mouseover = function (event) {
            event = this.bindMouseoverEvents(event);
            this.mouseoverEvent.emit(event);
        };
        DataInputBase.prototype.bindMouseoverEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mouseup = function (event) {
            event = this.bindMouseupEvents(event);
            this.mouseupEvent.emit(event);
        };
        DataInputBase.prototype.bindMouseupEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.mousewheel = function (event) {
            event = this.bindMousewheelEvents(event);
            this.mousewheelEvent.emit(event);
        };
        DataInputBase.prototype.bindMousewheelEvents = function (event) {
            return event;
        };
        DataInputBase.prototype.wheel = function (event) {
            event = this.bindWheelEvents(event);
            this.wheelEvent.emit(event);
        };
        DataInputBase.prototype.bindWheelEvents = function (event) {
            return event;
        };
        // --------------------------------------
        // ----- Component data methods ---------
        // --------------------------------------
        DataInputBase.prototype.fillModel = function (value) {
            if (this.model !== undefined) {
                if (!(this.model instanceof BaseModel)) {
                    console.error('Model is not instance of BaseModel from @webblocksapp/class-validator');
                    return;
                }
                if (this.name === undefined) {
                    console.error('Your input component must contain a name attribute');
                    return;
                }
                this.model.setValue(this.name, value);
                this.value = this.model.getValue(this.name);
            }
        };
        DataInputBase.prototype.validateField = function () {
            var _this = this;
            if (this.isReactiveForm === false)
                return;
            if (this.isReactiveForm === true) {
                this.model
                    .validateField(this.name)
                    .then(function () {
                    _this.error = '';
                    _this.setTouched();
                    _this.bindEventsAfterValidateField();
                })
                    .catch(function (error) {
                    _this.setError(error);
                    _this.bindEventsAfterValidateField();
                });
            }
        };
        DataInputBase.prototype.setTouched = function () {
            this.touched = true;
            var map = this.model.getPropertyMap(this.name);
            map.touched = true;
        };
        DataInputBase.prototype.bindEventsAfterValidateField = function () { };
        DataInputBase.prototype.setError = function (error) {
            var constraints = error[0].constraints;
            this.error = Object.values(constraints)[0] || '';
            this.error = capitalize(this.error);
        };
        DataInputBase.prototype.refresh = function () { };
        DataInputBase.prototype.watchModel = function () {
            if (this.model !== undefined && this.name !== undefined) {
                if (this.modelDiffer === undefined) {
                    this.modelDiffer = this.differs.find(this.model).create();
                }
                var value = this.model.getValue(this.name);
                if (typeof value !== 'object') {
                    value = [value];
                }
                var changes = this.modelDiffer.diff(value);
                if (changes) {
                    this.bindWatchModelEvents();
                }
            }
        };
        DataInputBase.prototype.bindWatchModelEvents = function () { };
        return DataInputBase;
    }());
    DataInputBase.decorators = [
        { type: core.Directive }
    ];
    DataInputBase.ctorParameters = function () { return [
        { type: core.KeyValueDiffers },
        { type: core.NgZone }
    ]; };
    DataInputBase.propDecorators = {
        id: [{ type: core.Input }, { type: core.HostBinding, args: ['id',] }],
        label: [{ type: core.Input }],
        name: [{ type: core.Input }],
        type: [{ type: core.Input }],
        size: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        help: [{ type: core.Input }],
        startSlot: [{ type: core.Input }],
        startSlotHtml: [{ type: core.Input }],
        endSlot: [{ type: core.Input }],
        endSlotHtml: [{ type: core.Input }],
        autocomplete: [{ type: core.Input }],
        focusEvent: [{ type: core.Output }],
        focusoutEvent: [{ type: core.Output }],
        blurEvent: [{ type: core.Output }],
        changeEvent: [{ type: core.Output }],
        inputEvent: [{ type: core.Output }],
        keydownEvent: [{ type: core.Output }],
        keypressEvent: [{ type: core.Output }],
        keyupEvent: [{ type: core.Output }],
        clickEvent: [{ type: core.Output }],
        dblclickEvent: [{ type: core.Output }],
        mousedownEvent: [{ type: core.Output }],
        mousemoveEvent: [{ type: core.Output }],
        mouseoutEvent: [{ type: core.Output }],
        mouseoverEvent: [{ type: core.Output }],
        mouseupEvent: [{ type: core.Output }],
        mousewheelEvent: [{ type: core.Output }],
        wheelEvent: [{ type: core.Output }]
    };

    var BsInputComponent = /** @class */ (function (_super) {
        __extends(BsInputComponent, _super);
        function BsInputComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.class = 'form-group';
            return _this;
        }
        BsInputComponent.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsInputComponent.prototype.bindWatchModelEvents = function () {
            this.value = this.model.getValue(this.name);
        };
        BsInputComponent.prototype.bindFocusoutEvents = function (event) {
            this.validateField();
            return event;
        };
        BsInputComponent.prototype.bindKeyupEvents = function (event) {
            var value = event.target.value;
            this.fillModel(value);
            return event;
        };
        return BsInputComponent;
    }(DataInputBase));
    BsInputComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-input',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\" attr.for=\"{{ id }}-bs\">{{\n      label\n    }}</label>\n    <div\n      class=\"input-group {{ inputSize }}\"\n      [ngClass]=\"{\n        'is-invalid': error,\n        'is-valid': touched && highlightOnValid && !error\n      }\"\n    >\n      <div *ngIf=\"startSlot\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\">{{ startSlot }}</span>\n      </div>\n      <div *ngIf=\"startSlotHtml\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\" [innerHTML]=\"startSlotHtml\"></span>\n      </div>\n      <input\n        [attr.autocomplete]=\"autocomplete ? 'on' : 'off'\"\n        [attr.name]=\"name\"\n        [value]=\"value\"\n        [type]=\"type\"\n        [attr.placeholder]=\"placeholder\"\n        [attr.disabled]=\"disabled\"\n        class=\"form-control\"\n        [ngClass]=\"{\n          'is-invalid': error,\n          'is-valid': touched && highlightOnValid && !error\n        }\"\n        id=\"{{ id }}-bs\"\n        (focusout)=\"focusout($event)\"\n        (focus)=\"focus($event)\"\n        (change)=\"change($event)\"\n        (input)=\"input($event)\"\n        (keyup)=\"keyup($event)\"\n        (keydown)=\"keydown($event)\"\n        (keypress)=\"keypress($event)\"\n        (click)=\"click($event)\"\n        (dblclick)=\"dblclick($event)\"\n        (mousedown)=\"mousedown($event)\"\n        (mousemove)=\"mousemove($event)\"\n        (mouseout)=\"mouseout($event)\"\n        (mouseover)=\"mouseover($event)\"\n        (mouseup)=\"mouseup($event)\"\n        (wheel)=\"wheel($event)\"\n      />\n\n      <div *ngIf=\"endSlot\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlot }}</span>\n      </div>\n      <div *ngIf=\"endSlotHtml\" class=\"input-group-append\">\n        <span class=\"input-group-text\" [innerHTML]=\"endSlotHtml\"></span>\n      </div>\n    </div>\n    <small *ngIf=\"help\" class=\"form-text text-muted\">\n      {{ help }}\n    </small>\n    <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n  ",
                    styles: ["\n      :host {\n        display: block;\n      }\n    "]
                },] }
    ];
    BsInputComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }]
    };

    var BsInputModule = /** @class */ (function () {
        function BsInputModule() {
        }
        return BsInputModule;
    }());
    BsInputModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsInputComponent],
                    imports: [common.CommonModule],
                    declarations: [BsInputComponent],
                },] }
    ];

    var DataGroupComponent = /** @class */ (function () {
        function DataGroupComponent() {
            this.class = 'd-block';
            this.dataInputComponents = [];
        }
        DataGroupComponent.prototype.ngOnInit = function () { };
        DataGroupComponent.prototype.ngAfterContentInit = function () {
            this.loadDataInputComponents();
        };
        DataGroupComponent.prototype.loadDataInputComponents = function () {
            var _this = this;
            this.dataInputs.forEach(function (dataInput) {
                _this.dataInputComponents.push(dataInput);
            });
        };
        DataGroupComponent.prototype.getDataInputComponents = function () {
            return this.dataInputComponents;
        };
        return DataGroupComponent;
    }());
    DataGroupComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'data-group',
                    template: "<ng-content></ng-content>"
                },] }
    ];
    DataGroupComponent.ctorParameters = function () { return []; };
    DataGroupComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
        dataInputs: [{ type: core.ContentChildren, args: ['dataInput', { descendants: true },] }]
    };

    var BaseModelArray = /** @class */ (function () {
        function BaseModelArray(DtoClass) {
            this.array = [];
            this.change = new rxjs.BehaviorSubject(false);
            this.dtoClass = DtoClass;
            this.array = [new BaseModel(this.dtoClass)];
        }
        BaseModelArray.prototype.fill = function (data) {
            var _this = this;
            var array = [];
            data.forEach(function (item) {
                var model = new BaseModel(_this.dtoClass);
                model.fill(item);
                array.push(model);
            });
            this.array = array;
            this.emitChange();
        };
        BaseModelArray.prototype.get = function () {
            return this.array;
        };
        BaseModelArray.prototype.find = function (index) {
            return this.array[index];
        };
        BaseModelArray.prototype.add = function (data) {
            if (data === void 0) { data = null; }
            var model = new BaseModel(this.dtoClass);
            if (data) {
                model.fill(data);
            }
            this.array.push(model);
            this.emitChange();
        };
        BaseModelArray.prototype.delete = function (index) {
            var _this = this;
            this.array = this.array.filter(function (item) { return _this.array.indexOf(item) !== index; });
            this.emitChange();
        };
        BaseModelArray.prototype.count = function () {
            return this.array.length;
        };
        BaseModelArray.prototype.emitChange = function () {
            var currentValue = this.change.getValue();
            this.change.next(!currentValue);
        };
        BaseModelArray.prototype.getChange = function () {
            return this.change;
        };
        return BaseModelArray;
    }());

    var DataGroupsComponent = /** @class */ (function () {
        function DataGroupsComponent() {
            this.class = 'd-block';
            this.multiple = false;
            this.highlightOnValid = false;
            this.autocomplete = false;
            this.submitEvent = new core.EventEmitter();
            this.modelResetSubscriptions$ = [];
            this.firstMount = false;
        }
        DataGroupsComponent.prototype.ngOnInit = function () {
            this.initBaseModel();
        };
        DataGroupsComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.initModelMap();
                _this.listenDataGroupsListChanges();
                _this.listenDataInputsListChanges();
            });
        };
        DataGroupsComponent.prototype.ngOnChanges = function (changes) {
            for (var propName in changes) {
                if (propName === 'model' && this.firstMount === true) {
                    this.initBaseModel();
                    this.initModelMap();
                }
                if (propName === 'highlightOnValid') {
                    if (Array.isArray(this.model) &&
                        this.dataGroupComponents !== undefined) {
                        this.initModelMap();
                    }
                }
            }
        };
        DataGroupsComponent.prototype.addModelResetSubscription = function (subscription) {
            this.modelResetSubscriptions$.push(subscription);
        };
        DataGroupsComponent.prototype.unsubscribeAllModelResetSubscriptions = function () {
            this.modelResetSubscriptions$.forEach(function (subscription, i) {
                subscription.unsubscribe();
            });
            this.modelResetSubscriptions$ = [];
        };
        DataGroupsComponent.prototype.initBaseModel = function () {
            if (Array.isArray(this.model)) {
                this._model = this.model;
            }
            if (this.model instanceof BaseModelArray) {
                this._model = this.model.get();
                this.subscribeToBaseModelArrayChanges();
            }
            if (this.model instanceof BaseModel) {
                this._model = [this.model];
            }
            this.firstMount = true;
        };
        DataGroupsComponent.prototype.subscribeToBaseModelArrayChanges = function () {
            var _this = this;
            var subscription = this.model.getChange();
            subscription.subscribe(function () {
                if (_this.firstMount === true) {
                    _this.modelResetSubscriptions$ = [];
                    _this.refreshBaseModelArray();
                }
            });
        };
        DataGroupsComponent.prototype.refreshBaseModelArray = function () {
            var _this = this;
            this._model = this.model.get();
            setTimeout(function () {
                _this.initModelMap();
            });
        };
        DataGroupsComponent.prototype.unsubscribeToBaseModelArrayChanges = function () {
            if (this.model.getChange === 'function') {
                var subscription = this.model.getChange();
                subscription.unsubscribe();
            }
        };
        DataGroupsComponent.prototype.initModelMap = function () {
            this.generateModelMap();
            this.applyToAllModelMap();
            this.applyToAllModelPropertiesMap();
        };
        DataGroupsComponent.prototype.generateModelMap = function () {
            var _this = this;
            this.modelMap = [];
            this._model.forEach(function (model, index) {
                _this.modelMap.push({ model: model, dataInputComponents: [] });
                var dataGroupComponent = _this.dataGroupComponents.toArray()[index];
                var dataInputComponents = dataGroupComponent.getDataInputComponents();
                dataInputComponents.forEach(function (dataInputComponent, i) {
                    _this.modelMap[index].dataInputComponents[i] = {
                        component: dataInputComponent,
                        name: dataInputComponent.name,
                    };
                });
            });
        };
        DataGroupsComponent.prototype.applyToAllModelMap = function () {
            var _this = this;
            this.modelMap.forEach(function (map) {
                _this.applyModelMap(map);
                _this.subscribeToModelReset(map);
            });
        };
        DataGroupsComponent.prototype.applyModelMap = function (map) {
            var _this = this;
            map.dataInputComponents.forEach(function (dataInputComponent) {
                var name = dataInputComponent.component.name;
                var errors = _this.formatErrors(map.model.getErrors());
                dataInputComponent.component.model = map.model;
                dataInputComponent.component.highlightOnValid = _this.highlightOnValid;
                if (dataInputComponent.component.autocomplete === undefined) {
                    dataInputComponent.component.autocomplete = _this.autocomplete;
                }
                dataInputComponent.component.fillModel(map.model.getValue(name));
                dataInputComponent.component.refresh();
                _this.setDataInputComponentError(dataInputComponent, errors);
            });
        };
        DataGroupsComponent.prototype.subscribeToModelReset = function (map) {
            var _this = this;
            var subscription = map.model.getResetTimes();
            this.addModelResetSubscription(subscription);
            subscription.subscribe(function () {
                _this.applyModelMap(map);
                _this.applyModelPropertiesMap(map);
            });
        };
        DataGroupsComponent.prototype.applyToAllModelPropertiesMap = function () {
            var _this = this;
            this.modelMap.forEach(function (map) {
                _this.applyModelPropertiesMap(map);
            });
        };
        DataGroupsComponent.prototype.applyModelPropertiesMap = function (map) {
            map.model.initMap();
            map.dataInputComponents.forEach(function (dataInputComponent) {
                var name = dataInputComponent.component.name;
                var propertyMap = map.model.getPropertyMap(name);
                dataInputComponent.component.touched = propertyMap.touched;
            });
        };
        DataGroupsComponent.prototype.listenDataGroupsListChanges = function () {
            var _this = this;
            if (Array.isArray(this.model)) {
                this.dataGroupComponents.changes.subscribe(function () {
                    setTimeout(function () {
                        _this.initModelMap();
                    });
                });
            }
        };
        DataGroupsComponent.prototype.listenDataInputsListChanges = function () {
            var _this = this;
            if (Array.isArray(this.model)) {
                this.dataGroupComponents.forEach(function (dataGroupComponent) {
                    dataGroupComponent.dataInputs.changes.subscribe(function () {
                        dataGroupComponent.loadDataInputComponents();
                        setTimeout(function () {
                            _this.initModelMap();
                        });
                    });
                });
            }
        };
        DataGroupsComponent.prototype.submitData = function () {
            var _this = this;
            var promises = [];
            var groups = this.group !== undefined ? { groups: [this.group] } : {};
            this.modelMap.forEach(function (map) {
                map.model.setSubmitted(true);
                promises.push(new Promise(function (resolve) {
                    map.model
                        .validate(groups)
                        .then(function (validationResult) {
                        var isValid = validationResult.isValid, errors = validationResult.errors;
                        if (isValid) {
                            resolve(validationResult);
                        }
                        else {
                            var formattedErrors = _this.formatErrors(errors);
                            var formattedValidationResult = {
                                isValid: isValid,
                                errors: formattedErrors,
                            };
                            resolve(formattedValidationResult);
                        }
                    });
                }));
            });
            this.submitEvent.emit(new Promise(function (resolve) {
                var currentPromise = promises.length > 1 ? Promise.all(promises) : promises[0];
                currentPromise.then(function (validationResult) {
                    _this.manageErrors(validationResult);
                    if (_this.enctype === 'multipart/form-data') {
                        if (!Array.isArray(validationResult)) {
                            validationResult.validatedData = _this.generateFormData(validationResult.validatedData);
                        }
                        else {
                            validationResult.forEach(function (item) {
                                item.validatedData = _this.generateFormData(item.validatedData);
                            });
                        }
                    }
                    validationResult = _this.parseValidationResult(validationResult);
                    resolve(validationResult);
                });
            }));
        };
        DataGroupsComponent.prototype.parseValidationResult = function (validationResult) {
            if (this.multiple === true && !Array.isArray(validationResult)) {
                validationResult = [validationResult];
            }
            if (Array.isArray(validationResult)) {
                validationResult = this.groupMultipleValidationResult(validationResult);
            }
            return validationResult;
        };
        DataGroupsComponent.prototype.groupMultipleValidationResult = function (validationResult) {
            var groupedMultipleValidationResults = {
                isValid: true,
            };
            validationResult.forEach(function (validationResultItem) {
                if (groupedMultipleValidationResults.isValid) {
                    groupedMultipleValidationResults.isValid = validationResultItem.isValid;
                }
                if (validationResultItem.validatedData !== undefined) {
                    if (groupedMultipleValidationResults.validatedData === undefined) {
                        groupedMultipleValidationResults.validatedData = [];
                    }
                    groupedMultipleValidationResults.validatedData.push(validationResultItem.validatedData);
                }
                if (validationResultItem.errors !== undefined) {
                    if (groupedMultipleValidationResults.errors === undefined) {
                        groupedMultipleValidationResults.errors = [];
                    }
                    groupedMultipleValidationResults.errors.push(validationResultItem.errors);
                }
            });
            return groupedMultipleValidationResults;
        };
        DataGroupsComponent.prototype.generateFormData = function (validatedData) {
            var formData = new FormData();
            if (!isNull(validatedData)) {
                var keys = Object.keys(validatedData);
                keys.forEach(function (key) {
                    formData.append(key, validatedData[key]);
                });
            }
            return formData;
        };
        DataGroupsComponent.prototype.formatErrors = function (errors) {
            var formattedErrors = [];
            errors.forEach(function (error, index) {
                var errorData = {
                    property: error.property,
                    message: Object.values(error.constraints)[0],
                };
                formattedErrors[index] = errorData;
            });
            return formattedErrors;
        };
        DataGroupsComponent.prototype.manageErrors = function (validationResults) {
            var _this = this;
            validationResults = !Array.isArray(validationResults)
                ? [validationResults]
                : validationResults;
            this.modelMap.forEach(function (map, index) {
                var dataInputComponents = map.dataInputComponents;
                var _a = validationResults[index], isValid = _a.isValid, errors = _a.errors;
                if (isValid) {
                    dataInputComponents.forEach(function (dataInputComponent) {
                        dataInputComponent.component.error = null;
                        dataInputComponent.component.touched = true;
                    });
                }
                else {
                    dataInputComponents.forEach(function (dataInputComponent) {
                        _this.setDataInputComponentError(dataInputComponent, errors);
                        dataInputComponent.component.touched = true;
                    });
                }
            });
        };
        DataGroupsComponent.prototype.setDataInputComponentError = function (dataInputComponent, errors) {
            var name = dataInputComponent.name;
            var filteredError = errors.filter(function (error) { return error.property === name; });
            var errorMessage = filteredError.length ? filteredError[0].message : null;
            dataInputComponent.component.error = capitalize(errorMessage);
            dataInputComponent.component.refresh();
        };
        DataGroupsComponent.prototype.unsubscribeAll = function () {
            this.unsubscribeAllModelResetSubscriptions();
            this.unsubscribeToBaseModelArrayChanges();
        };
        DataGroupsComponent.prototype.ngOnDestroy = function () {
            this.unsubscribeAll();
        };
        return DataGroupsComponent;
    }());
    DataGroupsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'data-groups',
                    template: "\n    <form (ngSubmit)=\"submitData()\">\n      <ng-content></ng-content>\n    </form>\n  ",
                    styles: ["\n      form {\n        position: relative;\n      }\n    "]
                },] }
    ];
    DataGroupsComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }],
        model: [{ type: core.Input }],
        group: [{ type: core.Input }],
        enctype: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        highlightOnValid: [{ type: core.Input }],
        autocomplete: [{ type: core.Input }],
        submitEvent: [{ type: core.Output }],
        dataGroupComponents: [{ type: core.ContentChildren, args: [DataGroupComponent,] }]
    };

    var DataGroupsModule = /** @class */ (function () {
        function DataGroupsModule() {
        }
        return DataGroupsModule;
    }());
    DataGroupsModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [DataGroupsComponent, DataGroupComponent],
                    imports: [common.CommonModule, forms.FormsModule],
                    declarations: [DataGroupsComponent, DataGroupComponent],
                },] }
    ];

    var BsSelect2Component = /** @class */ (function (_super) {
        __extends(BsSelect2Component, _super);
        function BsSelect2Component() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.class = 'ng-select2 form-group';
            _this.configs = {};
            _this.allowClear = true;
            _this.closeOnSelect = true;
            _this.debug = false;
            _this.dir = 'ltr';
            _this.dropdownAutoWidth = false;
            _this.language = 'en';
            _this.maximumInputLength = 0;
            _this.maximumSelectionLength = 0;
            _this.minimumInputLength = 0;
            _this.minimumResultsForSearch = 0;
            _this.multiple = false;
            _this.selectOnClose = false;
            _this.tags = false;
            _this.width = 'resolve';
            _this.scrollAfterSelect = false;
            _this.selectEvent = new core.EventEmitter();
            _this.clearEvent = new core.EventEmitter();
            _this.closeEvent = new core.EventEmitter();
            _this.validate = false;
            _this.select2Configs = {};
            _this.watchedProperties = [
                'theme',
                'liveSearch',
                'options',
                'configs',
                'configs',
                'noResults',
                'allowClear',
                'closeOnSelect',
                'data',
                'debug',
                'dir',
                'dropdownAutoWidth',
                'dropdownCssClass',
                'language',
                'maximumInputLength',
                'maximumSelectionLength',
                'minimumInputLength',
                'minimumResultsForSearch',
                'multiple',
                'placeholder',
                'selectionCssClass',
                'selectOnClose',
                'tags',
                'width',
                'scrollAfterSelect',
            ];
            return _this;
        }
        BsSelect2Component.prototype.ngAfterViewInit = function () {
            this.initJQueryEl();
            this.initSelect2();
        };
        BsSelect2Component.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsSelect2Component.prototype.bindWatchModelEvents = function () {
            this.initSelectedOptions();
        };
        BsSelect2Component.prototype.detectPropertiesChanges = function (propName) {
            if (propName === 'disabled')
                this.enableOrDisableSelect2();
            if (this.watchedProperties.indexOf(propName) > -1)
                this.refreshSelect2();
        };
        BsSelect2Component.prototype.initJQueryEl = function () {
            this.select2 = $(this.select2ElementRef.nativeElement);
        };
        BsSelect2Component.prototype.initSelect2 = function () {
            this.buildSelect2Configs();
            this.select2.select2(this.select2Configs);
            this.bindEventsToSelect2();
            this.enableOrDisableSelect2();
            this.disableSelect2WhenOptionsAreEmpty();
        };
        BsSelect2Component.prototype.bindEventsToSelect2 = function () {
            var _this = this;
            this.select2.on('change', function (event) {
                var value = _this.select2.select2('val');
                _this.fillModel(value);
                if (_this.validate === true) {
                    _this.validateField();
                }
                else {
                    _this.validate = true;
                }
                _this.change(event);
            });
            this.select2.on('select2:select', function (event) {
                _this.selectEvent.emit(event.params.data);
            });
            this.select2.on('select2:clear', function (event) {
                _this.fillModel(null);
                _this.validateField();
                _this.clearEvent.emit(event.params.data);
            });
            this.select2.on('select2:close', function (event) {
                /**
                 * Equivalent to a validate on focusout
                 */
                setTimeout(function () {
                    if (isNull(_this.model.getValue(_this.name))) {
                        _this.validateField();
                        _this.closeEvent.emit(event.params.data);
                    }
                });
            });
        };
        BsSelect2Component.prototype.bindEventsAfterValidateField = function () {
            this.addOrRemoveValidationClasses();
        };
        BsSelect2Component.prototype.buildSelect2Configs = function () {
            var defaultConfigs = {
                theme: this.theme,
                allowClear: this.allowClear,
                closeOnSelect: this.closeOnSelect,
                data: this.data,
                debug: this.debug,
                dir: this.dir,
                dropdownAutoWidth: this.dropdownAutoWidth,
                dropdownCssClass: this.dropdownCssClass,
                language: this.language,
                maximumInputLength: this.maximumInputLength,
                maximumSelectionLength: this.maximumSelectionLength,
                minimumInputLength: this.minimumInputLength,
                minimumResultsForSearch: this.getMinimumResultsForSearch(),
                multiple: this.multiple,
                placeholder: this.placeholder,
                selectionCssClass: this.selectionCssClass,
                selectOnClose: this.selectOnClose,
                tags: this.tags,
                width: this.width,
                scrollAfterSelect: this.scrollAfterSelect,
            };
            this.select2Configs = Object.assign(defaultConfigs, this.configs);
            this.setSelect2ConfigsOverrides();
        };
        BsSelect2Component.prototype.getMinimumResultsForSearch = function () {
            if (this.liveSearch === false) {
                return -1;
            }
            if (this.liveSearch === true) {
                return 0;
            }
            return this.minimumResultsForSearch;
        };
        BsSelect2Component.prototype.setSelect2ConfigsOverrides = function () {
            /**
             * Overrides
             *
             * - allowClear is not used in multiple select
             */
            if (this.multiple) {
                this.select2Configs = Object.assign(this.select2Configs, {
                    allowClear: false,
                });
            }
            this.select2Configs = Object.assign(this.select2Configs, this.configs);
        };
        BsSelect2Component.prototype.addOrRemoveValidationClasses = function () {
            var _this = this;
            setTimeout(function () {
                /**
                 * For a custom bootstrap theme, make the border-color property important inside this
                 * style line of css classes on your bootstrap custom main theme stylesheet,
                 * to show the invalid border color on select2 component
                 *
                 * .was-validated .custom-select:invalid, .custom-select.is-invalid {
                 *   border-color: #your-color !important;
                 * }
                 */
                var select2Selection = $(_this.select2.data('select2').$container).find('.select2-selection');
                if (_this.error) {
                    select2Selection.addClass('custom-select');
                    select2Selection.addClass('is-invalid');
                }
                else {
                    select2Selection.removeClass('custom-select');
                    select2Selection.removeClass('is-invalid');
                    if (_this.highlightOnValid && _this.touched) {
                        select2Selection.addClass('form-control');
                        select2Selection.addClass('is-valid');
                    }
                    if (!_this.highlightOnValid || !_this.touched) {
                        select2Selection.removeClass('form-control');
                        select2Selection.removeClass('is-valid');
                    }
                }
            });
        };
        BsSelect2Component.prototype.initSelectedOptions = function () {
            var selectedOptions = this.model.getValue(this.name);
            this.validate = false;
            this.select2.val(selectedOptions).trigger('change');
        };
        BsSelect2Component.prototype.disableSelect2WhenOptionsAreEmpty = function () {
            if (this.select2 !== undefined && isNull(this.options)) {
                this.select2.select2('enable', false);
            }
        };
        BsSelect2Component.prototype.enableOrDisableSelect2 = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.select2 !== undefined) {
                    if (_this.disabled === undefined)
                        _this.disabled = false;
                    _this.select2.select2('enable', [!_this.disabled]);
                }
            });
        };
        BsSelect2Component.prototype.refreshSelect2 = function () {
            var _this = this;
            if (this.select2 !== undefined) {
                setTimeout(function () {
                    _this.addFormControlClass();
                    _this.addFormControlClassDelayed();
                    _this.disableSelect2WhenOptionsAreEmpty();
                    _this.addOrRemoveValidationClasses();
                    _this.buildSelect2Configs();
                    _this.select2.select2(_this.select2Configs);
                });
            }
        };
        BsSelect2Component.prototype.addFormControlClass = function () {
            var select2Container = $(this.select2.data('select2').$container);
            select2Container.addClass('form-control');
        };
        BsSelect2Component.prototype.addFormControlClassDelayed = function () {
            var _this = this;
            setTimeout(function () {
                var select2Container = $(_this.select2.data('select2').$container);
                select2Container.addClass('form-control');
            });
        };
        BsSelect2Component.prototype.refresh = function () {
            this.addFormControlClass();
            this.addOrRemoveValidationClasses();
            this.initSelectedOptions();
        };
        return BsSelect2Component;
    }(DataInputBase));
    BsSelect2Component.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-select2',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\" attr.for=\"{{ id }}-bs\">{{\n      label\n    }}</label>\n    <div\n      class=\"input-group {{ inputSize }}\"\n      [ngClass]=\"{\n        'is-invalid': error,\n        'is-valid': touched && highlightOnValid && !error\n      }\"\n    >\n      <div *ngIf=\"startSlot\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\">{{ startSlot }}</span>\n      </div>\n      <div *ngIf=\"startSlotHtml\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\" [innerHTML]=\"startSlotHtml\"></span>\n      </div>\n\n      <select\n        #select2ElementRef\n        style=\"width: 100%\"\n        [attr.name]=\"name\"\n        class=\"form-control select2\"\n        [ngClass]=\"{\n          'has-prepend': startSlot || startSlotHtml,\n          'has-append': endSlot || endSlotHtml,\n          'is-invalid': error,\n          'is-valid': touched && highlightOnValid && !error\n        }\"\n        id=\"{{ id }}-bs\"\n      >\n        <option *ngIf=\"placeholder && !multiple\"></option>\n        <ng-container *ngFor=\"let option of options\">\n          <option\n            *ngIf=\"option.group === undefined\"\n            [attr.disabled]=\"option.disabled\"\n            [attr.selected]=\"option.selected\"\n            [value]=\"option.value\"\n          >\n            {{ option.viewValue }}\n          </option>\n\n          <optgroup *ngIf=\"option.group !== undefined\" [label]=\"option.group\">\n            <option\n              *ngFor=\"let option of option.groupValues\"\n              [attr.disabled]=\"option.disabled\"\n              [attr.selected]=\"option.selected\"\n              [value]=\"option.value\"\n            >\n              {{ option.viewValue }}\n            </option>\n          </optgroup>\n        </ng-container>\n      </select>\n\n      <div *ngIf=\"endSlot\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlot }}</span>\n      </div>\n      <div *ngIf=\"endSlotHtml\" class=\"input-group-append\">\n        <span class=\"input-group-text\" [innerHTML]=\"endSlotHtml\"></span>\n      </div>\n    </div>\n    <small *ngIf=\"help\" class=\"form-text text-muted\">\n      {{ help }}\n    </small>\n    <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ng-select2.form-group{display:block}.ng-select2 .select2-container--bootstrap .select2-selection{border:1px solid #ced4da;border-bottom-right-radius:4px!important;border-top-right-radius:4px!important;box-shadow:inset 0 0 0 transparent;font-size:16px;height:38px;line-height:1.6}.ng-select2 .select2-container--default .select2-selection.form-control,.ng-select2 .select2-selection.custom-select{padding:0}.ng-select2 .select2-selection.custom-select.is-invalid{background-image:none}.ng-select2 .select2-container--default .select2-selection--single.is-valid .select2-selection__clear{margin-right:20px}.ng-select2 .select2-container--default .select2-selection--single.is-valid{background-position:right calc(.3675em + 1.25rem) center}.ng-select2 .select2-container--bootstrap .select2-selection.custom-select.is-invalid{border-color:#dc3545!important}.ng-select2 .select2-container--bootstrap .select2-selection--single.is-valid{background-position:right calc(.3675em + 1.05rem) center;border-color:#28a745!important}.ng-select2 .select2-container--bootstrap .select2-selection--multiple.is-invalid .select2-search__field{height:inherit;padding:inherit}.ng-select2 .select2-container--bootstrap .select2-selection.custom-select{padding:6px 24px 6px 12px}.ng-select2 .input-group{flex-wrap:nowrap}.ng-select2 .select2-container>.selection{height:inherit}.ng-select2 .select2-container>.selection>.select2-selection{align-items:center;display:flex;font-size:inherit!important;height:inherit;left:-1px;position:absolute;top:-1px;width:calc(100% + 2px)}.ng-select2 .has-prepend+.select2-container>.selection>.select2-selection{border-bottom-left-radius:0;border-top-left-radius:0}.ng-select2 .has-append+.select2-container>.selection>.select2-selection{border-bottom-right-radius:0;border-top-right-radius:0}.ng-select2 .select2-container>.selection>.select2-selection>.select2-selection__rendered{border-bottom:1px solid transparent;width:100%}.ng-select2 .select2-search__field{width:100%!important}"]
                },] }
    ];
    BsSelect2Component.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }],
        select2ElementRef: [{ type: core.ViewChild, args: ['select2ElementRef', { read: core.ElementRef },] }],
        theme: [{ type: core.Input }],
        liveSearch: [{ type: core.Input }],
        options: [{ type: core.Input }],
        configs: [{ type: core.Input }],
        noResults: [{ type: core.Input }],
        allowClear: [{ type: core.Input }],
        closeOnSelect: [{ type: core.Input }],
        data: [{ type: core.Input }],
        debug: [{ type: core.Input }],
        dir: [{ type: core.Input }],
        dropdownAutoWidth: [{ type: core.Input }],
        dropdownCssClass: [{ type: core.Input }],
        language: [{ type: core.Input }],
        maximumInputLength: [{ type: core.Input }],
        maximumSelectionLength: [{ type: core.Input }],
        minimumInputLength: [{ type: core.Input }],
        minimumResultsForSearch: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        selectionCssClass: [{ type: core.Input }],
        selectOnClose: [{ type: core.Input }],
        tags: [{ type: core.Input }],
        width: [{ type: core.Input }],
        scrollAfterSelect: [{ type: core.Input }],
        selectEvent: [{ type: core.Output }],
        clearEvent: [{ type: core.Output }],
        closeEvent: [{ type: core.Output }]
    };

    var BsSelect2Module = /** @class */ (function () {
        function BsSelect2Module() {
        }
        return BsSelect2Module;
    }());
    BsSelect2Module.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsSelect2Component],
                    imports: [common.CommonModule],
                    declarations: [BsSelect2Component],
                },] }
    ];

    var BsSelectComponent = /** @class */ (function (_super) {
        __extends(BsSelectComponent, _super);
        function BsSelectComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.class = 'ng-select form-group';
            _this.configs = {};
            _this.style = '';
            _this.styleBase = 'form-control';
            _this.placeholder = ' ';
            _this.iconBase = 'fontAwesome';
            _this.shownEvent = new core.EventEmitter();
            _this.hiddenEvent = new core.EventEmitter();
            _this.onValidated = false;
            _this.onShown = false;
            _this.selectConfigs = {};
            _this.watchedProperties = [
                'configs',
                'style',
                'styleBase',
                'placeholder',
                'iconBase',
                'selectAllText',
                'deselectAllText',
                'liveSearch',
                'multiple',
                'maxOptions',
                'maxOptionsText',
                'selectedTextFormat',
                'showTick',
                'countSelectedText',
                'actionsBox',
                'header',
                'dropupAuto',
            ];
            return _this;
        }
        BsSelectComponent.prototype.ngAfterViewInit = function () {
            this.initJQueryEl();
            this.initSelect();
        };
        BsSelectComponent.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsSelectComponent.prototype.bindWatchModelEvents = function () {
            this.initSelectedOptions();
        };
        BsSelectComponent.prototype.detectPropertiesChanges = function (propName) {
            if (propName === 'disabled')
                this.enableOrDisableSelect();
            if (propName === 'options') {
                this.refreshSelect();
                this.disableSelectWhenOptionsAreEmpty();
            }
            if (propName === 'maxOptions') {
                this.refreshSelectedOptions();
            }
            if (propName === 'maxOptionsText') {
                if (isNull(this.maxOptionsText))
                    this.maxOptionsText = undefined;
            }
            if (propName === 'countSelectedText') {
                if (isNull(this.countSelectedText))
                    this.countSelectedText = undefined;
            }
            if (propName === 'deselectAllText') {
                if (isNull(this.deselectAllText))
                    this.deselectAllText = undefined;
            }
            if (propName === 'selectAllText') {
                if (isNull(this.selectAllText))
                    this.selectAllText = undefined;
            }
            if (propName === 'header') {
                if (isNull(this.header))
                    this.header = undefined;
            }
            if (this.watchedProperties.indexOf(propName) > -1) {
                this.rebuildSelect();
                // Code events that must be placed after rebuildSelect
                if (!isNull(this.maxOptions))
                    this.hideSelectAllButton();
            }
        };
        BsSelectComponent.prototype.initJQueryEl = function () {
            this.select = $(this.selectElementRef.nativeElement);
        };
        BsSelectComponent.prototype.initSelect = function () {
            this.buildSelectConfigs();
            this.select.selectpicker(this.selectConfigs);
            this.enableOrDisableSelect();
            this.addAutoCloseClass();
            this.bindEventsToSelect();
        };
        BsSelectComponent.prototype.buildSelectConfigs = function () {
            var defaultConfigs = {
                style: this.style,
                styleBase: this.styleBase,
                title: this.placeholder,
                iconBase: this.iconBase,
                selectAllText: this.selectAllText,
                deselectAllText: this.deselectAllText,
                liveSearch: this.liveSearch,
                multiple: this.multiple,
                maxOptions: this.maxOptions,
                maxOptionsText: this.maxOptionsText,
                selectedTextFormat: this.selectedTextFormat,
                showTick: this.showTick,
                countSelectedText: this.countSelectedText,
                actionsBox: this.actionsBox,
                header: this.header,
                dropupAuto: this.dropupAuto,
            };
            this.selectConfigs = Object.assign(this.selectConfigs, defaultConfigs);
            this.setSelectConfigsOverrides();
        };
        BsSelectComponent.prototype.setSelectConfigsOverrides = function () {
            this.selectConfigs = Object.assign(this.selectConfigs, this.configs);
        };
        BsSelectComponent.prototype.disableSelectWhenOptionsAreEmpty = function () {
            if (this.select !== undefined && isNull(this.options)) {
                this.select.prop('disabled', true);
                this.refreshSelect();
            }
        };
        BsSelectComponent.prototype.enableOrDisableSelect = function () {
            var _this = this;
            if (this.select !== undefined) {
                setTimeout(function () {
                    if (_this.disabled === undefined)
                        _this.disabled = false;
                    _this.select.prop('disabled', _this.disabled);
                    _this.refreshSelect();
                });
            }
        };
        BsSelectComponent.prototype.bindEventsToSelect = function () {
            var _this = this;
            this.select.on('change', this.select, function (event) {
                var value = _this.select.val();
                _this.onShown = false;
                _this.fillModel(value);
                _this.validateField();
                _this.change(event);
            });
            this.select.parent().on('shown.bs.dropdown', function (event) {
                _this.onShown = true;
                if (isNull(_this.model.getValue(_this.name))) {
                    _this.validateField();
                }
                _this.shownEvent.emit(event);
            });
            this.select.parent().on('hidden.bs.select', function (event) {
                _this.onShown = false;
                if (isNull(_this.model.getValue(_this.name))) {
                    _this.validateField();
                }
                _this.hiddenEvent.emit(event);
                _this.setOnValidated();
            });
        };
        BsSelectComponent.prototype.bindEventsAfterValidateField = function () {
            if (this.onShown === false) {
                this.addOrRemoveValidationClasses();
            }
        };
        BsSelectComponent.prototype.addAutoCloseClass = function () {
            this.select.parent().find('.dropdown-menu').addClass('js-auto-close');
        };
        BsSelectComponent.prototype.addOrRemoveValidationClasses = function () {
            var inputGroup = this.select.closest('.input-group');
            var selectButton = this.select.parent().find('button.form-control');
            if (this.error) {
                inputGroup.addClass('is-invalid');
                selectButton.addClass('is-invalid');
            }
            else {
                inputGroup.removeClass('is-invalid');
                selectButton.removeClass('is-invalid');
                if (this.highlightOnValid && this.touched) {
                    inputGroup.addClass('is-valid');
                    selectButton.addClass('is-valid');
                }
                if (!this.highlightOnValid || !this.touched) {
                    inputGroup.removeClass('is-valid');
                    selectButton.removeClass('is-valid');
                }
            }
        };
        BsSelectComponent.prototype.refreshSelectedOptions = function () {
            var _this = this;
            if (this.model !== undefined) {
                var selectedOptions_1 = [];
                var currentSelectedOptions = this.model.getValue(this.name) || [];
                currentSelectedOptions.forEach(function (value) {
                    if (selectedOptions_1.length < _this.maxOptions) {
                        selectedOptions_1.push(value);
                    }
                });
                this.fillModel(selectedOptions_1);
            }
        };
        BsSelectComponent.prototype.initSelectedOptions = function () {
            this.select.selectpicker('val', this.model.getValue(this.name));
        };
        BsSelectComponent.prototype.hideSelectAllButton = function () {
            var _this = this;
            if (this.select !== undefined) {
                setTimeout(function () {
                    _this.select
                        .parent()
                        .find('.bs-actionsbox > .btn-group > .bs-select-all')
                        .remove();
                });
            }
        };
        BsSelectComponent.prototype.refreshSelect = function () {
            var _this = this;
            if (this.select !== undefined) {
                setTimeout(function () {
                    _this.select.selectpicker('refresh');
                });
            }
        };
        BsSelectComponent.prototype.rebuildSelect = function () {
            var _this = this;
            if (this.select !== undefined) {
                setTimeout(function () {
                    _this.select.selectpicker('destroy');
                    _this.initSelect();
                    _this.addOrRemoveValidationClasses();
                    _this.initSelectedOptions();
                });
            }
        };
        BsSelectComponent.prototype.setOnValidated = function () {
            var _this = this;
            this.ngZone.run(function () {
                _this.onValidated = true;
            });
        };
        BsSelectComponent.prototype.refresh = function () {
            if (this.model.getSubmitted()) {
                this.setOnValidated();
            }
            this.addOrRemoveValidationClasses();
        };
        return BsSelectComponent;
    }(DataInputBase));
    BsSelectComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-select',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\" attr.for=\"{{ id }}-bs\">{{\n      label\n    }}</label>\n    <div\n      class=\"input-group {{ inputSize }}\"\n      [ngClass]=\"{\n        'is-invalid': error,\n        'is-valid': touched && highlightOnValid && !error\n      }\"\n    >\n      <div *ngIf=\"startSlot\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\">{{ startSlot }}</span>\n      </div>\n      <div *ngIf=\"startSlotHtml\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\" [innerHTML]=\"startSlotHtml\"></span>\n      </div>\n      <select\n        #selectElementRef\n        style=\"width: 100%\"\n        [attr.multiple]=\"multiple\"\n        [attr.name]=\"name\"\n        class=\"form-control selectpicker\"\n        [ngClass]=\"{\n          disabled: disabled,\n          'show-tick': showTick,\n          dropup: !dropupAuto\n        }\"\n        id=\"{{ id }}-bs\"\n      >\n        <ng-container *ngFor=\"let option of options\">\n          <option *ngIf=\"multiple === false\" hidden></option>\n          <option\n            *ngIf=\"option.group === undefined\"\n            [attr.disabled]=\"option.disabled\"\n            [attr.selected]=\"option.selected\"\n            [attr.data-tokens]=\"option.keyWords\"\n            [attr.title]=\"option.title\"\n            [attr.class]=\"option.class\"\n            [attr.data-icon]=\"option.icon\"\n            [attr.data-content]=\"option.content\"\n            [attr.data-subtext]=\"option.subtext\"\n            [ngStyle]=\"option.style\"\n            [attr.value]=\"option.value\"\n            [attr.data-divider]=\"option.divider\"\n          >\n            {{ option.viewValue }}\n          </option>\n\n          <optgroup\n            *ngIf=\"option.group !== undefined\"\n            [label]=\"option.group\"\n            [attr.data-max-options]=\"option.maxOptions\"\n            [attr.data-icon]=\"option.icon\"\n          >\n            <option\n              *ngFor=\"let option of option.groupValues\"\n              [attr.disabled]=\"option.disabled\"\n              [attr.selected]=\"option.selected\"\n              [attr.data-tokens]=\"option.keyWords\"\n              [attr.title]=\"option.title\"\n              [attr.class]=\"option.class\"\n              [attr.data-icon]=\"option.icon\"\n              [attr.data-content]=\"option.content\"\n              [attr.data-subtext]=\"option.subtext\"\n              [ngStyle]=\"option.style\"\n              [attr.value]=\"option.value\"\n              [attr.data-divider]=\"option.divider\"\n            >\n              {{ option.viewValue }}\n            </option>\n          </optgroup>\n        </ng-container>\n      </select>\n      <div *ngIf=\"endSlot\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlot }}</span>\n      </div>\n      <div *ngIf=\"endSlotHtml\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlotHtml }}</span>\n      </div>\n    </div>\n    <small *ngIf=\"help\" class=\"form-text text-muted\">\n      {{ help }}\n    </small>\n    <div *ngIf=\"onValidated\" class=\"invalid-feedback\">\n      {{ error }}\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["\n      .ng-select.form-group {\n        display: block;\n      }\n\n      .ng-select .bootstrap-select .dropdown-menu.inner {\n        display: initial;\n      }\n\n      .ng-select .dropdown-menu .dropdown-menu {\n        visibility: initial;\n      }\n\n      .ng-select .dropdown-toggle:focus {\n        outline: 0 !important;\n      }\n\n      .ng-select .input-group-sm > .dropdown > button,\n      .ng-select .input-group-lg > .dropdown > button {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        font-size: inherit;\n        line-height: initial;\n        height: inherit;\n      }\n\n      .ng-select .input-group-sm > .dropdown > button > .filter-option,\n      .ng-select .input-group-lg > .dropdown > button > .filter-option {\n        display: flex;\n        align-items: center;\n      }\n    "]
                },] }
    ];
    BsSelectComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }],
        selectElementRef: [{ type: core.ViewChild, args: ['selectElementRef', { read: core.ElementRef },] }],
        options: [{ type: core.Input }],
        configs: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleBase: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        iconBase: [{ type: core.Input }],
        selectAllText: [{ type: core.Input }],
        deselectAllText: [{ type: core.Input }],
        liveSearch: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        maxOptions: [{ type: core.Input }],
        maxOptionsText: [{ type: core.Input }],
        selectedTextFormat: [{ type: core.Input }],
        showTick: [{ type: core.Input }],
        countSelectedText: [{ type: core.Input }],
        actionsBox: [{ type: core.Input }],
        header: [{ type: core.Input }],
        dropupAuto: [{ type: core.Input }],
        shownEvent: [{ type: core.Output }],
        hiddenEvent: [{ type: core.Output }]
    };

    var BsSelectModule = /** @class */ (function () {
        function BsSelectModule() {
        }
        return BsSelectModule;
    }());
    BsSelectModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsSelectComponent],
                    imports: [common.CommonModule],
                    declarations: [BsSelectComponent],
                },] }
    ];

    var BsChecksComponent = /** @class */ (function (_super) {
        __extends(BsChecksComponent, _super);
        function BsChecksComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.display = 'default';
            _this.look = 'check';
            return _this;
        }
        BsChecksComponent.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsChecksComponent.prototype.bindWatchModelEvents = function () {
            this.initCheckedOptions();
        };
        BsChecksComponent.prototype.detectPropertiesChanges = function (propName) {
            if (propName === 'disabled')
                this.enableOrDisableCheckboxes();
            if (propName === 'options') {
                this.refreshCheckboxes();
            }
        };
        BsChecksComponent.prototype.bindClickEvents = function (event) {
            this.refreshCheckboxes();
            this.validateField();
            return event;
        };
        BsChecksComponent.prototype.getCheckboxesValues = function () {
            var values = [];
            this.checkboxes.forEach(function (checkboxElementRef) {
                var checkbox = checkboxElementRef.nativeElement;
                if (checkbox.checked === true) {
                    values.push(checkbox.value);
                }
            });
            return values;
        };
        BsChecksComponent.prototype.enableOrDisableCheckboxes = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.checkboxes !== undefined) {
                    _this.checkboxes.forEach(function (checkboxElementRef) {
                        var checkbox = checkboxElementRef.nativeElement;
                        checkbox.disabled = _this.disabled;
                    });
                }
            });
        };
        BsChecksComponent.prototype.initCheckedOptions = function () {
            var _this = this;
            setTimeout(function () {
                _this.checkboxes.forEach(function (checkboxElementRef) {
                    var checkbox = checkboxElementRef.nativeElement;
                    var values = _this.model.getValue(_this.name) || [];
                    // tslint:disable-next-line: triple-equals
                    var filteredValue = values.filter(function (value) { return value == checkbox.value; });
                    if (filteredValue.length) {
                        checkbox.checked = true;
                    }
                    else {
                        checkbox.checked = false;
                    }
                });
            });
        };
        BsChecksComponent.prototype.refreshCheckboxes = function () {
            if (this.checkboxes !== undefined) {
                var values = this.getCheckboxesValues();
                this.fillModel(values);
            }
        };
        BsChecksComponent.prototype.refresh = function () {
            this.initCheckedOptions();
        };
        return BsChecksComponent;
    }(DataInputBase));
    BsChecksComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-checks',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n    <div class=\"form-group\">\n      <div\n        class=\"custom-control custom-checkbox\"\n        [ngClass]=\"{\n          'custom-control-inline': display === 'inline',\n          'is-invalid': error,\n          'is-valid': touched && highlightOnValid && !error,\n          'custom-checkbox-circle': look === 'circle',\n          'custom-switch': look === 'switch'\n        }\"\n        *ngFor=\"let option of options; let i = index\"\n      >\n        <input\n          #checkbox\n          type=\"checkbox\"\n          class=\"custom-control-input\"\n          [ngClass]=\"{\n            'is-invalid': error,\n            'is-valid': touched && highlightOnValid && !error\n          }\"\n          id=\"{{ id }}-{{ i }}-bs\"\n          [value]=\"option.value\"\n          [attr.checked]=\"option.checked\"\n          [attr.disabled]=\"option.disabled\"\n          (click)=\"click($event)\"\n          (change)=\"change($event)\"\n        />\n        <label class=\"custom-control-label\" for=\"{{ id }}-{{ i }}-bs\">\n          {{ option.viewValue }}\n        </label>\n        <ng-container *ngIf=\"i === options.length - 1 && display === 'default'\">\n          <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"display === 'inline'\">\n        <div *ngIf=\"error\" class=\"invalid-feedback invalid-feedback-inline\">\n          {{ error }}\n        </div>\n      </ng-container>\n      <small *ngIf=\"help\" class=\"form-text text-muted\">\n        {{ help }}\n      </small>\n    </div>\n  ",
                    styles: ["\n      :host .custom-checkbox {\n        margin-bottom: 0.8rem;\n      }\n\n      :host .form-label {\n        margin-bottom: 0.7rem;\n      }\n\n      :host .invalid-feedback-inline {\n        margin-top: -8px;\n      }\n    "]
                },] }
    ];
    BsChecksComponent.propDecorators = {
        options: [{ type: core.Input }],
        display: [{ type: core.Input }],
        look: [{ type: core.Input }],
        checkboxes: [{ type: core.ViewChildren, args: ['checkbox',] }]
    };

    var BsChecksModule = /** @class */ (function () {
        function BsChecksModule() {
        }
        return BsChecksModule;
    }());
    BsChecksModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsChecksComponent],
                    imports: [common.CommonModule],
                    declarations: [BsChecksComponent],
                },] }
    ];

    var BsRadiosComponent = /** @class */ (function (_super) {
        __extends(BsRadiosComponent, _super);
        function BsRadiosComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.display = 'default';
            _this.look = 'radio';
            return _this;
        }
        BsRadiosComponent.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsRadiosComponent.prototype.bindWatchModelEvents = function () {
            this.initCheckedOption();
        };
        BsRadiosComponent.prototype.detectPropertiesChanges = function (propName) {
            if (propName === 'disabled')
                this.enableOrDisableRadios();
            if (propName === 'options') {
                this.refreshRadios();
            }
        };
        BsRadiosComponent.prototype.bindClickEvents = function (event) {
            this.refreshRadios();
            this.validateField();
            return event;
        };
        BsRadiosComponent.prototype.getRadiosValue = function () {
            var value;
            this.radios.forEach(function (radioElementRef) {
                var radio = radioElementRef.nativeElement;
                if (radio.checked === true) {
                    value = radio.value;
                }
            });
            return value;
        };
        BsRadiosComponent.prototype.enableOrDisableRadios = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.radios !== undefined) {
                    _this.radios.forEach(function (radioElementRef) {
                        var radio = radioElementRef.nativeElement;
                        radio.disabled = _this.disabled;
                    });
                }
            });
        };
        BsRadiosComponent.prototype.initCheckedOption = function () {
            var _this = this;
            setTimeout(function () {
                _this.radios.forEach(function (radioElementRef) {
                    var radio = radioElementRef.nativeElement;
                    var value = _this.model.getValue(_this.name);
                    // tslint:disable-next-line: triple-equals
                    if (radio.value == value) {
                        radio.checked = true;
                    }
                    else {
                        radio.checked = false;
                    }
                });
            });
        };
        BsRadiosComponent.prototype.refreshRadios = function () {
            if (this.radios !== undefined) {
                var value = this.getRadiosValue();
                this.fillModel(value);
            }
        };
        BsRadiosComponent.prototype.refresh = function () {
            this.initCheckedOption();
        };
        return BsRadiosComponent;
    }(DataInputBase));
    BsRadiosComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-radios',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n    <div class=\"form-group\">\n      <div\n        class=\"custom-control custom-radio\"\n        [ngClass]=\"{\n          'custom-control-inline': display === 'inline',\n          'is-invalid': error,\n          'is-valid': touched && highlightOnValid && !error,\n          'custom-radio-rounded': look === 'radio',\n          'custom-switch': look === 'switch'\n        }\"\n        *ngFor=\"let option of options; let i = index\"\n      >\n        <input\n          #radio\n          type=\"radio\"\n          class=\"custom-control-input\"\n          [ngClass]=\"{\n            'is-invalid': error,\n            'is-valid': touched && highlightOnValid && !error\n          }\"\n          id=\"{{ id }}-{{ i }}-bs\"\n          name=\"{{ name }}-{{ id }}-bs[]\"\n          [value]=\"option.value\"\n          [attr.checked]=\"option.checked\"\n          [attr.disabled]=\"option.disabled\"\n          (click)=\"click($event)\"\n          (change)=\"change($event)\"\n        />\n        <label class=\"custom-control-label\" for=\"{{ id }}-{{ i }}-bs\">\n          {{ option.viewValue }}\n        </label>\n        <ng-container *ngIf=\"i === options.length - 1 && display === 'default'\">\n          <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"display === 'inline'\">\n        <div *ngIf=\"error\" class=\"invalid-feedback invalid-feedback-inline\">\n          {{ error }}\n        </div>\n      </ng-container>\n      <small *ngIf=\"help\" class=\"form-text text-muted\">\n        {{ help }}\n      </small>\n    </div>\n  ",
                    styles: ["\n      :host .custom-radio {\n        margin-bottom: 0.8rem;\n      }\n\n      :host .form-label {\n        margin-bottom: 0.5rem;\n      }\n\n      :host .invalid-feedback-inline {\n        margin-top: -8px;\n      }\n    "]
                },] }
    ];
    BsRadiosComponent.propDecorators = {
        options: [{ type: core.Input }],
        display: [{ type: core.Input }],
        look: [{ type: core.Input }],
        radios: [{ type: core.ViewChildren, args: ['radio',] }]
    };

    var BsRadiosModule = /** @class */ (function () {
        function BsRadiosModule() {
        }
        return BsRadiosModule;
    }());
    BsRadiosModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsRadiosComponent],
                    imports: [common.CommonModule],
                    declarations: [BsRadiosComponent],
                },] }
    ];

    var BsFileComponent = /** @class */ (function (_super) {
        __extends(BsFileComponent, _super);
        function BsFileComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.class = 'form-group';
            _this.endSlotHtml = '<i class="fa fa-upload" aria-hidden="true"></i>';
            _this.clicked = false;
            return _this;
        }
        BsFileComponent.prototype.bindChangeEvents = function (event) {
            var _this = this;
            var customFileLabel = this.customFileLabel.nativeElement;
            var value = this.getFileOrFiles();
            this.fillModel(value);
            this.validateField();
            setTimeout(function () {
                if (value === undefined || value.length === 0) {
                    customFileLabel.innerText = _this.placeholder;
                }
                else {
                    var fileNames = _this.getFileNames(value);
                    customFileLabel.innerText = fileNames;
                }
            });
            return event;
        };
        BsFileComponent.prototype.bindFocusEvents = function (event) {
            var _this = this;
            var value = this.getFileOrFiles();
            if (this.clicked === true && value === undefined) {
                setTimeout(function () {
                    _this.validateField();
                    _this.clicked = false;
                }, 100);
            }
            return event;
        };
        BsFileComponent.prototype.clickFileInput = function () {
            this.clicked = true;
            this.fileInput.nativeElement.click();
        };
        BsFileComponent.prototype.getFileOrFiles = function () {
            var files = this.fileInput.nativeElement.files;
            return this.multiple === true ? files : files[0];
        };
        BsFileComponent.prototype.getFileNames = function (files) {
            var fileNames = '';
            if (files.length >= 1) {
                var fileItems = Object.values(files);
                fileItems.forEach(function (file) {
                    fileNames += file.name + ", ";
                });
            }
            else {
                var file = files;
                fileNames += "" + file.name;
                return fileNames;
            }
            return fileNames.slice(0, -2);
        };
        BsFileComponent.prototype.onClickHost = function () {
            this.clicked = true;
        };
        return BsFileComponent;
    }(DataInputBase));
    BsFileComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-file',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\" attr.for=\"{{ id }}-bs\">{{\n      label\n    }}</label>\n    <div\n      class=\"input-group {{ inputSize }}\"\n      [ngClass]=\"{\n        'is-invalid': error,\n        'is-valid': touched && highlightOnValid && !error\n      }\"\n    >\n      <div *ngIf=\"startSlot\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\">{{ startSlot }}</span>\n      </div>\n      <div *ngIf=\"startSlotHtml\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\" [innerHTML]=\"startSlotHtml\"></span>\n      </div>\n\n      <div class=\"custom-file\">\n        <input\n          #fileInput\n          [attr.name]=\"name\"\n          type=\"file\"\n          [attr.disabled]=\"disabled\"\n          [attr.multiple]=\"multiple\"\n          class=\"custom-file-input\"\n          [ngClass]=\"{\n            'is-invalid': error,\n            'is-valid': touched && highlightOnValid && !error\n          }\"\n          id=\"{{ id }}-bs\"\n          (change)=\"change($event)\"\n          (focus)=\"focus($event)\"\n        />\n        <label #customFileLabel class=\"custom-file-label\" for=\"{{ id }}-bs\">\n          {{ placeholder }}\n        </label>\n      </div>\n\n      <div\n        *ngIf=\"endSlot\"\n        class=\"input-group-append upload-btn\"\n        (click)=\"clickFileInput()\"\n      >\n        <span class=\"input-group-text\">{{ endSlot }}</span>\n      </div>\n      <div\n        *ngIf=\"endSlotHtml && endSlot === undefined\"\n        class=\"input-group-append\"\n        (click)=\"clickFileInput()\"\n      >\n        <span\n          class=\"input-group-text upload-btn\"\n          [innerHTML]=\"endSlotHtml\"\n        ></span>\n      </div>\n    </div>\n    <small *ngIf=\"help\" class=\"form-text text-muted\">\n      {{ help }}\n    </small>\n    <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n  ",
                    styles: ["\n      :host {\n        display: block;\n      }\n\n      :host .custom-file-label {\n        text-overflow: ellipsis;\n        overflow: hidden;\n        white-space: nowrap;\n      }\n\n      :host .custom-file-label::after {\n        content: none !important;\n      }\n\n      :host .upload-btn {\n        cursor: pointer;\n      }\n    "]
                },] }
    ];
    BsFileComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }],
        fileInput: [{ type: core.ViewChild, args: ['fileInput', { read: core.ElementRef },] }],
        customFileLabel: [{ type: core.ViewChild, args: ['customFileLabel', { read: core.ElementRef },] }],
        multiple: [{ type: core.Input }],
        onClickHost: [{ type: core.HostListener, args: ['click',] }]
    };

    var BsFileModule = /** @class */ (function () {
        function BsFileModule() {
        }
        return BsFileModule;
    }());
    BsFileModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsFileComponent],
                    imports: [common.CommonModule],
                    declarations: [BsFileComponent],
                },] }
    ];

    var BsDatepickerComponent = /** @class */ (function (_super) {
        __extends(BsDatepickerComponent, _super);
        function BsDatepickerComponent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.class = 'ng-datepicker form-group';
            _this.configs = {};
            _this.autoclose = true;
            _this.calendarWeeks = false;
            _this.clearBtn = false;
            _this.defaultViewDate = 'day';
            _this.disableTouchKeyboard = false;
            _this.enableOnReadonly = true;
            _this.forceParse = true;
            _this.format = 'yyyy-mm-dd';
            _this.immediateUpdates = false;
            _this.keyboardNavigation = true;
            _this.maxViewMode = 'centuries';
            _this.minViewMode = 'days';
            _this.multidate = false;
            _this.multidateSeparator = ', ';
            _this.orientation = 'auto';
            _this.showOnFocus = true;
            _this.startView = 'days';
            _this.showWeekDays = true;
            _this.todayBtn = false;
            _this.todayHighlight = false;
            _this.weekStart = 0;
            _this.zIndexOffset = 10;
            _this.utc = false;
            _this.autocomplete = false;
            _this.showEvent = new core.EventEmitter();
            _this.hideEvent = new core.EventEmitter();
            _this.clearDateEvent = new core.EventEmitter();
            _this.changeDateEvent = new core.EventEmitter();
            _this.changeMonthEvent = new core.EventEmitter();
            _this.changeYearEvent = new core.EventEmitter();
            _this.changeDecadeEvent = new core.EventEmitter();
            _this.changeCenturyEvent = new core.EventEmitter();
            _this.datepickerConfigs = {};
            _this.watchedProperties = [
                'configs',
                'autoclose',
                'calendarWeeks',
                'clearBtn',
                'datesDisabled',
                'daysOfWeekDisabled',
                'daysOfWeekHighlighted',
                'defaultViewDate',
                'disableTouchKeyboard',
                'enableOnReadonly',
                'endDate',
                'forceParse',
                'format',
                'immediateUpdates',
                'keyboardNavigation',
                'maxViewMode',
                'minViewMode',
                'multidate',
                'multidateSeparator',
                'orientation',
                'showOnFocus',
                'startDate',
                'startView',
                'showWeekDays',
                'title',
                'todayBtn',
                'todayHighlight',
                'weekStart',
                'zIndexOffset',
                'utc',
                'autocomplete',
            ];
            return _this;
        }
        BsDatepickerComponent.prototype.setConfigsOnInit = function () {
            this.hostId = this.id + '-host';
        };
        BsDatepickerComponent.prototype.ngAfterViewInit = function () {
            this.initJQueryEl();
            this.initDatepicker();
        };
        BsDatepickerComponent.prototype.bindFocusoutEvents = function (event) {
            var _this = this;
            var value = this.getValue();
            this.fillModel(value);
            setTimeout(function () {
                if (!isNull(value)) {
                    _this.validateField();
                }
            }, 100);
            return event;
        };
        BsDatepickerComponent.prototype.detectPropertiesChanges = function (propName) {
            if (this.datepicker !== undefined) {
                if (this.watchedProperties.indexOf(propName) > -1)
                    this.refreshDatepicker();
            }
        };
        BsDatepickerComponent.prototype.ngDoCheck = function () {
            this.watchModel();
        };
        BsDatepickerComponent.prototype.bindWatchModelEvents = function () {
            this.initSelectedDate();
        };
        BsDatepickerComponent.prototype.initSelectedDate = function () {
            this.setValue();
        };
        BsDatepickerComponent.prototype.initJQueryEl = function () {
            this.datepicker = $(this.inputElementRef.nativeElement);
        };
        BsDatepickerComponent.prototype.initDatepicker = function () {
            this.buildDatepickerConfigs();
            this.datepicker.datepicker(this.datepickerConfigs);
            this.bindEventsToDatepicker();
        };
        BsDatepickerComponent.prototype.buildDatepickerConfigs = function () {
            var defaultConfigs = {
                autoclose: this.autoclose,
                container: '#' + this.hostId,
                calendarWeeks: this.calendarWeeks,
                clearBtn: this.clearBtn,
                defaultViewDate: this.defaultViewDate,
                disableTouchKeyboard: this.disableTouchKeyboard,
                datesDisabled: this.datesDisabled,
                daysOfWeekDisabled: this.daysOfWeekDisabled,
                daysOfWeekHighlighted: this.daysOfWeekHighlighted,
                enableOnReadonly: this.enableOnReadonly,
                endDate: this.endDate,
                forceParse: this.forceParse,
                format: this.format,
                immediateUpdates: this.immediateUpdates,
                keyboardNavigation: this.keyboardNavigation,
                maxViewMode: this.maxViewMode,
                minViewMode: this.minViewMode,
                multidate: this.multidate,
                multidateSeparator: this.multidateSeparator,
                orientation: this.orientation,
                showOnFocus: this.showOnFocus,
                startDate: this.startDate,
                startView: this.startView,
                showWeekDays: this.showWeekDays,
                title: this.title,
                todayBtn: this.todayBtn,
                todayHighlight: this.todayHighlight,
                weekStart: this.weekStart,
                zIndexOffset: this.zIndexOffset,
            };
            this.datepickerConfigs = Object.assign(this.datepickerConfigs, defaultConfigs);
            this.setDatepickerConfigsOverrides();
        };
        BsDatepickerComponent.prototype.setDatepickerConfigsOverrides = function () {
            this.datepickerConfigs = Object.assign(this.datepickerConfigs, this.configs);
        };
        BsDatepickerComponent.prototype.bindEventsToDatepicker = function () {
            var _this = this;
            this.datepicker.on('show', function (event) {
                _this.showEvent.emit(event);
            });
            this.datepicker.on('hide', function (event) {
                var value = _this.getValue();
                if (isNull(value)) {
                    _this.validateField();
                }
                _this.hideEvent.emit(event);
            });
            this.datepicker.on('clearDate', function (event) {
                _this.clearDateEvent.emit(event);
            });
            this.datepicker.on('changeDate', function (event) {
                var value = _this.getValue();
                _this.fillModel(value);
                _this.validateField();
                _this.changeDateEvent.emit(event);
            });
            this.datepicker.on('changeMonth', function (event) {
                _this.changeMonthEvent.emit(event);
            });
            this.datepicker.on('changeYear', function (event) {
                _this.changeYearEvent.emit(event);
            });
            this.datepicker.on('changeDecade', function (event) {
                _this.changeDecadeEvent.emit(event);
            });
            this.datepicker.on('changeCentury', function (event) {
                _this.changeCenturyEvent.emit(event);
            });
            /**
             * Disables autocomplete
             */
            if (this.autocomplete === false) {
                this.datepicker.attr('autocomplete', 'off');
            }
        };
        BsDatepickerComponent.prototype.getValue = function () {
            if (this.multidate === true) {
                return this.getDates();
            }
            return this.getDate();
        };
        BsDatepickerComponent.prototype.setValue = function () {
            var value = this.model.getValue(this.name);
            if (value !== undefined) {
                if (this.multidate === true) {
                    this.setDates(value);
                }
                this.setDate(value);
            }
        };
        BsDatepickerComponent.prototype.setDate = function (value) {
            if (this.utc === true) {
                this.datepicker.datepicker('setUTCDate', value);
            }
            this.datepicker.datepicker('setDate', value);
        };
        BsDatepickerComponent.prototype.setDates = function (value) {
            if (this.utc === true) {
                this.datepicker.datepicker('setUTCDates', value);
            }
            this.datepicker.datepicker('setDates', value);
        };
        BsDatepickerComponent.prototype.getDate = function () {
            if (this.utc === true) {
                return this.datepicker.datepicker('getUTCDate');
            }
            return this.datepicker.datepicker('getDate');
        };
        BsDatepickerComponent.prototype.getDates = function () {
            if (this.utc === true) {
                return this.datepicker.datepicker('getUTCDates');
            }
            return this.datepicker.datepicker('getDates');
        };
        BsDatepickerComponent.prototype.refreshDatepicker = function () {
            this.datepicker.datepicker('destroy');
            this.initDatepicker();
            this.datepicker.datepicker('update', this.value);
        };
        BsDatepickerComponent.prototype.refresh = function () {
            this.datepicker.datepicker('update', this.value);
        };
        return BsDatepickerComponent;
    }(DataInputBase));
    BsDatepickerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-datepicker',
                    template: "\n    <label class=\"form-label\" *ngIf=\"label\" attr.for=\"{{ id }}-bs\">{{\n      label\n    }}</label>\n    <div\n      class=\"input-group {{ inputSize }}\"\n      [ngClass]=\"{\n        'is-invalid': error,\n        'is-valid': touched && highlightOnValid && !error\n      }\"\n    >\n      <div *ngIf=\"startSlot\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\">{{ startSlot }}</span>\n      </div>\n      <div *ngIf=\"startSlotHtml\" class=\"input-group-prepend\">\n        <span class=\"input-group-text\" [innerHTML]=\"startSlotHtml\"></span>\n      </div>\n      <input\n        #inputElementRef\n        [attr.name]=\"name\"\n        [attr.value]=\"value\"\n        [attr.placeholder]=\"placeholder\"\n        [attr.disabled]=\"disabled\"\n        [attr.readonly]=\"readonly\"\n        class=\"form-control\"\n        [ngClass]=\"{\n          'is-invalid': error,\n          'is-valid': touched && highlightOnValid && !error\n        }\"\n        id=\"{{ id }}-bs\"\n        (focusout)=\"focusout($event)\"\n      />\n\n      <div *ngIf=\"endSlot\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlot }}</span>\n      </div>\n      <div *ngIf=\"endSlotHtml\" class=\"input-group-append\">\n        <span class=\"input-group-text\">{{ endSlotHtml }}</span>\n      </div>\n    </div>\n    <small *ngIf=\"help\" class=\"form-text text-muted\">\n      {{ help }}\n    </small>\n    <div *ngIf=\"error\" class=\"invalid-feedback\">{{ error }}</div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["\n      .ng-datepicker {\n        position: relative;\n      }\n\n      .ng-datepicker.form-group {\n        display: block;\n      }\n\n      .ng-datepicker .datepicker td {\n        padding: 5px;\n      }\n\n      .ng-datepicker .datepicker.dropdown-menu {\n        font-size: 14px;\n      }\n    "]
                },] }
    ];
    BsDatepickerComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class',] }],
        hostId: [{ type: core.HostBinding, args: ['id',] }],
        inputElementRef: [{ type: core.ViewChild, args: ['inputElementRef', { read: core.ElementRef },] }],
        configs: [{ type: core.Input }],
        autoclose: [{ type: core.Input }],
        calendarWeeks: [{ type: core.Input }],
        clearBtn: [{ type: core.Input }],
        datesDisabled: [{ type: core.Input }],
        daysOfWeekDisabled: [{ type: core.Input }],
        daysOfWeekHighlighted: [{ type: core.Input }],
        defaultViewDate: [{ type: core.Input }],
        disableTouchKeyboard: [{ type: core.Input }],
        enableOnReadonly: [{ type: core.Input }],
        endDate: [{ type: core.Input }],
        forceParse: [{ type: core.Input }],
        format: [{ type: core.Input }],
        immediateUpdates: [{ type: core.Input }],
        keyboardNavigation: [{ type: core.Input }],
        maxViewMode: [{ type: core.Input }],
        minViewMode: [{ type: core.Input }],
        multidate: [{ type: core.Input }],
        multidateSeparator: [{ type: core.Input }],
        orientation: [{ type: core.Input }],
        showOnFocus: [{ type: core.Input }],
        startDate: [{ type: core.Input }],
        startView: [{ type: core.Input }],
        showWeekDays: [{ type: core.Input }],
        title: [{ type: core.Input }],
        todayBtn: [{ type: core.Input }],
        todayHighlight: [{ type: core.Input }],
        weekStart: [{ type: core.Input }],
        zIndexOffset: [{ type: core.Input }],
        utc: [{ type: core.Input }],
        autocomplete: [{ type: core.Input }],
        showEvent: [{ type: core.Output }],
        hideEvent: [{ type: core.Output }],
        clearDateEvent: [{ type: core.Output }],
        changeDateEvent: [{ type: core.Output }],
        changeMonthEvent: [{ type: core.Output }],
        changeYearEvent: [{ type: core.Output }],
        changeDecadeEvent: [{ type: core.Output }],
        changeCenturyEvent: [{ type: core.Output }]
    };

    var BsDatepickerModule = /** @class */ (function () {
        function BsDatepickerModule() {
        }
        return BsDatepickerModule;
    }());
    BsDatepickerModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [BsDatepickerComponent],
                    imports: [common.CommonModule],
                    declarations: [BsDatepickerComponent],
                },] }
    ];

    var NgFormsModule = /** @class */ (function () {
        function NgFormsModule() {
        }
        return NgFormsModule;
    }());
    NgFormsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [],
                    imports: [
                        BsInputModule,
                        BsSelect2Module,
                        BsSelectModule,
                        BsChecksModule,
                        BsRadiosModule,
                        DataGroupsModule,
                        BsFileModule,
                        BsDatepickerModule,
                    ],
                    exports: [
                        BsInputModule,
                        BsSelect2Module,
                        BsSelectModule,
                        BsChecksModule,
                        BsRadiosModule,
                        DataGroupsModule,
                        BsFileModule,
                        BsDatepickerModule,
                    ],
                },] }
    ];

    /*
     * Public API Surface of ng-forms
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BaseModel = BaseModel;
    exports.BaseModelArray = BaseModelArray;
    exports.DataInputBase = DataInputBase;
    exports.NgFormsModule = NgFormsModule;
    exports.ɵa = BsInputModule;
    exports.ɵb = BsInputComponent;
    exports.ɵc = BsSelect2Module;
    exports.ɵd = BsSelect2Component;
    exports.ɵe = BsSelectModule;
    exports.ɵf = BsSelectComponent;
    exports.ɵg = BsChecksModule;
    exports.ɵh = BsChecksComponent;
    exports.ɵi = BsRadiosModule;
    exports.ɵj = BsRadiosComponent;
    exports.ɵk = DataGroupsModule;
    exports.ɵl = DataGroupsComponent;
    exports.ɵm = DataGroupComponent;
    exports.ɵn = BsFileModule;
    exports.ɵo = BsFileComponent;
    exports.ɵp = BsDatepickerModule;
    exports.ɵq = BsDatepickerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-forms.umd.js.map
