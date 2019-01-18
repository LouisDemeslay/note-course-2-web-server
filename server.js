const express = require ('express');
const hbs = require('hbs');
const fs = require ('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})


app.set('view engine', 'hbs');
app.use((req,res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('log' , log + ' \\n ',  function(error){
      console.log('error')
    }
  )
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.render('welcome.hbs', {
    pageTitle:'about page',
    welcomeMessage : 'pute pute pute pute',


})});

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle:'about page',
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage : 'unable to find data'
  })
})

app.listen(3000, console.log(`server is on port ${port}`))
