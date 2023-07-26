import { useState } from "react";
import { SearchFilter } from "./SearchFilter";
import SearchList from "./SearchList";

import { Container, Typography, TextField } from "@mui/material";
import "@emotion/styled";

// import "./App.css";

//List that needs to be filtered
const itemList = [
  "Apple",
  "Orange",
  "Banana",
  "Cherry",
  "Milk",
  "Peanuts",
  "Butter",
  "Tomato",
];
export default function App() {
  //state that would track the change for every key stroke change for the input field and would filter the search results
  const [searchInput, setSearchInput] = useState(itemList);

  //this function would filter the as per the changed
  //takes a parameter, which would be the letter that is being typed
  //then it would update the state
  //THIS FUNCTIONALITY IS CALLED ON CHANGE AS PER THE INPUT FIELD IN THE DIV

  function filterSearchResults(e) {
    //this is the value that is being passed in the search bar
    const searchQuery = e.target.value;

    //using a variable to keep the track of the updated list, which is initially set to the complete list, as ideally filtering not happend yet
    var updatedList = { ...itemList };

    //updating the updatedList variable using the filter, iterates through each element of the list
    updatedList = itemList.filter((item) => {
      {
        /* 1.Converts the item to lowercase 
        2.Use the indexOf to find if the searched query item(converted to lowercase) is present or not
        3.If present returns the first occurence and if not then returns -1 (that means no result would be there)
    */
      }
      return item.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    });

    //setting the state with new filtered list variable updateList

    setSearchInput(updatedList);
  }

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        sx={{ margin: "20px", padding: "10px", fontFamily: "sans-serif" }}
      >
        Search App
      </Typography>

      {/* the filterSearchResults is the name of the prop [KEY] and {filterSearchResults} is the value that is the function 
      that is being passed in the prop name [FUNCTION ITESLF IS THE VALUE OF THE PROP THAT IS BEING PASSED]*/}
      {/* Prop = Key + Value  = filterSearchResults + {filterSearchResults}*/}
      <SearchFilter filterSearchResults={filterSearchResults}></SearchFilter>

      {/* Can use itemList here for consistency by anything could be use since it is the name
      -> itemsList if used would signify that the original array itemList, state modification is being done using the state variable
      searchInput*/}
      <SearchList itemList={searchInput}></SearchList>

      {/* <SearchFilter />
      <SearchList /> */}
    </Container>
  );
}
