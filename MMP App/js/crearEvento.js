var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    var fecha = new Date();
    $("#fechaInicial").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
    $("#horasSolicitadas").kendoNumericTextBox({
        format: "n0"
    });
    $("#minutosSolicitados").kendoNumericTextBox({
        format: "n0"
    });
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + personId + "/eventoTipoPersonaHF";
    $.getJSON(urlServ,
        function (data) {
            var eventos;
            var strHtml;
            $.each(data, function (key, val) {
                if (key == 'eventos') {
                    eventos = val;
                }
            });
            $.each(eventos, function (i, item) {
                strHtml = "<option value='" + item.id + "' tipoEvento='" + item.id + "' bancoHoras='" + item.banco +
                    "'>" + item.descripcion + "</option>";
                $("#comboEvento").append(strHtml);
            });
            $("#comboEvento").kendoComboBox();
        });
    $("#comboEvento").change(function () {
        alert("cambios");
    });
});

function crearEvento(form) {
    alert('evento creado');
    location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
}