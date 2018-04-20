//TA Questions
//Received an security email - how to update package.json to remove threat
//Code Errors

//Test Page Load
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
    console.error("error connecting");
  }
  productInventory();
});

//Load Product List from MySQL DB
var productInventory = function (){
	console.log("\n\nCHOOSE FROM THE MOST VALUABLE RECORDS OF ALL TIME!!!")
	console.log(" ITEM ID |  Record Name |  Department Name |  Price  | Stock Quantity" )
	connection.query("SELECT * FROM products", function (err, res) {
		for(var i =0; i < res.length; i++) {
			console.log(
 				res[i].item_id + "|" + 
 				res[i].product_name + "|" + 
 				res[i].department_name + "|" +
 				"$" + res[i].price + "|" + 
 				res[i].stock_quantity) + "|" +
	console.log("____________________________________________________________________________________\n");
		}

	userPurchase(res);

	})
};

//User Input Promts to Purchase Items
var userPurchase = function(res){
	inquirer.prompt([
	{	
      name: "item_id",
      type: "input",
	  message: "What is the item ID of the item you like to purchase?"
    },
    {
      name: "Quantity",
      type: "input",
      message: "How many units would you like to purchase?"
	}])
	.then(function(answer){
		connection.query("SELECT * FROM products WHERE products.item_id = ?",
			[answer.item_id], function(err, res) {
				console.log (res[0].item_id);
				console.log(res[0].stock_quantity);

//Check for Item in Stock				
	if (res[0].item_id == answer.item_id && res[0].stock_quantity >= parseInt(answer.Quantity)) {

//Finalize Puchase and Total Price
      var TotalPrice = res[0].price * parseInt(answer.Quantity);
      console.log("Successful purchase of " + answer.Quantity + " " + res[0].product_name);
      console.log("Your Total Purchase Cost: $" + TotalPrice);

      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity:
              res[0].stock_quantity - parseInt(answer.Quantity)
          },
          {
            item_id: res[0].item_id
          }
        ],
        function(err, res) {
     

          setTimeout(function() {
            console.log("Your Total Purchase Cost: $" + TotalPrice);
		  }, 2500);
		setTimeout(productInventory, 1000);
        }
      );
    } else if (res[0].item_id == answer.item_id && res[0].stock_quantity < parseInt(answer.Quantity)) {
      setTimeout(function() {
        console.log("We do not have the quanity you requested!");
      }, 2500);
      productInventory();
    }


		})
	});

	


};

