// Formats a Date object into the format needed for the API
format_date = function(date_obj) {
    // We sum 1 since the month is zero based and since UTC makes our day 1 less
    month = parseInt(date_obj.getMonth()) + 1 
    day = parseInt(date_obj.getDate()) + 1 
    year = date_obj.getFullYear()
    return month + "-" + day + "-" + year
}


// Formats the dates into the needed URL
format_url = function(date_start, date_end) {
    str_date_start = format_date(date_start)
    str_date_end = format_date(date_end)

    url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='" + str_date_start + "'&@dataFinalCotacao='" + str_date_end + "'&$top=100&$format=json"
    alert(url)
}



// Main driver function
get_quotation = function() {
    var one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var start_date = document.getElementById("startDate").value
    var end_date = document.getElementById("endDate").value

    /*
    if (start_date === "" || end_date === "") {
	alert("Both dates must be filled in!")
	return
    }
    */

    start_date = new Date(start_date)
    end_date = new Date(end_date)
    days_difference = Math.round((end_date-start_date) / one_day)
    /*
    if (days_difference < 10 || days_difference > 90) {
	alert("Dates must be between 10 and 90 days of each other!")
	return
    }
    */

    format_url(start_date, end_date)

}

