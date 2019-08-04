'use strict';

// import Chart from 'chart.js';
import CanvasJS from '../../Vendors/canvasjs.min';


$( document ).ready( function () {

    let companies = [];

    $.get({
        url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
        success: function ( response ) {
            companies = response.list;

            // console.log(companies);

            displayList( companies );
            displayTotal( companies );
            displayLocationChart( companies );
        }
    });


    function displayLocationChart() {

        let companiesByCountry = {};
        let dataPoints = [];

        companies.forEach(function ( company ) {
            let code = company.location.code;
            companiesByCountry[code] = companiesByCountry[code] ? companiesByCountry[code] + 1 : 1 ;
        });

        // console.log(companiesByCountry);

       for ( let [code, count] of Object.entries(companiesByCountry) ) {
           // console.log(val);
           dataPoints.push( {y: count*100/companies.length, label: code} );
       }

        // function percentage(obtained, total)
        // {
        //     return obtained*100/total;
        // }


        let chart = new CanvasJS.Chart("companiesChart", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            data: [{
                click: function(e) {console.log(e)},
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: false,
                indexLabel: "{label} - {y}%",
                indexLabelFontSize: 16,
                dataPoints: dataPoints
            }]
        });
        chart.render();

    }


    function displayList( companies ) {
        companies.forEach( function ( company ) {
            $('.companiesList').append(`<a href="#${company.name}" class="list-group-item list-group-item-action">${company.name}</a>`);
        } );
    }




    function displayTotal( companies ) {
        $('.companiesTotalVal').text( companies.length );
    }



    $(".companiesList").on("click", ".list-group-item" ,function (e) {
        e.preventDefault();

        $('.list-group-item.active').removeClass('active');
        $(this).addClass('active');
    });

});