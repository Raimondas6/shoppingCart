let cartStorage: string | null = localStorage.getItem('cart')
console.log(cartStorage)
let cartContainer = document.querySelector(".cart-container") as HTMLElement
let cartMain = document.querySelector(".cart-main") as HTMLElement
const cartTotalPrice = document.querySelector(".cartTotalPrice") as HTMLElement
let cartItems: any[] = []
if (localStorage.getItem('cart')) {
    cartItems = JSON.parse(localStorage.getItem('cart') || '')
    console.log(cartItems)
}

interface CartProductInterface {
    image: string,
    category: string,
    id: number,
    price: number,
    title: string,
    quantity: number
}

let cartProducts: CartProductInterface[] = []
const shoppingCartList: CartProductInterface[] = []

function appendCartProducts(data: CartProductInterface[]) {
    cartContainer.innerHTML = ""

    data.map(x => {
        cartContainer.innerHTML += `
            <div class="card">
                <img src="${x.image}" alt="${x.title}">
                <div class="title">${x.title}</div>
                <div>${x.category}</div>
                <h4>Price: ${x.price}</h4>
                <div>Quantity: ${x.quantity}</div>
                <button class="add-button" id="${x.id}">Add</button>
                <input type = "number" id = "input-quantity">
                <button class="remove-button" id="${x.id}">Remove</button>
            </div>
        `

    })
    // Pataisyti kad viena kaina rodytu
    data.map(z => {
        cartMain.innerHTML += `
        <h2 class = "total-price">Total Price: ${z.price+z.price}$</h2>`
    })
    

}

appendCartProducts(cartItems)

function countPrice() {
    let cartPriceTotal = 0

    cartItems.map((x: CartProductInterface) => {
        cartPriceTotal += x.quantity * x.price
    })
    console.log(cartItems)
    cartTotalPrice.innerHTML = `Total Price: ${cartPriceTotal.toFixed(2)} $`

    localStorage.setItem('cart', JSON.stringify(cartItems))
}
countPrice()

const addButton = document.querySelectorAll('.add-button') as NodeListOf <HTMLElement>
const removeButton = document.querySelectorAll('.remove-button') as NodeListOf <HTMLElement>
const quantityInput = document.querySelector('#input-quantity') as HTMLElement 

addButton.forEach(add => add.onclick = (e:any) => {
    
})