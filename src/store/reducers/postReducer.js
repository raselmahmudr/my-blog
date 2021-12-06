const initialState = {
  posts: [

  ],
  postDetails: {},
  searchResultPosts: [],
  searchValue: "",
  likes: []
}


export default function (state = initialState, action) {
  let updatedState = {...state}
  let post_id;
  let index;
  switch (action.type) {
    case "FETCH_POSTS":
      updatedState.posts = action.payload
      updatedState.searchResultPosts = action.payload
      return updatedState

    case "FETCH_POST":
      updatedState.postDetails = action.payload
      return updatedState

    case "DELETE_POST":
      let p = updatedState.posts.filter(p=>p.id !== action.payload)
        updatedState.posts = p
        updatedState.searchResultPosts = p
      return updatedState

    case "FETCH_POST_MD_CONTENT":
      updatedState.postDetails.mdContent = action.payload
      return updatedState

    case "SEARCH_POSTS":
      updatedState.searchResultPosts = action.payload
      return updatedState
    
    case "SET_POST_SEARCH_VALUE":
      updatedState.searchValue = action.payload
      return updatedState
    
    case "FETCH_LIKES":
      updatedState.likes = action.payload
      return updatedState
    
    case "ADD_LIKE":
      post_id = action.payload.post_id
      index = updatedState.posts.findIndex(p => p.id === post_id)
      if (index !== -1) {
        updatedState.posts[index] = {
          ...updatedState.posts[index],
          you_liked: 1,
          total_likes: updatedState.posts[index].total_likes + 1
        }
      }
      return updatedState
    
    case "REMOVE_LIKE":
      post_id = action.payload.post_id
      index = updatedState.posts.findIndex(p => p.id === post_id)
      
      if (index !== -1) {
        updatedState.posts[index] = {
          ...updatedState.posts[index],
          you_liked: 0,
          total_likes: updatedState.posts[index].total_likes - 1
        }
      }
      return updatedState
    
    default:
      return state
  }
}

