const mongoose = require("mongoose");

const maxTpsCount = new mongoose.Schema({
    saveStartTime: {type: Number, default: 0},
    saveEndTime: {type: Number, default: 0},
    tpscount: {type: Number, default: 0},
  
    addedOn: {type: Number, default: Date.now()},
    modifiedOn: {type: Number, default: Date.now()},
    isDeleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
});

maxTpsCount.method({
    saveData: async function () {
        return this.save();
    },
});
maxTpsCount.static({
    findData: function (findObj,selectionKey,skip=0,limit=0,sort='1') {
        return this.find(findObj,selectionKey).skip(skip).limit(limit).sort(sort);
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
    findDataWithAggregate: function (findObj) {
        console.log("object in findDataWithAggregate",findObj)
        return this.aggregate(findObj);
    },
    insertManyDocument:function(obj){

        console.log("object in model",obj)
        return this.insertMany(obj)
    },
    aggregateBlock: function (aggregationOptionsArray) {
        return this.aggregate(aggregationOptionsArray)
    }
});

module.exports = mongoose.model("save-max-tps-count", maxTpsCount);
