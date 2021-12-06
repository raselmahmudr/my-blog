import React from 'react';
import {Link, useParams} from "react-router-dom";

import "./addPost.scss"
import {fetchPostById, fetchPostMdContent, fetchRawMdContent} from "src/store/actions/postAction";
import {useDispatch, useSelector} from "react-redux";
import fullLink from "../../utils/fullLink";
import MultiInput from "../../components/UI/multiInput/MultiInput";
import api from "../../apis";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from "highlight.js";
import blobToBase64 from "../../utils/blobToBase64";
import base64ToBlob from "../../utils/base64ToBlob";

const AddPost = (props) => {

  const dispatch = useDispatch()
  const authState = useSelector(state=>state.authState)

  const [markdown_string, setMarkdown_string] = React.useState("")

  let [post, setPost] = React.useState({
    title: "",
    tags: [],
    cover: "",
    isUpdated: false,
    mdContent: ""
  })

  const [cover, serCover] = React.useState({name: "", base: "", blob: ""})

  const params = useParams()

  let m  = new MarkdownIt( {
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
      }
      return '' // use external default escaping
    }
  })


  React.useEffect(()=>{
    if(params.postId !== "null"){
      fetchPostById(params.postId, dispatch, (returnPost)=>{
        setPost({
          ...post,
          ...returnPost,
          isUpdated: true
        })
      })
      fetchRawMdContent(params.postId, dispatch, (content)=>{
        setMarkdown_string(content)
      })
    }
  }, [params.postId])

  React.useEffect(()=>{
    if(params.postId !== "null"){
      fetchRawMdContent(params.postId, dispatch, (content)=>{
        setMarkdown_string(content)
      })
    }
  }, [params.postId])


  function handleChange(e){
    const {name, value, values} = e.target
    let updatedPost = {...post}
    if(name === "tags"){
      updatedPost.tags = values
    } else {
      updatedPost[name] = value
    }
    setPost(updatedPost)
  }

  function handleChangeCoverPhoto(e){
    let file = e.target.files[0]
    blobToBase64(file, (base)=>{
      serCover({name: file.name, base: base, blob: file})
    })
  }

  async function addPostHandler(e){
    e.preventDefault()
    const { isUpdated, id, title, tags } = post
    if(isUpdated) {
      api.post("/api/post/update-post", {
        id,
        title,
        tags,
        cover: post.cover,
        mdContent: markdown_string
      }).then(r => {
        console.log(r)
      })
    } else {

      let formData = new FormData()
      formData.append("title", title)
      formData.append("tags", JSON.stringify(tags))
      formData.append("cover", post.cover)
      formData.append("mdContent", markdown_string)
      formData.append("author_id", authState.id)

      if(cover.blob){
        let r = await base64ToBlob(cover.base)
        formData.append("upload-cover", r, cover.name)
      }

      api.post("/api/post/add-post", formData).then(response=>{
        console.log(response)
      })
    }
  }

  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
  function handleEditorChange({ html, text }) {
    setMarkdown_string(text)
    // console.log('handleEditorChange', html, text);
  }

  
  return (
    <div className="container px-15">
      <div>
        <button className="btn">
          <Link to="/admin/dashboard">Back to Dashboard</Link>
        </button>
      </div>
      <h1 className="title text-lg">{post.isUpdated ? "Update Post" : "Add New Post"}</h1>
    
      
      <div>
  
        <form onSubmit={addPostHandler} className="add-post-form">
          
          <div className="form-group flex-col">
            <label className="block no-wrap font-medium" htmlFor="">Post Title</label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={post.title}
              className="input-elem" />
          </div>
          
          <div className="form-group flex-col">
            <label className="block no-wrap font-medium" htmlFor="">Cover Photo</label>
            <input
              type="file" className="input-elem" onChange={handleChangeCoverPhoto} />
          </div>
          <div className="w-full">
            {cover.base && (
                <img className="w-full" src={cover.base} alt="" />
            )}
          </div>
          <div className="w-full">
            {post.cover && (
              <img className="w-full" src={fullLink(post.cover)} alt=""/>
            )}

          </div>
          
          <div className="form-group flex-col">
            <label className="block no-wrap font-medium" htmlFor="">Tags</label>
            <MultiInput  name="tags" onChange={handleChange} defaultValues={post.tags} />
          </div>
          
          <div className="form-group flex-col">
            <label className="block no-wrap font-medium" htmlFor="">Article</label>
            <MdEditor
                value={markdown_string}
                style={{ height: "500px" }}
                renderHTML={(text) => m.render(text)}
                onChange={handleEditorChange}
            />
            {/*<textarea style={{ minHeight: post.isUpdated ? "500px": "200px" }} className="input-elem ml-5" defaultValue={post.mdContent}></textarea>*/}
          </div>
          
          <button  className="btn">{post.isUpdated ? "Update" : "Add Post"}</button>

        </form>
        
      </div>
      
      
      
    </div>
  );
};


export default AddPost;