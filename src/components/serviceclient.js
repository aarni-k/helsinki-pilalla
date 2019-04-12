// GET list of service_codes from Open311 API
export function getServiceList() {
    return fetch("https://asiointi.hel.fi/palautews/rest/v1/services.json?locale=fi")
        .then(function (response) {
            if (response.statusText === "400") {
                // console.log(response, "error, getServiceList")
                return "Status 400 - General server error"
            }
            else {
                // console.log(response,"not error, getServiceList")
                return response.json();
            }
        }
        )
}
export function getYearlyServiceRequests(givenyear) {


    var calendar = [{month: "Jan", firstD: new Date(2018,0,1), lastD: new Date(2018,0,31)},
                    {month: "Feb", firstD: new Date(2018,1,1), lastD: new Date(2018,1,28)},
                    {month: "Mar", firstD: new Date(2018,2,1), lastD: new Date(2018,2,31)},
                    {month: "Apr", firstD: new Date(2018,3,1), lastD: new Date(2018,3,30)},
                    {month: "May", firstD: new Date(2018,4,1), lastD: new Date(2018,4,31)},
                    {month: "Jun", firstD: new Date(2018,5,1), lastD: new Date(2018,5,30)},
                    {month: "Jul", firstD: new Date(2018,6,1), lastD: new Date(2018,6,31)},
                    {month: "Aug", firstD: new Date(2018,7,1), lastD: new Date(2018,7,30)},
                    {month: "Sep", firstD: new Date(2018,8,1), lastD: new Date(2018,8,31)},
                    {month: "Oct", firstD: new Date(2018,9,1), lastD: new Date(2018,9,30)},
                    {month: "Nov", firstD: new Date(2018,10,1), lastD: new Date(2018,10,31)},
                    {month: "Dec", firstD: new Date(2018,11,1), lastD: new Date(2018,11,30)},                   
                    ]
    
    var ISOcalendar = calendar.map((item) => {
        return {month:item.month, firstD:item.firstD.toISOString(), lastD:item.lastD.toISOString()}
    })
    console.log(calendar, "NORMI CALENDAR")
    console.log(ISOcalendar, "ISO CALENDAR")
    var allTheRequests = [];
    var requestHandler = ISOcalendar.map((item) => {
     
        var firstD = "&start_date=" + item.firstD
        var lastD = "&end_date=" + item.lastD
        var apiBase = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?locale=fi";
        console.log(apiBase+firstD+lastD, "urli!")
            fetch(apiBase+firstD+lastD)
            .then(function (response) {
                var returnedData = response.json();
                console.log(returnedData,"Returned data json")
                if (response.PromiseStatus= "resolved") {
                    allTheRequests.push(returnedData.PromiseValue)
                    
                }
                
            }
            )    
    })
    console.log(allTheRequests,"All the requests!")
    return allTheRequests;

}

// GET all service requests with specific service_code from Open311 API
export function getAllServiceRequests(status, serviceCode, startDate, endDate) {

    status = "&status=" + status

    if (serviceCode !== "notUsed") { serviceCode = "&service_code=" + serviceCode }
    if (startDate !== "notUsed" && endDate !== "notUsed") {
        startDate = "&start_date=" + startDate
        endDate = "&end_date=" + endDate
    }

   


    var apiBase = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?locale=fi";
    var searchTerms = status;

    if (serviceCode !== "notUsed") { searchTerms += serviceCode }
    if (startDate !== "notUsed" && endDate !== "notUsed") { searchTerms += startDate + endDate }

    // console.log(apiBase + searchTerms,"Search Url")
    return fetch(apiBase + searchTerms)
        .then(function (response) {
            return response.json();
        }
        )
}

