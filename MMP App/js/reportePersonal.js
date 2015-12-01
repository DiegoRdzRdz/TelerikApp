$(function () {
    var dias;
    var srtHtml;
    var totalHoras;
    var fullName = decodeURIComponent($.urlParam('fullName'));
    var personId = decodeURIComponent($.urlParam('personId'));
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personId +
        "/fechaInicio/20150323/fechaFin/20150329/reportePersonalHF";
    $("#nombre").append(fullName);
    $("#fhIni").datepicker({
      showOn: "button",
      buttonImage: "img/iconoCalendario.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    $("#fhFin").datepicker();
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
            $("#totalHoras").append(totalHoras);
            $.each(dias, function (i, item) {
                srtHtml = "<tr><td>" + item.fechaF + "</td><td>" + item.horas + "</td>" +
                    "<td><input type='button' value='Ver detalle' onclick='verDetalle(" +
                    item.fecha + ")'/></td></tr>";
                $("#reporte").append(srtHtml);
            });
        });
});

function verDetalle(fecha) {
    var eventos;
    var personId = decodeURIComponent($.urlParam('personId'));
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + "16917" +
        "/fecha/20150408/detalleDiaHF";
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