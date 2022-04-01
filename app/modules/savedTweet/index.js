import Utils from "../../utils";
import BLManager from "./manager";
import {apiSuccessMessage, httpConstants,} from "../../common/constants";

export default class FamilyController {

    async savedTweets(request, response) {
        const [error, getRes] = await Utils.parseResponse(
            new BLManager().savedTweets(request.body)
        );
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(
            response,
            getRes,
            apiSuccessMessage.FETCH_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }
    async savemaxTPSCount(request, response) {
        const [error, getRes] = await Utils.parseResponse(
            new BLManager().savemaxTPSCount(request.body)
        );
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(
            response,
            getRes,
            apiSuccessMessage.FETCH_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    async writeSpeed(request, response) {
        const [error, getRes] = await Utils.parseResponse(new BLManager().writeSpeed());
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

  async maxTPSCount(request, response) {
    const [error, getRes] = await Utils.parseResponse(new BLManager().maxTpsCount());
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
  }

    async advancedSearch(request, response) {
        const [error, getRes] = await Utils.parseResponse(new BLManager().advancedSearch(request.query));
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

    async basicSearch(request, response) {
        const [error, getRes] = await Utils.parseResponse(new BLManager().basicSearch(request.query));
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

    async archivedTweetFromTestNet(request, response) {
        const [error, getRes] = await Utils.parseResponse(new BLManager().archivedTweetFromTestNet(request.query));
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }
    
    async archivedTweetAdvanceSearchDetails(request, response) {
        const [error, getRes] = await Utils.parseResponse(new BLManager().archivedTweetAdvanceSearchDetails(request.query));
        if (!getRes) {
            return Utils.handleError(error, request, response);
        }
        return Utils.response(response, getRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }
}
