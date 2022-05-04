const mongoose = require("mongoose");

const blockchainResponseModel = new mongoose.Schema({
  messageHash: { type: String, default: "" },
  rawTransaction: { type: String, default: "" },
  transactionHash: { type: String, default: "" },
  gaPrice: { type: Number, default: 0 },
  gas: { type: Number, default: 0 },
  data: { type: String, default: "" },
  nonce: { type: Number, default: 0 },
  tweetId: { type: String, default: "" },
  to: { type: String, default: "" },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
});

blockchainResponseModel.method({
    saveData: async function () {
        console.log("saving data in DB")
        return this.save();
    },
});

blockchainResponseModel.static({
    findData: function (findObj, selectionKey = "", skip = 0, limit = 0, sort = 1) {
        return this.find(findObj, selectionKey).skip(skip).limit(limit).sort(sort);
    },
    findOneData: function (findObj) {
        return this.findOne(findObj);
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    }
});

module.exports = mongoose.model("xf-blockchain-response", blockchainResponseModel);
