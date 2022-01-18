import * as Type from "../constants/Actiontype"


export const showConfirm = () => {
    return {
        type: Type.SHOW_CONFIRM,
    }
}
export const hideConfirm = () => {
    return {
        type: Type.HIDE_CONFIRM,
    }
}
export const showPopup = () => {
    return {
        type: Type.SHOW_POPUP,
    }
}
export const hidePopup = () => {
    return {
        type: Type.HIDE_POPUP,
    }
}
export const fetchNoteRequest = (data, pageIndex) => {
    return {
        type: Type.FETCH_NOTE_REQUEST,
        data, pageIndex
    }
}
export const fetchNoteSuccess = (payload) => {
    return {
        type: Type.FETCH_NOTE_SUCCESS,
        payload
    }
}
export const fetchNoteErr = () => {
    return {
        type: Type.FETCH_NOTE_ERR,
    }
}

export const addNoteRequest = (data) => {
    return {
        type: Type.ADD_NOTE_REQUEST,
        data
    }
}
export const addNoteSuccess = (data) => {
    return {
        type: Type.ADD_NOTE_SUCCESS,
        data
    }
}
export const addNoteErr = (data) => {
    return {
        type: Type.ADD_NOTE_ERR,
        data
    }
}
export const updateNoteRequest = (data, page, typeTitle) => {
    return {
        type: Type.UPDATE_NOTE_REQUEST,
        data, page, typeTitle
    }
}
export const checkedNoteRequest = (id, data, page) => {
    return {
        type: Type.CHECKER_NOTE_REQUEST,
        id, data, page
    }
}

export const removeNoteRequest = (id, page) => {
    return {
        type: Type.REMOVE_NOTE_REQUEST,
        id, page
    }
}
export const resetNoteRequest = () => {
    return {
        type: Type.RESET_NOTE,
    }
}

export const editText = (data) => {
    return {
        type: Type.EDIT_TEXT,
        data
    }
}