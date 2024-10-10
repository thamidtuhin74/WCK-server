const express =  require('express')
var cors =  require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res)=>{
    res.send('hellow wordld')
})

app.listen(port, ()=>{
    console.log(`Example app listensing on port ${port}`)
})