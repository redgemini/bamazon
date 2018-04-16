//Test Load
console.log("load bamazonCustomer.js");

//Require NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
//var Table = require('cli-table');
//require("console.table");

//Establish MySQL Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

//Initialize Connection
connection.connect(function(err) {
	console.log("connection working")
  if (err) {
    console.error("error connecting:" + err.stack);
  }
  productInventory();
});

//Product table from DB
function productInventory (){
	connection.query("SELECT * FROM products", function (err,res) {
		for(var i =0; i < res.length; i++) {
			console.log(
 				res[i].item_id + "|" + 
 				res[i].product_name + "|" + 
 				res[i].department_name + 
 				res[i].price + "|" + 
 				res[i].stock_quantity);
				 console.log("____________________________"
			);
	}
})
}