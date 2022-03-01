import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, fetchPosts} from "../../../store/actions/postAction";
import {getApi} from "../../../apis";

const AllPosts = () => {
	
	const postState = useSelector(state=>state.postState)
	
	const dispatch = useDispatch()
	
	React.useEffect(()=>{
		if(postState.posts && postState.posts.length === 0){
			fetchPosts(dispatch)
		}
	}, [])
	
	
	function handlePostDelete(id) {
		dispatch(deletePost(id))
	}
	
	function downloadBackup(){
		getApi().get("/api/backup", {responseType: "blob"}).then(r=>{
			const url = window.URL.createObjectURL(new Blob([r.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'backup.zip'); //or any other extension
			document.body.appendChild(link);
			link.click();
			link.remove()
		})
	}
	
	
	
	return (
		<div>
			<h4>All Posts</h4>
			
			{ postState.posts.map(p=>(
				<div className="my-1">
					<div className="flex justify-between bg-gray-9 bg-opacity-50 py-2">
						<h4>{p.title}</h4>
						<span>
                <Link to={`/admin/dashboard/add-post/${p.id}`}><i className="pointer fa fa-pen" /></Link>
                <i onClick={()=>handlePostDelete(p.id)} className="pointer fa fa-trash" />
              </span>
					</div>
				
				</div>
			)) }
			
		</div>
	);
};

export default AllPosts;