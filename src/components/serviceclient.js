
// GET list of service_codes from Open311 API
export function getServiceList(){
    return fetch("https://asiointi.hel.fi/palautews/rest/v1/services.json?locale=fi")
    .then(function(response){
        if (response.statusText === "400") {
            return "Status 400 - General server error"
        }
        else {
            return response.json();
        }
    }
    )
}

// GET all service requests with specific service_code from Open311 API
export function getAllServiceRequests(service_code){
    var serviceCode = "&service_code=" + service_code;
    var apiBase = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?extensions=true&locale=fi";
    return fetch (apiBase+serviceCode)
    .then(function(response){
        return response.json();
    }
    )
}