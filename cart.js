var shoppingCart = document.getElementById("cart");
var shoppingList = document.getElementById("shoppingList");
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
var quantityInputs = {};

function updateShoppingList() {
    var shoppingListContainer = document.getElementById("shoppingList");
    shoppingListContainer.innerHTML = "";

    for (var productId in cartItems) {
        var product = cartItems[productId];

        // Create a row for each product in the shopping list
        var listItem = document.createElement("div");
        listItem.className = "product-entry";

        var productName = document.createElement("span");
        productName.textContent = product.name;

        var productPrice = document.createElement("span");
        productPrice.textContent = "$" + product.price.toFixed(2);

        var quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.dataset.productId = productId;
        quantityInput.addEventListener("input", function() {
            updateQuantity(productId, parseInt(this.value));
        });

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
            removeItem(productId);
        });

        listItem.appendChild(productName);
        listItem.appendChild(productPrice);
        listItem.appendChild(quantityInput);
        listItem.appendChild(removeButton);

        shoppingListContainer.appendChild(listItem);
    }

    // Display total amount
    var totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = "Total: $" + calculateTotalAmount();

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// function updateShoppingList() {
//     var shoppingListContainer = document.getElementById("shoppingList");
//     shoppingListContainer.innerHTML = "";
    
//     function createQuantityInputEventListener(itemName) {
//         return function(event) {
//             var newQuantity = parseInt(event.target.value);
//             updateQuantity(itemName, newQuantity);
//             updateShoppingList();
//         };
//     }
    
//     for (var itemName in cartItems) {
//         var item = cartItems[itemName];
//         var listItem = document.createElement("div");
//         listItem.className = "product-entry";

//         // Product information
//         var productInfo = document.createElement("span");
//         productInfo.innerHTML = item.name + " - $" + item.price.toFixed(2) + " x " + getTotalQuantity(itemName);
//         listItem.appendChild(productInfo);


//         // Quantity input
//         var quantityInput = document.createElement("input");
//         quantityInput.type = "number";
//         quantityInput.placeholder = getTotalQuantity(itemName);
//         quantityInput.value = getTotalQuantity(itemName);
//         quantityInput.className = "quantity-input";
//         quantityInput.dataset.itemName = itemName;
//         quantityInput.addEventListener("input", createQuantityInputEventListener(itemName));
//         listItem.appendChild(quantityInput);

//         shoppingListContainer.appendChild(listItem);
//     }

//     if (Object.keys(cartItems).length > 0) {
//         // Checkout button
//         shoppingListContainer.innerHTML += "<button class='checkoutBtn' onclick='checkout()'>Checkout</button>";
//     } else {
//         // Empty message
//         shoppingListContainer.innerHTML = "<p>Empty</p>";
//     }
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

//function getTotalQuantity(itemName) {
//    var item = cartItems[itemName];
//    return quantityInputs[itemName] || item.quantity;
//}


//function updateQuantity(itemName, newQuantity) {
    //    quantityInputs[itemName] = newQuantity;
    //    updateShoppingList();
    //}
    
    function addToCart(productContainer) {
        console.log("adding to cart...")
        var productName = productContainer.getAttribute("data-product-name");
        var productPrice = parseFloat(productContainer.getAttribute("data-product-price"));
        
        if (cartItems.hasOwnProperty(productName)) {
            cartItems[productName].quantity++;
    } else {
        cartItems[productName] = { name: productName, price: productPrice, quantity: 1 };
    }
    updateShoppingList();
}

//to remove product from the shopping list
function removeItem(productId) {
    delete cartItems[productId];
    updateShoppingList();
}

//update the quantity of a product in the shopping list
function updateQuantity(productId, newQuantity) {
    cartItems[productId].quantity = newQuantity;
    updateShoppingList();
}

function calculateTotalAmount() {
    var total = 0;
    for (var productId in cartItems) {
        total += cartItems[productId].price * cartItems[productId].quantity;
    }
    return total.toFixed(2);
}

function clearShoppingCart() {
    cartItems = {};
    updateShoppingList();
}

function checkout() {
    alert("Checkout button clicked. Implement PayPal integration here.");
    cartItems = {};
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateShoppingList();
}

shoppingCart.addEventListener("mouseover", function(event) {
    updateShoppingList();
    shoppingCart.addEventListener("mouseover", function(event) {
        // Get mouse coordinates
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        // Set the shopping list position
        shoppingList.style.display = "block";
        shoppingList.style.position = "fixed";
        shoppingList.style.top = mouseY + "px";
        shoppingList.style.left = mouseX + "px";
        updateShoppingList();
    });
});

shoppingList.addEventListener("mouseleave", function() {
    shoppingList.style.display = "none";
});

var clearButton = document.querySelector(".clearBtn");
if (clearButton) {
    clearButton.addEventListener("click", function() {
        clearShoppingCart();
    });
}


