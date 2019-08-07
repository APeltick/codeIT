'use strict';

import Companies from '../Models/CompaniesModel';
import Chart from '../Models/ChartModel';
import Data from '../Models/DataModel';

$( document ).ready( async function () {

    let companiesList = await Data.getCompaniesList(),
        companies = new Companies(companiesList),
        companiesContainer = $(".companiesList"),
        totalContainer = $(".companiesTotalVal"),
        partnersContainer = $(".companiesPartners"),
        companiesByCountryContainer = $(".companiesByCountry"),
        chartContainer = $("#companiesChart"),
        sortItem = $('.sortItem'),
        chart = new Chart();

    companies.displayTotal( totalContainer );
    companies.displayList( companiesContainer );

    chart.options.data[0].dataPoints = companies.chartPoints;
    chart.options.data[0].click = function(chartItem) {
        companies.displayListInCountry(
            companiesByCountryContainer,
            chartContainer,
            chartItem.dataPoint.countryCode
        );
    };


    // Listing clicks on company list and show partners block
    companiesContainer.on("click", ".list-group-item" ,function (e) {
        e.preventDefault();

        let companyName = $(this).data("company"),
            currentSort = $('.sortItem.active'),
            sort = {
                by: currentSort.data('sort-by'),
                direction: currentSort.data('sort')
            };

        // Prevent fade if partner block is displayed
        if ( !$(".list-group-item").hasClass('active') ) {
            $('.partnerWrap').fadeIn(250);
        }

        // Change company list item active view
        $(".list-group-item.active").removeClass("active");
        $(this).addClass('active');

        // Set title in partners block
        $('.companiesPartnersTitle').text(`${companyName} Partners`);

        companies.displayPartners(partnersContainer,  sort, companyName);
    });


    // Listing clicks on sort elements
    sortItem.on('click', function () {
        let sort = {
            by: null,
            direction: null
        };

        // Change sort variants
        $(this).data("sort") === "" ? $(this).data("sort", "-") : $(this).data("sort", "");
        sortItem.removeClass('active');
        $(this).addClass('active');

        sort.by = $(this).data('sort-by');
        sort.direction = $(this).data('sort');

        companies.displayPartners(partnersContainer, sort);
    });


    // Return to chart
    $('.back').on("click", function () {
        $('.back').fadeOut(250);

        companiesByCountryContainer.fadeOut(250, function () {
            chartContainer.fadeIn(250);
        });
    });

});