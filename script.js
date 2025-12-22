// Function to populate the portfolio with Modern UI
function populatePortfolio(portfolioData) {
    // --- Personal Information ---
    document.title = `${portfolioData.personal.name} | ${portfolioData.personal.title}`;
    
    // Logo and Hero Text
    document.getElementById('logoName').textContent = portfolioData.personal.name.replace(" ", "");
    document.getElementById('heroName').textContent = portfolioData.personal.name;
    document.getElementById('heroTitle').textContent = portfolioData.personal.title;
    document.getElementById('profileImage').src = portfolioData.personal.profileImage;
    document.getElementById('footerName').textContent = portfolioData.personal.name;
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('aboutText').innerHTML = portfolioData.personal.about;

    // Contact Info (Hero)
    const contactContainer = document.getElementById('contactInfo');
    const emailHtml = `<a href="mailto:${portfolioData.personal.email}" class="flex items-center hover:text-primary transition-colors"><i class="fas fa-envelope mr-2"></i> ${portfolioData.personal.email}</a>`;
    const locationHtml = `<span class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i> ${portfolioData.personal.location}</span>`;
    // Format phone
    const phoneClean = portfolioData.personal.phone.replace(/[\s\-()]/g, '');
    const phoneHtml = `<a href="tel:${phoneClean}" class="flex items-center hover:text-primary transition-colors"><i class="fas fa-phone mr-2"></i> ${portfolioData.personal.phone}</a>`;
    
    contactContainer.innerHTML = `${emailHtml} ${phoneHtml} ${locationHtml}`;

    // --- Social Links ---
    const heroSocial = document.getElementById('heroSocialLinks');
    const footerSocial = document.getElementById('footerSocialLinks');
    
    portfolioData.social.forEach(social => {
        // Hero Socials
        const link = document.createElement('a');
        link.href = social.url;
        link.target = "_blank";
        link.className = "text-slate-400 hover:text-white text-2xl transition-transform hover:-translate-y-1";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        heroSocial.appendChild(link);
        
        // Footer Socials
        const fLink = link.cloneNode(true);
        fLink.className = "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-dark transition-all";
        footerSocial.appendChild(fLink);
    });

    // --- Stats ---
    const statsContainer = document.getElementById('statsContainer');
    portfolioData.stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = "text-center";
        div.innerHTML = `
            <div class="text-4xl font-bold text-white mb-1">${stat.number}</div>
            <div class="text-sm text-slate-400 uppercase tracking-wider font-mono">${stat.text}</div>
        `;
        statsContainer.appendChild(div);
    });

    // --- Skills ---
    const skillsGrid = document.getElementById('skillsGrid');
    portfolioData.skills.forEach(skill => {
        const span = document.createElement('span');
        // Modern Pill Design
        span.className = "px-4 py-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 hover:border-primary rounded-lg text-slate-300 text-sm transition-all cursor-default select-none";
        span.textContent = skill;
        skillsGrid.appendChild(span);
    });

    // --- Experience (Vertical Timeline) ---
    const experienceTimeline = document.getElementById('experienceTimeline');
    portfolioData.experience.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = "relative pl-8 md:pl-12 pb-12 group"; // Vertical spacing
        
        // Timeline Dot
        const dot = document.createElement('div');
        dot.className = "absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-dark bg-slate-600 group-hover:bg-primary transition-colors timeline-dot";
        item.appendChild(dot);

        // Content Card
        const card = document.createElement('div');
        card.className = "glass-card p-6 rounded-xl relative";
        
        // Header
        const header = document.createElement('div');
        header.className = "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4";
        header.innerHTML = `
            <div>
                <h3 class="text-xl font-bold text-white">${exp.position}</h3>
                <p class="text-primary font-medium">${exp.company}</p>
            </div>
            <span class="mt-2 sm:mt-0 text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                ${exp.duration}
            </span>
        `;
        card.appendChild(header);

        // Responsibilities
        const ul = document.createElement('ul');
        ul.className = "space-y-2 text-slate-400 text-sm list-disc list-inside marker:text-slate-600";
        exp.responsibilities.forEach(resp => {
            const li = document.createElement('li');
            li.innerHTML = resp;
            ul.appendChild(li);
        });
        card.appendChild(ul);

        item.appendChild(card);
        experienceTimeline.appendChild(item);
    });

    // --- Education ---
    const eduGrid = document.getElementById('eduGrid');
    portfolioData.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = "glass-card p-6 rounded-xl border-l-4 border-primary";
        div.innerHTML = `
            <h3 class="text-lg font-bold text-white">${edu.degree}</h3>
            <p class="text-slate-400">${edu.institution}</p>
            <p class="text-xs text-slate-500 font-mono mt-2">${edu.duration}</p>
        `;
        eduGrid.appendChild(div);
    });

    // --- Certifications ---
    const certGrid = document.getElementById('certGrid');
    portfolioData.certification.forEach(cert => {
        const div = document.createElement('div');
        div.className = "glass-card p-6 rounded-xl flex items-start gap-4";
        div.innerHTML = `
            <div class="mt-1 text-secondary"><i class="fas fa-certificate text-xl"></i></div>
            <div>
                <h3 class="text-white font-medium leading-tight">${cert.name}</h3>
                <p class="text-sm text-slate-500 mt-1">${cert.institution}</p>
            </div>
        `;
        certGrid.appendChild(div);
    });
}

// --- Main Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    // 1. Fetch Data
    const json_version = new Date().getTime();
    fetch('data.json?v=' + json_version)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(portfolioData => {
            populatePortfolio(portfolioData);
            initUIInteractions();
        })
        .catch(error => {
            console.error('Error loading portfolio data:', error);
            document.body.innerHTML = `<div class="text-center p-10 text-red-500 bg-dark h-screen flex items-center justify-center">Failed to load portfolio data.</div>`;
        });
});

// --- UI Interactions ---
function initUIInteractions() {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Mobile Menu Logic
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Toggle menu open/close when clicking the hamburger button
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // NEW: Close menu when clicking ANY link inside the mobile menu
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 3. Contact Form Logic
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzVC8R0PBbuvUoffVVKIwKhxLBglYFLdPFScC-NNGQZ4WM2UemjUu44rytcKjWgGItgyQ/exec';
    const form = document.forms['contact-form'];
    const overlay = document.getElementById('sendingOverlay');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if(overlay) {
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
            }

            const formData = {
                Name: form.querySelector('[name="Name"]').value,
                Email: form.querySelector('[name="Email"]').value,
                Mobile: form.querySelector('[name="Mobile"]').value,
                Subject: form.querySelector('[name="Subject"]').value,
                Message: form.querySelector('[name="Message"]').value
            };

            fetch(scriptURL, { 
                method: 'POST', 
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(() => {
                if(overlay) {
                    overlay.classList.add('hidden');
                    overlay.classList.remove('flex');
                }
                alert("Message Sent! I'll get back to you shortly.");
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                if(overlay) overlay.classList.add('hidden');
                alert("Error sending message. Please try again.");
            });
        });
    }
}