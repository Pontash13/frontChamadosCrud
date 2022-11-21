//pega o id do ticket no url
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

$(document).ready(function () {
    const ticket_infos = getAllData("tickets/" + id);

    //preenche os campos
    $("#title").html(ticket_infos.name);
    $("#description").html(ticket_infos.description);
    $("#requester").html(ticket_infos.requester.name);
    $("#status").val(ticket_infos.status);

    //deleta itens do formulário de acompanhamento se o chamado estiver fechado
    if (ticket_infos.status == 3)
    {
        $("#status").remove();
        $("#content").remove();
        $("#submitFollowup").remove();
    }

    const followups = getAllData("followups/ticket/" + id);

    followups.reverse();
    followups.forEach(function(followup){
        $("#followups").append('<span class="block-follow">' + followup.content + '</span>');
    });
});

//Quando o formulário de chamado for enviado
$("#formFollowup").submit(function(e){
    var json = getFormData($(this));
    json.id = null;
    json.ticket = {"id": id};
    json.user = {"id": 1};

    //atuailiza o status do chamado
    var ticket = getAllData("tickets/" + id);
    ticket.status = json.status;
    RequestService("tickets/update", "PUT", ticket);


    var result = RequestService("followups/create", "POST", json);

    if(result)
    {
        alert("Acompanhamento adicionado com sucesso!");
        window.location.href = "../index.html";
    }
    else
    {
        alert("Erro ao criar followup!");
    }
});
