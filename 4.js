var list_btn = []
var id = 0
var des = []
var val = []
var starttime = 0
var col = 4
var row = 3
var select = 0

window.onload = function () {
    id = this.GetQueryString("userid")
    add_btn()
    for (var i = 1; i <= col * row; i++) {
        list_btn.push(i)
    }
    this.console.log()
    random_btn()
    wlog("userid", id)
    $("#startModal").modal('show')
}

function add_btn() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    for (var i = 1; i <= row; i++) {
        var new_row = document.createElement("div")
        new_row.id = "row" + eval(i)
        document.getElementById("main").appendChild(new_row)

        for (var j = 1; j <= col; j++) {
            var btn = document.createElement("button")
            btn.id = "btn" + eval((i - 1) * col + j)
            btn.setAttribute("chosen", 0)
            btn.setAttribute("class", "border btn btn-success")
            btn.style.height = eval(h / row) + "px"
            btn.style.width = eval(w / col) + "px"
            btn.textContent = ""
            btn.onclick = function () {
                if (this.chosen == 1) {
                    this.style.visibility = "hidden"
                    wlog("correct_click", new Date().getTime())
                    random_btn()
                } else {
                    console.log("wrong selection")
                    //window.alert("wrong selection")
                    wlog("wrong selection", new Date().getTime())
                }

            }
            document.getElementById("row" + eval(i)).appendChild(btn)
        }
    }
}

function random_btn() {
    if (list_btn.length > 0) {
        var index = Math.floor(Math.random() * list_btn.length)
        var chose_btn = document.getElementById("btn" + eval(list_btn[index]))
        chose_btn.className = "border btn btn-danger"
        chose_btn.chosen = 1
        //console.log(index)
        list_btn.splice(index, 1)
    } else {
        $("#exitModal").modal('show')
    }


}

function start_modal() {
    $("#startModal").modal("hide")
    var a = new Date().getTime()
    wlog("enter test1", a)
    this.starttime = a
}

function end_modal() {
    if (select != 0) {
        $("#endModal").modal("hide")
        wlog("test1_gesture", select)
        go_next()
    } else {
        this.document.getElementById("selection").textContent = "please select a postion"
    }
}

function pos_select(i) {
    this.document.getElementById("selection").textContent = "position" + i + "selected"
    select = i
}




function go_next() {
    var endtime = new Date().getTime()
    wlog("test4 end", endtime)
    wlog("totaltime in test4", endtime - starttime)
    flush_log()
    flush_log()
    window.location.href = "5.html?userid=" + id;
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function wlog(a, b) {
    des.push(a)
    val.push(b)
}

function flush_log() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var msg = ajax.responseText;
            console.log(msg);
        }
    }
    //2.创建http请求,并设置请求地址
    ajax.open('post', '/wkdsn/a.php');
    //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //3.发送请求(get--null    post--数据)
    var info = 'des=' + des + '&val=' + val + '&id=' + id; //将请求信息组成请求字符串
    ajax.send(info);
}