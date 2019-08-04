'use strict';
import Form from '../../models/FormModel';

$( document ).ready( function () {

    console.log(window.location);

    let register = new Form({
        form: $("#registerForm"),
        button: $("#registerJs"),
        serverUrl: "http://codeit.ai/codeitCandidates/serverFrontendTest/user/registration",
        successUrl: '/companies.html',
        validateOptions: {
            rules: {
                name: {
                    required: {
                        depends: Form.required
                    },

                },
                secondname: {
                    required: {
                        depends: Form.required,
                    },
                    minlength: 3,
                },
                email: {
                    required: {
                        depends: Form.required
                    },
                    email: true
                },
                gender: {
                    required: true
                },
                pass: {
                    required: true,
                    strongPassword: true
                }
            },
            messages: {
                name: {
                    required: "Field 'name' is required",
                },
                secondname: {
                    required: "Field 'Surname' is required",
                    minlength: "Field 'Surname' should contain from 3 to 60 letters",
                },
                email: {
                    required: "Field 'Email' is required",
                    email: "Email is not valid"
                },
                gender: {
                    required: "Field 'Gender' is required",
                },
                pass: {
                    required: "Field 'Password' is required",
                    strongPassword: "Field 'Password' should contain from 3, 1 uppercase, 1 lowercase, 1 digit"
                }
            }
        }
    });

    $.validator.addMethod("strongPassword", Form.setStrongPassword);

    $('.form-control').on("focusout", function () {
        $(this).valid();
    });

    register.button.on("click", function ( e ) {
        e.preventDefault();

        if ( register.form.valid() ) {
            $.post({
                url: register.serverUrl,
                data: register.form.serialize(),
                success: function( response ) {

                    register.processingResponse( response, register );

                },
                error: function() {

                    register.processingServerErrors();

                },
            });
        }

    });



});