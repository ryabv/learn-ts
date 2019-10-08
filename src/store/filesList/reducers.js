import { GET_FILES_DATA_FROM_SERVER_SUCCESS } from './actions';

const defaultState = [{
        name: 'api',
        type: 'folder',
        link: '/',
        lastCommit: 'd53dsv',
        commitMessage: '[vcs] move http to arc',
        committer: 'noxoommo',
        updated: '4s ago',
        content: '',
        diff: '',
    },
    {
        name: 'api',
        type: 'folder',
        link: '/',
        lastCommit: 'd53dsv',
        commitMessage: '[vcs] move http to arc',
        committer: 'noxoommo',
        updated: '4s ago',
        content: '',
        diff: '',
    }
];

export const filesListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_FILES_DATA_FROM_SERVER_SUCCESS:
            return action.payload
        default:
            return state;
    }
}