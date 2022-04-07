import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonListItem = () => {
    return (
        <div className="list">
            <div className="title">
                <div className="border"></div>
                <span className="listTitle">
                    <Skeleton height={30} width={300} />
                </span>
            </div>
            <div className="wrapper">
                <div className="container">
                    { Array(8)
                        .fill()
                        .map((item, i) => (
                            <div className="listItem">
                                <Skeleton height={`100%`} width={`100%`} />
                            </div>
                    )) }
                </div>  
            </div>
        </div>
    )
}

export default SkeletonListItem