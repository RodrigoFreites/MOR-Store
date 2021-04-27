// Account Settings
$('#send-btn').click(function(){
    var name = $('#username').val();
    var mail = $('#email').val();
    var pass = $('#password').val();

    if(name.length == "")
    {
        $("#p1").text("Por favor. Ingrese su nombre");
        $("#name").focus();
        return false;
    }

    else if(mail.length == "")
    {
        $("#p2").text("Por favor. Ingrese su Email");
        $("#mail").focus();
        return false;
    }

    else if(pass.length == "")
    {
        $("#p3").text("Por favor. Ingrese su contrasenia");
        $("#pass").focus();
        return false;
    }

    else{
        var con = confirm("Esta listo?");
        if(con == true)
        {
            alert("Bienvenido a MOR Store");
            return true;
        }
        else{
            return false;
        }
    }

});