import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonFeature = () => {
    return (
        <div className="featured">
            { Array(1)
                .fill()
                .map((item, index) => (
                    <>
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton height={`100%`} width={`100%`} />
                        </SkeletonTheme>
                        <div className="info">
                            <Skeleton height={200} width={400} />
                            <span className="desc">
                                <Skeleton count={3} />
                            </span>
                            <div className="buttons">
                                <Skeleton height={50} width={200} />
                            </div>
                        </div>
                    </>
                )) }
        </div>
    )
}

export default SkeletonFeature