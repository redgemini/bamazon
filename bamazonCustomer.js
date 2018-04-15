//Test Load
console.log("load bamazonCustomer.js")

//Require NPM Packages
var mysql = require('mysql');
var inquirer = require ('inquirer');

//Establish MySQL Connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
})

//Initialize Connection
connection.connect(function(err){
	if (err) throw err;
	console.log("connection is working");
})
