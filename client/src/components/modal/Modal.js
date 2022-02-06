import React, { useMemo } from 'react';
import './Modal.scss';
import { RiCloseLine } from 'react-icons/ri';
import Select from 'react-select';

const Modal = ({ setIsOpen }) => {

    const options = useMemo(
        () => [
            { value: 1, label: "Vui lòng chọn mục phản hồi" },
            { value: 2, label: "Không xem được video" },
            { value: 3, label: "Lỗi không hiển thị nội dung (mờ/méo/lệch hình...)" },
            { value: 4, label: "Lỗi âm thanh" },
            { value: 5, label: "Lỗi chức năng (xem tập kế/tua nhanh/dừng video...)" },
            { value: 0, label: "Khác" }
        ]
    );

    const customStyles = useMemo(
        () => ({
            option: (provided, state) => ({
                ...provided,
                color: "F5F5F5",
                cursor: "pointer",
            }),
            control: (provided) => ({
                ...provided,
                border: "1px solid red",
                padding: 5,
                cursor: "pointer",
            }),
        })
    );

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
                            />
                        </div>
                        <div className="comment-Email">
                            <label>Mục phản hổi</label>
                            <Select 
                                options={options} 
                                defaultValue={options[1]} 
                                styles={customStyles}
                            />
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <label>Tên bạn là</label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên của bạn"
                                name="name" 
                            />
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <textarea 
                                placeholder="Chi tiết về phản hổi"
                            />
                        </div>
                        <div className="comment-Email" style={{ marginTop: "40px" }}>
                            <label>Số điện thoại</label>
                            <input 
                                type="text" 
                                placeholder="Nhập số điện thoại"
                                name="phone" 
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit">Gửi</button>
                </div>
            </div>
        </>
    );
};

export default Modal;

