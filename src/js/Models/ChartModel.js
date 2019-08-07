'use strict';

import CanvasJS from '../Vendors/canvasjs.min';


class Chart {

    constructor() {
        return this.chart = new CanvasJS.Chart("companiesChart", {
            width: 400,
            height: 300,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            responsive: true,
            percentageInnerCutout : 50,
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: false,
                indexLabel: "{label} - {y}%",
                indexLabelFontSize: 12,
                indexLabelLineThickness: 1,
                dataPoints: [],
                explodeOnClick: false
            }]
        });
    }

}

export default Chart;