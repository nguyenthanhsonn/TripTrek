"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var navigation_1 = require("next/navigation");
var useBooking_1 = require("@/hooks/useBooking");
var useData_1 = require("@/hooks/useData");
var CreateNewTour = function () {
    var _a = react_1.useState({
        name: "",
        description: "",
        price: 0,
        startDate: "",
        endDate: "",
        destinationId: 0,
        guideName: "",
        images: []
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState([]), destinationList = _b[0], setDestinationList = _b[1];
    var createTour = useBooking_1["default"]().createTour;
    var getAllDestinations = useData_1["default"]().getAllDestinations;
    react_1.useEffect(function () {
        var fetchDestinations = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAllDestinations()];
                    case 1:
                        res = _a.sent();
                        setDestinationList(res || []);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchDestinations();
    }, []);
    var _c = react_1.useState([]), imagePreview = _c[0], setImagePreview = _c[1];
    var _d = react_1.useState(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = react_1.useState(""), errors = _e[0], setErrors = _e[1];
    var _f = react_1.useState([
        false,
        false,
        false,
        false,
    ]), loadingImages = _f[0], setLoadingImages = _f[1];
    var fileInputRef = react_1.useRef(null);
    // Để biết đang upload cho index nào
    var _g = react_1.useState(null), uploadingIdx = _g[0], setUploadingIdx = _g[1];
    var handleInputChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleImageUpload = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, preset, formDataUpload, res, data_1, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file || uploadingIdx === null)
                        return [2 /*return*/];
                    // Set loading for this index
                    setLoadingImages(function (prev) {
                        var arr = __spreadArrays(prev);
                        arr[uploadingIdx] = true;
                        return arr;
                    });
                    preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
                    formDataUpload = new FormData();
                    formDataUpload.append("file", file);
                    formDataUpload.append("upload_preset", preset); // đổi bằng preset của bạn
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + "/image/upload", {
                            method: "POST",
                            body: formDataUpload
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _b.sent();
                    // Cập nhật imagePreview và formData.image tại vị trí uploadingIdx
                    setImagePreview(function (prev) {
                        var arr = __spreadArrays(prev);
                        arr[uploadingIdx] = data_1.url;
                        return arr;
                    });
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { images: (function () {
                            var arr = __spreadArrays(prev.images);
                            arr[uploadingIdx] = data_1.url;
                            return arr;
                        })() })); });
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingImages(function (prev) {
                        var arr = __spreadArrays(prev);
                        arr[uploadingIdx] = false;
                        return arr;
                    });
                    setUploadingIdx(null);
                    if (fileInputRef.current)
                        fileInputRef.current.value = "";
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var triggerFileInput = function (idx) {
        var _a;
        setUploadingIdx(idx);
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var removeImage = function (idx) {
        setImagePreview(function (prev) {
            var arr = __spreadArrays(prev);
            arr[idx] = undefined;
            return arr;
        });
        setFormData(function (prev) { return (__assign(__assign({}, prev), { image: (function () {
                var arr = __spreadArrays(prev.images);
                arr[idx] = undefined;
                return arr;
            })() })); });
        setLoadingImages(function (prev) {
            var arr = __spreadArrays(prev);
            arr[idx] = false;
            return arr;
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    var validateForm = function () {
        if (!formData.name.trim()) {
            setErrors("Tên tour là bắt buộc");
            return false;
        }
        if (!formData.destinationId) {
            setErrors("Vui lòng chọn điểm đến");
            return false;
        }
        if (formData.price <= 0) {
            setErrors("Giá tour phải lớn hơn 0");
            return false;
        }
        if (!formData.startDate.trim()) {
            setErrors("Ngày bắt đầu là bắt buộc");
            return false;
        }
        if (!formData.endDate.trim()) {
            setErrors("Ngày kết thúc là bắt buộc");
            return false;
        }
        // Kiểm tra có ít nhất 1 ảnh
        if (!formData.images.filter(Boolean).length) {
            setErrors("Vui lòng tải lên ảnh tour");
            return false;
        }
        if (!formData.description.trim()) {
            setErrors("Mô tả tour là bắt buộc");
            return false;
        }
        if (!formData.guideName.trim()) {
            setErrors("Tên hướng dẫn viên là bắt buộc");
            return false;
        }
        setErrors("");
        return true;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    console.log("formData", formData);
                    setSubmitting(true);
                    return [4 /*yield*/, createTour({
                            data: formData
                        })];
                case 1:
                    res = _a.sent();
                    if (res) {
                        router.push("/dashboard/tourSelling");
                    }
                    setSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var router = navigation_1.useRouter();
    var currency = function (n) {
        return n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gray-50 py-10" },
        react_1["default"].createElement("div", { className: "max-w-4xl mx-auto px-6" },
            react_1["default"].createElement("button", { onClick: function () { return router.push("/"); }, className: 'fixed cursor-pointer z-10 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 hover:text-sky-500 flex px-2 bg-sky-500 text-white transition-all duration-300 items-center gap-2 top-10 left-10' },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faArrowLeft, className: 'w-6 h-6' })),
            react_1["default"].createElement("div", { className: "text-center mb-8" },
                react_1["default"].createElement("h1", { className: "text-3xl font-bold text-gray-800" }, "T\u1EA1o tour m\u1EDBi"),
                react_1["default"].createElement("p", { className: "text-gray-600 mt-1" }, "\u0110i\u1EC1n th\u00F4ng tin chi ti\u1EBFt \u0111\u1EC3 t\u1EA1o tour h\u1EA5p d\u1EABn")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-8" },
                react_1["default"].createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" },
                    react_1["default"].createElement("div", { className: "space-y-6 text-black" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTag, className: "mr-2 text-sky-500" }),
                                "T\u00EAn tour *"),
                            react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) { return handleInputChange("name", e.target.value); }, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500", placeholder: "V\u00ED d\u1EE5: Kh\u00E1m ph\u00E1 \u0110\u00E0 N\u1EB5ng 5N4\u0110" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faMapMarkerAlt, className: "mr-2 text-sky-500" }),
                                "\u0110i\u1EC3m \u0111\u1EBFn *"),
                            react_1["default"].createElement("select", { value: formData.destinationId || "", onChange: function (e) {
                                    return handleInputChange("destinationId", Number(e.target.value));
                                }, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500" },
                                react_1["default"].createElement("option", { value: "" }, "Ch\u1ECDn \u0111i\u1EC3m \u0111\u1EBFn"),
                                destinationList.map(function (dest) { return (react_1["default"].createElement("option", { key: dest.id, value: dest.id }, dest.name)); }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTag, className: "mr-2 text-sky-500" }),
                                "Gi\u00E1 tour (VN\u0110) *"),
                            react_1["default"].createElement("input", { type: "number", value: formData.price, onChange: function (e) {
                                    return handleInputChange("price", Number(e.target.value));
                                }, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 ", placeholder: "V\u00ED d\u1EE5: 5000000", min: "0" }),
                            formData.price > 0 && (react_1["default"].createElement("p", { className: "text-sm text-gray-600 mt-1" },
                                "Hi\u1EC3n th\u1ECB: ",
                                currency(formData.price)))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, className: "mr-2 text-sky-500" }),
                                "T\u00EAn h\u01B0\u1EDBng d\u1EABn vi\u00EAn"),
                            react_1["default"].createElement("input", { type: "text", value: formData.guideName, onChange: function (e) {
                                    return handleInputChange("guideName", e.target.value);
                                }, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500", placeholder: "T\u00EAn h\u01B0\u1EDBng d\u1EABn vi\u00EAn (kh\u00F4ng b\u1EAFt bu\u1ED9c)" }))),
                    react_1["default"].createElement("div", { className: "space-y-6 text-black" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCalendar, className: "mr-2 text-sky-500" }),
                                "L\u1ECBch tr\u00ECnh *"),
                            react_1["default"].createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" },
                                react_1["default"].createElement("input", { type: "date", value: formData.startDate, onChange: function (e) {
                                        return handleInputChange("startDate", e.target.value);
                                    }, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 " }),
                                react_1["default"].createElement("input", { type: "date", value: formData.endDate, onChange: function (e) {
                                        return handleInputChange("endDate", e.target.value);
                                    }, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 " }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFileText, className: "mr-2 text-sky-500" }),
                                "M\u00F4 t\u1EA3 tour *"),
                            react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) {
                                    return handleInputChange("description", e.target.value);
                                }, rows: 4, className: "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none ", placeholder: "M\u00F4 t\u1EA3 chi ti\u1EBFt v\u1EC1 tour, \u0111i\u1EC3m n\u1ED5i b\u1EADt..." })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUpload, className: "mr-2 text-sky-500" }),
                                "\u1EA2nh tour *"),
                            react_1["default"].createElement("div", { className: "grid grid-cols-2 gap-4" }, [0, 1, 2, 3].map(function (idx) { return (react_1["default"].createElement("div", { key: idx, className: "relative w-full h-40" }, imagePreview[idx] ? (react_1["default"].createElement("div", { className: "w-full h-full rounded-lg overflow-hidden border border-gray-300" },
                                react_1["default"].createElement(image_1["default"], { src: imagePreview[idx], alt: "Tour preview " + (idx + 1), fill: true, className: "object-cover" }),
                                react_1["default"].createElement("button", { type: "button", onClick: function () { return removeImage(idx); }, className: "absolute top-2 right-2 cursor-pointer hover:bg-red-500 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { size: "xs", icon: free_solid_svg_icons_1.faTimes })),
                                loadingImages[idx] && (react_1["default"].createElement("div", { className: "absolute inset-0 bg-white/60 flex items-center justify-center z-20" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSpinner, spin: true, className: "text-sky-500 text-2xl" }))))) : (react_1["default"].createElement("div", { onClick: function () { return triggerFileInput(idx); }, className: "w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors relative" }, loadingImages[idx] ? (react_1["default"].createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-white/60 z-10" },
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSpinner, spin: true, className: "text-sky-500 text-2xl" }))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCamera, className: "text-4xl text-gray-400 mb-2" }),
                                react_1["default"].createElement("p", { className: "text-gray-600" }, "Nh\u1EA5p \u0111\u1EC3 t\u1EA3i \u1EA3nh tour"),
                                react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "JPG, PNG (t\u1ED1i \u0111a 5MB)"))))))); })),
                            react_1["default"].createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden" })))),
                errors && react_1["default"].createElement("p", { className: "text-red-600 text-sm mt-1" }, errors),
                react_1["default"].createElement("div", { className: "mt-8 pt-6 border-t border-gray-200" },
                    react_1["default"].createElement("div", { className: "flex gap-4 justify-end" },
                        react_1["default"].createElement("button", { onClick: function () { return router.back(); }, className: "px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" }, "H\u1EE7y"),
                        react_1["default"].createElement("button", { type: "submit", disabled: submitting, className: "px-8 py-3 rounded-lg text-white font-medium transition-colors " + (submitting
                                ? "bg-sky-300 cursor-not-allowed"
                                : "bg-sky-500 hover:bg-sky-600") }, submitting ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus, className: "mr-2" }),
                            "\u0110ang t\u1EA1o...")) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus, className: "mr-2" }),
                            "T\u1EA1o tour")))))))));
};
exports["default"] = CreateNewTour;
