/**
 * Script com funções principais
 */

//cria uma constante com a url da api
const URL = "http://localhost:8080/";



/**
 * Função para realizar requisições ajax
 * @param {string} path - URL da requisição
 * @param {string} method - Método da requisição (GET, POST, PUT, DELETE)
 *
 * @returns data or null
 */
function RequestService(path, method, json=null)
{
    var result = null;
    var dataType = "json";

    /**
     * Essa parte ocorre uma verifcação do método de requisição
     * Se o metodo for PUT ou DELETE precisamos mudar o datatype para text
     * Para que possomos ter uma resposta do servidor
     */
    if(method == "PUT" || method == "DELETE")
        dataType = "text";


    $.ajax({
        type: method,
        url: URL + path,
        dataType: dataType,
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        async: false, //sincrono
        success: function (data) {
            result = data;
        },
        error: function (data) {
            result = false;
        }
    });
    return result;
}


// função para pegar os dados do formulário e transformar em json
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


//obtem todos os dados de qualquer tabela
function getAllData(path)
{
    var result = RequestService(path, "GET");
    return result;
}



