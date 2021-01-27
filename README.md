## Table Of Contents
* [Info](#info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Add or Remove Tolls Points](#add-or-remove-tolls-point)
* [Screenshots](#screenshots)

## Info
This project is created as a part of my personal projects to calculate closed toll fares where developer can add new tolls and remove new tolls easily.
	
## Technologies
Project is created with:
* React
* Google Maps Platform

## Setup

#### Google API key
Create a .env file and set `REACT_APP_GOOGLE_MAPS_API_KEY` to your google api key. 

#### Running the app
In the project directory, you can run:
`yarn`

`yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Add or remove Tolls point

Toll data are stored in `./information/highways/`

The format for the data 

```
highway: `Highway toll code`,
data: {
    "Toll Plaza Name": {
        firstIntersect: {
            lat1: First Intersect Latitude(The First Direction) (Float)
            lng1: First Intersect Longitude(The First Direction) (Float)
            lat2: First Intersect Latitude(The Opposite Direction) (Float)
            lng2: First Intersect Longitude(The Opposite Direction) (Float)
        },
        secondIntersect: {
            lat1: Second Intersect Latitude(The First Direction) (Float)
            lng1: Second Intersect Longitude(The First Direction) (Float)
            lat2: Second Intersect Latitude(The Opposite Direction) (Float) 
            lng2: Second Intersect Longitude(The Opposite Direction) (Float)
        },
        price: {
            class1: Price in Float for class 1 vehicle
            class2: Price in Float for class 2 vehicle
            class3: Price in Float for class 3 vehicle
            class4: Price in Float for class 4 vehicle
            class5: Price in Float for class 5 vehicle
        }
    }...
}
```

For highways with 2 ways, there will be lat1, lng1 and lat2, lng2.

The first intersect : Before the toll booth
The Second Intersect: After the toll booth

The coordinates can be obtain by extracting the encoded polyline from a given route that uses the toll and find the first and second intersect.

Site that can decode polyline: `https://developers.google.com/maps/documentation/utilities/polylineutility`

## Screenshots
Located in the screenshots folder in src.