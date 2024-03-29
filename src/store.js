import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];
const composeEnhancers = null || compose;

const store = createStore(
    rootReducer,
    initialState,

    //dev
    // compose(
    //     applyMiddleware(...middleware),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )

    //prod
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;

