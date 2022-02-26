import React, { useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

const AuthService = () => {
	
	const params = useParams()
	const history = useHistory()
	
	
		React.useEffect( function (){
			
			(async function (){
				try{
					let {data} = await api.get(`/api/auth/callback/${params.authServiceName}${history.location.search}`)
					console.log(data)
					// console.log(data)
					// loginHandler(data, dispatch, (user)=>{
					// 	if(user && user._id){
					// 		history.push("/")
					// 	} else {
					// 		history.push("/auth/login?redirect=home")
					//
					// 	}
					// })
				} catch(ex){
					// history.push("/auth/login?redirect=home")
					
				}
			}())
			
			// setSize({width: window.innerWidth, height: window.innerHeight})
			// setOrientation(window.orientation)
			// // Listen for orientation changes
			// window.addEventListener("orientationchange", function() {
			//   // Announce the new orientation number
			//   setOrientation(window.orientation)
			// }, false);
			
			// window.addEventListener('resize', (e)=>{
			//   setSize({width: window.innerWidth, height: window.innerHeight})
			// })
		}, [])
		
		
		
		return (
			<div className="container-1200 mx-4">
				
				<h1>hi</h1>
				
			</div>
		)
	};

export default AuthService;