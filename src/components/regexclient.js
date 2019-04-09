// filterWord takes in the result data and the search term from the search bar
export function filterWord(data, searchterm) {
   
    // regExSearchTerm is the given search term with i-flag to make search case-insensitive
    var regExSearchTerm = new RegExp(searchterm, "i")

    var selectedFeedback = [];

    // Function returns an array of results that contain the search term
    // TODO - Add search options regarding specific topics

    var feedbackFilter = data.map((item) => {
        if (regExSearchTerm.test(item.description)) {
            var position = item.description.search(regExSearchTerm)
            var whitespace = item.description.substr(position).search(whitespace)
            if (whitespace === -1) { whitespace = undefined }
            selectedFeedback.push(item)
            return item.description;
        }
    }
    )
    console.log(selectedFeedback, "Seleted results")
    return selectedFeedback;

}
// regExPortal function was used to test out the regEx in content search
// export function regExPortal(data) {
//     // Search term 
//     var searchTerm = /kii/i
//     // Finds the next whitespace
//     var whitespace = /\s{1,1}/
//     // Test array in finnish to play around with regEx
//     var arrayA = [
//         { a: "Kiitos kaikille avusta." },
//         { a: "Aina välillä tarvitaan kiitosta" },
//         { a: "Kuka sanoi kiitos sinulle metrossa?" },
//         { a: "Seuraava sana on KIITOS" },
//         { a: "KIITOS oli ensimmäinen sana" },
//         { a: "Kiitoksia sinulle" }]

//     // Goes through the array to uses regEx to each item
//     // returns returns matching array regDemo
//     var regDemo = arrayA.map((item => {
//         // If item contains searchTerm = true
//         if (searchTerm.test(item.a)) {

//             // Position of index of the searchTerm in string
//             var position = item.a.search(searchTerm)

//             // Makes a substring starting from the index of position and searches position of the next whitespace
//             var whitespace = item.a.substr(position).search(whitespace)

//             // If whitespace = -1 -> string ends so this must be undefined
//             if (whitespace === -1) { whitespace = undefined }

//             // Creates a new string by using positions of the found searchTerm and next whitespace (or undefined if it is the last word)
//             var newString = item.a.substr(item.a.search(searchTerm), whitespace)

//             // Own notes in Finnish
//             console.log(item.a, "<-", searchTerm + " regEx lause, sana löytyi indexillä", position, "seuraavaan whitespaceen asti teksti:", newString)
//             console.log(whitespace, "whitespace result")
//             // Returns the string, if nothing found the result is undefined
//             return newString
//         }
//         // console.log(regDemo)
//     }))

//     //prints the regDemo to console after running
//     console.log(regDemo, "<- RegDemo funktion jälkeen")
// }