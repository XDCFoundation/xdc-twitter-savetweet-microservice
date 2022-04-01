/**
 * Created by AyushK on 18/09/20.
 */
 import * as ValidationManger from "../middleware/validation";
 import TestModule from "../app/modules/testModule";
 import {stringConstants} from "../app/common/constants";
 import SaveTweet from "../app/modules/savedTweet";
 
 module.exports = (app) => {
     app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
     app.get("/saved-tweet", new SaveTweet().savedTweets);
     app.get("/writing-speed", new SaveTweet().writeSpeed);
     app.get("/max-tps-count", new SaveTweet().maxTPSCount);
     app.get("/advanced-search", new SaveTweet().advancedSearch);
     app.get("/basic-search", new SaveTweet().basicSearch);
     app.get("/archived-tweet-from-testnet", new SaveTweet().archivedTweetFromTestNet);
     app.get("/archived-tweet-from-testnet-advancesearch", new SaveTweet().archivedTweetAdvanceSearchDetails);
     app.post("/save-max-tps-count", new SaveTweet().savemaxTPSCount);
     /**
      * route definition
      */
     app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
 };
 