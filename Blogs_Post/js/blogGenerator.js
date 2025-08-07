
let sectionCount = 0;

function addSection() {
  const container = document.getElementById('sectionsContainer');
  const div = document.createElement('div');
  div.className = 'section-block';
  div.setAttribute('data-section', sectionCount);
  div.innerHTML = `
    <h3>Section ${sectionCount + 1}</h3>
    <label>Heading: <input type="text" name="heading${sectionCount}"></label>
    <label>Heading Color:
      <input type="text" name="headingColor${sectionCount}" placeholder="e.g. red or rgb(255,0,0)" list="colorList" value="#0382ac">
      <input type="color" onchange="this.previousElementSibling.value = this.value">
    </label>
    <label>Content:
      <textarea name="content${sectionCount}" rows="4"></textarea>
    </label>
    <label>Content Color:
      <input type="text" name="contentColor${sectionCount}" placeholder="e.g. black or #333" list="colorList" value="#000">
      <input type="color" onchange="this.previousElementSibling.value = this.value">
    </label>
    <button type="button" onclick="deleteSection(${sectionCount})" class="delete-btn">Delete This Section</button>
  `;
  container.appendChild(div);
  sectionCount++;
}

function deleteSection(index) {
  const block = document.querySelector(`[data-section='${index}']`);
  if (block) block.remove();
}

document.getElementById('blogForm').addEventListener('submit', function (e) {
  e.preventDefault();
  generateHTML(true);
});

