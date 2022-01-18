import * as Type from "../constants/Actiontype"

export const showLoading = () => {
    return {
        type: Type.SHOW_LOADING
    }
}
export const hideLoading = () => {
    return {
        type: Type.HIDE_LOADING
    }
}