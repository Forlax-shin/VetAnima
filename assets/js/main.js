/* ================================================================
   VETANIMATIVE - MAIN APPLICATION
   Version: 2.1.0 Production Ready
   License: CodeCanyon Standard License
   
   Complete Veterinary & Pet Shop Management System
   Author: Your Name
   Website: https://vetanimative.com
   ================================================================ */

const VetApp = (function() {
    // ==================== CONFIGURATION ====================
    const CONFIG = {
        apiUrl: 'https://your-api.com/api',
        currency: 'USD',
        taxRate: 0.1,
        shippingFee: 15,
        dateFormat: 'YYYY-MM-DD',
        siteName: 'VetAnimative',
        clinicAddress: '123 Pet Avenue, New York, NY 10001',
        clinicPhone: '+1 234 567 890',
        clinicEmail: 'hello@vetanimative.com',
        defaultImage: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400'
    };

    // ==================== STATE MANAGEMENT ====================
    const state = {
        user: null,
        cart: [],
        orders: [],
        vendors: [],
        settings: {
            taxRate: 10,
            currency: 'USD',
            siteName: 'VetAnimative',
            clinicAddress: '123 Pet Avenue, New York, NY 10001',
            clinicPhone: '+1 234 567 890',
            clinicEmail: 'hello@vetanimative.com'
        },
        currentPage: null,
        isLoading: false,
        
        // Sample Data - Professional Veterinary Content
        products: [
            { id: 'p1', name: 'Premium Dog Food - Salmon Recipe', category: 'food', type: 'product', price: 45.99, stock: 25, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', description: 'Grain-free salmon formula with omega-3 for healthy skin and coat. Made with real deboned salmon as the first ingredient.' },
            { id: 'p2', name: 'Cat Dental Treats', category: 'food', type: 'product', price: 12.99, stock: 50, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', description: 'Veterinarian-approved dental treats that reduce plaque and freshen breath. Contains natural chlorophyll and mint.' },
            { id: 'p3', name: 'Orthopedic Pet Bed', category: 'acc', type: 'product', price: 89.99, stock: 15, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', description: 'Memory foam orthopedic bed with washable cover. Ideal for senior pets or those with joint issues.' },
            { id: 'p4', name: 'GPS Tracker Collar', category: 'acc', type: 'product', price: 59.99, stock: 20, image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400', description: 'Real-time GPS tracking with activity monitoring. Waterproof design with 7-day battery life.' },
            { id: 'p5', name: 'Wellness Dog Food - Chicken', category: 'food', type: 'product', price: 52.99, stock: 30, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', description: 'Holistic recipe with free-range chicken, brown rice, and vegetables. Supports immune health and digestion.' },
            { id: 'p6', name: 'Interactive Puzzle Toy', category: 'acc', type: 'product', price: 24.99, stock: 40, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', description: 'Mental stimulation toy for intelligent pets. Hide treats inside for hours of entertainment.' }
        ],
        
        services: [
            { id: 's1', name: 'Professional Grooming', category: 'grooming', type: 'service', price: 55.00, duration: '90 min', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', description: 'Full-service grooming including bath, blow-dry, nail trim, ear cleaning, and sanitary trim.' },
            { id: 's2', name: 'Dental Cleaning', category: 'health', type: 'service', price: 199.00, duration: '60 min', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400', description: 'Professional dental scaling, polishing, and oral examination under anesthesia.' },
            { id: 's3', name: 'Spa Package', category: 'grooming', type: 'service', price: 89.00, duration: '120 min', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', description: 'Luxury spa treatment including aromatherapy bath, blueberry facial, pawdicure, and teeth brushing.' },
            { id: 's4', name: 'Surgery Consultation', category: 'health', type: 'service', price: 120.00, duration: '45 min', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', description: 'Pre-surgical consultation with our board-certified surgeon. Includes blood work review and anesthesia plan.' }
        ],
        
        doctors: [
            { id: 'd1', name: 'Dr. Sarah Mitchell', specialty: 'Small Animal Medicine', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', bio: 'Dr. Mitchell has 15+ years of experience in small animal medicine. She specializes in internal medicine and geriatric care.', education: 'DVM, Cornell University', experience: '15 years', availability: 'Mon-Fri' },
            { id: 'd2', name: 'Dr. James Chen', specialty: 'Veterinary Surgery', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', bio: 'Board-certified surgeon with expertise in orthopedics and soft tissue surgery. Dr. Chen has performed over 2,000 successful surgeries.', education: 'DVM, UC Davis', experience: '12 years', availability: 'Tue-Thu' },
            { id: 'd3', name: 'Dr. Emily Watson', specialty: 'Exotic Pets', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400', bio: 'Specialist in exotic animal medicine including birds, reptiles, and small mammals. Dr. Watson is a certified wildlife rehabilitator.', education: 'DVM, University of Florida', experience: '8 years', availability: 'Wed-Sat' },
            { id: 'd4', name: 'Dr. Michael Rivera', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400', bio: 'Diplomate of the American College of Veterinary Internal Medicine (Cardiology). Provides advanced cardiac diagnostics and treatment.', education: 'DVM, Ohio State University', experience: '10 years', availability: 'Mon-Thu' },
            { id: 'd5', name: 'Dr. Lisa Park', specialty: 'Dermatology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', bio: 'Leading veterinary dermatologist specializing in allergic skin diseases, infections, and autoimmune disorders.', education: 'DVM, University of Pennsylvania', experience: '9 years', availability: 'Tue-Fri' },
            { id: 'd6', name: 'Dr. Robert Taylor', specialty: 'Emergency Medicine', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400', bio: 'Emergency and critical care specialist available 24/7. Expert in trauma management and intensive care.', education: 'DVM, Texas A&M University', experience: '14 years', availability: 'Weekends' }
        ],
        
        blog: [
            { id: 'b1', title: 'Seasonal Pet Care: Spring Allergies', category: 'Health Care', date: '2026-02-15', image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400', excerpt: 'Learn how to identify and manage seasonal allergies in your pets. Tips from our veterinary dermatologists.', content: 'Spring brings beautiful weather but also allergens that can affect your pets. Common signs include excessive scratching, licking paws, and watery eyes...' },
            { id: 'b2', title: 'Nutrition Guide for Senior Dogs', category: 'Nutrition', date: '2026-02-10', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', excerpt: 'Essential dietary recommendations for aging canine companions. Support joint health and maintain ideal weight.', content: 'As dogs age, their nutritional needs change significantly. Senior dogs often benefit from diets with adjusted protein levels, added joint supplements, and fewer calories...' },
            { id: 'b3', title: 'Dental Health: Beyond Fresh Breath', category: 'Health Care', date: '2026-02-05', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400', excerpt: 'Why dental care is crucial for your pet\'s overall health. Learn about professional cleanings and home care.', content: 'Periodontal disease affects over 80% of dogs by age three. It\'s not just about bad breath - dental disease can lead to heart, liver, and kidney problems...' },
            { id: 'b4', title: '5 Daily Habits for a Happy Cat', category: 'Daily Tips', date: '2026-01-28', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', excerpt: 'Simple routines that make a big difference in your feline friend\'s wellbeing.', content: 'Cats thrive on routine. Implementing these five daily habits - playtime, fresh water, litter box maintenance, grooming, and quality time - can dramatically improve your cat\'s quality of life...' },
            { id: 'b5', title: 'Understanding Pet Food Labels', category: 'Nutrition', date: '2026-01-20', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', excerpt: 'Decode ingredient lists and make informed choices for your pet\'s nutrition.', content: 'Pet food labels can be confusing. Learn what terms like "by-products", "meal", and "holistic" really mean, and how to choose the best food for your pet\'s life stage...' },
            { id: 'b6', title: 'Traveling with Pets: Safety First', category: 'Daily Tips', date: '2026-01-15', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', excerpt: 'Essential tips for stress-free and safe travel with your furry companions.', content: 'Whether by car or plane, traveling with pets requires preparation. From proper restraint systems to travel kits and motion sickness management, we cover everything you need...' }
        ],
        
        gallery: [
            { id: 'g1', type: 'official', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', title: 'Surgery Suite', description: 'State-of-the-art surgical facility' },
            { id: 'g2', type: 'official', image: 'https://plus.unsplash.com/premium_photo-1675808577247-2281dc17147a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Examination Room', description: 'Comfortable exam spaces for pets and owners' },
            { id: 'g3', type: 'official', image: 'https://images.unsplash.com/photo-1576602975754-efdf313b9342?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Pharmacy', description: 'Fully stocked veterinary pharmacy' },
            { id: 'g4', type: 'official', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', title: 'Grooming Station', description: 'Professional grooming equipment' },
            { id: 'g5', type: 'visitor', image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400', title: 'Happy Max', description: 'Max after his wellness visit' },
            { id: 'g6', type: 'visitor', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', title: 'Luna\'s Grooming Day', description: 'Luna looking fabulous after her spa treatment' },
            { id: 'g7', type: 'visitor', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', title: 'Buddy Recovery', description: 'Buddy resting after dental surgery' },
            { id: 'g8', type: 'visitor', image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400', title: 'Playtime', description: 'Oliver enjoying the play area' }
        ],
        
        vendors: [
            { id: 'v1', name: 'Premium Pet Supplies Co.', contact: 'John Smith', email: 'john@premiumpets.com', phone: '+1 212 555 0123', products: ['Food', 'Toys'] },
            { id: 'v2', name: 'Healthy Paws Distribution', contact: 'Maria Garcia', email: 'maria@healthypaws.com', phone: '+1 310 555 0456', products: ['Supplements', 'Dental'] },
            { id: 'v3', name: 'PetMed Pharmaceuticals', contact: 'Dr. Robert Chen', email: 'rchen@petmed.com', phone: '+1 415 555 0789', products: ['Medications', 'Prescriptions'] }
        ],
        
        users: [
            { id: 'u1', name: 'Owner', username: 'owner', role: 'admin', email: 'owner@vetanimative.com' },
            { id: 'u2', name: 'Admin User', username: 'admin', role: 'admin', email: 'admin@vetanimative.com' },
            { id: 'u3', name: 'Sarah Johnson', username: 'sarahj', role: 'accountant', email: 'sarah@vetanimative.com' },
            { id: 'u4', name: 'Dr. Sarah Mitchell', username: 'drmitchell', role: 'doctor', email: 'drmitchell@vetanimative.com' }
        ]
    };

    // ==================== DOM CACHE ====================
    const dom = {
        cartBadges: () => document.querySelectorAll('.bag-badge'),
        loginSection: () => document.getElementById('login-section'),
        dashboard: () => document.getElementById('dashboard'),
        contentArea: () => document.getElementById('content-area'),
        userName: () => document.getElementById('current-user-name'),
        userRole: () => document.getElementById('current-user-role'),
        logoutBtn: () => document.getElementById('logout-btn'),
        themeToggle: () => document.querySelector('.theme-toggle'),
        loginForm: () => document.getElementById('form-login'),
        signupForm: () => document.getElementById('form-signup'),
        forgotForm: () => document.getElementById('form-forgot')
    };

    // ==================== INITIALIZATION ====================
    function init() {
        loadFromStorage();
        setupEventListeners();
        renderCartCount();
        determinePage();
        renderCurrentPage();
        
        if (isAdminPage()) {
            handleAdminInit();
        }
    }

    function loadFromStorage() {
        try {
            const savedUser = localStorage.getItem('vet_user');
            if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
                state.user = JSON.parse(savedUser);
            }
            
            const savedCart = localStorage.getItem('vet_cart');
            if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
                state.cart = JSON.parse(savedCart) || [];
            }
            
            const darkMode = localStorage.getItem('vet_darkmode') === 'true';
            if (darkMode) document.body.classList.add('dark-mode');
            
            const settings = localStorage.getItem('vet_settings');
            if (settings && settings !== 'undefined' && settings !== 'null') {
                state.settings = { ...state.settings, ...JSON.parse(settings) };
            }
        } catch (e) {
            console.warn('Storage load failed:', e);
        }
    }

    function setupEventListeners() {
        // Global modal close on overlay click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.style.display = 'none';
            }
        });

        // Theme toggle
        const themeToggle = dom.themeToggle();
        if (themeToggle) {
            themeToggle.removeEventListener('click', toggleDarkModeHandler);
            themeToggle.addEventListener('click', toggleDarkModeHandler);
        }

        // Setup auth forms if on admin page
        if (isAdminPage()) {
            setupAuthForms();
        }

        // Logout button
        setupLogoutButton();
    }

    function toggleDarkModeHandler(e) {
        e.preventDefault();
        toggleDarkMode();
    }

    function setupLogoutButton() {
        const logoutBtn = dom.logoutBtn();
        if (logoutBtn) {
            // Remove any existing listeners
            const newLogoutBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode?.replaceChild(newLogoutBtn, logoutBtn);
            
            newLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                logout();
            });
        }
    }

    function determinePage() {
        const path = window.location.pathname;
        
        if (path.includes('admin.html')) state.currentPage = 'admin';
        else if (path.includes('bag.html')) state.currentPage = 'bag';
        else if (path.includes('shop-services.html')) state.currentPage = 'shop';
        else if (path.includes('team.html')) state.currentPage = 'team';
        else if (path.includes('blog.html')) state.currentPage = 'blog';
        else if (path.includes('gallery.html')) state.currentPage = 'gallery';
        else state.currentPage = 'home';
    }

    function isAdminPage() {
        return state.currentPage === 'admin';
    }

    function renderCurrentPage() {
        switch(state.currentPage) {
            case 'shop':
                renderServicesPage();
                renderShopPage();
                break;
            case 'team':
                renderDoctorsPage();
                break;
            case 'blog':
                renderBlogPage();
                break;
            case 'gallery':
                renderGalleryPage();
                break;
            case 'bag':
                renderCartPage();
                break;
            case 'home':
                renderHomePage();
                break;
        }
    }

    // ==================== RENDERING FUNCTIONS ====================
    function renderHomePage() {
        const teamGrid = document.getElementById('home-team-grid');
        if (teamGrid) {
            teamGrid.innerHTML = state.doctors.slice(0, 3).map(doctor => `
                <div class="team-card" onclick="VetApp.openDoctorModal('${doctor.id}')">
                    <img src="${doctor.image}" alt="${doctor.name}" loading="lazy">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialty}</p>
                    <span class="experience-badge">${doctor.experience}</span>
                </div>
            `).join('');
        }

        const shopGrid = document.getElementById('home-shop-grid');
        if (shopGrid) {
            const items = [...state.products.slice(0, 2), ...state.services.slice(0, 1)];
            shopGrid.innerHTML = items.map(item => `
                <div class="product-card" onclick="VetApp.showProductDetail('${item.id}', '${item.type}')">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <h4>${item.name}</h4>
                    <p class="price">${formatCurrency(item.price)}</p>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); VetApp.addToCart('${item.id}')">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            `).join('');
        }
    }

    function renderServicesPage() {
        const serviceGrid = document.getElementById('service-grid');
        if (serviceGrid) {
            serviceGrid.innerHTML = state.services.map(service => `
                <div class="product-card service-card" onclick="VetApp.showProductDetail('${service.id}', 'service')">
                    <img src="${service.image}" alt="${service.name}" loading="lazy">
                    <div class="badge">${service.duration}</div>
                    <h4>${service.name}</h4>
                    <p class="description">${service.description.substring(0, 60)}...</p>
                    <p class="price">${formatCurrency(service.price)}</p>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); VetApp.addToCart('${service.id}')">
                        <i class="fas fa-calendar-plus"></i> Book
                    </button>
                </div>
            `).join('');
        }
    }

    function renderShopPage() {
        const shopGrid = document.getElementById('shop-grid');
        if (shopGrid) {
            shopGrid.innerHTML = state.products.map(product => `
                <div class="product-card" onclick="VetApp.showProductDetail('${product.id}', 'product')">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.stock < 10 ? '<div class="badge warning">Low Stock</div>' : ''}
                    <h4>${product.name}</h4>
                    <p class="price">${formatCurrency(product.price)}</p>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); VetApp.addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            `).join('');
        }
    }

    function renderDoctorsPage() {
        const teamGrid = document.getElementById('team-grid');
        if (teamGrid) {
            teamGrid.innerHTML = state.doctors.map(doctor => `
                <div class="team-card" onclick="VetApp.openDoctorModal('${doctor.id}')">
                    <img src="${doctor.image}" alt="${doctor.name}" loading="lazy">
                    <h3>${doctor.name}</h3>
                    <p class="specialty">${doctor.specialty}</p>
                    <p class="availability"><i class="fas fa-calendar-check"></i> ${doctor.availability}</p>
                    <button class="btn btn-outline btn-sm">View Profile</button>
                </div>
            `).join('');
        }
    }

    function renderBlogPage() {
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = state.blog.map(post => `
                <div class="blog-card" onclick="VetApp.openBlogModal('${post.id}')">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="blog-content">
                        <span class="blog-category">${post.category}</span>
                        <h3>${post.title}</h3>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <div class="blog-meta">
                            <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                            <button class="btn-link">Read More →</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    function renderGalleryPage() {
        const officialGrid = document.getElementById('official-grid');
        const visitorGrid = document.getElementById('visitor-grid');
        
        if (officialGrid) {
            officialGrid.innerHTML = state.gallery
                .filter(item => item.type === 'official')
                .map(item => `
                    <div class="gallery-item" onclick="VetApp.openGalleryModal('${item.id}')">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
        }
        
        if (visitorGrid) {
            visitorGrid.innerHTML = state.gallery
                .filter(item => item.type === 'visitor')
                .map(item => `
                    <div class="gallery-item" onclick="VetApp.openGalleryModal('${item.id}')">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
        }
    }

    function renderCartPage() {
        const productList = document.getElementById('product-list');
        const serviceList = document.getElementById('service-list');
        
        if (!productList && !serviceList) return;

        if (state.cart.length === 0) {
            const emptyHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #ccc;"></i>
                    <p>Your bag is empty</p>
                    <a href="shop-services.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
            if (productList) productList.innerHTML = emptyHTML;
            if (serviceList) serviceList.innerHTML = emptyHTML;
            
            document.getElementById('subtotal').textContent = formatCurrency(0);
            document.getElementById('total-price').textContent = formatCurrency(0);
            return;
        }

        const products = state.cart.filter(i => i.type === 'product');
        const services = state.cart.filter(i => i.type === 'service');
        
        let subtotal = 0;

        if (serviceList) {
            if (services.length > 0) {
                serviceList.innerHTML = '<h3>Services</h3>' + services.map(item => renderCartItem(item)).join('');
                subtotal += services.reduce((s, i) => s + (i.price * i.quantity), 0);
            } else {
                serviceList.innerHTML = '';
            }
        }

        if (productList) {
            if (products.length > 0) {
                productList.innerHTML = '<h3>Products</h3>' + products.map(item => renderCartItem(item)).join('');
                subtotal += products.reduce((s, i) => s + (i.price * i.quantity), 0);
            } else {
                productList.innerHTML = '';
            }
        }

        const hasProducts = products.length > 0;
        const shippingForm = document.getElementById('shipping-form');
        const serviceForm = document.getElementById('service-form');
        
        if (shippingForm) shippingForm.classList.toggle('hidden', !hasProducts);
        if (serviceForm) serviceForm.classList.toggle('hidden', services.length === 0);

        document.getElementById('subtotal').textContent = formatCurrency(subtotal);
        updateTotalPrice();
    }

    function renderCartItem(item) {
        return `
            <div class="item-row">
                <div class="item-info">
                    <img src="${item.image || CONFIG.defaultImage}" alt="${item.name}" loading="lazy">
                    <div>
                        <h4>${item.name}</h4>
                        <p>${formatCurrency(item.price)} × ${item.quantity}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-sm" onclick="VetApp.updateCartItem('${item.id}', -1)">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="btn btn-sm" onclick="VetApp.updateCartItem('${item.id}', 1)">+</button>
                    <button class="btn-icon" onclick="VetApp.removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // ==================== FILTER FUNCTIONS ====================
    function filterCatalog(type, category, button) {
        const parent = button.closest('.filter-group');
        if (parent) {
            parent.querySelectorAll('.tab-btn, .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }

        if (type === 'blog') {
            const filtered = category === 'all' 
                ? state.blog 
                : state.blog.filter(post => post.category === category);
            
            const grid = document.getElementById('blog-grid');
            if (grid) {
                grid.innerHTML = filtered.map(post => `
                    <div class="blog-card" onclick="VetApp.openBlogModal('${post.id}')">
                        <img src="${post.image}" alt="${post.title}" loading="lazy">
                        <div class="blog-content">
                            <span class="blog-category">${post.category}</span>
                            <h3>${post.title}</h3>
                            <p class="blog-excerpt">${post.excerpt}</p>
                            <div class="blog-meta">
                                <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                                <button class="btn-link">Read More →</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        if (type === 'service') {
            const filtered = category === 'all' 
                ? state.services 
                : state.services.filter(service => service.category === category);
            
            const grid = document.getElementById('service-grid');
            if (grid) {
                grid.innerHTML = filtered.map(service => `
                    <div class="product-card service-card" onclick="VetApp.showProductDetail('${service.id}', 'service')">
                        <img src="${service.image}" alt="${service.name}" loading="lazy">
                        <div class="badge">${service.duration}</div>
                        <h4>${service.name}</h4>
                        <p class="description">${service.description.substring(0, 60)}...</p>
                        <p class="price">${formatCurrency(service.price)}</p>
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); VetApp.addToCart('${service.id}')">
                            <i class="fas fa-calendar-plus"></i> Book
                        </button>
                    </div>
                `).join('');
            }
        }
        
        if (type === 'shop') {
            const filtered = category === 'all' 
                ? state.products 
                : state.products.filter(product => product.category === category);
            
            const grid = document.getElementById('shop-grid');
            if (grid) {
                grid.innerHTML = filtered.map(product => `
                    <div class="product-card" onclick="VetApp.showProductDetail('${product.id}', 'product')">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${product.stock < 10 ? '<div class="badge warning">Low Stock</div>' : ''}
                        <h4>${product.name}</h4>
                        <p class="price">${formatCurrency(product.price)}</p>
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); VetApp.addToCart('${product.id}')">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                `).join('');
            }
        }
    }

    function switchGallery(type, button) {
        const parent = button.closest('.filter-group');
        if (parent) {
            parent.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }

        const official = document.getElementById('official-gallery');
        const visitor = document.getElementById('visitor-gallery');
        
        if (official && visitor) {
            if (type === 'official') {
                official.classList.remove('hidden');
                visitor.classList.add('hidden');
            } else {
                official.classList.add('hidden');
                visitor.classList.remove('hidden');
            }
        }
    }

    // ==================== MODAL FUNCTIONS ====================
    function openDoctorModal(id) {
        const doctor = state.doctors.find(d => d.id === id);
        if (!doctor) return;

        const modal = document.getElementById('doctorModal');
        const body = document.getElementById('modalBody');
        
        if (modal && body) {
            body.innerHTML = `
                <div class="modal-doctor-image">
                    <img src="${doctor.image}" alt="${doctor.name}">
                </div>
                <div class="modal-doctor-info">
                    <h2>${doctor.name}</h2>
                    <p class="doctor-specialty">${doctor.specialty}</p>
                    <p class="doctor-availability"><i class="fas fa-calendar-alt"></i> Available: ${doctor.availability}</p>
                    <div class="doctor-details">
                        <h3>Biography</h3>
                        <p>${doctor.bio}</p>
                        <h3>Education</h3>
                        <p>${doctor.education}</p>
                        <h3>Experience</h3>
                        <p>${doctor.experience}</p>
                    </div>
                    <button class="btn btn-primary" onclick="VetApp.closeModal('doctorModal')">Close</button>
                </div>
            `;
            modal.style.display = 'flex';
        }
    }

    function openBlogModal(id) {
        const post = state.blog.find(b => b.id === id);
        if (!post) return;

        const modal = document.getElementById('blogModal');
        const content = document.getElementById('blogModalContent');
        
        if (modal && content) {
            content.innerHTML = `
                <div class="blog-modal-header">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-modal-body">
                    <span class="blog-category">${post.category}</span>
                    <h2>${post.title}</h2>
                    <p class="blog-date"><i class="fas fa-calendar"></i> ${formatDate(post.date)}</p>
                    <div class="blog-content-full">
                        <p>${post.content}</p>
                    </div>
                    <button class="btn btn-primary" onclick="VetApp.closeModal('blogModal')">Close</button>
                </div>
            `;
            modal.style.display = 'flex';
        }
    }

    function openGalleryModal(id) {
        const item = state.gallery.find(g => g.id === id);
        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'galleryModal';
        modal.innerHTML = `
            <div class="modal-content gallery-modal">
                <button class="close-modal" onclick="VetApp.closeModal('galleryModal')">&times;</button>
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    function showProductDetail(id, type) {
        const item = type === 'product' 
            ? state.products.find(p => p.id === id)
            : state.services.find(s => s.id === id);
            
        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'productModal';
        modal.innerHTML = `
            <div class="modal-content product-detail-modal">
                <button class="close-modal" onclick="VetApp.closeModal('productModal')">&times;</button>
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="modal-info">
                        <h2>${item.name}</h2>
                        <p class="price">${formatCurrency(item.price)}</p>
                        <p class="description">${item.description}</p>
                        ${item.stock ? `<p class="stock">In Stock: ${item.stock}</p>` : ''}
                        ${item.duration ? `<p class="duration"><i class="fas fa-clock"></i> ${item.duration}</p>` : ''}
                        <button class="btn btn-primary" onclick="VetApp.addToCart('${item.id}')">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline" onclick="VetApp.closeModal('productModal')">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            if (id === 'galleryModal' || id === 'productModal' || id === 'admin-modal') {
                modal.remove();
            }
        }
    }

    function closeBlogDetail() {
        closeModal('blogModal');
    }

    // ==================== CART FUNCTIONS ====================
    function addToCart(productId) {
        const item = state.products.find(p => p.id === productId) || state.services.find(s => s.id === productId);
        if (!item) return;

        const existing = state.cart.find(i => i.id === productId);
        
        if (existing) {
            existing.quantity++;
        } else {
            state.cart.push({ ...item, quantity: 1 });
        }

        saveCart();
        showNotification(`${item.name} added to cart`, 'success');
    }

    function updateCartItem(id, change) {
        const item = state.cart.find(i => i.id === id);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            state.cart = state.cart.filter(i => i.id !== id);
        }

        saveCart();
        renderCartCount();
        
        if (state.currentPage === 'bag') {
            renderCartPage();
        }
    }

    function removeFromCart(id) {
        const item = state.cart.find(i => i.id === id);
        state.cart = state.cart.filter(i => i.id !== id);
        saveCart();
        renderCartCount();
        showNotification(item ? `${item.name} removed` : 'Item removed', 'info');
        
        if (state.currentPage === 'bag') {
            renderCartPage();
        }
    }

    function saveCart() {
        localStorage.setItem('vet_cart', JSON.stringify(state.cart));
        renderCartCount();
    }

    function renderCartCount() {
        const count = state.cart.reduce((sum, i) => sum + i.quantity, 0);
        dom.cartBadges().forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    function calculateSubtotal() {
        return state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    }

    function shouldChargeShipping() {
        if (state.currentPage !== 'bag') return false;
        const hasProducts = state.cart.some(i => i.type === 'product');
        const deliveryMethod = document.getElementById('deliveryMethod')?.value;
        return hasProducts && deliveryMethod === 'delivery';
    }

    function updateTotalPrice() {
        const subtotal = calculateSubtotal();
        const shipping = shouldChargeShipping() ? CONFIG.shippingFee : 0;
        const tax = subtotal * (state.settings.taxRate / 100);
        const total = subtotal + shipping + tax;
        
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total-price');
        const shippingRow = document.getElementById('shipping-fee-row');
        const shippingFeeEl = document.getElementById('shipping-fee');
        
        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (totalEl) totalEl.textContent = formatCurrency(total);
        if (shippingRow) {
            shippingRow.style.display = shipping > 0 ? 'flex' : 'none';
            if (shippingFeeEl) shippingFeeEl.textContent = formatCurrency(shipping);
        }
    }

    function toggleDelivery() {
        updateTotalPrice();
    }

    // ==================== CHECKOUT FUNCTIONS ====================
    function validateAndPay() {
        if (state.cart.length === 0) {
            showNotification('Your cart is empty', 'warning');
            return;
        }

        const hasProducts = state.cart.some(i => i.type === 'product');
        const hasServices = state.cart.some(i => i.type === 'service');

        if (hasServices) {
            const petName = document.getElementById('petName')?.value;
            const appDate = document.getElementById('appDate')?.value;
            
            if (!petName || !appDate) {
                showNotification('Please fill in pet name and appointment date for services', 'warning');
                return;
            }
        }

        if (hasProducts) {
            const deliveryMethod = document.getElementById('deliveryMethod')?.value;
            const address = document.getElementById('addressInput')?.value;
            
            if (deliveryMethod === 'delivery' && !address) {
                showNotification('Please enter your delivery address', 'warning');
                return;
            }
        }

        const paymentModal = document.getElementById('paymentModal');
        const payAmount = document.getElementById('payAmount');
        
        if (paymentModal && payAmount) {
            payAmount.textContent = formatCurrency(calculateSubtotal() + (shouldChargeShipping() ? CONFIG.shippingFee : 0));
            paymentModal.style.display = 'flex';
        }
    }

    function confirmSuccess() {
        if (state.cart.length === 0) {
            showNotification('Your cart is empty', 'warning');
            return;
        }

        const order = {
            id: 'ORD' + Date.now(),
            items: [...state.cart],
            subtotal: calculateSubtotal(),
            shipping: shouldChargeShipping() ? CONFIG.shippingFee : 0,
            tax: calculateSubtotal() * (state.settings.taxRate / 100),
            total: calculateSubtotal() + (shouldChargeShipping() ? CONFIG.shippingFee : 0) + (calculateSubtotal() * (state.settings.taxRate / 100)),
            date: new Date().toISOString(),
            status: 'confirmed',
            customer: 'Walk-in'
        };

        state.orders.push(order);
        
        state.cart = [];
        saveCart();

        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.style.display = 'none';
        
        showNotification('Payment successful! Order confirmed.', 'success');
        
        if (state.currentPage === 'bag') {
            renderCartPage();
        }
        
        setTimeout(() => {
            if (state.currentPage === 'bag') {
                window.location.href = 'index.html';
            }
        }, 2000);
    }

    // ==================== REVIEW FUNCTIONS ====================
    function handleReviewSubmit(event) {
        event.preventDefault();
        
        const name = document.getElementById('reviewerName')?.value;
        const text = document.getElementById('reviewText')?.value;
        const photo = document.getElementById('reviewPhoto')?.files[0];

        if (!name || !text) {
            showNotification('Please fill in all required fields', 'warning');
            return;
        }

        if (photo) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(photo.type)) {
                showNotification('Please upload a valid image file (JPG, PNG, GIF, WEBP)', 'warning');
                return;
            }

            if (photo.size > 5 * 1024 * 1024) {
                showNotification('Image size should be less than 5MB', 'warning');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                state.gallery.push({
                    id: 'g' + Date.now(),
                    type: 'visitor',
                    image: e.target.result,
                    title: `${name}'s Pet`,
                    description: text.substring(0, 50) + '...'
                });
                showNotification('Review submitted! Thank you.', 'success');
                event.target.reset();
                document.getElementById('fileNameDisplay').textContent = 'Add Pet Photo (Optional)';
            };
            reader.readAsDataURL(photo);
        } else {
            showNotification('Review submitted! Thank you.', 'success');
            event.target.reset();
        }
    }

    function previewFileName(input) {
        const fileName = document.getElementById('fileNameDisplay');
        if (fileName && input.files[0]) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(input.files[0].type)) {
                showNotification('Please select a valid image file (JPG, PNG, GIF, WEBP)', 'warning');
                input.value = '';
                fileName.textContent = 'Add Pet Photo (Optional)';
                return;
            }

            if (input.files[0].size > 5 * 1024 * 1024) {
                showNotification('Image size should be less than 5MB', 'warning');
                input.value = '';
                fileName.textContent = 'Add Pet Photo (Optional)';
                return;
            }

            fileName.textContent = input.files[0].name;
        }
    }

    // ==================== ADMIN FUNCTIONS ====================
    function handleAdminInit() {
        const loginSection = document.getElementById('login-section');
        const dashboard = document.getElementById('dashboard');
        
        if (!state.user) {
            if (loginSection) loginSection.classList.remove('hidden');
            if (dashboard) dashboard.classList.add('hidden');
            setupAuthForms();
        } else {
            if (loginSection) loginSection.classList.add('hidden');
            if (dashboard) dashboard.classList.remove('hidden');
            updateUserProfile();
            setupAdminNavigation();
            loadAdminTab('dashboard');
        }
    }

    function setupAuthForms() {
        // Login form
        const loginForm = dom.loginForm();
        if (loginForm) {
            loginForm.removeEventListener('submit', loginHandler);
            loginForm.addEventListener('submit', loginHandler);
        }

        // Signup form
        const signupForm = dom.signupForm();
        if (signupForm) {
            signupForm.removeEventListener('submit', signupHandler);
            signupForm.addEventListener('submit', signupHandler);
        }

        // Forgot password form
        const forgotForm = dom.forgotForm();
        if (forgotForm) {
            forgotForm.removeEventListener('submit', forgotHandler);
            forgotForm.addEventListener('submit', forgotHandler);
        }
    }

    function loginHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const username = document.getElementById('login-username')?.value;
        const password = document.getElementById('login-password')?.value;
        login(username, password);
    }

    function signupHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        signup();
    }

    function forgotHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        forgotPassword();
    }

    function toggleAuth(type) {
        document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
        const form = document.getElementById(`form-${type}`);
        if (form) form.classList.remove('hidden');
    }

    function login(username, password) {
        if (!username || !password) {
            showNotification('Username and password required', 'warning');
            return;
        }

        // Find user by username (case-insensitive)
        const user = state.users.find(u => u.username.toLowerCase() === username.toLowerCase());
        
        // Simple password check - in production, use proper authentication
        if (user && password === 'password') {
            state.user = user;
            localStorage.setItem('vet_user', JSON.stringify(user));
            showNotification('Login successful', 'success');
            
            // Hide login section, show dashboard
            const loginSection = document.getElementById('login-section');
            const dashboard = document.getElementById('dashboard');
            
            if (loginSection) loginSection.classList.add('hidden');
            if (dashboard) dashboard.classList.remove('hidden');
            
            updateUserProfile();
            setupAdminNavigation();
            setupLogoutButton(); // Re-setup logout button
            loadAdminTab('dashboard');
        } else {
            showNotification('Invalid username or password. Use "owner" with password "password"', 'error');
        }
    }

    function signup() {
        const role = document.getElementById('signup-role')?.value;
        const name = document.getElementById('signup-name')?.value;
        const username = document.getElementById('signup-username')?.value;
        const password = document.getElementById('signup-password')?.value;
        const confirm = document.getElementById('signup-confirm')?.value;

        if (!name || !username || !password) {
            showNotification('All fields are required', 'warning');
            return;
        }

        if (password !== confirm) {
            showNotification('Passwords do not match', 'warning');
            return;
        }

        if (state.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            showNotification('Username already exists', 'warning');
            return;
        }

        const newUser = {
            id: 'u' + Date.now(),
            name,
            username,
            role,
            email: username + '@vetanimative.com'
        };

        state.users.push(newUser);
        showNotification('Account created! Please login.', 'success');
        toggleAuth('login');
    }

    function forgotPassword() {
        const username = document.getElementById('forgot-username')?.value;
        if (!username) {
            showNotification('Please enter username', 'warning');
            return;
        }

        const user = state.users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (user) {
            showNotification('Password reset link sent to your email (demo: use "password")', 'success');
        } else {
            showNotification('Username not found', 'error');
        }
    }

    function logout() {
        state.user = null;
        localStorage.removeItem('vet_user');
        showNotification('Logged out successfully', 'info');
        
        const loginSection = document.getElementById('login-section');
        const dashboard = document.getElementById('dashboard');
        
        if (loginSection) loginSection.classList.remove('hidden');
        if (dashboard) dashboard.classList.add('hidden');
        
        toggleAuth('login');
        setupAuthForms();
    }

    function updateUserProfile() {
        if (dom.userName()) {
            dom.userName().textContent = state.user?.name || 'Admin';
        }
        if (dom.userRole()) {
            dom.userRole().textContent = state.user?.role || 'Administrator';
        }
    }

    function setupAdminNavigation() {
        document.querySelectorAll('.sidebar-nav li[data-tab]').forEach(item => {
            item.removeEventListener('click', navigationHandler);
            item.addEventListener('click', navigationHandler);
        });
    }

    function navigationHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const tab = this.dataset.tab;
        if (tab) loadAdminTab(tab);
    }

    function loadAdminTab(tab) {
        document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
        document.querySelector(`.sidebar-nav li[data-tab="${tab}"]`)?.classList.add('active');
        
        const content = dom.contentArea();
        if (!content) return;

        switch(tab) {
            case 'dashboard':
                renderAdminDashboard(content);
                break;
            case 'orders':
                renderAdminOrders(content);
                break;
            case 'inventory':
                renderAdminInventory(content);
                break;
            case 'products':
                renderAdminProducts(content);
                break;
            case 'vendors':
                renderAdminVendors(content);
                break;
            case 'gallery':
                renderAdminGallery(content);
                break;
            case 'blog':
                renderAdminBlog(content);
                break;
            case 'team':
                renderAdminTeam(content);
                break;
            case 'finance':
                renderAdminFinance(content);
                break;
            case 'commission':
                renderAdminCommission(content);
                break;
            case 'users':
                renderAdminUsers(content);
                break;
            case 'settings':
                renderAdminSettings(content);
                break;
        }
    }

    let currentEditingItem = null;

    function showModal(type, itemId = null) {
        let itemToEdit = null;
        if (itemId) {
            if (type === 'products') {
                itemToEdit = state.products.find(p => p.id === itemId);
            } else if (type === 'services') {
                itemToEdit = state.services.find(s => s.id === itemId);
            } else if (type === 'team') {
                itemToEdit = state.doctors.find(d => d.id === itemId);
            } else if (type === 'blog') {
                itemToEdit = state.blog.find(b => b.id === itemId);
            } else if (type === 'vendors') {
                itemToEdit = state.vendors.find(v => v.id === itemId);
            } else if (type === 'inventory') {
                itemToEdit = state.products.find(p => p.id === itemId);
            }
        }

        currentEditingItem = itemToEdit ? { ...itemToEdit } : null;

        let modalHtml = '';
        
        if (type === 'inventory' && itemToEdit) {
            modalHtml = `
                <div class="modal-overlay" id="admin-modal" style="display:flex;">
                    <div class="modal-content" style="max-width:400px;">
                        <h3>Adjust Stock: ${itemToEdit.name}</h3>
                        <form id="admin-form" class="form-grid">
                            <div class="form-group">
                                <label>Current Stock</label>
                                <input type="number" id="current-stock" class="input-full" value="${itemToEdit.stock}" readonly disabled>
                            </div>
                            <div class="form-group">
                                <label>Adjustment Type</label>
                                <select id="adjustment-type" class="input-full">
                                    <option value="add">Add Stock</option>
                                    <option value="remove">Remove Stock</option>
                                    <option value="set">Set to Specific Value</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Quantity</label>
                                <input type="number" id="adjustment-quantity" class="input-full" min="0" value="1" required>
                            </div>
                            <div class="form-group">
                                <label>Reason (Optional)</label>
                                <input type="text" id="adjustment-reason" class="input-full" placeholder="e.g., New shipment, damaged goods">
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-success">Update Stock</button>
                                <button type="button" class="btn btn-secondary" onclick="VetApp.closeModal('admin-modal')">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        } else {
            modalHtml = `
                <div class="modal-overlay" id="admin-modal" style="display:flex;">
                    <div class="modal-content" style="max-width:500px;">
                        <h3>${itemToEdit ? 'Edit' : 'Add New'} ${type}</h3>
                        <form id="admin-form" class="form-grid">
                            <input type="text" id="modal-name" placeholder="Name" class="input-full" required value="${itemToEdit?.name || ''}">
                            ${type !== 'team' && type !== 'vendors' && type !== 'inventory' ? `
                                <input type="number" id="modal-price" placeholder="Price" class="input-full" step="0.01" value="${itemToEdit?.price || ''}">
                                <select id="modal-category" class="input-full">
                                    <option value="">Select Category</option>
                                    <option value="food" ${itemToEdit?.category === 'food' ? 'selected' : ''}>Food</option>
                                    <option value="acc" ${itemToEdit?.category === 'acc' ? 'selected' : ''}>Accessories</option>
                                    <option value="health" ${itemToEdit?.category === 'health' ? 'selected' : ''}>Health</option>
                                    <option value="grooming" ${itemToEdit?.category === 'grooming' ? 'selected' : ''}>Grooming</option>
                                </select>
                            ` : ''}
                            ${type === 'team' ? `
                                <input type="text" id="modal-specialty" placeholder="Specialty" class="input-full" value="${itemToEdit?.specialty || ''}">
                                <input type="text" id="modal-experience" placeholder="Experience" class="input-full" value="${itemToEdit?.experience || ''}">
                                <input type="text" id="modal-availability" placeholder="Availability (e.g., Mon-Fri)" class="input-full" value="${itemToEdit?.availability || 'Mon-Fri'}">
                            ` : ''}
                            ${type === 'vendors' ? `
                                <input type="text" id="modal-contact" placeholder="Contact Person" class="input-full" value="${itemToEdit?.contact || ''}">
                                <input type="email" id="modal-email" placeholder="Email" class="input-full" value="${itemToEdit?.email || ''}">
                                <input type="text" id="modal-phone" placeholder="Phone" class="input-full" value="${itemToEdit?.phone || ''}">
                                <input type="text" id="modal-products" placeholder="Products (comma separated)" class="input-full" value="${itemToEdit?.products?.join(', ') || ''}">
                            ` : ''}
                            ${type !== 'vendors' ? `
                                <input type="text" id="modal-image" placeholder="Image URL" class="input-full" value="${itemToEdit?.image || CONFIG.defaultImage}">
                                <div class="upload-wrapper">
                                    <label for="modal-image-upload" class="upload-label">
                                        <i class="fas fa-upload"></i> Or Upload Image (JPG, PNG)
                                    </label>
                                    <input type="file" id="modal-image-upload" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" style="display:none" onchange="VetApp.previewModalImage(this)">
                                </div>
                            ` : ''}
                            <textarea id="modal-description" placeholder="Description" class="input-full" rows="3">${itemToEdit?.description || itemToEdit?.bio || ''}</textarea>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-success">${itemToEdit ? 'Update' : 'Save'}</button>
                                <button type="button" class="btn btn-secondary" onclick="VetApp.closeModal('admin-modal')">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }

        const existingModal = document.getElementById('admin-modal');
        if (existingModal) existingModal.remove();

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const form = document.getElementById('admin-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (type === 'inventory' && itemToEdit) {
                    handleStockAdjustment(itemToEdit.id);
                } else {
                    handleAddEdit(type, itemToEdit?.id);
                }
            });
        }
    }

    function previewModalImage(input) {
        if (input.files && input.files[0]) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(input.files[0].type)) {
                showNotification('Please upload a valid image file (JPG, PNG, GIF, WEBP)', 'warning');
                input.value = '';
                return;
            }

            if (input.files[0].size > 5 * 1024 * 1024) {
                showNotification('Image size should be less than 5MB', 'warning');
                input.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const imageInput = document.getElementById('modal-image');
                if (imageInput) {
                    imageInput.value = e.target.result;
                }
                showNotification('Image loaded successfully', 'success');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function handleStockAdjustment(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const adjustmentType = document.getElementById('adjustment-type')?.value;
        const quantity = parseInt(document.getElementById('adjustment-quantity')?.value) || 0;
        const reason = document.getElementById('adjustment-reason')?.value || 'No reason provided';

        if (quantity <= 0) {
            showNotification('Please enter a valid quantity', 'warning');
            return;
        }

        let oldStock = product.stock;
        let newStock = oldStock;

        switch(adjustmentType) {
            case 'add':
                newStock = oldStock + quantity;
                break;
            case 'remove':
                if (quantity > oldStock) {
                    showNotification('Cannot remove more than current stock', 'warning');
                    return;
                }
                newStock = oldStock - quantity;
                break;
            case 'set':
                newStock = quantity;
                break;
        }

        product.stock = newStock;
        showNotification(`Stock updated from ${oldStock} to ${newStock}`, 'success');
        closeModal('admin-modal');
        loadAdminTab('inventory');
    }

    function handleAddEdit(type, itemId = null) {
        const name = document.getElementById('modal-name')?.value;
        if (!name) {
            showNotification('Name is required', 'warning');
            return;
        }

        const image = document.getElementById('modal-image')?.value || CONFIG.defaultImage;
        const description = document.getElementById('modal-description')?.value || 'Description here';

        if (itemId) {
            if (type === 'products') {
                const index = state.products.findIndex(p => p.id === itemId);
                if (index !== -1) {
                    state.products[index] = {
                        ...state.products[index],
                        name,
                        image,
                        description,
                        category: document.getElementById('modal-category')?.value || state.products[index].category,
                        price: parseFloat(document.getElementById('modal-price')?.value) || state.products[index].price
                    };
                }
            } else if (type === 'services') {
                const index = state.services.findIndex(s => s.id === itemId);
                if (index !== -1) {
                    state.services[index] = {
                        ...state.services[index],
                        name,
                        image,
                        description,
                        category: document.getElementById('modal-category')?.value || state.services[index].category,
                        price: parseFloat(document.getElementById('modal-price')?.value) || state.services[index].price
                    };
                }
            } else if (type === 'team') {
                const index = state.doctors.findIndex(d => d.id === itemId);
                if (index !== -1) {
                    state.doctors[index] = {
                        ...state.doctors[index],
                        name,
                        image,
                        bio: description,
                        specialty: document.getElementById('modal-specialty')?.value || state.doctors[index].specialty,
                        experience: document.getElementById('modal-experience')?.value || state.doctors[index].experience,
                        availability: document.getElementById('modal-availability')?.value || state.doctors[index].availability
                    };
                }
            } else if (type === 'blog') {
                const index = state.blog.findIndex(b => b.id === itemId);
                if (index !== -1) {
                    state.blog[index] = {
                        ...state.blog[index],
                        title: name,
                        image,
                        content: description,
                        excerpt: description.substring(0, 100),
                        category: document.getElementById('modal-category')?.value || state.blog[index].category
                    };
                }
            } else if (type === 'vendors') {
                const index = state.vendors.findIndex(v => v.id === itemId);
                if (index !== -1) {
                    const productsStr = document.getElementById('modal-products')?.value || '';
                    state.vendors[index] = {
                        ...state.vendors[index],
                        name,
                        contact: document.getElementById('modal-contact')?.value || state.vendors[index].contact,
                        email: document.getElementById('modal-email')?.value || state.vendors[index].email,
                        phone: document.getElementById('modal-phone')?.value || state.vendors[index].phone,
                        products: productsStr.split(',').map(p => p.trim()).filter(p => p)
                    };
                }
            }
            showNotification(`${type} updated successfully`, 'success');
        } else {
            let newItem = {
                id: (type === 'products' ? 'p' : type === 'services' ? 's' : type === 'team' ? 'd' : type === 'blog' ? 'b' : type === 'vendors' ? 'v' : 'x') + Date.now(),
                name: name,
                image: image,
                description: description
            };

            if (type === 'products') {
                newItem = {
                    ...newItem,
                    category: document.getElementById('modal-category')?.value || 'food',
                    type: 'product',
                    price: parseFloat(document.getElementById('modal-price')?.value) || 0,
                    stock: 10
                };
                state.products.push(newItem);
            } else if (type === 'services') {
                newItem = {
                    ...newItem,
                    category: document.getElementById('modal-category')?.value || 'health',
                    type: 'service',
                    price: parseFloat(document.getElementById('modal-price')?.value) || 0,
                    duration: '60 min'
                };
                state.services.push(newItem);
            } else if (type === 'team') {
                newItem = {
                    ...newItem,
                    specialty: document.getElementById('modal-specialty')?.value || 'General Practice',
                    experience: document.getElementById('modal-experience')?.value || '5 years',
                    availability: document.getElementById('modal-availability')?.value || 'Mon-Fri',
                    bio: description,
                    education: 'DVM'
                };
                state.doctors.push(newItem);
            } else if (type === 'blog') {
                newItem = {
                    ...newItem,
                    title: name,
                    category: document.getElementById('modal-category')?.value || 'Health Care',
                    date: new Date().toISOString().split('T')[0],
                    excerpt: description.substring(0, 100),
                    content: description
                };
                state.blog.push(newItem);
            } else if (type === 'vendors') {
                const productsStr = document.getElementById('modal-products')?.value || '';
                newItem = {
                    ...newItem,
                    contact: document.getElementById('modal-contact')?.value || '',
                    email: document.getElementById('modal-email')?.value || '',
                    phone: document.getElementById('modal-phone')?.value || '',
                    products: productsStr.split(',').map(p => p.trim()).filter(p => p)
                };
                state.vendors.push(newItem);
            }
            showNotification(`${type} added successfully`, 'success');
        }

        closeModal('admin-modal');
        
        if (type === 'products' || type === 'services') {
            loadAdminTab('products');
        } else {
            loadAdminTab(type);
        }
    }

    function renderAdminDashboard(container) {
        container.innerHTML = `
            <div class="content-card">
                <h2>Dashboard</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Today's Revenue</h3>
                        <div class="stat-value">${formatCurrency(1580)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Today's Orders</h3>
                        <div class="stat-value">12</div>
                    </div>
                    <div class="stat-card">
                        <h3>Low Stock</h3>
                        <div class="stat-value">${state.products.filter(p => p.stock < 10).length}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Active Doctors</h3>
                        <div class="stat-value">${state.doctors.length}</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="revenue-chart"></canvas>
                </div>
                <div class="recent-orders">
                    <h3>Recent Orders</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.orders.slice(-5).map(o => `
                                <tr>
                                    <td>${o.id}</td>
                                    <td>${o.customer || 'Walk-in'}</td>
                                    <td>${formatCurrency(o.total)}</td>
                                    <td><span class="status-badge status-${o.status}">${o.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        setTimeout(() => {
            const chartEl = document.getElementById('revenue-chart');
            if (chartEl && typeof Chart !== 'undefined') {
                new Chart(chartEl, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Revenue',
                            data: [1200, 1900, 1500, 2200, 1800, 2400, 2100],
                            borderColor: '#4a6cf7',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }, 100);
    }

    function renderAdminOrders(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Orders</h2>
                    <button class="btn btn-primary" onclick="VetApp.showOrderForm()">
                        <i class="fas fa-plus"></i> New Order
                    </button>
                </div>
                
                <div id="order-form" class="hidden">
                    <div class="form-card">
                        <h3>Create New Order</h3>
                        <div class="form-grid">
                            <input type="text" id="order-customer" placeholder="Customer Name" class="input-full">
                            <select id="order-product" class="input-full">
                                <option value="">Select Product</option>
                                ${[...state.products, ...state.services].map(item => `
                                    <option value="${item.id}" data-price="${item.price}" data-type="${item.type}">
                                        ${item.name} - ${formatCurrency(item.price)}
                                    </option>
                                `).join('')}
                            </select>
                            <input type="number" id="order-qty" value="1" min="1" class="input-full">
                            <button type="button" class="btn btn-secondary" onclick="VetApp.addOrderItem()">Add Item</button>
                        </div>
                        
                        <div id="order-items-table" style="margin: 20px 0;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="order-items-body"></tbody>
                            </table>
                        </div>
                        
                        <div class="order-total">
                            <strong>Total: </strong>
                            <span id="order-form-total">${formatCurrency(0)}</span>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-success" onclick="VetApp.processOrder()">Process Order</button>
                            <button type="button" class="btn btn-secondary" onclick="VetApp.hideOrderForm()">Cancel</button>
                        </div>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="orders-body">
                        ${state.orders.map(o => `
                            <tr>
                                <td>${o.id}</td>
                                <td>${o.customer || 'Walk-in'}</td>
                                <td>${o.items?.length || 0}</td>
                                <td>${formatCurrency(o.total)}</td>
                                <td>${formatDate(o.date)}</td>
                                <td><span class="status-badge status-${o.status}">${o.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="VetApp.viewOrder('${o.id}')"><i class="fas fa-eye"></i></button>
                                    <button class="btn-icon" onclick="VetApp.printReceipt('${o.id}')"><i class="fas fa-print"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderAdminInventory(container) {
        container.innerHTML = `
            <div class="content-card">
                <h2>Inventory Management</h2>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Products</h3>
                        <div class="stat-value">${state.products.length}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Low Stock Items</h3>
                        <div class="stat-value">${state.products.filter(p => p.stock < 10).length}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Out of Stock</h3>
                        <div class="stat-value">${state.products.filter(p => p.stock === 0).length}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Total Value</h3>
                        <div class="stat-value">${formatCurrency(state.products.reduce((sum, p) => sum + (p.stock * p.price), 0))}</div>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.products.map(p => {
                            const status = p.stock <= 0 ? 'danger' : (p.stock < 10 ? 'warning' : 'success');
                            const statusText = p.stock <= 0 ? 'Out' : (p.stock < 10 ? 'Low' : 'In Stock');
                            return `
                                <tr>
                                    <td>${p.name}</td>
                                    <td>${p.category}</td>
                                    <td>${formatCurrency(p.price)}</td>
                                    <td>${p.stock}</td>
                                    <td>${formatCurrency(p.stock * p.price)}</td>
                                    <td><span class="status-badge status-${status}">${statusText}</span></td>
                                    <td>
                                        <button class="btn-sm" onclick="VetApp.showModal('inventory', '${p.id}')">Adjust Stock</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderAdminProducts(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Products & Services</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('products')">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                    <button class="btn btn-primary" style="margin-left:10px;" onclick="VetApp.showModal('services')">
                        <i class="fas fa-plus"></i> Add Service
                    </button>
                </div>
                
                <div class="product-tabs">
                    <button class="tab-btn active" onclick="VetApp.switchProductTab('products', event)">Products</button>
                    <button class="tab-btn" onclick="VetApp.switchProductTab('services', event)">Services</button>
                </div>
                
                <div id="products-tab">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-products-body">
                            ${state.products.map(p => `
                                <tr>
                                    <td>${p.name}</td>
                                    <td>${p.category}</td>
                                    <td>${formatCurrency(p.price)}</td>
                                    <td>${p.stock}</td>
                                    <td>
                                        <button class="btn-icon" onclick="VetApp.showModal('products', '${p.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" onclick="VetApp.deleteProduct('${p.id}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div id="services-tab" style="display:none;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-services-body">
                            ${state.services.map(s => `
                                <tr>
                                    <td>${s.name}</td>
                                    <td>${s.category}</td>
                                    <td>${formatCurrency(s.price)}</td>
                                    <td>${s.duration}</td>
                                    <td>
                                        <button class="btn-icon" onclick="VetApp.showModal('services', '${s.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" onclick="VetApp.deleteService('${s.id}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderAdminVendors(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Vendors</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('vendors')">
                        <i class="fas fa-plus"></i> Add Vendor
                    </button>
                </div>
                
                <div class="vendor-grid">
                    ${state.vendors.map(v => `
                        <div class="vendor-card">
                            <h3>${v.name}</h3>
                            <p><i class="fas fa-user"></i> ${v.contact}</p>
                            <p><i class="fas fa-envelope"></i> ${v.email}</p>
                            <p><i class="fas fa-phone"></i> ${v.phone}</p>
                            <p><i class="fas fa-tag"></i> ${v.products.join(', ')}</p>
                            <div class="vendor-actions">
                                <button class="btn-sm" onclick="VetApp.showModal('vendors', '${v.id}')">Edit</button>
                                <button class="btn-sm btn-danger" onclick="VetApp.deleteVendor('${v.id}')">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderAdminGallery(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Gallery Management</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('gallery')">
                        <i class="fas fa-upload"></i> Upload Image
                    </button>
                </div>
                
                <div class="gallery-grid admin-gallery">
                    ${state.gallery.map(item => `
                        <div class="gallery-item">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                            <div class="gallery-item-info">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                                <span class="badge ${item.type}">${item.type}</span>
                            </div>
                            <div class="gallery-item-actions">
                                <button class="btn-icon" onclick="VetApp.showModal('gallery', '${item.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon" onclick="VetApp.deleteGallery('${item.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderAdminBlog(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Blog Posts</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('blog')">
                        <i class="fas fa-plus"></i> New Post
                    </button>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.blog.map(b => `
                            <tr>
                                <td>${b.title}</td>
                                <td>${b.category}</td>
                                <td>${formatDate(b.date)}</td>
                                <td>
                                    <button class="btn-icon" onclick="VetApp.showModal('blog', '${b.id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="VetApp.deleteBlog('${b.id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderAdminTeam(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>Team Members</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('team')">
                        <i class="fas fa-plus"></i> Add Doctor
                    </button>
                </div>
                
                <div class="team-grid">
                    ${state.doctors.map(d => `
                        <div class="team-card">
                            <img src="${d.image}" alt="${d.name}" loading="lazy">
                            <h3>${d.name}</h3>
                            <p>${d.specialty}</p>
                            <p class="availability">${d.availability}</p>
                            <div class="team-actions">
                                <button class="btn-sm" onclick="VetApp.showModal('team', '${d.id}')">Edit</button>
                                <button class="btn-sm btn-danger" onclick="VetApp.deleteDoctor('${d.id}')">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderAdminFinance(container) {
        container.innerHTML = `
            <div class="content-card">
                <h2>Financial Summary</h2>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Revenue</h3>
                        <div class="stat-value">${formatCurrency(45680)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Expenses</h3>
                        <div class="stat-value">${formatCurrency(12340)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Net Profit</h3>
                        <div class="stat-value">${formatCurrency(33340)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Pending Invoices</h3>
                        <div class="stat-value">8</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="finance-chart"></canvas>
                </div>
                
                <div class="report-actions">
                    <button class="btn btn-primary" onclick="VetApp.exportFinanceReport()">
                        <i class="fas fa-download"></i> Export Report
                    </button>
                </div>
            </div>
        `;

        setTimeout(() => {
            const chartEl = document.getElementById('finance-chart');
            if (chartEl && typeof Chart !== 'undefined') {
                new Chart(chartEl, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Revenue',
                            data: [6500, 7200, 8100, 7800, 8500, 8900],
                            backgroundColor: '#4a6cf7'
                        }, {
                            label: 'Expenses',
                            data: [2100, 2300, 1900, 2200, 2000, 2400],
                            backgroundColor: '#dc3545'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }, 100);
    }

    function renderAdminCommission(container) {
        container.innerHTML = `
            <div class="content-card">
                <h2>Commission Management</h2>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Commission</h3>
                        <div class="stat-value">${formatCurrency(5840)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Paid</h3>
                        <div class="stat-value">${formatCurrency(4200)}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Pending</h3>
                        <div class="stat-value">${formatCurrency(1640)}</div>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Product</th>
                            <th>Sales</th>
                            <th>Commission %</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Premium Pet Supplies</td>
                            <td>Dog Food</td>
                            <td>${formatCurrency(12500)}</td>
                            <td>15%</td>
                            <td>${formatCurrency(1875)}</td>
                            <td><span class="status-badge status-pending">Pending</span></td>
                            <td><button class="btn-sm" onclick="VetApp.showNotification('Payment processed', 'success')">Pay</button></td>
                        </tr>
                        <tr>
                            <td>Healthy Paws</td>
                            <td>Supplements</td>
                            <td>${formatCurrency(8900)}</td>
                            <td>12%</td>
                            <td>${formatCurrency(1068)}</td>
                            <td><span class="status-badge status-paid">Paid</span></td>
                            <td><button class="btn-sm" onclick="VetApp.showNotification('Receipt generated', 'info')">Receipt</button></td>
                        </tr>
                        <tr>
                            <td>PetMed Pharmaceuticals</td>
                            <td>Medications</td>
                            <td>${formatCurrency(15600)}</td>
                            <td>10%</td>
                            <td>${formatCurrency(1560)}</td>
                            <td><span class="status-badge status-pending">Pending</span></td>
                            <td><button class="btn-sm" onclick="VetApp.showNotification('Payment processed', 'success')">Pay</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderAdminUsers(container) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-header">
                    <h2>User Management</h2>
                    <button class="btn btn-primary" onclick="VetApp.showModal('users')">
                        <i class="fas fa-plus"></i> Add User
                    </button>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.users.map(u => `
                            <tr>
                                <td>${u.name}</td>
                                <td>${u.username}</td>
                                <td>${u.email}</td>
                                <td><span class="badge role-${u.role}">${u.role}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="VetApp.showModal('users', '${u.id}')"><i class="fas fa-edit"></i></button>
                                    ${u.role !== 'admin' ? `<button class="btn-icon" onclick="VetApp.deleteUser('${u.id}')"><i class="fas fa-trash"></i></button>` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderAdminSettings(container) {
        container.innerHTML = `
            <div class="content-card">
                <h2>Settings</h2>
                
                <div class="settings-section">
                    <h3>General Settings</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Site Name</label>
                            <input type="text" id="site-name" class="input-full" value="${state.settings.siteName}">
                        </div>
                        
                        <div class="form-group">
                            <label>Currency</label>
                            <select id="currency" class="input-full">
                                <option value="USD" ${state.settings.currency === 'USD' ? 'selected' : ''}>USD</option>
                                <option value="EUR" ${state.settings.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                                <option value="IDR" ${state.settings.currency === 'IDR' ? 'selected' : ''}>IDR</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Tax Rate (%)</label>
                            <input type="number" id="tax-rate" class="input-full" value="${state.settings.taxRate}">
                        </div>
                        
                        <div class="form-group">
                            <label>Shipping Fee</label>
                            <input type="number" id="shipping-fee" class="input-full" value="${CONFIG.shippingFee}">
                        </div>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h3>Contact Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Clinic Address</label>
                            <textarea id="clinic-address" class="input-full">${state.settings.clinicAddress}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="text" id="clinic-phone" class="input-full" value="${state.settings.clinicPhone}">
                        </div>
                        
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="clinic-email" class="input-full" value="${state.settings.clinicEmail}">
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="VetApp.saveSettings()">Save Settings</button>
            </div>
        `;
    }

    // Order management
    let currentOrderItems = [];

    function showOrderForm() {
        const orderForm = document.getElementById('order-form');
        if (orderForm) orderForm.classList.remove('hidden');
        currentOrderItems = [];
        updateOrderItemsTable();
    }

    function hideOrderForm() {
        const orderForm = document.getElementById('order-form');
        if (orderForm) orderForm.classList.add('hidden');
    }

    function addOrderItem() {
        const select = document.getElementById('order-product');
        const qty = parseInt(document.getElementById('order-qty')?.value) || 1;

        if (!select || !select.value) {
            showNotification('Select a product', 'warning');
            return;
        }

        const option = select.options[select.selectedIndex];
        const itemId = option.value;
        const price = parseFloat(option.dataset.price);
        const name = option.text.split(' - ')[0];

        const existing = currentOrderItems.find(i => i.id === itemId);
        if (existing) {
            existing.quantity += qty;
        } else {
            currentOrderItems.push({
                id: itemId,
                name: name,
                price: price,
                quantity: qty
            });
        }

        updateOrderItemsTable();
    }

    function updateOrderItemsTable() {
        const tbody = document.getElementById('order-items-body');
        if (!tbody) return;

        const total = currentOrderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        
        tbody.innerHTML = currentOrderItems.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
                <td>
                    <button class="btn-icon" onclick="VetApp.removeOrderItem(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        const totalSpan = document.getElementById('order-form-total');
        if (totalSpan) totalSpan.textContent = formatCurrency(total);
    }

    function removeOrderItem(index) {
        currentOrderItems.splice(index, 1);
        updateOrderItemsTable();
        if (currentOrderItems.length === 0) {
            const totalSpan = document.getElementById('order-form-total');
            if (totalSpan) totalSpan.textContent = formatCurrency(0);
        }
    }

    function processOrder() {
        if (currentOrderItems.length === 0) {
            showNotification('No items in order', 'warning');
            return;
        }

        const order = {
            id: 'ORD' + Date.now(),
            customer: document.getElementById('order-customer')?.value || 'Walk-in',
            items: [...currentOrderItems],
            total: currentOrderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0),
            date: new Date().toISOString(),
            status: 'confirmed'
        };

        state.orders.push(order);
        showNotification('Order created successfully', 'success');
        hideOrderForm();
        
        if (state.currentPage === 'admin') {
            loadAdminTab('orders');
        }
    }

    // CRUD Operations
    function deleteProduct(id) {
        if (!confirm('Delete this product?')) return;
        
        state.products = state.products.filter(p => p.id !== id);
        showNotification('Product deleted', 'success');
        loadAdminTab('products');
    }

    function deleteService(id) {
        if (!confirm('Delete this service?')) return;
        
        state.services = state.services.filter(s => s.id !== id);
        showNotification('Service deleted', 'success');
        loadAdminTab('products');
    }

    function deleteVendor(id) {
        if (!confirm('Delete this vendor?')) return;
        
        state.vendors = state.vendors.filter(v => v.id !== id);
        showNotification('Vendor deleted', 'success');
        loadAdminTab('vendors');
    }

    function deleteDoctor(id) {
        if (!confirm('Delete this doctor?')) return;
        
        state.doctors = state.doctors.filter(d => d.id !== id);
        showNotification('Doctor deleted', 'success');
        loadAdminTab('team');
    }

    function deleteBlog(id) {
        if (!confirm('Delete this blog post?')) return;
        
        state.blog = state.blog.filter(b => b.id !== id);
        showNotification('Blog post deleted', 'success');
        loadAdminTab('blog');
    }

    function deleteGallery(id) {
        if (!confirm('Delete this gallery item?')) return;
        
        state.gallery = state.gallery.filter(g => g.id !== id);
        showNotification('Gallery item deleted', 'success');
        loadAdminTab('gallery');
    }

    function deleteUser(id) {
        if (!confirm('Delete this user?')) return;
        
        state.users = state.users.filter(u => u.id !== id);
        showNotification('User deleted', 'success');
        loadAdminTab('users');
    }

    function saveSettings() {
        state.settings = {
            siteName: document.getElementById('site-name')?.value || state.settings.siteName,
            currency: document.getElementById('currency')?.value || state.settings.currency,
            taxRate: parseFloat(document.getElementById('tax-rate')?.value) || state.settings.taxRate,
            clinicAddress: document.getElementById('clinic-address')?.value || state.settings.clinicAddress,
            clinicPhone: document.getElementById('clinic-phone')?.value || state.settings.clinicPhone,
            clinicEmail: document.getElementById('clinic-email')?.value || state.settings.clinicEmail
        };

        localStorage.setItem('vet_settings', JSON.stringify(state.settings));
        showNotification('Settings saved', 'success');
    }

    // ==================== UTILITIES ====================
    function formatCurrency(amount) {
        const currency = state.settings?.currency || CONFIG.currency;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    }

    function formatDate(date) {
        if (!date) return '';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return date;
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('vet_darkmode', document.body.classList.contains('dark-mode'));
        
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    function switchProductTab(tab, event) {
        const productsTab = document.getElementById('products-tab');
        const servicesTab = document.getElementById('services-tab');
        const tabs = document.querySelectorAll('.product-tabs .tab-btn');
        
        tabs.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        if (tab === 'products') {
            if (productsTab) productsTab.style.display = 'block';
            if (servicesTab) servicesTab.style.display = 'none';
        } else {
            if (productsTab) productsTab.style.display = 'none';
            if (servicesTab) servicesTab.style.display = 'block';
        }
    }

    function viewOrder(id) {
        showNotification(`Viewing order ${id}`, 'info');
    }

    function printReceipt(id) {
        showNotification(`Printing receipt for order ${id}`, 'info');
    }

    function exportFinanceReport() {
        showNotification('Exporting financial report...', 'info');
    }

    // ==================== PUBLIC API ====================
    return {
        // Core
        init,
        
        // Auth
        login,
        logout,
        toggleAuth,
        
        // Cart
        addToCart,
        updateCartItem,
        removeFromCart,
        
        // Checkout
        validateAndPay,
        confirmSuccess,
        toggleDelivery,
        
        // Review
        handleReviewSubmit,
        previewFileName,
        
        // Page Rendering
        filterCatalog,
        switchGallery,
        
        // Modals
        openDoctorModal,
        openBlogModal,
        openGalleryModal,
        showProductDetail,
        closeModal,
        closeBlogDetail,
        
        // Admin
        loadAdminTab,
        showOrderForm,
        hideOrderForm,
        addOrderItem,
        removeOrderItem,
        processOrder,
        deleteProduct,
        deleteService,
        deleteVendor,
        deleteDoctor,
        deleteBlog,
        deleteGallery,
        deleteUser,
        saveSettings,
        showModal,
        previewModalImage,
        
        // Placeholder functions
        editProduct: (id) => showModal('products', id),
        editDoctor: (id) => showModal('team', id),
        editBlog: (id) => showModal('blog', id),
        editVendor: (id) => showModal('vendors', id),
        editUser: (id) => showModal('users', id),
        viewOrder,
        printReceipt,
        showStockAdjustment: (id) => showModal('inventory', id),
        showProductForm: () => showModal('products'),
        showVendorForm: () => showModal('vendors'),
        showGalleryUpload: () => showModal('gallery'),
        showBlogForm: () => showModal('blog'),
        showTeamForm: () => showModal('team'),
        showUserForm: () => showModal('users'),
        switchProductTab,
        exportFinanceReport,
        
        // Utilities
        toggleDarkMode,
        formatCurrency,
        showNotification
    };
})();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => VetApp.init());

// Make globally available
window.VetApp = VetApp;

// Expose functions for onclick events in HTML
window.toggleAuth = (type) => VetApp.toggleAuth(type);
window.validateAndPay = () => VetApp.validateAndPay();
window.confirmSuccess = () => VetApp.confirmSuccess();
window.toggleDelivery = () => VetApp.toggleDelivery();
window.closeBlogDetail = () => VetApp.closeBlogDetail();
window.filterCatalog = (type, category, btn) => VetApp.filterCatalog(type, category, btn);
window.switchGallery = (type, btn) => VetApp.switchGallery(type, btn);