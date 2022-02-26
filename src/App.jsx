import React, {useEffect, Suspense, useState} from "react";
import ReactLazyPreload from "./utils/ReactLazyPreload";
import {useStore, useSelector, useDispatch} from "react-redux"
import ProgressBar from "src/components/UI/topProgressBar/TopProgressBar"
const  Navigation = ReactLazyPreload(()=>import("./components/navigation/Navigation"));
import "./App.scss"
import Routes from "./Routes"

import {Route, Switch} from "react-router-dom";
import {fetchCurrentAuth} from "store/actions/authAction"
import Footer from "./components/footer/Footer";
import api, {getApi} from "./apis";
import Backdrop from "./components/UI/Backdrop/Backdrop";

function App(props) {

  let dispatch = useDispatch()

  let { authState, postState, appState} = useSelector((state) => {

    return {
        authState: state.authState,
        appState: state.appState,
        postState: state.postState
    }
  })


    // here should use memo to render Navigation...
    const [expandDropdown, setExpandDropdown] = useState("")
  
  React.useEffect(() => {
    let html = window.document.children[0]
    let theme = window.localStorage.getItem("theme")
    if(theme){
      html.classList.add(theme)
    }

      const loader = document.querySelector(".loader")
      if(loader) {
          loader.parentElement.removeChild(loader)
      }

      fetchCurrentAuth(dispatch)

      api.post("/api/add-cookie").then(r=>{
         dispatch({
             type: "SET_VISITORS",
             payload: {
                 day_visitor: r.data.day_visitor,
                 total_visitors: r.data.total_visitor
             }
         })
      }).catch(ex=>{
          console.log(ex.message)
      })
  }, [])

    function handleCloseAuthMenu(){
        setExpandDropdown("")
        dispatch({
            type: "TOGGLE_APPMASK",
            payload: false
        })
    }

    function handleSetExpandDropdown(id){
      setExpandDropdown(id)
    }

  return (
    <div className="App bg-white dark:bg-dark-800 ">

        { <Backdrop isOpenBackdrop={appState.isOpenBackdrop}  /> }

          <Suspense fallback={<h1>Loading</h1>}>
            <Navigation
              handleSetExpandDropdown={handleSetExpandDropdown}
              expandDropdown={expandDropdown}
              postState={postState}
              authState={authState}
            />
          </Suspense>
            <div
             className="App-Content">
                <div onClick={handleCloseAuthMenu}
                      className={["App-Content-mask",
                        appState.appMask.isOpen ? "mask__open" : "mask__close",
                        appState.appMask.as === "transparent" ? "mask_transparent": "mask__backdrop"
                      ].join(" ")}>
                </div>
                  <div className="viewport">
                     <Routes authState={authState} />
                
                </div>
          <Footer/>
        </div>

    </div>

  )
}



export default App