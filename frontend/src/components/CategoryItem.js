import React from "react";

const CategoryItem = (props) => {
    
    return (
        <a href="google.com" className={ props.selected ? 'selectedCategory' : 'unselectedCategory'} key={props.id}>
            <span className="categoryName">{ props.name }</span>
            <div className="numOfItems">{ props.numOfItems }</div>
        </a>

    );
}

export default CategoryItem;