// Formats a Date object into the format needed for the API
format_date = function(date_obj) {

    // We sum 1 since the month is zero based and since UTC makes our day 1 less
    month = parseInt(date_obj.getMonth()) + 1
    if(month < 10) month = "0" + month

    day = parseInt(date_obj.getDate()) + 1
    if(day < 10) day = "0" + day

    year = date_obj.getFullYear()
    return month + "-" + day + "-" + year
}


format_url = function(date_start, date_end, order, buyOrSell) {
    str_date_start = format_date(date_start)
    str_date_end = format_date(date_end)

    url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='" + str_date_start + "'&@dataFinalCotacao='" + str_date_end + "'&$top=100&$orderby=" + buyOrSell + "%20" + order + "&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao"
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
    let start_date = document.getElementById("startDate").value
    let end_date = document.getElementById("endDate").value
    let buyOrSell = document.getElementById("buyOrSell").value
    let order = document.getElementById("order").value

    start_date = new Date(start_date)
    end_date = new Date(end_date)
    days_difference = Math.round((end_date-start_date) / one_day)

    if (days_difference < 10 || days_difference > 90) {
        alert("Escolha um período de 10 a 90 dias")
        return
    }

    url = format_url(start_date, end_date, order, buyOrSell)
    update_html(url)
}


