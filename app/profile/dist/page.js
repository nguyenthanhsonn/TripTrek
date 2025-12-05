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
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var navigation_1 = require("next/navigation");
var BackButton_1 = require("../common/BackButton");
var useAuth_1 = require("@/hooks/useAuth");
var react_2 = require("react");
var useProfile_1 = require("@/hooks/useProfile");
var SettingsPage = function () {
    var _a = react_1.useState({
        username: "",
        email: "",
        phone: "",
        avatar: ""
    }), profile = _a[0], setProfile = _a[1];
    var _b = react_1.useState(null), isEditing = _b[0], setIsEditing = _b[1];
    var _c = react_1.useState(""), editValue = _c[0], setEditValue = _c[1];
    var _d = react_1.useState(""), avatar = _d[0], setAvatar = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(false), loadingPage = _f[0], setLoadingPage = _f[1];
    var _g = react_1.useState(false), submitLoading = _g[0], setSubmitLoading = _g[1];
    var handleLogout = useAuth_1["default"]().handleLogout;
    var _h = useProfile_1["default"](), getProfile = _h.getProfile, updateProfile = _h.updateProfile;
    var handleEdit = function (field, value) {
        setIsEditing(field);
        setEditValue(value);
    };
    var handleSave = function (field) {
        setProfile(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = editValue, _a)));
        });
        setIsEditing(null);
        setEditValue("");
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSubmitLoading(true);
                    return [4 /*yield*/, updateProfile({
                            avatar: avatar || profile.avatar,
                            phone: profile.phone,
                            username: profile.username
                        })];
                case 1:
                    _a.sent();
                    setSubmitLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var uploadAvatar = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, formData, res, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    setLoading(true);
                    formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "demo_frame_print"); // đổi bằng preset của bạn
                    return [4 /*yield*/, fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + "/image/upload", {
                            method: "POST",
                            body: formData
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    setAvatar(data.url);
                    setProfile(function (prev) { return (__assign(__assign({}, prev), { avatar: data.url })); });
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // Sửa lại hàm renderEditableField để input có thể edit được
    var renderEditableField = function (field, label, icon, type) {
        if (type === void 0) { type = "text"; }
        var isCurrentlyEditing = isEditing === field;
        var currentValue = (profile === null || profile === void 0 ? void 0 : profile[field]) || "";
        return (react_1["default"].createElement("div", { className: "rounded-xl p-6 shadow-sm border border-gray-100" },
            react_1["default"].createElement("div", { className: "flex items-center gap-3 mb-4" },
                react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: icon, className: "text-sky-500" })),
                react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-800" }, label)),
            isCurrentlyEditing ? (react_1["default"].createElement("div", { className: "flex items-center gap-3 z-10" },
                react_1["default"].createElement("input", { type: type, value: editValue, onChange: function (e) { return setEditValue(e.target.value); }, className: "flex-1 pl-2 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent", autoFocus: true }),
                react_1["default"].createElement("button", { onClick: function () { return handleSave(field); }, className: "text-xl text-sky-500 rounded-md p-0 bg-transparent hover:bg-transparent", style: { background: "none" } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSave, className: "mr-2", size: "sm" })))) : (react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                react_1["default"].createElement("p", { className: "text-gray-700" }, currentValue),
                react_1["default"].createElement("button", { onClick: function () { return handleEdit(field, currentValue); }, className: "px-3 py-1 text-sky-500 hover:text-sky-600 cursor-pointer transition-colors" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEdit }))))));
    };
    var router = navigation_1.useRouter();
    react_2.useEffect(function () {
        var fetchProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingPage(true);
                        return [4 /*yield*/, getProfile()];
                    case 1:
                        profile = _a.sent();
                        setProfile(profile);
                        setAvatar(profile === null || profile === void 0 ? void 0 : profile.avatar);
                        setLoadingPage(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchProfile();
    }, []);
    if (loadingPage) {
        return (react_1["default"].createElement("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4" }),
                react_1["default"].createElement("p", { className: "text-gray-600" }, "\u0110ang t\u1EA3i th\u00F4ng tin..."))));
    }
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gray-50 py-8" },
        react_1["default"].createElement(BackButton_1["default"], null),
        react_1["default"].createElement("div", { className: "max-w-4xl mx-auto px-6" },
            react_1["default"].createElement("div", { className: "text-center mb-8" },
                react_1["default"].createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "C\u00E0i \u0111\u1EB7t t\u00E0i kho\u1EA3n"),
                react_1["default"].createElement("p", { className: "text-gray-600" }, "Qu\u1EA3n l\u00FD th\u00F4ng tin c\u00E1 nh\u00E2n v\u00E0 c\u00E0i \u0111\u1EB7t t\u00E0i kho\u1EA3n")),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20" },
                react_1["default"].createElement("div", { className: "lg:col-span-1" },
                    react_1["default"].createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6" },
                        react_1["default"].createElement("div", { className: "text-center" },
                            react_1["default"].createElement("div", { className: "relative inline-block mb-4" },
                                react_1["default"].createElement("div", { className: "w-32 h-32 rounded-full overflow-hidden border-4 border-sky-100 relative" }, loading ? (react_1["default"].createElement("div", { className: "w-full h-full flex items-center justify-center" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSpinner, spin: true, size: "lg" }))) : (react_1["default"].createElement(image_1["default"], { src: avatar || "/defaultAvatar.jpg", alt: "Avatar", width: 128, height: 128, className: "object-cover rounded-full", onError: function () {
                                        console.warn("Avatar failed to load, falling back to default");
                                        setAvatar("");
                                    }, unoptimized: true }))),
                                react_1["default"].createElement("button", { onClick: function () { var _a; return (_a = document.getElementById("avatarInput")) === null || _a === void 0 ? void 0 : _a.click(); }, className: "absolute bottom-1 right-1 w-7 h-7 cursor-pointer bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCamera })),
                                react_1["default"].createElement("input", { type: "file", id: "avatarInput", accept: "image/*", className: "hidden", onChange: uploadAvatar })),
                            react_1["default"].createElement("h2", { className: "text-xl font-semibold text-gray-800 mb-2" }, profile === null || profile === void 0 ? void 0 : profile.username)))),
                react_1["default"].createElement("div", { className: "lg:col-span-2" },
                    react_1["default"].createElement("div", { className: "space-y-6" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { className: "text-xl font-semibold text-gray-800 mb-4" }, "Th\u00F4ng tin c\u00E1 nh\u00E2n"),
                            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                                renderEditableField("username", "Họ và tên", free_solid_svg_icons_1.faUser, "text"),
                                renderEditableField("phone", "Số điện thoại", free_solid_svg_icons_1.faPhone, "tel")),
                            react_1["default"].createElement("div", { className: "rounded-xl mt-5 p-6 shadow-sm border border-gray-100 flex items-center gap-3" },
                                react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope, className: "text-sky-500" })),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-800" }, "Email"),
                                    react_1["default"].createElement("p", { className: "text-gray-600" }, (profile === null || profile === void 0 ? void 0 : profile.email) || "Không có email")))),
                        react_1["default"].createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border flex items-center gap-2 text-sky-500 border-gray-100" },
                            react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLock }),
                            react_1["default"].createElement("button", { onClick: function () { return router.push("/profile/changePassword"); }, className: "w-full text-left cursor-pointer px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors" },
                                react_1["default"].createElement("span", { className: "text-gray-700" }, "\u0110\u1ED5i m\u1EADt kh\u1EA9u"))),
                        react_1["default"].createElement("div", { className: "flex justify-between mt-10 gap-4" },
                            react_1["default"].createElement("button", { onClick: function () {
                                    handleLogout();
                                }, className: "px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium" }, "\u0110\u0103ng xu\u1EA5t"),
                            react_1["default"].createElement("button", { onClick: function () { return handleSubmit(); }, className: "px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium" }, submitLoading ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSpinner, spin: true }))) : ("Lưu thay đổi")))))))));
};
exports["default"] = SettingsPage;
