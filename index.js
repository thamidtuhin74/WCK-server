require('dotenv').config();
const express =  require('express');
var cors =  require('cors');
const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');

const { config, send } = require('process');
const app = express()
const port = 3000;

app.use(cors());//Middle War
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqsktco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create DB 
    const database = client.db('webCodeSky');
    const serviceCollection = database.collection('serviceDB');

    app.get('/service', async(req, res)=>{
        const cursor = serviceCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/review', (req, res)=>{
        res.send('All review are there')
    })
    app.get('/post', (req, res)=>{
        res.send('All Post are there')
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('hellow WebCodeSky')
})



app.listen(port, ()=>{
    console.log(`WebCodeSky API is running on port ${port}`)
})