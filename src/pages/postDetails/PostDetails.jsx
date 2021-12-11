import React, {lazy} from 'react';
import {Link, useParams} from "react-router-dom";

import "./style.scss"
import apis, {getApi} from "../../apis";
import fullLink from "../../utils/fullLink";
import api from "../../apis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock,  faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faUserCircle} from "@fortawesome/pro-light-svg-icons";
import {faHeart as faHeartLI} from "@fortawesome/pro-regular-svg-icons";
import {useSelector} from "react-redux";
import PreloadLink from "src/components/preloadLink/PreloadLink";
import PostDetailSkeleton from "./PostDetailSkeleton";

import "highlight.js/styles/atom-one-dark.css"
import {faComment} from "@fortawesome/pro-solid-svg-icons";
import AddComment from "../../components/comments/AddComment";
import Comments from "../../components/comments/Comments";


import AlertHandler from "../../components/AlertHandler/AlertHandler";



const PostDetails = (props) => {

  let params = useParams()
  const authState = useSelector(state=>state.authState)
  
  const [postDetails, setPostDetails] = React.useState({
    mdContent: "",
    comments: [],
    post_id: "",
    user_id: "",
    likes: [],
    tags: []
  })

  const [loadingState, setLoadingState] = React.useState({
    id: "add_comment",
    isLoading: false,
    status: "", // "error" || "success"
    message: ""
  })

  const [isOver, setOver] = React.useState(false)

  React.useEffect(async () => {
    let response = await apis.get(`/api/post/${params.slug}`)
    if(response.status === 200) {
      let updatedPostDetails = {...postDetails}
      let post = response.data.post
      updatedPostDetails = {
        ...updatedPostDetails,
        ...post
      }
      setPostDetails(updatedPostDetails)
    }
  }, [params.slug])


  React.useEffect(async ()=>{
    if(postDetails.id) {
      let mdContentResponse = await apis.get(`/api/post-content/${postDetails.id}`)
      if (mdContentResponse.status === 200) {
        setPostDetails({
          ...postDetails,
          mdContent: mdContentResponse.data.mdContent
        })
      }
    }
  }, [postDetails.id])


  // React.useEffect(() => {
  //   marked.setOptions({
  //     renderer: new marked.Renderer(),
  //     highlight: function (code, lang) {
  //       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //       return hljs.highlight(code, {language}).value;
  //     },
  //     pedantic: false,
  //     gfm: true,
  //     tables: true,
  //     breaks: false,
  //     sanitize: false,
  //     smartLists: true,
  //     smartypants: false,
  //     xhtml: false
  //   });
  // }, [postDetails])


  function handleAddLike(post_id) {
    if (authState.id) {
      api.post("/api/toggle-like", {post_id: post_id, user_id: authState.id}).then(r => {
        if (r.status === 201) {
          let post = r.data.post
          setPostDetails({
            ...postDetails,
            likes: post.likes
          })
        }
      })

    } else {
      alert("You have to login first to like this post")
    }
  }


  function postReaction({id, likes}) {
    let youLiked = likes && likes.indexOf(authState.id) !== -1

    return (
        <div>
          <ul className="flex text-sm">
            <li className="w-30 mx-1 flex items-center">
              <FontAwesomeIcon icon={youLiked ? faHeart : isOver ? faHeart : faHeartLI}
                 onMouseEnter={()=>setOver(true)}
                 onMouseLeave={()=>setOver(false)}
                 onClick={(e) => handleAddLike(id)}
                 className={['cursor-pointer hover:text-pink-700', youLiked ? 'text-pink-400 ' : 'text-gray-800'].join(" ")}
              />
              <h4 className="font-normal ml-1">{likes ? likes.length : '0'}</h4>
            </li>
          </ul>
        </div>
    )
  }


  function renderMarkdownContent(){
    return (
        <div className="article">
          {/*<div className="flex mb-5 justify-center"><img src={fullLink(postDetails.cover)} alt=""/></div>*/}
          <div className="code " dangerouslySetInnerHTML={{__html: postDetails.mdContent}}/>
          <br/>
        </div>
    )
  }


  function postCommentHandler({text, parent_id}){

    setLoadingState({
      ...loadingState,
      isLoading: true
    })

    if(!authState || !authState.id){
      setLoadingState({
        id: "add_comment",
        status: 200,
        message: "You have to Login first to post comment...",
        isLoading: false
      })
      return
    }

    let newComment = {
      text,
      parent_id: parent_id ? parent_id : null,
      user_id: authState.id,
      post_id: postDetails.id,
      username: authState.username,
      avatar: authState.avatar
    }

    getApi().post("/api/comment", newComment).then(r=>{
      if(r.status >= 200 && r.status < 400){
        let updatePostDetail = {...postDetails}
        if(updatePostDetail.comments){
          updatePostDetail.comments.push(r.data.newComment)
        } else {
          updatePostDetail.comments = [r.data.newComment]
        }
        setPostDetails(updatePostDetail)
        setLoadingState({
          id: "add_comment",
          status: 200,
          message: "Your Comment has been posted..",
          isLoading: false
        })
      } else {
        setLoadingState({
          id: "add_comment",
          status: 400,
          message: "Comment post fail..",
          isLoading: false
        })
      }
    }).catch(ex=>{
      setLoadingState({
        id: "add_comment",
        status: 400,
        message: "Comment post fail..",
        isLoading: false
      })
    })
  }

  function commentDeleteHandler(comment_user_id, comment_id){

    if(authState && comment_user_id !== authState.id){
      return;
    }

    setLoadingState({
      ...loadingState,
      isLoading: true
    })

    if(!authState || !authState.id){
      setLoadingState({
        id: "add_comment",
        status: 200,
        message: "You have to Login first to delete comment...",
        isLoading: false
      })
      return
    }



    getApi().delete(`/api/comment?comment_id=${comment_id}&user_id=${authState.id}&post_id=${postDetails.id}`)
        .then(r=>{
          if(r.status >= 200 && r.status < 400) {
            let updatePostDetail = {...postDetails}

            if (updatePostDetail.comments) {
              let idx = updatePostDetail.comments.findIndex(c=>c.id === r.data.id)
              if(idx !== -1){
                updatePostDetail.comments.splice(idx, 1)
              }
            }
            setPostDetails(updatePostDetail)
            setLoadingState({
              id: "add_comment",
              status: 200,
              message: r.data.message,
              isLoading: false
            })
          } else {
            setLoadingState({
              id: "add_comment",
              status: 400,
              message: r.data.message,
              isLoading: false
            })
          }
        })
        .catch(ex=>{
          setLoadingState({
            id: "add_comment",
            status: 400,
            message: ex.response.data.message,
            isLoading: false
          })
      })


  }

  function renderPostComments(){
    return (
        <div>
          <label className="text-md mb-1" htmlFor="">Write a comment</label>
          <AddComment onSubmit={postCommentHandler}  />

          <div className="">
            {postDetails.comments.map(c=>(
                <Comments onDeleteComment={commentDeleteHandler} comment={c} />
            ))}
          </div>

        </div>
    )
  }

  function renderPostFooter(){
    return (
        <div>
          <div className="flex items-center">
            <div className="flex items-center mb-2">
              {postReaction(postDetails)}
              <h4 className="ml-1 text-sm">Loves</h4>
            </div>

            <div className="flex items-center mb-2 ml-4">
              <FontAwesomeIcon icon={faEye} className="text-gray-dark-9" />
              <h4 className="ml-1 text-sm">{postDetails.hits ? postDetails.hits : 0} read</h4>
            </div>


            <div className="flex items-center mb-2 ml-4">
              <FontAwesomeIcon icon={faComment} className="text-blue-500" />
              <h4 className="ml-1 text-sm">{postDetails.comments ? postDetails.comments.length : 0} comments</h4>
            </div>

          </div>

          <div className="post-end-meta flex items-start">
            <h4 className="title">Tags: </h4>
            <ul className="flex flex-wrap">
              {postDetails.tags && postDetails.tags.map(tag => (
                  <li
                      className="bg-gray-9 m-0.5 text-xs py-1 rounded"
                      key={tag}>
                    <Link className="text-gray-80 font-medium text-opacity-60" to={`/?search=${tag}`}>#{tag}</Link></li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="border-b border-gray-9 mb-4 " />

            { renderPostComments() }
          </div>


        </div>
    )
  }

  function closeErrorMessage(){
    setLoadingState({
      ...loadingState,
      isLoading: true
    })
  }



  return (
    <div className="container px-15">
  
  
      <AlertHandler message={loadingState.message} isShown={!loadingState.isLoading} onClick={closeErrorMessage} status={200}/>
  
  
      {postDetails.id ? (
        <div className="post_detail">
          {postDetails.author && <div className="post_author_description items-start">
            <div className="author_info__avatar">
              <div className="avatar">
                {postDetails.author.avatar ? (
                  <img className="w-full rounded-full" src={fullLink(postDetails.author.avatar)} alt=""/>
                  // <img src={fullLink(postDetails.author.avatar)} alt=""/>
                ) : (
                  <FontAwesomeIcon className="text-5xl" icon={faUserCircle}/>
                )}
              </div>
            </div>
        
            <div className="user_info">
              <div className="flex align-center mb-2">
                <h4 className="title">
                  <PreloadLink
                    to={`/author/profile/${postDetails.author.username}`}>{postDetails.author.first_name} {postDetails.author.last_name}</PreloadLink>
                </h4>
                <button className="btn ml-5 btn-outline">Follow</button>
              </div>
              <p className="author_desc">{postDetails.author.description}</p>
            </div>
          </div>
          }
      
      
          {/* post title */}
          <div className="post_meta mt-4">
            <h1 className="title text-3xl">{postDetails.title}</h1>
            <div className="mt-2 mb-4 subtitle text-sm">
              <FontAwesomeIcon icon={faClock} className="mr-1"/>
              <span>Create at {" "}
                {new Date(postDetails.created_at).toDateString()}
                {" "} {new Date(postDetails.created_at).toLocaleTimeString()}
                </span>
            </div>
          </div>
      
          {/* post cover photo */}
          <div className="flex mb-5 justify-center">
            <img className="w-full"
                 src={fullLink(postDetails.cover)} alt=""/>
          </div>
      
          {postDetails.mdContent && (
            <>
              {renderMarkdownContent()}
              {renderPostFooter()}
            </>
          )}
    
        </div>
      ) : (
        <div className="mx-4 mt-4">
          <PostDetailSkeleton.SkeletonMeta/>
          <PostDetailSkeleton.SkeletonContent/>
        </div>
      )}
  
  
      {!postDetails.mdContent && <PostDetailSkeleton.SkeletonContent/>}


    </div>
  );
};

export default PostDetails;