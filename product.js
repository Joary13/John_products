const URL = 'https://course-api.com/javascript-store-single-product?id=';

const product = document.querySelector('.product');

const getSingleProduct = () => {
  //console.log(window.location.search);
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
};

const fetchProduct = async () => {
  product.innerHTML = `<h4 class="product-loading>Loading</h4>`;
  const productId = getSingleProduct();
  try {
    console.log(URL + productId);
    const response = await fetch(`${URL}${productId}`);
    if (!response.ok) throw new Error('URL PROBLEM');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    product.innerHTML = `<p class="error">Il y a une erreur: ${err.message}</p>`;
  }
};

const displayProduct = (obj) => {
  const { id } = obj;
  const { url: image } = obj.fields.image[0];
  const { company, name: title, price, colors, description } = obj.fields;
  document.title = title.toUpperCase();
  const html = `
   <div class="product-wrapper">
        <img src="${image}" class="img" alt="" />
        <div class="product info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
            ${colors
              .map(
                (el) =>
                  `<span class="product-color" style="background: ${el}"></span>`
              )
              .join('')}
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>
  `;
  product.innerHTML = html;
};

const start = async () => {
  const res = await fetchProduct();
  displayProduct(res);
};

start();
