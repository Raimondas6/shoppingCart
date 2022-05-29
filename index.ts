

const container = document.querySelector(".main") as HTMLElement
const inCartCounter = document.querySelector(".inCart") as HTMLElement
const totalSum = document.querySelector(".totalSum") as HTMLElement

interface ProductInterface {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string,
    rating: {
        count: number,
        rate: number
    }
    quantity?: number
}

let products: ProductInterface[] = []
const shoppingCart: ProductInterface[] = []

function countCart() {
    let quantityCounter = 0
    let priceTotal = 0

    shoppingCart.map((x: ProductInterface) => {
        //@ts-ignore
        quantityCounter += x.quantity
        //@ts-ignore
        priceTotal += x.quantity * x.price
    })
    inCartCounter.innerHTML = "In cart: "+quantityCounter
    totalSum.innerHTML = `Total Price: ${priceTotal.toFixed(2)} $`

    localStorage.setItem('cart', JSON.stringify(shoppingCart))
}

function addToCart(e: any) {
    const id = Number(e.target.id)
    const current: any = products.find(x => x.id == id)
    const inCart = shoppingCart.find(x => x.id === id)

    if(inCart) {
        const index = shoppingCart.findIndex(x => x.id === id)
        //@ts-ignore
        shoppingCart[index].quantity++
    }else {
        current.quantity = 1
        shoppingCart.push(current)
    }
    countCart()
}

function appendProducts(data: ProductInterface[]) {
    container.innerHTML = ""

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
        `
    })

    const productButtons = document.querySelectorAll('.productButton') as NodeListOf <HTMLElement>
    productButtons.forEach(x => x.onclick = addToCart)

}

(async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    products = await res.json()

    appendProducts(products)

})()
