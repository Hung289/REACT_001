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
                <button onClick={showModal} className="btnStyle mb-3">Th??m m???i</button>
                <Modal
                    title={input.id ? "C???p nh???t" : "Th??m m???i"}
                    visible={isShowModal}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="Ok"
                    cancelText="Tr??? l???i"
                    footer={
                        [
                            <Button onClick={hideModal}>Tr??? v???</Button>,
                            <Button onClick={handleSubmit}> {input.id ? "C???p nh???t" : "Th??m m???i"}</Button>
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
                                    label="Ti??u ?????"
                                    name="title"
                                    disabled
                                    value={input && input.title}
                                    onChange={(_) => { handleChange(_, 'title') }}
                                    rules={[
                                        () => ({
                                            validator(rule, value) {
                                                if (!value) return Promise.reject("Vui l??ng nh???p ti??u ?????!");
                                                // const regExp = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\_|\d/;
                                                // if (regExp.test(value)) return Promise.reject("T??n ng?????i d??ng sai ?????nh d???ng")
                                                if (value?.length > 255) return Promise.reject("Ti??u ????? kh??ng ???????c l???n h??n 255 k?? t???");
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <Input

                                        placeholder="Nh???p ti??u ?????"
                                        style={{ borderRadius: '5px', padding: "8px" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="M??u s???c"
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
                            <h4>B???n ch??a c?? note n??o </h4>
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
                                                            <p>{item?.isCompleted ? <span style={{ color: "#2ecc71" }}>???? ho??n th??nh</span> : <span style={{ color: "#e74c3c" }}>Ch??a ho??n th??nh</span>}</p>
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
                    title={`Ba??n co?? ch????c ch????n mu????n x??a note n??y kh??ng ?`}
                    visible={isShowConfirm}
                    onCancel={handleCloseModalDelete}
                >
                    <div className="career-btn">
                        <Button onClick={() => handleCloseModalDelete()} className="status-btn-default">
                            <span className="l-calendar-name">Kh??ng</span>
                        </Button>
                        <Button style={{ marginLeft: '20px' }} onClick={(record) => handleOk(record)} className="status-btn-default">
                            <span className="l-calendar-name">C??</span>
                        </Button>
                    </div>
                </Modal>
            </div>
        </div >
    );
}

export default Notes;