import { combineReducers } from 'redux'
import auth from "./auth"
import loading from "./loading"
import notes from "./notes"
const rootReducer = combineReducers({
    auth,
    notes,
    loading
})
export default rootReducer;