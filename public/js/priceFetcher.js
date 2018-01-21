let sites = [
    {name:"CoinMarket",url:"https://api.coinmarketcap.com/v1/ticker/bitcoin/"},
    {name:"BitStamp",url:"https://www.bitstamp.net/api/ticker/"},
    {name:"OKCoin",url:"https://www.okcoin.com/api/v1/ticker.do?symbol=btc_usd"}
] 

function fetchDetails(url,name){
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        let item = document.getElementById(name)
        item.style.color = "red"
        item.textContent = "$ "+parseJson(name,data)
    })
    .catch((errors)=>{
        console.log(errors)
    });
}

function parseJson(name,data){
    if (name == "CoinMarket"){
        return data[0]["price_usd"]
    }else if (name == "OKCoin"){
        return data["ticker"]["last"]
    }else{
        return data["last"]
    }
}

setInterval(function(){
    sites.forEach(function(site){
    fetchDetails(site.url,site.name)
    })
},5000)