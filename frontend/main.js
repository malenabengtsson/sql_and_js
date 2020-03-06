
const getCustomers = async () =>{
    let customers = await fetch('/rest/customers')
    customers = await customers.json()
    console.log(customers)
}

const postCustomer = async () => {
    let user = {
        name: 'Lukas Andersson',
        email: ' la@gmail.com',
        password: 'djd262',
        cartId: 11
    }
    let result = await fetch('/rest/customers', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    result = await result.json()
    console.log(result)
}

const addProduct = async () => {
    let product = {
        name: document.querySelector('#productName').value,
        description: document.querySelector('#productDescription').value,
        price: document.querySelector('#productPrice').value,
    }
    let result = await fetch('/rest/products', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    result = await result.json()
    console.log(result)
    console.log(product)
}
const addProductInCart = async () => {
    let productInCart  = {
        productId: document.querySelector('#productId').value,
        cartId: document.querySelector('#cartId').value,
        amount: document.querySelector('#amount').value,
    }
    let result = await fetch('/rest/productsXcarts', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productInCart)
    })
    result = await result.json()
    console.log(result)
    console.log(productInCart)
}
const addOrder = async () => {
    let order  = {
        customerId: document.querySelector('#customerId').value,
        cartId: document.querySelector('#cartIdOrder').value,
        totalPrice: document.querySelector('#totalPrice').value,
        timestamp: Date.now(),
    }
    let result = await fetch('/rest/orders', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    result = await result.json()
    console.log(result)
    console.log(order)
}

const getProducts = async () =>{
    let products = await fetch('/rest/products')
    products = await products.json()
    console.log(products)
}