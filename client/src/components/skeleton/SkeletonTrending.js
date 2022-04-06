import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTrending = () => {
    return (
        <div className="trending-container-loading">
            { Array(10)
                .fill()
                .map((item, index) => (
                    <div className="content" key={index}>
                        <Skeleton height={`150px`} width={`300px`} />
                        <div className="content-title">
                            <h3>
                                <Skeleton  />
                            </h3>
                            {/* <div className="content-title-genre">
                                <p className="genre">{movie.genre}</p>
                                <CheckCircleIcon className="icon" style={{ marginRight: "5px" }} />
                                <span className="like" style={{ marginRight: "5px" }}>{movie.likers.length} lượt thích</span>
                                <UpdateIcon className="icon" />
                                <p className="update">
                                    Đã được cập nhập -
                                    <span className="time-update"> {timestampParser(movie.createdAt)}</span>
                                </p>
                            </div> */}
                            <p className="desc">
                                <Skeleton count={3} />
                            </p>
                        </div>
                    </div>
            )) }
        </div>
    )
}

export default SkeletonTrending