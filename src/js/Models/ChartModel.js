'use strict';

import CanvasJS from '../Vendors/canvasjs.min';

class Chart {

    constructor(dataPoints, callback) {
        this.dataPoints = dataPoints;
        this.chart = new CanvasJS.Chart("companiesChart", {
            // width: 500,
            // height: 300,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            responsive: true,
            percentageInnerCutout : 50,
            data: [{
                click: callback,
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: false,
                indexLabel: "{label} - {y}%",
                indexLabelFontSize: 12,
                indexLabelOrientation: 'horizontal',
                indexLabelLineThickness: 1,
                dataPoints: this.dataPoints,
                explodeOnClick: false
            }]
        });
    }



    renderChart() {
        this.chart.render();
    }

}

export default Chart;