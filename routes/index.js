/**
 * Created by AyushK on 18/09/20.
 */
 import * as ValidationManger from "../middleware/validation";
 import TestModule from "../app/modules/testModule";
 import {stringConstants} from "../app/common/constants";
 import maxTPS from "../app/modules/savedTweet";
 
 module.exports = (app) => {
     app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
     app.get("/saved-tweet", new maxTPS().savedTweets);
     /**
      * route definition
      */
     app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
 };
 