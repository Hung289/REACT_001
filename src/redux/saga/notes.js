import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import http from '../../api/http';
import { NotificationError, NotificationSuccess } from '../../common/Notification';
import { hideLoading, showLoading } from '../action/loading';
import { addNoteErr, fetchNoteRequest, fetchNoteErr, fetchNoteSuccess, hideConfirm, hidePopup } from '../action/notes';
import * as Type from "../constants/Actiontype";
function* fetchNote(payload) {
    // console.log("payload", payload)
    try {
        // yield put(showLoading())
        const rs = yield call(() =>
            http.get(`/api/notes?keyword=${payload.data ? payload.data : ""}&page=${payload.pageIndex}&limit=3`)
        )
        if (rs?.status === 200) {
            // console.log(rs)
            yield put(fetchNoteSuccess(rs?.data))
            // yield put(hideLoading())
        }

    } catch (error) {
        console.log(error);
        yield put(fetchNoteErr(error))
    }
}

function* addNote(payload) {
    try {
        const { title, color } = payload.data
        yield put(showLoading())
        const rs = yield call(() =>
            http.post('/api/notes', { title, color })
        )
        yield put(hidePopup())
        if (rs?.status === 200) {
            yield put(hideLoading())
            yield put(fetchNoteRequest("", 1))
            NotificationSuccess("", rs?.data?.msg)
        }
    } catch (error) {
        console.log(error);
        NotificationError("", error.msg)
        yield put(addNoteErr(error))
        yield put(hideLoading())
    }
}
function* removeNote(payload) {
    // console.log(payload)
    try {
        yield put(showLoading())
        const rs = yield call(() =>
            http.delete(`/api/notes/${payload.id}`)
        )
        if (rs?.status === 200) {
            yield put(hideLoading())
            yield put(fetchNoteRequest("", payload.page))
            yield put(hideConfirm())
            NotificationSuccess("", rs?.data?.msg)
        }
    } catch (error) {
        console.log(error);
        NotificationError("", error.msg)
        yield put(addNoteErr(error))
        yield put(hideLoading())
    }

}
function* updateNote(payload) {
    // console.log("payload", payload)
    try {
        const { title, content, color, id, type } = payload.data
        // yield put(showLoading())
        const rs = yield call(() =>
            http.put(`/api/notes/${id}`, { title, content, color })
        )
        if (rs?.status === 200) {
            // yield put(hideLoading())
            yield put(fetchNoteRequest("", payload.page))
            yield put(hidePopup())
            if (payload.typeTitle) {
                NotificationSuccess("", "Cập nhật tiêu đề note thành công")
            }
        }
    } catch (error) {
        // console.log(error);
        NotificationError("", error.msg)
        yield put(addNoteErr(error))
        yield put(hideLoading())
    }
}

function* checkNote(payload) {
    try {
        const { id, data } = payload
        yield put(showLoading())
        const rs = yield call(() =>
            http.post(`/api/notes/${id}`, { isCompleted: data })
        )
        if (rs?.status === 200) {
            yield put(hideLoading())
            yield put(fetchNoteRequest("", payload.page))
            // yield put(hidePopup())
            // NotificationSuccess("", rs?.data?.msg)
        }
    } catch (error) {
        console.log(error);
        NotificationError("", error.msg)
        yield put(addNoteErr(error))
        yield put(hideLoading())
    }
}
function* actionWatcher() {
    yield takeLatest(Type.FETCH_NOTE_REQUEST, fetchNote)
    yield takeLatest(Type.ADD_NOTE_REQUEST, addNote)
    yield takeLatest(Type.REMOVE_NOTE_REQUEST, removeNote)
    yield takeLatest(Type.UPDATE_NOTE_REQUEST, updateNote)
    yield takeLatest(Type.CHECKER_NOTE_REQUEST, checkNote)
    // yield takeLatest(Type.LOGOUT_REQUEST, logout)

}

export default function* notesSaga() {
    yield all([fork(actionWatcher)]);
}