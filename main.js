// Fetch categories when the page loads
fetchCategories();
// Fetch products data from the server and update the "On Sales" section   
function fetchProductsData() {
    fetch('http://s33.ierg4210.ie.cuhk.edu.hk:3000/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('main');
            productList.innerHTML = ''; // Clear existing products
            
            // Loop through the products and create HTML elements
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.dataset.productName = product.name;
                productElement.dataset.productPrice = product.price;
                
                const productLink = document.createElement('a');
                productLink.href = '#'; // Add link to product details page
                productLink.onclick = () => openProductDetails(product.pid);
                
                const productImage = document.createElement('img');
                productImage.src = 'image/img/Product' + product.pid + '.png';
                productImage.alt = product.name + ' Thumbnail';
                
                const productName = document.createElement('h3');
                productName.textContent = product.name;
                
                const productPrice = document.createElement('p');
                productPrice.textContent = '$' + product.price;
                
                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'addToCart';
                addToCartButton.textContent = 'Add to Cart';
                // Include CSRF nonce in the button
                const csrfNonceInput = document.createElement('input');
                csrfNonceInput.type = 'hidden';
                csrfNonceInput.name = 'nonce';
                csrfNonceInput.value = "<?php echo csrf_getNonce($action; ?>"
                console.log("nonce value" + csrfNonceInput.value);
                addToCartButton.appendChild(csrfNonceInput);

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

fetchProductsData();

