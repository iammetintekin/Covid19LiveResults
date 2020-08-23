var data = null;

var xhr = new XMLHttpRequest();

const toplamolu = document.getElementById("totalDeath");
const toplamvaka = document.getElementById("totalConfirmed");
const yenivaka = document.getElementById("newConfirmed");
const toplamiyilesen = document.getElementById("totalRecovered");
const yeniolum = document.getElementById("newDeath");
const yeniiyilesen = document.getElementById("newRecovered");

const tarih = document.getElementById("sonyenileme");

const tbody = document.getElementById("tbody");

XMLHttpRequest.withCredentials = true;
//console.log(xhr.readyState);
xhr.addEventListener("readystatechange",function(){
    if(this.readyState === this.DONE){
        const json = JSON.parse(this.responseText).Global;
        const genel = JSON.parse(this.responseText).Countries;

        const yenileme = genel[173].Date;
        const tariho = new Date(yenileme);
        let gun,ay,yil,saat,dakika;
        gun = tariho.getDate();
        ay = tariho.getMonth()+1;
        yil = tariho.getFullYear();
        saat = tariho.getUTCHours();
        dakika = tariho.getUTCMinutes();
        console.log(tariho);
        tarih.textContent = "Last Updated "+ gun+"/"+ ay+"/"+ yil + " "+ saat + ":"+dakika ;
        for(let i = 0; i<genel.length; i++){
            tbody.innerHTML += `<tr>
            <th scope="row"> 
            <img src="https://www.countryflags.io/${genel[i].CountryCode}/flat/32.png"></th>
            <td>${genel[i].Country}</td>
            <td class="text-primary">${genel[i].TotalConfirmed}</td>
            <td class="text-success">${genel[i].TotalRecovered}</td>
            <td class="text-danger">${genel[i].TotalDeaths}</td>
            <td class="text-danger">+ ${genel[i].NewDeaths}</td>
          </tr>`;
            // console.log(genel[i].Country);
            // console.log(genel[i].TotalConfirmed);
            // console.log(genel[i].TotalRecovered);
            // console.log(genel[i].TotalDeaths);
        }


        let NewConfirmed = json.NewConfirmed;
        let TotalConfirmed = json.TotalConfirmed;
        let NewDeaths = json.NewDeaths;
        let TotalDeaths = json.TotalDeaths;
        let NewRecovered = json.NewRecovered;
        let TotalRecovered = json.TotalRecovered;

        toplamiyilesen.textContent = TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        toplamvaka.textContent = TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        yenivaka.textContent = "+" +  NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        toplamolu.textContent = TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        yeniolum.textContent = "+" +  NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        yeniiyilesen.textContent = "+" + NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log(json);
    //     console.log(json.length);
    //     for (let index = 0; index <= json.length; index++){
    //         console.log(json[index].Country);
            
    //     }
    //    console.log(json);
    }
});

xhr.open("GET", "https://api.covid19api.com/summary");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("Retry-After", "3600");
xhr.send(data);
