import { fork, all } from 'redux-saga/effects'
import authenticationSaga from './authentication.js';
import notesSaga from './notes.js';

function* rootSaga() {
    yield all([
        fork(authenticationSaga),
        fork(notesSaga),
    ])
}
export default rootSaga