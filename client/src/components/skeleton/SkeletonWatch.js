import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonWatch = () => {
    return (
        <>
            <div className="watch-img">
                <Skeleton height={150} width={300} style={{ marginRight: "20px" }} />
                <Skeleton height={150} width={300} />
            </div>
            <div className="watch-reco">
                <div className="slider">
                    <h1>Recommend for you</h1>
                </div>
                <div className="watch-recommend" style={{ display: 'flex' }}>
                    { Array(4)
                        .fill()
                        .map((item) => (
                            <div class="zoomin content">
                                <Skeleton height={150} width={300} />
                            </div>
                    )) }
                </div>
            </div>
        </>
    )
}

export default SkeletonWatch