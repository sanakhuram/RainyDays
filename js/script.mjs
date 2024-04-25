


import { URL } from './constants.mjs';
let products = [];


const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }
}

const displayProducts = async () => {
    try {

        const data = await fetchProducts(URL);
        products = data;
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            productContainer.innerHTML +=
                `
                <div class="product" data-product-id="${product.id}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <a href="product/index.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
                `;
        });
        hideLoadingIndicator();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
}

function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.add('show');
}
function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.remove('show');
}


document.addEventListener('DOMContentLoaded', () => {
    showLoadingIndicator();
    setTimeout(displayProducts, 2000);
});

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count'); // Remove the dot
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = `CART(${currentCount})`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        updateCartCount();
    }
});

