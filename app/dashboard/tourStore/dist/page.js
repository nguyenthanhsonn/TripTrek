'use client';
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
var react_1 = require("react");
var image_1 = require("next/image");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var BookingStatus_1 = require("@/app/enum/BookingStatus");
var BackButton_1 = require("@/app/common/BackButton");
var navigation_1 = require("next/navigation");
var DeleteModal_1 = require("@/app/Modal/DeleteModal");
var useBooking_1 = require("@/hooks/useBooking");
var useProfile_1 = require("@/hooks/useProfile");
var currency = function (n) { return n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); };
var formatDate = function (iso) { return new Date(iso).toLocaleDateString('vi-VN'); };
var statusColor = {
    PENDING: 'bg-amber-100 text-amber-700',
    SUCCESS: 'bg-green-100 text-green-700',
    DENY: 'bg-red-100 text-red-700'
};
var statusLabel = {
    PENDING: 'Đang chờ',
    SUCCESS: 'Thành công',
    DENY: 'Từ chối'
};
var Page = function () {
    var _a = react_1.useState('all'), tab = _a[0], setTab = _a[1];
    var searchParams = navigation_1.useSearchParams();
    var _b = react_1.useState(false), showDeleteModal = _b[0], setShowDeleteModal = _b[1];
    var _c = react_1.useState(0), deleteId = _c[0], setDeleteId = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var reset = searchParams.get('reset');
    var cancelBooking = useBooking_1["default"]().cancelBooking;
    var getMyBookings = useProfile_1["default"]().getMyBookings;
    var _e = react_1.useState([]), myBookings = _e[0], setMyBookings = _e[1];
    react_1.useEffect(function () {
        if (reset) {
            setTab('all');
        }
    }, [reset]);
    var bookings = react_1.useMemo(function () {
        if (tab === 'all')
            return myBookings;
        return myBookings === null || myBookings === void 0 ? void 0 : myBookings.filter(function (b) { return b.status === tab; });
    }, [tab, myBookings]);
    var fetchBookings = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMyBookings()];
                case 1:
                    res = _a.sent();
                    console.log("res", res);
                    setMyBookings(res);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchBookings();
        console.log("myBookings", myBookings);
    }, []);
    var handleDeleteSelected = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, cancelBooking({ id: deleteId.toString() })];
                case 1:
                    _a.sent();
                    setDeleteId(0);
                    setLoading(false);
                    fetchBookings();
                    setShowDeleteModal(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gray-50 py-10" },
        react_1["default"].createElement(BackButton_1["default"], null),
        react_1["default"].createElement("div", { className: "max-w-6xl mx-auto px-6" },
            react_1["default"].createElement("div", { className: "mb-8" },
                react_1["default"].createElement("h1", { className: "text-3xl font-bold text-gray-800" }, "V\u00E9 \u0111\u00E3 \u0111\u1EB7t"),
                react_1["default"].createElement("p", { className: "text-gray-600 mt-1" }, "Xem tr\u1EA1ng th\u00E1i v\u00E0 chi ti\u1EBFt c\u00E1c v\u00E9 \u0111ang \u0111\u1EB7t c\u1EE7a b\u1EA1n")),
            react_1["default"].createElement("div", { className: 'flex justify-between items-start gap-4' },
                react_1["default"].createElement("div", { className: "flex gap-2 mb-6 overflow-x-auto" }, ['all', BookingStatus_1.EBookingStatus.PENDING, BookingStatus_1.EBookingStatus.SUCCESS, BookingStatus_1.EBookingStatus.DENY].map(function (k) { return (react_1["default"].createElement("button", { key: k, onClick: function () { return setTab(k); }, className: "px-4 py-2 rounded-full border transition-colors whitespace-nowrap " + (tab === k ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50') }, k === 'all' ? 'Tất cả' : statusLabel[k])); }))),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-4" }, (!bookings || bookings.length === 0) ? (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100" },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTicket, className: "text-5xl text-gray-300 mb-4" }),
                react_1["default"].createElement("h2", { className: "text-xl font-semibold text-gray-700 mb-2" }, "B\u1EA1n ch\u01B0a c\u00F3 v\u00E9 n\u00E0o \u0111\u01B0\u1EE3c \u0111\u1EB7t"),
                react_1["default"].createElement("p", { className: "text-gray-500" }, "H\u00E3y \u0111\u1EB7t tour \u0111\u1EC3 tr\u1EA3i nghi\u1EC7m nh\u1EEFng chuy\u1EBFn \u0111i tuy\u1EC7t v\u1EDDi!"))) : (bookings === null || bookings === void 0 ? void 0 : bookings.map(function (b) {
                return (react_1["default"].createElement("div", { key: b.id, className: "relative group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 cursor-pointer" },
                    react_1["default"].createElement("div", { className: "flex flex-col md:flex-row" },
                        react_1["default"].createElement("div", { className: "relative md:w-56 h-40 md:h-auto flex-shrink-0" },
                            react_1["default"].createElement(image_1["default"], { src: (b === null || b === void 0 ? void 0 : b.images[0]) || '', alt: b === null || b === void 0 ? void 0 : b.name, fill: true, className: "object-cover" })),
                        react_1["default"].createElement("div", { className: "flex-1 p-5 pl-16 md:pl-5" },
                            react_1["default"].createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                                react_1["default"].createElement("h3", { className: "text-xl font-semibold text-gray-800" }, b === null || b === void 0 ? void 0 : b.name),
                                react_1["default"].createElement("span", { className: "px-3 py-1 rounded-full text-sm " + statusColor[b.status] }, statusLabel[b.status])),
                            react_1["default"].createElement("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700" },
                                react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLocationDot, className: "text-sky-500" }),
                                    react_1["default"].createElement("span", null, b === null || b === void 0 ? void 0 : b.destination)),
                                react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faClock, className: "text-sky-500" }),
                                    react_1["default"].createElement("span", null,
                                        formatDate(b === null || b === void 0 ? void 0 : b.startDate),
                                        " \u2192 ",
                                        formatDate(b === null || b === void 0 ? void 0 : b.endDate))),
                                react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTicket, className: "text-sky-500" }),
                                    react_1["default"].createElement("span", null,
                                        "Gi\u00E1: ",
                                        react_1["default"].createElement("strong", { className: "text-gray-900" }, currency(b === null || b === void 0 ? void 0 : b.price))))),
                            react_1["default"].createElement("div", { className: "mt-4 flex justify-between items-center gap-3 " },
                                (b === null || b === void 0 ? void 0 : b.status) === BookingStatus_1.EBookingStatus.PENDING ? (react_1["default"].createElement("span", { className: 'inline-flex items-center gap-2 text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg' },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faClock }),
                                    " \u0110ang ch\u1EDD x\u00E1c nh\u1EADn")) : (b === null || b === void 0 ? void 0 : b.status) === BookingStatus_1.EBookingStatus.SUCCESS ? (react_1["default"].createElement("span", { className: "inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircleCheck }),
                                    " \u0110\u00E3 x\u00E1c nh\u1EADn")) : (react_1["default"].createElement("span", { className: "inline-flex items-center gap-2 text-red-700 bg-red-50 px-3 py-2 rounded-lg" },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faXmark }),
                                    " V\u00E9 \u0111\u00E3 b\u1ECB t\u1EEB ch\u1ED1i")),
                                react_1["default"].createElement("button", { className: 'flex items-center gap-2 cursor-pointer text-sky-500 px-4 py-2 rounded-lg', onClick: function () { setShowDeleteModal(true); setDeleteId(b === null || b === void 0 ? void 0 : b.id); } },
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: 'text-red-500 hover:text-red-600', icon: free_solid_svg_icons_1.faTrash }),
                                    react_1["default"].createElement("span", { className: 'text-gray-700 hover:text-red-600' }, "X\u00F3a")))))));
            })))),
        showDeleteModal &&
            react_1["default"].createElement(DeleteModal_1["default"], { setShowDeleteModal: setShowDeleteModal, handleDeleteSelected: handleDeleteSelected, loading: loading, title: "X\u00E1c nh\u1EADn xo\u00E1 v\u00E9", description: "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\u00E1 v\u00E9 \u0111\u00E3 ch\u1ECDn? H\u00E0nh \u0111\u1ED9ng n\u00E0y kh\u00F4ng th\u1EC3 ho\u00E0n t\u00E1c." })));
};
exports["default"] = Page;
