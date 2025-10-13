
        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburgerMenu = document.getElementById('hamburgerMenu');

        mobileMenuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                hamburgerMenu.classList.add('active');
            } else {
                mobileMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('active');
            });
        });

        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark')) {
                body.classList.remove('dark');
                body.classList.add('light');
                body.className = body.className.replace('bg-gray-900 text-white', 'bg-gray-50 text-gray-900');
                themeIcon.className = 'fas fa-sun text-yellow-500';
            } else {
                body.classList.remove('light');
                body.classList.add('dark');
                body.className = body.className.replace('bg-gray-50 text-gray-900', 'bg-gray-900 text-white');
                themeIcon.className = 'fas fa-moon text-blue-400';
            }
        });

        // Animated code background
        const codeLines = [
            'const developer = { name: "Daffa Rahman", skills: ["Laravel", "Node.js", "Python", "SQL"] };',
            'function createAwesomeApp() { return "Amazing web experience"; }',
            'import React from "react"; export default Portfolio;',
            'const express = require("express"); app.listen(3000);',
            'SELECT * FROM projects WHERE status = "completed";',
            'git commit -m "Added new feature"; git push origin main;',
            'docker build -t myapp .; docker run -p 3000:3000 myapp;',
            'const api = await fetch("/api/data"); return api.json();',
            'npm install react-router-dom; npm start;',
            'python manage.py runserver; echo "Server running";'
        ];

        function createCodeBackground() {
            const codeBg = document.getElementById('codeBg');
            
            setInterval(() => {
                const line = document.createElement('div');
                line.className = 'code-line';
                line.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
                line.style.top = Math.random() * 100 + 'vh';
                line.style.animationDelay = Math.random() * 2 + 's';
                line.style.animationDuration = (15 + Math.random() * 10) + 's';
                
                codeBg.appendChild(line);
                
                setTimeout(() => {
                    if (line.parentNode) {
                        line.parentNode.removeChild(line);
                    }
                }, 25000);
            }, 2000);
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Project data
        const projects = {
            ecommerce: {
                title: 'E-Commerce Platform',
                description: 'A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard. The platform supports multiple payment methods, real-time inventory tracking, and responsive design for optimal mobile experience.',
                specs: [
                    'User authentication and authorization system',
                    'Product catalog with search and filtering',
                    'Shopping cart and checkout process',
                    'Payment integration with Stripe',
                    'Order tracking and management',
                    'Admin dashboard for inventory management',
                    'Responsive design for all devices',
                    'Real-time notifications'
                ],
                tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
                images: [
                    { color: 'from-blue-500 to-green-600', icon: 'fas fa-shopping-cart' },
                    { color: 'from-green-500 to-blue-500', icon: 'fas fa-credit-card' },
                    { color: 'from-teal-500 to-emerald-500', icon: 'fas fa-chart-line' }
                ]
            },
            taskmanager: {
                title: 'Task Management App',
                description: 'A collaborative task management application designed for teams and individuals. Features real-time collaboration, project organization, deadline tracking, file attachments, and comprehensive reporting. The app includes drag-and-drop functionality, customizable workflows, and integration with popular productivity tools.',
                specs: [
                    'Real-time collaboration with WebSocket',
                    'Drag-and-drop task organization',
                    'Project and team management',
                    'Deadline tracking and notifications',
                    'File attachment and sharing',
                    'Custom workflow creation',
                    'Reporting and analytics dashboard',
                    'Mobile-first responsive design'
                ],
                tech: ['Vue.js', 'Express', 'Redis', 'Socket.io', 'PostgreSQL', 'AWS S3'],
                images: [
                    { color: 'from-green-500 to-teal-600', icon: 'fas fa-tasks' },
                    { color: 'from-blue-500 to-indigo-600', icon: 'fas fa-users' },
                    { color: 'from-orange-500 to-red-500', icon: 'fas fa-chart-bar' }
                ]
            }
        };

        // Project navigation
        let currentSlide = 0;
        let slideInterval;

        function openProject(projectId) {
            const project = projects[projectId];
            if (!project) return;

            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('projectDetail').classList.remove('hidden');

            // Update project details
            document.getElementById('projectTitle').textContent = project.title;
            document.getElementById('projectDescription').textContent = project.description;

            // Update specs
            const specsList = document.getElementById('projectSpecs');
            specsList.innerHTML = '';
            project.specs.forEach(spec => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check text-green-400 mr-2"></i>${spec}`;
                specsList.appendChild(li);
            });

            // Update tech stack
            const techContainer = document.getElementById('projectTech');
            techContainer.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-semibold';
                span.textContent = tech;
                techContainer.appendChild(span);
            });

            // Setup carousel
            setupCarousel(project.images);
        }

        function closeProject() {
            document.getElementById('projectDetail').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        function setupCarousel(images) {
            const carousel = document.getElementById('projectCarousel');
            const dots = document.getElementById('carouselDots');
            
            carousel.innerHTML = '';
            dots.innerHTML = '';
            currentSlide = 0;

            images.forEach((image, index) => {
                // Create slide
                const slide = document.createElement('div');
                slide.className = `carousel-slide bg-gradient-to-br ${image.color} flex items-center justify-center text-white text-8xl ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<i class="${image.icon}"></i>`;
                carousel.appendChild(slide);

                // Create dot
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(index));
                dots.appendChild(dot);
            });

            // Auto-advance slides
            slideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }

        function goToSlide(index) {
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.carousel-dot');

            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            const slides = document.querySelectorAll('.carousel-slide');
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }

        // Initialize
        createCodeBackground();

        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98cdf29e22977550',t:'MTc2MDE4MTQxMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
