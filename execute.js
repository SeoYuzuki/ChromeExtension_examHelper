/**
 * 監聽選取的字串改變時
 */
document.addEventListener('selectionchange', () => {
  let selectedString = window.getSelection().toString();
  if (selectedString.length > 0) {
    chrome.storage.local.get(['isActive'], function (result) {// 是否啟用
      if (result?.isActive == true) {

        chrome.storage.local.get(['examDataName'], function (rr) {// 取得當前題庫
          if (rr?.examDataName) {
            showFloatingDiv(selectedString, rr.examDataName);
          }
        });
      }
    });
  }
});

/**
 * 顯示漂浮的元件
 * @param {*} selectedString 目標字串
 * @param {*} examDataName 題庫名稱
 */
function showFloatingDiv(selectedString, examDataName) {
  let div = $('#ansBlock')[0]; //document.getElementById("ansBlock");
  if (!div) {
    div = createNewFloatingDiv();
  }

  handleAns(selectedString, getExamDataList()[examDataName]);

  rerender();

};

/** 當前答案index */
var showLineIndex = 0;
/** 答案清單 */
var showLines = [];

/**
 * 答案清單製作
 * @param {*} selectedString 被選取的目標字串 
 * @param {*} examData 題庫內容
 */
function handleAns(selectedString, examData) {

  showLines = [];
  showLineIndex = 0;

  if (selectedString && selectedString.length >= 2) {
    let lines = examData.split('\n');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i]?.includes(selectedString)) {
        let thisAns = "";
        let yy = 0;
        for (; (i + yy) > 0; yy--) {//往前找到 "----" 當開頭
          if (lines[i + yy]?.includes('-------')) {
            break;
          }
        }
        yy = yy + 1;
        for (; yy < 20; yy++) { //上限20行
          if (lines[i + yy]?.includes('-------')) { // 以 "-----" 為結尾
            break;
          }
          thisAns = thisAns + lines[i + yy] + "<br />";
        }

        showLines.push(thisAns.replace(selectedString,
          "<div style='color:red; display: inline; ' class='selectedStringRed'>" + selectedString + "</div>"));
      }
    }

  }
}