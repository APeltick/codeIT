'use strict';

$( document ).ready( function () {

    let companies = [];

    $.get({
        url: "http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList",
        success: function ( response ) {
            companies = response.list;

            console.log(companies);

            displayList( companies );
            displayTotal( companies );
        }
    });

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