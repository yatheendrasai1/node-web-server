const express=require('express');
const hbs=require('hbs');
const os=require('os');
var app= express();

app.set('view engine','hbs'); //setting view engine

hbs.registerPartials(__dirname+'/views/partials'); //registering partials like header and footer

//registering helpers
hbs.registerHelper('getCurrentYear',function(){
  return new Date().getFullYear();
});
//registering helpers
hbs.registerHelper('toUpperCase',(text)=>{
  return text.toUpperCase();
})

app.use(function(req,res,next){
  res.render('maintenance.hbs');
});

//Using Middleware
app.use(express.static(__dirname+'/public'));
app.use(function(req,res,next){
  console.log(`${new Date().toString()} : ${req.method}, ${req.url}`);
  next();
});


app.get('/hi',function(req,res){
    res.render('home.hbs',{
      UserName: os.userInfo().username,
      title:'Home Page',
      time: new Date().getHours()%12+':'+new Date().getMinutes(),
    });
});

app.get('/hi/about',function(req,res){
  res.render('about.hbs',{
    title:'About',
    UserName: os.userInfo().username,
    time: new Date().getHours()%12+':'+new Date().getMinutes(),
  });
});

app.listen(3000,function(){
  console.log('Server listening at prot number 3000');
});
