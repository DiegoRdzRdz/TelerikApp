var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    $("#nombre").append(fullName);
    generaReporte(personId);
});

function crearEvento() {
    location = "crearEvento.html?personId=" + personId + "&fullName=" + fullName;
}

function generaReporte(personId) {
    var eventos;
    var srtHtml;
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personId + "/eventosPersonaHF";
    $.getJSON(urlServ,
        function (data) {
            $.each(data, function (key, val) {
                if (key == 'eventos') {
                    eventos = val;
                }
            });
            $.each(eventos, function (i, item) {
                srtHtml = "<tr class='repDia'><td>" + item.fecha + "</td><td>" + item.evento + "</td>" +
                    "<td>" + item.horas + "</td><td>" + item.comentario + "</td></tr>";
                $("#reporte").append(srtHtml);
            });
        });
}