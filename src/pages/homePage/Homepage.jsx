import React from 'react';
import Posts from "../posts/Posts";
import {Link, useHistory} from "react-router-dom";

import "./homepage.scss"
import {filterPost} from "../../store/actions/postAction";
import {useDispatch, useSelector} from "react-redux";
import queryString from "query-string"
const Homepage = () => {
    const postState = useSelector(state=>state.postState)

    let topArticle = [
        { s: "javascript", label: "Javascript"},
        { s: "react", label: "React"},
        { s: "programming", label: "Programming"},
        { s: "web development", label: "Web Development"}
    ]

    const history = useHistory()
    const dispatch = useDispatch()


    React.useEffect(()=>{
        let qs = queryString.parse(history.location.search)
        let val = qs.search
        if (val) {
            let uniqArr = filterPost(postState.posts, val.trim().toLowerCase())
                dispatch({type: "SET_POST_SEARCH_VALUE", payload: val.trim().toLowerCase()})
            if (uniqArr.length > 0) {
                dispatch({type: "SEARCH_POSTS", payload: uniqArr})

                history.replace(`/?search=${val}`)
            } else {
                dispatch({type: "SEARCH_POSTS", payload: []})
                history.replace(`/?search=${val}`)
            }
        } else {
            dispatch({type: "SEARCH_POSTS", payload: postState.posts})
        }


        console.log("ghj")
    }, [history.location.search])

    return (

           <div className="container">

           <div className="top_art mx-auto bg-gray-9 bg-opacity-70 rounded flex px-4  ">
               { topArticle.map((ta, i)=>(
                   <li key={i} className="m-1">
                       <Link className="text-gray-600 text-sm font-medium" to={`/?search=${ta.s}`}>#{ta.label}</Link>
                   </li>
               )) }
           </div>

            <Posts />

        </div>
    );
};

export default Homepage;