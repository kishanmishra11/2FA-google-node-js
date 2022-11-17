const mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.1.42:27017/test",{
    keepAlive: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useFindAndModify: false
}).then(()=>{
    console.log("Database Connected successfully");
}).catch((e)=>{
    console.log("Database Connection failed");
    console.log(e)
})
