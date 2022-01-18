import { Popover } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequest } from '../redux/action/auth';
import { fetchNoteRequest, resetNoteRequest } from "../redux/action/notes";
function Header(props) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(LogoutRequest())
        dispatch(resetNoteRequest())
    }
    const content = (
        <div>
            <button style={{ cursor: "pointer" }} className="btnStyle" onClick={handleLogout}>Đăng xuất</button>
        </div>
    );

    const [search, setSearch] = useState('')
    const typingTimeoutRef = useRef(null);
    const handleSearch = (e) => {
        const value = e.target.value
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(async () => {
            setSearch(value)
            dispatch(fetchNoteRequest(value, 1))
        }, 500)
    }
    return (
        <div className="header">
            <div className="header-container container">
                <h3 className="header-logo">Notes</h3>
                <form className="header-search">
                    <input type="text" onChange={handleSearch} placeholder="Tìm kiếm" />
                </form>
                <div className="header-info">
                    <Popover placement="bottom" className="header-infoBox" content={content} trigger="click">
                        <div className="header-avatar"> {user?.username.charAt(0).toUpperCase()}</div><h4>{user?.username}</h4>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default Header;