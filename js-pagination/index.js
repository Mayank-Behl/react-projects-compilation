const fetchAllProducts = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
const fetchProducts = async (productLimit, page) => {
  try {
    const productSkip = productLimit * page;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${productLimit}&skip=${productSkip}`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const renderProducts = (products) => {
  const productList = document.getElementById("productList");
  // Clear previous content
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-info");

    const productName = document.createElement("h3");
    productName.textContent = `Product Name: ${product.title}`;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ${product.price}`;

    const productImage = document.createElement("img");
    productImage.src = product.thumbnail;

    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productImage);

    productList.appendChild(productDiv);
  });
};

const renderPagination = (currnetPage, totalPages) => {
  const pagination = document.getElementById("pagination");
  // Clear previous content
  pagination.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    li.textContent = i + 1;
    li.addEventListener("click", () => showData(i));
    //currentpage used for adding a class just to highlight the selected page
    if (i === currnetPage) {
      li.classList.add("active-li");
    }
    pagination.appendChild(li);
  }
};

const showData = async (page) => {
  try {
    const limit = 9;
    //skip = products shown per page * current page
    const totalProducts = await fetchAllProducts();
    const products = await fetchProducts(limit, page);
    console.log(products);

    renderProducts(products);
    renderPagination(page, totalProducts.length / limit);
  } catch (error) {
    console.error("Error displaying products products:", error);
  }
};

showData(0);
