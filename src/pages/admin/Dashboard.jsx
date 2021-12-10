import React, {lazy, Suspense} from 'react';
// import AddPost from "./AddPost";
import {Switch, Route, NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, fetchPosts} from "../../store/actions/postAction";
import api, {getApi} from "../../apis";
import ProgressBar from "../../components/UI/topProgressBar/TopProgressBar";
import ReactLazyPreload from "../../utils/ReactLazyPreload";



const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPostSimple"));
const DatabaseFiles = ReactLazyPreload(()=>import("./databaseFiles/DatabaseFiles"))
const Login = lazy(()=>import("src/pages/auth/Login"));

const Dashboard = (props) => {

  const authState = useSelector(state=> state.authState)

  function adminRoutes(isAuth){
    if(isAuth) {
      return [
        {path: "/admin/dashboard", exact: true, component: DashboardHome},
        {path: "/admin/dashboard/add-post/:postId", exact: true, component: AddPost},
        {path: "/admin/dashboard/files", exact: true, component: DatabaseFiles}
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
    { to: "/admin/dashboard/add-post/null", exact: true, text: "Add Post" },
    { to: "/admin/dashboard/files", exact: true, text: "Database Files" }
  ]

  function handlePostDelete(id) {
    dispatch(deletePost(id))
  }

  function downloadBackup(){
    getApi().get("/api/backup", {responseType: "blob"}).then(r=>{
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

      <div className="flex dashboard-navigation bg-pink-300 items-center justify-centers shadow_1 mb-4">
        { adminNav.map(nav=>(
            <li className="mx-2 py-1.5">
              <NavLink className="text-white" to={nav.to}>{nav.text}</NavLink>
            </li>
        )) }
      </div>

      <button className="btn mb-2" onClick={downloadBackup}>Download server backup Database</button>


      <h4>All Posts</h4>

      { postState.posts.map(p=>(
          <div className="my-1">
            <div className="flex justify-between bg-gray-9 bg-opacity-50 py-2">
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