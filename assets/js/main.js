/* ================================================================
TEMPLATE NAME: VetAnimative - Premium Main JavaScript
AUTHOR: rian listanto
VERSION: 4.0 
================================================================ */

// --- 1. DATA CENTER ---
const defaultDoctors = {
    ray: { name: "Dr. Alexander Ray", role: "Senior Veterinarian", edu: "Ph.D University of Vienna", img: "assets/img/doctors/Dr.Alexander Ray.jpg", desc: "Expert in internal medicine." },
    jenkins: { name: "Dr. Sarah Jenkins", role: "Surgeon Specialist", edu: "Master of Surgery, RVC London", img: "assets/img/doctors/Dr. Sarah Jenkins.jpg", desc: "Soft tissue specialist." }
};

const defaultArticles = [
    { title: "Why Annual Checkups Matter", cat: "Health Care", img: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=800", content: "Checkups are lifesavers for pets." }
];

// --- 2. CORE BRIDGE ---
const getDynamicData = (key, defaultVal) => {
    const adminData = localStorage.getItem('db_' + key);
    return adminData ? JSON.parse(adminData) : defaultVal;
};

// --- 3. SHOPPING BAG SYSTEM (MODIFIED FOR AUTO-CALC) ---

window.addToBag = (name, price, type) => {
    let bag = JSON.parse(localStorage.getItem('vetBag')) || [];
    // Cek apakah item sudah ada (khusus produk bisa tambah qty)
    const existingItem = bag.find(item => item.name === name);
    if (existingItem && type === 'product') {
        existingItem.qty += 1;
    } else {
        bag.push({ id: Date.now(), name, price: parseInt(price), type, qty: 1 });
    }
    localStorage.setItem('vetBag', JSON.stringify(bag));
    updateBagUI();
    alert(`🐾 ${name} added to bag!`);
};

window.updateBagUI = () => {
    const bag = JSON.parse(localStorage.getItem('vetBag')) || [];
    const badge = document.querySelector('.bag-badge');
    if (badge) badge.innerText = bag.length;
};

// Fungsi Render untuk bag.html
window.renderBag = () => {
    const bag = JSON.parse(localStorage.getItem('vetBag')) || [];
    const serviceList = document.getElementById('service-list');
    const productList = document.getElementById('product-list');
    const subtotalEl = document.getElementById('subtotal');

    if (!serviceList || !productList) return;

    serviceList.innerHTML = '';
    productList.innerHTML = '';
    let subtotal = 0;

    if (bag.length === 0) {
        serviceList.innerHTML = '<p style="text-align:center; padding:20px; color:#999;">Bag is empty.</p>';
    }

    bag.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        
        const html = `
            <div class="item-row">
                <div>
                    <strong style="display:block;">${item.name} ${item.qty > 1 ? 'x'+item.qty : ''}</strong>
                    <small style="color:#777; text-transform: capitalize;">${item.type}</small>
                </div>
                <div style="display:flex; align-items:center; gap:20px;">
                    <span style="font-weight:600;">IDR ${itemTotal.toLocaleString()}</span>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4757; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
        
        if (item.type === 'service') {
            serviceList.innerHTML += html;
        } else {
            productList.innerHTML += html;
        }
    });

    if (subtotalEl) subtotalEl.innerText = "IDR " + subtotal.toLocaleString();
    
    // Update total akhir (termasuk ongkir jika ada)
    if (typeof updateTotal === "function") {
        updateTotal();
    } else {
        // Fallback jika fungsi updateTotal tidak ada di bag.html
        const totalEl = document.getElementById('total-price');
        if(totalEl) totalEl.innerText = "IDR " + subtotal.toLocaleString();
    }
};

window.removeItem = (index) => {
    let bag = JSON.parse(localStorage.getItem('vetBag')) || [];
    bag.splice(index, 1);
    localStorage.setItem('vetBag', JSON.stringify(bag));
    
    // Refresh UI
    updateBagUI();
    if (document.getElementById('service-list')) {
        renderBag();
        // Cek kembali form mana yang harus muncul
        if (typeof checkForms === 'function') checkForms();
    }
};

// --- 4. UI MODALS ---

window.showDoctorDetail = (id) => {
    let doc = defaultDoctors[id] || getDynamicData('team', []).find(d => d.id == id);
    if (!doc) return;
    const modal = document.getElementById('doctorModal');
    document.getElementById('modalBody').innerHTML = `
        <img src="${doc.img || doc.val_4}" style="width:100%; border-radius:15px; margin-bottom:15px;">
        <h2>${doc.name || doc.val_0}</h2>
        <p style="color:var(--secondary); font-weight:700;">${doc.role || doc.val_1}</p>
        <p>${doc.desc || doc.val_5}</p>
        <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="closeDoctorDetail()">Close</button>`;
    modal.style.display = 'flex';
};

window.closeDoctorDetail = () => { document.getElementById('doctorModal').style.display = 'none'; };

// --- 5. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    updateBagUI();
    
    // Deteksi jika berada di halaman bag.html
    if (document.getElementById('service-list') || document.getElementById('product-list')) {
        renderBag();
    }

    // Runner Animation
    const petRunner = document.querySelector('.pet-runner');
    if (petRunner) {
        let pos = -150;
        function anim() { 
            pos += 2; 
            if (pos > window.innerWidth) pos = -150; 
            petRunner.style.left = pos + 'px'; 
            requestAnimationFrame(anim); 
        }
        anim();
    }
});