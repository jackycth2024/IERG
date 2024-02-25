document.addEventListener('DOMContentLoaded', function() {
    // Fetch categories and populate the dropdown
    fetch('/categories')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('categoryId');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.catid;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Display thumbnail preview on file selection
    const productImageInput = document.getElementById('productImage');
    const thumbnailPreview = document.getElementById('thumbnailPreview');
    productImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function() {
                const thumbnail = document.createElement('img');
                thumbnail.src = reader.result;
                thumbnailPreview.innerHTML = '';
                thumbnailPreview.appendChild(thumbnail);
            };
            reader.readAsDataURL(file);
        } else {
            thumbnailPreview.innerHTML = 'Invalid file format';
        }
    });

    // Handle form submittion, adding a new category
    const categoryForm = document.getElementById('categoryForm');
    categoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const categoryName = document.getElementById('categoryName').value;
    });

    // Handle form submittion, adding a new product
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const categoryId = document.getElementById('categoryId').value;
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').files[0];
    });
});
