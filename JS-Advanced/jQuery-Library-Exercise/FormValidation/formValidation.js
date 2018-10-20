function validate() {

    $("#submit").on("click", function (e) {
        e.preventDefault();

        let usernameValid = false;
        let emailValid = false;
        let passwordValid = false;
        let confirmPasswordValid = false;
        let companyNumberValid = true;

        let usernameRegex = /^[A-Za-z0-9]{3,20}$/g;
        let passwordRegex = /^\w{5,15}$/g;
        let confirmPasswordRegex = /^\w{5,15}$/g;
        let emailRegex = /.*@.*\./;

        let username = $("#username").val();
        let password = $("#password").val();
        let confirmPassword = $("#confirm-password").val();
        let email = $("#email").val();

        let matchUsername = usernameRegex.exec(username);
        let matchPassword = passwordRegex.exec(password);
        let matchConfirmPassword = confirmPasswordRegex.exec(confirmPassword);
        let matchEmail = emailRegex.exec(email);

        if(!matchUsername){
            $("#username").css("border", "solid red 2px");
            usernameValid = false;
        }
        else{
            $("#username").css("border", "none");
            usernameValid = true;
        }

        if(!matchPassword){
            $("#password").css("border", "solid red 2px");
            passwordValid = false;
            console.log(passwordValid);
        }
        else{
            $("#password").css("border", "none");
            passwordValid = true;
            console.log(passwordValid);
        }

        if(!matchConfirmPassword){
            $("#confirm-password").css("border", "solid red 2px");
            confirmPasswordValid = false;
        }
        else{
            $("#confirm-password").css("border", "none");
            confirmPasswordValid = true;
        }

        if(password !== confirmPassword ){
            $("#confirm-password").css("border", "solid red 2px");
            $("#password").css("border", "solid red 2px");
            confirmPasswordValid = false;
        }
        else{
            if(confirmPasswordValid === true && passwordValid === true) {
                $("#confirm-password").css("border", "none");
                $("#password").css("border", "none");
                confirmPasswordValid = true;
            }
            else{
                $("#confirm-password").css("border", "solid red 2px");
                $("#password").css("border", "solid red 2px");
                confirmPasswordValid = false;
            }
        }

        if(!matchEmail){
            $("#email").css("border", "solid red 2px");
            emailValid = false;
        }
        else{
            $("#email").css("border", "none");
            emailValid = true;
        }

        if($("#companyInfo").css("display") === "block"){
            let companyNumber = Number($("#companyNumber").val());

            if(companyNumber >= 1000 && companyNumber <= 9999){
                $("#companyNumber").css("border", "none");
                companyNumberValid = true;
            }
            else{
                $("#companyNumber").css("border", "solid red 2px");
                companyNumberValid = false;
            }
        }

        console.log(usernameValid, emailValid, passwordValid, confirmPasswordValid, companyNumberValid);

        if(usernameValid === true && emailValid  === true && passwordValid === true
            && confirmPasswordValid === true && companyNumberValid === true){
            console.log(true);
            $("#valid").css("display", "block");
        }
        else{
            $("#valid").css("display", "none");
        }
    });

    $("#company").change(function () {
        if($("#companyInfo").css("display") === "block"){
            $("#companyInfo").css("display", "none");
        }
        else{
            $("#companyInfo").css("display", "block");
        }
    });

}