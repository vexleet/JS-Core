function attachGradientEvents(){
    let gradient = document.getElementById('gradient');

    gradient.addEventListener('mousemove', function (e){
        let power = e.offsetX / (e.target.clientWidth - 1);
        power = Math.trunc(power * 100);
        document.getElementById("result").textContent = power + "%";
    });
    gradient.addEventListener('mouseout', function(){
        document.getElementById("result").textContent = "";
    })

}