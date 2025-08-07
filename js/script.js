const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const appList = document.getElementById('appList');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const appSearchInput = document.getElementById('appSearchInput');
    const showSearchBtn = document.getElementById('showSearchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    let appsData = [];
    let currentIndex = 0;
    const appsPerPage = 20;
    let isSearching = false;

    function createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <img src="${app.logo}" alt="${app.name}">
            <div>
                <h3>${app.name}</h3>
                <p>🔥 <span id="reddish">Bonus Upto ₹${app.bonus}</span> <br> 💥 <span>Min. Withdraw ₹${app.minWithdraw}</span></p>
                <a href="${app.downloadLink}">Download</a>&nbsp;&nbsp;
                <a href="../appDetails.html?id=${app.id}" style="background-color: #0382ac;" class="more-info-btn">More Info</a>
            </div>
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

    // Search functionality
    showSearchBtn.addEventListener('click', function () {
        appSearchInput.style.display = 'block';
        closeSearchBtn.style.display = 'flex';
        appSearchInput.focus();
        showSearchBtn.style.display = 'none';
        isSearching = true;
        seeMoreBtn.style.display = 'none';
    });
    closeSearchBtn.addEventListener('click', function () {
        appSearchInput.value = '';
        appSearchInput.style.display = 'none';
        showSearchBtn.style.display = 'block';
        closeSearchBtn.style.display = 'none';
        isSearching = false;
        renderApps(true);
    });
    appSearchInput.addEventListener('input', function () {
        const query = appSearchInput.value.toLowerCase();
        if (!query) {
            isSearching = false;
            renderApps(true);
            return;
        }
        isSearching = true;
        const filtered = appsData.filter(app =>
            app.name.toLowerCase().includes(query) ||
            (app.bonus && app.bonus.toLowerCase().includes(query)) ||
            (app.minWithdraw && app.minWithdraw.toLowerCase().includes(query)) ||
            (app.size && app.size.toLowerCase().includes(query))
        );
        appList.innerHTML = '';
        filtered.forEach(app => appList.appendChild(createAppCard(app)));
        seeMoreBtn.style.display = 'none';
    });

    fetch('./data/apps.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load apps.json');
            return res.json();
        })
        .then(data => {
            appsData = data;
            renderApps(true);
        })
        .catch(err => {
            appList.innerHTML = '<p style="color:red;">Could not load apps. Reload and try again.</p>';
            seeMoreBtn.style.display = 'none';
        });
});
