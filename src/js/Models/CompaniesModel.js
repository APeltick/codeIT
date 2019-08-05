'use strict';

import CanvasJS from '../Vendors/canvasjs.min';

class Companies {

    constructor() {
        return (async () => {

            let response = await $.get({
                url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
            });
            this.data = response.list;
            this.total = this.data.length;
            this.byCountry = this.getCompaniesByCountry();
            this.chartPoints = this.getChartPoints();

            return this;

        })();
    }

    getCompaniesByCountry( ) {
        let byCountry = {};

        this.data.forEach(function ( company ) {
            let code = company.location.code;

            if ( byCountry[code] ) {

                byCountry[code].companiesInCountry.push( company.name );

            } else {

                byCountry[code] = {
                    country: company.location.name,
                    companiesInCountry: [company.name],
                };

            }

        });

        return byCountry;
    }

    getChartPoints() {
        let chartPoints = [];

        for ( let code in this.byCountry ) {
            chartPoints.push({
                y: this.byCountry[code].companiesInCountry.length * 100 / this.total,
                label:  this.byCountry[code].country,
                countryCode: code
            });
        }

        return chartPoints;
    }

    displayList( container ) {
        this.data.forEach( function ( company ) {
            container.append(`<a href="#${company.name}" class="list-group-item list-group-item-action">${company.name}</a>`);
        } );
    }

    displayTotal( container ) {
        container.text( this.total );
    }

}

export default Companies;