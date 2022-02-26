import {connect, useDispatch} from "react-redux";
import React, {useEffect, Suspense} from "react";
import queryString from "query-string"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./styles.scss";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {deletePost, fetchPosts, filterPost, filterPostUsingTag} from "../../store/actions/postAction";
import Loader from "../../components/UI/Loader";
import {faTimesCircle} from "@fortawesome/pro-solid-svg-icons";

import ReactLazyPreload from "../../utils/ReactLazyPreload";

const RenderPosts  =  ReactLazyPreload(()=>import("../../components/RenderPosts/RenderPosts"));



const PostsFilterPage = (props) => {
  const [isLoading, setLoading] = React.useState(false)

  const location = useLocation()
  
  const {postState, authState} = props
  const [postDetail, setPostDetail] = React.useState({})
  const [commentPagination, setCommentPagination] = React.useState({
    pageSize: 1,
    currentPage: 1
  })


  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()


  useEffect(()=>{
    let val = queryString.parse(history.location.search)
    if(val.tag){
      filterPostUsingTag(dispatch, [val.tag])
    }
    // if(postState.posts.length < 1) {
    //   setLoading(true)
    //   // fetchPosts(dispatch, location.pathname, () => setLoading(false))
    // }
  }, [])
  

  // useEffect(async () => {
  //   let val = qs.search
  //   if (val) {
  //     let uniqArr = filterPost(postState.posts, val.trim().toLowerCase())
  //     if (uniqArr.length > 0) {
  //       dispatch({type: "SEARCH_POSTS", payload: uniqArr})
  //       dispatch({type: "SET_POST_SEARCH_VALUE", payload: val.trim().toLowerCase()})
  //
  //       history.replace(`/?search=${val}`)
  //     } else {
  //       dispatch({type: "SEARCH_POSTS", payload: []})
  //       history.replace(`/?search=${val}`)
  //     }
  //   } else {
  //     dispatch({type: "SEARCH_POSTS", payload: postState.posts})
  //   }
  //   console.log(qs)
  // }, [history.location.search])

  
  let updatedComments = []


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
  
  
  return (
    <div className="container-1000 min-h-viewport">

      <div className="px-0">
        <div className="posts_wrapper">
          <div className="filter_items mt-0">
           
              <Link to="/" className="font-medium">Back to Homepage</Link>
    
            {postState.searchValue && <ul className="flex align-center">
              <h4 className="title">search by :</h4>
              <h4 className="title search_text">
                {postState.searchValue}
              </h4>
              <FontAwesomeIcon icon={faTimesCircle}  className="ml-5 cursor-pointer text-red-400" onClick={handleClearPostSearch}/>
            < /ul>
            }
          </div>

          <div className="mb-2"/>
          
          <div className="flex justify-between bg-gray-100 dark:bg-dark-600 py-4 px-2 rounded">
           <div className="flex align-center">
             <div>Filter By:</div>
             <h2>MEtaData</h2>
           </div>
            <div className="flex align-center">
              <span>Sort By:</span>
              <h2>Created</h2>
            </div>
          </div>
          
            <div className="mx-auto flex justify-center">
              { isLoading && <Loader/>  }
            </div>
            
          
            {
              postState.searchPosts.length <= 0 ? (
              <h4 className="title text-sm"> {!isLoading && `not posts matched with ${postState.searchValue}` }</h4>
              ) : (
                <div className="mt-4">
                  <Suspense fallback={<h1>Loading..</h1>}>
                    <RenderPosts posts={postState.searchPosts} />
                  </Suspense>
                </div>
              )
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

export default connect(mapStateToProps, { deletePost })(PostsFilterPage);