var data;

var originData = {
    "Ryan": {
        "status": "",
        "photo": "Ryan.jpg",
        "data": [
            {
                color: '#3f297e',
                text: '超簡單',
                fileType: "image",
                fileName: "test.jpg",
                show: true
            },
            {
                color: '#209b6c',
                text: '困難',
                fileType: "image",
                fileName: "test2.jpg",
                show: true
            },
            {
                color: '#169ed8',
                text: '普通',
                fileType: "text",
                fileName: "紙包不住火，但包得住你",
                show: true
            },
            {
                color: '#f7a416',
                text: '送分題',
                fileType: "text",
                fileName: "狼若回頭，不是報恩就是報仇",
                show: true
            },
            {
                color: '#e6471d',
                text: '隨便猜',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            {
                color: '#be107f',
                text: '祝你好運',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            // {
            //     color: '#1d61ac',
            //     text: '簡單',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#60b236',
            //     text: '超困難',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#efe61f',
            //     text: '地獄級',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#e5177b',
            //     text: '牛刀小試',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#dc0936',
            //     text: '保證會',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#881f7e',
            //     text: '福利',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // }
        ]
    },
    "Neil": {
        "status": "",
        "photo": "Neil.jpg",
        "data": [
            {
                color: '#3f297e',
                text: '超簡單',
                fileType: "image",
                fileName: "test.jpg",
                show: true
            },
            {
                color: '#209b6c',
                text: '困難',
                fileType: "image",
                fileName: "test2.jpg",
                show: true
            },
            {
                color: '#169ed8',
                text: '普通',
                fileType: "text",
                fileName: "紙包不住火，但包得住你",
                show: true
            },
            {
                color: '#f7a416',
                text: '送分題',
                fileType: "text",
                fileName: "狼若回頭，不是報恩就是報仇",
                show: true
            },
            {
                color: '#e6471d',
                text: '隨便猜',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            {
                color: '#be107f',
                text: '祝你好運',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            // {
            //     color: '#1d61ac',
            //     text: '簡單',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#60b236',
            //     text: '超困難',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#efe61f',
            //     text: '地獄級',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#e5177b',
            //     text: '牛刀小試',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#dc0936',
            //     text: '保證會',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#881f7e',
            //     text: '福利',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // }
        ]
    },
    "Test": {
        "status": "",
        "photo": "Test.jpg",
        "data": [
            {
                color: '#3f297e',
                text: '超簡單',
                fileType: "image",
                fileName: "test.jpg",
                show: true
            },
            {
                color: '#209b6c',
                text: '困難',
                fileType: "image",
                fileName: "test2.jpg",
                show: true
            },
            {
                color: '#169ed8',
                text: '普通',
                fileType: "text",
                fileName: "紙包不住火，但包得住你",
                show: true
            },
            {
                color: '#f7a416',
                text: '送分題',
                fileType: "text",
                fileName: "狼若回頭，不是報恩就是報仇",
                show: true
            },
            {
                color: '#e6471d',
                text: '隨便猜',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            {
                color: '#be107f',
                text: '祝你好運',
                fileType: "audio",
                fileName: "test.mp3",
                show: true
            },
            // {
            //     color: '#1d61ac',
            //     text: '簡單',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#60b236',
            //     text: '超困難',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#efe61f',
            //     text: '地獄級',
            //     fileType: "image",
            //     fileName: "test.jpg",
            //     show: true
            // },
            // {
            //     color: '#e5177b',
            //     text: '牛刀小試',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#dc0936',
            //     text: '保證會',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // },
            // {
            //     color: '#881f7e',
            //     text: '福利',
            //     fileType: "audio",
            //     fileName: "test.mp3",
            //     show: true
            // }
        ]
    }
};

getData();

function getData() {
    data = JSON.parse(localStorage.getItem('myData'));
    if (data == null) {
        resetData();
    }
}

function resetData() {
    data = originData;
    localStorage.setItem('myData', JSON.stringify(data));
}

function syncData() {
    localStorage.setItem('myData', JSON.stringify(data));
}