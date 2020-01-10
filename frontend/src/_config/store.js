import { createStore, applyMiddleware, combineReducers  } from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from '../_reducer/authentication.reducer';

import watchAuth from '../_saga/authentication.saga';

const rootReducer = combineReducers({
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);

export default store;