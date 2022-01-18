import { Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LoginRequest } from '../redux/action/auth';

// import { LoginRequest } from "../redux/action/auth.js";
function Login({ onToggleIsShow }) {
    const [form2] = Form.useForm();
    const dispatch = useDispatch()
    // const history = useHistory()

    const onFinishLogin = (value) => {
        // console.log(value)
        dispatch(LoginRequest(value))
    }
    const onFinishFailedLogin = () => {

    }
    return (
        <div className="box-auth">
            <h2>Đăng nhập</h2>
            <Form
                name="basic"
                onFinish={onFinishLogin}
                onFinishFailed={onFinishFailedLogin}
                layout="vertical"
                className="form"
                form={form2}
            >
                <Form.Item
                    label="Tài khoản"
                    name="email"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                                if (value) {
                                    const listCheck = value.split("@");

                                    if (
                                        value.includes("..") ||
                                        listCheck[0].startsWith(".") ||
                                        listCheck[0].endsWith(".") ||
                                        (listCheck.length > 1 &&
                                            listCheck[1].startsWith(".")) ||
                                        (listCheck.length > 1 &&
                                            listCheck[1].endsWith("."))
                                    ) {
                                        return Promise.reject(
                                            "Email không đúng định dạng!"
                                        );
                                    }
                                    if (value.length > 255) {
                                        return Promise.reject(
                                            "Email vượt quá 255 ký tự!"
                                        );
                                    }
                                    if (validation.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "Email không đúng định dạng!"
                                    );
                                } else {
                                    return Promise.reject(`Vui lòng nhập Email!`);
                                }
                            },
                        }),
                    ]}
                >
                    <Input
                        placeholder="Nhập email của bạn"
                        style={{ borderRadius: '5px', padding: "8px" }}

                    // prefix={<MailOutlined twoToneColor="#ccc" className="icon-input" />}
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value) {
                                    return Promise.reject(`Vui lòng nhập Mật khẩu!`);
                                }
                                if (value.length < 6) {
                                    return Promise.reject(
                                        "Mật khẩu phải có ít nhất 6-20 ký tự"
                                    );
                                }
                                if (value.length > 20) {
                                    return Promise.reject(
                                        "Mật khẩu không được quá 20 ký tự"
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu của bạn"
                        style={{ borderRadius: '5px', padding: "8px" }}
                    // prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>
                <Form.Item >
                    <button className="btn-login btnStyle"
                        htmltype="submit">
                        Đăng nhập
                                            </button>
                    <p className="title-desc" style={{ paddingTop: "10px" }} onClick={onToggleIsShow}>Đăng ký tài khoản </p>
                </Form.Item>
            </Form>
        </div>

    );
}

export default Login;