'use strict';

import CanvasJS from '../../Vendors/canvasjs.min';
import Companies from '../../Models/CompaniesModel';
import Chart from '../../Models/ChartModel';
import { handleResize } from '../../Helpers/helper';


$( document ).ready( async function () {

    let companies = await new Companies(),
        companiesContainer = $(".companiesList"),
        totalContainer = $(".companiesTotalVal"),
        partnersContainer = $(".companiesPartners"),
        companiesByCountryContainer = $(".companiesByCountry"),
        chartContainer = $("#companiesChart"),
        sortItem = $('.sortItem'),
        chart = new Chart( companies.chartPoints, function( chartItem ) {

            console.log(chartItem);
            companies.displayListInCountry(
                companiesByCountryContainer,
                chartContainer,
                chartItem.dataPoint.countryCode
            );

         });

    console.log(companies);

    companies.displayTotal( totalContainer );
    companies.displayList( companiesContainer );


    $('.loader').fadeOut(300);
    $('.spinner-border').fadeOut(300, function () {

        $('.companiesLoaded').fadeIn(300);
        chart.renderChart();

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

        if ( $(this).data('sort') === '' ) {
            $(this).attr('data-sort', '-');
            $(this).data('sort', '-');
        } else {
            $(this).attr('data-sort', '');
            $(this).data('sort', '');
        }

        let sort = {
            by: $(this).data('sort-by'),
            direction: $(this).data('sort')
        };

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