function generateHTML(download = false) {
  const title = document.getElementById('mainTitle').value;
  const titleColor = document.getElementById('titleColor').value;
  const date = document.getElementById('publishDate').value;
  const imageName = document.getElementById('imageName').value;

  let articleContent = `
    <img src="./logos/${imageName}" alt="All Yono Apps Logo" style="width: 100%; max-height: 260px; object-fit: contain; background: #f4f7f8; border-bottom: 1px solid #eee;">
    <div style="padding: 32px 24px 24px 24px;">
      <h1 style="font-size: 2rem; color: ${titleColor}; margin-bottom: 12px;">${title}</h1>
      <div style="color: #888; font-size: 1rem; margin-bottom: 24px;">Published: ${date}</div>`;

  document.querySelectorAll('.section-block').forEach((section, i) => {
    const heading = section.querySelector(`[name='heading${i}']`)?.value || "";
    const headingColor = section.querySelector(`[name='headingColor${i}']`)?.value || "#000";
    const content = section.querySelector(`[name='content${i}']`)?.value || "";
    const contentColor = section.querySelector(`[name='contentColor${i}']`)?.value || "#000";

    articleContent += `
      <h2 style="color: ${headingColor}; margin-top: 28px;">${heading}</h2>
      <p style="color: ${contentColor};">${content}</p>`;
  });

  articleContent += `<hr style="margin: 32px 0;">
        <div style="color: #888; font-size: 1rem;">
          <strong>Ready to get started?</strong> <br>
          Explore our <a href="index.html" style="color: #0382ac; text-decoration: underline;">full app list</a> and start earning with All Yono Apps today!
        </div></div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - allyonoapps.xyz</title>
  <link rel="apple-touch-icon" sizes="180x180" href="./header/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="./header/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="./header/favicon-16x16.png">
  <link rel="manifest" href="./header/site.webmanifest">
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/blogs.css" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030088667236998" crossorigin="anonymous"></script>
</head>
<body>
  <header><a href="index.html">
      <div class="logo">
        <img src="./logos/mainLogo.png" alt="Logo">
        <h4>All Yono Apps</h4>
      </div>
    </a>
    <nav id="navLinks">
      <a href="index.html">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>Home
      </a>
      <a href="about.html">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>About
      </a>
      <a href="contact.html">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>Contact Us
      </a>
      <a href="disclaimer.html">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>Disclaimer
      </a>
      <a href="blogs.html" style="background-color: #4d5f565f;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>Blogs
      </a>
    </nav>
    <div class="menu-toggle" id="menuToggle">&#9776;</div></header>
  <main>
    <article class="blog-post-hero" style="max-width: 800px; margin: 40px auto 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(3,130,172,0.07); overflow: hidden; border: 1px solid #e0e0e0;">
      ${articleContent}
    </article>
  </main> <br/>
  <footer><div class="footer-links"
      style="margin-bottom:12px; display:flex; flex-wrap:wrap; justify-content:center; gap:10px;">
      <a href="privacy.html" class="footer-link-btn">Privacy Policy</a>
      <a href="terms.html" class="footer-link-btn">Terms of Service</a>
      <a href="contact.html" class="footer-link-btn">Contact Us</a>
      <a href="disclaimer.html" class="footer-link-btn">Disclaimer</a>
    </div>
    <div class="footer-socials" style="margin-bottom:12px;">
      <a href="https://t.me/allyonoappsxyz" target="_blank" title="Telegram"
        style="margin:0 6px; color:#fff;"><img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram"
          style="width:22px; vertical-align:middle; filter:invert(1);"></a>
      <a href="https://whatsapp.com/channel/0029VbAo4hL0G0XqcQbj3I24" target="_blank" title="WhatsApp"
        style="margin:0 6px; color:#fff;"><img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp"
          style="width:22px; vertical-align:middle; filter:invert(1);"></a>
      <a href="mailto:allyonoapps@zohomail.in" title="Email" style="margin:0 6px; color:#fff;"><img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Email"
          style="width:22px; vertical-align:middle; filter:invert(1);"></a>
    </div>
    <p class="footertext">&copy; 2025 Akibur Mustak Mondal. All rights reserved.</p>
    <p class="footertext">Designed by Ganesh Kaity.</p></footer>
    <div class="floating-btns">
    <a href="https://whatsapp.com/channel/0029VbAo4hL0G0XqcQbj3I24" target="_blank" title="WhatsApp"
      style="display:inline-block;background:#25D366;padding:6px 14px;color:#fff;font-weight:500;text-decoration:none;border-radius: 30px;font-weight: 600;font-size: 16px;box-shadow: 0 0 10px 3px #1fb556; border-color: #1d984a3a; border-width: 2px; border: 2px solid #2396233c;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp"
        style="width:24px;vertical-align:middle;margin-right:6px;filter:invert(1);">Join Us
    </a>
    <a href="https://t.me/allyonoappsxyz" target="_blank" title="Telegram"
      style="display:inline-block;background:#229ED9;padding:6px 14px;border-radius:6px;color:#fff;font-weight:600;text-decoration:none;border-radius: 30px;font-size: 16px;box-shadow: 0 0 10px 3px #229ED9; border-color: #17252ccb; border-width: 2px; border: 2px solid #0f4d862d;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram"
        style="width:24px;vertical-align:middle;margin-right:6px;filter:invert(1);">Follow
    </a>
    <button id="shareBtn" title="Share" class="float-btn share-btn" style="display:inline-block;background:#c0ad1f;padding:6px 14px;border-radius:6px;color:#fff;font-weight:600;text-decoration:none;border-radius: 30px;font-size: 16px;box-shadow: 0 0 10px 3px #c0ad1f; border-color: #828629ac; border-width: 2px; border: 2px solid #0f4d862d;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>Share
    </button>
  </div>
  <script src="./js/script.js"></script>
  <script src="./js/share.js"></script>
</body>
</html>`;

  if (download) {
    const saveName = window.prompt("Type the name in wich want to download your .html file below : ");
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = saveName+".html";
    link.click();
  } else {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.open();
    previewWindow.document.write(html);
    previewWindow.document.close();
  }
}

function setupPreviewButton() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const btn = document.createElement('button');
    btn.innerText = 'Preview';
    btn.type = 'button';
    btn.className = 'preview-btn';
    btn.onclick = () => generateHTML(false);
    document.getElementById('blogForm').appendChild(btn);
  } else {
    const btn = document.createElement('button');
    btn.innerText = 'Preview';
    btn.type = 'button';
    btn.className = 'preview-btn';
    btn.onclick = () => generateHTML(false);
    document.getElementById('blogForm').appendChild(btn);
  }
}

setupPreviewButton();
