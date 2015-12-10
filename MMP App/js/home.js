var fullName = decodeURIComponent($.urlParam('fullName'));
var personId = decodeURIComponent($.urlParam('personId'));
$(function () {
    $("#nombre").append(fullName);
});

function horariosFlexibles() {
    location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
};