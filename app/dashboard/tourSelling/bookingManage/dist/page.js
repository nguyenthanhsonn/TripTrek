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
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var image_1 = require("next/image");
var BackButton_1 = require("@/app/common/BackButton");
var BookingStatus_1 = require("@/app/enum/BookingStatus");
var DeleteModal_1 = require("@/app/Modal/DeleteModal");
var useProfile_1 = require("@/hooks/useProfile");
var currency = function (n) {
    return n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
var formatDate = function (iso) { return new Date(iso).toLocaleDateString("vi-VN"); };
function BookingManagementPage() {
    var _this = this;
    var _a = react_1.useState([]), bookings = _a[0], setBookings = _a[1];
    var _b = react_1.useState("all"), activeTab = _b[0], setActiveTab = _b[1];
    var _c = react_1.useState(""), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = react_1.useState([]), selectedBookings = _d[0], setSelectedBookings = _d[1];
    var _e = react_1.useState(false), showDeleteModal = _e[0], setShowDeleteModal = _e[1];
    var _f = react_1.useState(null), deleteTarget = _f[0], setDeleteTarget = _f[1];
    var _g = react_1.useState(null), deleteId = _g[0], setDeleteId = _g[1];
    var _h = react_1.useState(false), loading = _h[0], setLoading = _h[1];
    var _j = useProfile_1["default"](), changeBookingStatus = _j.changeBookingStatus, showSellerOrders = _j.showSellerOrders, deleteSellerOrder = _j.deleteSellerOrder;
    var filteredBookings = bookings.filter(function (booking) {
        var matchesTab = activeTab === "all" || booking.status === activeTab;
        var matchesSearch = booking.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });
    var fetchBookings = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showSellerOrders()];
                case 1:
                    res = _a.sent();
                    setBookings(res);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchBookings();
    }, []);
    var getStatusColor = function (status) {
        switch (status) {
            case BookingStatus_1.EBookingStatus.PENDING:
                return "bg-yellow-100 text-yellow-800";
            case BookingStatus_1.EBookingStatus.SUCCESS:
                return "bg-green-100 text-green-800";
            case BookingStatus_1.EBookingStatus.DENY:
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    var getStatusText = function (status) {
        switch (status) {
            case BookingStatus_1.EBookingStatus.PENDING:
                return "Chờ duyệt";
            case BookingStatus_1.EBookingStatus.SUCCESS:
                return "Đã duyệt";
            case BookingStatus_1.EBookingStatus.DENY:
                return "Từ chối";
            default:
                return "Không xác định";
        }
    };
    var handleApprove = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, changeBookingStatus({ id: id, status: BookingStatus_1.EBookingStatus.SUCCESS })];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setBookings(function (prev) {
                            return prev.map(function (booking) {
                                return booking.id === Number(id) ? __assign(__assign({}, booking), { status: BookingStatus_1.EBookingStatus.SUCCESS }) : booking;
                            });
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDeny = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, changeBookingStatus({ id: id, status: BookingStatus_1.EBookingStatus.DENY })];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setBookings(function (prev) {
                            return prev.map(function (booking) {
                                return booking.id === Number(id) ? __assign(__assign({}, booking), { status: BookingStatus_1.EBookingStatus.DENY }) : booking;
                            });
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) {
        setDeleteId(id);
        setDeleteTarget("single");
        setShowDeleteModal(true);
    };
    var handleSelectAll = function () {
        if (selectedBookings.length === filteredBookings.length) {
            setSelectedBookings([]);
        }
        else {
            setSelectedBookings(filteredBookings.map(function (booking) { return booking.id.toString(); }));
        }
    };
    var handleSelectBooking = function (id) {
        setSelectedBookings(function (prev) {
            return prev.includes(id)
                ? prev.filter(function (bookingId) { return bookingId !== id; })
                : __spreadArrays(prev, [id]);
        });
    };
    var handleDeleteSelected = function () {
        setDeleteTarget("multiple");
        setShowDeleteModal(true);
    };
    var confirmDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(deleteTarget === "single" && deleteId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, deleteSellerOrder({ bookingIds: [deleteId] })];
                case 1:
                    _a.sent();
                    setBookings(function (prev) { return prev.filter(function (booking) { return booking.id !== Number(deleteId); }); });
                    return [3 /*break*/, 4];
                case 2:
                    if (!(deleteTarget === "multiple")) return [3 /*break*/, 4];
                    return [4 /*yield*/, deleteSellerOrder({ bookingIds: selectedBookings })];
                case 3:
                    _a.sent();
                    setBookings(function (prev) {
                        return prev.filter(function (booking) { return !selectedBookings.includes(booking.id.toString()); });
                    });
                    setSelectedBookings([]);
                    _a.label = 4;
                case 4:
                    setShowDeleteModal(false);
                    setDeleteTarget(null);
                    setDeleteId(null);
                    return [2 /*return*/];
            }
        });
    }); };
    var tabs = [
        { key: "all", label: "Tất cả", count: bookings.length },
        {
            key: BookingStatus_1.EBookingStatus.PENDING,
            label: "Chờ duyệt",
            count: bookings.filter(function (b) { return b.status === BookingStatus_1.EBookingStatus.PENDING; }).length
        },
        {
            key: BookingStatus_1.EBookingStatus.SUCCESS,
            label: "Đã duyệt",
            count: bookings.filter(function (b) { return b.status === BookingStatus_1.EBookingStatus.SUCCESS; }).length
        },
        {
            key: BookingStatus_1.EBookingStatus.DENY,
            label: "Từ chối",
            count: bookings.filter(function (b) { return b.status === BookingStatus_1.EBookingStatus.DENY; }).length
        },
    ];
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" },
        React.createElement(BackButton_1["default"], null),
        React.createElement("div", { className: "max-w-7xl mx-auto px-6 py-8" },
            React.createElement("div", { className: "mb-8" },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Qu\u1EA3n l\u00FD \u0111\u1EB7t tour"),
                React.createElement("p", { className: "text-gray-600" }, "Xem v\u00E0 qu\u1EA3n l\u00FD c\u00E1c \u0111\u1EB7t tour c\u1EE7a kh\u00E1ch h\u00E0ng")),
            React.createElement("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6" },
                React.createElement("div", { className: "flex flex-col md:flex-row gap-4 items-center justify-between" },
                    React.createElement("div", { className: "relative text-black flex-1 max-w-md" },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSearch, className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
                        React.createElement("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn kh\u00E1ch, tour, \u0111\u1ECBa \u0111i\u1EC3m...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" })),
                    selectedBookings.length > 0 && (React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("span", { className: "text-sm text-gray-600" },
                            "\u0110\u00E3 ch\u1ECDn ",
                            selectedBookings.length,
                            " booking"),
                        React.createElement("button", { onClick: handleDeleteSelected, className: "flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" },
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTrashAlt }),
                            "X\u00F3a \u0111\u00E3 ch\u1ECDn"))))),
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 mb-6" },
                React.createElement("div", { className: "flex border-b border-gray-200" }, tabs.map(function (tab) { return (React.createElement("button", { key: tab.key, onClick: function () { return setActiveTab(tab.key); }, className: "flex-1 px-6 py-4 text-center font-medium transition-colors " + (activeTab === tab.key
                        ? "text-sky-600 border-b-2 border-sky-600 bg-sky-50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50") },
                    tab.label,
                    React.createElement("span", { className: "ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full" }, tab.count))); }))),
            React.createElement("div", { className: "space-y-4" },
                filteredBookings.length > 0 && (React.createElement("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100" },
                    React.createElement("label", { className: "flex items-center gap-3 cursor-pointer" },
                        React.createElement("input", { type: "checkbox", checked: selectedBookings.length === filteredBookings.length &&
                                filteredBookings.length > 0, onChange: handleSelectAll, className: "w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" }),
                        React.createElement("span", { className: "font-medium text-gray-700" },
                            "Ch\u1ECDn t\u1EA5t c\u1EA3 (",
                            filteredBookings.length,
                            ")")))),
                filteredBookings.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100" },
                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFilter, className: "text-4xl text-gray-400 mb-4" }),
                    React.createElement("h3", { className: "text-lg font-medium text-gray-800 mb-2" }, "Kh\u00F4ng c\u00F3 booking n\u00E0o"),
                    React.createElement("p", { className: "text-gray-600" }, "Kh\u00F4ng t\u00ECm th\u1EA5y booking n\u00E0o ph\u00F9 h\u1EE3p v\u1EDBi b\u1ED9 l\u1ECDc hi\u1EC7n t\u1EA1i"))) : (filteredBookings.map(function (booking) { return (React.createElement("div", { key: booking.id, className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("input", { type: "checkbox", checked: selectedBookings.includes(booking.id.toString()), onChange: function () { return handleSelectBooking(booking.id.toString()); }, className: "w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1" }),
                        React.createElement("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0" },
                            React.createElement(image_1["default"], { src: booking.images, alt: booking.name, width: 80, height: 80, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "flex-1 min-w-0" },
                            React.createElement("div", { className: "flex items-start justify-between mb-3" },
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-1" }, booking.name),
                                    React.createElement("div", { className: "flex items-center gap-4 text-sm text-gray-600" },
                                        React.createElement("span", { className: "flex items-center gap-1" },
                                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faMapMarkerAlt }),
                                            booking.destination),
                                        React.createElement("span", { className: "flex items-center gap-1" },
                                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCalendar }),
                                            formatDate(booking.startDate),
                                            " -",
                                            " ",
                                            formatDate(booking.endDate)))),
                                React.createElement("div", { className: "text-right" },
                                    React.createElement("div", { className: "text-xl font-bold text-sky-600 mb-1" }, currency(booking.price)),
                                    React.createElement("span", { className: "px-3 py-1 rounded-full text-xs font-medium " + getStatusColor(booking.status) }, getStatusText(booking.status)))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" },
                                React.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, className: "text-sky-500" }),
                                    React.createElement("span", { className: "text-gray-700" }, booking.userName)),
                                React.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPhone, className: "text-sky-500" }),
                                    React.createElement("span", { className: "text-gray-700" }, booking.phone)),
                                React.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope, className: "text-sky-500" }),
                                    React.createElement("span", { className: "text-gray-700" }, booking.email))),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                booking.status === BookingStatus_1.EBookingStatus.PENDING && (React.createElement(React.Fragment, null,
                                    React.createElement("button", { onClick: function () { return handleApprove(booking.id.toString()); }, className: "flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm" },
                                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCheck }),
                                        "Duy\u1EC7t"),
                                    React.createElement("button", { onClick: function () { return handleDeny(booking.id.toString()); }, className: "flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm" },
                                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTimes }),
                                        "T\u1EEB ch\u1ED1i"))),
                                React.createElement("button", { onClick: function () { return handleDelete(booking.id.toString()); }, className: "flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm" },
                                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTrash }),
                                    "X\u00F3a")))))); })))),
        showDeleteModal && (React.createElement(DeleteModal_1["default"], { loading: loading, setShowDeleteModal: setShowDeleteModal, handleDeleteSelected: confirmDelete, title: "X\u00E1c nh\u1EADn xo\u00E1 booking", description: deleteTarget === "single" ? "Bạn có chắc chắn muốn xóa booking này không?" : "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a " + selectedBookings.length + " booking \u0111\u00E3 ch\u1ECDn kh\u00F4ng?" }))));
}
exports["default"] = BookingManagementPage;
