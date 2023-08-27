import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Wrapper, Card, Gradient } from "./StyledComponents";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      try {
        const parsedData = JSON.parse(check);
        setVeggie(parsedData);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        localStorage.removeItem("veggie");
      }
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=07c3f09740544ba7aa8fd7c816f015fd&number=9&tags=vegetarian`
        );
        const data = await api.json();

        localStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggie(data.recipes);
        console.log(data.recipes);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegitarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            pagination: false,
            arrows: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

export default Veggie;
