import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import http from '../../api/http';
import { NotificationError, NotificationSuccess } from '../../common/Notification';
import { history } from "../../utils/history";
import { LoginRequestErr, LoginRequestSuccess, registerRequestErr } from '../action/auth';
import { hideLoading, showLoading } from '../action/loading';
import * as Type from "../constants/Actiontype";
function* register(payload) {

    try {
        const { email, password } = payload.data
        yield put(showLoading())
        const rs = yield call(() =>
            http.post('/user/register', payload.data)
        )
        if (rs?.status === 200) {
            yield put(hideLoading())
            NotificationSuccess("", rs?.data?.msg)
            // yield call(history.push, '/home');
            history.push("/")
        }
    } catch (error) {
        // console.log(error);
        NotificationError("", error.msg)
        yield put(registerRequestErr(error))
        yield put(hideLoading())
    }


}
function* login(payload) {
    try {
        const { email, password } = payload.data

        yield put(showLoading())
        const rs = yield call(() =>
            http.post('/user/login', payload.data)
        )
        if (rs?.status === 200) {
            yield put(LoginRequestSuccess(rs?.data?.user))
            localStorage.setItem("isLogin", true)
            localStorage.setItem("access_token", rs?.data?.access_token)
            localStorage.setItem("refresh_token", rs?.data?.refresh_token)
            yield put(hideLoading())
            NotificationSuccess("", "Đăng nhập thành công")
            // yield call(history.push, '/home');
            history.push("/home")
            // history.push("/")
        }
    } catch (error) {
        console.log(error);
        NotificationError("", error.msg)
        yield put(LoginRequestErr(error))
        yield put(hideLoading())
    }
}

function* checkLogin() {
    try {
        yield put(showLoading())
        const token = localStorage.getItem("access_token")
        if (token) {
            const rs = yield call(() =>
                http.get('/user/info'))
            if (rs?.status === 200) {
                yield put(LoginRequestSuccess(rs?.data?.user))
                yield put(hideLoading())
            }
        } else {
            yield put(hideLoading())
        }
    } catch (error) {
        console.log(error);
        yield put(hideLoading())
    }
}
function* logout() {
    localStorage.clear();
    yield true
}
function* actionWatcher() {
    yield takeLatest(Type.REGISTER_REQUEST, register)
    yield takeLatest(Type.LOGIN_REQUEST, login)
    yield takeLatest(Type.CHECK_LOGIN, checkLogin)
    yield takeLatest(Type.LOGOUT_REQUEST, logout)

}

export default function* authenticationSaga() {
    yield all([fork(actionWatcher)]);
}