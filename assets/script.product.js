
function onVariantChange(radio) {
  const selectInput = document.querySelector("#main-product-selector");
  selectInput.value = radio.value;
};

async function renderRecomendedProducts(productId) {
  let response = await fetch(`/recommendations/products.json?product_id=${productId}`);
  const responseJSON = await response.json();
  let products = responseJSON.products
  products = products.splice(0, 4);

  const relatedProductList = document.querySelector(".related-products__list")

  products.forEach(product => {
    const relatedProduct = document.createElement("a")
    relatedProduct.classList.add("related__product")
    relatedProduct.href = product.url
    relatedProduct.innerHTML = `
      <div class="related__product-label-list">
        ${product.tags.includes("best_seller") ? '<span class="related__product-label related__product-label--best-seller">Best Seller</span>' : ""}
        ${product.tags.includes("free_shipping") ? '<span class="related__product-label related__product-label--free-shipping">Free Shipping</span>' : ""}
      </div>
      <img class="related__product-image" src="${product.featured_image}" alt="" loading="lazy">
      <p class="related__product--title"> ${product.title} </p>
      <div class="related__product--stars">

      </div>
      <p class="related__product--price"> ${(product.price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })} </p>
    `
    relatedProductList.appendChild(relatedProduct)
  })
}

renderRecomendedProducts(currentProductId)

function showCart() {
  const cartWrapper = document.querySelector(".ajax-cart__wrapper")
  const cartContent = document.querySelector(".ajax-cart__content")

  cartContent.classList.toggle("ajax-cart__content_open")
  cartWrapper.classList.toggle("ajax-cart__wrapper_open")
}