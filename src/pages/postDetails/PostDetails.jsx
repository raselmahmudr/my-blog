import React, {lazy} from 'react';
import {Link, useParams} from "react-router-dom";
import marked from "marked"
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"

import "./style.scss"
import apis from "../../apis";
import fullLink from "../../utils/fullLink";
import api from "../../apis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faHeart} from "@fortawesome/pro-solid-svg-icons";
import { faUserCircle} from "@fortawesome/pro-light-svg-icons";
import {faHeart as faHeartLI} from "@fortawesome/pro-regular-svg-icons";
import {useSelector} from "react-redux";
import PreloadLink from "src/components/preloadLink/PreloadLink";


const PostDetails = (props) => {

  let params = useParams()
  const authState = useSelector(state=>state.authState)
  
  const [postDetails, setPostDetails] = React.useState({mdContent: ""})

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
      let mdContentResponse = await apis.get(`/api/post-content/${post.id}`)
      if(mdContentResponse.status === 200){
        setPostDetails({
          ...updatedPostDetails,
          mdContent: mdContentResponse.data.mdContent
        })
      }
    }
  }, [params.slug])
  
  React.useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, {language}).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  }, [postDetails])


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


  function postReaction(post) {
    const [isOver, setOver] = React.useState(false)
    let youLiked = post.likes?.indexOf(authState.id) !== -1

    return (
        <div>
          <ul className="flex text-sm">
            <li className="w-30 mx-1 flex items-center">
              <FontAwesomeIcon icon={youLiked ? faHeart : isOver ? faHeart : faHeartLI}
                 onMouseEnter={()=>setOver(true)}
                 onMouseLeave={()=>setOver(false)}
                 onClick={(e) => handleAddLike(post.id)}
                 className={['cursor-pointer hover:text-pink-700', youLiked ? 'text-pink-400 ' : 'text-gray-800'].join(" ")}/>
              <h4 className="font-normal ml-1">{post.likes ? post.likes.length : '0'}</h4>
            </li>
          </ul>
        </div>
    )
  }


  return (
    <div className="container px-15 mt-5">

      {postDetails.author && <div className="post_author_description items-start">
       <div>
         <div className="avatar">
           {postDetails.author.avatar ? (
               <img className="w-full rounded-full" src={fullLink(postDetails.author.avatar)} alt=""/>
           // <img src={fullLink(postDetails.author.avatar)} alt=""/>
           ) : (
               <FontAwesomeIcon className="text-5xl" icon={faUserCircle} />
           ) }
         </div>
       </div>
        <div className="user_info">
          <div className="flex align-center">
            <h4 className="title">
              <PreloadLink  to={`/author/profile/${postDetails.author.username}`}>{postDetails.author.first_name} {postDetails.author.last_name}</PreloadLink></h4>
            <button className="btn ml-5 btn-outline">Follow</button>
          </div>
          <p className="author_desc">{postDetails.author.description}</p>
        </div>
      </div>
      }


      <div className="post_detail">
        <div className="post_meta">
          <h1 className="title text-3xl">{postDetails.title}</h1>
          <div className="mt-5 subtitle text-sm">
            <i className="fa mr-2 fa-clock"/>
            <span>Create At {new Date(postDetails.created_at).toDateString()}</span>
          </div>
        </div>

        <div className="article">
          <div className="flex mb-5 justify-center"><img src={fullLink(postDetails.cover)} alt=""/></div>

          <div className="code " dangerouslySetInnerHTML={{__html: postDetails.mdContent}}/>

          <br/>

          <div className="flex items-center">
            <div className="flex items-center mb-2">
              {postReaction(postDetails)}
              <h4 className="ml-1 text-sm">Loves</h4>
            </div>

            <div className="flex items-center mb-2 ml-4">
              <FontAwesomeIcon icon={faEye} />
              <h4 className="ml-1 text-sm">{postDetails.hits ? postDetails.hits : 0} read</h4>
            </div>
          </div>


          <div className="post-end-meta flex align-center">
            <h4 className="title">Tags: </h4>
            <ul className="flex">
              {postDetails.tags && postDetails.tags.map(tag => (
                <li
                    className="bg-gray-9 m-2 text-xs py-1 rounded"
                    key={tag}>
                  <Link className="text-gray-80 font-medium text-opacity-60" to={`/?search=${tag}`}>#{tag}</Link></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    
    </div>
  );
};

export default PostDetails;