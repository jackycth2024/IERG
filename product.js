function updateProductDetails() {
    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        var productDetails = document.querySelector('[data-product-name="' + itemName + '"]');

        if (productDetails) {
            var inventoryCount = productDetails.getAttribute("data-inventory");
            var inventorySpan = productDetails.querySelector("#inventoryCount");

            // Update inventory count
            if (inventorySpan) {
                inventorySpan.textContent = inventoryCount;

                // Display warning if inventory is 3 or less
                if (inventoryCount <= 3) {
                    inventorySpan.style.color = "red";
                    inventorySpan.textContent += " Only " + inventoryCount + " left!";
                } else {
                    inventorySpan.style.color = ""; // Reset color
                }
            }
        }
    }
}

function addToCart(productContainer) {
    var productName = productContainer.getAttribute("data-product-name");
    var productPrice = parseFloat(productContainer.getAttribute("data-product-price"));

    if (cartItems.hasOwnProperty(productName)) {
        cartItems[productName].quantity++;
    } else {
        cartItems[productName] = { name: productName, price: productPrice, quantity: 1 };
    }
    updateShoppingList();
}
