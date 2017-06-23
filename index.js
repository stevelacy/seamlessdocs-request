const request = require('superagent')
const sha256 = require('crypto-js/sha256')
const hmacSHA256 = require('crypto-js/hmac-sha256')

const timestamp = String(new Date().getTime()).substring(0, 10)
const apiKey = process.argv[2]
const secret = process.argv[3]
const payload = 'GET+/form/CO17051000028335459/elements+' + timestamp

const signature = hmacSHA256(payload, secret).toString()

request.get('https://jerseycitynj.seamlessdocs.com/api/form/CO17051000028335459/elements')
  .set('Authorization', 'HMAC-SHA256 api_key=' + apiKey +' Signature=' + signature)
  .set('Date', timestamp)
  .end(function (err, res) {
    console.log(err, res.body)
  })
