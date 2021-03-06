'use strict';

import { dynamicSort, calcPercents } from '../Helpers/helper'


class Companies {

    constructor(companies) {
        this.data = companies;
        this.total = this.data.length;
        this.byCountry = this.getCompaniesByCountry();
        this.chartPoints = this.getChartPoints();
    }


    /**
     * Group company by country for more comfort data manipulate
     */

    getCompaniesByCountry() {
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


    /**
     * Creates from data chart points for chart,
     * and calculate percent
     *
     * @return {Array} - Array of Objects
     */

    getChartPoints() {
        let chartPoints = [];

        for ( let code in this.byCountry ) {
            chartPoints.push({
                y: calcPercents(this.byCountry[code].companiesInCountry.length, this.total),
                label:  this.byCountry[code].country,
                countryCode: code
            });
        }

        return chartPoints;
    }


    /**
     * Displaying list of companies in container
     *
     * @param {jQuery} container
     */
    displayList(container) {
        this.data.forEach( function (company) {
            container.append(`<li data-company="${company.name}" class="list-group-item list-group-item-action">${company.name}</li>`);
        } );
    }


    /**
     * Displaying total amount of companies in container
     *
     * @param {jQuery} container
     */
    displayTotal(container) {
        container.text(this.total);
    }


    /**
     * Displaying list of companies in container
     *
     * @param {jQuery} container
     * @param {jQuery} chartContainer
     * @param {string} countryCode
     *
     */
    displayListInCountry(container, chartContainer, countryCode) {
        let companiesInCountry = this.byCountry[countryCode].companiesInCountry;

        // Reset container before render
        container.html('');

        companiesInCountry.forEach( function ( company ) {
            container.append(`<div class="list-group-item">${company}</div>`);
        } );

        chartContainer.fadeOut(250, function () {
            container.fadeIn(250);
            $('.back').fadeIn(250);
        });
    }


    /**
     * Displaying partners and sort them
     *
     * @param {jQuery} container
     * @param {Object} sort
     * @param {string} companyName
     *
     */
    displayPartners(container, sort, companyName = null) {
        // Set current company if click was on sort
        if (companyName) {
            this.currentCompany = this.data.find(function (company) {
                return company.name === companyName;
            });
        }

        this.currentCompany.partners.sort(dynamicSort( sort.direction + sort.by ));

        // Reset container before render
        container.html('');

        this.currentCompany.partners.forEach(function (partner) {
            container.append(`
                <div class="partner d-inline-block">
                    <div class="partnerPercent d-flex align-items-center justify-content-center">${partner.value}</div>
                    <div class="partnerLabel d-flex align-items-center justify-content-center">
                        <p class="verticalText">${partner.name}</p>
                    </div>
                </div>
            `);
        });
    }

}

export default Companies;