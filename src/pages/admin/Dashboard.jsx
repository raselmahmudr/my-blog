import React, {Suspense} from 'react';
import {NavLink, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import ProgressBar from "../../components/UI/topProgressBar/TopProgressBar";
import AdminRoutes from "./AdminRoutes";


const Dashboard = (props) => {
  const {authState, appState} = useSelector(state=> state)
  
  
  const adminNav = [
    { to: "/admin/dashboard", exact: true, text: "Dashboard" },
    { to: "/admin/dashboard/add-post/null", exact: true, text: "Add Post" },
    { to: "/admin/dashboard/posts", exact: true, text: "All Posts" },
    { to: "/admin/dashboard/files", exact: true, text: "Markdown Files" }
  ]
  
  
  return (
    <div className="container-1200 px-4">
  
      <div className="flex dashboard-navigation bg-pink-300 items-center justify-centers shadow-md mb-4 mt-4 dark:bg-dark-600 rounded ">
        { adminNav.map(nav=>(
          <li className="mx-2 py-1.5">
            <NavLink className="text-white dark_subtitle font-medium" to={nav.to}>{nav.text}</NavLink>
          </li>
        )) }
      </div>
  
  
      <Switch>
        <Suspense fallback={<ProgressBar/>}>
          {/*{adminRoutes(authState._id).map(route=> <Route {...route} /> )}*/}
          <AdminRoutes
            _id={authState._id}
            isAuthLoaded={authState.isAuthLoaded}
          />
        </Suspense>
      </Switch>
    </div>
  );
};


export default Dashboard;