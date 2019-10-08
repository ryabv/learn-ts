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

export const breadcrumbsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_BREADCRUMBS:
            return action.payload;

        default:
            return state;
    }
}