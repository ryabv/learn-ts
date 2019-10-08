export const GET_FILES_DATA_FROM_SERVER_SUCCESS = 'GET_FILES_DATA_FROM_SERVER_SUCCESS';
export const GET_FILES_CONTENT_DATA_FROM_SERVER_SUCCESS = 'GET_FILES_CONTENT_DATA_FROM_SERVER_SUCCESS';

export function filesFetchDataSuccess(files) {
    return {
        type: GET_FILES_DATA_FROM_SERVER_SUCCESS,
        payload: files
    }
}

export function filesContentFetchDataSuccess(content) {
    return {
        type: GET_FILES_CONTENT_DATA_FROM_SERVER_SUCCESS,
        payload: content
    }
}

export function filesFetchFolderContent(url) {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then(files => {
                dispatch(filesFetchDataSuccess(files))
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}

export function filesFetchFileContent(url) {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                return response;
            })
            .then(response => {
                return response.json();
            })
            .then(content => {
                dispatch(filesContentFetchDataSuccess(content))
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}