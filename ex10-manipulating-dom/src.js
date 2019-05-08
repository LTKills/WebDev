// Definitions
var ERROR = "ERROR"
var START_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" 
var END_URL = "'&$top=100&$format=json"



// Formats a Date object into the format needed for the API
format_date = function(date_obj) {

    // We sum 1 since the month is zero based and since UTC makes our day 1 less
    month = parseInt(date_obj.getMonth()) + 1
    if(month < 10) month = "0" + month

    day = parseInt(date_obj.getDate()) + 1
    if(day < 10) day = "0" + day

    year = date_obj.getFullYear()

    if (year != "2018"){
	alert("Date must be in 2018!")
	return ERROR
    }

    return month + "-" + day + "-" + year
}


format_url = function(date) {
    str_date = format_date(date)
    url = START_URL + str_date + END_URL

    return url
}


show_quotations = function(table, quotations) {
    for (i = 0; i < quotations.length; i++) {
        // create table row
        var row = document.createElement("tr")
        var date_td = document.createElement("td")
        var buy_td = document.createElement("td")
        var sell_td = document.createElement("td")
        row.appendChild(date_td)
        row.appendChild(buy_td)
        row.appendChild(sell_td)

        // put data in row
        date_td.innerHTML = quotations[i].dataHoraCotacao
        buy_td.innerHTML = quotations[i].cotacaoCompra
        sell_td.innerHTML = quotations[i].cotacaoVenda
        table.appendChild(row)
    }
}


update_html = function (url) {
    // delete old table rows (if any)
    table = document.getElementById("dataRows")
    while(table.firstChild) {
        table.firstChild.remove()
    }

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
    let one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    let date = document.getElementById("day").value
    date = new Date(date)

    url = format_url(date)
    if (url != ERROR){
	update_html(url)
    }
}


