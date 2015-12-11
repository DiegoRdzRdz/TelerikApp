var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    var fecha = new Date();
    $("#horasSolicitadas").val("0");
    $("#minutosSolicitados").val("1");
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
    var urlServ = "http://cloud.metalsa.com/BusServiceMetalsa-war/service/person/" + 12661 + "/eventoTipoPersonaHF";
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
                strHtml = "<option value='" + item.id + "," + item.horas + "," + item.banco +
                    "'>" + item.descripcion + "</option>";
                $("#comboEvento").append(strHtml);
            });
            $("#comboEvento").kendoComboBox();
        });
    $("#comboEvento").change(function () {
        var valores = $(this).val().split(",");
        if (valores[2] == 1) {
            $("#horasDisponibles").val(valores[1]);
        } else {
            $("#horasDisponibles").val("");
        }
    });
});

function crearEvento(form) {
    var valores = $("#comboEvento option:selected").val().split(",");
    var minutosSolicitados = Number(Number(form.horasSolicitadas.val) * 60) + Number(form.minutosSolicitados.val);
    var minutosDisponibles = Number(valores[1]) * 60;
    alert(minutosSolicitados + " " + minutosSolicitados + " " + valores[2]);
    if (valores[2] == 1 && minutosSolicitados > minutosDisponibles) {
        alert("No puedes solicitar mas tiempo que el de tu banco de horas");
    } else {
        alert('evento creado');
        location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
    }
}