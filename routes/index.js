import express from 'express';
const request = require('request');
const router = express.Router();


/* GET index page. */
router.get('/', (req,res)=>{
    request('https://api.livecoin.net/exchange/ticker?currencyPair=BTC/USD',
        function(error,response,body){
            if (!error && response.statusCode == 200){
                var livecoin = JSON.parse(body)
            }
            request('https://api.coinmarketcap.com/v1/ticker/bitcoin/',
                function(error,response,body){
                    if (!error && response.statusCode == 200){
                        var coinmarket = JSON.parse(body)
                    }
                    request('https://api.cryptowat.ch/markets/gdax/btcusd/summary',
                        function(error,response,body){
                            if (!error | response.statusCode==400){
                                var cryptowat = JSON.parse(body)
                            }
                            res.render('index', {
                                title: 'Rodgers',
                                live: livecoin["last"],
                                coin: coinmarket[0]["price_usd"],
                                crypt: cryptowat["result"]["price"]["last"]
                            });
                    })
            })
    })
})
export default router;