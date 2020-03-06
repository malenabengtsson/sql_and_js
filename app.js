const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const util = require('util')

app.use(express.json())
const db = new sqlite.Database('./colludium.db')

db.all = util.promisify(db.all)

app.get('/rest/hello', (req, res) => {
res.json({
    message: 'Hello World'
})
})

app.get('/rest/customers', async (req, res) =>{
    const limit = req.query.limit ?' LIMIT ' + req.query.limit :''
let customers = await db.all('SELECT * FROM customers ' + limit)
res.json({
    customers: customers
})
})
app.get('/rest/customers/:id', async (req, res) =>{
let customer = await db.all('SELECT * FROM customers WHERE customerId = $id', {
    $id: req.params.id
})
res.json({
    customer: customer
})
})

app.post('/rest/customers', async (req, res) =>{
    console.log(req.body)
    const values = {
        $name: req.body.name,
        $email: req.body.email,
        $password: req.body.password,
        $cartId: req.body.cartId,
    }
    try{
    await db.all('INSERT INTO customers (name, email, password, cartId) VALUES($name, $email, $password, $cartId)', values)
    res.json({message: 'Successfully added'})
    } catch(e){
        res.json({message: 'Failed'})
        console.log(e)
    }
})
app.delete('/rest/customers/:id', async (req, res) => {
    try{
        await db.all('DELETE FROM customers WHERE customerId = $id', {$id: req.params.id })
        res.json({message: 'Sucessfully deleted user with id: ' + req.params.id})
    } catch(e){
        console.log(e)
        res.json({message: 'Failed'})
    }
})

app.put('/rest/customers/:id', async (req, res) => {
    const values= {
        $id: req.params.id,
        $cartId: req.body.cartId
    }
try{
await db.all('UPDATE customers SET cartId = $cartId WHERE customerId = $id', values)
res.json({message: 'Success!'})

} catch(e){
    res.json({message: 'Not successfull'})
    console.error(e);
    
}
})
app.get('/rest/products', async (req, res) =>{
    const limit = req.query.limit ?' LIMIT ' + req.query.limit :''
let products = await db.all('SELECT * FROM products ' + limit)
res.json({
    products
})
})
//Products
app.post('/rest/products', async (req, res) =>{
    console.log(req.body)
    const values = {
        $name: req.body.name,
        $description: req.body.description,
        $price: req.body.price
    }
    try{
    await db.all('INSERT INTO products (name, description,price) VALUES($name, $description,$price)', values)
    res.json({message: 'Successfully added'})
    } catch(e){
        res.json({message: 'Failed'})
        console.log(e)
    }
})
app.get('/rest/productsXcarts', async (req, res) =>{
    const limit = req.query.limit ?' LIMIT ' + req.query.limit :''
let productsXcarts = await db.all('SELECT * FROM productsXcarts ' + limit)
res.json({
    productsXcarts
})
})
//X
app.post('/rest/productsXcarts', async (req, res) =>{
    console.log(req.body)
    const values = {
        $productId: req.body.productId,
        $cartId: req.body.cartId,
        $amount: req.body.amount
    }
    try{
    await db.all('INSERT INTO productsXcarts (productId, cartId, amount) VALUES($productId, $cartId, $amount)', values)
    res.json({message: 'Successfully added'})
    } catch(e){
        res.json({message: 'Failed'})
        console.log(e)
    }
})
//Order
app.get('/rest/orders', async (req, res) =>{
    const limit = req.query.limit ?' LIMIT ' + req.query.limit :''
let orders = await db.all('SELECT * FROM orders ' + limit)
res.json({
    orders
})
})
app.post('/rest/orders', async (req, res) =>{
    console.log(req.body)
    const values = {
        $customerId: req.body.customerId,
        $cartId: req.body.cartId,
        $totalPrice: req.body.totalPrice,
        $timestamp: req.body.timestamp,
    }
    try{
    await db.all('INSERT INTO products (customerId,cartId,totalPrice,timestamp) VALUES($customerId,$cartId,$totalPrice,$timestamp)', values)
    res.json({message: 'Successfully added'})
    } catch(e){
        res.json({message: 'Failed'})
        console.log(e)
    }
})
app.use(express.static(__dirname +'/frontend'))

app.get('*', (req, res) =>{
    res.sendFile(__dirname +'/frontend/index.html')
})

app.listen(5000, () => {
    console.log('Listening on port 5000'
    )
})