var shoppingCart = document.getElementById("cart");
var shoppingList = document.getElementById("shoppingList");
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
var quantityInputs = {};

function updateShoppingList() {
    var shoppingListContainer = document.getElementById("shoppingList");
    shoppingListContainer.innerHTML = "";
    
    var totalAmount = 0;
    
    function createQuantityInputEventListener(quantityInput, itemName) {
        return function(event) {
            console.log("success");
            var newQuantity = parseInt(event.target.value);
            updateQuantity(itemName, newQuantity);
            updateShoppingList();
        };
    }

    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        var listItem = document.createElement("div");
        listItem.className = "product-entry";

        // Product information
        var productInfo = document.createElement("span");
        productInfo.innerHTML = item.name + " - $" + item.price.toFixed(2) + " x " + getTotalQuantity(itemName);
        listItem.appendChild(productInfo);


        // Quantity input
        var quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.placeholder = getTotalQuantity(itemName);
        quantityInput_value = getTotalQuantity(itemName);
        quantityInput.className = "quantity-input";
        quantityInput.dataset.itemName = itemName;
        console.log("Attaching event listener to quantity input for item: " + itemName);
        quantityInput.addEventListener("input", createQuantityInputEventListener(quantityInput, itemName));
        if(quantityInput){
            console.log("fuck");
        }
        
        listItem.appendChild(quantityInput);

        shoppingListContainer.appendChild(listItem);

        // Calculate subtotal for the current item and add it to total amount
        var subtotal = item.price * getTotalQuantity(itemName);
        totalAmount += subtotal;
    }

    var line = document.createElement("hr");
    line.className = "separator-line";
    shoppingListContainer.appendChild(line);

    var totalAmountContainer = document.createElement("div");
    totalAmountContainer.textContent = "Total Amount: $" + totalAmount.toFixed(2);
    shoppingListContainer.appendChild(totalAmountContainer);

    if (Object.keys(cartItems).length > 0) {
        // Checkout and clear button
        shoppingListContainer.innerHTML += "<button class='clearBtn' onclick='clearShoppingCart()'>Clear Cart</button>";
        shoppingListContainer.innerHTML += "<button class='checkoutBtn' onclick='checkout()'>Checkout</button>";
    } else {
        shoppingListContainer.innerHTML = "<p>Empty</p>";
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getTotalQuantity(itemName) {
    var item = cartItems[itemName];
    return quantityInputs[itemName] || item.quantity;
}

function updateQuantity(itemName, newQuantity) {
    cartItems[itemName] = newQuantity;
    updateShoppingList();
}

function addToCart(productContainer,quantities) {
    console.log("adding to cart...");
    console.log("productContainer:"+productContainer);
    var productName = productContainer.getAttribute("data-product-name");
    var productPrice = parseFloat(productContainer.getAttribute("data-product-price"));

    if (cartItems.hasOwnProperty(productName)) {
        cartItems[productName].quantity += quantities;
    } else {
        cartItems[productName] = { name: productName, price: productPrice, quantity: 1 };
    }
    updateShoppingList();
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

