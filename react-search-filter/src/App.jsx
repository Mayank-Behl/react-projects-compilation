import { useState } from "react";
import { SearchFilter } from "./SearchFilter";
import SearchList from "./SearchList";

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
    <div className="search-app">
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
      {/* Steps to create the functionality 
      1. Create the Form(div1) and Create the List elements(div2) *DONE*
        -> List elements would be there using a variable as a database *DONE*
      2. Create a state to for filtering which would by default have the above Item List *DONE*
      3. Write the filter functionality that would filter the list items and would update the state *DONE*
      4. The form would have this functionality as the onChange in the input box *DONE*
      5. Refactor the code and now distribute the code to individual components that is the search box and the list *ONGOING*
      6. Use the props to achieve the functionality
      7. Style the app using Material UI


      I have the roadmap now-> Build accordingly and think rather than looking up for the solution everything is mentioned here :)
      This will make me understand the basis of the react application I got introduction in the previous project
      Then move to the JS exercises accordingly on leetcode.
      */}
    </div>
  );
}
