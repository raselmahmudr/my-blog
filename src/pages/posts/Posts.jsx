import {connect, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import queryString from "query-string"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./styles.scss";
import {Link, useHistory} from "react-router-dom";
import {deletePost, fetchPosts, filterPost} from "../../store/actions/postAction";
import Loader from "../../components/UI/Loader";
import {faTimesCircle} from "@fortawesome/pro-solid-svg-icons";
import Post from "./Post";

const Posts = (props) => {
  const [isLoading, setLoading] = React.useState(false)

  const {postState, authState} = props
  const [postDetail, setPostDetail] = React.useState({})
  const [commentPagination, setCommentPagination] = React.useState({
    pageSize: 1,
    currentPage: 1
  })


  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(()=>{
    if(postState.posts.length < 1) {
      setLoading(true)
      fetchPosts(dispatch, () => setLoading(false))
    }
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
    <div>

      <div className="px-0">
        <div className="posts_wrapper">
          <div className="filter_items mt-0">
            <div className="flex justify-between">
              {/*<h1 className="title text-lg">All Posts</h1>*/}
              {/*{ authState && authState.id && (*/}
              {/*  <Link  className="btn btn-outline" to="/admin/dashboard/add-post/null">Make A Post</Link>*/}
              {/*) }*/}
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

          <div className="border-b mb-2"/>
            <div className="mx-auto flex justify-center">
              { isLoading && <Loader/>  }
            </div>
            {
              postState.searchResultPosts.length <= 0 ? (
              <h4 className="title text-sm">not posts matched with {postState.searchValue}</h4>
              ) : postState.searchResultPosts.map(post => (
                  <Post post={post} authId={authState.id} />
              ))
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