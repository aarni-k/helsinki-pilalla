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