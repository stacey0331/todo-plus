import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

const categories = [
    { id: "category-0", name: "Tech todo", numOfItems: 10 },
    { id: "category-1", name: "Today's plan", numOfItems: 2 },
    { id: "category-2", name: "My category", numOfItems: 8 }
];

ReactDOM.render(
    <App categories={ categories } />, 
    document.getElementById("root")
);

// Rename category
document.querySelectorAll(".categoryName").forEach(function(node){
	node.ondblclick=function(){
		var val=this.innerHTML;
		var input=document.createElement("input");
		input.value=val;
		input.onblur=function(){
			var val=this.value;
			this.parentNode.innerHTML=val;
		}
		this.innerHTML="";
		this.appendChild(input);
		input.focus();
	}
});