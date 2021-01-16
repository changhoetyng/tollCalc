import {tollCoordinates} from '../information/highways'

export const checkRoutes = (response) => {
    var highways = []
    response.routes.forEach((route,i) => {
        route.legs.forEach((leg,i) => {
            leg.steps.forEach((step,i) => {
                if(step.instructions.includes("Toll road")){
                    tollCoordinates.forEach((name,i) => {
                        if(step.instructions.includes(name.highway)){
                            highways.push(name);
                        }
                    })
                }
            })
        })
    })
    // highways.forEach((v,i) => console.log(v))
    return highways;
}