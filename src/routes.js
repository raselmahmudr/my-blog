import { lazy } from "react";
import ReactLazyPreload from "./utils/ReactLazyPreload";

const HomePage = ReactLazyPreload(()=>import("./pages/homePage/Homepage"));
const About = ReactLazyPreload(()=>import("./components/about/About"));
// const Posts = ReactLazyPreload(()=>import("./pages/posts/Posts"));
const Login = ReactLazyPreload(()=>import("./pages/auth/Login"));
const Registration = ReactLazyPreload(()=>import("./pages/auth/Registration"));
// const Peoples = ReactLazyPreload(()=>import("./pages/findPeoples/Peoples"));
// const LoginHomePage = ReactLazyPreload(()=>import("./pages/loginHomePage/LoginHomePage"));
const PostDetailSimple = ReactLazyPreload(()=>import("./pages/postDetails/PostDetailSimple"));
// const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPostSimple"));
import AddPost from "src/pages/admin/AddPostSimple";
const Dashboard = ReactLazyPreload(()=>import("src/pages/admin/Dashboard"));
const Profile = ReactLazyPreload(()=>import("src/pages/profilePage/ProfilePage"));


const publicRoutes = [
  {path: "/", exact: true, component: HomePage},
  {path: "/author/profile/:username", exact: true, component: Profile},
  {path: "/posts/:slug", exact: true, component: PostDetailSimple},
  {path: "/about", exact: true, component: About}
]

export default (isAuth)=>{
  if(isAuth) {
    return [
      ...publicRoutes,
      { path: "/admin/dashboard", component: Dashboard},
      // { path: "/admin/add-post", component:  AddPost},
      {path: "/auth/login", component: HomePage},
      {path: "/auth/registration", component: HomePage},
    ]
  } else {
    return  [
      ...publicRoutes,
      {path: "/auth/login",  component: Login},
      {path: "/auth/registration", component: Registration},
      {path: "/admin/dashboard/add-post/null",  component: Login},
      {path: "/admin/dashboard",  component: Login},

    ]
  }
}