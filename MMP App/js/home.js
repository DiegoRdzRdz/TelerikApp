var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    $("#nombre").append(fullName);
});

function horariosFlexibles() {
    window.location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
};