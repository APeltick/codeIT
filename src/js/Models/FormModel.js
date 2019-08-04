'use strict';

class Form {

    constructor( { form, button, serverUrl, successUrl, validateOptions } ) {

        this.form = form;
        this.button = button;
        this.serverUrl = serverUrl;
        this.successUrl = window.location.origin + successUrl;
        this.validator = form.validate(
            { ...Form.getValidateSettings(), ...validateOptions }
        );

    }


    static getValidateSettings() {

        return {
            errorClass: "is-invalid",
            errorPlacement: function( error, element ) {
                element.siblings(".invalid-feedback").html(error);
            }
        }

    }


    static required() {

        $(this).val( $.trim( $(this).val() ) );

        return true;

    }


    static setStrongPassword( password ) {

        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(password) // consists of only these
            && /[a-z]/.test(password) // has a lowercase letter
            && /[A-Z]/.test(password) // has a uppercase letter
            && /\d/.test(password) // has a digit

    }


    processingResponse( response ) {

        if ( response.status === "Form Error" || response.message === "Error" ) {

            this.processingError( response );

        } else {

            this.successRedirection();

        }

    }


    processingError( response ) {

        if ( response.status === "Form Error" ) {

            this.validator.showErrors({
                [response.field]: response.message
            });

        } else if ( response.status === "Error" ) {

            // TODO: I think that error 'Email already exists' must be in validation errors
            const emailError = "Creating user error. Email already exists.";

            if ( response.message === emailError ) {

                this.validator.showErrors({
                    email: response.message
                });

            } else {

                this.button
                    .siblings('.invalid-feedback')
                    .html(response.message)
                    .fadeIn();

            }

        }

    }


    processingServerErrors() {

        this.button
            .siblings(".invalid-feedback")
            .html("Something went wrong, please notify us on email example@gmail.com")
            .fadeIn();

    }

    successRedirection() {

        window.location.replace( this.successUrl );

    }

}

export default Form;