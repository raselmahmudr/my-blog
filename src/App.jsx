import React, {useEffect, Suspense, useState} from "react";
import {useStore, useSelector, useDispatch} from "react-redux"
import ProgressBar from "src/components/UI/topProgressBar/TopProgressBar"
import Navigation from "./components/navigation/Navigation";


import "./App.scss"

import routes from "./routes"
import {Route, Switch} from "react-router-dom";

import {fetchCurrentAuth} from "store/actions/authAction"
import Footer from "./components/footer/Footer";
import api from "./apis";
import Backdrop from "./components/UI/Backdrop/Backdrop";


function App(props) {
  
  let dispatch = useDispatch()
  
  let { authState, postState, appState} = useSelector((state) => {

    return {
        authState: state.authState,
        appState: state.appState,
        postState: state.postState}
  })


    // here should use memo to render Navigation...
    const [expandDropdown, setExpandDropdown] = useState("")

  
  React.useEffect(() => {
      const loader = document.querySelector(".loader")
      if(loader) {
          loader.parentElement.removeChild(loader)
      }

      
      fetchCurrentAuth(dispatch)
      api.post("/api/add-cookie").then(r=>{
         dispatch({
             type: "SET_VISITORS",
             payload: {
                 all_time_visit: r.data.day_visitor.ids,
                 total_visitors: r.data.total_visitor.ids
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
    <div className="App">

        { <Backdrop isOpenBackdrop={appState.isOpenBackdrop}  /> }

          <Navigation
              handleSetExpandDropdown={handleSetExpandDropdown}
              expandDropdown={expandDropdown}
              postState={postState}
              authState={authState}
          />
            <div
             className="App-Content">
                <div onClick={handleCloseAuthMenu}
                      className={["App-Content-mask",
                        appState.appMask.isOpen ? "mask__open" : "mask__close",
                        appState.appMask.as === "transparent" ? "mask_transparent": "mask__backdrop"
                      ].join(" ")}>
                </div>
                  <div className="viewport">
                      <Switch>
                          <Suspense fallback={<ProgressBar/>}>
                              {routes(!!authState.id).map((route, i) => <Route key={i} {...route} />)}
                          </Suspense>
                      </Switch>

                </div>
          <Footer/>
        </div>

    </div>

  )
}

export default App