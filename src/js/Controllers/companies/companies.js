'use strict';

// import Chart from 'chart.js';
import CanvasJS from '../../Vendors/canvasjs.min';
import Companies from '../../Models/CompaniesModel';
import { handleResize } from '../../Helpers/helper';


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


    let width = chartContainer.innerWidth();
    console.log(width);
    let height = chartContainer.height();

    let chart = new CanvasJS.Chart("companiesChart", {
        width: 500,
        height: height,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        // exportEnabled: true,
        // animationEnabled: true,
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
            indexLabelFontSize: 12,
            indexLabelOrientation: 'horizontal',
            indexLabelLineThickness: 1,
            // indexLabelMaxWidth: 2,
            dataPoints: companies.chartPoints,
            explodeOnClick: false
        }]
    });

    chart.render();

    window.addEventListener("resize", handleResize);
    function handleResize(  ) {
        var w = window.innerWidth-2; // -2 accounts for the border
        var h = window.innerHeight-2;
        stage.canvas.width = w;
        stage.canvas.height = h;
        //
        var ratio = 100/100; // 100 is the width and height of the circle content.
        var windowRatio = w/h;
        var scale = w/100;
        if (windowRatio > ratio) {
            scale = h/100;
        }
        // Scale up to fit width or height
        c.scaleX= c.scaleY = scale;

        // Center the shape
        c.x = w / 2;
        c.y = h / 2;

        chart.render();
    }

    $(window).on('resize', handleResize);

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