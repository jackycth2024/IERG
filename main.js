// Fetch products data from the server and update the "On Sales" section   
function fetchProductsData() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('main');
            productList.innerHTML = ''; // Clear existing products
            
            // Loop through the products and create HTML elements
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.dataset.productName = escapeHTML(product.name);
                productElement.dataset.productPrice = escapeHTML(product.price);
                
                const productLink = document.createElement('a');
                productLink.href = '#'; // Add link to product details page
                productLink.onclick = () => openProductDetails(product.pid);
                
                const productImage = document.createElement('img');
                productImage.src = 'image/img/Product' + escapeHTML(product.pid) + '.png';
                productImage.alt = escapeHTML(product.name) + ' Thumbnail';
                
                const productName = document.createElement('h3');
                productName.textContent = escapeHTML(product.name);
                
                const productPrice = document.createElement('p');
                productPrice.textContent = '$' + escapeHTML(product.price);
                
                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'addToCart';
                addToCartButton.textContent = 'Add to Cart';


                addToCartButton.addEventListener('click', function() {
                    addToCart(productElement);
                });
                
                
                // Append elements to the product container
                productLink.appendChild(productImage);
                productLink.appendChild(productName);
                productElement.appendChild(productLink);
                productElement.appendChild(productPrice);
                productElement.appendChild(addToCartButton);
                
                // Append product container to the product list
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}
//to open product details page
function openProductDetails(productId) {
    const pageName = 'Product' + productId + '.html';
    window.location.href = pageName;
}


// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            if (user) {
                showLoggedInUser(user.email);
            } else {
                showLoginButton();
            }
        })
        .catch(error => console.error('Error checking login status:', error));
}

// Function to show account name and logout button
function showLoggedInUser(email) {
    const accountContainer = document.getElementById('accountContainer');
    accountContainer.innerHTML = ''; 

    const accountName = document.createElement('span');
    accountName.textContent = email || 'guest';
    accountContainer.appendChild(accountName);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logout);
    accountContainer.appendChild(logoutButton);
}

// Function to show login button
function showLoginButton() {
    const accountContainer = document.getElementById('accountContainer');
    accountContainer.innerHTML = '';

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.addEventListener('click', ToLoginPage);
    accountContainer.appendChild(loginButton);
}

// Function to handle logout
function logout() {
    fetch('/api/logout', {
        method: 'post'
    })
    .then(() => {
        location.reload();
    })
    .catch(error => console.error('Error logging out:', error));
}

// Function to navigate to the login page
function ToLoginPage() {
    window.location.href = '/login.html';
}