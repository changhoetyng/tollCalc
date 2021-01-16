function checkTolls(polyline_arr, highways) {
  // highways.forEach((v)=>{console.log(v)})
  var tolls = [];
  polyline_arr.forEach(function (polyline, i, arr) {
    highways.forEach((highway) => {
      Object.entries(highway.data).map(([key, value]) => {
        // console.log(value)
        if (
          (parseFloat(polyline.lat.toFixed(5)) === value.firstIntersect.lat1 &&
            parseFloat(polyline.lng.toFixed(5)) ===
              value.firstIntersect.lng1) ||
          (parseFloat(polyline.lat.toFixed(5)) === value.firstIntersect.lat2 &&
            parseFloat(polyline.lng.toFixed(5)) === value.firstIntersect.lng2)
        ) {
          if (
            (parseFloat(arr[i + 1].lat.toFixed(5)) ===
              value.secondIntersect.lat1 &&
              parseFloat(arr[i + 1].lng.toFixed(5)) ===
                value.secondIntersect.lng1) ||
            (parseFloat(arr[i + 1].lat.toFixed(5)) ===
              value.secondIntersect.lat2 &&
              parseFloat(arr[i + 1].lng.toFixed(5)) ===
                value.secondIntersect.lng2)
          ) {
            tolls.push({ highway: highway.highway, toll: key });
          }
        }
      });
    });
  });
  return tolls;
}

export default checkTolls;
