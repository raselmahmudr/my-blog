import React, {lazy, Suspense} from 'react';
import AddPost from "./AddPost";
import {Switch, Route, NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, fetchPosts} from "../../store/actions/postAction";
import api from "../../apis";
import ProgressBar from "../../components/UI/topProgressBar/TopProgressBar";


const Login = lazy(()=>import("src/pages/auth/Login"));

const Dashboard = (props) => {

  const authState = useSelector(state=> state.authState)

  function adminRoutes(isAuth){
    if(isAuth) {
      return [
        {path: "/admin/dashboard", exact: true, component: DashboardHome},
        {path: "/admin/dashboard/add-post/:postId", exact: true, component: AddPost}
      ]
    } else {
      return [
        {path: "/admin/dashboard",  component: Login},
        {path: "/admin/dashboard/add-post/:postId",   component: Login}
      ]
    }
  }

  return (
    <div className="container px-15">
      <Switch>
        <Suspense fallback={<ProgressBar/>}>
        {adminRoutes(authState.id).map(route=> <Route {...route} /> )}
        </Suspense>
      </Switch>
      
    </div>
  );
};


const DashboardHome = (props)=>{
  const postState = useSelector(state=>state.postState)

  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(postState.posts && postState.posts.length === 0){
      fetchPosts(dispatch)
    }
  }, [])

  const adminNav = [
    { to: "/admin/dashboard/add-post/null", exact: true, text: "Add Post" }
  ]

  function handlePostDelete(id) {
    dispatch(deletePost(id))
  }

  function downloadBackup(){
    api.get("/api/backup", {responseType: "blob"}).then(r=>{
      const url = window.URL.createObjectURL(new Blob([r.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'backup.zip'); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove()
    })
  }

  return (
    <div className="container px-4">
      <h2 className="my-2">Admin Dashboard</h2>
      {/*{ adminNav.map(nav=>(*/}
      {/*  <NavLink to={nav.to}>{nav.text}</NavLink>*/}
      {/*)) }*/}

      <button className="btn mb-2" onClick={downloadBackup}>Download server backup Database</button>


      <h4>All Posts</h4>

      { postState.posts.map(p=>(
          <div>
            <div className="flex justify-between">
              <h4>{p.title}</h4>
              <span>
                <Link to={`/admin/dashboard/add-post/${p.id}`}><i className="pointer fa fa-pen" /></Link>
                <i onClick={()=>handlePostDelete(p.id)} className="pointer fa fa-trash" />
              </span>
            </div>

          </div>
      )) }

    </div>
  )
}

export default Dashboard;