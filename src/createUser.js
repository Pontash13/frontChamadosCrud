
//Quando o formulário de chamado for enviado
$("#formUser").submit(function(e){
    var json = getFormData($(this));
    json.id = null;

    var result = RequestService("users/create", "POST", json);

    if(result)
    {
        alert("Usuário criado com sucesso!");
        window.location.href = "../index.html";
    }
    else
    {
        alert("Erro ao criar usuário!");
    }
});

