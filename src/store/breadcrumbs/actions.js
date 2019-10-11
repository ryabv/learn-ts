"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_BREADCRUMBS = 'GET_BREADCRUMBS';
function breadcrumbsFetchDataSuccess(breadcrumbs) {
    console.log(breadcrumbs);
    return {
        type: exports.GET_BREADCRUMBS,
        payload: breadcrumbs
    };
}
exports.breadcrumbsFetchDataSuccess = breadcrumbsFetchDataSuccess;
function breadcrumbsFetchData(url) {
    return function (dispatch) {
        fetch(url)
            .then(function (response) {
            return response;
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (breadcrumbs) {
            dispatch(breadcrumbsFetchDataSuccess(breadcrumbs));
        })
            .catch(function (err) {
            console.log(err.message);
        });
    };
}
exports.breadcrumbsFetchData = breadcrumbsFetchData;
