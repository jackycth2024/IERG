var shoppingCart = document.getElementById("cart");
var shoppingList = document.getElementById("shoppingList");
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
var quantityInputs = {};

function updateShoppingList() {
    var shoppingListContainer = document.getElementById("shoppingList");
    shoppingListContainer.innerHTML = "";
    
    function createQuantityInputEventListener(itemName) {
        return function(event) {
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
        quantityInput.value = getTotalQuantity(itemName);
        quantityInput.className = "quantity-input";
        quantityInput.dataset.itemName = itemName;
        quantityInput.addEventListener("input", createQuantityInputEventListener(itemName));
        listItem.appendChild(quantityInput);

        shoppingListContainer.appendChild(listItem);
    }

    if (Object.keys(cartItems).length > 0) {
        // Checkout button
        shoppingListContainer.innerHTML += "<button class='checkoutBtn' onclick='checkout()'>Checkout</button>";
    } else {
        // Empty message
        shoppingListContainer.innerHTML = "<p>Empty</p>";
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getTotalQuantity(itemName) {
    var item = cartItems[itemName];
    return quantityInputs[itemName] || item.quantity;
}

function updateQuantity(itemName, newQuantity) {
    quantityInputs[itemName] = newQuantity;
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

var addToCartButtons = document.querySelectorAll(".addToCart");
addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        var productContainer = event.target.closest(".product");
        addToCart(productContainer);
    });
});

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
