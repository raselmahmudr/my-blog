import React from 'react';
import fullLink from "../../utils/fullLink";
import {Link} from "react-router-dom";
import api from "../../apis";
import {fa500px} from "@fortawesome/pro-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faUserCircle, faUsers} from "@fortawesome/pro-solid-svg-icons";
import {faUser} from "@fortawesome/pro-regular-svg-icons";


const Post = (props) => {
    const { post, authId } = props

    const [ postDetail, setPostDetail ] = React.useState({})

    function fetchPostDetail(post_id) {
        api.get(`/api/posts/${post_id}`).then(response => {
            if (response.status === 200) {
                setPostDetail(response.data.post)
            }
        })
    }



    return (
        <div>
            <Link to={`/posts/${post.slug}`}>
                <div className="bg-gray-9 bg-opacity-50 flex my-2 rounded">
                    <div style={{width: "100px"}} className="post_cover mr-2">
                        <img className="w-full flex post_img" src={fullLink(post.cover)} alt=""/>
                    </div>
                    <div key={post.id} className="">
                        <div className="post-meta">

                            <div className="flex">
                                <div>
                                    {post.author.avatar ? (
                                        <img className="w-5 rounded-full" src={fullLink(post.author.avatar)} alt=""/>
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} />
                                    ) }
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <h4 className="ml-1 text-sm mr-1">{post.author.username}</h4>
                                    <span className="text-xs font-medium">Created at : {new Date(post.created_at).toLocaleDateString()}</span>

                                </div>
                            </div>
                        </div>
                        <h4 className="title text-sm mt-1">{post.title}</h4>
                        {/*{postDetail && postDetail.id === post.id && renderComments(post.id, post.total_comments)}*/}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Post;