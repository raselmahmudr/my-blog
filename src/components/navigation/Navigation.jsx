import {Link, NavLink, useHistory} from "react-router-dom";
import "./navigation.scss"
import fullLink from "../../utils/fullLink";
import  React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PreloadLink from "../preloadLink/PreloadLink";
import {filterPost} from "../../store/actions/postAction";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUserAlt,
  faUserCircle,
  faSignIn,
} from '@fortawesome/pro-solid-svg-icons'

import {faAdn} from "@fortawesome/pro-brands-svg-icons";
import {faMoon} from "@fortawesome/pro-solid-svg-icons";

const Logo = (_)=> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="153" height="27.851" viewBox="0 0 153 27.851">
  <defs>
    <radialGradient id="radial-gradient" cx="0.698" cy="0.478" r="3.151" gradientTransform="matrix(1, 0.003, -0.001, 0.192, 0, 0.385)" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#3d2ffb"/>
      <stop offset="0.933" stop-color="#8981eb"/>
      <stop offset="0.979" stop-color="#a8a2ff"/>
      <stop offset="1" stop-color="#efeff1"/>
    </radialGradient>
  </defs>
  <g id="Group_30" data-name="Group 30" transform="translate(-50 -30.149)">
    <g id="Group_109" data-name="Group 109" transform="translate(50 30.149)">
      <rect id="Rectangle_31" data-name="Rectangle 31" width="4.983" height="27.563" rx="2.492" transform="matrix(0.857, 0.515, -0.515, 0.857, 14.708, 0)" fill="url(#radial-gradient)"/>
      <rect id="Rectangle_32" data-name="Rectangle 32" width="4.561" height="27.913" rx="2.281" transform="matrix(0.857, 0.515, -0.515, 0.857, 21.512, 0.977)" fill="url(#radial-gradient)"/>
      <rect id="Rectangle_33" data-name="Rectangle 33" width="4.561" height="26.512" rx="2.281" transform="matrix(0.857, 0.515, -0.515, 0.857, 27.725, 2.777)" fill="url(#radial-gradient)"/>
      <rect id="Rectangle_34" data-name="Rectangle 34" width="4.19" height="9.858" rx="2.095" transform="matrix(0.857, 0.515, -0.515, 0.857, 27.929, 13.47)" fill="url(#radial-gradient)"/>
      <rect id="Rectangle_35" data-name="Rectangle 35" width="4.19" height="9.858" rx="2.095" transform="matrix(0.857, 0.515, -0.515, 0.857, 5.077, 5.557)" fill="url(#radial-gradient)"/>
    </g>
    <text id="DEV_STORY" data-name="DEV STORY" transform="translate(90 52)"
          fill="#5d51ff" font-size="22"
          font-family="Roboto-Medium, Roboto"
          font-weight="800" letter-spacing="-0.015em">
      <tspan x="0" y="0">DEV STORY</tspan></text>
  </g>
</svg>


