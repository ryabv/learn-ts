"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Breadcrumbs = /** @class */ (function (_super) {
    __extends(Breadcrumbs, _super);
    function Breadcrumbs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Breadcrumbs.prototype.getLinks = function () {
        if (!this.props.data) {
            console.log('no breadcrumbs');
            return;
        }
        return this.props.data.map(function (breadcrumb, i, arr) {
            var activeClass = '';
            if (i === arr.length - 1) {
                activeClass = 'Breadcrumbs-Link_active';
            }
            return (react_1.default.createElement("a", { key: i, className: "Breadcrumbs-Link " + activeClass, href: breadcrumb.link }, breadcrumb.name));
        });
    };
    Breadcrumbs.prototype.render = function () {
        return (react_1.default.createElement("section", { className: "Breadcrumbs" },
            react_1.default.createElement("a", { className: 'Breadcrumbs-Link Breadcrumbs-Link_active', href: '/' }, "test-repository"),
            this.getLinks()));
    };
    return Breadcrumbs;
}(react_1.default.Component));
exports.default = Breadcrumbs;
