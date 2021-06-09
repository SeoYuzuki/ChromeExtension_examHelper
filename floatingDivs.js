/**
 * 建立新漂浮元件
 */
function createNewFloatingDiv() {
    // 漂浮元件背景
    let div = document.createElement('div');
    //div.style.left = (position.x - 25) + 'px';
    //div.style.top = (position.y - 25) + 'px';
    div.style.position = 'fixed';
    div.style.top = '220px';
    div.style.right = '20px';
    div.style.width = '30%';
    div.style.zIndex = "99";
    div.style.backgroundColor = "#F0FFFF";
    div.style.color = "#000000";
    div.id = "ansBlock";


    // sizer
    let divSizer = document.createElement('div');
    divSizer.id = "sizer";
    div.appendChild(divSizer);

    // 按鈕
    setBtn(div);

    // 文字塊
    let textfield = document.createElement('div');
    textfield.id = "textfield";
    div.appendChild(textfield);

    document.documentElement.appendChild(div);
    return div;
}

/**
 * 建立按鈕
 * @param {*} div 
 * @param {*} showLines 
 */
function setBtn(div) {
    let btnX = document.createElement('button');
    btnX.innerHTML = "X";
    btnX.addEventListener("click", () => {
        div?.remove();
    });

    let btnPrevios = document.createElement('button');
    btnPrevios.innerHTML = "<<";
    btnPrevios.addEventListener("click", () => {
        if (showLineIndex < 1) {
            return;
        }
        showLineIndex = showLineIndex - 1;

        rerender();
    });

    let btnNext = document.createElement('button');
    btnNext.innerHTML = ">>";
    btnNext.class = "btn-success";
    btnNext.addEventListener("click", () => {
        if (showLineIndex > showLines.length - 2) {
            return;
        }
        showLineIndex = showLineIndex + 1;

        rerender();
    });

    div.appendChild(btnX);
    div.appendChild(btnNext);
    div.appendChild(btnPrevios);
}

/**
 * 重新渲染畫面
 */
function rerender() {
    chanageTextfield();
    chanageSizer();
}

/**
 * 改動文字塊
 */
function chanageTextfield() {
    if (showLines[showLineIndex]) {
        $("#textfield").html(showLines[showLineIndex]);
    } else {
        $("#textfield").html("查無結果或是字串過短");
    }
}

/**
 * 改動sizer
 */
function chanageSizer() {
    $("#sizer").html((showLineIndex + 1) + "/" + showLines.length);
}