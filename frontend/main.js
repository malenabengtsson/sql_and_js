console.log('Hello from Frontend')

const getCostumers = async () =>{
    let customers = await fetch('/rest/customers')
    customers = await customers.json()
    console.log(customers)
}

//getCostumers()

const postCostumer = async () => {
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
postCostumer()