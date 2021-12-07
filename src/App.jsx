import React, {useEffect, Suspense} from "react";
import {useStore, useSelector, useDispatch} from "react-redux"
import ProgressBar from "src/components/UI/topProgressBar/TopProgressBar"
import Navigation from "./components/navigation/Navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import "./App.scss"

import routes from "./routes"
import {Route, Switch} from "react-router-dom";

import {fetchCurrentAuth} from "store/actions/authAction"
import Footer from "./components/footer/Footer";
import api from "./apis";


function App(props) {
  
  let dispatch = useDispatch()
  
  let {authState, postState} = useSelector((state) => {
    return {authState: state.authState, postState: state.postState}
  })
  
  React.useEffect(() => {
      fetchCurrentAuth(dispatch)
      api.post("/api/add-cookie").then(r=>{
         dispatch({
             type: "SET_VISITORS",
             payload: {
                 day_visitors: r.data.day_visitor.ids,
                 total_visitors: r.data.total_visitor.ids
             }
         })
      })
  }, [])
  
  return (
    <div className="App">

      <Navigation postState={postState} authState={authState}/>
      <div className="viewport">
          <Switch>
              <Suspense fallback={<ProgressBar/>}>
                  {routes(!!authState.id).map((route, i) => <Route key={i} {...route} />)}
              </Suspense>
          </Switch>
      </div>
      <Footer/>
    </div>
  )
}

export default App