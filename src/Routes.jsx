import React, {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ReactLazyPreload from "./utils/ReactLazyPreload";
import ProgressBar from "./components/UI/topProgressBar/TopProgressBar";

const AllSignIn  = ReactLazyPreload(()=>import("./pages/auth/AllSignIn"));
const AuthService = ReactLazyPreload(()=>import("./pages/auth/AuthService"));
const PostsFilterPage = ReactLazyPreload(()=>import("./pages/postFilterPage/PostsFilterPage"));

const HomePage = ReactLazyPreload(()=>import("./pages/homePage/Homepage"));
const About = ReactLazyPreload(()=>import("./components/about/About"));
// const Posts = ReactLazyPreload(()=>import("./pages/posts/Posts"));
// const Login = ReactLazyPreload(()=>import("./pages/auth/Login"));
// const Registration = ReactLazyPreload(()=>import("./pages/auth/Registration"));
// const Peoples = ReactLazyPreload(()=>import("./pages/findPeoples/Peoples"));
// const LoginHomePage = ReactLazyPreload(()=>import("./pages/loginHomePage/LoginHomePage"));

const PostDetailSimple = ReactLazyPreload(()=>import("./pages/postDetails/PostDetailSimple"));

// const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPostSimple"));
// const ForgetPassword = ReactLazyPreload(()=>import("src/pages/auth/ForgetPassword"));

const Dashboard = ReactLazyPreload(()=>import("src/pages/admin/Dashboard"));
const Profile = ReactLazyPreload(()=>import("src/pages/profilePage/ProfilePage"));


export const publicRoutes = [
  {path: "/", exact: true, component: HomePage},
  {path: "/search", exact: true, component: PostsFilterPage},
  {path: "/author/profile/:username/:id", exact: true, component: Profile},
  {path: "/posts/:slug/:id", exact: true, component: PostDetailSimple},
  {path: "/about", exact: true, component: About},
  {path: "/auth/callback/:authServiceName", exact: false, component: AuthService },
    {path: "/admin/dashboard", component: Dashboard},  // nested routes
  {path: "/auth/join", exact: false,  unProtected: true, redirectUrl: "/", component: AllSignIn}, // nested routes
]

const Routes = (props)=> {
  
  const { authState } = props
  
  return (
    <Switch>
      <Suspense fallback={<ProgressBar/>}>
        {/*{routes(!!authState.id).map((route, i) => <Route key={i} {...route} />)}*/}
        
        { publicRoutes && publicRoutes.map((route)=>{
          if(route.protected){
            return (
              <Route
                path={route.path}
                exact={route.exact}
                render={(props) => authState._id ? <route.component {...props} />  : <Redirect to={route.redirectUrl} />  }
              />
            )
          } else {
            
            return (
              <Route
                path={route.path}
                exact={route.exact}
                render={(props) =>{
                  if(route.unProtected) {
                    return authState._id
                      ?  <Redirect to={route.redirectUrl} />
                      : <route.component {...props} />
                  } else {
                    return  <route.component {...props} />
                  }
                }}
              />
            )
            
          }
          // else {
          //   return (
          //     <Route exact={!!route.exact} component={route.component} path={route.path}/>
          //   )
          // }
        })}
        
        
        {/*<Redirect from="/admin/dashboard/add-post/:id" to="/auth/join" />*/}
        {/*<Route path="/" exact={true} component={HomePage} />*/}
        {/*<Route path="/admin/dashboard/add-post/:null" render={(props) =>{*/}
        {/*  return authState._id ? <AddPost {...props} /> : <Redirect to="/signin" />*/}
        {/*}} />*/}
      
      
      </Suspense>
    </Switch>
  )
}


export default Routes