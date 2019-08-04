'use strict';

$( document ).ready( function () {

    let companies = [];

    $.get({
        url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
        success: function ( response ) {
            companies = response.list;

            console.log(companies);

            displayList( companies );
        }
    });

    function displayList( companies ) {
        companies.forEach( function ( company ) {
            $('.companiesList').append(`<a href="${company.name}" class="list-group-item list-group-item-action">${company.name}</a>`);
        } );
    }

});