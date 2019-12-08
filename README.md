# 大輪盤

## 使用情境
尾牙小遊戲，透過輪盤提供特定素材(ex: 照片、聲音)，讓使用者猜是誰

![](https://i.imgur.com/5rqXwn7.png)

## Demo
https://hbdoy.github.io/roulette

## Use
1. 按照格式替換資料內容
**js/data.js**
```
var originData = {
    "hbdoy": {
        "status": "",
        "photo": "hbdoy.jpg",
        "data": [
            {
                color: '#3f297e',
                text: '小試身手',
                fileType: "image",
                fileName: "test.jpg",
                show: true
            }
        ]
    }
}
```

2. 想要重置抽取狀態可以點選畫面上的「重置資料」

![](https://i.imgur.com/2CDZLFR.png)

3. 台上與使用者互動，若猜對可點選「答對」，則首頁的未知人物會變成他的個人照片；若答錯可點選「答錯」，則首頁的未知人物卡片背景會變成紅色，代表有使用猜題，但答題次數內未達對。

![](https://i.imgur.com/vR2EFUW.png)

![](https://i.imgur.com/8jT6vrt.jpg)

4. 輪盤抽出之圖片、已解鎖之圖片新增 lightbox 來顯示

![](https://i.imgur.com/Ce9pzKt.jpg)


5. 抽取的資料狀態存放在 localstorage，請確認瀏覽器/版本支援

## Update Log
[2019/12/08]:
- lightbox 顯示圖片

[2019/12/05]:
- 將輪盤資料改為 6 格
- 新增文字格式的素材
- 調整問題圖片的外觀

[2019/12/02]:
- First Create

## Library
- jQuery
- jquery-rotate
- Bootstrap
- [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

## License
[MIT](LICENSE)
