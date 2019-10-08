export const GET_REPOSITORIES = 'GET_REPOSITORIES';
export const SET_ACTIVE_REPOSITORY = 'SET_ACTIVE_REPOSITORY';

export function setActiveRepository(name) {
    return {
        type: SET_ACTIVE_REPOSITORY,
        payload: name
    }
}

export function repositoriesListSuccess(repositories) {
    return {
        type: GET_REPOSITORIES,
        payload: repositories
    }
}

export function repositoriesList(url) {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then(repositories => {
                dispatch(repositoriesListSuccess(repositories))
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}