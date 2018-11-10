let result = (function () {

    class Textbox {
        constructor(selector, invalidSymbolsRegex) {
            this.selector = selector;
            this._invalidSymbols = invalidSymbolsRegex;
            this._elements = $(this.selector);
            $(this.selector).on('input', function () {
                $(this).val(this.value);
            });

        }

        get value() {
            return this.elements.val();
        }

        set value(newValue) {
            this.elements.val(newValue);
        }

        get elements() {
            return this._elements;
        }

        isValid() {
            return !this.value.match(this._invalidSymbols);
        }
    }

    class Form {
        constructor(...elements) {
            this._element = $("<div class='form'></div>");
            for (let element of elements) {
                if (element.constructor.name !== "Textbox") {
                    throw new Error("Invalid class");
                }
            }
            for (let element of elements) {
                this._element.append($(element.selector));
            }
            this._textboxes = elements;
        }

        submit(){
            let allValid = true;

            this._textboxes.forEach(x => {
                if(x.isValid()){
                    console.log(x);
                    this._element.children(x.selector).css('border', '2px solid green');
                }
                else{
                    this._element.children(x.selector).css('border', '2px solid red');
                    allValid = false;
                }
            });

            return allValid;
        }

        attach(selector){
            $(selector).append(this._element);
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}());

let Textbox = result.Textbox;
let Form = result.Form;

let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
let usernameTextbox = $('#username');
let passwordTextbox = $('#password');
usernameTextbox.val('jaro');
usernameTextbox.trigger('input');
passwordTextbox.val('taq parula');
passwordTextbox.trigger('input');
let form = new Form(username,password);
form.attach("#root");
let root = $('#root');
usernameTextbox = root.find("#username");
passwordTextbox = root.find("#password");
