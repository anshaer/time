# OBS 時鐘 · GitHub AI 工作流版

下載整個專案，直接開啟 `index.html`。無需安裝、API 或部署。

1. 把 `AI_WORKFLOW.md` 和 `examples/project.json` 提供給 AI，描述想要的時鐘設計。
2. 取得 `project.json` 與圖片後，在編輯器選 JSON，並多選所有素材，再按「檢查並匯入」。
3. 調整位置／字型／效果，匯出單一 HTML，將此檔設為 OBS 瀏覽器來源的本機檔案，來源寬高與畫布相同。

## 先測試
選 `examples/project.json`，再多選 `examples/images` 中兩張 PNG，匯入後按「播放效果預覽」。

## 存檔種類
- 單一 HTML：圖片與字體內嵌，最終播放用。
- 匯出 OBS ZIP：HTML、JS、CSS、素材分離，解壓後使用。
- 匯出專案 ZIP：project.json、圖片與字體；下次匯入或交回 AI 用。
- 匯出專案 JSON：僅設定，需另外保留相對應素材；請優先保存專案 ZIP。

第一個圖層在最前面。時鐘使用電腦本機時間。JSON 匯入會取代畫布，請先匯出目前專案。錯誤或缺圖時不更新畫布。素材以唯一檔名配對，不接受遠端 URL；SVG 請轉為 PNG。既有手動圖層編輯功能仍可使用。

這裡的「AI 工作流」是 GitHub 中可版本控制的 MD／JSON／圖片檔案協作流程，不是需要金鑰的 GitHub Actions。

可放到自己的 GitHub 儲存庫保存與版本管理；本包不會替你發布網站。
