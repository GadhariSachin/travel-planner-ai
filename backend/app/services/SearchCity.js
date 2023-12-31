const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const MakeAmadeusRequest = require(rootPrefix + "/lib/helper/MakeAmadeusRequest");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");
const URL = require("url");

class SearchCity {
    constructor(req, res) {
        this.req = req;
        this.res = {};
        this.searchTerm = req.query.q;
    }

    async perform() {
        const oThis = this;

        await oThis._validateParameters();

        if (oThis.res.status_code) return oThis.res;

        await oThis._makeRequest();

        if (oThis.res.status_code) return oThis.res;

        await oThis._formatResponse();

        return oThis.res;
    }

    async _validateParameters() {
        const oThis = this;

        let param_errors = [];

        if (!oThis.searchTerm) {
            param_errors.push("missing_search_term");
        } else if (oThis.searchTerm.length < 3) {
            param_errors.push("search_term_too_short");
        }

        if (param_errors.length > 0) {
            const errorObject = new ErrorResponse(
                "invalid_params",
                "Invalid parameters",
                "a_s_sc_sc_1",
                param_errors
            );
            oThis.res = errorObject.perform();
        }
    }

    async _makeRequest() {
        const oThis = this;

        const url = constants.searchCityUrl;

        const queryParams = {
            subType: "CITY",
            keyword: oThis.searchTerm,
            "page[limit]": 5,
        };

        const getUrl = URL.format({
            pathname: url,
            query: queryParams,
        });

        const response = await new MakeAmadeusRequest("GET", getUrl, null).perform();

        if (response.status_code) {
            oThis.res = response;
            return;
        } else {
            oThis.responseBody = response;
        }
    }

    async _formatResponse() {
        const oThis = this;

        const city_id = [];
        const city_map_by_id = {};
        try {
            const data = oThis.responseBody.data;

            for (let i = 0; i < data.length; i++) {
                city_id.push(data[i].id);
                city_map_by_id[data[i].id] = {
                    id: data[i].id,
                    iatacode: data[i].iataCode,
                    geocode: {
                        latitude: data[i].geoCode.latitude,
                        longitude: data[i].geoCode.longitude,
                    },
                    name: data[i].address.cityName + ", " + data[i].address.countryName,
                };
            }

            oThis.res = {
                city_id: city_id,
                city_map_by_id: city_map_by_id,
            };
        } catch (error) {
            const errorObject = new ErrorResponse(
                "internal_server_error",
                error,
                "a_s_sc_sc_4",
                null
            );
            oThis.res = errorObject.perform();
            return;
        }
    }
}

module.exports = SearchCity;
