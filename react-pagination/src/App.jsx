import { useEffect, useState } from "react";
import "./App.css";

const fetchAllProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
};
const fetchProducts = async (limit, page) => {
  const skipProducts = limit * page;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skipProducts}`
  );
  const data = await response.json();
  return data.products;
};

function App() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const limit = 10;
  const maxPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(limit, currentPage);
      setProductData(products);
    };
    fetchData();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="app">
      <div className="product-conatiner">
        {productData.map((product) => (
          <div className="product" key={product.id}>
            <p className="product-title">{product.title}</p>
            <p className="product-price">${product.price}</p>
            <img
              className="product-img"
              src={product.thumbnail}
              alt="image"
            ></img>
          </div>
        ))}
      </div>
      {productData.length > 0 && (
        <div className="pagination">
          <span
            onClick={handlePrev}
            className={currentPage < 1 ? "disabled" : ""}
          >
            Prev
          </span>
          {Array.from({ length: Math.ceil(100 / 10) }, (_, i) => {
            return (
              <span
                key={i}
                onClick={() => setCurrentPage(i)}
                className={currentPage === i ? "active" : "page"}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={handleNext}
            className={currentPage >= maxPage - 1 ? "disabled" : ""}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
