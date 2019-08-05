'use strict';

// import Chart from 'chart.js';
import CanvasJS from '../../Vendors/canvasjs.min';
import Companies from '../../Models/CompaniesModel';

$( document ).ready( async function () {

    let companies = await new Companies(),
        companiesContainer = $('.companiesList'),
        totalContainer = $('.companiesTotalVal');

    companies.displayTotal(totalContainer);
    companies.displayList(companiesContainer);

    (new CanvasJS.Chart("companiesChart", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        data: [{
            click: function(e) {
                console.log(e);

            },
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: false,
            indexLabel: "{label} - {y}%",
            indexLabelFontSize: 16,
            dataPoints: companies.chartPoints
        }]
    })).render();

    companiesContainer.on("click", ".list-group-item" ,function (e) {
        e.preventDefault();

        $('.list-group-item.active').removeClass('active');
        $(this).addClass('active');
    });

});