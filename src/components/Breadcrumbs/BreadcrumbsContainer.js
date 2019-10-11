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
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/breadcrumbs/actions");
var Breadcrumbs_1 = __importDefault(require("./Breadcrumbs"));
var react_router_dom_1 = require("react-router-dom");
var BreadcrumbsContainer = /** @class */ (function (_super) {
    __extends(BreadcrumbsContainer, _super);
    function BreadcrumbsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // componentDidMount() {
    //     this.props.getBreadcrumbs('http://localhost:3001/api/repos/test-repository/tree/master')
    // }
    BreadcrumbsContainer.prototype.render = function () {
        return (react_1.default.createElement(Breadcrumbs_1.default, { data: [{ link: 'test', name: 'test' }] }));
    };
    return BreadcrumbsContainer;
}(react_1.default.Component));
var putStateToProps = function (state) {
    return {
        breadcrumbs: state.breadcrumbs.breadcrumbs,
    };
};
var putDispatchToProps;
putDispatchToProps = function (dispatch) {
    return {
        getBreadcrumbs: function (url) { dispatch(actions_1.breadcrumbsFetchData(url)); }
    };
};
exports.default = react_router_dom_1.withRouter(react_redux_1.connect(putStateToProps, putDispatchToProps)(BreadcrumbsContainer));
