import React, { Component } from 'react';
import { getServiceList } from './serviceclient';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


class SelectServiceType extends Component {
    state={serviceList:[]}
    componentDidMount() {
        this.props.callback({callbackid:"servicecode",service_code:"notUsed"})

        //Lisätty tähän, jotta ei kuormiteta apii :D :D 
        this.setState({serviceList:väliresponse})
            // getServiceList().then(data => { 
            //     console.log(data,"Service List")
            //     this.setState({serviceList:data})
            // })
}

    btnSelectService = (e) => {
        e.preventDefault();
        if (e.target.value === "selectAll") { return this.props.callback({callbackid:"servicecode",service_code:"notUsed"})}
        this.props.callback({callbackid:"servicecode",service_code:e.target.value})
        console.log(e.target.value,"selected service code")

    }

    render() {
        const serviceItems = this.state.serviceList.map(
            (values) => {
            return <Button key={values.service_code} onClick={this.btnSelectService} value={values.service_code}>{values.service_name}</Button>
            }
            )
        return (
            <div>
                <Button value="selectAll" onClick={this.btnSelectService}>Select all</Button>
                <br/>
                
                {serviceItems}
              
            </div>
        );
    }
}
const väliresponse = [ 
	{
		"service_code":"172",
		"service_name":"Ilkivalta",
		"description": "Onko puistonpenkki heitetty ojaan tai infotaulu rikottu? Anna palautetta ilkivaltaan liittyen.",
		"metadata":false,
		"type":"realtime",
		"keywords": "ilkivalta, penkit, istuimet,pöydät, katokset, grillit, lipputangot, roska-astiat",
		"group":"Puhtaanapito"
	},
	{
		"service_code":"246",
		"service_name":"Roskaaminen",
		"description":"Ilmoita, jos havaitset suuria määriä roskia yleisillä alueilla, puistoissa tai metsissä.",
		"metadata":false,
		"type":"realtime",
		"keywords": "roska,jäte",
		"group":"Puhtaanapito"
	},
	{
		"service_code":"176",
		"service_name":"Töhryjen poisto",
		"description":"Ilmoita, jos paikkoja tai seiniä on töhritty.",
		"metadata":false,
		"type":"realtime",
		"keywords": "roska,jäte",
		"group":"Puhtaanapito"
	},
	{
		"service_code":"171",
		"service_name":"Katujen kunto",
		"description":"Onko tiessä kuoppa? Anna palautetta katujen kuntoon liittyen.",
		"metadata":false,
		"type":"realtime",
		"keywords": "tie,kuoppa",
		"group":"Katujen kunto ja liikenne"
	},
	{
		"service_code":"198",
		"service_name":"Liikennemerkit",
		"description":"Ilmoita, jos liikennemerkki on ajettu nurin, vinossa tai siinä on muuta huomautettavaa.",
		"metadata":false,
		"type":"realtime",
		"keywords": "liikennemerkki,valot",
		"group":"Katujen kunto ja liikenne"
	},
	{
		"service_code":"199",
		"service_name":"Kyltit ja opasteet",
		"description":"Ilmoita, jos kaupungin kylteissä ja opasteissa on huomautettavaa.",
		"metadata":false,
		"type":"realtime",
		"keywords": "kyltit,opasteet",
		"group":"Katujen kunto ja liikenne"
	},
	{
		"service_code":"174",
		"service_name":"Puistot",
		"description":"Ilmoita, jos huomaat puiston olevan huonossa kunnossa.",
		"metadata":false,
		"type":"realtime",
		"keywords":"pensaat,kasvit",
		"group":"Metsät ja puistot"
	},
	{
		"service_code":"211",
		"service_name":"Leikki- ja liikuntapuistot",
		"description":"Ilmoita, jos leikki- tai liikuntapuiston välineissä on huomautettavaa.",
		"metadata":false,
		"type":"realtime",
		"keywords":"leikkipuisto,liikuntapaikka",
		"group":"Metsät ja puistot"
	},
	{
		"service_code":"234",
		"service_name":"Metsät",
		"description":"Ilmoita, jos metsä tarvitsee hoitoa.",
		"metadata":false,
		"type":"realtime",
		"keywords":"metsä, pelto",
		"group":"Metsät ja puistot"
	},
	{
		"service_code":"180",
		"service_name":"Muu korjattava asia",
		"description":"Onko joku muu korjattava asia joka vaatisi kaupungin toimia?",
		"metadata":false,
		"type":"realtime",
		"keywords":"",
		"group":"Muut korjattavat asiat"
	},
	{
		"service_code":"2805",
		"service_name":"Kasvatus ja koulutus",
		"description":"Kasvatuksen ja koulutuksen toimiala",
		"metadata":false,
		"type":"realtime",
		"keywords":"varhaiskasvatus,esiopetus,perusopetus,lukio,ammatillinen koulutus",
		"group":"Toimialat"
	},
	{
		"service_code":"2806",
		"service_name":"Kaupunkiympäristö",
		"description":"Kaupunkiympäristö",
		"metadata":false,
		"type":"realtime",
		"keywords":"maankäyttö,kaupunkirakenne,rakennukset,yleiset alueet,luvat",
		"group":"Toimialat"
	},
	{
		"service_code":"2807",
		"service_name":"Kulttuuri ja vapaa-aika",
		"description":"Kulttuuri ja vapaa-aika",
		"metadata":false,
		"type":"realtime",
		"keywords":"kulttuuri,taide,vapaa-aika,ruotsinkielinen työväenopisto",
		"group":"Toimialat"
	},
	{
		"service_code":"2808",
		"service_name":"Sosiaali- ja terveyspalvelut",
		"description":"Sosiaali- ja terveystoimiala",
		"metadata":false,
		"type":"realtime",
		"keywords":"perhepalvelut,sosiaalipalvelut,terveys,päihdepalvelut,sairaalapalvelut,kuntoutus,hoivapalvelut",
		"group":"Toimialat"
	},
	{
		"service_code":"2809",
		"service_name":"Yleinen ja muu palaute",
		"description":"Keskushallintoa tai useita toimialoja tai muita asioita koskeva palaute",
		"metadata":false,
		"type":"realtime",
		"keywords":"yleinen palaute",
		"group":"Toimialat"
	}
]
export default SelectServiceType;