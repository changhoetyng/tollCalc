function checkTolls(tolls, highways) {
    var price = {
        class1: 0,
        class2: 0,
        class3: 0,
        class4: 0,
        class5: 0,
    }
    tolls.forEach(toll => {
        var highway = highways.find(v => v.highway === toll.highway)
        Object.entries(highway.data).map(([key,value]) => {
            if(key === toll.toll){
                price.class1 += value.price.class1
                price.class2 += value.price.class2 
                price.class3 += value.price.class3 
                price.class4 += value.price.class4 
                price.class5 += value.price.class5  
            }
        })
    })
    console.log(price)
}

export default checkTolls;