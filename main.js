class Item {
    constructor(name, price, url){
        this.name = name;
        this.price = price;
        this.url = url;
    }

    Name(){
        return this.name;
    }
    
    Price(){
        return this.price;
    }

    Url(){
        return this.url;
    }

    vypis(){
        return "Kryptomena: " +this.name+ ", cena: " +this.price+ ", url: " +this.url;
    }
}

let pocet = 10;
let limit = 10;
let pocetRefresh = 0;
let bezi = false;

function neco(kolikrat){
    document.getElementById("aside").innerHTML = "";
    if(myInterval === false){
        myInterval = setInterval(function() {
            neco(pocet);
        }, 10000);   
    }
    let url = "";
    let i = 0;
    $("#tbody").empty();
    for (i; i < kolikrat; i++) {
        switch(i){
            case 0:
                url = "https://api.coingecko.com/api/v3/coins/gogocoin";
                break;
            case 1:
                url = "https://api.coingecko.com/api/v3/coins/rabbitking";
                break;
            case 2:
                url = "https://api.coingecko.com/api/v3/coins/shoot";
                break;
            case 3:
                url = "https://api.coingecko.com/api/v3/coins/signum";
                break;
            case 4:
                url = "https://api.coingecko.com/api/v3/coins/temple";
                break;
            case 5:
                url = "https://api.coingecko.com/api/v3/coins/wellness-convertible";
                break;
            case 6:
                url = "https://api.coingecko.com/api/v3/coins/zynecoin";
                break;
            case 7:
                url = "https://api.coingecko.com/api/v3/coins/daovc";
                break;
            case 8:
                url = "https://api.coingecko.com/api/v3/coins/bitcoinbam";
                break;
            case 9:
                url = "https://api.coingecko.com/api/v3/coins/pangolin";
                break;
        }
        necoDalsiho(url, false);
    }
}

function addRow(item) {
    const date = new Date
    for (let i = 0; i < 1; i++) {
        const row = document.createElement("tr");
  
        let cell = document.createElement("td");
        let cellText = document.createTextNode(item.Name());
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(item.Price());
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(date.getDate()+ "/" +(date.getMonth()+1)+ "/" +date.getFullYear()+ " " +date.getHours()+ ":" +date.getMinutes()+ ":" +date.getSeconds());
        cell.appendChild(cellText);
        row.appendChild(cell);

        let btn = document.createElement("button");
                btn.type = "submit";
                btn.innerHTML = "refresh";
                btn.addEventListener("click", () => {
                    necoDalsiho(item.Url(), true);
                });
        cell = document.createElement("td");
        cellText = btn;
        cell.appendChild(cellText);
        row.appendChild(cell);

        row.id = item.Url();

      $("#tbody")[0].appendChild(row);
    }
}

let myInterval = false;
neco(pocet);

function necoDalsiho(myUrl, bool){
    $.ajax({
        type: "GET",
        url: myUrl,
        success: function(data){
          //let myData = JSON.parse(data.responseText);
          if (data === null || data === undefined || data === "") {
                alert("Error, JSON data nejsou dostupne.");
          } else {
            if(bool === true && pocetRefresh < limit){
                document.getElementById(myUrl).remove();
                pocetRefresh++;
                let item = new Item(data.name, data.market_data.current_price.eur, myUrl);
                addRow(item);
            }
            if(bool === true && pocetRefresh >= limit) {
                if(bezi === false) {
                    alert("Prilis mnoho refreshu za kratkou dobu, mas timeout na 30 s!");
                    setTimeout(() => {
                        pocetRefresh = 0;
                        bezi = false;
                    }, 30000);
                    bezi = true;
                }
            }
            if(bool === false){
                let item = new Item(data.name, data.market_data.current_price.eur, myUrl);
                addRow(item);
            }
          }
        },
        error: function () {
          alert("Error, server neni dostupny, zkuste to prosim znovu pozdeji.");
          let btn = document.createElement("button");
                btn.type = "submit";
                btn.innerHTML = "refresh";
                btn.addEventListener("click", neco(pocet));
                $("aside")[0].appendChild(btn);
                clearInterval(myInterval);
                myInterval = false;
        }
      });
}


