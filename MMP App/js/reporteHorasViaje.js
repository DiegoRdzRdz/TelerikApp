var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    $("#nombre").append(fullName);
    generaReporte(personId);
});

function crearHoras() {
    location = "crearHorasViaje.html?personId=" + personId + "&fullName=" + fullName;
}

function generaReporte(personId) {
    var eventos;
    var srtHtml;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + 12653 + "/horasViajeHF";
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'eventos') {
                    eventos = val;
                }
            });
            $("#reporte").append("<tbody>");
            $.each(eventos, function (i, item) {
                srtHtml = "<tr><td>" + item.fecha + "</td><td>" + item.horas + "</td>" +
                    "<td>" + item.estatus + "</td><td>" + item.comentario + "</td></tr>";
                $("#reporte").append(srtHtml);
            });
            $("#reporte").append("</tbody>");
            $("#reporte").kendoGrid();
        });
}