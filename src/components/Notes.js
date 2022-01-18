import { Button, Col, Form, Input, Modal, Row, Pagination } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { addNoteRequest, checkedNoteRequest, fetchNoteRequest, hideConfirm, hidePopup, removeNoteRequest, showConfirm, showPopup, updateNoteRequest } from "../redux/action/notes";
function Notes(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const { noteLists, isShowModal, isShowConfirm, totalItem } = useSelector(state => state.notes)


    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchNoteRequest("", 1))
    }, [dispatch])

    const [input, setInput] = useState({
        id: "",
        title: "",
        content: "",
        color: "#2ecc71",
    })
    const hideModal = () => {
        dispatch(hidePopup())
        form.resetFields();
    }
    const showModal = () => {
        dispatch(showPopup())
    }
    const handleEditNote = (item) => {
        // console.log(item)
        dispatch(showPopup())
        setInput({
            id: item._id,
            title: item.title,
            content: item.content,
            color: item.color,
        })
        form.setFieldsValue({
            id: item._id,
            title: item.title,
            content: item.content,
            color: item.color
        })
        setIndexColor(item.color)

    }
    const clear = () => {
        setInput({
            id: "",
            title: "",
            content: "",
            color: "#2ecc71",
        })
        form.setFieldsValue({
            id: "",
            title: "",
            content: "",
            color: "#2ecc71",
        })
        setIndexColor("#2ecc71")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        form.validateFields()
            .then((values) => {
                onFinish()
            }).catch((info) => {
                console.log('Validate Failed:');
            });
    }
    const onFinish = () => {
        // console.log("input", input)
        if (input.id === "") {
            dispatch(addNoteRequest(input))
            hideModal()
            clear()
        } else {
            dispatch(updateNoteRequest(input, currentPage, "title"))
            hideModal()
            clear()
        }
    }
    const handleChange = (e, type) => {
        const { value } = e.target;
        setInput({
            ...input,
            [type]: value
        })
    }

    const [indexColor, setIndexColor] = useState("#2ecc71")
    const colors = ["#2ecc71", "#9b59b6", "#34495e", "#f1c40f", "#d35400"]
    const handleChangeColor = (item, index) => {
        setIndexColor(item)
        setInput({
            ...input,
            color: item
        })
    }

    const [currentItem, setCurentItem] = useState(null)
    const handleDeleteNote = (item) => {
        dispatch(showConfirm())
        setCurentItem(item)
    }
    const handleCloseModalDelete = () => {
        dispatch(hideConfirm())
    }
    const handleOk = () => {
        dispatch(hideConfirm())
        if (noteLists?.length === 1) {
            if (currentPage === 2 || currentPage === 1) {
                dispatch(removeNoteRequest(currentItem._id, 1))
                setCurrentPage(1)
                return;
            } else {
                dispatch(removeNoteRequest(currentItem._id, currentPage - 1))
                setCurrentPage(currentPage - 1)
            }
            return;
        } else {
            dispatch(removeNoteRequest(currentItem._id, currentPage))
            setCurrentPage(currentPage)
        }
    }

    const handleChecked = (e, item) => {
        dispatch(checkedNoteRequest(item._id, e.target.checked, currentPage))
    }

    const typingTimeoutRef = useRef(null);
    const handelChangeContent = (e) => {
        const obj = {
            title: inputOnChange.title,
            id: inputOnChange._id,
            content: e.target.value,
            color: inputOnChange.color
        }
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(async () => {
            dispatch(updateNoteRequest(obj, currentPage))
        }, 500)
    }

    const [inputOnChange, setInputOnChange] = useState({})
    const handleFocus = (item) => {
        setInputOnChange(item);
    }

    const changePage = (page) => {
        setCurrentPage(page)
        dispatch(fetchNoteRequest("", page))
    }
    return (
        <div className="notes">
            <div className="container">
                <button onClick={showModal} className="btnStyle mb-3">Thêm mới</button>
                <Modal
                    title={input.id ? "Cập nhật" : "Thêm mới"}
                    visible={isShowModal}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="Ok"
                    cancelText="Trờ lại"
                    footer={
                        [
                            <Button onClick={hideModal}>Trở về</Button>,
                            <Button onClick={handleSubmit}> {input.id ? "Cập nhật" : "Thêm mới"}</Button>
                        ]
                    }
                >
                    <Row justify="center">
                        <Col span={24}>
                            <Form
                                // {...layout}
                                name="basic"
                                layout="vertical"
                                form={form}
                            >
                                <Form.Item
                                    label="Tiêu đề"
                                    name="title"
                                    disabled
                                    value={input && input.title}
                                    onChange={(_) => { handleChange(_, 'title') }}
                                    rules={[
                                        () => ({
                                            validator(rule, value) {
                                                if (!value) return Promise.reject("Vui lòng nhập tiêu đề!");
                                                // const regExp = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\_|\d/;
                                                // if (regExp.test(value)) return Promise.reject("Tên người dùng sai định dạng")
                                                if (value?.length > 255) return Promise.reject("Tiêu đề không được lớn hơn 255 ký tự");
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <Input

                                        placeholder="Nhập tiêu đề"
                                        style={{ borderRadius: '5px', padding: "8px" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Màu sắc"
                                    name="color"
                                    disabled
                                    value={input && input.color}
                                    onChange={(_) => { handleChange(_, 'color') }}
                                >
                                    <div className="colors">
                                        {
                                            colors?.map((item, index) => {
                                                return (
                                                    <div className={`color-item ${indexColor === item ? "active" : ""}`}
                                                        key={index}
                                                        style={{ background: item, width: "50px", height: "55px" }}
                                                        onClick={() => handleChangeColor(item, index)}></div>
                                                )
                                            })
                                        }
                                    </div>

                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Modal>

                <div className="notes-content row">
                    {
                        noteLists?.length === 0 ? <>
                            <h4>Bạn chưa có note nào </h4>
                        </> : <>
                                {
                                    noteLists?.map((item, index) => {
                                        return (
                                            <div className="note-item col-lg-4 " key={item._id}>
                                                <div className="note-box" >
                                                    <div className="note-title" style={{ background: item.color }}>
                                                        <h5> {item?.title}</h5>
                                                        <span onClick={() => handleDeleteNote(item)}><IoMdClose size={20} /></span>
                                                    </div>
                                                    <textarea type="textarea"
                                                        defaultValue={item?.content ? item.content : ""}
                                                        onFocus={() => handleFocus(item)}
                                                        onChange={handelChangeContent}
                                                        className="note-content"></textarea>
                                                    <div className="note-status">
                                                        <div className="note-check">
                                                            <input type="checkbox" checked={item?.isCompleted} style={{ width: "18px", height: "18px" }} onChange={(e) => handleChecked(e, item)}></input>
                                                            <p>{item?.isCompleted ? <span style={{ color: "#2ecc71" }}>Đã hoàn thành</span> : <span style={{ color: "#e74c3c" }}>Chưa hoàn thành</span>}</p>
                                                        </div>
                                                        <span>{moment(item?.createdAt).format('DD/MM/YYYY')}</span>
                                                        <p onClick={() => handleEditNote(item)}><FiEdit size={20} /></p>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                {
                    noteLists?.length > 0 ? <Pagination className="pagination-custom"
                        current={currentPage}
                        defaultPageSize={3}
                        total={totalItem}
                        onChange={changePage}></Pagination> : null
                }

                <Modal
                    className='career-type-popup'
                    title={`Bạn có chắc chắn muốn xóa note này không ?`}
                    visible={isShowConfirm}
                    onCancel={handleCloseModalDelete}
                >
                    <div className="career-btn">
                        <Button onClick={() => handleCloseModalDelete()} className="status-btn-default">
                            <span className="l-calendar-name">Không</span>
                        </Button>
                        <Button style={{ marginLeft: '20px' }} onClick={(record) => handleOk(record)} className="status-btn-default">
                            <span className="l-calendar-name">Có</span>
                        </Button>
                    </div>
                </Modal>
            </div>
        </div >
    );
}

export default Notes;