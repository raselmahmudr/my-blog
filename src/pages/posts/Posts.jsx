import {connect, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import api, {backend} from "../../apis";
import fullLink from "../../utils/fullLink";
import Comments from "../../components/comments/Comments";
import AddComment from "../../components/comments/AddComment";
import queryString from "query-string"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./styles.scss";
import {Link, useHistory} from "react-router-dom";
import {deletePost, fetchPosts, filterPost} from "../../store/actions/postAction";
import Loader from "../../components/UI/Loader";
import {faTimesCircle} from "@fortawesome/pro-solid-svg-icons";

const Posts = (props) => {
  const [isLoading, setLoading] = React.useState(false)

  const {postState, authState} = props
  const [postDetail, setPostDetail] = React.useState({})
  const [commentPagination, setCommentPagination] = React.useState({
    pageSize: 1,
    currentPage: 1
  })
  
  const [showMoreCommentOptionId, setShowMoreCommentOptionId] = React.useState("")
  const [showReplyCommentForm, setShowReplyCommentForm] = React.useState("")
  const [showAddCommentForm, setShowAddCommentForm] = React.useState(false)


  const dispatch = useDispatch()
  const history = useHistory()
  
  let qs = queryString.parse(history.location.search)

  useEffect(()=>{
    if(postState.posts.length < 1) {
      setLoading(true)
      fetchPosts(dispatch, () => setLoading(false))
    }
  }, [])


  useEffect(async () => {
    let val = qs.search
    if (val) {
      let uniqArr = filterPost(postState.posts, val.trim().toLowerCase())
      if (uniqArr.length > 0) {
        dispatch({type: "SEARCH_POSTS", payload: uniqArr})
        dispatch({type: "SET_POST_SEARCH_VALUE", payload: val.trim().toLowerCase()})

        history.replace(`/?search=${val}`)
      } else {
        dispatch({type: "SEARCH_POSTS", payload: []})
        history.replace(`/?search=${val}`)
      }
    } else {
      dispatch({type: "SEARCH_POSTS", payload: postState.posts})
    }
    
  }, [qs && qs.search && qs.search])
  
  function fetchPostDetail(post_id) {
    api.get(`/api/posts/${post_id}`).then(response => {
      if (response.status === 200) {
        setPostDetail(response.data.post)
      }
    })
  }
  
  function fetchMoreComment() {
    let {pageSize, currentPage} = commentPagination
    api.get(`api/comments?${postDetail.id}&page_size=${pageSize}&current_page=${currentPage + 1}`).then(response => {
      if (response.status === 200) {
        let updatedPostDetail = {...postDetail}
        updatedPostDetail.comments.push(...response.data.comments)
        setPostDetail(updatedPostDetail)
        setCommentPagination({
          ...commentPagination,
          currentPage: commentPagination.currentPage + 1
        })
      }
    })
  }
  
  function fetchNestedCommentHandler(comment_id, post_id) {
    api.get(`/api/comments?post_id=${post_id}&parent_id=${comment_id}`).then(r => {
      if (r.status === 200) {
        let commentIdx = postDetail.comments.findIndex(c => c.id === comment_id);
        if (commentIdx !== -1) {
          let updatedPostDetail = {...postDetail}
          updatedPostDetail.comments[commentIdx].reply = r.data.comments
          setPostDetail(updatedPostDetail)
        }
      }
    })
  }
  
  function hideReplyCommentHandler(comment_id) {
    let commentIdx = postDetail.comments.findIndex(c => c.id === comment_id);
    if (commentIdx !== -1) {
      let updatedPostDetail = {...postDetail}
      updatedPostDetail.comments[commentIdx].reply = []
      setPostDetail(updatedPostDetail)
    }
  }
  
  function setShowReplyCommentFormHandler(comment_id) {
    setShowReplyCommentForm(showReplyCommentForm === comment_id ? "" : comment_id)
    
  }
  
  let updatedComments = []

  
  function handleAddLike(post_id, you_liked) {
    if (authState.id) {
      if (you_liked) {
        api.post("/backend/remove-like", {post_id: post_id, user_id: authState.id}).then(r => {
          if (r.status === 201) {
            let data = r.data
            dispatch({
              type: "REMOVE_LIKE",
              payload: data
            })
          }
        })
      } else {
        api.post("/backend/add-like", {post_id: post_id, user_id: authState.id}).then(r => {
          if (r.status === 201) {
            let data = r.data
            dispatch({
              type: "ADD_LIKE",
              payload: data
            })
          }
        })
      }
    }
  }
  
  function postReaction(post) {
    return (
      <div>
        <ul className="flex text-sm">
          <li className="w-30 mx-1 flex items-center">
            <i
              onClick={(e) => handleAddLike(post.id, post.you_liked)}
              onMouseLeave={(e) => !post.you_liked && e.target.classList.remove("fa")}
              onMouseEnter={(e) => e.target.classList.add("fa")}
              className={['cursor-pointer hover:text-pink-700', post.you_liked ? 'fa fa-heart text-pink-400 ' : 'far fa-heart'].join(" ")}/>
            <span className="font-normal ml-1">{post.total_likes > 0 ? post.total_likes : ''}</span>
          </li>
          <li className="ml-5 flex items-center">
            <i className="far fa-comment-alt-dots"/>
            <span className="font-normal ml-1">{post.total_comments > 0 ? post.total_comments : ''}</span>
          </li>
        </ul>
      </div>
    )
  }
  
  function handleToggleMoreOption(comment_id) {
    if (showMoreCommentOptionId === comment_id) {
      setShowMoreCommentOptionId("")
      return
    }
    setShowMoreCommentOptionId(comment_id)
  }
  
  
  function renderComments(post_Id, total_comment) {
    return (
      <div>
        <h3 onClick={() => setShowAddCommentForm(!showAddCommentForm)}
            className="text-sm mt-4 mb-1 font-medium cursor-pointer">Write a Comment...</h3>
        {showAddCommentForm && <AddComment onSubmit={handlePostComment}/>}
        <div className="comment_list mt-5">
          {postDetail.comments && postDetail.comments.map(comment => (
            <Comments
              onSubmitAddComment={handlePostComment}
              onHideReply={hideReplyCommentHandler}
              onDeleteComment={deleteCommentHandler}
              showMoreCommentOptionId={showMoreCommentOptionId}
              handleToggleMoreOption={handleToggleMoreOption}
              onFetchNestedComment={fetchNestedCommentHandler}
              showReplyCommentForm={showReplyCommentForm}
              onSetShowReplyCommentForm={setShowReplyCommentFormHandler}
              comment={comment}
            />
          ))}
          {total_comment && <h5 onClick={fetchMoreComment}
                                className="text-sm font-medium text-center text-gray-light-7 hover:text-primary cursor-pointer">+More
            comment</h5>}
        </div>
      </div>
    
    )
    
  }
  
  function handleClearPostSearch(e) {
    dispatch({type: "SET_POST_SEARCH_VALUE", payload: ""})
    dispatch({type: "SEARCH_POSTS", payload: postState.posts})
    history.replace("/")
  }

  function deletePostHandler(id) {
    props.deletePost(id, (isDeleted)=>{
      console.log(isDeleted)
    })
  }
  
  function renderPosts() {
    return postState.searchResultPosts.map(post => (
        <Link to={`/posts/${post.slug}`}>
          <div className="bg-gray-9 flex my-2 rounded">
            <div style={{width: "100px"}} className="post_cover mr-2">
              <img className="w-full flex" src={fullLink(post.cover)} alt=""/>
            </div>
            <div key={post.id} className="">
              <div className="post-meta">

                <div className="flex">
                  <div>
                    <img className="w-6 rounded-full" src={fullLink(post.author.avatar)} alt=""/>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <h4>{post.author.username}</h4>

                      {/*<i className="fa fa-clock" />*/}
                      <span className="text-sm font-medium">Created at : {new Date(post.created_at).toLocaleDateString()}</span>

                  </div>
                </div>


                {/*{ authState.role === "admin" && (*/}
                {/*  <div className="post_author_action">*/}
                {/*    <Link to={`/admin/dashboard/add-post/${post.id}`}><i className="pointer fa fa-pen" /></Link>*/}
                {/*    <i onClick={()=>deletePostHandler(post.id)} className="ml-10 fa fa-trash pointer" />*/}
                {/*  </div>*/}
                {/*) }*/}
              </div>
              <h4 className="title text-md mt-1">{post.title}</h4>
              {/*{postReaction(post)}*/}
              {postDetail && postDetail.id === post.id && renderComments(post.id, post.total_comments)}
            </div>
          </div>
        </Link>
    ))
  }
  
  return (
    <div>

      <div className="px-0 container">
        <div className="posts_wrapper">
          <div className="filter_items mt-4">
            <div className="flex justify-between">
              <h1 className="title text-lg">All Posts</h1>
              { authState && authState.id && (
                <Link  className="btn btn-outline" to="/admin/dashboard/add-post/null">Make A Post</Link>
              ) }
            </div>
            {postState.searchValue && <ul className="flex align-center">
              <h4 className="title">search by :</h4>
              <h4 className="title search_text">
                {postState.searchValue}
              </h4>
              <FontAwesomeIcon icon={faTimesCircle}  className="ml-5 cursor-pointer text-red-400" onClick={handleClearPostSearch}/>
            < /ul>
            }
          </div>

          <div className="border-b mb-5"/>
            <div className="mx-auto flex justify-center">
              { isLoading && <Loader/>  }
            </div>
            {
              postState.searchResultPosts.length <= 0 ? (
              <h4 className="title text-sm">not posts matched with {postState.searchValue}</h4>
              ) : renderPosts()
            }


        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    postState: state.postState,
    authState: state.authState
  }
}

export default connect(mapStateToProps, { deletePost })(Posts);