import React, {lazy} from 'react';
import {Link, useParams} from "react-router-dom";
import marked from "marked"
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"

import "./style.scss"
import apis from "../../apis";
import fullLink from "../../utils/fullLink";


const PostDetails = (props) => {

  let params = useParams()
  
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
  
  return (
    <div className="container px-15 mt-5">

      {postDetails.author && <div className="post_author_description">
       <div>
         <div className="avatar">
           <img src={fullLink(postDetails.author.avatar)} alt=""/>
         </div>
       </div>
        <div className="user_info">
          <div className="flex align-center">
            <h4 className="title"><Link to={`/author/profile/${postDetails.author.username}`}>{postDetails.author.first_name} {postDetails.author.last_name}</Link></h4>
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

          <div className="post-end-meta flex align-center">
            <h4 className="title">Tags: </h4>
            <ul className="flex">
              {postDetails.tags && postDetails.tags.map(tag => (
                <li key={tag}><Link className="text-blue-500 hover:underline" to={`/?search=${tag}`}>{tag}</Link></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    
    </div>
  );
};

export default PostDetails;