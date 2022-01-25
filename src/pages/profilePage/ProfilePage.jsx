import React, {Suspense} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import api from "../../apis";

import "./profile_page.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import fullLink from "../../utils/fullLink";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../../store/actions/postAction";
import {faFacebook, faGithub, faLinkedin, faTwitter} from "@fortawesome/pro-brands-svg-icons";
import {faGlobe, faPen, faTrash, faUserCircle} from "@fortawesome/pro-solid-svg-icons";
import blobToBase64 from "../../utils/blobToBase64";
import PreloadLink from "../../components/preloadLink/PreloadLink";
import ProfileSkeleton from "./ProfileSkeleton";
import parseTextToHtml from "../../utils/parseTextToHtml";
import ReactLazyPreload from "../../utils/ReactLazyPreload";


const ProfileEditor = ReactLazyPreload(()=>import("./ProfileEditor"));

const ProfilePage = () => {
    const params = useParams()

    const dispatch = useDispatch()
    const authState = useSelector(state=>state.authState)

    const profilePhotoInput = React.useRef()
    const profileCoverPhotoInput = React.useRef()

    let [author, setAuthor] = React.useState({})
    let [ownPosts, setOwnPosts] = React.useState([])

    const [photo, setPhoto] = React.useState({
        cover: {base: '', blob: ''},
        avatar: {base: '', blob: ''},
    })


    React.useEffect(async ()=>{
        let response = await api.get(`/api/users/${params.id}`)
        if(response.status === 200){
            setAuthor(response.data.user)

            response = await api.get(`/api/posts?author_id=${response.data.user.id}`)
            if(response.status === 200){
                setOwnPosts(response.data.posts)
            }

        }
    }, [params.id])
    

    
    
    function deletePostHandler(id) {
        dispatch(deletePost(id))
        setOwnPosts(ownPosts.filter(p=>p.id !== id))
    }

    function uploadProfilePhoto(fieldName, blob){
        let data = new FormData()
        data.append(fieldName, blob, blob.name ? blob.name : "")
        api.post(`${fieldName === "avatar" 
            ? 'api/upload-profile-photo' 
            : 'api/upload-profile-cover-photo'}`, data).then(r=>{
            console.log(r)
        }).catch(ex=>{
            // console.log(ex)
        })
    }


    function photoChangeHandler(e) {

        blobToBase64(e.target.files[0], (base)=>{
            if(base) {
                setPhoto({
                    ...photo,
                    [e.target.name]: {
                        base
                    }
                })
                uploadProfilePhoto(e.target.name, e.target.files[0])
            }
        })
    }


    function renderCoverPhoto(){
        if(author.cover){
            return photo.cover.base
                ? photo.cover.base
                : fullLink(author.cover)

        } else {
            return photo.cover.base
                ? photo.cover.base
                : ""
        }
    }

    React.useEffect(()=>{
        return ()=>{
            setPhoto({
                cover: {base: '', blob: ''},
                avatar: {base: '', blob: ''},
            })
        }
    }, [])

   

    return (
             author.id ? <div>
                
                <div className="profile_hero_header background_cover"
                     style={{backgroundImage: `url(${renderCoverPhoto()})`}}>
                    <div className="relative overlay">
                        <input accept="image/*" onChange={photoChangeHandler} name="avatar" ref={profilePhotoInput}
                               type="file" hidden={true}/>
                        <input accept="image/*" onChange={photoChangeHandler} name="cover" ref={profileCoverPhotoInput}
                               type="file" hidden={true}/>
                        {authState.id === author.id && <button
                            onClick={() => profileCoverPhotoInput.current && profileCoverPhotoInput.current.click()}
                            className="absolute right-2 top-2 btn bg-opacity-40 btn-outline text-white text-sm ">Change
                            Cover</button>}
                        
                        <div className="container-1000 mt-0 mx-auto text-center overlay-title ">
                            <div className="relative">
                                <div className="post_cover text-center m-auto relative" style={{width: "100px"}}>
                                    {author.avatar ? (
                                        photo.avatar.base
                                            ? <img className="w-full rounded-full" src={photo.avatar.base} alt=""/>
                                            :
                                            <img className="w-full rounded-full" src={fullLink(author.avatar)} alt=""/>
                                    ) : (
                                        photo.avatar.base
                                            ? <img className="w-full rounded-full" src={photo.avatar.base} alt=""/>
                                            : <FontAwesomeIcon className="text-9xl" icon={faUserCircle}/>
                                    )}
                                    {authState.id === author.id && <FontAwesomeIcon
                                        onClick={() => profilePhotoInput.current && profilePhotoInput.current.click()}
                                        className="absolute bottom-6 z-10 transform translate-x-1/2 right-1/2"
                                        icon={faPen}
                                    />}
                                    {/*<button className="z-10  right-2 top-2 btn btn-outline bg-primary">Change Avatar</button>*/}
                                </div>
                            </div>

                            <div>
                                <h1>{author.first_name} {author.last_name}</h1>
                                {/*<p className="leading-6 text-opacity-90 text-white">{author.description}</p>*/}
                                <p className="leading-6 text-opacity-90 text-white"
                                    dangerouslySetInnerHTML={{__html: author.about_you && parseTextToHtml(author.about_you)}}
                                >
                                </p>
                                <div className="social flex justify-center">
                                    <li className="mr-2">
                                        <a href="https://www.facebook.com/raselmraju" target="_blank">
                                            <FontAwesomeIcon icon={faFacebook}/>
                                        </a>
                                    </li>
                                    <li className="mr-2">
                                        <a href="https://github.com/rasel-code-dev" target="_blank">
                                            <FontAwesomeIcon icon={faGithub}/>
                                        </a>
                                    </li>
                                    <li className="mr-4">
                                        <a href="https://www.linkedin.com/in/rasel-code-dev" target="_blank">
                                            <FontAwesomeIcon icon={faLinkedin}/>
                                        </a>
                                    </li>
                                    <li className="mr-2">
                                        <a href="https://rasel-code-dev.vercel.app" target="_blank">
                                            <FontAwesomeIcon icon={faGlobe}/>
                                        </a>
                                    </li>

                                    {/*<FontAwesomeIcon icon={faFacebook} className='text-lg px-1.5 hover:text-primary'/>*/}
                                    {/*<FontAwesomeIcon icon={faTwitter}  className='text-lg px-1.5 hover:text-primary' />*/}
                                    {/*<FontAwesomeIcon icon={faGithub} className='text-lg px-1.5 hover:text-primary' />*/}
                                    {/*<FontAwesomeIcon icon={faGlobe} className='text-lg px-1.5 hover:text-primary' />*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h4 className="title text-lg text-center mt-4">{ownPosts.length} Stories
                        by {author.first_name} {author.last_name}</h4>


                    <div className="user-content-wrapper">
                        {authState.id === author.id &&
                        <div className="my-4">
                            <Link className="btn btn-outline" to="/admin/dashboard/add-post/null">Make A Post</Link>
                        </div>
                        }

                        {/*// own posts start..........*/}
                        {/*// own posts end..........*/}
                        <div className="user-posts mt-4">
                            {ownPosts.map((post) => (
                                <div key={post.id} className="bg-gray-10 p-2 my-1">
                                    <div className="flex own-post ">

                                        <div className="mr-2 post_cover" style={{width: "100px"}}>
                                            <img className="w-full" src={fullLink(post.cover)} alt=""/>
                                        </div>

                                        <div className="flex w-full justify-between  flex-12">
                                            <PreloadLink to={`/posts/${post.slug}/${post.id}`}>
                                                <h4 className="hover:text-primary">{post.title}</h4>
                                            </PreloadLink>
                                            {(author && author.id) === (authState && authState.id) && (
                                                <div className="ml-4">
                                                <span className="action flex">
                                                <Link to={`/admin/dashboard/add-post/${post.id}`}>
                                                     <FontAwesomeIcon icon={faPen}
                                                                      className="pointer fa fa-trash ml-3 text-sm "/>
                                                </Link>
                                               <FontAwesomeIcon icon={faTrash}
                                                                onClick={(e) => deletePostHandler(post.id)}
                                                                className="pointer fa fa-trash ml-3 text-sm "/>
                                                </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>
                        
                        { authState && author && author.id === authState.id &&
                            <Suspense fallback={<div></div>}>
                                <ProfileEditor dispatch={dispatch} author={author}/>
                            </Suspense>
                        }
                    </div>
                </div>

        </div>
     : (
         <div className="container-1000">
             <ProfileSkeleton />
         </div>
     )) ;
};


export default ProfilePage;