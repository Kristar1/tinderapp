const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
var path = require("path");
const { v4: uuidv4 } = require("uuid");
const { emitKeypressEvents } = require("readline");
const PORT = 8000;
require("dotenv").config();

const uri = process.env.URI
// 'mongodb+srv://kristar:Kedia12345@cluster1.7h86y.mongodb.net/Cluster0?retryWrites=true&w=majority'
app.use(cors());
app.use(express.json());


// SignUp Logic
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  const generateduserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists , Please login");
    }
    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generateduserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201)
      .json({ token, userId: generateduserId });
  } catch (error) {
    console.log(error);
  }
});


// Login Logic
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const user = await users.findOne({ email });
const correctPassword=  await bcrypt.compare(password,user.hashed_password);

if (user && correctPassword ) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24,
        });
        res.status(201).json({token, userId:user.user_id})
    }
    else{

      res.status(400).send('Invalid username or password')
    }

  
  } catch (error) {
    console.log(error);
  }
});

//  get the users data 

app.get('/user', async(req,res)=>{
  const client = new MongoClient(uri);
  const userId= req.query.userId;
try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users")
    const query ={user_id: userId};
    const user= await users.findOne(query)
    res.send(user)

}catch(err){
console.log(err)
} finally {
    await client.close();
  }
})




//  Get  users by gender

app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender= req.query.gender
// console.log(gender)
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
const query={ gender_identity: gender};
const foundUsers= await users.find(query).toArray()
    res.send(foundUsers);


  } finally {
    await client.close();
  }
});



// Get all user
app.get("/everyone", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const returnedUsers= await users.find().toArray()
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

// Update User Logic

app.put('/user',async(req,res)=>{
  const client = new MongoClient(uri);
  const formData=req.body.formData

  try{
    await client.connect()
    const database = client.db("app-data");
  const users = database.collection("users");

  const query= {user_id: formData.user_id};

  const updateDocument= {
      $set:{
          First_name:formData.first_name,
          dob: formData.dob,
          show_gender: formData.show_gender,
          gender_identity: formData.gender_identity,
          gender_interest: formData.gender_interest,
          url: formData.url,
          about:formData.about,
          matches:formData.matches,

      }
  }
  const insertedUser= await users.updateOne(query, updateDocument)
  res.send(insertedUser)

} finally {
    await client.close();
  }

})

// Match logic
app.put('/addmatch', async(req,res)=>{
  const client = new MongoClient(uri);
const {userId,matchedUserId}= req.body

try {
    await client.connect()
    const database = client.db("app-data");
  const users = database.collection("users");
  const query= {user_id: userId};
  const updateDocument={
   $push:{matches :{user_id:matchedUserId}}
    }
    const user=await users.updateOne(query,updateDocument);
    res.send(user)
}  finally {
    await client.close();
  }


})
// Show matches
app.get('/users', async (req,res) => {
    const client = new MongoClient(uri);
    const userIds= JSON.parse(req.query.userIds);
    console.log('userIds=', userIds);

    try {
        await client.connect()
        const database = client.db("app-data");
      const users = database.collection("users");
        
      const pipeline=
      [
          {
              '$match': {
                  'user_id': {
                      '$in': userIds
                  }
            }
          }
      ]
      const foundUsers=await users.aggregate(pipeline).toArray();
      console.log('foundUsers', foundUsers)
      res.send(foundUsers)
    } finally {
      await client.close();
    }
    
} )

//  Messages Part
app.get('/messages',async (req,res)=>{
  const client = new MongoClient(uri);
  const {userId, correspondingUserId}= req.query
  try{
    await client.connect()

    const database = client.db("app-data");
  const messages= database.collection('messages');
  
  const query = 
    {
  from_userId: userId , to_userId: correspondingUserId,
    }
  const foundMessages= await messages.find(query).toArray();
  res.send(foundMessages)
  }finally {
    await client.close();
  }
})

app.post('/message', async(req,res)=>{
  const client = new MongoClient(uri);
  const message= req.body.message

  try{
    await client.connect()
    const database = client.db("app-data");
    const messages= database.collection('messages');
   const insertedMessage= await messages.insertOne(message);
   res.send(insertedMessage)
  
  
  }finally {
    await client.close();
  }
})




app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});












app.listen(process.env.PORT || PORT, () => [
  console.log(`server started on ${process.env.PORT || PORT}`),
]);
