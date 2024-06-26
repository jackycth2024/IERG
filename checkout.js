var shoppingCart = document.getElementById("cart");
var checkoutList = document.getElementById("checkoutlist");
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
var quantityInputs = {};

function updateCheckoutList() {
    checkoutList.innerHTML = "";
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
        checkoutList.appendChild(listItem);

        // Calculate subtotal for the current item and add it to total amount
        var subtotal = item.price * getTotalQuantity(itemName);
        totalAmount += subtotal;
    }


    var line = document.createElement("hr");
    line.className = "separator-line";
    checkoutList.appendChild(line);

    var totalAmountContainer = document.createElement("div");
    totalAmountContainer.textContent = "Total Amount: $" + totalAmount.toFixed(2);
    checkoutList.appendChild(totalAmountContainer);

    if (Object.keys(cartItems).length > 0) {
        // Checkout and clear button
        checkoutList.innerHTML += "<button class='clearBtn' onclick='clearShoppingCart()'>Clear</button>";
    } else {
        checkoutList.innerHTML = "<p>Empty</p>";
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function renderPayPalButton() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: async (data, actions) => {
            var items = [];
            for (var itemName in cartItems) {
                var item = cartItems[itemName];
                items.push({ name: item.name, price: item.price, quantity: getTotalQuantity(itemName) });
            }
            let orderDetails =
                await fetch("/api/create-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ items: items })
            }).then((response) => response.json());
            return orderDetails.orderId;
        },
        onApprove: async (data, actions) => {
            const orderId = data.orderID;
            console.log('onApprove orderId:',orderId);
            return actions.order.capture()
                .then(async () => {
                    await fetch("/api/paypal-webhook", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ orderId: orderId})
                    });
                    clearShoppingCart();
                });
        },
        onCancel: (data) => {
            fetch("/api/cancel-order", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(() => {
                clearShoppingCart();
            }).catch((error) => {
                console.error('Error canceling order:', error);
            });
        },
        onError: (err,) => {
            console.error('Payment error:', err);
        },
    }).render('#paypal-button-container');
}

function getTotalQuantity(itemName) {
    var item = cartItems[itemName];
    return quantityInputs[itemName] || item.quantity;
}


function updateQuantity(itemName, newQuantity) {
    var regex = /^[1-9]\d*$/;  //to test positive integer
    if(regex.test(newQuantity)){
        cartItems[itemName].quantity = newQuantity;
        updateCheckoutList();
    }
    else{
        updateCheckoutList();
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
    updateCheckoutList();
}

function removeproduct(itemName){
    if (cartItems.hasOwnProperty(itemName)) {
        delete cartItems[itemName];  
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCheckoutList();
    }
}

function clearShoppingCart() {
    cartItems = {};
    updateCheckoutList();
}

