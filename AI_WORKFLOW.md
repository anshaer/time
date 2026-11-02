# OBS 時鐘 AI 檔案工作流

你是此專案的設計與素材產生助手。先讀本檔和 examples/project.json，再依使用者需求產生 project.json 與獨立圖片。不要串接 AI API；不要修改編輯器來套用單一設計。這是手動交接檔案流程，不是 GitHub Actions 的 API 自動生成。

## 交付
- project.json：UTF-8 純 JSON，不含註解或 Markdown 圍欄。
- images/：實際可下載的 PNG/WebP/JPEG/GIF 圖片，建議透明 PNG。每張檔名唯一、大小寫與 JSON 一致。無繪圖能力時明確說明，不可假稱已產生圖片，並提供逐張提示詞與預期尺寸讓使用者另行生成。
- 說明畫布尺寸、每張素材用途與製作狀態。避免把時鐘數字畫死在圖片中，使用動態 time/date/weekday 圖層。
- 除非使用者要求，維持透明畫布。圖層陣列第一項在最前面。

## JSON v1
頂層：schemaVersion=1、canvas={w,h,bg}、layers=[]；可選 fonts=[]、customMaps={}。
canvas：w/h 1–16384，bg 為 transparent 或 #RRGGBB。
每層共用：type、name、x/y（左上角像素）、opacity（0–1）。
類型 image：file（images/檔名）、w/h（必填）、lock（預設 true）、可選 fx。
類型 time/date/weekday：format、size、weight、color、shadow、timeEffect、可選 fontId。
類型 text/slash：text、size、weight、color、shadow。
類型 dash/solid：w、thickness、color。
文字預設 size=40、weight=700、color=#ffffff；顏色只用六碼 HEX。
format 支援 YYYY YY MM M DD D HH H hh h mm m ss s A a ddd wk。格式中的英文字母可能被解析為 token，固定文字請另設 text 圖層。
timeEffect：cut/up/down/zoom/fade。
fonts：[{id:"myfont",name:"字體名",file:"fonts/custom.woff2"}]；字體需有使用權；未提供字體不要寫 fontId。
customMaps：useMonthMap/useWeekMap 布林；monthMap 長度12；weekMap 長度7（星期日開始）；ampmMap 長度2；ampmStart 0–23，預設6，另一段起始為12小時後。這個 AM/PM 是自訂時段。

## 圖片 fx（可省略）
swap/rotate/move 為布林；images=[{file:"images/second.png"}]（不含主圖片）。
swapInterval 秒（>=0.1）、swapDuration 秒（>=0.05）、swapMode=cut/fade/zoom。
angle 起始角度；rotateInterval 秒（>=0）、rotateSpeed 度/秒（>=1）、rotateDirection=1/-1。
moveInterval 秒（>=0.1）、moveSpeed 像素/秒（>=1）、moveMode=cut/elastic；positions=[{x,y}] 最多20組，從主圖 x/y 起走並循環。
swapReset/rotateReset/moveReset：none/minute/half/hour/midnight/noon。none 從載入起算，其餘依本機時間相位。

## 使用者操作
開 index.html → 選 JSON → 一次選全部圖片與字體（可分次累加）→ 檢查並匯入 → 預覽／微調 → 匯出單一 HTML 或 OBS ZIP。
網頁不會自動呼叫 AI；選入檔案只在本機瀏覽器處理。JSON 不允許遠端素材網址。檔案同名時後選取者替換，請使用唯一檔名。
輸出單一 HTML 會內嵌素材；專案 ZIP 用於回交 AI 與下次編輯；OBS ZIP 用於最終播放，不是可編輯專案。
