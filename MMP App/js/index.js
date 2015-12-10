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
    var request = $.ajax({
        url: "http://cloud.metalsa.com/BusServiceMetalsa-war/service/autenticar",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            usuario: email,
            password: pwd
        }),
        dataType: "json"
    });
    request.done(function (data) {
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
            location = "home.html?personId=" + employeeID + "&fullName=" + fullName;
        } else {
            alert('Credenciales invalidas');
        }
    });
    request.fail(function (jqXHR, textStatus) {
        alert("Error en el servidor");
    });
};