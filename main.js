document.addEventListener("DOMContentLoaded", function() {
    // Fetch categories when the page loads
    fetchCategories();
    
    // Fetch products data from the server and update the "On Sales" section
    fetchProductsData();
    
});
