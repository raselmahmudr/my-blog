import React from 'react';
import ReactLazyPreload from "../../utils/ReactLazyPreload";
import {Redirect, Route} from "react-router-dom";


const AllPosts = ReactLazyPreload(() => import("src/pages/admin/allPosts/AllPosts"));
const AddPostSimple = ReactLazyPreload(() => import("src/pages/admin/AddPostSimple"));
const DatabaseFiles = ReactLazyPreload(() => import("./databaseFiles/DatabaseFiles"))
const Login = ReactLazyPreload(() => import("src/pages/auth/Login"));
const DashboardHome = ReactLazyPreload(() => import("src/pages/admin/DashboardHome"));


export const adminRoutes = [
	{path: "/admin/dashboard", exact: true, component: DashboardHome},
	// {path: "/admin/dashboard/add-post/:postId", exact: true, component: AddPost},
	{path: "/admin/dashboard/add-post/:id", exact: true, protected: true, redirectUrl: "/auth/join", component: AddPostSimple},
	{path: "/admin/dashboard/files", exact: true, component: DatabaseFiles},
	{path: "/admin/dashboard/posts", exact: true, component: AllPosts},
	{path: "/admin/dashboard", component: Login},
	{path: "/admin/dashboard/add-post/:postId", component: Login}
]

const AdminRoutes = ({_id, isAuthLoaded}) => {
	return adminRoutes.map((route) => {
		if (route.protected) {
			return (
				<Route
					path={route.path}
					exact={route.exact}
					render={(props) => _id ? <route.component {...props} /> : isAuthLoaded && <Redirect to={route.redirectUrl}/>}
				/>
			)
		} else {
			
			return (
				<Route
					path={route.path}
					exact={route.exact}
					// component={route.component}
					render={(props) => {
						if (route.unProtected) {
							return _id
								? <Redirect to={route.redirectUrl}/>
								: <route.component {...props} />
						} else {
							return <route.component {...props} />
						}
						// if(route.unProtected) {
						//     return authState._id ?  <Redirect to={route.redirectUrl} /> : route.component
						//   } else {
						//   return  <Route exact={!!route.exact} component={route.component} path={route.path}/>
						// }
						
					}
					}
				/>
			)
			
		}
	})
};

export default AdminRoutes;