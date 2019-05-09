// Definitions
var ERROR = "ERROR"
var START_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" 
var END_URL = "'&$top=100&$format=json"

// Initially we don't have any stocks
var VENDA_TOTAL = 0
var COMPRA_TOTAL = 0


format_date = function(date_obj) {
    // Formats a Date object into the format needed for the API
    // We sum 1 since the month is zero based and since UTC makes our day 1 less
    month = parseInt(date_obj.getMonth()) + 1
    if(month < 10) month = "0" + month

    day = parseInt(date_obj.getDate()) + 1
    if(day < 10) day = "0" + day

    year = date_obj.getFullYear()

    if (year != "2018"){
	return ERROR
    }
    return month + "-" + day + "-" + year
}


format_url = function(date) {
    str_date = format_date(date)
    if (str_date == ERROR) {
	return ERROR
    }

    return START_URL + str_date + END_URL
}


update_total = function() {
    // Update counts
    var sell_total = document.getElementById("sellTotal")
    var buy_total = document.getElementById("buyTotal")
    sell_total.innerHTML = VENDA_TOTAL.toFixed(4)
    buy_total.innerHTML = COMPRA_TOTAL.toFixed(4)
}


show_quotations = function(table, quotations) {
    // Updates our HTML with the quotations and total

    // Create new row
    var row = document.createElement("tr")
    var date_td = document.createElement("td")
    var buy_td = document.createElement("td")
    var sell_td = document.createElement("td")
    var delete_btn = document.createElement('button');

    // Populate
    row.appendChild(date_td)
    row.appendChild(sell_td)
    row.appendChild(buy_td)
    row.appendChild(delete_btn)

    // put data in row
    date_td.innerHTML = quotations[0].dataHoraCotacao
    sell_td.innerHTML = quotations[0].cotacaoVenda
    buy_td.innerHTML = quotations[0].cotacaoCompra
    delete_btn.textContent = 'Deletar'

    // Update table and counts
    table.appendChild(row)
    VENDA_TOTAL += Number(quotations[0].cotacaoVenda)
    COMPRA_TOTAL += Number(quotations[0].cotacaoCompra)
    update_total()

    // If we delete row, substract total
    delete_btn.onclick = function(e) {
        VENDA_TOTAL -= Number(row.cells[1].innerHTML)
	COMPRA_TOTAL -= Number(row.cells[2].innerHTML)
	table.removeChild(row);
	update_total()
    }
}


update_html = function (url) {
    var table = document.getElementById("dataTable")

    // get json file
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';

    // draw new html
    request.onload = function() {
        var result = request.response;
        show_quotations(table, result.value);
    }

    request.send();
}



get_quotation = function() {
    let date = document.getElementById("day").value
    date = new Date(date)

    url = format_url(date)
    if (url != ERROR){
	update_html(url)
    } else {
	alert("Ano da data precisa ser em 2018!")
    }
}
