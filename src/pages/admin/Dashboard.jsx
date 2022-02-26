import React, {Suspense} from 'react';
import {Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import ProgressBar from "../../components/UI/topProgressBar/TopProgressBar";
import AdminRoutes from "./AdminRoutes";


const Dashboard = (props) => {
  const authState = useSelector(state=> state.authState)

  return (
    <div className="container px-15">
      <Switch>
        <Suspense fallback={<ProgressBar/>}>
          {/*{adminRoutes(authState._id).map(route=> <Route {...route} /> )}*/}
          <AdminRoutes _id={authState._id} />
        </Suspense>
      </Switch>
    </div>
  );
};


export default Dashboard;