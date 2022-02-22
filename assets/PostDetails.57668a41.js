var V=Object.defineProperty,X=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var Y=(i,o,a)=>o in i?V(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[o]=a,u=(i,o)=>{for(var a in o||(o={}))G.call(o,a)&&Y(i,a,o[a]);if(O)for(var a of O(o))J.call(o,a)&&Y(i,a,o[a]);return i},g=(i,o)=>X(i,q(o));import{R as e,F as f,p as K,U as $,V as Z,W as I,Q as ee,T as te,k as ae,j as se,g as me,X as ne,Y as le,L as oe}from"./vendor.0fd0999c.js";import{f as F,P as z,c as U,g as T}from"./index.340d9940.js";import{P as A}from"./PostDetailSimple.ba2cf691.js";import{A as re}from"./AlertHandler.f5d7586f.js";import"./Skeleton.9dff840e.js";/*!
 * Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 */var ce={prefix:"far",iconName:"heart",icon:[512,512,[],"f004","M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"]};const B=i=>{const{onSubmit:o,cancelBtn:a,onCancel:t,parent_id:h}=i,[c,m]=e.useState({text:"",parent_id:h});function v(E){E.preventDefault(),o&&o(c),m({parent_id:"",text:""})}return e.createElement("div",null,e.createElement("div",{className:"add-comment-form"},e.createElement("textarea",{onChange:E=>m(g(u({},c),{text:E.target.value})),className:"input-elem dark_subtitle dark:bg-dark-600",name:"text",value:c.text,placeholder:"Post your comment",id:"text"}),e.createElement("div",{className:"flex justify-end"},a&&e.createElement("button",{onClick:t,className:"btn  btn-primary"},"Cancel"),e.createElement("button",{onClick:v,className:"btn btn-primary  ml-2"},"Post"))))};const ie=i=>{const{comment:o,onDeleteComment:a,onFetchNestedComment:t,onHideReply:h,onSetShowReplyCommentForm:c,showReplyCommentForm:m,onSubmitAddComment:v}=i,[E,w]=e.useState("");function b(d){w(d===E?"":d)}const y=C(o);function C({id:d,text:S,post_id:L,user_id:k,created_at:l,reply:s=!1,child_comment_count:n,username:r,avatar:p}){function D(_){let Q=new Date,M=1e3,P=M*60,j=P*60,R=j*24,x=Q-new Date(_),N="";return Math.floor(x/R)?N=Math.floor(x/R)+" day ago":Math.floor(x/j)?N=Math.floor(x/j)+" hour ago":Math.floor(x/P)?N=Math.floor(x/P)+" min ago":Math.floor(x/M)?N=Math.floor(x/M)+" sec ago":N="a second ago",N}function W(_){b("-1"),a&&a(k,_)}return e.createElement("div",{className:"my-4 mt-6"},e.createElement("div",{className:"flex"},e.createElement("div",{className:"w-5 mr-2"},p?e.createElement("img",{className:"flex w-full radius-100",src:F(p),alt:"avatar"}):e.createElement(f,{icon:K,className:"text-gray-500 text-md hover:text-primary"})),e.createElement("div",{className:"comment-body flex-1"},e.createElement("div",{className:"comment-body-text px-2 py-1 bg-gray-9 bg-opacity-80 text-sm rounded"},e.createElement("h1",null,e.createElement(z,{to:`/author/profile/${r}/${k}`,className:"text-blue-600 text-15",href:""},r)),e.createElement("h1",{className:"text-15 mt-1"},S)),e.createElement("div",{className:"comment-action flex mt-1 text-xs text-gray-dark-9  items-center"},e.createElement("li",{className:""},e.createElement(f,{icon:$,className:"text-sm hover:text-primary"})),e.createElement("li",{className:"mx-3"},e.createElement(f,{icon:Z,onClick:()=>c(d),className:"text-sm mr-1"})),e.createElement("li",null,e.createElement(f,{icon:I,onClick:()=>c(d),className:"text-sm mr-1"}),D(new Date(l))),e.createElement("li",{className:"ml-3  relative"},e.createElement("span",{className:"cursor-pointer hover:text-primary",onClick:()=>b(d)},"more"),E===d&&e.createElement("div",{className:"bg-white w-40 comment_option absolute shadow_1"},e.createElement("ul",{className:""},e.createElement("li",{className:"px-2 py-1 flex-1 cursor-pointer hover:bg-primary_light  hover:text-primary flex"},e.createElement("span",{className:"pointer-events-none  whitespace-nowrap"},e.createElement(f,{icon:ee,className:"text-sm mr-1"}),e.createElement("span",null,"Edit comment"))),e.createElement("li",{onClick:()=>W(d),className:"px-2 py-1 cursor-pointer hover:bg-primary_light hover:text-primary flex"},e.createElement("span",{className:"pointer-events-none whitespace-nowrap"},e.createElement(f,{icon:te,className:"text-sm mr-1"}),e.createElement("span",null,"Delete comment"))))))),m===d&&e.createElement(B,{onSubmit:v,parent_id:d,cancelBtn:!0,onCancel:()=>c("")}),n>0&&e.createElement("div",{onClick:()=>s&&s.length>0?h(d):t(d,L),className:"flex mt-3 items-center"},e.createElement("i",{className:"fa text-xs text-gray-light-7 fa-reply mr-1"}),e.createElement("h4",{className:"text-gray-light-7 text-xs hover:text-primary cursor-pointer"}," ",s&&s.length>0?"hide reply comments":"show reply"," ",n)),s&&s.map(_=>C(_)))))}return y};let H;const xe=i=>{let o=ae();const a=se(l=>l.authState),[t,h]=e.useState({mdContent:"",comments:[],post_id:"",user_id:"",likes:[],tags:[]}),[c,m]=e.useState({id:"add_comment",isShown:!1,status:"",message:""});e.useEffect(()=>(c.isShown&&(H=setTimeout(()=>{m(g(u({},c),{isShown:!1}))},2e3)),()=>{H&&clearTimeout(H)}),[c.isShown]);const[v,E]=e.useState(!1);e.useEffect(async()=>{let l=await U.get(`/api/posts/${o.id}`);if(l.status===200){let s=u({},t),n=l.data.post;s=u(u({},s),n),h(s);let r=await U.post("/api/post-content",{filePath:n.path,post_id:n._id});r.status===200&&h(g(u({},n),{mdContent:r.data}))}},[o.id]);function w(l){if(!a||!a._id){m({id:"add_comment",status:200,message:"You have to Login first to Like post",isShown:!0});return}T().post("/api/toggle-like",{post_id:l,user_id:a._id}).then(s=>{if(s.status===201){let n=s.data.post;m({id:"add_comment",status:200,message:"You like this post",isShown:!0}),h(g(u({},t),{likes:n.likes}))}else m({id:"add_comment",status:400,message:"Like post fail..",isShown:!0})}).catch(s=>{m({id:"add_comment",status:400,message:"Like post fail..",isShown:!0})})}function b({id:l,likes:s}){let n=s&&s.indexOf(a.id)!==-1;return e.createElement("div",null,e.createElement("ul",{className:"flex text-sm"},e.createElement("li",{className:"w-30 mx-1 flex items-center"},e.createElement(f,{icon:n?$:v?$:ce,onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),onClick:r=>w(l),className:["cursor-pointer hover:text-pink-700 dark_subtitle ",n?"text-pink-400 ":"text-gray-800"].join(" ")}),e.createElement("h4",{className:"font-normal ml-1"},s?s.length:"0"))))}function y(){return e.createElement("div",{className:"article"},e.createElement("div",{className:"code  dark:text-white ",dangerouslySetInnerHTML:{__html:t.mdContent}}),e.createElement("br",null))}function C({text:l,parent_id:s}){if(m(g(u({},c),{isShown:!1})),!a||!a._id){m({id:"add_comment",status:200,message:"You have to Login first to post comment...",isShown:!0});return}if(!l){m({id:"add_comment",status:400,message:"Empty comment are not accept",isShown:!0});return}let n={text:l,parent_id:s||null,user_id:a.id,post_id:t.id,username:a.username,avatar:a.avatar};T().post("/api/comment",n).then(r=>{if(r.status>=200&&r.status<400){let p=u({},t);p.comments?p.comments.push(r.data.newComment):p.comments=[r.data.newComment],h(p),m({id:"add_comment",status:200,message:"Your Comment has been posted..",isShown:!0})}else m({id:"add_comment",status:400,message:"Comment post fail..",isShown:!0})}).catch(r=>{m({id:"add_comment",status:400,message:"Comment post fail..",isShown:!0})})}function d(l,s){if(!(a&&l!==a._id)){if(m(g(u({},c),{isLoading:!0})),!a||!a._id){m({id:"add_comment",status:200,message:"You have to Login first to delete comment...",isLoading:!1});return}T().delete(`/api/comment?comment_id=${s}&user_id=${a._id}&post_id=${t.id}`).then(n=>{if(n.status>=200&&n.status<400){let r=u({},t);if(r.comments){let p=r.comments.findIndex(D=>D.id===n.data.id);p!==-1&&r.comments.splice(p,1)}h(r),m({id:"add_comment",status:200,message:n.data.message,isLoading:!1})}else m({id:"add_comment",status:400,message:n.data.message,isLoading:!1})}).catch(n=>{m({id:"add_comment",status:400,message:n.response.data.message,isLoading:!1})})}}function S(){return e.createElement("div",null,e.createElement("label",{className:"text-md mb-1 dark_subtitle",htmlFor:""},"Write a comment"),e.createElement(B,{onSubmit:C}),e.createElement("div",{className:""},t.comments.map(l=>e.createElement(ie,{onDeleteComment:d,comment:l}))))}function L(){return e.createElement("div",null,e.createElement("div",{className:"flex items-center dark_subtitle"},e.createElement("div",{className:"flex items-center mb-2"},b(t),e.createElement("h4",{className:"ml-1 text-sm"},"Loves")),e.createElement("div",{className:"flex items-center mb-2 ml-4"},e.createElement(f,{icon:ne,className:"text-gray-dark-9"}),e.createElement("h4",{className:"ml-1 text-sm"},t.hits?t.hits:0," read")),e.createElement("div",{className:"flex items-center mb-2 ml-4"},e.createElement(f,{icon:le,className:"text-blue-500"}),e.createElement("h4",{className:"ml-1 text-sm"},t.comments?t.comments.length:0," comments"))),e.createElement("div",{className:"post-end-meta flex items-start"},e.createElement("h4",{className:"title dark_subtitle"},"Tags: "),e.createElement("ul",{className:"flex flex-wrap"},t.tags&&t.tags.map(l=>e.createElement("li",{className:"bg-gray-9 dark_subtitle dark:bg-dark-600 m-0.5 text-xs py-1 rounded",key:l},e.createElement(oe,{className:"text-gray-80 font-medium text-opacity-60",to:`/?search=${l}`},"#",l))))),e.createElement("div",{className:"mt-6"},e.createElement("div",{className:"border-b border-gray-9 mb-4 "}),S()))}function k(){m(g(u({},c),{isShown:!1}))}return e.createElement("div",{className:"container px-4 min-h-viewport"},e.createElement(re,{message:c.message,isShown:c.isShown,onClick:k,status:200}),t._id?e.createElement("div",{className:"post_detail mt-4"},t.author&&e.createElement("div",{className:"post_author_description items-start"},e.createElement("div",{className:"author_info__avatar"},e.createElement("div",{className:"avatar"},t.author.avatar?e.createElement("img",{className:"w-full rounded-full",src:F(t.author.avatar),alt:""}):e.createElement(f,{className:"text-5xl",icon:me}))),e.createElement("div",{className:"user_info"},e.createElement("div",{className:"flex align-center mb-2 justify-center sm:justify-start"},e.createElement("h4",{className:"title"},e.createElement(z,{className:"text-md",to:`/author/profile/${t.author.username}/${t.author._id}`},t.author.first_name," ",t.author.last_name)),e.createElement("button",{className:"btn ml-5 btn-outline dark_subtitle"},"Follow")),e.createElement("p",{className:"author_desc text-sm dark_subtitle"},t.author.description))),e.createElement("div",{className:"post_meta mt-4"},e.createElement("h1",{className:"title text-3xl dark_title"},t.title),e.createElement("div",{className:"mt-2 mb-4 subtitle text-sm"},e.createElement(f,{icon:I,className:"mr-1"}),e.createElement("span",{className:"dark_gray"},"Create at "," ",new Date(t.created_at).toDateString()," "," ",new Date(t.created_at).toLocaleTimeString()))),e.createElement("div",{className:"flex mb-5 justify-center"},e.createElement("img",{className:"w-full",src:F(t.cover),alt:""})),t.mdContent&&e.createElement(e.Fragment,null,y(),L())):e.createElement("div",{className:"mx-4 mt-4"},e.createElement(A.SkeletonMeta,null),e.createElement(A.SkeletonContent,null)),!t.mdContent&&e.createElement(A.SkeletonContent,null))};export{xe as default};
