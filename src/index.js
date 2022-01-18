import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { store } from "./redux/store/store"
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
    <Provider store={store}>
        <App />,
   </Provider>,
    document.getElementById('root'));
