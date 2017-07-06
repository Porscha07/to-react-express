//Express Server

var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'x',
	password:'x',
	database:'todo3'
})
connection.connect();
//set up a route to handle react's first request
router.get('/getTasks', function(req, res, next) {
	connection.query('SELECT * FROM Tasks',(error,results)=>{
		if (error) throw error;
		res.json(results);
	})
});
//   res.json({
//   	students:[
//   	"marissa",
//   	"merilee",
//   	"chris",
//   	"stephen",
//   	"shane",
//   	]
//   })
// });
//addStudent route. Expects a name in the body, will add that name to the students table then response with all students in that table.

router.post('/addtasks', (req,res)=>{

	var taskToAdd = req.body.name;
	connection.query("INSERT INTO Tasks (task_name) VALUES(?)",[taskToAdd],(error,results)=>{
			if(error) throw error
	connection.query('SELECT * FROM Tasks',(error2,results2)=>{
		if (error2) throw error2;	
		res.json(results2);
		})
	})
})

	// res.json(msg:"test")
module.exports = router;
