import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonNavbar = () => {
    return (
        <>
            <span>
                <Skeleton height={20} width={50} />
            </span>
            <Skeleton circle={true} height={30} width={30} style={{ marginLeft: '15px', marginRight: '15px' }} />
            <Skeleton height={30} width={30} />
        </>
    )
}

export default SkeletonNavbar