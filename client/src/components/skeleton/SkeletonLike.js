import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLike = () => {
    return (
        <div className="movie-container">
            <div className="left">
                <p className="left-title">Video đã thích</p>
                <p style={{ fontSize: "15px", color: "#ccc" }}>
                    Video
                </p>
                <div className="left-security">
                    <p style={{ fontSize: "13px", fontWeight: "bold", color: "#e0e0d1" }}>Riêng tư</p>
                </div>
                <div className="left-bottom"></div>
                <div className="left-user">
                    <Skeleton circle={true} height={60} width={60} />
                    <p 
                        className="left-user-name" 
                        style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: "10px" }}
                    >
                        <Skeleton height={30} width={`50%`} />
                    </p>
                </div>
            </div>
            <div className="right">
                { Array(10)
                    .fill()
                    .map((movie, i) => (
                        <div className="right-right">
                            <div className="right-content">
                                <div 
                                    className="right-title"
                                >
                                    <Skeleton height={`90px`} width={`180px`} />
                                    <div 
                                        className="right-genre"
                                        style={{ display: 'flex', 
                                            flexDirection: 'column',
                                        }} 
                                    >
                                        <Skeleton height={`20px`} width={`300px`} style={{ marginLeft: "20px" }} />
                                        <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>
                                            <Skeleton height={`20px`} width={`200px`} style={{ marginLeft: "20px" }} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-bottom"></div>
                        </div>
                )) }
            </div>
        </div>
    )
}

export default SkeletonLike