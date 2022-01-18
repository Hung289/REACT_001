import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../common/Loading';
import Header from './Header';
import { CheckLoginRequest } from '../redux/action/auth';
import Notes from './Notes';

function Home(props) {
    // const [isShow, setIsShow] = useState(true)
    const { showLoaing } = useSelector(state => state.loading)

    // const onToggleIsShow = () => {
    //     setIsShow(!isShow)
    // }

    return (
        <div>
            {
                showLoaing ? <Loading></Loading> : null
            }
            <Header></Header>
            <Notes></Notes>
        </div>
    );
}

export default Home;