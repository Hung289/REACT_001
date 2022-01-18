import * as Type from "../constants/Actiontype"

export const registerRequest = (data) => {
    return {
        type: Type.REGISTER_REQUEST,
        data
    }
}

export const registerRequestSuccess = (payload) => {
    return {
        type: Type.REGISTER_SUCCESS,
        payload
    }
}
export const registerRequestErr = (err) => {
    return {
        type: Type.REGISTER_ERR,
        err
    }
}

export const LoginRequest = (data) => {
    return {
        type: Type.LOGIN_REQUEST,
        data
    }
}
export const LoginRequestSuccess = (payload) => {
    return {
        type: Type.LOGIN_SUCCESS,
        payload
    }
}
export const LoginRequestErr = (err) => {
    return {
        type: Type.LOGIN_ERR,
        err
    }
}
export const CheckLoginRequest = () => {
    return {
        type: Type.CHECK_LOGIN,
    }
}

export const LogoutRequest = () => {
    return {
        type: Type.LOGOUT_REQUEST,
    }
}

