var drawing = false

/////以下变量必备
var id = 0
var select = 0
var des = []
var val = []
var starttime = 0

window.onload = function () {
    id = this.GetQueryString("userid")
    $("#startModal").modal('show')
}



function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function draw() {

    var canvas = document.getElementById("can")
    var w = window.innerWidth;
    var h = window.innerHeight - 38;
    console.log(canvas)
    canvas.style.height = eval(h) + "px"
    canvas.style.width = eval(w) + "px"
    canvas.height = h
    canvas.width = w
    canvas.style.margin = "0px"
    canvas.style.padding = "0px"
    canvas.style.border = "0px"
    canvas.style.zIndex = -1

    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    // ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    //开始代码
    addEventListener('touchstart', ta, {
        passive: false
    });

    onmousedown = function (e) {
        drawing = true
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY - 38)
        wlog("pendown", new Date().getTime())
    }
    onmousemove = function (e) {
        if (drawing) {
            ctx.lineTo(e.clientX, e.clientY - 38)
            this.console.log(e.clientY + "," + e.clientX)
            ctx.stroke();
        }
    }
    addEventListener('touchmove', tm, {
        passive: false
    });
    onmouseup = function (e) {
        drawing = false
        ctx.closePath()
        wlog("penup", new Date().getTime())
    }
    addEventListener('touchend', te, {
        passive: false
    });
}

function ta(e) {
    var ctx = document.getElementById("can").getContext("2d");
    drawing = true
    ctx.beginPath()
    ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY - 38)
    wlog("pendown", new Date().getTime())
}

function te(e) {
    var ctx = document.getElementById("can").getContext("2d");
    drawing = false
    ctx.closePath()
    wlog("penup", new Date().getTime())

}

function tm(e) {
    var ctx = document.getElementById("can").getContext("2d");
    if (e.touches[0].clientY > 38) {
        e.preventDefault();
    }

    if (drawing) {
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY - 38)
        //this.console.log(e.touches[0].clientY + "," + e.touches[0].clientX)
        ctx.stroke();
    }
}

function draw_fin() {
    console.log(21212)
    saveImage()
    wlog("test2_drawend", 1)
    $("#exitModal").modal('show')

    removeEventListener("touchstart", ta, {
        passive: false
    });
    removeEventListener("touchmove", tm, {
        passive: false
    });
    removeEventListener("touchend", te, {
        passive: false
    });
}



////////////////////////以下函数必备

function start_modal() {
    $("#startModal").modal("hide")
    var a = new Date().getTime()
    wlog("test2_start", a)
    this.starttime = a
    draw()
}

function end_modal() {
    if (select != 0) {
        $("#endModal").modal("hide")
        wlog("test2_gesture", select)
        go_next()
    } else {
        this.document.getElementById("selection").textContent = "please select a postion"
    }
}

function saveImage() {
    var canvas = document.getElementById("can")
    var canvasData = canvas.toDataURL();
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "pic.php");
    ajax.onreadystatechange = function () {
        console.log(ajax.responseText);
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("pic=" + canvasData + "&id=" + id + '&des=' + "writing_img");
}


function go_next() {
    var endtime = new Date().getTime()
    wlog("test2 end", endtime)
    wlog("totaltime in test2", endtime - starttime)
    flush_log()
    window.location.href = "3.html?userid=" + id;
}

function pos_select(i) {
    this.document.getElementById("selection").textContent = "position" + i + "selected"
    select = i
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
    ajax.open('post', 'a.php');
    //post方式传递数据是模仿form表单传递给服务器的,要设置header头协议
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //3.发送请求(get--null    post--数据)
    var info = 'des=' + des + '&val=' + val + '&id=' + id; //将请求信息组成请求字符串
    ajax.send(info);
}