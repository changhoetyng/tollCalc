function checkTolls(polyline_arr,highways) {
    var breakException = {}
      try{
      polyline_arr.forEach(function(v,i,arr){
        console.log(v)
        if (parseFloat(v.lat.toFixed(5)) === 2.98192 && parseFloat(v.lng.toFixed(5)) === 101.63575) {
          if(parseFloat(arr[i+1].lat.toFixed(5)) === 2.98134 && parseFloat(arr[i+1].lng.toFixed(5)) === 101.63677){
            throw breakException;
          }
        }
      })
    } catch(e) {
      if(e === breakException){console.log("puchong south toll")}
    }
}

export default checkTolls