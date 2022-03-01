import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PreloadLink from "../preloadLink/PreloadLink";

function RenderPosts(props){
	const {posts} = props
	
	return React.useMemo(() => {
		return posts && posts.map(post=>(
			<PreloadLink to={`/posts/${post.slug}/${post._id}`} className="post_link_a">
				<div className="flex mt-8 justify-between flex-col sm:flex-row">
					<div className="mr-4 flex-5 order-1">
						<div className="flex align-center">
							{post.author && post.author.avatar
								? <img className="w-5 radius-100 mr-1" src={post.author.avatar} alt="avatar" />
								: <FontAwesomeIcon icon={"user-circle"} className="w-5" />
							}
							<span className="ml-1 text-dark-500 dark:text-dark-100 font-medium">{post.author && post.author.first_name} { post.author && post.author.last_name && post.author.last_name}</span>
						</div>
						<h1 className="text-md sm:text-2xl dark:text-gray-200 font-medium ">{post.title}</h1>
						<p className="text-base mt-2 text-dark-400 dark:text-dark-10">{post.summary}</p>
						<div className="flex sm:align-center align-start mt-2">
							<h5 className="font-medium text-gray-400 dark:text-gray-400 text-sm">{new Date(post.created_at).toLocaleDateString()}</h5>
							<div className="ml-3 flex flex-wrap">{ post.tags && post.tags.map(tag=>
								<span className="bg-gray-10 mx-1 my-1 px-2 py-0 rounded-full dark_subtitle dark:bg-dark-600">
									<PreloadLink to={`/search?tag=${tag}`}>{tag}</PreloadLink>
								</span>
							) }</div>
						</div>
					</div>
					<div className="flex-2 mb-4 sm:mb-0 sm:order-2">
						<img className="w-full flex sm:justify-center" src={post.cover && post.cover}   alt={""}/>
					</div>
				</div>
			</PreloadLink>
		))
	}, [posts])
}

export default RenderPosts