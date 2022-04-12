import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonNewMovie = () => {
    return (
        <div className="container">
            { Array(10)
                .fill()
                .map((movie) => (
                    <div className="content">
                        <Skeleton height={`150px`} width={`300px`} />
                        <div 
                            className="content-title"
                            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                        >
                            <h3>
                                <Skeleton height={`30px`} width={`60%`} style={{ marginLeft: "10px" }} />
                            </h3>
                            <div className="content-title-genre">
                                <Skeleton height={`20px`} width={`500px`} style={{ marginLeft: "10px" }} />     
                            </div>
                            <p className="desc">
                                <Skeleton count={3} height={`15px`} width={`600px`} style={{ marginLeft: "10px" }} />
                            </p>
                        </div>
                    </div>
            )) }
        </div>
    )
}

export default SkeletonNewMovie