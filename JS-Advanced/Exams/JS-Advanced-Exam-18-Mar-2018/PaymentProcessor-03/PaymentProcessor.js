class PaymentProcessor {
    constructor(object){
        this.options = {};
        this.payments = [];
        if(object === undefined){
            this.options["types"] = ["service", "product", "other"];
            this.options["precision"] = 2;
            return;
        }
        if(object.types === undefined){
            this.options["types"] = ["service", "product", "other"];
        }
        else{
            this.options["types"] = object.types;
        }

        if(object.precision === undefined){
            this.options["precision"] = 2;
        }
        else{
            this.options["precision"] = object.precision;
        }
    }

    registerPayment(id, name, type, value){
        if(typeof id !== 'string' || typeof name !== 'string' || id === '' || name === ''){
            throw new Error("");
        }
        if(typeof value !== 'number'){
            throw new Error("");
        }
        if(!this.options.types.includes(type) || typeof type !== 'string'){
            throw new Error("");
        }

        let checkForIds = this.payments.filter(x => x.id === id);

        if(checkForIds.length > 0){
            throw new Error("");
        }

        this.payments.push({
            id,
            name,
            type,
            value: Number(value.toFixed(this.options.precision))
        });
    }

    deletePayment(id){
        if(typeof id !== 'string'){
            throw new Error("");
        }

        let findID = this.payments.filter(x => x.id === id);
        if(findID.length === 0){
            throw new Error("");
        }

        this.payments = this.payments.filter(x => x.id !== id);
    }

    get(id) {
        if (typeof id !== 'string') {
            throw new Error("");
        }

        let findID = this.payments.filter(x => x.id === id);
        if (findID.length === 0) {
            throw new Error("");
        }

        return `Details about payment ID: ${findID[0].id}\n` +
            `- Name: ${findID[0].name}\n` +
            `- Type: ${findID[0].type}\n` +
            `- Value: ${findID[0].value}`
    }

    setOptions(object){
        if(typeof object !== 'object'){
            throw new Error("");
        }

        if(object.types !== undefined){
            this.options["types"] = object.types;
        }
        if(object.precision !== undefined){
            this.options["precision"] = object.precision;
        }
    }

    toString(){
        let balance = 0;
        let numberOfPayments = this.payments.length;

        for(let payment of this.payments){
            balance += payment.value;
        }

        return "Summary:\n"+
            `- Payments: ${numberOfPayments}\n` +
            `- Balance: ${balance}`;
    }
}
