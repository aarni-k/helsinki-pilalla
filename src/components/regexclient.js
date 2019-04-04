export function regExPortal (data) {
    // console.log (data, "<- regex function data");
    var kiitos = /sinu/i
    var blanko = /\s{1,1}/
    var testiA = [
     {a : "Kiitos kaikille avusta."},
     {a : "Aina välillä tarvitaan kiitosta"},
     {a : "Kuka sanoi kiitos sinulle metrossa?"},
     {a : "Seuraava sana on KIITOS"},
     {a : "KIITOS oli ensimmäinen sana"},
     {a : "Kiitoksia sinulle"}]
     console.log(testiA,"arrayA")

     var regDemo = testiA.map((item => {
         if (kiitos.test(item.a)) {
             var position = item.a.search(kiitos)
             var whitespace = item.a.substr(position).search(blanko)
            if (whitespace === -1) {whitespace= undefined}
             var newString = item.a.substr(item.a.search(kiitos),whitespace)
             console.log(item.a, "<-",kiitos +" regEx lause, sana löytyi indexillä",position, "seuraavaan whitespaceen asti teksti:",newString)
             console.log(whitespace,"whitespace result")
         } 
     }))


     console.log(regDemo, "<- RegDemo funktion jälkeen")


        



    // })

}