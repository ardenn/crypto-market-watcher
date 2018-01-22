function getCrypto(name, url){
    const site = new WebSocket(url)

    site.onmessage = (msg) => {
        let item = document.getElementById(name)
        item.style.color = "red"
        let newContent = parseData(name, JSON.parse(msg.data))
        if (newContent){
            item.textContent = "$ " + parseFloat(newContent).toFixed(4)
        }
        
    }

    let msg

    switch (name) {
        case "bitFinnex":
            msg = JSON.stringify({
                event: 'subscribe',
                channel: 'ticker',
                symbol: 'tBTCUSD'
            })
            break;
        case "okCoin":
            msg = JSON.stringify({ 
                'event': 'addChannel', 
                'channel': 'ok_sub_spot_btc_usd_ticker' 
            })
            break
        case "coinApi":
            msg = JSON.stringify({
                CRID: "ALPHA-7BD982E9AA8D2E939D06B21F180450E75446AD7E",
                MsgType: "QuoteRequest",
                QuoteType: 2,
                Symbol: "BTCUSD"
            })
            break
        default:
            break;
    }
    site.onopen = () => site.send(msg)
}

function parseData(name,data){
    switch (name) {
        case "bitFinnex":
            return data[1][6]
        case "okCoin":
            return data[0]["data"]["last"]
        case "coinApi":
            return data.Last
        default:
            console.log("Sorry, name not found")
    }
}

getCrypto("bitFinnex",'wss://api.bitfinex.com/ws/2')
getCrypto("okCoin", 'wss://real.okcoin.com:10440/websocket')
getCrypto("coinApi",'wss://spotusd-wsp.btcc.com/')