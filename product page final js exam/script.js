// --- STATE MANAGEMENT ---
let products = [];
let cart = [];
let editingId = null;

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const noProductsMsg = document.getElementById('noProductsMsg');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Modal Elements
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Cart Elements
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartBadge = document.getElementById('cartBadge');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// --- INITIALIZATION ---
const initApp = () => {
    loadData();
    seedInitialProducts();
    applyFiltersAndRender();
    renderCart();
    setupEventListeners();
    checkTheme();
};

// --- DATA PERSISTENCE ---
const loadData = () => {
    const savedProducts = localStorage.getItem('imp_products');
    const savedCart = localStorage.getItem('imp_cart');
    if (savedProducts) products = JSON.parse(savedProducts);
    if (savedCart) cart = JSON.parse(savedCart);
};

const saveData = () => {
    localStorage.setItem('imp_products', JSON.stringify(products));
    localStorage.setItem('imp_cart', JSON.stringify(cart));
};

const seedInitialProducts = () => {
    if (products.length === 0) {
        products = [
            { id: generateId(), name: "Professional Laptop", desc: "16GB RAM, 512GB SSD, Fast Processor.", price: 45000, discount: 10, img: "https://placehold.co/400x300?text=Laptop" },
            { id: generateId(), name: "Wireless Mouse", desc: "Ergonomic design, long battery life.", price: 800, discount: 5, img: "https://placehold.co/400x300?text=Mouse" },
            { id: generateId(), name: "Mechanical Keyboard", desc: "Blue switches, RGB backlighting.", price: 2500, discount: 0, img: "https://placehold.co/400x300?text=Keyboard" },
            { id: generateId(), name: "HD Monitor 24-inch", desc: "1080p resolution, 75Hz refresh rate.", price: 9000, discount: 15, img: "https://placehold.co/400x300?text=Monitor" }
        ];
        saveData();
    }
};

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// --- RENDERING PRODUCTS ---
const applyFiltersAndRender = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    // 1. Filter
    let filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));

    // 2. Sort (without mutating original array)
    let displayProducts = [...filteredProducts];
    if (sortValue === 'low-high') {
        displayProducts.sort((a, b) => getFinalPrice(a.price, a.discount) - getFinalPrice(b.price, b.discount));
    } else if (sortValue === 'high-low') {
        displayProducts.sort((a, b) => getFinalPrice(b.price, b.discount) - getFinalPrice(a.price, a.discount));
    }

    renderProducts(displayProducts);
};

