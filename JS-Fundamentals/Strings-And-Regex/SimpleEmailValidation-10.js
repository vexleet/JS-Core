function solve(text) {
    let regex = /^[A-Za-z0-9]+@[a-z]+.[a-z]+$/g;

    if(regex.test(text)){
        console.log('Valid');
    }
    else{
        console.log('Invalid');
    }
}