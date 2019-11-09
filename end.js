var id = 0


window.onload = function () {
    id = this.GetQueryString("userid")
}


function go_next() {
    window.location.href = "index.html";
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}