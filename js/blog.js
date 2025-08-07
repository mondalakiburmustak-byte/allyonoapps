const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', function () {
    const appList = document.getElementById('appList');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    let appsData = [];
    let currentIndex = 0;
    const appsPerPage = 10;
    let isSearching = false;

    function createAppCard(app) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
                <a href="${app.link}" class="blog-card-link">
                    <img src="./logos/${app.logo}" alt="${app.title}" class="blog-card-image" />
                    <div class="blog-card-content">
                        <h3 class="blog-card-title">${app.title}</h3>
                        <p class="blog-card-excerpt">
                            ${app.content}
                        </p>
                        <div class="blog-card-meta">
                            <span class="blog-card-date">${app.date}</span>
                            <span class="blog-card-readmore">Read More &rarr;</span>
                        </div>
                    </div>
                </a>
        `;
        return card;
    }

    function renderApps(reset = false) {
        if (reset) {
            appList.innerHTML = '';
            currentIndex = 0;
        }
        const end = Math.min(currentIndex + appsPerPage, appsData.length);
        for (let i = currentIndex; i < end; i++) {
            appList.appendChild(createAppCard(appsData[i]));
        }
        currentIndex = end;
        seeMoreBtn.style.display = (!isSearching && currentIndex < appsData.length) ? 'inline-block' : 'none';
    }

    seeMoreBtn.addEventListener('click', function () {
        renderApps();
    });


    fetch('./data/blogs.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load database files.');
            return res.json();
        })
        .then(data => {
            appsData = data;
            renderApps(true);
        })
        .catch(err => {
            appList.innerHTML = '<p style="color:red;">Could not load blogs. Reload or try again.</p>';
            seeMoreBtn.style.display = 'none';
        });
});