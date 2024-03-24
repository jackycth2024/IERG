function fetchCategories() {
    fetch('http://s33.ierg4210.ie.cuhk.edu.hk:3000/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(categories => {
            console.log('Categories')
            const categorySelect = document.getElementById('categorySelect');
            categorySelect.innerHTML = '<option value="">Select Category</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.catid;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
            
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// productList selected by Categories
function fetchProducts(categoryId) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    fetch(`http://s33.ierg4210.ie.cuhk.edu.hk:3000/products/catid=${categoryId}`)
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

//update the CategoriesDetails page
function fetchCategoriesDetails(categoryId) {
    fetch(`http://s33.ierg4210.ie.cuhk.edu.hk:3000/products/catid=${categoryId}`)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('Categoriesmain');
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
};


function fetchProductDetails(productId) {
    fetch(`http://s33.ierg4210.ie.cuhk.edu.hk:3000/products/${productId}`)
        .then(response => response.json())
        .then(products => {
            if(Array.isArray(products) && products.length > 0){
                const product = products[0];
                const productDetailsContainer = document.getElementById('product-details');
                productDetailsContainer.innerHTML = ''; 
                
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.dataset.productName = product.name;
                productElement.dataset.productPrice = product.price;
                
                const productImage = document.createElement('img');
                productImage.src = 'image/img/Product' + productId + '.png';
                productImage.alt = product.name + ' Full-size Image';
                
                const productName = document.createElement('h3');
                productName.textContent = product.name;
                
                const productDescription = document.createElement('p');
                productDescription.textContent = 'Description:' + product.description;
                
                const productPrice = document.createElement('p');
                productPrice.textContent = '$' + product.price;
                
                const productInventory = document.createElement('p');
                productInventory.textContent = 'Inventory: ';
                
                const inventorySpan = document.createElement('span');
                inventorySpan.id = 'inventoryCount';
                inventorySpan.textContent = product.inventory;
                if (product.inventory <= 3) {
                    inventorySpan.style.color = "red";
                    inventorySpan.textContent = " Only " + product.inventory + " left!";
                } else {
                    inventorySpan.style.color = ""; // Reset color
                }
                productInventory.appendChild(inventorySpan);
                
                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'addToCart';
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', function() {
                    addToCart(productElement);
                });
                
                // Append elements to the product details container
                productElement.appendChild(productImage);
                productElement.appendChild(productName);
                productElement.appendChild(productDescription);
                productElement.appendChild(productPrice);
                productElement.appendChild(productInventory);
                productElement.appendChild(addToCartButton);
                
                // Append product details container to the product details section
                productDetailsContainer.appendChild(productElement);
            }
            else{
                console.error('Product data is null or empty.');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
}
//to open product details page
function openProductDetails(productId) {
    const pageName = 'Product' + productId + '.html';
    window.location.href = pageName;
}



fetchCategories();