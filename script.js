document.addEventListener('DOMContentLoaded', function () {
    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function () {
            const shop = document.getElementById('shop');
            if (shop) shop.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else alert('Buy now clicked!');
        });
    }

    // Entrance animation: reveal the hero card
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        // small delay so the browser paints initial state before transition
        setTimeout(() => heroCard.classList.add('show'), 120);
    }

    const header = document.querySelector('.site-header');
    if (header) {
        setTimeout(() => header.classList.add('show'), 80);
        const onScroll = () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
            reveals.forEach((el) => observer.observe(el));
        } else {
            reveals.forEach((el) => el.classList.add('show'));
        }
    }

    const productCards = document.querySelectorAll('.product-card');
    const modalEl = document.getElementById('productModal');
    let bsModal = null;
    if (modalEl) {
        bsModal = new bootstrap.Modal(modalEl);
    }
    function showAdded(card) {
        document.querySelectorAll('.product-card.added').forEach((c) => c.classList.remove('added'));
        card.classList.add('overlay-active');
        card.classList.add('added');
        setTimeout(() => {
            card.classList.remove('added');
            card.classList.remove('overlay-active');
        }, 1200);
    }
    productCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.overlay-actions') || e.target.closest('.add-to-cart')) return;
            showAdded(card);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showAdded(card);
            }
        });
        const img = card.querySelector('.product-img');
        if (img) {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                showAdded(card);
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product-card')) {
            document.querySelectorAll('.product-card.overlay-active').forEach((c) => c.classList.remove('overlay-active'));
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.product-card.overlay-active').forEach((c) => c.classList.remove('overlay-active'));
        }
    });

    // Rooms inspiration slider
    const roomSlides = document.querySelectorAll('.rooms-slide');
    const roomDots = document.querySelectorAll('.rooms-dot');
    const prevBtn = document.querySelector('.rooms-arrow-prev');
    const nextBtn = document.querySelector('.rooms-arrow-next');

    let currentRoom = 0;

    function goToRoom(index) {
        if (!roomSlides.length) return;
        const total = roomSlides.length;
        currentRoom = (index + total) % total;
        roomSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentRoom);
        });
        roomDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentRoom);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToRoom(currentRoom + 1));
    }
    roomDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
            goToRoom(idx);
        });
    });
});
