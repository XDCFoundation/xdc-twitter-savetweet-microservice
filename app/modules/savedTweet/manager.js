const Web3 = require('web3')
const MyContract = require('./NewTweet.json')
import Utils from '../../utils'
//const { RandomData, sampleSaveTweet } = require('../common/constants')
//const { Utils.lhtLog, parseResponse } = require('../../libraries/utility/utilityMethods')
const blockchainResponseModel = require('../../models/blockchainResponse')
const Config = require('../../../config')
class BLManager {
    async savedTweets() {
        const web3 = new Web3(Config.WEB3_URL)
        const myContract = new web3.eth.Contract(MyContract.abi, Config.SMART_CONTRACT_ADDRESS)

        let response = []
        // let skip = parseInt(0);

        // let limit = parseInt(0);

        let result = await blockchainResponseModel.findData({}, {}, 0, 10, { _id: -1 })
        // let tweetCount = await blockchainResponseModel.find().count()
        let tweetCountFromBlockchain = await myContract.methods.getCount().call()
        console.log('tweet Counts ------------', tweetCountFromBlockchain)

        console.log('result----------------', result)
        response.push(result, { blockchainTweetCount: tweetCountFromBlockchain })
        return {response,  "apiSuccessMessage": true , "success": "200"};
        //return response
        // return sampleSaveTweet;
    }
}


module.exports = BLManager
