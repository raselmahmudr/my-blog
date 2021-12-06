import React from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import api from "../../apis";

import "./profile_page.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import queryString from "query-string";
import fullLink from "../../utils/fullLink";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../../store/actions/postAction";
import {faFacebook, faGithub, faTwitter} from "@fortawesome/pro-brands-svg-icons";
import {faGlobe, faPen, faTrash} from "@fortawesome/pro-solid-svg-icons";

const ProfilePage = () => {
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const authState = useSelector(state=>state.authState)

    let query = queryString.parse(history.location.search)
    let [author, setAuthor] = React.useState({})
    let [ownPosts, setOwnPosts] = React.useState([])


    React.useEffect(async ()=>{
        let response = await api.get(`/api/users?username=${params.username}`)
        if(response.status === 200){
            setAuthor(response.data.user)

            response = await api.get(`/api/posts?author_id=${response.data.user.id}`)
            if(response.status === 200){
                setOwnPosts(response.data.posts)
            }

        }
    }, [query.username])

    function deletePostHandler(id) {
        dispatch(deletePost(id))
        setOwnPosts(ownPosts.filter(p=>p.id !== id))

    }

    return (
        <div>
            <div className="profile_hero_header background_cover"  style={{backgroundImage: `url(${fullLink( author.cover ? author.cover : "static/logrocket-blog-header.png")})`}}>
                <div className="relative overlay">
                    <button className="absolute right-2 top-2 btn bg-opacity-40 btn-outline text-white text-sm ">Change Cover</button>
                <div className="container-1000 mx-auto text-center overlay-title ">
                    <div className="relative">
                    <div className="post_cover text-center m-auto relative" style={{width: "100px"}}>
                        <img className="w-full rounded-full" src={fullLink(author.avatar)} alt=""/>
                        <FontAwesomeIcon className="absolute bottom-6 z-10 transform translate-x-1/2 right-1/2" icon={faPen} />
                        {/*<button className="z-10  right-2 top-2 btn btn-outline bg-primary">Change Avatar</button>*/}
                    </div>
                    </div>

                   <div>
                       <h1>{author.first_name} {author.last_name}</h1>
                       <p className="leading-6 text-opacity-90 text-white">{author.description}</p>
                       <div className="social">
                           <FontAwesomeIcon icon={faFacebook}   className='px-1.5 hover:text-primary'/>
                           <FontAwesomeIcon icon={faTwitter}  className='px-1.5 hover:text-primary' />
                           <FontAwesomeIcon icon={faGithub} className='px-1.5 hover:text-primary' />
                           <FontAwesomeIcon icon={faGlobe} className='px-1.5 hover:text-primary' />
                       </div>
                   </div>
                </div>
                </div>
            </div>
            <div className="container">
                <h4 className="title text-lg text-center">{ownPosts.length} Stories by {author.first_name} {author.last_name}</h4>

                <button>Add a Post</button>

                <FontAwesomeIcon icon={""} />
                <div>
                    { ownPosts.map(post=>(
                        <div className="flex w-full justify-between">
                            <div className="flex own-post ">

                                    <div className="mr-2 post_cover" style={{width: "100px"}}>
                                        <img className="w-full" src={fullLink(post.cover)} alt=""/>
                                    </div>

                                <div className="flex w-full justify-between  flex-12">
                                     <h4 className="hover:text-primary">{post.title}</h4>
                                    { (author && author.id) === (authState && authState.id ) && (
                                        <div className="ml-4">
                                       <span className="action">
                                            <Link to={`/admin/dashboard/add-post/${post.id}`}>
                                                 <FontAwesomeIcon icon={faPen}  className="pointer fa fa-trash ml-3 text-sm " />
                                            </Link>
                                           <FontAwesomeIcon icon={faTrash} onClick={(e)=>deletePostHandler(post.id)} className="pointer fa fa-trash ml-3 text-sm " />
                                            </span>
                                        </div>
                                    )  }
                                </div>
                            </div>

                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};


export default ProfilePage;