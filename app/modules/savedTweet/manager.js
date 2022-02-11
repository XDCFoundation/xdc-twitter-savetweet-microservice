const Web3 = require('web3')
const MyContract = require('./NewTweet.json')
import Utils from '../../utils'
import savingSpeedDataPointsModel from "../../models/saveSpeedDataPoints";
import maxTpsModel from "../../models/tpsCount";
import tweets from "../../models/tweets";
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

        let result = await blockchainResponseModel.findData({}, {}, 0, 10, {_id: -1})
        // let tweetCount = await blockchainResponseModel.find().count()
        let tweetCountFromBlockchain = await myContract.methods.getCount().call()
        console.log('tweet Counts ------------', tweetCountFromBlockchain)

        console.log('result----------------', result)
        response.push(result, {blockchainTweetCount: tweetCountFromBlockchain})
        return {response, "apiSuccessMessage": true, "success": "200"};
        //return response
        // return sampleSaveTweet;
    }

    async writeSpeed() {
        Utils.lhtLog("BLManager: writeSpeed", "get writeSpeed", "", "")
        let response = []
        let result = await savingSpeedDataPointsModel.findData({}, {}, 0, 10, {addedOn: -1})
        let tweetCount = await savingSpeedDataPointsModel.find().count()
        Utils.lhtLog("tweet Counts ------------", tweetCount, "", "");
        response.push(result)
        Utils.lhtLog("response", response, "", "");
        return response
    }


    async maxTpsCount() {
        Utils.lhtLog("BLManager: maxTpsCount", "get maxTpsCount", "", "")
        let selectionKey = {
            tpscount: 1.0
        }
        let TpsNo = await maxTpsModel.findData({}, selectionKey, 0, 1, {tpscount: -1});
        return Math.max.apply(Math, TpsNo.map(function (o) {
            return o.tpscount;
        }));
    }

    async advancedSearch(request) {
        Utils.lhtLog("BLManager: advancedSearch", "advancedSearch", {
            keyword: request.keyword,
            hash: request.hash,
            name: request.name
        }, "");

        let message = request.keyword;
        let hashTag = request.hash;
        let name = request.name;
        let selectionKey = {
            createdAt: 1.0,
            text: 1.0,
            id: 1.0,
            hashtag: 1.0,
            country: 1.0,
            name: 1.0,
        }
        return await tweets.findData({
                hashtag: new RegExp(`.*${hashTag}.*`, "i"),
                text: new RegExp(`.*${message}.*`, "i"),
                name: new RegExp(`.*${name}.*`, "i")
            },
            selectionKey, 0, 100, {addedOn: -1});
    }

    async basicSearch(request) {
        Utils.lhtLog("BLManager: advancedSearch", "basicSearch", "", "")
        let message = request.keyword;
        let selectionKey = {
            createdAt: 1.0,
            text: 1.0,
            id: 1.0,
            hashtag: 1.0,
            country: 1.0,
            name: 1.0,
        }
        return await tweets.findData({
                text: new RegExp(`.*${message}.*`, "i")
            },
            selectionKey, 0, 10, {addedOn: -1});
    }
}


module.exports = BLManager
