$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}
$.replaceAll = function (cadena, anterior, nuevo) {
    var re = new RegExp(anterior, 'g');
    return cadena.replace(re, nuevo);
}
$.getLunes = function () {
    var fecha = new Date();
    var day = fecha.getDay() || 7;
    if (day !== 1) {
        fecha.setHours(-24 * (day - 1));
    }
    return fecha;
}
$.formateaFechaNumerico = function (d) {
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = year + "" + month + "" + day;
    return date;
}

function reporteEventos() {
    location = "reporteEventos.html?personId=" + personId + "&fullName=" + fullName;
}

function reporteHorasViaje() {
    location = "reporteHorasViaje.html?personId=" + personId + "&fullName=" + fullName;
}

function reporteEmpleados() {
    location = "reporteEmpleados.html?personId=" + personId + "&fullName=" + fullName;
}

function nvl(value1, value2) {
    if (value1 == null || value1 == "")
        return value2;
    return value1;
}