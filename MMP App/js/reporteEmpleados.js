var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    var fecha = $.getLunes();
    $("#nombre").append(fullName);
    $("#fechaInicial").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
    var lunes = $.formateaFechaNumerico(fecha);
    fecha.setDate(fecha.getDate() + 6);
    $("#fechaFinal").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
    var domingo = $.formateaFechaNumerico(fecha);
    generaReporte(lunes, domingo);
});

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

function reporteHorasViaje() {
    location = "reporteEmpleados.html?personId=" + personId + "&fullName=" + fullName;
}

function generaReporte(fechaInicial, fechaFinal) {
    var empleados;
    var srtHtml;
    var totalHoras;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + "-115" +
        "/fechaInicio/" + fechaInicial + "/fechaFin/" + fechaFinal + "/reporteEmpleadosHF";
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'empleados') {
                    empleados = val;
                }
                if (key == 'totalHoras') {
                    totalHoras = val;
                }
            });
            $("#totalHoras").append("<label id='totalHorasLbl'>" + totalHoras + "</label>");
            $("#reporte").append("<tbody class='repDia'>");
            $.each(empleados, function (i, item) {
                srtHtml = "<tr><td>" + item.employeeId + "</td><td>" + item.fullName + "</td>" +
                    "<td>" + item.horas + "</td>" +
                    "<td><input type='button' value='Ver detalle' onclick='verDetalle(" + 
                    fechaInicial + "," + fechaFinal + "," + item.personId +")'/></td></tr>";
                $("#reporte").append(srtHtml);
            });
            $("#reporte").append("</tbody>");
            $("#reporte").kendoGrid();
        });
}

function verDetalle(fechaInicial, fechaFinal, personIdEmp) {
    var dias;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personIdEmp +
        "/fechaInicio/" + fechaInicial + "/fechaFin/" + fechaFinal + "/reportePersonalHF";
    $(".dtlDia").remove();
    var strHead = "<tr class='dtlDia'><td>Fecha</td><td>Horas</td></tr>";
    $("#reporteDia").append(strHead);
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'dias') {
                    dias = val;
                }
            });
            $.each(dias, function (i, item) {
                srtHtml = "<tr class='dtlDia'><td>" + item.fechaF + "</td><td>" + item.horas + "</td></tr>";
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