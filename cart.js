document.addEventListener("DOMContentLoaded", function() {
    function updateShoppingList() {
        console.log("ShoppingList Updated")
        var shoppingListContainer = document.getElementById("shoppingList");
        shoppingListContainer.innerHTML = "";
        
        function createQuantityInputEventListener(itemName) {
            return function(event) {
                var newQuantity = parseInt(event.target.value);
                updateQuantity(itemName, newQuantity);
                updateShoppingList();  // Update the shopping list when the quantity changes
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
});