'use strict';

function dynamicSort ( property ) {
    let sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

function calcPercents( value, total ) {
    return value * 100 / total;
}

function setStrongPassword( password ) {

    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(password) // consists of only these
        && /[a-z]/.test(password) // has a lowercase letter
        && /[A-Z]/.test(password) // has a uppercase letter
        && /\d/.test(password) // has a digit

}

function handleResize( chart ) {
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

export {
    dynamicSort,
    calcPercents,
    setStrongPassword,
    // handleResize
};

