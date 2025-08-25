const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.onload = () => {
                    img.classList.remove('lazy-loading');
                };
                observer.unobserve(img);
            }
        }
    });
});

function renderSubpages(subpages, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    subpages.forEach(page => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('subpage-item');

        const link = document.createElement('a');
        link.href = page.url;

        const img = document.createElement('img');
        img.setAttribute('data-src', page.image);
        img.alt = page.title;
        img.classList.add('lazy-loading');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('subpage-info');

        const title = document.createElement('h3');
        title.textContent = page.title;

        const description = document.createElement('p');
        description.textContent = page.description;

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);

        link.appendChild(img);
        link.appendChild(infoDiv);

        itemDiv.appendChild(link);
        container.appendChild(itemDiv);

        observer.observe(img);
    });
}

// 處理分頁切換的函式
async function handleTabClick(event) {
    event.preventDefault();

    const navLinks = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');

    // 移除所有 active 樣式
    navLinks.forEach(link => link.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // 為點擊的連結和對應的內容區塊加上 active 樣式
    const targetLink = event.target;
    const targetHref = targetLink.getAttribute('href').substring(1);
    const targetContent = document.getElementById(targetHref);

    targetLink.classList.add('active');
    targetContent.classList.add('active');

    // 根據 data-json 屬性來決定是否需要載入 JSON 資料
    const jsonFile = targetLink.getAttribute('data-json');
    if (jsonFile && jsonFile !== 'home') {
        try {
            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
            }
            const data = await response.json();
            renderSubpages(data, `${targetHref}-container`);
        } catch (error) {
            console.error(`讀取 ${jsonFile} 時發生錯誤:`, error);
            document.getElementById(`${targetHref}-container`).innerHTML = '<p>讀取資料失敗，請稍後再試。</p>';
        }
    }
}

// 在網頁載入完成後，為所有導覽連結添加點擊事件
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
    });
});
