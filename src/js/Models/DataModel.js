'use strict';


class Data {

    /**
     * Get companies from server
     *
     * @return {Array} - Array of Objects
     */
    static async getCompaniesList() {
        let response = await $.get({
            url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
        });

        return response.list;
    }

    /**
     * Get news from server
     *
     * @return {Array} - Array of Objects
     */
    static async getNewsList() {
        let response = await $.get({
            url: "http://codeit.ai/codeitCandidates/serverFrontendTest/news/getList",
        });

        return response.list;
    }

}

export default Data;