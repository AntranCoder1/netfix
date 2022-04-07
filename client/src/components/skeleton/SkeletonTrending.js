import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTrending = () => {
    return (
        <div className="trending-container-loading">
            { Array(10)
                .fill()
                .map((movie) => (
                    <div className="content" style={{ display: 'flex' }}>
                        <Skeleton height={150} width={300} />
                        <div className="content-title">
                            <h3>
                                <Skeleton height={`60px`} width={`60%`} />
                            </h3>
                            <div className="content-title-genre">
                                <Skeleton height={`40px`} width={`80%`} />
                            </div>
                            <p className="desc">
                                <Skeleton count={3} height={`40px`} width={`120%`} />
                            </p>
                        </div>
                    </div>
            )) }
        </div>
    )
}

export default SkeletonTrending