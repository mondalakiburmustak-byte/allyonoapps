function toggleMenu() {
    const panel = document.getElementById('sidePanel');
    if (panel.style.right === '0px') {
        panel.style.right = '-250px';
        document.getElementById('menu-toggle').innerHTML = '☰ <span id="menutxt">Menu</span>'; // Change icon to menu
        document.getElementById('menu-toggle').style.color = ''; // Reset icon color
    } else {
        panel.style.right = '0px';
        document.getElementById('menu-toggle').innerHTML = '✖ <span id="menutxt">Close</span>'; // Change icon to close
        document.getElementById('menu-toggle').style.color = 'red'; // Change icon color to red
    }
}


function giveDlg() {
    document.querySelector('dialog').show();
}

// js/appPage.js
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setMetaAndFavicon(app) {
    if (app) {
        document.title = `${app.name} - Download and get ${app.bonus} bonus & ${app.referBonus} reward`;
        // Update favicon
        let favicon = document.querySelector("link[rel='icon']");
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = app.logo;
        // Update apple-touch-icon
        let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
        if (!appleIcon) {
            appleIcon = document.createElement('link');
            appleIcon.rel = 'apple-touch-icon';
            appleIcon.sizes = '180x180';
            document.head.appendChild(appleIcon);
        }
        appleIcon.href = app.logo;
    }
}

function renderAppDetails(app) {
    setMetaAndFavicon(app);
    const main = document.getElementById('appDetailsMain');
    if (!app) {
        main.innerHTML = '<h2>App not found</h2><p>The app you are looking for does not exist.</p>';
        return;
    }
    main.innerHTML = `
        <div class="app-details-container">
            <img src="${app.logo}" alt="${app.name}" class="app-icon">
            <h2>${app.name}</h2>
            <p><b>${app.name} Apk</b></p>
            <a href="${app.downloadLink}" class="download-btn">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#0382ac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                <b>Download App</b>
            </a><br>
            <a href="${app.promoCodeLink}" class="promo-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0088cc" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:6px;"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.94 7.342l-1.43 6.764c-.108.48-.39.597-.792.372l-2.19-1.616-1.057 1.018c-.117.117-.215.215-.44.215l.157-2.23 4.062-3.672c.177-.157-.038-.245-.274-.088l-5.022 3.164-2.163-.676c-.47-.147-.48-.47.098-.693l8.457-3.263c.392-.147.735.088.608.693z"/></svg>
                <b>Get Free Promo Code</b>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0088cc" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:6px;"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.94 7.342l-1.43 6.764c-.108.48-.39.597-.792.372l-2.19-1.616-1.057 1.018c-.117.117-.215.215-.44.215l.157-2.23 4.062-3.672c.177-.157-.038-.245-.274-.088l-5.022 3.164-2.163-.676c-.47-.147-.48-.47.098-.693l8.457-3.263c.392-.147.735.088.608.693z"/></svg>
            </a>
            <table>
                <tr><td class="clrfl"><b>Apk Name</b></td><td class="clrfl"><b>${app.name}</b></td></tr>
                <tr><td>Rating</td><td style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.5 5.5,21 7,14.1 2,9.3 9,9"/></svg><span>${app.rating}</span></td></tr>
                <tr><td class="clrfl2">Apk Size</td><td class="clrfl2">${app.size} MB</td></tr>
                <tr><td>Sign Up Bonus</td><td>₹${app.bonus}</td></tr>
                <tr><td class="clrfl2">Minimum Withdrawal</td><td class="clrfl2">₹${app.minWithdraw}</td></tr>
                <tr><td>Refer Bonus</td><td>₹${app.referBonus}</td></tr>
                <tr><td class="clrfl2">Refer Commission</td><td class="clrfl2">${app.referCommission}%</td></tr>
            </table>
        </div>
    `;
}

const appId = getQueryParam('id');
fetch('./data/apps.json')
    .then(res => res.json())
    .then(apps => {
        const app = apps.find(a => String(a.id) === String(appId));
        renderAppDetails(app);
    })
    .catch(() => {
        document.getElementById('appDetailsMain').innerHTML = '<h2>Error loading app details</h2>';
    });