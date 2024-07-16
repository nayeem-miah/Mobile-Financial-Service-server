const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
// middleware setup
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);
console.log(process.env.DB_USER);





// mongodb--------------------------------------------





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bomlehy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();
        const usersCollection = client.db("MobileServiceDB").collection("users");

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const resut = await usersCollection.insertOne(newUser);
            res.send(resut);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// mongodb--------------------------------------------

app.get('/', (req, res) => {
    res.send("Mobile-Financial-Service is running now.... ")
})

app.listen(port, () => {
    console.log(`Mobile-Financial-Service on port ${port}`);
})