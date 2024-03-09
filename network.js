function fetchCategories() {
    console.log('Fetching categories...');
    fetch('http://176.34.61.92:3000/')
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

function fetchProducts(categoryId) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    console.log('Fetching products...');
    fetch(`http://176.34.61.92:3000/products/catid=${categoryId}`)
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

function fetchProductDetails(productId) {
    fetch(`http://176.34.61.92:3000/products/${productId}`)
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
                productInventory.appendChild(inventorySpan);
                
                const addToCartButton = document.createElement('button');
                addToCartButton.className = 'addToCart';
                addToCartButton.textContent = 'Add to Cart';
                
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