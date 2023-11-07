const URL = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products-center');
// const loading = document.querySelector('.loading');
// const productsContainer = document.querySelector('.products-container');
// const errorContainer = document.querySelector('.error');

// window.addEventListener('load', () => fetchProducts());

const fetchProducts = async () => {
  // productsContainer.style.display = 'none';
  // errorContainer.style.display = 'none';
  productsDOM.innerHTML = "<div class='loading'></div>";
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('URL PROBLEM');
    const data = await response.json();
    // loading.style.display = 'none';
    return data;
  } catch (err) {
    // loading.style.display = 'none';
    // errorContainer.style.display = 'block';
    productsDOM.innerHTML = `<p class="error">Il y a une erreur: ${err.message}</p>`;
  }
};

const displayProducts = (list) => {
  const html = list
    .map((el) => {
      return `<a href="product.html" class="single-product">
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
  if (list) displayProducts(list);
};

start();
