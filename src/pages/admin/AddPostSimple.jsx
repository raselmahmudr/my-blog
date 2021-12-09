import React, {Suspense} from 'react';
import ReactLazyPreload from "../../utils/ReactLazyPreload";
import AddPostSkeleton from "./AddPostSkeleton";

const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPost"));


const AddPostSimple = () => {
    return (
        <div>
            <Suspense fallback={<AddPostSkeleton />}>
                <AddPost />
            </Suspense>
        </div>
    );
};

export default AddPostSimple;

