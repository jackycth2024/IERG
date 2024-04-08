document.addEventListener('DOMContentLoaded', function() {

    const categoryForm = document.getElementById('categoryForm');
    const productForm = document.getElementById('productForm');
    const productImageInput = document.getElementById('productImage');
    const dropZone = document.getElementById('dropZone');
    const thumbnailPreview = document.getElementById('thumbnailPreview');



    categoryForm.addEventListener('submit', addCategory);
    productForm.addEventListener('submit', addProduct);


    function fetchCategories() {
        fetch('/api/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(categories => {
                console.log('Categories')
                const categorySelect = document.getElementById('categoryId');
                categorySelect.innerHTML = '<option value="" selected disabled>Category</option>';
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.catid;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    function fetchOrders() {
        fetch('/api/orders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(orders => {
                console.log('Orders:', orders);
                const ordersTableBody = document.getElementById('ordersTableBody');
                ordersTableBody.innerHTML = '';
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.uuid}</td>
                        <td>${order.username}</td>
                        <td>${order.digest}</td>
                        <td>${order.salt}</td>
                        <td>${order.orderdetails}</td>
                    `;
                ordersTableBody.appendChild(row);
        });
            })
            .catch(error => console.error('Error fetching orders:', error));
    }

    function addCategory(event) {
        event.preventDefault();
        const categoryName = document.getElementById('categoryName').value;
    }

    function addProduct(event) {
        event.preventDefault();
        const categoryId = document.getElementById('categoryId').value;
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').files[0];
    }

    function handleFileSelection(event) {
        const file = event.target.files[0];
        handleFileUpload(file);
    }

    function handleDrop(event) {
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    }

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function() {
                const thumbnail = document.createElement('img');
                thumbnail.src = reader.result;
                thumbnail.classList.add('thumbnail');
                thumbnailPreview.innerHTML = '';
                thumbnailPreview.appendChild(thumbnail);
            };
            reader.readAsDataURL(file);
        } else {
            thumbnailPreview.innerHTML = 'Invalid file format';
        }
    }

    productImageInput.addEventListener('change', handleFileSelection);

    dropZone.addEventListener('drop', handleDrop);
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults);
    });
    
    categoryForm.addEventListener('submit', addCategory);
    
    productForm.addEventListener('submit', addProduct);
    fetchCategories();
    fetchOrders();
});
