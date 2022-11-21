//Quando a página carregar
$(document).ready(function () {
    const result = getAllData("tickets/all");

    var table = document.getElementById("tableTickets");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    result.forEach(function(ticket){
        var tr            = document.createElement("tr");
        var tdId          = document.createElement("a");
        var tdName       = document.createElement("td");
        var tdDescription = document.createElement("td");
        var tdRequester   = document.createElement("td");
        var tdStatus      = document.createElement("td");
        var tdDelete       = document.createElement("button");

        tdId.href               = "seeTicket.html?id=" + ticket.id;
        tdId.innerHTML          = ticket.id;

        tdName.innerHTML       = ticket.name;

        tdDescription.innerHTML = ticket.description;

        tdRequester.innerHTML   = ticket.requester.name;

        switch(ticket.status){
            case 1:
                tdStatus.innerHTML      = "Aberto";
                break;
            case 2:
                tdStatus.innerHTML      = "Em andamento";
                break;
            case 3:
                tdStatus.innerHTML      = "Fechado";
                break;
        }

        tdDelete.innerHTML       = "Deletar";
        tdDelete.id              = "btnDelete";

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription);
        tr.appendChild(tdRequester);
        tr.appendChild(tdStatus);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);
    });
});



//Quando o botão de deletar for clicado
$(document).on("click", "#btnDelete", function(){
    var id = $(this).parent().find("a").html();

    //pede confirmação
    if(confirm("Tem certeza que deseja deletar o chamado " + id + "?"))
    {
        //obtem todos os acompanhamentos do chamado
        const followups = getAllData("followups/ticket/" + id);

        //Precisamos deletar todos os acompanhamentos antes de deletar o chamado
        followups.forEach(function(followup){
            RequestService("followups/delete/" + followup.id, "DELETE");
        });

        //deleta o chamado
        var result = RequestService("tickets/delete/" + id, "DELETE");

        if(result)
        {
            alert("Ticket deletado com sucesso!");
            window.location.href = "listTickets.html";
        }
        else
        {
            alert("Erro ao deletar ticket!");
        }
    }
});