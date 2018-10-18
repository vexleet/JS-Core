function attachEventsListeners() {
    document.getElementById("convert").addEventListener("click", calculate);

    function calculate() {
        let inputUnits = document.getElementById("inputUnits").value;
        let outputUnits = document.getElementById("outputUnits").value;

        let outputDistance = document.getElementById("inputDistance").value;

        switch (inputUnits) {
            case "km":
                outputDistance *= 1000;
                break;
            case "m":
                outputDistance *= 1;
                break;
            case "cm":
                outputDistance *= 0.01;
                break;
            case "mm":
                outputDistance *= 0.001;
                break;
            case "mi":
                outputDistance *= 1609.34;
                break;
            case "yrd":
                outputDistance *= 0.9144;
                break;
            case "ft":
                outputDistance *= 0.3048;
                break;
            case "in":
                outputDistance *= 0.0254;
                break;
        }

        switch (outputUnits) {
            case "km":
                outputDistance /= 1000;
                break;
            case "m":
                outputDistance /= 1;
                break;
            case "cm":
                outputDistance /= 0.01;
                break;
            case "mm":
                outputDistance /= 0.001;
                break;
            case "mi":
                outputDistance /= 1609.34;
                break;
            case "yrd":
                outputDistance /= 0.9144;
                break;
            case "ft":
                outputDistance /= 0.3048;
                break;
            case "in":
                outputDistance /= 0.0254;
                break;
        }

        document.getElementById("outputDistance").value = outputDistance;
    }
}