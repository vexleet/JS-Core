function calcConeVolumeAndSurface(coneRadius, coneHeight) {
    let coneVolume = (1 / 3) * Math.PI * Math.pow(coneRadius, 2) * coneHeight;

    let coneSurface = Math.PI * coneRadius * (coneRadius + Math.sqrt((Math.pow(coneRadius, 2) + Math.pow(coneHeight, 2))));

    console.log("volume = " + coneVolume.toFixed(4))
    console.log("area = " + coneSurface.toFixed(4));
}

calcConeVolumeAndSurface(3, 5);