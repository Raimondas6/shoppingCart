"use strict";
const container = document.querySelector(".main");
const inCartCounter = document.querySelector(".inCart");
const totalSum = document.querySelector(".totalSum");
let products = [];
const shoppingCart = [];
function countCart() {
    let quantityCounter = 0;
    let priceTotal = 0;
    shoppingCart.map((x) => {
        //@ts-ignore
        quantityCounter += x.quantity;
        //@ts-ignore
        priceTotal += x.quantity * x.price;
    });
    inCartCounter.innerHTML = "In cart: " + quantityCounter;
    totalSum.innerHTML = `Total Price: ${priceTotal.toFixed(2)} $`;
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
}
function addToCart(e) {
    const id = Number(e.target.id);
    const current = products.find(x => x.id == id);
    const inCart = shoppingCart.find(x => x.id === id);
    if (inCart) {
        const index = shoppingCart.findIndex(x => x.id === id);
        //@ts-ignore
        shoppingCart[index].quantity++;
    }
    else {
        current.quantity = 1;
        shoppingCart.push(current);
    }
    countCart();
}
function appendProducts(data) {
    container.innerHTML = "";
    data.map(x => {
        container.innerHTML += `
            <div class="card">
                <img src="${x.image}" alt="${x.title}">
                <div class="title">${x.title}</div>
                <div>${x.category}</div>
                <div>${x.description}</div>
                <h4>Price: ${x.price}</h4>
                <button class="productButton" id="${x.id}">Add To Cart</button>
            </div>
        `;
    });
    const productButtons = document.querySelectorAll('.productButton');
    productButtons.forEach(x => x.onclick = addToCart);
}
(async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
    appendProducts(products);
})();
