'use strict';

angular.module('weatherApp').controller('mainController', ['$scope', '$timeout', 'getCityService', 'searchCityNameService', function ($scope, $timeout, getCityService, searchCityNameService) {

    // Model for the cityName,  on the inputText and for the selected one from the list
    $scope.city = {
        inputName: '', 
        selectedCity: ''
    };

   
    // Build the List for the City Dropdown
    $scope.getCityList = function(inputString) {
       
        if( inputString.length > 2) {

            $timeout(function() {
                searchCityNameService.searchCityByName(inputString).then(function (cityData) {
                    $scope.cityList = cityData;
                }, function (error) {
                    console.log("Error on searchCityNameService: ", error)
                });
            }, 500);
        }
    }
    

    // GET CITY FORECAST
    function getCityForecast(selectedCity) {
        getCityService.getCityForecastWeather(selectedCity).then(function (weatherData) {
            $scope.cityForecastData = weatherData.forecast.forecastday;
            $scope.cityCurrentData = weatherData.current;                   
          
            console.log("DATA NO getCityForecastWeather current: ", weatherData.current)
            console.log("DATA NO getCityForecastWeather forecast: ", weatherData.forecast.forecastday[0])
    
        }, function (error) {
            console.log("Error on MAIN CONTROLLER: ", error)
        }).finally(function () {
          console.log("Final on MAIN CONTROLLER")
        });
    }

    // Set the City clicked on the list, to be the selected one 
    $scope.setCity = function (selectedCity) {
        
        // Make available on the $scope
        $scope.city.selectedCity = selectedCity;
        
        // Call the Service to retrieve the forecast
        getCityForecast(selectedCity);

        // Set the selected city on the text input
        $scope.city.inputName = selectedCity;
    }

}
]);