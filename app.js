/**
 * SoleStyle - Main Application Javascript (Interactive SPA)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let cart = JSON.parse(localStorage.getItem('solestyle_cart')) || [];
  let currentActiveSlide = 0;
  let slideInterval;
  
  // DOM Elements
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const sections = document.querySelectorAll('.page-section');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  // Cart Elements
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
  const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
  
  // Modal Elements
  const productModal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalProductDetails = document.getElementById('modalProductDetails');
  
  // Catalog Elements
  const catalogProductsGrid = document.getElementById('catalogProductsGrid');
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  const catalogSortSelect = document.getElementById('catalogSortSelect');
  const catalogEmptyState = document.getElementById('catalogEmptyState');
  const categoryFilters = document.querySelectorAll('input[name="categoryFilter"]');
  const priceFilters = document.querySelectorAll('input[name="priceFilter"]');
  
  // Forms
  const contactForm = document.getElementById('contactForm');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const lineJoinBtn = document.getElementById('lineJoinBtn');
  
  // Navigation / Router Setup
  const routes = {
    'home': { sectionId: 'homePage', title: '楊智涵的鞋類電商' },
    'about': { sectionId: 'aboutPage', title: '關於我們 | SoleStyle 品牌故事' },
    'casual': { sectionId: 'catalogPage', title: '日常休閒鞋款 | SoleStyle', category: 'casual' },
    'formal': { sectionId: 'catalogPage', title: '雅痞正式皮鞋 | SoleStyle', category: 'formal' },
    'sport': { sectionId: 'catalogPage', title: '機能避震慢跑鞋 | SoleStyle', category: 'sport' },
    'acc': { sectionId: 'catalogPage', title: '精緻鞋材與配件 | SoleStyle', category: 'acc' },
    'other': { sectionId: 'catalogPage', title: '鞋具保護與保養 | SoleStyle', category: 'other' },
    'contact': { sectionId: 'contactPage', title: '聯絡我們 | SoleStyle' },
    'login': { sectionId: 'loginPage', title: '會員登入 | SoleStyle' },
    'register': { sectionId: 'registerPage', title: '免費註冊會員 | SoleStyle' },
    'line': { sectionId: 'linePage', title: '加入官方 LINE 群組 | SoleStyle' }
  };

  function router() {
    let hash = window.location.hash.slice(1) || 'home';
    
    // Support nested query formats or simple routes
    let routeKey = hash.split('?')[0];
    let route = routes[routeKey];
    
    if (!route) {
      // Fallback
      route = routes['home'];
      routeKey = 'home';
    }
    
    // Document Title
    document.title = route.title;
    
    // Toggle active section
    sections.forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(route.sectionId);
    if (activeSection) {
      activeSection.classList.add('active');
    }
    
    // Toggle active nav menu items
    navItems.forEach(item => {
      const pageName = item.getAttribute('data-page');
      if (pageName === routeKey) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Close mobile nav on transition
    navMenu.classList.remove('active');
    
    // Specific page behaviors
    if (route.sectionId === 'catalogPage') {
      // Set active category filter radio buttons
      const targetCategory = route.category || 'all';
      const radio = document.querySelector(`input[name="categoryFilter"][value="${targetCategory}"]`);
      if (radio) {
        radio.checked = true;
      }
      renderCatalog();
      
      // Update catalog titles
      const categoryNames = {
        'all': '所有商品專區',
        'casual': '日常休閒鞋款',
        'formal': '雅痞正式皮鞋',
        'sport': '機能避震慢跑鞋',
        'acc': '精緻鞋材與配件',
        'other': '鞋具保養與其它'
      };
      document.getElementById('catalogTitle').innerText = categoryNames[targetCategory] || '鞋款專區';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  
  window.addEventListener('hashchange', router);
  // Initial routing call
  router();

  // Mobile Menu Toggle Button
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  function showToast(message, type = 'success') {
    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type]} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    
    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
      toast.style.animation = 'slide-in-toast 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) reverse forwards';
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 3500);
  }

  // ==========================================================================
  // Hero Slider logic
  // ==========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  
  function nextSlide() {
    slides[currentActiveSlide].classList.remove('active');
    currentActiveSlide = (currentActiveSlide + 1) % slides.length;
    slides[currentActiveSlide].classList.add('active');
  }
  
  function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
  }
  
  if (slides.length > 0) {
    startSlideShow();
  }

  // ==========================================================================
  // Shopping Cart Logic
  // ==========================================================================
  function saveCart() {
    localStorage.setItem('solestyle_cart', JSON.stringify(cart));
    updateCartUI();
  }
  
  function addToCart(productId, size, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      cart.push({
        id: productId,
        size: size,
        qty: quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
    }
    
    saveCart();
    showToast(`成功加入購物車！ ${product.name} (尺寸: ${size})`, 'success');
  }
  
  function removeFromCart(productId, size) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex > -1) {
      const deletedItemName = cart[itemIndex].name;
      cart.splice(itemIndex, 1);
      saveCart();
      showToast(`已從購物車移除: ${deletedItemName}`, 'info');
    }
  }
  
  function updateCartQty(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
      item.qty += change;
      if (item.qty <= 0) {
        removeFromCart(productId, size);
      } else {
        saveCart();
      }
    }
  }
  
  function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }
  
  function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);
    cartBadgeCount.innerText = totalItems;
    
    // Subtotal
    const subtotal = getCartSubtotal();
    cartSubtotalAmount.innerText = `NT$ ${subtotal.toLocaleString()}`;
    
    // Render list
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>購物車是空的</h3>
          <p>快去探索我們的熱銷鞋款吧！</p>
          <a href="#casual" class="btn-primary" style="padding: 10px 20px; font-size: 0.9rem;" id="emptyCartExploreBtn">立即逛逛</a>
        </div>
      `;
      // Bind action to button
      const emptyBtn = document.getElementById('emptyCartExploreBtn');
      if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
          closeCart();
        });
      }
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <h4 class="cart-item-title">${item.name}</h4>
              <i class="fa-regular fa-trash-can cart-item-delete" data-id="${item.id}" data-size="${item.size}"></i>
            </div>
            <p class="cart-item-spec">尺寸: US ${item.size}</p>
            <div class="cart-item-bottom">
              <div class="cart-item-qty">
                <button class="qty-minus" data-id="${item.id}" data-size="${item.size}">-</button>
                <span>${item.qty}</span>
                <button class="qty-plus" data-id="${item.id}" data-size="${item.size}">+</button>
              </div>
              <span class="cart-item-price">NT$ ${(item.price * item.qty).toLocaleString()}</span>
            </div>
          </div>
        </div>
      `).join('');
      
      // Bind event listeners to dynamic list items
      document.querySelectorAll('.cart-item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          const size = e.target.getAttribute('data-size');
          removeFromCart(id, size);
        });
      });
      
      document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id');
          const size = e.target.getAttribute('data-size') || e.target.parentElement.getAttribute('data-size');
          updateCartQty(id, size, -1);
        });
      });
      
      document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id');
          const size = e.target.getAttribute('data-size') || e.target.parentElement.getAttribute('data-size');
          updateCartQty(id, size, 1);
        });
      });
    }
  }
  
  function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    updateCartUI();
  }
  
  function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
  }
  
  cartTriggerBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  
  // Checkout Button
  cartCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('您的購物車目前沒有商品，無法結帳。', 'error');
      return;
    }
    
    // Simulate successful checkout
    showToast('交易處理中...', 'info');
    setTimeout(() => {
      showToast('訂單付款成功！感謝您的選購，我們將儘速為您出貨。', 'success');
      cart = [];
      saveCart();
      closeCart();
    }, 2000);
  });
  
  // Initialize Cart UI
  updateCartUI();

  // ==========================================================================
  // Star Rating Generator Helper
  // ==========================================================================
  function generateStarsHTML(stars = 5) {
    let starsHTML = '';
    const fullStars = Math.floor(stars);
    const hasHalf = stars % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalf) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        starsHTML += '<i class="fa-regular fa-star"></i>';
      }
    }
    return starsHTML;
  }

  // ==========================================================================
  // Dynamic Product Cards Rendering
  // ==========================================================================
  
  // Renders a single product card markup
  function createProductCardHTML(product) {
    // Generate star count (4.5 or 5 dynamically)
    const rating = product.category === 'formal' ? 5 : (product.category === 'acc' ? 4 : 4.5);
    const tagHTML = product.price > 4000 ? '<span class="product-tag">PREMIUM</span>' : 
                    (product.id.includes('canvas') || product.id.includes('waterproof') ? '<span class="product-tag">HOT</span>' : '');
                    
    return `
      <div class="product-card bg-glass">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}">
          ${tagHTML}
          <div class="product-actions-overlay">
            <div class="overlay-btn btn-view" data-id="${product.id}" title="快速查看"><i class="fa-regular fa-eye"></i></div>
            <div class="overlay-btn btn-wish" title="加入收藏"><i class="fa-regular fa-heart"></i></div>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${getCategoryDisplayName(product.category)}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            ${generateStarsHTML(rating)}
          </div>
          <div class="product-bottom">
            <span class="product-price">NT$ ${product.price.toLocaleString()}</span>
            <button class="btn-card-add" data-id="${product.id}">加入購物車</button>
          </div>
        </div>
      </div>
    `;
  }
  
  function getCategoryDisplayName(cat) {
    const displayNames = {
      'casual': '休閒鞋款',
      'formal': '正式鞋款',
      'sport': '運動鞋款',
      'acc': '鞋材配件',
      'other': '其它商品'
    };
    return displayNames[cat] || cat;
  }

  // ==========================================================================
  // 1. Home Page Featured Items
  // ==========================================================================
  function renderHomeFeatured() {
    const homeGrid = document.getElementById('homeFeaturedProducts');
    if (!homeGrid) return;
    
    // Pick 4 hot items to feature on home page
    const featuredList = [
      products.find(p => p.id === 'casual_canvas'),
      products.find(p => p.id === 'formal_oxford'),
      products.find(p => p.id === 'sport_running'),
      products.find(p => p.id === 'other_waterproof')
    ].filter(Boolean);
    
    homeGrid.innerHTML = featuredList.map(createProductCardHTML).join('');
    bindProductCardEvents(homeGrid);
  }
  
  renderHomeFeatured();

  // ==========================================================================
  // 2. Dynamic Catalog Catalog Logic (Category catalog page)
  // ==========================================================================
  function renderCatalog() {
    if (!catalogProductsGrid) return;
    
    // Get currently checked filters
    const activeCategoryInput = document.querySelector('input[name="categoryFilter"]:checked');
    const activeCategory = activeCategoryInput ? activeCategoryInput.value : 'all';
    
    const activePriceInput = document.querySelector('input[name="priceFilter"]:checked');
    const activePriceRange = activePriceInput ? activePriceInput.value : 'all';
    
    const searchVal = catalogSearchInput.value.trim().toLowerCase();
    const sortVal = catalogSortSelect.value;
    
    // 1. Filter products
    let filtered = products.filter(p => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      
      // Price filter
      if (activePriceRange !== 'all') {
        const [min, max] = activePriceRange.split('-');
        if (max === undefined) {
          // Range is 4000+
          if (p.price < 4000) return false;
        } else {
          if (p.price < parseInt(min) || p.price > parseInt(max)) {
            return false;
          }
        }
      }
      
      // Search term
      if (searchVal) {
        const matchName = p.name.toLowerCase().includes(searchVal);
        const matchEn = p.enName.toLowerCase().includes(searchVal);
        const matchDesc = p.description.toLowerCase().includes(searchVal);
        if (!matchName && !matchEn && !matchDesc) {
          return false;
        }
      }
      
      return true;
    });
    
    // 2. Sort products
    if (sortVal === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
    } // Default "featured" keeps original order
    
    // 3. Render grid
    if (filtered.length === 0) {
      catalogProductsGrid.innerHTML = '';
      catalogEmptyState.style.display = 'flex';
    } else {
      catalogEmptyState.style.display = 'none';
      catalogProductsGrid.innerHTML = filtered.map(createProductCardHTML).join('');
      bindProductCardEvents(catalogProductsGrid);
    }
  }

  // Bind click handlers to dynamic grid cards
  function bindProductCardEvents(container) {
    // Add to Cart from grid cards
    container.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.getAttribute('data-id');
        // Default size for quick-add is US 9 for shoes, or unique size 'N/A' for accessories/others
        const product = products.find(p => p.id === id);
        const defaultSize = (product.category === 'acc' || product.category === 'other') ? 'Free' : '9';
        addToCart(id, defaultSize, 1);
      });
    });
    
    // Open product details modal
    container.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Handle click on eye icon or its parent button
        let target = e.target;
        while (target && !target.getAttribute('data-id')) {
          target = target.parentElement;
        }
        if (target) {
          const id = target.getAttribute('data-id');
          openProductDetailModal(id);
        }
      });
    });
  }

  // Bind triggers for sidebar filters
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', renderCatalog);
    catalogSortSelect.addEventListener('change', renderCatalog);
    
    categoryFilters.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const selectedCat = e.target.value;
        // Synced URL hash to navigate correctly
        window.location.hash = selectedCat === 'all' ? '#casual' : `#${selectedCat}`;
      });
    });
    
    priceFilters.forEach(radio => {
      radio.addEventListener('change', renderCatalog);
    });
  }

  // ==========================================================================
  // Product Detail Modal Logic
  // ==========================================================================
  let selectedModalSize = '9';
  let modalQuantity = 1;
  
  function openProductDetailModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Set default size
    selectedModalSize = (product.category === 'acc' || product.category === 'other') ? 'Free' : '9';
    modalQuantity = 1;
    
    // Rating
    const rating = product.category === 'formal' ? 5 : (product.category === 'acc' ? 4 : 4.5);
    
    // Setup Sizes UI (Only for shoes)
    let sizeSelectorHTML = '';
    if (product.category !== 'acc' && product.category !== 'other') {
      const sizes = ['7', '8', '9', '10', '11'];
      sizeSelectorHTML = `
        <div class="option-select-group">
          <span class="option-label">選擇尺碼 (US)</span>
          <div class="size-selector">
            ${sizes.map(sz => `
              <button class="size-btn ${sz === selectedModalSize ? 'active' : ''}" data-size="${sz}">${sz}</button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Non-shoe sizing
      sizeSelectorHTML = `
        <div class="option-select-group">
          <span class="option-label">規格</span>
          <div class="size-selector">
            <button class="size-btn active" data-size="Free">單一規格 (Free)</button>
          </div>
        </div>
      `;
    }
    
    // Features List
    const featuresListHTML = product.features.map(f => `<li>${f}</li>`).join('');
    
    modalProductDetails.innerHTML = `
      <div class="detail-img-wrap">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="detail-info">
        <span class="detail-category">${getCategoryDisplayName(product.category)}</span>
        <h2 class="detail-title">${product.name}</h2>
        <p class="detail-subtitle">${product.enName}</p>
        
        <div class="detail-rating-wrap">
          <div class="detail-rating">${generateStarsHTML(rating)}</div>
          <span class="detail-reviews-count">(53 則顧客真實評價)</span>
        </div>
        
        <div class="detail-price">NT$ ${product.price.toLocaleString()}</div>
        <p class="detail-desc">${product.description}</p>
        
        <div class="detail-specs">
          <h4>產品特點</h4>
          <ul>
            ${featuresListHTML}
          </ul>
        </div>
        
        ${sizeSelectorHTML}
        
        <div class="option-select-group">
          <span class="option-label">數量</span>
          <div style="display: flex; align-items: center;">
            <div class="quantity-control">
              <div class="qty-btn" id="modalQtyMinus">-</div>
              <input type="text" class="qty-input" id="modalQtyVal" value="1" readonly>
              <div class="qty-btn" id="modalQtyPlus">+</div>
            </div>
            
            <button class="btn-primary btn-detail-add" id="modalAddToCartBtn">
              <i class="fa-solid fa-cart-plus"></i> 加入購物車
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Modal Event Bindings
    // Size Buttons
    modalProductDetails.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        modalProductDetails.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        selectedModalSize = e.target.getAttribute('data-size');
      });
    });
    
    // Quantity Controls
    const qtyInput = document.getElementById('modalQtyVal');
    document.getElementById('modalQtyMinus').addEventListener('click', () => {
      if (modalQuantity > 1) {
        modalQuantity--;
        qtyInput.value = modalQuantity;
      }
    });
    
    document.getElementById('modalQtyPlus').addEventListener('click', () => {
      modalQuantity++;
      qtyInput.value = modalQuantity;
    });
    
    // Add to Cart
    document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
      addToCart(product.id, selectedModalSize, modalQuantity);
      closeProductModal();
    });
    
    // Open Modal Overlay
    productModal.classList.add('active');
  }
  
  function closeProductModal() {
    productModal.classList.remove('active');
  }
  
  modalCloseBtn.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    // If click was directly on overlay mask, not inside modal box
    if (e.target === productModal) {
      closeProductModal();
    }
  });

  // ==========================================================================
  // Form Submission Handlers (Interactive Mocking)
  // ==========================================================================
  
  // Contact Us Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      
      showToast('正在傳送您的表單資料...', 'info');
      
      setTimeout(() => {
        showToast(`感謝您的來信，${name}！您的諮詢表單已成功送出，我們會盡快回信至 ${email}。`, 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  // Member Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      
      showToast('登入身分驗證中...', 'info');
      
      setTimeout(() => {
        showToast(`歡迎回來！登入成功。會員帳戶: ${email}`, 'success');
        loginForm.reset();
        window.location.hash = '#home'; // Redirect to home
      }, 1500);
    });
  }

  // Member Register Form
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const pass = document.getElementById('regPassword').value;
      const passConf = document.getElementById('regPasswordConfirm').value;
      
      if (pass !== passConf) {
        showToast('密碼與確認密碼不一致！請重新檢查。', 'error');
        return;
      }
      
      showToast('註冊處理中，建立新帳戶...', 'info');
      
      setTimeout(() => {
        showToast(`恭喜您，${name}！您的帳戶已成功建立。首購九折折扣碼已發送至您的信箱。`, 'success');
        registerForm.reset();
        window.location.hash = '#login'; // Redirect to login page
      }, 1800);
    });
  }

  // Social Login Mock
  const lineSocialLoginBtn = document.getElementById('lineSocialLoginBtn');
  const googleSocialLoginBtn = document.getElementById('googleSocialLoginBtn');
  
  if (lineSocialLoginBtn) {
    lineSocialLoginBtn.addEventListener('click', () => {
      showToast('與 LINE 串接授權中...', 'info');
      setTimeout(() => {
        showToast('LINE 帳戶串聯登入成功！歡迎回到 SoleStyle。', 'success');
        window.location.hash = '#home';
      }, 1200);
    });
  }
  
  if (googleSocialLoginBtn) {
    googleSocialLoginBtn.addEventListener('click', () => {
      showToast('與 Google 串接授權中...', 'info');
      setTimeout(() => {
        showToast('Google 帳戶串聯登入成功！歡迎回到 SoleStyle。', 'success');
        window.location.hash = '#home';
      }, 1200);
    });
  }
  
  // Forgot Password Link Mock
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('請輸入您的註冊電子信箱來重設密碼:');
      if (email) {
        showToast(`重設密碼連結已成功寄送至: ${email}`, 'success');
      }
    });
  }

  // Newsletter Footer Form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      const email = emailInput.value;
      
      showToast('訂閱處理中...', 'info');
      setTimeout(() => {
        showToast(`訂閱成功！感謝您！我們將會向 ${email} 發送第一手新品快訊。`, 'success');
        emailInput.value = '';
      }, 1000);
    });
  }

  // LINE Join Button (LINE Group page)
  if (lineJoinBtn) {
    lineJoinBtn.addEventListener('click', () => {
      showToast('正在載入 LINE 開啟連結...', 'info');
      setTimeout(() => {
        showToast('成功加入 SoleStyle 官方 LINE！入群專屬 $100 折扣碼為: 【LINESTYLE100】', 'success');
      }, 1200);
    });
  }

  // Extra triggers inside the page for other pages
  const profileTriggerBtn = document.getElementById('profileTriggerBtn');
  const lineTriggerBtn = document.getElementById('lineTriggerBtn');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const logoLink = document.getElementById('logoLink');
  
  profileTriggerBtn.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  
  lineTriggerBtn.addEventListener('click', () => {
    window.location.hash = '#line';
  });
  
  searchTriggerBtn.addEventListener('click', () => {
    window.location.hash = '#casual';
    setTimeout(() => {
      catalogSearchInput.focus();
    }, 100);
  });
  
  // Extra footer navigation links routing support
  document.querySelectorAll('footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      // If the target is one of our pages
      if (routes[hash.slice(1)]) {
        // Let hashchange trigger router
      } else {
        // Decorational page hooks
        e.preventDefault();
        showToast(`此區塊（${link.innerText}）為示範用靜態連結，感謝您的點閱！`, 'info');
      }
    });
  });
});
