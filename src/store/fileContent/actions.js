export const GET_FILE_CONTENT_FROM_SERVER_SUCCESS = 'GET_FILE_CONTENT_FROM_SERVER_SUCCESS';

export function filesFetchFileContentSuccess(files) {
    console.log(files);
    return {
        type: GET_FILE_CONTENT_FROM_SERVER_SUCCESS,
        payload: files
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
            .then(files => {
                dispatch(filesFetchFileContentSuccess(files))
            })
            .catch(err => {
                console.log(err.message);
            });
    }
}