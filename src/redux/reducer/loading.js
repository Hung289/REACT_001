import * as Type from "../constants/Actiontype"
const initialState = {
    showLoaing: false
}
const loading = (state = initialState, action) => {
    switch (action.type) {
        case Type.SHOW_LOADING:
            return {
                ...state,
                showLoaing: true
            }
        case Type.HIDE_LOADING:
            return {
                ...state,
                showLoaing: false
            }
        default:
            return state
    }
}
export default loading