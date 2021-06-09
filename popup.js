chrome.tabs.getSelected(null, async (e) => {
  document.getElementById('checkbox1').addEventListener('click', () => { onCheckBoxClick(); });

  let select1 = document.getElementById('select1');
  select1.addEventListener('change', () => { onSelectChange(); });


  let examDataList = getExamDataList();

  //Create and append the options
  for (key in examDataList) {
    var option = document.createElement("option");
    option.value = key;
    option.text = key;
    select1.appendChild(option);
  }

  // 取得當前題庫
  chrome.storage.local.get(['examDataName'], function (result) {
    showCurrentExamData(result.examDataName);
  });

  // 取得當前狀態
  chrome.storage.local.get(['isActive'], function (result) {
    showActiveText(result.isActive);
  });
});

/**
 * 下拉選單改動
 */
function onSelectChange() {
  chrome.storage.local.set({ "examDataName": $('#select1').val() }, function () {
    showCurrentExamData($('#select1').val());
  });
}

/**
 * check box 改動
 */
function onCheckBoxClick() {
  const checkBox = document.getElementById("checkbox1");

  chrome.storage.local.set({ isActive: checkBox.checked }, function () {
    showActiveText(checkBox.checked);
  });
}

/**
 * 
 * @param {*} checked 
 */
function showActiveText(checked) {
  const checkBox = document.getElementById("checkbox1");
  checkBox.checked = checked;
  document.getElementById('label1').innerHTML = checked ? "啟用中" : "關閉";
}

/**
 * 
 * @param {*} val 
 */
function showCurrentExamData(val) {
  $('#dataBase').text("當前題庫: " + val);
}