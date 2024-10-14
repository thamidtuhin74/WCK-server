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
    const reviewCollection = database.collection('reviewDB');
    const postCollection = database.collection('postDB');


    app.get('/service', async(req, res)=>{
        const service = serviceCollection.find();
        const serviceResult = await service.toArray();
        res.send(serviceResult);
    })
    app.get('/service/:id',async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const singleService = await serviceCollection.findOne(query);
      res.send(singleService);
    })

    app.get('/review' , async(req, res)=>{
      const review =  reviewCollection.find();
      const reviewResult = await review.toArray();
      res.send(reviewResult);
    })

    app.get('/post', async(req, res)=>{
      const posts = postCollection.find();
      const postResult = await posts.toArray();
      res.send(postResult);
    })
    app.get('/post/:id',async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const singlePost = await postCollection.findOne(query);
      res.send(singlePost);
    })
    

    // app.get('/review', (req, res)=>{
    //     res.send('All review are there')
    // })
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