'use strict';

import Companies from '../../Models/CompaniesModel';
import Chart from '../../Models/ChartModel';
import Data from '../../Models/DataModel';

$( document ).ready( async function () {

    let companiesList = await Data.getCompaniesList(),
        companies = new Companies( companiesList ),
        companiesContainer = $(".companiesList"),
        totalContainer = $(".companiesTotalVal"),
        partnersContainer = $(".companiesPartners"),
        companiesByCountryContainer = $(".companiesByCountry"),
        chartContainer = $("#companiesChart"),
        sortItem = $('.sortItem'),
        chart = new Chart();

    console.log(companies.chartPoints);

    $('.owl-carousel').owlCarousel();

    companies.displayTotal( totalContainer );
    companies.displayList( companiesContainer );

    chart.options.data[0].dataPoints = companies.chartPoints;
    chart.options.data[0].click = function( chartItem ) {
        companies.displayListInCountry(
            companiesByCountryContainer,
            chartContainer,
            chartItem.dataPoint.countryCode
        );
    };

    $('.loader').fadeOut(300);
    $('.spinner-border').fadeOut(300, function () {

        $('.companiesLoaded').fadeIn(300);
        chart.render();

    });

    companiesContainer.on("click", ".list-group-item" ,function (e) {
        e.preventDefault();

        let companyName = $(this).data("company"),
            currentSort = $('.sortItem.active'),
            sort = {
                by: currentSort.data('sort-by'),
                direction: currentSort.data('sort')
            };

        if ( !$(".list-group-item").hasClass('active') ) {
            $('.partnerWrap').fadeIn(250);
        }

        $(".list-group-item.active").removeClass("active");
        $(this).addClass('active');
        $('.companiesPartnersTitle').text(`${companyName} Partners`);

        companies.displayPartners( partnersContainer, companyName, sort );
    });


    sortItem.on('click', function () {
        let sort = {
            by: null,
            direction: null
        };

        $(this).data('sort') === '' ? $(this).data('sort', '-') : $(this).data('sort', '');;

        sort.by = $(this).data('sort-by');
        sort.direction = $(this).data('sort');

        sortItem.removeClass('active');
        $(this).addClass('active');

        companies.displayPartners( partnersContainer, false, sort );
    });


    $('.back').on("click", function () {
        $('.back').fadeOut(250);

        companiesByCountryContainer.fadeOut(250, function () {
            chartContainer.fadeIn(250);
        });
    });

});