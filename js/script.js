var ans = "";
var items = [];
var unlockPhoto = [];
var questionPhoto = [];
var timer;
var clock;

(function ($) {
  $.fn.extend({

    roulette: function (options) {
      var defaults = {
        angle: 0,
        // angleOffset: -45,
        angleOffset: 0,
        speed: 5000,
        easing: "easeInOutElastic",
      };

      var opt = $.extend(defaults, options);

      return this.each(function () {
        showUsedMedia();

        var o = opt;

        var $wrap = $(this);
        var $btnStart = $wrap.find("#btn-start");
        var $roulette = $wrap.find(".roulette");
        var wrapW = $wrap.width();
        var angle = o.angle;
        var angleOffset = o.angleOffset;
        var speed = o.speed;
        var esing = o.easing;
        var itemSize = data[ans].data.length;
        var itemSelector = "item";
        var labelSelector = "label";
        var d = 360 / itemSize;
        var borderTopWidth = wrapW;
        var borderRightWidth = tanDeg(d);

        for (i = 1; i <= itemSize; i += 1) {
          var idx = i - 1;
          var rt = i * d + angleOffset;
          var itemHTML = $('<div class="' + itemSelector + '">');
          var labelHTML = '';
          labelHTML += '<p class="' + labelSelector + '">';
          labelHTML += '	<span class="text">' + data[ans].data[idx].text + '<\/span>';
          labelHTML += '<\/p>';

          $roulette.append(itemHTML);
          $roulette.children("." + itemSelector).eq(idx).append(labelHTML);
          $roulette.children("." + itemSelector).eq(idx).css({
            "left": wrapW / 2,
            "top": -wrapW / 2,
            "border-top-width": borderTopWidth,
            "border-right-width": borderRightWidth,
            "border-top-color": data[ans].data[idx].show ? data[ans].data[idx].color : "black",
            "transform": "rotate(" + rt + "deg)"
          });

          var textH = parseInt(((2 * Math.PI * wrapW) / d) * .5);

          $roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
            "height": textH + 'px',
            "line-height": textH + 'px',
            // 12格
            // "transform": 'translateX(' + (textH * 1.3) + 'px) translateY(' + (wrapW * -.3) + 'px) rotateZ(' + (90 + d * .5) + 'deg)',
            // 6格
            "transform": 'translateX(' + (textH * 4) + 'px) translateY(' + (wrapW * -.3) + 'px) rotateZ(' + (90 + d * .5) + 'deg)',
            "color": data[ans].data[idx].show ? "white" : "grey"
          });

        }

        function tanDeg(deg) {
          var rad = deg * Math.PI / 180;
          return wrapW / (1 / Math.tan(rad));
        }


        $btnStart.on("click", function () {
          stopTimer();
          rotation();
        });

        function rotation() {
          var completeA, actualA, index;
          do {
            if (!chkNotEmpty()) {
              alert("所有選項已開出");
              return;
            }
            completeA = ra();
            actualA = completeA % 360 / d;
            index = (parseInt(itemSize - actualA) - 1) == -1 ? itemSize - 1 : parseInt(itemSize - actualA) - 1;
            // console.log(completeA, actualA, index);
          } while (!data[ans].data[index].show);

          // console.log(completeA);

          $roulette.rotate({
            angle: angle,
            animateTo: completeA,
            center: ["50%", "50%"],
            easing: $.easing.esing,
            callback: function () {
              // var currentA = $(this).getRotateAngle();
              $roulette.children("." + itemSelector).eq(index).css({
                "border-top-color": 'black'
              });
              $roulette.children("." + itemSelector).eq(index).children("." + labelSelector).css({
                "color": "grey"
              });
              data[ans].data[index].show = false;
              syncData();
              showUsedMedia();
              startCounter(30);
              createQueModalContent(index);
              // alert("pop up: , " + data[ans].data[index].text);
            },
            duration: speed
          });
        }

        function r(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // 產生旋轉角度
        function ra() {
          var completeA = 360 * r(5, 10) + r(0, 360);
          // 若在線上則偏移
          if (completeA % 360 % d == 0) {
            completeA += 10;
          }
          return completeA;
        }

        // 確認是否還有可用抽取項目
        function chkNotEmpty() {
          return data[ans].data.filter(item => item.show == true).length > 0;
        }

        // 列出已解鎖素材
        async function showUsedMedia() {
          let contentImg = "";
          let contentAudio = "";
          let contentText = "";
          unlockPhoto = [];
          let pid = 0;
          for (let i = 0; i < data[ans].data.length; i++) {
            let item = data[ans].data[i];
            if (!item.show) {
              if (item.fileType == "image") {
                contentImg += `<div class='col-12 col-md-3'><img data-pid="${pid++}" class='img-fluid unlock-img' src='./media/${ans}/${item.fileName}'></div>`;
                var [width, height] = await getImgRealSize(`./media/${ans}/${item.fileName}`);
                unlockPhoto.push({
                  src: `./media/${ans}/${item.fileName}`,
                  w: width,
                  h: height
                });
              } else if (item.fileType == "audio") {
                contentAudio += `<div class='col-12 col-md-4'><audio controls><source src="./media/${ans}/${item.fileName}" type="audio/mpeg"></audio></div>`;
              } else if (item.fileType == "text") {
                contentText += `<div class='col-12 col-md-4'><blockquote>${item.fileName}</blockquote></div>`;
              }
            }
          }
          $("#shownMedia .card-body .imgMedia").html(contentImg);
          $("#shownMedia .card-body .textMedia").html(contentText);
          $("#shownMedia .card-body .voiceMedia").html(contentAudio);
        }

        // 顯示新抽出之提示素材
        async function createQueModalContent(index) {
          let content = "";
          if (data[ans].data[index].fileType == "image") {
            content = `<img class='img-fluid question-img' src='./media/${ans}/${data[ans].data[index].fileName}'>`;
            var [width, height] = await getImgRealSize(`./media/${ans}/${data[ans].data[index].fileName}`);
            questionPhoto = [{
              src: `./media/${ans}/${data[ans].data[index].fileName}`,
              w: width,
              h: height
            }];
          } else if (data[ans].data[index].fileType == "audio") {
            content = `<audio controls><source src="./media/${ans}/${data[ans].data[index].fileName}" type="audio/mpeg"></audio>`;
          } else if (data[ans].data[index].fileType == "text") {
            content = `<blockquote>${data[ans].data[index].fileName}</blockquote>`;
          }
          $("#showGuessElement .modal-body").html(content);
          $("#showGuessElement").modal();
        }

        // 倒數計時
        function startCounter(sec = 30) {
          var timeFlag = Date.now();
          var originTimer = sec;
          clock.setValue(originTimer);
          $("#countDown").show();

          timer = setInterval(function () {
            clock.decrement();
            var now = Date.now();
            var distance = now - timeFlag;
            // the count down is finished
            if (distance > originTimer * 1000) {
              clearInterval(timer);
            }
          }, 1000)
        };
      });
    }
  });
})(jQuery);

