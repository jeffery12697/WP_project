# README
# WP_project
## (Group 34) KaoGuti Website
[TOC]

#### 組員：
資管二 黃子雍　
電機三  呂元翔
電機三　 施維


#### Demo 影片連結：
https://youtu.be/uc96rV6-JuU

#### 服務內容：
本服務旨在提供一個能統整考古題資訊的交流平台，希望能讓使用者非常容易的查詢和分享各類考古題或是題目，也能在平台上發問問題或是不含答案的考古題以尋求大神解惑，更能在平台上為那些還沒有良好解答的題目撰寫解答，也可以針對題目和解答進行一些討論。所有題目和解答的輸入皆支援 markdown 和 ketex 語法，可以對輸入內容進行排版，也可在文中內嵌圖片與數學式，讓數學式和各種排版問題不再是交流的阻礙。此外，使用者還能對題目和解答按讚，而這個讚數除了表達支持之外，還會作為之後解答的排序依據。本服務有註冊和登入功能，未登入者僅能查看內容，而登入後除了可以發布題目與提供解答，也可以對問題與解答按讚，而在有人為使用者發布的題目提供答案後，使用者還會收到email通知，作為提醒。

#### Deployed 連結：

https://kaoguti.herokuapp.com/

#### 使用/操作方式
1. 首先進到主頁面，可以看到右上角的登入按鈕、左上角logo兼回主頁按鈕、畫面中央的課程搜尋欄位以及搜尋下方的課程圖卡
![](https://i.imgur.com/pHGvMwH.png)
2. 如果只想瀏覽題目和相關解答的話，可以不用登入，在搜尋框中輸入要找的課程名稱，網頁就會篩選出課程名包含輸入字串的所有課程圖卡
![](https://i.imgur.com/d0zx8DM.png)
3. 點選圖卡，進到相應的課程頁面後，可以看到屬於該課程的所有題目(一頁最多八個，其他可以從右下角的頁簽選擇其他頁)，每個題目都會顯示其標題、授課老師、發布者、發布時間、題目描述、相關的tags以及讚數和解答或回覆總數等資訊(題目描述框右下方可以拖動改變格子大小)
![](https://i.imgur.com/9JSsuZP.png)
4. 而想要找到特定類型、授課老師或是標題的題目，可以使用題目欄位上面的搜尋框，輸入指定的關鍵字或是篩選文字，下方就會就顯示包含條件的題目
![](https://i.imgur.com/D0CvDPy.png)
5. 點選題目的標題進到題目頁面，可以看到題目和相對應的答案會是回復(題目描述框和回復框右下方都可以拖動改變格子大小)
![](https://i.imgur.com/sNpBuKC.png)
6. 而若要發布問題、提供解答或回復以及按讚，就需要註冊和登入，點選右上方的人像圖標進入登入頁面
![](https://i.imgur.com/IAZlcXO.png)
7. 若還沒有帳號，則需要先註冊，註冊會需要email認證，輸入email後，按獲取驗證碼，然後到信箱收信，待填完所有資訊，點選註冊，即可完成註冊
![](https://i.imgur.com/05KM4TI.png)
8. 登入後可以到畫面上方多了一個新增題目的按鈕，點選即可進到題目新增頁面
![](https://i.imgur.com/ILg7m8J.png)
9. 題目描述欄和答案描述欄皆支援markdown和katex語法
![](https://i.imgur.com/AOsyHi9.png)
10. 登入後，也可以針對某個問題進行回復或是提供解答，欄位在題目頁面底下
![](https://i.imgur.com/FesJEdA.png)
11. 此外，登入後，也可以針對題目和答案按讚，而發布者可以刪除自己的題目或是回復

#### Github link

https://github.com/jeffery12697/wp1101.git
#### 使用框架與套件

frontend:
* antd
* MUI
* axios
* crypto
* js.cookie
* @uiw/react-markdown-preview
* bootstrap
* react-dom
* react-katex
* react-markdown
* react-router-dom
* react-scripts
* react-select
* remark-math
* tachyons
* prop-types

backend:
* bcrypt
* babel
* cookie-parser
* cors
* express
* nodemailer
* nodemon
* qs
* uuidv4
* mongoose
* dotenv

database:
* MongoDB

#### localhost 連線方式

由於cookies不能在localhost:3000與localhost:5000之間使用，因此在final資料夾中提供了可以在localhost:3000與localhost:5000跑起來的版本，跑法詳見README.md。而final底下的deploy資料夾中還有可以deploy到heroku的版本。

localhost使用方式如下：
1. 將branch main clone到local的資料夾中
```
git clone https://github.com/jeffery12697/wp1101.git
```
2. 在backend資料夾中新增.env檔，內容包括
```
MONGO_URL=
EMAIL_SERVICE=
EMAIL_ADDRESS=
EMAIL_PASSWORD=
```

3. 在localhost:5000啟動backend
```
cd backend
yarn
yarn server
```
4. 在localhost:3000啟動frontend
```
cd frontend
yarn
yarn start
```

#### 分工
黃子雍
* frontend

呂元翔
* frontend和backend之間的溝通與相關邏輯
* 畫面美化與修改
* 用localStorage來維持登入

施維
* backend
* database
* deploy on heroku