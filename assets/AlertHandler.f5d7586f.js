import{R as e,C as a,F as i,O as l,Z as t}from"./vendor.0fd0999c.js";function c({message:r,isShown:o,onClick:s,status:n}){return e.createElement(a,{unmountOnExit:!0,in:o,timeout:450,classNames:"my-node"},e.createElement("div",{className:["fixed alert alert-fixed",n&&n===400?"error-alert":"success-alert"].join(" ")},e.createElement("div",{className:"flex justify-between items-center"},e.createElement("h4",null,r&&r),e.createElement(i,{onClick:s&&s,icon:l,className:"ml-3 text-gray-600 cursor-pointer hover:text-red-500"}))))}c.propTypes={isShown:t.exports.bool,id:t.exports.string,message:t.exports.string,status:t.exports.string,onClick:t.exports.func};export{c as A};