$(function () {
  clock = $('#countDown').FlipClock({
    clockFace: 'Counter'
  });
  chooseQuestionStatus();
  createQuestion();
  eventBind();
});

// 建立首頁人像
function createQuestion() {
  var content = "";
  var i = 1;
  for (let item in data) {
    content += `<div class='col-md-4 col'>
          <div class='question ${item} my-2' data-ans='${item}' data-status='${data[item].status}'>
            <div class="question-num ${data[item].status == "success" ? "hide" : ""}">${i++}</div>
            <div class="index-person-photo" style="background-image: url('${data[item].status == "success" ? "./img/user/" + data[item].photo : "./img/people.png"}');"></div>
            <div class="question-name">姓名: ${data[item].status == "success" ? item : "XXX"}</div>
          </div>
        </div>`;
  }
  $("#allQuestion .row").html(content);
  $(".question").each(function () {
    // console.log($(this).data("status"));
    if ($(this).data("status") == "success") {
      $(this).css({
        backgroundColor: "#D4EDDA",
      });
    } else if ($(this).data("status") == "fail") {
      $(this).css({
        backgroundColor: "#F8D7DA",
      });
    }
  })
}

// 選題狀態
function chooseQuestionStatus() {
  ans = "";
  $('#rouPage').hide();
  $('#allQuestion').show();
  $('#indexResetBtn').show();
}

