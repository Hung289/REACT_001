import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../common/Loading';
import Login from "./Login";
import Register from "./Register";
function Auth(props) {

    const [isShow, setIsShow] = useState(true)
    const { showLoaing } = useSelector(state => state.loading)

    const onToggleIsShow = () => {
        setIsShow(!isShow)
    }
    return (
        <>
            {
                showLoaing ? <Loading></Loading> : null
            }
            {
                isShow ? <Login onToggleIsShow={onToggleIsShow}></Login> : <Register onToggleIsShow={onToggleIsShow}></Register>
            }
        </>
    );
}

export default Auth;