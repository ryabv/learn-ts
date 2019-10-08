import { GET_REPOSITORIES, SET_ACTIVE_REPOSITORY } from './actions';

const defaultState = {
    names: ['test-repository', 'Arc', 'My repository', 'Devtools-repository']
};

export const repositoriesListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_REPOSITORIES:
            return {...state, names: action.payload.names }
        case SET_ACTIVE_REPOSITORY:
            return {...state, activeLink: action.payload }
        default:
            return state;
    }
}