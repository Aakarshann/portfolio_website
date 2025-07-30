document.addEventListener('DOMContentLoaded', function() {
    /*=============== HEADER & NAV SCROLL ===============*/
    function scrollHeader() {
        const header = document.getElementById('header');
        if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);

    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight, sectionTop = current.offsetTop - 58,
                  sectionId = current.getAttribute('id'),
                  navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if(navLink) navLink.classList.add('active-link');
            } else {
                if(navLink) navLink.classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /*=============== DARK LIGHT THEME ===============*/
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme', iconTheme = 'uil-sun';
    const selectedTheme = localStorage.getItem('selected-theme'), selectedIcon = localStorage.getItem('selected-icon');
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';
    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    /*=============== SKILLS ACCORDION ===============*/
    const skillsHeader = document.querySelectorAll('.skills__header');
    function toggleSkills() {
        let content = this.nextElementSibling;
        if(content.style.height){
            content.style.height = null;
            this.parentElement.classList.remove('skills-open');
        } else {
            this.parentElement.classList.add('skills-open');
            content.style.height = content.scrollHeight + "px";
            const skillPercentages = content.querySelectorAll('.skills__percentage');
            skillPercentages.forEach(skill => {
                skill.style.width = skill.getAttribute('data-width');
            });
        }
    }
    skillsHeader.forEach((el) => el.addEventListener('click', toggleSkills));

    /*=============== QUALIFICATION TABS ===============*/
    const tabs = document.querySelectorAll('[data-target]'),
          tabContents = document.querySelectorAll('[data-content]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualification__content-active');
            });
            target.classList.add('qualification__content-active');
            tabs.forEach(t => {
                t.classList.remove('qualification__active');
            });
            tab.classList.add('qualification__active');
        });
    });

    /*=============== PROJECT FILTERING ===============*/
    const filterContainer = document.querySelector(".projects__filters"),
          projectCards = document.querySelectorAll(".project__card");
    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            if(e.target.classList.contains("projects__filter-item")){
                filterContainer.querySelector(".active-filter").classList.remove("active-filter");
                e.target.classList.add("active-filter");
                const filterValue = e.target.getAttribute("data-filter");
                projectCards.forEach(card => {
                    if(card.classList.contains(filterValue.replace('.','')) || filterValue === 'all'){
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    // ScrollReveal is loaded externally
    const sr = ScrollReveal({ origin: 'top', distance: '60px', duration: 2000, delay: 200 });
    sr.reveal(`.home__data, .about__container, .skills__container, .qualification__container, .projects__container, .contact__container`);

    /*=============== CONTACT FORM ===============*/
    const contactForm = document.getElementById('contact-form'),
          contactMessage = document.getElementById('contact-message');
    const sendEmail = (e) => {
        e.preventDefault();
        contactMessage.textContent = 'Message sent ✅';
        setTimeout(() => { contactMessage.textContent = ''; }, 5000);
        contactForm.reset();
    };
    if(contactForm) contactForm.addEventListener('submit', sendEmail);

    /*=============== SHOW SCROLL UP ===============*/
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
    }
    window.addEventListener('scroll', scrollUp);

    /*=============== CUSTOM CURSOR ===============*/
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button, .projects__filter-item, .skills__header, .qualification__button');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        links.forEach(link => {
            link.addEventListener('mouseover', () => cursor.classList.add('expand'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
        });
    }

    /*=============== GEMINI API BIO GENERATOR ===============*/
    const bioModal = document.getElementById('bio-modal');
    const generateBtn = document.getElementById('generate-bio-btn');
    const copyBtn = document.getElementById('copy-bio-btn');
    const bioOutput = document.getElementById('bio-output');
    const loader = bioModal.querySelector('.loader');

    // --- Modal Logic ---
    const openModal = () => bioModal.classList.add('modal-active');
    const closeModal = () => bioModal.classList.remove('modal-active');
    bioModal.querySelector('.modal__close').addEventListener('click', closeModal);

    // --- Copy to Clipboard ---
    copyBtn.addEventListener('click', () => {
        const textArea = document.createElement('textarea');
        textArea.value = bioOutput.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });

    // --- Generate Bio Logic ---
    generateBtn.addEventListener('click', async () => {
        openModal();
        loader.style.display = 'block';
        bioOutput.textContent = '';
        copyBtn.style.display = 'none';

        // 1. Gather information from the page
        const name = document.querySelector('.home__title').textContent;
        const title = document.querySelector('.home__subtitle').textContent;
        const description = document.querySelector('.about__description').textContent.trim();
        
        const skillsList = [];
        document.querySelectorAll('.skills__name').forEach(skill => {
            skillsList.push(skill.textContent);
        });

        const experienceList = [];
        document.querySelectorAll('#experience .qualification__data').forEach(job => {
            const jobTitle = job.querySelector('.qualification__title').textContent;
            const company = job.querySelector('.qualification__subtitle').textContent;
            experienceList.push(`${jobTitle} at ${company}`);
        });

        // 2. Construct the prompt
        const prompt = `\nBased on the following information, write a professional and engaging third-person biography (around 80-100 words) for a portfolio website. Highlight key skills and experiences.\n\n- Name: ${name}\n- Title: ${title}\n- Personal Summary: ${description}\n- Key Skills: ${skillsList.join(', ')}\n- Professional Experience: ${experienceList.join('; ')}\n\nThe tone should be confident, professional, and forward-looking.\n`;

        // 3. Call the Gemini API
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                bioOutput.textContent = text; 
            } else {
               bioOutput.textContent = 'Sorry, I could not generate a bio at this time. The response from the AI was empty.';
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            bioOutput.textContent = 'An error occurred while generating the bio. Please check the console for details.';
        } finally {
            loader.style.display = 'none';
            copyBtn.style.display = 'inline-block';
        }
    });
});
