import React from "react";

//names(keys) are passed in props instead of values
export default function SearchList({ itemList }) {
  return (
    <div className="listItems">
      {/* Iterating the array elements and rendering the list using a map, the map needs a key so id is being used for that */}
      <ol>
        {itemList.map((item) => {
          return <li key={item.id}>{item}</li>;
        })}
      </ol>
    </div>
  );
}
