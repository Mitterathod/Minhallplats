getData();
function getsiteid() {
    const span = document.getElementById("information");
    savedata(span.value);
    const div = document.getElementById("siteid");
    const url = "https://api.sl.se/api2/typeahead.json?key=1b408968f5e546b6a4c5395d8b9f2187&searchstring=" + span.value + "&stationsonly=True&maxresults=1";
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let info = data.ResponseData;

            return info.map(function (info) {
                div.innerHTML += info.SiteId;
                getrealinfo();
            });
        })

        .catch(function (error) {
            console.log(error);
        });
}



getData();
function out() {
    const span = document.getElementById("from");
    savedata(span.value);
    const div = document.getElementById("siteid");
    const resa_table = document.getElementById("resa_info");
    resa_table.innerHTML = '';
    const url = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=27eb1928a7a241d5b2ac2126871e7a38&siteid=9192&timewindow=15";
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let info = data.ResponseData.Metros;
            return info.map(function (info) {
                resa_table.innerHTML += "<tr><td>" + info.Destination + "</td><td>" + info.DisplayTime + "</td></tr>";
          
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}



function getData() {
    const url = "https://cors-anywhere.herokuapp.com/http://primat.se/services/data/mitterathod@hotmail.com-tidtabell_app.json";
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let info = data.data;
            return info.map(function (info) {
                document.getElementById("from").value =
                    info.station;
                    
            })
        })
        .catch(function (error) {
            
            console.log(error);
        });
}



function savedata(Stationsplats) {
    const url = "https://cors-anywhere.herokuapp.com/http://primat.se/services/sendform.aspx?xid=tidtabell_app&xmail=mitterathod@hotmail.com&station=" + Stationsplats;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let info = data.data;
            console.log(resp);
            return info.map(function (info) {
                document.getElementById("information").innerHTML += "<tr><td>" + info.Destination + "</td><td>" + info.DisplayTime + "</td></tr>";
           

            })
        })
        .catch(function (error) {
            console.log(error);
        });
}


function showdata(){

var url2 = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=27eb1928a7a241d5b2ac2126871e7a38&siteid=9192&timewindow=15";
fetch(url2)
    .then((resp) => resp.json())
    .then(function (data){
        let infos = data.ResponseData.Metros;
        console.log(data)
        return infos.map(function (info) {


var minut = 0;
if (info.DisplayTime !== "Nu"){
    if(info.DisplayTime.indexOf("min")!=-1){
        minut = info.DisplayTime.replace(" min", " ")-3
        console.log   
    }
  
}
if(info.DisplayTime.indexOf(":")!=-1){
    minut = (Date.parse(info.ExpectedDateTime) - Date())/1000/60;
}
if (minut > 0){
    document.getElementById("resa_info").innerHTML += "<tr><td>"+ info.LineNumber + "</td><td>" + info.Destination + "</td><td>" + minut + "min</td><td>"+ info.DisplayTime + "</td></tr>";
}
})
})
}