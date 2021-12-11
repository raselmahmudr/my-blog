import {Link, NavLink, useHistory} from "react-router-dom";
import "./navigation.scss"
import fullLink from "../../utils/fullLink";
import  React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PreloadLink from "../preloadLink/PreloadLink";
import {filterPost} from "../../store/actions/postAction";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUserAlt,
  faUserCircle,
  faSignIn,
  faUsers
} from '@fortawesome/pro-solid-svg-icons'

import {faAdn} from "@fortawesome/pro-brands-svg-icons";

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
          { authState.id ? (
            <>
              { authState.role === "admin" && (
                  <li className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                    <FontAwesomeIcon icon={faAdn} className="mr-2 text-gray-800" />
                    <PreloadLink className="block" onClick={()=>handleSetExpandDropdown("")}  to="/admin/dashboard">Dashboard</PreloadLink>
                  </li>
              ) }
              <li  className="flex hover:bg-opacity-40 hover:bg-primary hover:text-white cursor-pointer px-2 py-2">
                <PreloadLink className="block"     to={`/author/profile/${authState.username}`}>
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

  return (
    <>
      <div className="navigation">

        <div className="navigation__container px-2 md:px-5 ">
          <ul className="main-nav">

          <div className="nav-logo flex-2">
            <div className="flex flex align-center">
              <div className="brand">
                <Link to="/" className="flex">
                  <img className="w-7 mr-2" src="https://res.cloudinary.com/dbuvg9h1e/image/upload/v1638967729/Asset_2_zadmyf.svg" alt=""/>
                  <h4>My Blog</h4>
                </Link>
              </div>
              <div className="nav-search-input_wrapper flex-2">
                <input
                    onKeyPress={(e)=>e.key === "Enter" && searchHandler(e)}
                    value={postState.searchValue}
                    onChange={handleChange}
                    className="nav-search-input"
                    type="text"
                    placeholder="Search Blog Posts"
                />
                <FontAwesomeIcon icon={faSearch} className="pointer " onClick={searchHandler} />
              </div>
            </div>
            
          </div>
          <div className="nav-center flex-5 md:flex-1">
            <ul className="nav_items flex  justify-end align-center">
              <li className="nav_item hidden md:flex ">
                <Link to="/" className="flex">
                  <FontAwesomeIcon icon={faHome} className="text-md text-white" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-auth lg:flex-2">
            <ul className="nav_items flex justify-end">
              <div className="px-0 flex relative items-center"
                   // onMouseLeave={()=>handleSetExpandDropdown("")}
                   // onMouseEnter={()=>handleSetExpandDropdown("user_menu")}
                   onClick={openMenuHandler} >
                { authState.id && <h4 className="hidden lg:block text-white font-medium mr-0">{authState.first_name}</h4>}
                <span className="avatar_logo">
                  { authState.id ? authState.avatar ? (
                          <img className="" src={fullLink( authState.avatar)} />
                      ) : (
                          <FontAwesomeIcon icon={faUserCircle} className="text-xl text-white" />
                      )
                      : (
                          <FontAwesomeIcon icon={faUserCircle} className="text-white text-lg" />
                      )
                  }
                </span>
                {authDropdown(expandDropdown === "user_menu")}
              </div>
              {/*<li><i className="fa fa-cog" /> </li>*/}
            </ul>
            
          </div>
        </ul>
        </div>
      </div>
      <div className="h-60" />
    </>
  );
};


export default Navigation;