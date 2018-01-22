function getCrypto(name, url) {
    const site = new WebSocket(url)
    let oldContent = 0

    site.onmessage = (msg) => {
        let item = document.getElementById(name)
        let newContent = parseData(name, JSON.parse(msg.data))
        if (oldContent <= newContent) {
            item.previousElementSibling.children[0].className = "fa fa-caret-up"
        } else {
            item.previousElementSibling.children[0].className = "fa fa-caret-down"
        }
        if (newContent) {
            item.textContent = " $ " + parseFloat(newContent).toFixed(4)
        }
        oldContent = newContent

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
        case "cryptoCompare":
            msg = JSON.stringify({
                "op": "subscribe",
                "args": ["tradeBin1m:XBTUSD"]
            })
            break
        default:
            break;
    }
    site.onopen = () => site.send(msg)
}

function parseData(name, data) {
    switch (name) {
        case "bitFinnex":
            return data[1][6]
        case "okCoin":
            return data[0]["data"]["last"]
        case "coinApi":
            return data.Last
        case "cryptoCompare":
            return data.data[0].vwap
        default:
            console.log("Sorry, name not found")
    }
}

getCrypto("bitFinnex", 'wss://api.bitfinex.com/ws/2')
getCrypto("okCoin", 'wss://real.okcoin.com:10440/websocket')
getCrypto("coinApi", 'wss://spotusd-wsp.btcc.com/')
getCrypto("cryptoCompare", "wss://www.bitmex.com/realtime")