import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonInfo = () => {
    return (
        <div className="movie-desc-recom">
            { Array(6)
                .fill()
                .map((item, index) => (
                    <div className="movie-desc-recom-card" key={index}>
                        <Skeleton height={`200px`} width={`350px`} />
                        <h4>
                            <Skeleton height={36} width={`80%`} />
                        </h4>
                        <div className="movie-desc-recom-card-tag">
                            <Skeleton circle={true} height={50} width={50} />
                            <p>
                                <Skeleton width={`60%`} />
                            </p>
                        </div>
                    </div>
                )) }
        </div>
    )
}

export default SkeletonInfo