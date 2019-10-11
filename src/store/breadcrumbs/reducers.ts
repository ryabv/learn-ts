import { GET_BREADCRUMBS } from './actions';

const defaultState = [{
        name: 'arcadia',
        link: '/arcadia'
    },
    {
        name: 'testFolder',
        link: '/test-repository/testFolder'
    }
];

type Action = {
    type: string,
    payload: {}
}

export const breadcrumbsReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case GET_BREADCRUMBS:
            return action.payload;

        default:
            return state;
    }
}