var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
function login(form) {
    var email = form.email.value;
    var pwd = form.pwd.value;
    var userValid;
    var employeeID;
    var fullName;
    if (email == '' || pwd == '') {
        alert('Email y password son requeridos');
        return;
    }
    $.ajax({
        url: "http://cloud.metalsa.com/BusServiceMetalsa-war/service/autenticar",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            usuario: email,
            password: pwd
        }),
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (key, val) {
            if (key == 'userValid') {
                userValid = val;
            }
            if (key == 'employeeID') {
                employeeID = val;
            }
            if (key == 'fullName') {
                fullName = val;
            }
        });
        if (userValid == 'true') {
            window.location = "home.html?personId=" + employeeID + "&fullName=" + fullName;
        } else {
            alert('Credenciales invalidas');
        }
    }).fail(function (jqXHR, textStatus) {
        alert("Error en el servidor");
    });
}