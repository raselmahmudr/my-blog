var C=Object.defineProperty,D=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var x=(n,l,s)=>l in n?C(n,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[l]=s,u=(n,l)=>{for(var s in l||(l={}))T.call(l,s)&&x(n,s,l[s]);if(E)for(var s of E(l))O.call(l,s)&&x(n,s,l[s]);return n},p=(n,l)=>D(n,j(l));import{R as e,L as R,F as b,Q as A,T as L}from"./vendor.0fd0999c.js";import{g as m}from"./index.340d9940.js";const Y=()=>{const[n,l]=e.useState({markdownFiles:[],posts:[]}),s=e.useRef(),N=e.useRef(),d=e.useRef(),[i,f]=e.useState({json:"",path:""});e.useEffect(()=>{m().get("/api/files").then(a=>{a.status>=200&&a.status<=400&&(l({markdownFiles:a.data}),m().get("/api/posts").then(t=>{if(t.status===200){let r=a.data,c=[];r.forEach(o=>{let w=t.data.posts.findIndex(S=>S.path===o.path);c.push(p(u({},o),{orphan:w===-1}))}),l(p(u({},n),{markdownFiles:c}))}}).catch(t=>{console.log(t.message)}))}).catch(a=>{})},[]);function y(a){m().get(`/api/get-file-content?path=${a.path}`,{responseType:"json"}).then(t=>{let r=JSON.stringify(t.data,void 0,6);f({path:a.path,json:r})})}function F(){if(prompt("Are You Sure to Save File in Server")!==null){let t=s.current.value;if(t)try{let r=JSON.parse(t);typeof r!="string"&&m().post("/api/save-file-content",{path:i.path,data:r}).then(c=>{console.log(c),c.status===201&&f("")})}catch{alert("Bad Format JSON FILE")}}}function g(){return e.createElement("div",{className:"file_content"},e.createElement("pre",null,e.createElement("code",null,e.createElement("textarea",{className:"editor",defaultValue:i.json,ref:s}))),e.createElement("div",null,e.createElement("button",{onClick:F,className:"btn btn-primary mr-2"},"Save"),e.createElement("button",{onClick:()=>f({path:"",json:""}),className:"btn btn-info"},"Discard")))}function k(a){return e.createElement("table",{className:"files_table"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Edit"),e.createElement("th",null,"Name"),e.createElement("th",null,"Modify At"),e.createElement("th",null,"Size"),e.createElement("th",null,"Orphan"),e.createElement("th",null,"Path"))),e.createElement("tbody",null,a&&a.map((t,r)=>e.createElement("tr",{key:r},e.createElement("td",{className:"text-blue-700 my-1 cursor-pointer"},e.createElement("div",{className:"flex items-center"},e.createElement(b,{onClick:()=>y(t),icon:A}),e.createElement(b,{className:"ml-2",onClick:()=>v(t),icon:L}))),e.createElement("td",{className:"text-blue-700 my-1 px-1"},e.createElement("span",{className:"text-sm text-blue-700 my-2 cursor-pointer"},t.name)),e.createElement("td",{className:"text-blue-700 my-1 px-4"},e.createElement("span",{className:"text-xs whitespace-nowrap"},new Date(t.modifyTime).toDateString()," "," ",new Date(t.modifyTime).toLocaleTimeString())),e.createElement("td",{className:"text-blue-700 my-1 px-4"},e.createElement("span",{className:"text-sm text-blue-700 my-2 cursor-pointer"},t.size)),e.createElement("td",{className:"text-blue-700 my-1 px-4"},e.createElement("span",{className:"text-sm text-blue-700 my-2 cursor-pointer"},t.orphan?"Yes":"NO")),e.createElement("td",{className:"text-blue-700 my-1"},e.createElement("span",{className:"text-sm text-blue-700 my-2 cursor-pointer"},t.path))))))}function h(a){const{name:t,files:r}=a.target;let c=new FormData;c.append(t,r[0]),c.append("dirType",t),m().post("/api/file-upload",c).then(o=>{o.status===201&&(console.log(o.data),alert("file upload success"))}).catch(o=>{alert("file upload fail"),console.log(o.message)})}function v(a){if(a.dir===!0)return alert("You can't delete a Directory.");m().post("/api/file-delete",{path:a.path}).then(t=>{if(t.status===201){let c=[...n.markdownFiles].filter(o=>o.path!==a.path);l(p(u({},n),{markdownFiles:c}))}else alert("file delete fail")}).catch(t=>{alert(t.message)})}return e.createElement("div",{className:"container px-2"},e.createElement("h1",{className:"text-center mt-2"},"Server Database Files"),e.createElement("button",{className:"btn"},e.createElement(R,{to:"/admin/dashboard"},"Back to Dashboard")),i&&i.path&&g(),e.createElement("div",{className:"flex flex-col justify-between"},e.createElement("div",{className:"mt-4"},e.createElement("div",{className:"flex mb-1 items-center"},e.createElement("h4",null,"Markdown Files"),e.createElement("button",{onClick:()=>d.current&&d.current.click(),className:"ml-5"},"Upload a Markdown File"),e.createElement("input",{onChange:h,name:"database",type:"file",ref:N,hidden:!0}),e.createElement("input",{onChange:h,name:"markdown",type:"file",ref:d,hidden:!0})),e.createElement("div",{className:"overflow-x-auto"},k(n.markdownFiles)))))};export{Y as default};
