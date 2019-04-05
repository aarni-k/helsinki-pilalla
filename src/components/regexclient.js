export function regExPortal(data) {
    // Search term 
    var searchTerm = /Kiitos/i
    // Finds the next whitespace
    var whitespace = /\s{1,1}/
    // Test array in finnish to play around with regEx
    var arrayA = [
        { a: "Kiitos kaikille avusta." },
        { a: "Aina välillä tarvitaan kiitosta" },
        { a: "Kuka sanoi kiitos sinulle metrossa?" },
        { a: "Seuraava sana on KIITOS" },
        { a: "KIITOS oli ensimmäinen sana" },
        { a: "Kiitoksia sinulle" }]

    // Goes through the array to uses regEx to each item
    // returns returns matching array regDemo
    var regDemo = arrayA.map((item => {
        // If item contains searchTerm = true
        if (searchTerm.test(item.a)) {

            // Position of index of the searchTerm in string
            var position = item.a.search(searchTerm)

            // Makes a substring starting from the index of position and searches position of the next whitespace
            var whitespace = item.a.substr(position).search(whitespace)

            // If whitespace = -1 -> string ends so this must be undefined
            if (whitespace === -1) { whitespace = undefined }

            // Creates a new string by using positions of the found searchTerm and next whitespace (or undefined if it is the last word)
            var newString = item.a.substr(item.a.search(searchTerm), whitespace)

            // Own notes in Finnish
            console.log(item.a, "<-", searchTerm + " regEx lause, sana löytyi indexillä", position, "seuraavaan whitespaceen asti teksti:", newString)
            console.log(whitespace, "whitespace result")
            // Returns the string, if nothing found the result is undefined
            return newString
        }
    }))

    //prints the regDemo to console after running
    console.log(regDemo, "<- RegDemo funktion jälkeen")
}

export function filterWord(data) {

    var searchTerm = /miksi/i

    var blanko = /\s{1,1}/
    var selectedFeedback = [];
    var feedbackFilter = data.map((item) => {
        if (searchTerm.test(item.description)) {
            console.log(item)
            var position = item.description.search(searchTerm)
            var whitespace = item.description.substr(position).search(whitespace)
            if (whitespace === -1) { whitespace = undefined }
            // var newString = item.description.substr(position, whitespace)
            console.log(position,"Position of", searchTerm, "| Whitespace position", whitespace)
            // console.log(newString,"newString Item")
            selectedFeedback.push(item.description)
            return item.description;
        }
    }
    )

    console.log(feedbackFilter,"<- Feedback Filter")
    console.log(selectedFeedback,"<- Randoes")
    return feedbackFilter;

}