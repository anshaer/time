// 創建一個 Intersection Observer 實例，用於圖片懶加載
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

// 根據傳入的資料陣列動態生成子頁面區塊
function renderSubpages(subpages) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = ''; // 先清空舊內容

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
        contentContainer.appendChild(itemDiv);

        observer.observe(img);
    });
}

// 使用 fetch API 讀取 data.json 檔案
async function fetchAndRenderData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
        }
        const subpages = await response.json();
        renderSubpages(subpages);
    } catch (error) {
        console.error('讀取資料時發生錯誤:', error);
        // 你可以在這裡顯示錯誤訊息給使用者
        document.getElementById('content').innerHTML = '<p>讀取資料失敗，請稍後再試。</p>';
    }
}

// 在網頁載入完成後執行
window.addEventListener('DOMContentLoaded', fetchAndRenderData);