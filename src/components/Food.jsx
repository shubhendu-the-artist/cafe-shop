import React from "react";

function Food(props) {
  return (
    <div>
      <div className="item flex items-baseline gap-6 text-white">
        <small className="w-[10vw]">{props.category}</small>
        <h1 className="text-5xl font-extralight leading-none">{props.title}</h1>
      </div>
    </div>
  );
}

export default Food;
