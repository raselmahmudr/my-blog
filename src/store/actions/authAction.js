import api from "../../apis/index";
import axios from "axios"


export const fetchCurrentAuth = (dispatch) => {
  api.get("/api/auth/current-auth").then(response => {
    if (response.status === 201) {
      dispatch({
        type: "LOGIN",
        payload: response.data
      })
    }
  }).catch(err=>{
    if(!err.response && !err.status){
      console.log("server are sleeping...")
      axios.get("https://rsl-blog-server.herokuapp.com/pink").then(res=>{
        console.log(res)
        if(res) {
          location.reload();
        }
      }).catch(err=>{
        console.log("******api server closed******")
      })
    }
  })
}

export const loginUser = (userData, dispatch, cb)=> {

  api.post("/api/auth/login", {email: userData.email, password: userData.password})
      .then(response => {
        if (response.status === 201) {
          dispatch({
            type: "LOGIN",
            payload: response.data
          })
            cb(false)
        } else {
            cb(response.data.message)
        }
      })
  .catch(err=> {
      if(err.response){
        cb(err.response.data.message)
      } else {
        cb(err.message)
      }
  })
}


    // dispatch({
    //   type: "LOGIN",
    //   payload: {
    //     id: "1",
    //     username: "rasel",
    //     email: "raselmr005@gmail.com",
    //     avataa
    //     role: "admin"
    //   }
    // })

    // axios.get("https://localhost:1000/api/users").then(doc=>{
    //   console.log(doc)
    // })
    //

