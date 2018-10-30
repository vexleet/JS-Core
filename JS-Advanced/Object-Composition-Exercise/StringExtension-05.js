(function () {
    String.prototype.ensureStart = function (str) {
        if(! this.toString().startsWith(str)){
            return str + this.toString();
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function (str) {
        if(! this.toString().endsWith(str)){
            return this.toString() + str;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return this.toString().localeCompare("") === 0;
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return ".".repeat(n);
        }

        if (this.length <= n) {
            return this.toString();
        }
        else{
            let str = this;
            while (str.length > n) {
                let splitString = str.split(" ");

                if (splitString.length === 1) {
                    splitString[0] = splitString[0].substr(0, n - 3);
                    str = splitString[0] + "...";
                    continue;
                }
                splitString = splitString.splice(0, splitString.length - 1);

                str = splitString.join(" ") + "...";
            }
            return str;
        }
    };

    String.format = function (string, ...params) {
        for (let i = 0; i < params.length; i++) {
            if (string.indexOf(`{${i}`) !== -1) {
                while (string.indexOf(`{${i}`) !== -1) {
                    string = string.replace(`{${i}}`, params[i]);
                }
            }
        }

        return string;
    };
})()
