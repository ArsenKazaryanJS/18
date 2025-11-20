document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initPrivacyModal();
    initContactForm();
    updateDynamicDates();
});

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    const acceptBtn = document.getElementById('acceptPrivacy');
    const declineBtn = document.getElementById('declinePrivacy');
    
    if (!modal || !acceptBtn || !declineBtn) return;
    
    const hasAccepted = localStorage && localStorage.getItem('privacyAccepted');
    
    if (!hasAccepted) {
        setTimeout(function() {
            modal.classList.add('active');
        }, 1000);
    }
    
    acceptBtn.addEventListener('click', function() {
        if (localStorage) {
            localStorage.setItem('privacyAccepted', 'true');
        }
        modal.classList.remove('active');
    });
    
    declineBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const consent = document.getElementById('consent');
        
        let isValid = true;
        
        if (!name || !name.value.trim()) {
            isValid = false;
            if (name) name.focus();
        }
        
        if (!email || !email.value.trim() || !isValidEmail(email.value)) {
            isValid = false;
            if (email && !name.value.trim()) email.focus();
        }
        
        if (!message || !message.value.trim()) {
            isValid = false;
            if (message && !name.value.trim() && !email.value.trim()) message.focus();
        }
        
        if (!consent || !consent.checked) {
            isValid = false;
            alert('Please accept the privacy policy to continue.');
            return;
        }
        
        if (isValid) {
            if (sessionStorage) {
                sessionStorage.setItem('formSubmitted', 'true');
            }
            window.location.href = 'success.html';
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updateDynamicDates() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    if (yearElements && yearElements.length > 0) {
        yearElements.forEach(function(element) {
            element.textContent = currentYear;
        });
    }
    
    const lastUpdated = document.querySelector('.last-updated');
    if (lastUpdated) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const dateString = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
        lastUpdated.textContent = dateString;
    }
}
