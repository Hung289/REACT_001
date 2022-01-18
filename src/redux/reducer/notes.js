import * as Type from "../constants/Actiontype"

const initialState = {
    noteLists: [],
    isShowModal: false,
    isShowConfirm: false,
    totalItem: 0

}
const notes = (state = initialState, action) => {
    switch (action.type) {
        // case Type.EDIT_TEXT:
        //     return{

        //     }
        case Type.RESET_NOTE:
            return {
                ...state,
                noteLists: [],
                totalItem: 0,
                isShowModal: false,
                isShowConfirm: false,
            }
        case Type.SHOW_CONFIRM:
            return {
                ...state,
                isShowConfirm: true
            }
        case Type.HIDE_CONFIRM:
            return {
                ...state,
                isShowConfirm: false
            }
        case Type.SHOW_POPUP:
            return {
                ...state,
                isShowModal: true
            }
        case Type.HIDE_POPUP:
            return {
                ...state,
                isShowModal: false
            }
        case Type.FETCH_NOTE_REQUEST:
            return {
                ...state
            }
        case Type.FETCH_NOTE_SUCCESS:
            return {
                ...state,
                noteLists: action.payload.notes,
                isShowModal: false,
                totalItem: action.payload.totalItem
            }
        case Type.FETCH_NOTE_ERR:
            return {
                ...state
            }
        case Type.ADD_NOTE_REQUEST:
            return {
                ...state,
            }
        case Type.ADD_NOTE_SUCCESS:
            return {
                ...state,
            }
        case Type.ADD_NOTE_ERR:
            return {
                ...state,
            }

        default:
            return state
    }
}
export default notes