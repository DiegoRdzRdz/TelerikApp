var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    var fecha = new Date();
    var day = fecha.getDay() || 7;
    if (day !== 1) {
        fecha.setHours(-24 * (day - 1));
    }
    $("#nombre").append(fullName);
    $("#fechaInicial").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
    var lunes = formateaFecha(fecha);
    fecha.setDate(fecha.getDate() + 6);
    $("#fechaFinal").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
    var domingo = formateaFecha(fecha);
    generaReporte(lunes, domingo);
});

function formateaFecha(d) {
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

function actualizaReporte(form) {
    var fechaInicial = form.fechaInicial.value;
    var fechaFinal = form.fechaFinal.value;
    $(".repDia").remove();
    $("#totalHorasLbl").remove();
    fechaInicial = $.replaceAll(fechaInicial, "/", "");
    fechaFinal = $.replaceAll(fechaFinal, "/", "");
    generaReporte(fechaInicial, fechaFinal);
}

function reporteEventos() {
    location = "reporteEventos.html?personId=" + personId + "&fullName=" + fullName;
}

function reporteHorasViaje() {
    location = "reporteHorasViaje.html?personId=" + personId + "&fullName=" + fullName;
}

function generaReporte(fechaInicial, fechaFinal) {
    var dias;
    var srtHtml;
    var totalHoras;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personId +
        "/fechaInicio/" + fechaInicial + "/fechaFin/" + fechaFinal + "/reportePersonalHF";
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'dias') {
                    dias = val;
                }
                if (key == 'totalHoras') {
                    totalHoras = val;
                }
            });
            $("#totalHoras").append("<label id='totalHorasLbl'>" + totalHoras + "</label>");
            $.each(dias, function (i, item) {
                srtHtml = "<tr class='repDia'><td>" + item.fechaF + "</td><td>" + item.horas + "</td>" +
                    "<td><input type='button' value='Ver detalle' onclick='verDetalle(" +
                    item.fecha + ")'/></td></tr>";
                $("#reporte").append(srtHtml);
            });
        });
}

function verDetalle(fecha) {
    var eventos;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personId +
        "/fecha/" + fecha + "/detalleDiaHF";
    $(".dtlDia").remove();
    var strHead = "<tr class='dtlDia'><td>Hora</td><td>Tipo Evento</td><td>Descripcion</td></tr>";
    $("#reporteDia").append(strHead);
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'eventos') {
                    eventos = val;
                }
            });
            $.each(eventos, function (i, item) {
                srtHtml = "<tr class='dtlDia'><td>" + item.fecha + "</td><td>" + item.lector + "</td>" +
                    "<td>" + item.evento + "</td></tr>";
                $("#reporteDia").append(srtHtml);
            });
        });
    $("#dlgDetalleDia").dialog({
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}