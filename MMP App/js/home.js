var fullName;
var personId;
function iniciaParametros(){
    fullName = decodeURIComponent($.urlParam('fullName'));
    personId = decodeURIComponent($.urlParam('personId'));
}
$(function () {
    iniciaParametros();
    $("#nombre").append(fullName);
});
function horariosFlexibles() {
    location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
};
