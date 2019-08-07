'use strict';


class Data {

    static async getCompaniesList() {
        let response = await $.get({
            url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
        });

        return response.list;
    }

    static async getNewsList() {
        let response = await $.get({
            url: "http://codeit.ai/codeitCandidates/serverFrontendTest/news/getList",
        });

        return response.list;
    }

}

export default Data;