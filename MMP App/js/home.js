var personId = decodeURIComponent($.urlParam('personId'));
var fullName = decodeURIComponent($.urlParam('fullName'));
$(function () {
    var strHtml = "<img src='http://gpmappora1-d.grupoproeza.com.mx:8113/DirectorioTelefonico/" + 
    					"utils.do?method=getPhotoPremisys&person_id=" + personId + 
        				"' width=140 height=465  class='img-responsive center-block'/>";
    $("#nombre").append(fullName);
    $("#user-img-b").append(strHtml);
    
});

function horariosFlexibles() {
    window.location = "reportePersonal.html?personId=" + personId + "&fullName=" + fullName;
};