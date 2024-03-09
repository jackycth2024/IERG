// Fetch categories when the page loads
fetchCategories();
// // Fetch products data from the server and update the "On Sales" section   
// function fetchProductsData() {
//     fetch('http://176.34.61.92:3000/products')
//         .then(response => response.json())
//         .then(products => {
//             const productList = document.getElementById('main');
//             productList.innerHTML = ''; // Clear existing products
            
//             // Loop through the products and create HTML elements
//             products.forEach(product => {
//                 const productElement = document.createElement('div');
//                 productElement.className = 'product';
//                 productElement.dataset.productName = product.name;
//                 productElement.dataset.productPrice = product.price;
                
//                 const productLink = document.createElement('a');
//                 productLink.href = '#'; // Add link to product details page
//                 productLink.onclick = () => openProductDetails(product.pid);
                
//                 const productImage = document.createElement('img');
//                 productImage.src = 'image/img/Product' + product.pid + '.png';
//                 productImage.alt = product.name + ' Thumbnail';
                
//                 const productName = document.createElement('h3');
//                 productName.textContent = product.name;
                
//                 const productPrice = document.createElement('p');
//                 productPrice.textContent = '$' + product.price;
                
//                 const addToCartButton = document.createElement('button');
//                 addToCartButton.className = 'addToCart';
//                 addToCartButton.textContent = 'Add to Cart';
//                 addToCartButton.addEventListener('click', function() {
//                     addToCart(productElement);
//                 });
                
//                 // Append elements to the product container
//                 productLink.appendChild(productImage);
//                 productLink.appendChild(productName);
//                 productElement.appendChild(productLink);
//                 productElement.appendChild(productPrice);
//                 productElement.appendChild(addToCartButton);
                
//                 // Append product container to the product list
//                 productList.appendChild(productElement);
//             });
//         })
//         .catch(error => console.error('Error fetching products:', error));
// }
// //to open product details page
// function openProductDetails(productId) {
//     const pageName = 'Product' + productId + '.html';
//     window.location.href = pageName;
// }

// fetchProductsData();

// Fetch products data from the server and update the "On Sales" section
function fetchProductsData() {
    fetch('http://176.34.61.92:3000/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('main');
            productList.innerHTML = ''; // Clear existing products
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.dataset.productId = product.pid; // Set product ID
                productElement.dataset.productName = product.name;
                productElement.dataset.productPrice = product.price;
                
                // Other elements...

                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'addToCart';
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', function() {
                    addToCart(productElement);
                });
                
                // Append elements...
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to handle page reload and restore shopping list from localStorage
function restoreShoppingList() {
    var storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        updateShoppingList();
    }
}

// Call functions to fetch products data and restore shopping list on page load
fetchProductsData();
restoreShoppingList();
