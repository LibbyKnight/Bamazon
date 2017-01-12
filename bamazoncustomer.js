var mysql = require('mysql');
var inquirer = require('inquirer');
var columnify = require('columnify');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@ndroid4LIFE",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    tableList();
});

function tableList() {
        connection.query('SELECT * FROM products', function(err, res) {
        	inquirer.prompt({
			name: "inputChoices",
			type: "rawlist",
			message: "What is the ID of the product you would like to buy?",
			choices: [console.log(columns)]
		})

        	for (var i = 0; i < res.length; i++) {
                var columns = columnify([{
  		  'Item ID': res[i].ItemID,
		  'Product Name': res[i].ProductName,
		  'Price': res[i].Price,
		}]) 		 
		
          };       
        });
      };
