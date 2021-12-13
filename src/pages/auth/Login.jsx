import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux"
import { loginUser } from "src/store/actions/authAction";
import {CSSTransition} from "react-transition-group";
import "./Login.scss"


const Login = (props) => {
  
  const dispatch = useDispatch()
  const history = useHistory()

  const [message, setMessage] = React.useState("")

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  })
  
  
  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim()
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    let complete = true;
    for (const userDataKey in userData) {
      if (!userData[userDataKey]) {
        complete = false
      }
    }
    if (complete) {
      loginUser(userData, dispatch, (err)=>{
        if(err){
          setMessage(err)
        } else {
          history.push("/")
        }
      })
    } else {
      setMessage("You have to fill all field")
    }
  }


  return (
    <div>
      <div className="container mx-auto">


        <div className="bg-white px-6 py-4 rounded-5 max-w-xl mx-auto">
          <h1 className="text-2xl font-400 text-gray-light-7 text-center mb-5">Login in your Account.</h1>

          <CSSTransition unmountOnExit={true} in={message} timeout={500} classNames="my-node" >
            <div className="error-alert">
              <h4>{message}</h4>
            </div>
          </CSSTransition>

          <form onSubmit={handleSubmit} className="py-5">
            <div className=" flex mb-2 flex-col md:flex-row">
              <label
                  className="font-medium min-w-100px block text-sm font-400 text-gray-dark-4"
                  htmlFor="">Email</label>
              <input
                onChange={handleChange}
                value={userData.email}
                placeholder="Enter Your Email."
                className="input-elem" type="text" name="email"/>
            </div>
            <div className="mb-2 flex flex-col md:flex-row ">
              <label className="font-medium min-w-100px block text-sm font-400 text-gray-dark-4 "
                     htmlFor="">Password</label>
              <input
                onChange={handleChange}
                value={userData.password}
                placeholder="Enter Your Password."
                className="w-full input-elem"
                type="text" name="password"
              />
            </div>
            <div className="mt-2 mb-3 flex flex-col md:flex-row">
              <h4 className="text-sm font-400">Not have a account?
                <span className="cursor-pointer text-blue-400 p-px ml-0.5 ">
                  <Link to="/auth/registration">Create a account new account</Link>
                </span>
              </h4>
            </div>
            <div>
              <button className="btn">Login</button>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  );
};

export default Login;