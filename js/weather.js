
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("lat:", lat, "log:" + lng);
}
function onGeoError() {
    alert("Please allow location access.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);