# bank-card-luhn-generator

一個純前端的靜態示例頁面，用來生成通過 Luhn 校驗的卡號字串，並為每筆結果附帶隨機有效期與 3 位數安全碼。

這個專案不需要後端，也不需要安裝任何依賴，直接打開 `index.html` 就可以使用。

## 目前功能

- 支援輸入 6 到 8 位 BIN
- 預設帶入 BIN：`54102901`
- 支援 16 位與 19 位卡號長度
- 支援一次生成 10 / 20 / 30 / 40 / 50 組結果
- 顯示格式為 `卡號|MM/YY|CVV`
- 支援單筆複製與全部複製
- 需要手動點擊「生成」或按 `Enter` 才會產生結果

## 使用方式

1. 打開 `index.html`
2. 保留或修改預設 BIN
3. 選擇卡號長度與生成數量
4. 點擊「生成」或按 `Enter`
5. 視需要複製單筆或全部結果

## 專案結構

```text
index.html   # 頁面結構
style.css    # 頁面樣式
main.js      # Luhn 計算、資料生成與互動邏輯
README.md    # 專案說明
```

## 實作說明

主要邏輯位於 `main.js`：

- `luhnCheckDigit(partial)`：計算 Luhn 檢查碼
- `generateOne(bin, totalLen)`：根據 BIN 和目標長度生成單筆卡號
- `generateExp()`：生成隨機有效期
- `generateCVV()`：生成 3 位數安全碼
- `generate()`：驗證輸入、批量生成結果並渲染到頁面
- `copySingle()` / `copyAll()`：處理複製功能

## 注意事項

- 生成結果只是在格式上符合 Luhn 規則，不代表任何真實支付能力。
- 這個專案適合用於頁面展示、資料格式測試、教學示例或前端互動練習。
- 請勿用於任何非法、欺騙或未經授權的用途。

## License

MIT
