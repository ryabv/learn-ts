export const GET_BREADCRUMBS = 'GET_BREADCRUMBS';

export function breadcrumbsFetchDataSuccess(breadcrumbs: {}): {} {
    console.log(breadcrumbs);
    return {
        type: GET_BREADCRUMBS,
        payload: breadcrumbs
    }
}

export function breadcrumbsFetchData(url: string) {
    return (dispatch: (cb: {}) => void) => {
        fetch(url)
            .then(response => {
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then((breadcrumbs: {}) => {
                dispatch(breadcrumbsFetchDataSuccess(breadcrumbs))
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}