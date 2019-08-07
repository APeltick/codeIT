'use strict';

class Form {

    /**
     * Object creation
     *
     * @param {jQuery} form
     * @param {jQuery} button
     * @param {string} serverUrl
     * @param {string} successUrl
     * @param {Object} validateOptions
     */

    constructor({ form, button, serverUrl, successUrl, validateOptions }) {
        this.form = form;
        this.button = button;
        this.serverUrl = serverUrl;
        this.successUrl = window.location.origin + successUrl;
        this.validator = form.validate(
            { ...Form.getValidateDefaultSettings(), ...validateOptions }
        );
    }

    /**
     * Set default settings for validator
     */
    static getValidateDefaultSettings() {
        return {
            errorClass: "is-invalid",
            errorPlacement: function( error, element ) {
                element.siblings(".invalid-feedback").html(error);
            }
        }
    }


    /**
     * Rule for check trim white spaces
     * in form fields when it validate
     */
    static required() {
        $(this).val( $.trim( $(this).val() ) );

        return true;
    }


    /**
     * Check kind of response
     *
     *  @param {Object} response
     */
    processingResponse(response) {
        if ( response.status === "Error" || response.status === "Error" ) {
            this.processingError( response );
        } else {
            this.successRedirection();
        }
    }


    /**
     * Error handler
     *
     *  @param {Object} response
     */
    processingError(response) {
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

    /**
     * Error handler for bad situations :(
     */
    processingServerErrors() {
        this.button
            .siblings(".invalid-feedback")
            .html("Something went wrong, please notify us on email example@gmail.com")
            .fadeIn();
    }

    /**
     * Redirect if form pass all validations
     */
    successRedirection() {
        window.location.replace( this.successUrl );
    }

}

export default Form;