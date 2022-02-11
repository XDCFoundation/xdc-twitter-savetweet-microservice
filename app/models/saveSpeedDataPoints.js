const mongoose = require("mongoose");

const savingSpeedDataPointsModel = new mongoose.Schema({
    saveStartTime: {type: Number, default: 0},
    saveEndTime: {type: Number, default: 0},
    responseTime: {type: Number, default: 0},
    savedTweets:{type: Number, default: 0},
    addedOn: {type: Number, default: Date.now()},
    modifiedOn: {type: Number, default: Date.now()},
    isDeleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
});

savingSpeedDataPointsModel.method({
    saveData: async function () {
        return this.save();
    },
});

savingSpeedDataPointsModel.static({
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
    },
    insertManyDocument: function (obj) {

        console.log("object in model", obj)
        return this.insertMany(obj)
    }
});

module.exports = mongoose.model("xf-saving-speed-data-points", savingSpeedDataPointsModel);
