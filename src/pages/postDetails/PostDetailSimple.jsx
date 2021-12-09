import React, {Suspense} from 'react';
import ReactLazyPreload from "../../utils/ReactLazyPreload";
import PostDetailSkeleton from "./PostDetailSkeleton";


const PostDetails = ReactLazyPreload(()=>import("./PostDetails"))

const PostDetailSimple = () => {
    return (
        <div>
            <Suspense fallback={<div className="container px-4">
                <div className="mt-4">
                    <PostDetailSkeleton.SkeletonMeta />
                    <PostDetailSkeleton.SkeletonContent />
                </div>
            </div>}>
                <PostDetails />
            </Suspense>
        </div>
    );
};

export default PostDetailSimple;