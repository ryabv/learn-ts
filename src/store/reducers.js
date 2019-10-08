import { combineReducers } from 'redux';
import { filesListReducer } from './filesList/reducers';
import { breadcrumbsReducer } from './breadcrumbs/reducers';
import { fileContentReducer } from './fileContent/reducers';
import { repositoriesListReducer } from './repositories/reducers';


export default combineReducers({
    filesList: filesListReducer,
    fileContent: fileContentReducer,
    breadcrumbs: breadcrumbsReducer,
    repositoriesList: repositoriesListReducer
});