import { GET_FILE_CONTENT_FROM_SERVER_SUCCESS } from './actions';

const defaultState = ['Hello world'];

export const fileContentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_FILE_CONTENT_FROM_SERVER_SUCCESS:
            console.log('REDUCER', state);
            return action.payload
        default:
            return state;
    }
}