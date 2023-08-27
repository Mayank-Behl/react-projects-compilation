import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Wrapper, Card, Gradient } from "./StyledComponents";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      try {
        const parsedData = JSON.parse(check);
        setPopular(parsedData);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        localStorage.removeItem("popular");
      }
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=07c3f09740544ba7aa8fd7c816f015fd&number=9`
        );
        const data = await api.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
        console.log(data.recipes);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            arrows: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
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
}

// const Wrapper = styled.div`
//   margin: 4rem 0rem;
// `;

// const Card = styled.div`
//   min-height: 25rem;
//   border-radius: 2rem;
//   overflow: hidden;
//   position: relative;

//   img {
//     border-radius: 2rem;
//     position: absolute;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   p {
//     position: absolute;
//     z-index: 10;
//     left: 50%;
//     bottom: 0%;
//     transform: translate(-50%, 0%);
//     color: white;
//     width: 100%;
//     text-align: center;
//     font-weight: 600;
//     font-size: 1rem;
//     height: 40%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const Gradient = styled.div`
//   z-index: 3;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
// `;

export default Popular;