// 答題狀態
function ansQuestionStatus() {
  $('#rouPage').show();
  $('#allQuestion').hide();
  $('#indexResetBtn').hide();
}

// photo light box
var reloadLightBox = function (photos = items, index = 0) {
  console.log(index);
  var pswpElement = document.querySelectorAll('.pswp')[0];
  var options = {
    // start at first slide
    index,
    getDoubleTapZoom: function (isMouseClick, item) {
      // zoom to original if initial zoom is less than 0.7x,
      // otherwise to 1.5x, to make sure that double-tap gesture always zooms image
      return item.initialZoomLevel < 0.7 ? 1.5 : 4;
    },
    maxSpreadZoom: 4
  };
  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photos, options);
  gallery.init();
}

// 因為 lightbox 需要預先定義圖片的寬高
// use promise return img "real" width and height until that loaded
function getImgRealSize(path) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.src = path;
    img.onload = function () {
      var width = img.naturalWidth;
      var height = img.naturalHeight;
      resolve([width, height]);
    }
  });
}

function stopTimer() {
  clearInterval(timer);
  $("#countDown").hide();
}

function eventBind() {
  $('.resetBtn').click(function () {
    if (confirm("確定要重製資料嗎?")) {
      resetData();
      location.reload();
    }
  })

  $("#allQuestion").on("click", ".question", function () {
    // console.log(this.dataset.ans);
    ans = this.dataset.ans;
    $('.roulette').html("");
    $('.box-roulette').roulette();
    ansQuestionStatus();
  })

  $("#goIndex").click(function () {
    chooseQuestionStatus();
  })

  $("#wrong").click(function () {
    if (confirm("確認此題答錯?")) {
      $(`.${ans}`).css({
        backgroundColor: "#F8D7DA"
      });
      $(`.${ans} img`).attr("src", "./img/people.png");
      $(`.${ans} .question-num`).show();
      $(`.${ans} .question-name`).html(`姓名: XXX`);
      data[ans].status = "fail";
      syncData();
      chooseQuestionStatus();
    }
  })

  $("#seeAns").click(function () {
    if (confirm("確定要看答案?")) {
      $("#ansModalCenterTitle").html(`Hi 我是 ${ans}`);
      $("#showAnsElement .modal-body").html(`<img class="img-fluid" src="./img/user/${data[ans].photo}">`);
      $("#showAnsElement").modal();
      $(`.${ans}`).css({
        backgroundColor: "#D4EDDA"
      });
      $(`.${ans} .index-person-photo`).css("backgroundImage", `url('./img/user/${data[ans].photo}')`);
      $(`.${ans} .question-num`).hide();
      $(`.${ans} .question-name`).html(`姓名: ${ans}`);
      data[ans].status = "success";
      syncData();
    }
  })

  // 若是音檔則避免沒有暫停就關掉 modal 導致背景持續撥放
  $('#showGuessElement').on('hidden.bs.modal', function (e) {
    stopTimer();
    $("#showGuessElement .modal-body").html("");
  })

  // 看完答案跳回首頁
  $('#showAnsElement').on('hidden.bs.modal', function (e) {
    chooseQuestionStatus();
  })

  // 已解鎖素材
  $(document).on('click', '.unlock-img', function (e) {
    reloadLightBox(unlockPhoto, $(this).data("pid"));
  })

  // 當前轉出之圖片
  $(document).on('click', '.question-img', function (e) {
    reloadLightBox(questionPhoto);
  })
}