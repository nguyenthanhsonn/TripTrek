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
var TravelSearching_1 = require("@/app/common/TravelSearching");
var HeroSection_1 = require("@/app/common/HeroSection");
var react_1 = require("react");
var react_2 = require("swiper/react");
var modules_1 = require("swiper/modules");
require("swiper/css");
require("swiper/css/navigation");
var FamousTour_1 = require("@/app/common/FamousTour");
var FamousDestination_1 = require("@/app/common/FamousDestination");
var FamousTour_2 = require("@/app/common/FamousTour");
var BackButton_1 = require("@/app/common/BackButton");
var useData_1 = require("@/hooks/useData");
var page = function () {
    var _a = react_1.useState([]), result = _a[0], setResult = _a[1];
    var _b = react_1.useState([]), popularTours = _b[0], setPopularTours = _b[1];
    var _c = react_1.useState([]), popularDestinations = _c[0], setPopularDestinations = _c[1];
    var _d = useData_1["default"](), getPopularTours = _d.getPopularTours, getPopularDestinations = _d.getPopularDestinations;
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var tours, destinations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getPopularTours()];
                    case 1:
                        tours = _a.sent();
                        console.log(tours);
                        return [4 /*yield*/, getPopularDestinations()];
                    case 2:
                        destinations = _a.sent();
                        setPopularDestinations(destinations || []);
                        setPopularTours(tours || []);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var handleRenderResult = function (tours) {
        setResult(tours || []);
    };
    var chunkArray = function (arr, size) {
        var chunks = [];
        for (var i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };
    return (react_1["default"].createElement("div", { className: 'bg-white' },
        react_1["default"].createElement(BackButton_1["default"], null),
        react_1["default"].createElement(HeroSection_1["default"], { backgroundUrl: '/mountain.jpg', heightClass: 'h-[700px]' },
            react_1["default"].createElement("div", { className: "text-center mt-10" },
                react_1["default"].createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4" }, "T\u00ECm chuy\u1EBFn \u0111i c\u1EE7a b\u1EA1n"),
                react_1["default"].createElement("p", { className: "text-white mb-6" }, "Ch\u1ECDn \u0111i\u1EC3m \u0111\u1EBFn, th\u1EDDi gian v\u00E0 m\u1EE9c gi\u00E1 ph\u00F9 h\u1EE3p"),
                react_1["default"].createElement(TravelSearching_1["default"], { handleResult: handleRenderResult }))),
        result.length > 0 && (react_1["default"].createElement("section", { className: "mx-auto px-6 py-12" },
            react_1["default"].createElement("div", { className: "relative " },
                react_1["default"].createElement(react_2.Swiper, { modules: [modules_1.Navigation, modules_1.Pagination], navigation: { prevEl: '.fam-prev', nextEl: '.fam-next' }, pagination: { clickable: true }, spaceBetween: 20, slidesPerView: 1 }, chunkArray(result, 4).map(function (page, pageIndex) { return (react_1["default"].createElement(react_2.SwiperSlide, { key: pageIndex },
                    react_1["default"].createElement("div", { className: "grid grid-cols-4 gap-6" }, page.map(function (item) { return (react_1["default"].createElement(FamousTour_2.CardItem, { key: item.id, item: item, id: item.id })); })))); }))))),
        react_1["default"].createElement(FamousDestination_1["default"], { items: popularDestinations }),
        react_1["default"].createElement(FamousTour_1["default"], { items: popularTours })));
};
exports["default"] = page;
