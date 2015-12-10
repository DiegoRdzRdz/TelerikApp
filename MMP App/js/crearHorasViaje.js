var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
var app = new kendo.mobile.Application();
$(function () {
    var fecha = new Date();
    $("#fechaInicial").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: fecha
    });
});

function crearEvento(form) {
    alert('evento creado');
    location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
}