/* ============================================
   Reading Progress Bar
   ============================================ */
(function() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });
})();

/* ============================================
   Navbar Scroll Spy & Glass Effect
   ============================================ */
(function() {
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!nav) return;

    function onScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Glass effect on scroll
        if (scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
})();

/* ============================================
   Scroll Reveal
   ============================================ */
(function() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
})();

/* ============================================
   Button Ripple Effect
   ============================================ */
(function() {
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const existing = button.querySelectorAll('.ripple');
        if (existing.length > 0) {
            existing.forEach(r => r.remove());
        }

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    document.querySelectorAll('.btn-primary, .btn-outline-light, .explorer-btn, .challenge-option, .filter-chip, .easter-egg-btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
})();

/* ============================================
   Projects Carousel
   ============================================ */
(function() {
    const track = document.getElementById('projectsTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    function updateActiveDot() {
        if (!slides.length) return;
        const slideWidth = slides[0].offsetWidth;
        const activeIndex = Math.round(track.scrollLeft / slideWidth);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            const slide = slides[index];
            if (slide) {
                track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
            }
        });
    });

    track.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateActiveDot);
    });

    updateActiveDot();
})();

/* ============================================
   Professional Journey
   ============================================ */
(function() {
    const experiences = [
        {
            role: "Continuous Improvement Supervisor",
            company: "PT Weiss Tech (Kapal Api Group)",
            period: "2026 – Present",
            intro: "Leading business process improvement and operational digitalization initiatives across manufacturing functions.",
            highlights: [
                "Led cross-functional process improvement across Production, Engineering, Procurement, and Support.",
                "Managed Improvement with Benefit governance and benefit verification.",
                "Developed digital workflow systems using Laravel, MySQL, and Microsoft 365.",
                "Facilitated SOP standardization and operational governance.",
                "Collaborated with stakeholders to improve data-driven operational performance."
            ],
            projects: ["Gudang Tools Management System", "Procurement Lead Time Dashboard", "Deadstock Inventory Analytics"]
        },
        {
            role: "Brand Executive",
            company: "PT Agel Langgeng (Kapal Api Group)",
            period: "May – Dec 2025",
            intro: "Executed integrated FMCG marketing campaigns across multiple beverage and confectionery brands.",
            highlights: [
                "Managed ATL, BTL, and digital campaign execution.",
                "Developed creative briefs with Creative and agency partners.",
                "Coordinated agencies, vendors, event organizers, and KOL collaborations.",
                "Conducted NielsenIQ, competitor, and consumer insight analysis.",
                "Performed retail monitoring and market visits with Sales."
            ],
            projects: ["Brand Rejuvenation — Relaxa Anime Edition", "BTL Activation — Kapal Api Coffee Candy"]
        },
        {
            role: "NPD Supervisor",
            company: "PT Agel Langgeng (Kapal Api Group)",
            period: "Jan – Apr 2025",
            intro: "Managed end-to-end new product development from concept validation to commercialization readiness.",
            highlights: [
                "Coordinated launch readiness across R&D, PPIC, Packaging, and Supply Chain.",
                "Managed BPOM, Halal, and product documentation.",
                "Led packaging specification and production planning discussions.",
                "Analyzed consumer insights and demand forecasting."
            ],
            projects: []
        },
        {
            role: "Process Improvement Supervisor",
            company: "PT Weiss Tech (Kapal Api Group)",
            period: "Jul – Dec 2024",
            intro: "Identified operational bottlenecks and redesigned standardized business processes across manufacturing departments.",
            highlights: [
                "Conducted process mapping and root cause analysis.",
                "Redesigned SOPs and work instructions.",
                "Implemented cross-functional improvement initiatives.",
                "Strengthened operational governance and workflow consistency."
            ],
            projects: []
        }
    ];

    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailPanel = document.getElementById('detailPanel');

    function buildDetailHTML(exp) {
        let projectsHTML = '';
        if (exp.projects && exp.projects.length > 0) {
            projectsHTML = `
                <div class="detail-section mt-3">
                    <h6 class="fw-bold detail-heading"><i class="bi bi-folder-check me-2"></i>Related Projects</h6>
                    <div class="project-tags">
                        ${exp.projects.map(p => `<span class="project-tag">${p}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="detail-content" id="detailContent">
                <div class="detail-header mb-3">
                    <h4 class="fw-bold mb-1">${exp.role}</h4>
                    <p class="mb-1 opacity-75">${exp.company}</p>
                    <span class="period-badge">${exp.period}</span>
                </div>
                <div class="detail-section">
                    <h6 class="fw-bold detail-heading"><i class="bi bi-info-circle me-2"></i>Overview</h6>
                    <p class="mb-0">${exp.intro}</p>
                </div>
                <div class="detail-section mt-3">
                    <h6 class="fw-bold detail-heading"><i class="bi bi-stars me-2"></i>Highlights</h6>
                    <ul class="detail-list">
                        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
                ${projectsHTML}
            </div>
        `;
    }

    function switchExperience(index) {
        if (!detailPanel) return;
        const content = detailPanel.querySelector('.detail-content');
        if (!content) return;

        content.classList.add('fade-out');

        setTimeout(() => {
            detailPanel.innerHTML = buildDetailHTML(experiences[index]);
            const newContent = detailPanel.querySelector('.detail-content');
            if (newContent) {
                newContent.classList.add('fade-in');
            }
        }, 300);
    }

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const index = parseInt(item.dataset.index);
            switchExperience(index);
        });
    });
})();

/* ============================================
   Hero Interactions
   ============================================ */
(function() {
    /* Rotating Title */
    const rotatorTexts = document.querySelectorAll('.rotator-text');
    let currentRotator = 0;
    if (rotatorTexts.length > 0) {
        setInterval(() => {
            rotatorTexts[currentRotator].classList.remove('active');
            currentRotator = (currentRotator + 1) % rotatorTexts.length;
            rotatorTexts[currentRotator].classList.add('active');
        }, 2800);
    }

    /* KPI Count-Up */
    const kpiCards = document.querySelectorAll('.kpi-card');
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const valueEl = card.querySelector('.kpi-value');
            const target = parseInt(card.dataset.target);
            const suffix = card.dataset.suffix || '';

            if (card.dataset.count === 'false') {
                valueEl.style.opacity = '0';
                valueEl.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    valueEl.style.transition = 'all 0.5s ease';
                    valueEl.style.opacity = '1';
                    valueEl.style.transform = 'translateY(0)';
                }, 100);
                kpiObserver.unobserve(card);
                return;
            }

            if (isNaN(target)) return;

            let current = 0;
            const duration = 1500;
            const step = target / (duration / 16);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                valueEl.textContent = Math.floor(current) + suffix;
            }, 16);

            kpiObserver.unobserve(card);
        });
    }, { threshold: 0.5 });

    kpiCards.forEach(card => kpiObserver.observe(card));
})();

/* ============================================
   Achievement Counter Animation
   ============================================ */
(function() {
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    if (!achievementNumbers.length) return;

    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            if (isNaN(target)) return;

            let current = 0;
            const duration = 2000;
            const step = target / (duration / 16);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + suffix;
            }, 16);

            achievementObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    achievementNumbers.forEach(c => achievementObserver.observe(c));
})();

/* ============================================
   Awards Breakdown Counter Animation
   ============================================ */
(function() {
    const counters = document.querySelectorAll('.award-counter');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1800;
            const step = target / (duration / 16);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + suffix;
            }, 16);

            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
})();

/* ============================================
   Awards Filter
   ============================================ */
(function() {
    const filterButtons = document.querySelectorAll('.filter-chip');
    const awardCards = document.querySelectorAll('.award-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            awardCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.remove('fade-out'), 10);
                } else {
                    const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
                    if (categories.includes(filter)) {
                        card.classList.remove('hidden');
                        setTimeout(() => card.classList.remove('fade-out'), 10);
                    } else {
                        card.classList.add('fade-out');
                        setTimeout(() => card.classList.add('hidden'), 350);
                    }
                }
            });
        });
    });
})();

/* ============================================
   Personality Explorer
   ============================================ */
(function() {
    const buttons = document.querySelectorAll('.explorer-btn');
    const contents = document.querySelectorAll('.explorer-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const persona = btn.dataset.persona;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            contents.forEach(c => {
                c.classList.remove('active');
                if (c.dataset.persona === persona) {
                    c.classList.add('active');
                }
            });
        });
    });
})();

/* ============================================
   Mini Continuous Improvement Challenge
   ============================================ */
(function() {
    const questionEl = document.getElementById('challengeQuestion');
    const resultEl = document.getElementById('challengeResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const retryBtn = document.getElementById('retryChallenge');
    const options = document.querySelectorAll('.challenge-option');

    if (!questionEl || !resultEl) return;

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const isCorrect = opt.dataset.correct === 'true';

            options.forEach(o => {
                if (o.dataset.correct === 'true') {
                    o.classList.add('correct');
                } else if (o === opt && !isCorrect) {
                    o.classList.add('wrong');
                }
                o.disabled = true;
            });

            setTimeout(() => {
                questionEl.classList.add('d-none');
                resultEl.classList.remove('d-none');

                if (isCorrect) {
                    resultIcon.innerHTML = '<i class="bi bi-check-circle-fill success"></i>';
                    resultTitle.textContent = 'Excellent!';
                    resultText.textContent = 'Eliminate Waste is the correct lean principle. Excessive waiting is one of the eight wastes (Muda). By identifying and removing the root cause of waiting time — such as imbalanced workloads, poor scheduling, or unnecessary approval steps — you improve flow without adding cost or inventory.';
                } else {
                    resultIcon.innerHTML = '<i class="bi bi-x-circle-fill error"></i>';
                    resultTitle.textContent = 'Not quite!';
                    resultText.textContent = 'The correct answer is Eliminate Waste. Adding more operators increases cost without addressing the root cause, and increasing inventory only hides the problem. Lean thinking focuses on removing waste to improve flow naturally.';
                }
            }, 600);
        });
    });

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            options.forEach(o => {
                o.classList.remove('correct', 'wrong');
                o.disabled = false;
            });
            resultEl.classList.add('d-none');
            questionEl.classList.remove('d-none');
        });
    }
})();

/* ============================================
   Internship Bento Cards
   ============================================ */
(function() {
    const cards = document.querySelectorAll('.bento-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const toggle = card.querySelector('.bento-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = card.classList.contains('expanded');

            // Close all other cards
            cards.forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });

            card.classList.toggle('expanded', !isExpanded);
        });

        // Also allow clicking the card body to expand
        card.addEventListener('click', (e) => {
            if (e.target.closest('.bento-toggle')) return;
            const isExpanded = card.classList.contains('expanded');
            cards.forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.toggle('expanded', !isExpanded);
        });
    });
})();

/* ============================================
   Speaker Stage Cards
   ============================================ */
(function() {
    const cards = document.querySelectorAll('.speaker-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const toggle = card.querySelector('.speaker-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = card.classList.contains('expanded');

            cards.forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });

            card.classList.toggle('expanded', !isExpanded);
            toggle.textContent = isExpanded ? 'View Session' : 'Hide Session';
        });
    });
})();

/* ============================================
   Leadership Map
   ============================================ */
(function() {
    const map = document.querySelector('.leadership-map');
    const nodes = document.querySelectorAll('.org-node');
    const panels = document.querySelectorAll('.leadership-panel-content');
    if (!nodes.length || !panels.length) return;

    // Show first by default
    nodes[0].classList.add('active');
    if (map) map.classList.add('lines-active');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const index = node.dataset.org;

            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            panels.forEach(p => {
                p.classList.remove('active');
                if (p.dataset.org === index) {
                    p.classList.add('active');
                }
            });
        });

        node.addEventListener('mouseenter', () => {
            if (map) map.classList.add('lines-active');
        });

        node.addEventListener('mouseleave', () => {
            const anyActive = Array.from(nodes).some(n => n.classList.contains('active'));
            if (!anyActive && map) map.classList.remove('lines-active');
        });
    });
})();

/* ============================================
   Easter Egg
   ============================================ */
(function() {
    const btn = document.getElementById('easterEggBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('easterEggModal'));
        modal.show();
    });
})();
