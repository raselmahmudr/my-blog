import React from 'react';
import {Link, useParams} from "react-router-dom";

import "./addPost.scss"
import {fetchPostById, fetchPostMdContent, fetchRawMdContent} from "src/store/actions/postAction";
import {useDispatch, useSelector} from "react-redux";
import fullLink from "../../utils/fullLink";
import MultiInput from "../../components/UI/multiInput/MultiInput";
import api, {getApi} from "../../apis";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"
import blobToBase64 from "../../utils/blobToBase64";
import base64ToBlob from "../../utils/base64ToBlob";
import Loader from "../../components/UI/Loader";
import {CSSTransition} from "react-transition-group";

const AddPost = (props) => {

  const dispatch = useDispatch()
  const authState = useSelector(state=>state.authState)

  const [image, setImage] = React.useState("")
  const [loadingState, setLoadingState] = React.useState({
    id: "photo_upload",
    isLoading: false,
    status: "", // "error" || "success"
    message: ""
  })
  const imageInputRef = React.useRef(null)
  const coverPhotoInputRef = React.useRef(null)


  const [markdown_string, setMarkdown_string] = React.useState("")

  let [post, setPost] = React.useState({
    title: "",
    tags: [],
    cover: "",
    cover_url: "",
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
    const { isUpdated, id, title, tags, cover_url } = post

    if(title && tags.length > 0 && markdown_string){

      if(isUpdated) {

        getApi().post("/api/post/update-post", {
          id,
          title,
          tags,
          cover: cover_url ? cover_url.toString() : post.cover,
          mdContent: markdown_string
        }).then(response => {
          if(response.status < 400 && response.status >= 200) {
            setLoadingState({
              id: "addpost",
              message: "Post Updated",
              status: 200,
              isLoading: false,
            })
          } else {
            setLoadingState({
              id: "addpost",
              message: "Post Update Fail",
              status: 400,
              isLoading: false,
            })
          }
        }).catch(ex=>{
          setLoadingState({
            id: "addpost",
            message: "Post Update Fail",
            status: 400,
            isLoading: false,
          })
        })
      } else {

        let formData = new FormData()
        formData.append("title", title)
        formData.append("tags", JSON.stringify(tags))
        if(post.cover){
          formData.append("cover", post.cover)
        }
        formData.append("mdContent", markdown_string)
        formData.append("author_id", authState.id)

        if(cover.blob){
          let r = await base64ToBlob(cover.base)
          formData.append("upload-cover", r, cover.name)
        } else {
          if(cover_url){
            formData.append("cover", cover_url.toString())
          }
        }

        getApi().post("/api/post/add-post", formData)
        .then(response=>{
          if(response.status < 400 && response.status >= 200){
            setLoadingState({
              id: "addpost",
              message: "Post Upload Successful",
              status: 200,
              isLoading: false,
            })
          } else{
            setLoadingState({
              id: "addpost",
              message: "Post Upload Fail",
              status: 400,
              isLoading: false,
            })
          }
        }).catch(ex=>{
          setLoadingState({
            id: "addpost",
            message: "Post Upload Fail",
            status: 400,
            isLoading: false,
          })
        })
      }


    } else{
      setLoadingState({
        id: "addpost",
        message: "Please fill up all input fields",
        status: 400,
        isLoading: false,
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

  function handleUploadMarkdownImage(e) {
    setLoadingState({
      ...loadingState,
      isLoading: true
    })
    const file = e.target.files[0]
    let data = new FormData()
    data.append("photo", file, file.name)
    api.post("/api/upload-markdown-image", data).then(res=>{
      setImage(res.data.path)
      setLoadingState({
        isLoading: false,
        status: 200,
        id: "photo_upload",
        message: "Upload image success."
      })
    }).catch(ex=>{
      setLoadingState({
        isLoading: false,
        status: 400,
        id: "photo_upload",
        message: "Can't upload image. Try again."
      })
    })
  }

  function handleClickToCopy() {
    var copyText = image
    var input = document.createElement('textarea');
    input.innerHTML = copyText;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    setLoadingState({
      isLoading: false,
      id: "photo_upload",
      status: 200,
      message: "image link copied in clipboard"
    })
  }

  function inputWrapper() {
    return (
        <div className="input_wrapper input-elem flex justify-between">
          <input name="cover_url" onChange={handleChange} className="outline-none w-full" type="text" placeholder="Paster image full url" />
          <button onClick={()=>coverPhotoInputRef.current && coverPhotoInputRef.current.click()} className="cursor-pointer">Upload</button>
        </div>
    )
  }
  
  return (
    <div className="container px-2 mt-2 ">
      <div>
        <button className="btn">
          <Link to="/admin/dashboard">Back to Dashboard</Link>
        </button>
      </div>
      <h1 className="title text-lg text-center font-bold">{post.isUpdated ? "Update Post" : "Add New Post"}</h1>


      {loadingState.id === "addpost" &&
        <CSSTransition unmountOnExit={true} in={loadingState.message} timeout={450} classNames="my-node">
          <div className={loadingState.status === 400 ? "error-alert" : "success-alert"}>
            <h4>{loadingState.message}</h4>
          </div>
        </CSSTransition>
      }
      
      <div>
  
        <form onSubmit={addPostHandler} className="add-post-form">
          
          <div className="form-group flex-col">
            <label className="block no-wrap text-sm" htmlFor="">Post Title</label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={post.title}
              className="input-elem" />
          </div>
          
          <div className="form-group flex-col">
            <label className="block no-wrap text-sm" htmlFor="">Post cover photo</label>
            {inputWrapper()}
            <input
              type="file" ref={coverPhotoInputRef} hidden={true} accept="image/*" onChange={handleChangeCoverPhoto} />
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
            <label className="block no-wrap text-sm" htmlFor="">Tags</label>
            <MultiInput  name="tags" onChange={handleChange} defaultValues={post.tags} />
          </div>

          <div>
             <div>
               <button type="button" onClick={()=>imageInputRef.current && imageInputRef.current.click()}
                 className="btn btn-info mb-2">Upload a Image for Markdown CDN link </button>
               <input onChange={handleUploadMarkdownImage} type="file" accept="image/*" hidden={true} ref={imageInputRef}/>
               { loadingState.id === "photo_upload" && loadingState.isLoading && (
                   <div className="flex flex-col  items-center">
                     <Loader/>
                     <h5>Uploading...</h5>
                   </div>
               ) }

               {loadingState.id === "photo_upload" &&
                 <CSSTransition unmountOnExit={true} in={loadingState.message} timeout={450} classNames="my-node">
                   <div className={loadingState.status === 400 ? "error-alert" : "success-alert"}>
                     <h4>{loadingState.message}</h4>
                   </div>
                 </CSSTransition>
               }

               {  image && <p
                   onClick={handleClickToCopy}
                   className="mt-t text-xs px-2 outline-none font-medium cursor-pointer hover:bg-primary hover:text-white "
               >{image}</p>
                }
               <div className="max-w-xl">
                 { image && <img className="responsive-image" src={image} alt=""/> }
               </div>
             </div>

            <div className="form-group flex-col">
              <label className="block no-wrap text-sm" htmlFor="">Article</label>

              <MdEditor
                  value={markdown_string}
                  style={{ height: "500px" }}
                  renderHTML={(text) => m.render(text)}
                  onChange={handleEditorChange}
              />
              {/*<textarea style={{ minHeight: post.isUpdated ? "500px": "200px" }} className="input-elem ml-5" defaultValue={post.mdContent}></textarea>*/}
            </div>

          </div>
          
          <button  className="btn btn-primary">{post.isUpdated ? "Update" : "Add Post"}</button>

        </form>
        
      </div>
      
      
      
    </div>
  );
};


export default AddPost;