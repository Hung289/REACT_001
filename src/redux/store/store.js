import rootSaga from "../saga/index"
import rootReducer from "../reducer/index"
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux';
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer,
    compose(applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
sagaMiddleware.run(rootSaga)

