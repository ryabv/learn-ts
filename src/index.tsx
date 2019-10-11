import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './components/App/App';
import FilePage from './components/FilePage/FilePage';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render( 
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/folderpage" component={App}/>
                <Route path="/filepage" component={FilePage}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);