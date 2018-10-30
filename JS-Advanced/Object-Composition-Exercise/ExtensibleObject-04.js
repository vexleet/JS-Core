function solve() {
    let obj = {
        extend: function (template) {
            for(let key of Object.keys(template)){
                if(typeof(template[key]) == "function"){
                    Object.getPrototypeOf(obj)[key] = template[key];
                }
                else{
                    obj[key] = template[key];
                }
            }
        }
    };

    return obj
}