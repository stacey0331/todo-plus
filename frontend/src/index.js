import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
    <App />, 
    document.getElementById("root")
);

// Rename category
// document.querySelectorAll(".categoryName").forEach(function(node){
// 	node.ondblclick=function(){
// 		console.log('yoyo!');
// 		var val=this.innerHTML;
// 		var input=document.createElement("input");
// 		input.value=val;
// 		input.onblur=function(){
// 			var val=this.value;
// 			this.parentNode.innerHTML=val;
// 		}
// 		this.innerHTML="";
// 		this.appendChild(input);
// 		input.focus();
// 	}
// });