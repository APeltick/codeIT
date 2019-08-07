'use strict';

/**
 * Function for dynamic sort objects
 *
 *  @param {string} property
 *
 * @return {Function}
 */
function dynamicSort (property) {
    let sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

/**
 * Convert number into percents
 *
 *  @param {number} value
 *  @param {number} total
 *
 * @return {number}
 */
function calcPercents(value, total) {
    return value * 100 / total;
}

/**
 * Check if password strong
 *
 *  @param {string} password
 *
 * @return {bool}
 */
function setStrongPassword(password) {

    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(password) // consists of only these
        && /[a-z]/.test(password) // has a lowercase letter
        && /[A-Z]/.test(password) // has a uppercase letter
        && /\d/.test(password) // has a digit

}

export {
    dynamicSort,
    calcPercents,
    setStrongPassword,
};

