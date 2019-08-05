'use strict';

// import Chart from 'chart.js';
import CanvasJS from '../../Vendors/canvasjs.min';
import Companies from '../../Models/CompaniesModel';


$( document ).ready( async function () {

    let companies = await new Companies(),
        companiesContainer = $(".companiesList"),
        totalContainer = $(".companiesTotalVal"),
        partnersContainer = $(".companiesPartners"),
        companiesByCountryContainer = $(".companiesByCountry"),
        chartContainer = $("#companiesChart"),
        sortItem = $('.sortItem');

    console.log(companies);

    companies.displayTotal( totalContainer );
    companies.displayList( companiesContainer );


    $('.loader').fadeOut(250);
    $('.spinner-border').fadeOut(250, function () {
        $('.companiesLoaded').fadeIn(250);
    });


    (new CanvasJS.Chart("companiesChart", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        data: [{
            click: function( chartItem ) {
                console.log(chartItem);
                companies.displayListInCountry(
                    companiesByCountryContainer,
                    chartContainer,
                    chartItem.dataPoint.countryCode
                );
            },
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: false,
            indexLabel: "{label} - {y}%",
            indexLabelFontSize: 16,
            dataPoints: companies.chartPoints,
            explodeOnClick: false
        }]
    })).render();


    companiesContainer.on("click", ".list-group-item" ,function (e) {
        e.preventDefault();

        let companyName = $(this).data("company"),
            sortItem = $('.sortItem.active'),
            sort = {
                by: sortItem.data('sort-by'),
                direction: sortItem.data('sort')
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

        companies.displayPartners( partnersContainer, false, sort );

        $('.sortItem').removeClass('active');
        $(this).addClass('active');

    });


    $('.back').on("click", function () {
        $('.back').fadeOut(250);

        companiesByCountryContainer.fadeOut(250, function () {
            chartContainer.fadeIn(250);
        });
    });

});