const Navigation = (props) => {
  
  const {authState, postState, expandDropdown, handleSetExpandDropdown } = props
  
  const history = useHistory()
  const dispatch = useDispatch()


  
  function logoutRoutePush(){
    window.localStorage.setItem("token", "")
    dispatch({
      type: "LOGIN",
      payload: {}
    })
  }

  function authDropdown(isShow) {
    return isShow && (
      <div className="dropdown_nav">
        <div className="min-w-200px card bg-white text-sm font-medium">
          { authState._id ? (
            <>
              { authState.role === "admin" && (
                  <li className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                    <FontAwesomeIcon icon={faAdn} className="mr-2 text-gray-800" />
                    <PreloadLink className="block" onClick={()=>handleSetExpandDropdown("")}  to="/admin/dashboard">Dashboard</PreloadLink>
                  </li>
              ) }
              <li  className="flex hover:bg-opacity-40 hover:bg-primary hover:text-white cursor-pointer px-2 py-2">
                <PreloadLink className="block" to={`/author/profile/${authState.username}/${authState._id}`}>
                  <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-gray-800" />
                  Profile
                </PreloadLink>
              </li>
              <li onClick={()=> logoutRoutePush("/user/profile") } className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-gray-800" />
                Logout
              </li>
            </>
          ) : (
            <li
            className="flex flex-1 items-center hover:bg-primary hover:bg-opacity-40 hover:text-white  cursor-pointer  px-2 py-2"
            // onClick={()=> pushRoute("/auth/login") }
          >
              <PreloadLink className="block" to="/auth/login">
                <FontAwesomeIcon  className="mr-2 text-gray-800" icon={faSignIn} />
                Login
                </PreloadLink>
              </li>
            )
          }
        </div>
      </div>
    )
  }
  
  function searchHandler(e) {
    let val = postState.searchValue.trim().toLowerCase()
    if(val) {
      let uniqArr = filterPost(postState.posts, val)
      if (uniqArr.length > 0) {
        dispatch({type: "SEARCH_POSTS", payload: uniqArr})
        history.replace(`/?search=${val}`)
      } else {
        dispatch({type: "SEARCH_POSTS", payload: []})
        history.replace(`/?search=${val}`)
      }
    } else {
      dispatch({type: "SEARCH_POSTS", payload: postState.posts})
      history.replace(`/`)
    }
  }

  function handleChange(e) {
    if(e.target.value.trim()){
      dispatch({type: "SET_POST_SEARCH_VALUE", payload: e.target.value.trim()})
    } else {
      dispatch({type: "SEARCH_POSTS", payload: postState.posts})
      dispatch({type: "SET_POST_SEARCH_VALUE", payload: ""})
    }
  }

  function openMenuHandler(e) {
    if(expandDropdown === "user_menu") {
      handleSetExpandDropdown("")
      dispatch({
        type: "TOGGLE_APPMASK",
        payload: false
      })
    } else {
      handleSetExpandDropdown("user_menu")
      dispatch({
        type: "TOGGLE_APPMASK",
        payload: {
          as: "transparent",
          isOpen: true
        }
      })
    }
  }

  function toggleDarkTheme(e) {
    let theme =  localStorage.getItem("theme")
    if(theme === "dark"){
      window.document.children[0].classList.remove("dark")
      localStorage.setItem("theme", "")
    } else {
      localStorage.setItem("theme", "dark")
      window.document.children[0].classList.add("dark")
    }
  }
  
  return (
    <>
      <div className="navigation bg-nav-light dark:bg-gray-900">

        <div className="navigation__container px-2 md:px-5 ">
          <ul className="main-nav ">

            <div className="nav-logo flex-4 md:flex-2   ">
              <div className="flex align-center">
                <div className="brand">
                  <Link to="/" className="flex">
                    <Logo />
                    {/*<img className="w-7 mr-2" src="https://res.cloudinary.com/dbuvg9h1e/image/upload/v1638967729/Asset_2_zadmyf.svg" alt=""/>*/}
                    {/*<h4>DEV STORY</h4>*/}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Hidden on Mobile */}
            <div className="flex-5 nav-search-input_wrapper hidden md:flex">
              <input
                onKeyPress={(e)=>e.key === "Enter" && searchHandler(e)}
                value={postState.searchValue}
                onChange={handleChange}
                className="nav-search-input"
                type="text"
                placeholder="Search posts"
              />
              <FontAwesomeIcon icon={faSearch} className="pointer " onClick={searchHandler} />
            </div>
            {/* show on Mobile */}
            <div className="flex mr-4 sm:hidden">
              <FontAwesomeIcon icon={faSearch} className="pointer text-gray-500 " onClick={searchHandler} />
            </div>
            
            {/*<div className="nav-center flex-5 md:flex-1">*/}
            {/*  <ul className="nav_items flex  justify-end align-center">*/}
            {/*    <li className="nav_item hidden md:flex ">*/}
            {/*      <Link to="/" className="flex">*/}
            {/*        <FontAwesomeIcon icon={faHome} className="text-md text-white" />*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
  
            <div className="nav-auth flex-5 hidden md:block">
              <ul className="nav_items flex justify-end align-center text-gray-600 dark:text-gray-300">
                
                {/*<div className="px-0 flex relative items-center"*/}
                {/*     // onMouseLeave={()=>handleSetExpandDropdown("")}*/}
                {/*     // onMouseEnter={()=>handleSetExpandDropdown("user_menu")}*/}
                {/*     onClick={openMenuHandler} >*/}
                {/*  { authState.id && <h4 className="hidden lg:block text-white font-medium mr-0">{authState.first_name}</h4>}*/}
                {/*  <span className="avatar_logo">*/}
                {/*    { authState.id ? authState.avatar ? (*/}
                {/*            <img className="" src={fullLink( authState.avatar)} />*/}
                {/*        ) : (*/}
                {/*            <FontAwesomeIcon icon={faUserCircle} className="text-xl text-white" />*/}
                {/*        )*/}
                {/*        : (*/}
                {/*            <FontAwesomeIcon icon={faUserCircle} className="text-white text-lg" />*/}
                {/*        )*/}
                {/*    }*/}
                {/*  </span>*/}
                {/*  {authDropdown(expandDropdown === "user_menu")}*/}
                {/*</div>*/}
                
                <li className="nav-item"><NavLink className="nav_link" to="/about">Our Story</NavLink></li>
                <li className="nav-item"><a className="nav_link" href="#">Write Story</a></li>
                { authState._id
                  ? (
                    <div className="nav-item flex align-center relative"
                        onMouseLeave={()=>handleSetExpandDropdown("")}
                         onMouseEnter={()=>handleSetExpandDropdown("user_menu")}
                         onClick={openMenuHandler}
                    >
                      <h4 className="mr-2">{authState.first_name
                        && authState.first_name.length > 15 ? authState.first_name.slice(0, 15)
                        : authState.first_name}
                      </h4>
                      { authState.avatar
                        ? <img className="w-5 rounded-full flex mr-2" src={fullLink( authState.avatar)} />
                        : <FontAwesomeIcon icon={faUserCircle} className="flex text-md text-gray-600 mr-2" />
                      }
                      {authDropdown(expandDropdown === "user_menu")}
                    </div>
                  ) : <li className="nav-item"><NavLink className="nav_link" to="/auth/join">Sign In</NavLink></li>
                }
                <li className={"nav-item"}>
                  <FontAwesomeIcon onClick={toggleDarkTheme} icon={faMoon} />
                </li>
              </ul>
            </div>
            
            <ul className="nav_items">
              <li className="nav-item  md:hidden ">
                { authState._id
                  ? (
                     <div                   onMouseLeave={()=>handleSetExpandDropdown("")}>
                       {authState.avatar
                         ? <img
                              className="w-5 rounded-full flex mr-2"
                              src={fullLink( authState.avatar)}
            
                              onClick={openMenuHandler}
                         />
                         : <FontAwesomeIcon icon={faUserCircle} className="flex text-md text-gray-600 mr-2" />}
                       {authDropdown(expandDropdown === "user_menu")}
                     </div>
                    ) : (
                    <Link to="/auth/join" className="flex">
                      <FontAwesomeIcon icon={faSignInAlt} className="text-base text-md text-gray-500" />
                    </Link>
                  ) }
                  
              </li>
            </ul>
            
          </ul>
          
        </div>
      </div>
      <div className="h-60" />
    </>
  );
};


export default Navigation;