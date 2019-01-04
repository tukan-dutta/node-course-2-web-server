const express=require('express');
const hbs=require('hbs');  

const fs=require('fs');

const port=process.env.PORT || 3000;

var app=express();



hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs'); 

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=now+':'+req.method+' '+req.url;

	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('Unable to connect server');
		}
	});
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });


app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

 app.get('/',(req,res)=>{

 	res.render('home.hbs',{
 		pageTitle:'Home Page',
 		welcomeMessage:'welcome'
 	});
 	// res.send('<h1>Hello Express</h1>');

 	// res.send({
 	// 	name:'Tukan',
 	// 	likes:[
 	// 	'eating',
 	// 	'riding'
 	// 	]
 	// });
 });
 
 app.get('/about',(req,res)=>{
 	res.render('about.hbs',{
 		pageTitle:'About Page',
 	});
 });

 app.get('/project',(req,res)=>{
 	res.render('project.hbs',{
 		pageTitle:'Projects'
 	});
 });

  app.get('/bad',(req,res)=>{
 	res.send({
 		errorMessage:'Unable to handle request'
 	});
 });

app.listen(port,()=>{
	console.log('Server is set up on port '+port);
});