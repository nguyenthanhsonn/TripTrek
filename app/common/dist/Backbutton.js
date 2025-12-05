"use strict";
exports.__esModule = true;
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var BackButton = function () {
    var router = navigation_1.useRouter();
    return (react_1["default"].createElement("button", { onClick: function () { return router.back(); }, className: 'fixed cursor-pointer z-10 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 hover:text-sky-500 flex px-2 bg-sky-500 text-white transition-all duration-300 items-center gap-2 top-10 left-10' },
        react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faArrowLeft, className: 'w-6 h-6' })));
};
exports["default"] = BackButton;
