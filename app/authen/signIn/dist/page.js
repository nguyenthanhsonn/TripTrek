"use client";
"use strict";
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
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var useAuth_1 = require("../../../hooks/useAuth"); // Giả sử useAuth chứa logic đăng nhập
var BackButton_1 = require("@/app/common/BackButton");
var navigation_1 = require("next/navigation"); // Để sử dụng điều hướng
function LoginPage() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), isShowPassword = _c[0], setIsShowPassword = _c[1];
    var login = useAuth_1["default"]().login;
    var router = navigation_1.useRouter(); // Sử dụng hook router
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, login(email, password)];
                case 1:
                    user = _a.sent();
                    if (user) {
                        // Nếu đăng nhập thành công, kiểm tra quyền admin
                        if (user.role === true) {
                            // Nếu là admin, điều hướng đến trang admin
                            router.push("/admin"); // Hoặc bất kỳ route nào của admin
                        }
                        else {
                            // Nếu không phải admin, chuyển về trang mặc định hoặc trang khác
                            router.push("/"); // Ví dụ trang người dùng thông thường
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "flex min-h-screen items-center justify-center bg-gray-50" },
        React.createElement(BackButton_1["default"], null),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden" },
            React.createElement("div", { className: "flex flex-col items-center justify-center p-10 bg-gray-100" },
                React.createElement("h2", { className: "text-2xl font-semibold text-gray-700 mb-2" }, "Kh\u00E1m ph\u00E1 th\u1EBF gi\u1EDBi v\u1EDBi"),
                React.createElement("h1", { className: "text-5xl font-extrabold text-sky-500" }, "TripTrek"),
                React.createElement(image_1["default"], { src: "/image 47.png" // file nằm trong /public
                    , alt: "Traveler", className: "w-64 mt-10", width: 256, height: 256, priority: true })),
            React.createElement("div", { className: "p-10 flex flex-col justify-center animate-fade-in", style: { animation: "fadeIn 0.8s ease" } },
                React.createElement("h2", { className: "text-2xl font-bold text-sky-500 mb-6" }, "\u0110\u0103ng nh\u1EADp"),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-gray-600 mb-2" }, "Email"),
                        React.createElement("input", { type: "text", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400", placeholder: "Nh\u1EADp email", required: true, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", title: "Vui l\u00F2ng nh\u1EADp email h\u1EE3p l\u1EC7" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-gray-600 mb-2" }, "M\u1EADt kh\u1EA9u"),
                        React.createElement("input", { type: isShowPassword ? "text" : "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400", placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u" })),
                    React.createElement("div", { className: "flex justify-between text-sm" },
                        React.createElement(link_1["default"], { href: "/profile/otpCheck", className: "text-sky-500 hover:underline" }, "Qu\u00EAn m\u1EADt kh\u1EA9u?")),
                    React.createElement("button", { type: "submit", className: "w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition" }, "\u0110\u0103ng nh\u1EADp")),
                React.createElement("p", { className: "mt-6 text-sm text-gray-500" },
                    "Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?",
                    " ",
                    React.createElement(link_1["default"], { href: "/authen/signUp", className: "text-sky-500 hover:underline" }, "\u0110\u0103ng k\u00FD")))),
        React.createElement("style", { jsx: true, global: true }, "\n        @keyframes fadeIn {\n          from {\n            opacity: 0;\n            transform: translateY(30px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        .animate-fade-in {\n          animation: fadeIn 0.8s ease;\n        }\n      ")));
}
exports["default"] = LoginPage;
