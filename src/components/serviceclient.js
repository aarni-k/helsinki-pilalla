// GET list of service_codes from Open311 API
export function getServiceList(){
    return fetch("https://asiointi.hel.fi/palautews/rest/v1/services.json?locale=fi")
    .then(function(response){
        if (response.statusText === "400") {
            console.log(response, "error, getServiceList")
            return "Status 400 - General server error"
        }
        else {
            console.log(response,"not error, getServiceList")
            return response.json();
        }
    }
    )
}

// GET all service requests with specific service_code from Open311 API
export function getAllServiceRequests(status, serviceCode, startDate, endDate){
    console.log("getAllServiceRequests Fired!")
    
    status = "&status=" + status
    
    if (serviceCode !== "notUsed") {serviceCode = "&service_code=" + serviceCode}
    if (startDate !== "notUsed" && endDate !== "notUsed") {
        startDate = "&start_date=" + startDate
        endDate = "&end_date=" + endDate}



    var apiBase = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?extensions=true&locale=fi";
    var searchTerms = status;

    if (serviceCode !== "notUsed") {searchTerms += serviceCode}
    if (startDate !== "notUsed" && endDate !== "notUsed") { searchTerms += startDate + endDate}

    console.log(apiBase + searchTerms,"Search Url")
    return fetch (apiBase+searchTerms)
    .then(function(response){
        return response.json();
    }
    )
}

    