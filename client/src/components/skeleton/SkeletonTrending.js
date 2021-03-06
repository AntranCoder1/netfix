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
                        <div 
                            className="content-title"
                            style={{ display: 'flex', flexDirection: 'column', width: '100%'}}
                        >
                            <h3>
                                <Skeleton height={`30px`} width={`60%`} style={{ marginLeft: "10px" }} />
                            </h3>
                            <div className="content-title-genre">
                                <p className="genre">
                                    <Skeleton height={`20px`} width={`500px`} style={{ marginLeft: "10px" }} />
                                </p>
                            </div>
                            <p className="desc">
                                <Skeleton count={2} height={`20px`} width={`600px`} style={{ marginLeft: "10px" }} />
                            </p>
                        </div>
                    </div>
            )) }
        </div>
    )
}

export default SkeletonTrending