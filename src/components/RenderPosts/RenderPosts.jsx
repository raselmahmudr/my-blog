import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function RenderPosts(props){
	const {posts} = props
	
	return React.useMemo(() => {
		return posts && posts.map(post=>(
			<Link to={`/posts/${post.slug}/${post._id}`} className="post_link_a">
				<div className="flex mt-8 justify-between flex-col sm:flex-row">
					<div className="mr-4 flex-5 ">
						<div className="flex align-center">
							{post.author && post.author.avatar
								? <img className="w-5 radius-100 mr-1" src={post.author.avatar} alt="avatar" />
								: <FontAwesomeIcon icon={"user-circle"} className="w-5" />
							}
							<span className="ml-1 text-gray-500 dark:text-gray-300">{post.author && post.author.first_name}</span>
						</div>
						<h1 className="text-2xl dark:text-gray-200">{post.title}</h1>
						<p className="mt-2 dark:text-gray-400">{post.summary}</p>
						<div className="flex align-center mt-2">
							<p className="text-sm text-gray-400 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()} - {post.time}</p>
							<div className="ml-8 flex flex-wrap">{ post.tags && post.tags.map(tag=>
								<span className="bg-gray-10 mx-1 my-1 px-2 py-0 rounded-full dark_subtitle dark:bg-dark-600">
                            <Link to={`/search?tag=${tag}`}>{tag}</Link>
                          </span>
							) }</div>
						</div>
					</div>
					<div className="flex-2">
						<img style={{maxWidth: '190px'}} className="w-full flex sm:justify-center" src={post.cover && post.cover}   alt={""}/>
					</div>
				</div>
			</Link>
		))
	}, [posts])
}

export default RenderPosts