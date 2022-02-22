import api from "../../apis";

export function filterPost(posts, searchValue) {
  let val = searchValue.trim().toLowerCase()
  if (val) {
    let result = []
    posts.map(p => {
      if (p.tags.findIndex(t => t.toLowerCase().indexOf(val) !== -1) !== -1) {
        result.push(p)
      }
      if (p.title.toLowerCase().indexOf(val) !== -1) {
        result.push(p)
      }
    })
    
    let uniqArr = []
    for (let i = 0; i < result.length; i++) {
      let idx = uniqArr.findIndex(u => u.id === result[i].id)
      if (idx === -1) {
        uniqArr.push(result[i])
      }
    }
    
    return uniqArr
    
  } else {
    return posts
  }
}

export  function fetchPosts(dispatch, pathname, cb){
  api.get("/api/posts").then(response=>{
    if(response.status === 200){
      dispatch({
        type: "FETCH_POSTS",
        payload: response.data.posts
      })
      cb()
    } else {
      dispatch({
        type: "FETCH_POSTS",
        payload: []
      })
      cb()
    }
  }).catch(ex=>{
    dispatch({
      type: "FETCH_POSTS",
      payload: []
    })
    cb && cb()
  })
}

export function fetchPostById(postId, dispatch, cb){
  api.get(`/api/posts/${postId}`).then(response=>{
    if(response.status === 200){
      dispatch({
        type: "FETCH_POST",
        payload: response.data.post
      })
      cb(response.data.post)
    }
  })
}

export function fetchPostMdContent(postId, dispatch, cb){
  api.get(`/api/post-content/${postId}`).then(response=>{
    if(response.status === 200){
      dispatch({
        type: "FETCH_POST_MD_CONTENT",
        payload: response.data.mdContent
      })
      cb(response.data.mdContent)
    }
  })
}

export function fetchRawMdContent(path, dispatch, cb){
  
  api.post(`/api/raw-md-content`, { path }).then(response=>{
    if(response.status === 200){
      dispatch({
        type: "FETCH_RAW_MD_CONTENT",
        payload: response.data.mdContent
      })
      cb(response.data.mdContent)
    } else {
      cb("")
    }
  }).catch(ex=>{
    cb("")
  })
  
  
  // api.get(`/api/raw-md-content/${postId}`).then(response=>{
  //   if(response.status === 200){
  //     dispatch({
  //       type: "FETCH_RAW_MD_CONTENT",
  //       payload: response.data.mdContent
  //     })
  //     cb(response.data.mdContent)
  //   } else {
  //     cb("")
  //   }
  // }).catch(ex=>{
  //   cb("")
  // })
  
}

export const deletePost = (postId, path, cb) => async (dispatch) => {
  let response = await api.post(`/api/posts/delete`, { _id: postId, path })
  if (response.status === 200) {
    dispatch({
      type: "DELETE_POST",
      payload: postId
    })
    cb && cb(true)
  }
}

