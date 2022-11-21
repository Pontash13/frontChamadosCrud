//Quando a página carregar
$(document).ready(function () {
    //Verificando se existe algum usuário criado
    const result = getAllData("users/all")
    //tamaho da reposta
    var many = Object.keys(result).length;
    if (many == 0)
    {
        alert("Não há usuários cadastradosm, cadastre um usuário para poder criar um ticket");
        //redireciona para a página de cadastro
        window.location.href = "../index.html";
    }
});

//Quando o formulário de chamado for enviado
$("#formTicket").submit(function(e){
    var json = getFormData($(this));
    //add o id do usuário dentro de outro json
    json.id = null;
    json.status = 1;
    json.requester = {"id": json.requester};

    var result = RequestService("tickets/create", "POST", json);

    if(result)
    {
        alert("Chamado criado com sucesso!");
        window.location.href = "../index.html";
    }
    else
    {
        alert("Erro ao criar chamado!");
    }
});


//Coloca todos os usuários disponíveis no select
document.addEventListener("DOMContentLoaded", function(event) {
    //pega os usuários e coloca no select
    var users = RequestService("users/all", "GET");
    var select = document.getElementById("requester");
    users.forEach(function(user){
        var option = document.createElement("option");
        option.value = user.id;
        option.text = user.name;
        select.appendChild(option);
    });
});
