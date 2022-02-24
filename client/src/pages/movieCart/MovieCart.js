import React, { useState } from 'react';
import './MovieCart.scss';
import NavBar from '../../components/navBar/NavBar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const MovieCart = () => {
    
    return (
        <div className="movie-cart">
            <NavBar />
            <div className="movie-container">
                <div className="left">
                    <p className="left-title">Video đã thích</p>
                    <p style={{ fontSize: "15px", color: "#ccc" }}><span>0</span> Video</p>
                    <div className="left-security">
                        <LockOutlinedIcon className="left-icon" />
                        <p style={{ fontSize: "13px", fontWeight: "bold", color: "#e0e0d1" }}>Riêng tư</p>
                    </div>
                    <div className="left-bottom"></div>
                    <div className="left-user">
                        <img src="https://i.pinimg.com/564x/d5/c8/46/d5c846335bdf975a6ab1bd1396616549.jpg" alt="" />
                        <p className="left-user-name">Hoàng Châu</p>
                    </div>
                </div>
                <div className="right">
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                    <div className="right-right">
                        <div className="right-content">
                            <span style={{ fontSize: "20px" }}>0</span>
                            <div className="right-title">
                                <img src="https://i.pinimg.com/564x/41/a3/d5/41a3d537a95e6d83edb4409ce51997e4.jpg" alt="" />
                                <div className="right-genre">
                                    <p style={{ fontWeight: "500" }}>Expression statement: produces a value and performs an action</p>
                                    <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>Animation</p>
                                </div>
                            </div>
                            <MoreVertIcon className="right-icon" />
                        </div>
                        <div className="right-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCart