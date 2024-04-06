var shoppingCart = document.getElementById("cart");
var shoppingList = document.getElementById("shoppingList");
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
var quantityInputs = {};

function updateShoppingList() {
    shoppingList.innerHTML = "";
    var totalAmount = 0;

    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        var listItem = document.createElement("div");
        listItem.className = "product-entry";

        // Product information
        var productInfo = document.createElement("span");
        var quantities = document.createElement("span");
        productInfo.innerHTML = item.name + " - $" + item.price.toFixed(2) + " x " + getTotalQuantity(itemName);
        quantities.innerHTML = "<input type='number' class='quantity-input' placeholder='" + getTotalQuantity(itemName) + "' min='1' pattern='^[1-9]\d*$*' onblur='updateQuantity(\"" + itemName + "\", this.value)'></input>";
        quantities.innerHTML += "<button class='removeBtn' onclick='removeproduct(\"" + itemName + "\")'>Remove</button>";
        listItem.append(productInfo,quantities);       
        shoppingList.appendChild(listItem);

        // Calculate subtotal for the current item and add it to total amount
        var subtotal = item.price * getTotalQuantity(itemName);
        totalAmount += subtotal;
    }


    var line = document.createElement("hr");
    line.className = "separator-line";
    shoppingList.appendChild(line);

    var totalAmountContainer = document.createElement("div");
    totalAmountContainer.textContent = "Total Amount: $" + totalAmount.toFixed(2);
    shoppingList.appendChild(totalAmountContainer);

    if (Object.keys(cartItems).length > 0) {
        // Checkout and clear button
        shoppingList.innerHTML += "<button class='clearBtn' onclick='clearShoppingCart()'>Clear</button>";
        shoppingList.innerHTML += "<button class='checkoutBtn' onclick='tocheckout()'>Checkout</button>";
    } else {
        shoppingList.innerHTML = "<p>Empty</p>";
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function copyShoppingList() {
    updateShoppingList();
    const shoppingListBody = document.getElementById('shoppingListBody');
    shoppingListBody.innerHTML = '';
    const clonedShoppingList = shoppingList.cloneNode(true);
    shoppingListBody.appendChild(clonedShoppingList);
    shoppingList.style.display = "block";
}

function getTotalQuantity(itemName) {
    var item = cartItems[itemName];
    return quantityInputs[itemName] || item.quantity;
}


function updateQuantity(itemName, newQuantity) {
    var regex = /^[1-9]\d*$/;  //to test positive integer
    if(regex.test(newQuantity)){
        cartItems[itemName].quantity = newQuantity;
        updateShoppingList();
    }
    else{
        updateShoppingList();
    }
}


function addToCart(productContainer) {
    console.log("adding to cart...");
    console.log("productContainer:"+productContainer);
    var productName = productContainer.getAttribute("data-product-name");
    var productPrice = parseFloat(productContainer.getAttribute("data-product-price"));

    if (cartItems.hasOwnProperty(productName)) {
        cartItems[productName].quantity ++;
    } else {
        cartItems[productName] = { name: productName, price: productPrice, quantity: 1 };
    }
    updateShoppingList();
}

function removeproduct(itemName){
    if (cartItems.hasOwnProperty(itemName)) {
        delete cartItems[itemName];  
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateShoppingList();
    }
}

function clearShoppingCart() {
    cartItems = {};
    updateShoppingList();
}

function tocheckout() {
    window.location.href = '/checkout.html';
}

function checkout() {
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
