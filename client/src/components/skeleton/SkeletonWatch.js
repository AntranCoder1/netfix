import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonWatch = () => {
    return (
        <div className="watch-recommend" style={{ display: 'flex' }}>
            { Array(4)
                .fill()
                .map((item) => (
                    <div class="zoomin content">
                        <Skeleton height={150} width={300} />
                    </div>
            )) }
        </div>
    )
}

export default SkeletonWatch