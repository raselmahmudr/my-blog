import React from 'react';
import fullLink from "../../utils/fullLink";
import PreloadLink from "../preloadLink/PreloadLink";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {deletePost} from "../../store/actions/postAction";

const RenderAuthPosts = ({userPosts, _id, dispatch}) => {
	
	
	function deletePostHandler(id, author_id, path) {
		dispatch(deletePost(id, path, author_id))
		// setOwnPosts(ownPosts.filter(p=>p._id !== id))
	}
	
	
	return (
		<div>
			
			<div className="user-posts mt-4">
				{userPosts && userPosts.map((post) => (
					<div key={post._id} className="p-2 my-1  hover:bg-gray-200 dark:hover:bg-dark-700">
						<div className="flex own-post items-center ">
							
							<div className="mr-2 post_cover" style={{width: "100px"}}>
								<img className="w-full" src={fullLink(post.cover)} alt=""/>
							</div>
							
							<div className="flex w-full justify-between  flex-12">
								<PreloadLink to={`/posts/${post.slug}/${post._id}`}>
									<h4 className="hover:text-primary dark_subtitle">{post.title}</h4>
								</PreloadLink>
								{ _id && (
									<div className="ml-4">
											<span className="action flex items-center">
											<PreloadLink to={`/admin/dashboard/add-post/${post._id}`}>
													 <FontAwesomeIcon icon={faPen} className="pointer fa fa-trash ml-3 text-sm dark_gray "/>
											</PreloadLink>
										 <FontAwesomeIcon icon={faTrash}
												onClick={(e) => deletePostHandler(post._id, post.author_id, post.path)}
												className="cursor-pointer  fa fa-trash ml-3 text-sm text-red-400 "/>
										</span>
									</div>
								)}
							</div>
						</div>
					
					</div>
				
				))}
			</div>
			
		</div>
	);
};

export default RenderAuthPosts;