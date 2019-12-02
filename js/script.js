var ans = "";

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
        function showUsedMedia() {
          let contentImg = "";
          let contentAudio = "";
          for (let item of data[ans].data) {
            if (!item.show) {
              if (item.fileType == "image") {
                contentImg += `<div class='col-12 col-md-3'><img class='img-fluid' src='./media/${ans}/${item.fileName}'></div>`;
              } else if (item.fileType == "audio") {
                contentAudio += `<div class='col-12 col-md-4'><audio controls><source src="./media/${ans}/${item.fileName}" type="audio/mpeg"></audio></div>`;
              }
            }
          }
          $("#shownMedia .card-body .imgMedia").html(contentImg);
          $("#shownMedia .card-body .voiceMedia").html(contentAudio);
        }

        // 顯示新抽出之提示素材
        function createQueModalContent(index) {
          let content = "";
          if (data[ans].data[index].fileType == "image") {
            content = `<img class='img-fluid' src='./media/${ans}/${data[ans].data[index].fileName}'>`;
          } else if (data[ans].data[index].fileType == "audio") {
            content = `<audio controls><source src="./media/${ans}/${data[ans].data[index].fileName}" type="audio/mpeg"></audio>`;
          }
          $("#showGuessElement .modal-body").html(content);
          $("#showGuessElement").modal();
        }
      });
    }
  });
})(jQuery);

$(function () {
  $('#allQuestion').hide();
  chooseQuestionStatus();
  createQuestion();
  eventBind();

  function createQuestion() {
    var content = "";
    for (let item in data) {
      content += `<div class='col-md-4 col'>
          <div class='question ${item} my-2' data-ans='${item}' data-status='${data[item].status}'>
            <img width='180px' height='230px' src='${data[item].status == "success" ? "./img/user/" + data[item].photo : "./img/people.png"}'>
            <div style='font-weight: bold'>姓名: ${data[item].status == "success" ? item : "XXX"}</div>
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
    $('#allQuestion').show();
  }

  function chooseQuestionStatus() {
    ans = "";
    $('#rouPage').hide();
    $('#allQuestion').show();
    $('#indexResetBtn').show();
  }

  function ansQuestionStatus() {
    $('#rouPage').show();
    $('#allQuestion').hide();
    $('#indexResetBtn').hide();
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

    $("#right").click(function () {
      if (confirm("確認此題答對?")) {
        // $(`.${ans}`).removeClass("question");
        $(`.${ans}`).css({
          backgroundColor: "#D4EDDA"
        });
        $(`.${ans} img`).attr("src", `./img/user/${data[ans].photo}`);
        $(`.${ans} div`).html(`姓名: ${ans}`);
        data[ans].status = "success";
        syncData();
      }
    })

    $("#wrong").click(function () {
      if (confirm("確認此題答錯?")) {
        $(`.${ans}`).css({
          backgroundColor: "#F8D7DA"
        });
        $(`.${ans} div`).html(`姓名: XXX`);
        data[ans].status = "fail";
        syncData();
      }
    })

    $("#seeAns").click(function () {
      alert(ans);
    })

    // 若是音檔則避免沒有暫停就關掉 modal 導致背景持續撥放
    $('#showGuessElement').on('hidden.bs.modal', function (e) {
      $("#showGuessElement .modal-body").html("");
    })
  }
});