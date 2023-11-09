const URL = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products-container');

const fetchProducts = async () => {
  productsDOM.innerHTML = "<div class='loading'></div>";
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('URL PROBLEM');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    productsDOM.innerHTML = `<p class="error">Il y a une erreur: ${err.message}</p>`;
  }
};

const displayProducts = (list) => {
  const html = list
    .map((el) => {
      return `<a href="product.html?id=${el.id}" class="single-product">
            <img
              src="${el.fields.image[0].url}"
              alt="${el.fields.name}"
              class="single-product-img img"
            />
            <footer>
              <h5 class="name">${el.fields.name}</h5>
              <span class="price">$${el.fields.price / 100}</span>
            </footer>
          </a>`;
    })
    .join('');
  productsDOM.innerHTML = html;
};

const start = async () => {
  const list = await fetchProducts();
  displayProducts(list);
};

start();