const renderProducts = (productsToRender) => {
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        noProductsMsg.classList.remove('hidden');
        return;
    }
    
    noProductsMsg.classList.add('hidden');

    productsToRender.forEach(product => {
        const finalPrice = getFinalPrice(product.price, product.discount);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
            <img src="${product.img}" alt="${product.name}" class="card-img" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OU__ZB7qJcLaN_8besV-lerqxLJ7DWmx5A&s'">
            <h3 class="card-title" title="${product.name}">${product.name}</h3>
            <p class="card-desc">${product.desc}</p>
            <div class="card-price-container">
                <span class="card-price">₹${finalPrice.toLocaleString('en-IN')}</span>
                ${product.discount > 0 ? `<span class="card-old-price">₹${product.price.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                <button class="btn btn-outline edit-btn" data-id="${product.id}">Edit</button>
                <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
};

const getFinalPrice = (price, discount) => {
    const d = parseFloat(discount) || 0;
    return Math.round(price - (price * (d / 100)));
};

// --- CRUD OPERATIONS ---
const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const img = document.getElementById('productImg').value.trim();
    const name = document.getElementById('productName').value.trim();
    const desc = document.getElementById('productDesc').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const discount = document.getElementById('productDiscount').value ? parseFloat(document.getElementById('productDiscount').value) : 0;

    if (editingId) {
        const index = products.findIndex(p => p.id === editingId);
        products[index] = { ...products[index], img, name, desc, price, discount };
        showToast("Product updated successfully.");
    } else {
        products.unshift({ id: generateId(), img, name, desc, price, discount });
        showToast("Product added successfully.");
    }

    saveData();
    applyFiltersAndRender();
    closeModal();
};

const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== id);
        cart = cart.filter(item => item.id !== id); // Remove from cart too
        saveData();
        applyFiltersAndRender();
        renderCart();
        showToast("Product deleted.");
    }
};

const openEditModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingId = id;
    modalTitle.textContent = "Edit Product";
    document.getElementById('productImg').value = product.img;
    document.getElementById('productName').value = product.name;
    document.getElementById('productDesc').value = product.desc;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDiscount').value = product.discount;

    clearErrors();
    productModal.classList.add('active');
};

// --- CART OPERATIONS ---
const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveData();
    renderCart();
    showToast("Added to cart.");
};

const updateCartQuantity = (id, change) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveData();
        renderCart();
    }
};

const removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveData();
    renderCart();
};

const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:#878787;">Your cart is empty.</p>`;
    } else {
        cart.forEach(item => {
            const finalPrice = getFinalPrice(item.price, item.discount);
            totalItems += item.qty;
            totalPrice += (finalPrice * item.qty);

            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${finalPrice.toLocaleString('en-IN')}</div>
                    <div class="cart-qty-controls">
                        <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
    }

    cartBadge.textContent = totalItems;
    cartTotalAmount.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
};

const handlePlaceOrder = () => {
    if (cart.length === 0) {
        showToast("Cart is empty.");
        return;
    }
    cart = [];
    saveData();
    renderCart();
    toggleCart();
    showToast("Order Placed Successfully!");
};

// --- VALIDATION ---
const validateForm = () => {
    clearErrors();
    let isValid = true;

    const img = document.getElementById('productImg');
    const name = document.getElementById('productName');
    const desc = document.getElementById('productDesc');
    const price = document.getElementById('productPrice');
    const discount = document.getElementById('productDiscount');

    if (!img.value.trim() || !img.value.startsWith('http')) {
        showError(img, 'errImg'); isValid = false;
    }
    if (!name.value.trim()) {
        showError(name, 'errName'); isValid = false;
    }
    if (!desc.value.trim()) {
        showError(desc, 'errDesc'); isValid = false;
    }
    if (!price.value || parseFloat(price.value) <= 0) {
        showError(price, 'errPrice'); isValid = false;
    }
    if (discount.value && (parseFloat(discount.value) < 0 || parseFloat(discount.value) > 90)) {
        showError(discount, 'errDiscount'); isValid = false;
    }

    return isValid;
};

const showError = (input, errId) => {
    input.parentElement.classList.add('has-error');
};

const clearErrors = () => {
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));
};

// --- UI UTILS ---
const openModal = () => {
    editingId = null;
    modalTitle.textContent = "Add New Product";
    productForm.reset();
    clearErrors();
    productModal.classList.add('active');
};

const closeModal = () => {
    productModal.classList.remove('active');
};

const toggleCart = () => {
    cartPanel.classList.toggle('open');
    cartOverlay.classList.toggle('active');
};

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    
    document.getElementById('toastContainer').appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('imp_theme', isDark ? 'dark' : 'light');
};

const checkTheme = () => {
    if (localStorage.getItem('imp_theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
};

// --- EVENT LISTENERS ---
const setupEventListeners = () => {
    // Top Bar
    searchInput.addEventListener('input', applyFiltersAndRender);
    sortSelect.addEventListener('change', applyFiltersAndRender);
    themeToggleBtn.addEventListener('click', toggleTheme);
    document.getElementById('shopNowBtn').addEventListener('click', () => {
        searchInput.focus();
    });

    // Modals & Forms
    openAddModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    productForm.addEventListener('submit', handleProductSubmit);

    // Cart Navigation
    openCartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    placeOrderBtn.addEventListener('click', handlePlaceOrder);

    // Grid Event Delegation (Add, Edit, Delete)
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) addToCart(e.target.dataset.id);
        if (e.target.classList.contains('edit-btn')) openEditModal(e.target.dataset.id);
        if (e.target.classList.contains('delete-btn')) deleteProduct(e.target.dataset.id);
    });

    // Cart Event Delegation (+, -, Remove)
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('inc-btn')) updateCartQuantity(e.target.dataset.id, 1);
        if (e.target.classList.contains('dec-btn')) updateCartQuantity(e.target.dataset.id, -1);
        if (e.target.classList.contains('remove-btn')) removeFromCart(e.target.dataset.id);
    });
};

// --- STARTUP ---
initApp();