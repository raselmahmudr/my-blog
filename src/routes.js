import {lazy} from "react";

// this function function for lazy route load...........
const ReactLazyPreload  = (importStatementFn)=>{
  const Component = lazy(importStatementFn)
  
  // Component.preload call when preload link clicked
  Component.preload = importStatementFn
  return Component
}

const HomePage = ReactLazyPreload(()=>import("./pages/homePage/Homepage"));
// const Posts = ReactLazyPreload(()=>import("./pages/posts/Posts"));
const Login = ReactLazyPreload(()=>import("./pages/auth/Login"));
const Registration = ReactLazyPreload(()=>import("./pages/auth/Registration"));
// const Peoples = ReactLazyPreload(()=>import("./pages/findPeoples/Peoples"));
// const LoginHomePage = ReactLazyPreload(()=>import("./pages/loginHomePage/LoginHomePage"));
const PostDetails = ReactLazyPreload(()=>import("./pages/postDetails/PostDetails"));
const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPost"));
const Dashboard = ReactLazyPreload(()=>import("src/pages/admin/Dashboard"));
const Profile = ReactLazyPreload(()=>import("src/pages/profilePage/ProfilePage"));


const publicRoutes = [
  {path: "/", exact: true, component: HomePage},
  {path: "/author/profile/:username", exact: true, component: Profile},
  {path: "/posts/:slug", exact: true, component: PostDetails}
]

export default (isAuth)=>{
  if(isAuth) {
    return [
      ...publicRoutes,
      { path: "/admin/dashboard", component:  Dashboard},
      { path: "/admin/add-post", component:  AddPost},
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