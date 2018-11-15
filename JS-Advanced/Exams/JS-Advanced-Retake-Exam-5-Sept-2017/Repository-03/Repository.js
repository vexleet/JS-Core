class Repository {
    constructor(props){
        if(typeof props !== 'object'){
            throw new Error("");
        }

        this.props = props;
        this.data = new Map();
    }

    add(entity){

    }
}