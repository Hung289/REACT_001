import * as Type from "../constants/Actiontype"

const initialState = {
    isLogger: false,
    user: {},
}
const auth = (state = initialState, action) => {
    switch (action.type) {

        case Type.LOGIN_REQUEST:
            return {
                ...state
            }
        case Type.LOGIN_SUCCESS:
            return {
                ...state,
                isLogger: true,
                user: action.payload
            }
        case Type.LOGIN_ERR:
            return {
                ...state,
            }
        case Type.LOGOUT_REQUEST:
            return {
                ...state,
                isLogger: false,
                user: {},
            }
        default:
            return state
    }
}
export default auth