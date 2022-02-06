import React, { useMemo, useState } from 'react';
import './Modal.scss';
import { RiCloseLine } from 'react-icons/ri';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../../redux/ApiFeedbackCall';

const Modal = ({ setIsOpen }) => {

    const [feedback, setFeedback] = useState(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setFeedback({ ...feedback, [e.target.name]: value });
    }

    const handleSubmmit = (e) => {
        e.preventDefault();
        addFeedback(feedback, dispatch);
        setIsOpen(false);
    }

    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Phản hồi về ứng dụng</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="content">
                        <p className="content-modal">
                            <span style={{ color: "red", fontWeight: "600", marginRight: "4px" }}>NETFLIX</span>
                            luôn lắng nghe ý kiến để không ngừng cải thiện và mang lại nhiều lợi ích hơn
                            cho người dùng
                        </p>
                    </div>
                    <div className="comment">
                        <div className="comment-Email">
                            <label>Email của bạn</label>
                            <input 
                                type="email" 
                                placeholder="Vui lòng nhập địa chỉ email hợp lệ"
                                name="email" 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="comment-Email">
                            <label>Mục phản hổi</label>
                            <select name="feedback" id="feedback" onChange={handleChange}>
                                <option value="Vui lòng chọn mục phản hồi">Vui lòng chọn mục phản hồi</option>
                                <option value="Không xem được video">Không xem được video</option>
                                <option value="Lỗi không hiển thị nội dung (mờ/méo/lệch hình...)">
                                    Lỗi không hiển thị nội dung (mờ/méo/lệch hình...)
                                </option>
                                <option value="Lỗi âm thanh">Lỗi âm thanh</option>
                                <option value="Lỗi chức năng (xem tập kế/tua nhanh/dừng video...)">
                                    Lỗi chức năng (xem tập kế/tua nhanh/dừng video...)
                                </option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <label>Tên bạn là</label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên của bạn"
                                name="name" 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <textarea 
                                placeholder="Chi tiết về phản hổi"
                                name="content"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <label>Số điện thoại</label>
                            <input 
                                type="text" 
                                placeholder="Nhập số điện thoại"
                                name="phone" 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="submit"
                        onClick={handleSubmmit}
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;

