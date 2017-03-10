var mysql = require('mysql');
var inquirer = require('inquirer');
var columnify = require('columnify');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
  	console.log('connected');
  	itemList();
});

function itemList() {
    connection.query('SELECT * FROM products', function(err, res) {

    	for (var i = 0; i < res.length; i++) {

        var columns = columnify([{

            'Item ID': res[i].ItemID,
            'Product Name': res[i].ProductName,
            'Price': res[i].Price,
        }], {
            minWidth: 20,
            config: {
                description: {
                    maxWidth: 30
                }
            }
            
        })
       console.log(columns);
		
   		}
    })
choosingItem();
};


function choosingItem () {

			inquirer.prompt([{
			name: "item",
			type: "input",
			message: "What is the ID of the product you would like to buy?",		
			 validate: function(value) {
                   if (!isNaN(value)) {
                       return true;
                   } else {
                       console.log(" Please enter a valid ID number.");
                   }

               }
        }]).then(function (answers) {
    		itemQuantity(answers);
});	
	 
};


function itemQuantity () {

			inquirer.prompt([{
			name: "quantity",
			type: "input",
			message: "How many items would you like to buy?",

			 validate: function(value) {
                   if (!isNaN(value)) {
                       return true;
                   } else {
                       console.log(" Please enter a valid quantity.");
                   }
               }
        }]) .then(function (answers) {
    		placeOrder(answers);
});		   
};

function placeOrder (item, quantity) {

	var total = quantity * res.StockQuantity;

	connection.query('SELECT * FROM products WHERE ItemID = ?', {itemID: item}, function (err, res) {
	}); 
		if (quantity >= res.StockQuantity) {
			console.log("The total for your order is " + total);
			updateQuantity();
}

		else {
			console.log("Insuficient quantity! Please select another item to buy");
			itemList();
		}
	}

	// function updateQuantity () {
	// 	connection.query('UPDATE products SET ? WHERE ?', {StockQuantity: res.StockQuantity - answer.quantity}, {itemID: item}),
                       
	// }
