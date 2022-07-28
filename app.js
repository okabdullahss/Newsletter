const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()
const client = require("@mailchimp/mailchimp_marketing");



app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

client.setConfig({
  apiKey:"48afcab934592f15608d42c7c1e546c3-us5",
  server:"us5",
});


app.post("/", function(req,res){

const name = req.body.fName;
const sname = req.body.lName;
const mail = req.body.mail;

const subscribingUser = {

name: name,
sname:sname,
mail:mail

}

const run = async () => {

  try { const response = await client.lists.addListMember("901f1f3949", {
    email_address : subscribingUser.mail,
    status:"subscribed",
    merge_fields: {
      FNAME: subscribingUser.name,
      LNAME: subscribingUser.sname
    }
  });

  console.log(response);
  res.sendFile(__dirname+"/success.html");}
catch (err) {
  console.log(err.status);
  res.sendFile(__dirname+"/failure.html");
}


};

run();


});

app.post("/failure", function(req,res){

res.redirect("/");

});

app.listen(process.env.PORT || 3000, function(){
console.log("Server is running at 3000 port")
})


// APi key for mail chimp :  48afcab934592f15608d42c7c1e546c3-us5
//Audience ID : 901f1f3949
