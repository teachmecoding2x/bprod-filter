document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");
    const productSelect = document.getElementById("product");
    const priceRange = document.getElementById("price");
    const priceDisplay = document.getElementById("price-display");
    const productList = document.getElementById("product-list");
    const applyFiltersBtn = document.getElementById("apply-filters");

    // Comprehensive Product Data
    const productsData = [
        // Adult Products
        { name: "Basic Vibrator", category: "adult-products", subcategory: "sex-toys", product: "vibrator", price: 30, rating: 4 },
        { name: "Water-Based Lube", category: "adult-products", subcategory: "lubes", product: "lube", price: 20, rating: 5 },

        // Fashion
        { name: "Basic T-Shirt", category: "fashion", subcategory: "men", product: "shirt", price: 25, rating: 4 },
        { name: "Women's Jacket", category: "fashion", subcategory: "women", product: "jacket", price: 50, rating: 5 },
        { name: "Kids Shorts", category: "fashion", subcategory: "kids", product: "shorts", price: 15, rating: 4 },

        // Health & Wellness
        { name: "Yoga Mat", category: "health-wellness", subcategory: "fitness", product: "mat", price: 30, rating: 5 },

        // Home & Garden
        { name: "Blender", category: "home-garden", subcategory: "kitchen", product: "blender", price: 50, rating: 4 },
        { name: "Outdoor Chair", category: "home-garden", subcategory: "outdoor", product: "chair", price: 100, rating: 3 },

        // Beauty
        { name: "Lipstick", category: "beauty", subcategory: "makeup", product: "lipstick", price: 15, rating: 5 },
        { name: "Shampoo", category: "beauty", subcategory: "haircare", product: "shampoo", price: 10, rating: 4 },

        // Electronics
        { name: "Smartphone", category: "electronics", subcategory: "smartphones", product: "smartphone", price: 499, rating: 4 },
        { name: "Laptop", category: "electronics", subcategory: "laptops", product: "laptop", price: 899, rating: 5 },
        { name: "Wireless Mouse", category: "electronics", subcategory: "accessories", product: "mouse", price: 29, rating: 3 },
        { name: "Bluetooth Headphones", category: "electronics", subcategory: "accessories", product: "headphones", price: 89, rating: 4 }
    ];

    const subcategories = {
        "adult-products": ["sex-toys", "lubes"],
        "fashion": ["men", "women", "kids"],
        "health-wellness": ["fitness", "medicines", "nutrition"],
        "home-garden": ["kitchen", "furniture", "outdoor"],
        "beauty": ["makeup", "skincare", "haircare"],
        "electronics": ["smartphones", "laptops", "accessories"], // Added subcategories for electronics
    };

    const products = {
        "sex-toys": ["vibrator", "dildo"],
        "lubes": ["water-based", "silicone-based"],
        "men": ["shirt", "shorts", "jacket"],
        "women": ["dress", "jacket", "skirt"],
        "kids": ["shirt", "shorts"],
        "fitness": ["mat", "dumbbells"],
        "kitchen": ["blender", "microwave"],
        "outdoor": ["chair", "table"],
        "makeup": ["lipstick", "mascara"],
        "skincare": ["cream", "serum"],
        "haircare": ["shampoo", "conditioner"],
        "smartphones": ["smartphone"],
        "laptops": ["laptop"],
        "accessories": ["wireless-mouse", "headphones"]
    };

    categorySelect.addEventListener("change", function () {
        const category = categorySelect.value;
        const subcategoryOptions = subcategories[category] || [];
        subcategorySelect.innerHTML = `<option value="">Select Subcategory</option>`;
        subcategoryOptions.forEach(sub => {
            subcategorySelect.innerHTML += `<option value="${sub}">${sub.charAt(0).toUpperCase() + sub.slice(1)}</option>`;
        });
        subcategorySelect.disabled = subcategoryOptions.length === 0;
        productSelect.innerHTML = `<option value="">Select Product</option>`;
        productSelect.disabled = true;
    });

    subcategorySelect.addEventListener("change", function () {
        const subcategory = subcategorySelect.value;
        const productOptions = products[subcategory] || [];
        productSelect.innerHTML = `<option value="">Select Product</option>`;
        productOptions.forEach(prod => {
            productSelect.innerHTML += `<option value="${prod}">${prod.charAt(0).toUpperCase() + prod.slice(1)}</option>`;
        });
        productSelect.disabled = productOptions.length === 0;
    });

    priceRange.addEventListener("input", function () {
        priceDisplay.textContent = `$0 - $${priceRange.value}`;
    });

    applyFiltersBtn.addEventListener("click", () => {
        const filters = {
            category: categorySelect.value,
            subcategory: subcategorySelect.value,
            product: productSelect.value,
            price: parseInt(priceRange.value),
            ratings: parseInt(document.getElementById("ratings").value),
        };

        const filteredProducts = productsData.filter(product => {
            return (!filters.category || product.category === filters.category) &&
                (!filters.subcategory || product.subcategory === filters.subcategory) &&
                (!filters.product || product.product === filters.product) &&
                (!filters.price || product.price <= filters.price) &&
                (!filters.ratings || product.rating >= filters.ratings);
        });

        if (filteredProducts.length > 0) {
            productList.innerHTML = filteredProducts.map(prod => `
                <div class="product">
                    <h3>${prod.name}</h3>
                    <p>Price: $${prod.price}</p>
                    <p>Rating: ${prod.rating} stars</p>
                </div>
            `).join("");
        } else {
            productList.innerHTML = "No products found based on your filters.";
        }
    });
});
