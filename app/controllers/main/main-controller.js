'use strict';

angular.module('weatherApp').controller('mainController', ['$scope', '$timeout', 'getCityService', 'searchCityNameService', function ($scope, $timeout, getCityService, searchCityNameService) {

    // Model for the cityName, on the inputText and for the selected one on the dropdownlist
    // Default value to Lisbon so that the page runs with information
    // IMPROVEMENT : Use nearby service to detect geo location of the device and set the nearest city as default value. Requires user consent.
    $scope.city = {
        inputName: 'Lisboa', 
        selectedCity: 'Lisboa'
    };

    // Run the first time page loads
    getCityForecast($scope.city.selectedCity);

    // Set Temperature units
    $scope.temperature = 'celsius';
    $scope.setTemperatureUnit = function(units){
        $scope.temperature = units;
    }
   
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
            
            // Remove the first element of the array. Returns the removed elemnent, that represents the TODAY forecast 
            $scope.cityTodayForecast = weatherData.forecast.forecastday.shift();
            
            // After the first elememt is removed, the original array is changed to only have the remaining elements
            // Added a new property to the array "weekday" to show the name of the corresponding day 
            const arrayWithWeekDays = weatherData.forecast.forecastday.map(item => { 
                return {...item, dateValues: getWeekDays(item.date_epoch)}
            });

            // Set it to scope
            $scope.city7DaysForecast = arrayWithWeekDays;

            // Current weather information
            $scope.cityCurrentData = weatherData.current;
    
        }, function (error) {
            console.log("[MAIN CONTROLLER] - [getCityForecast] : error ", error)
        });
    }

    /* Helper function to retrieve the name of weekdays from a timestamp */
    function getWeekDays(timestamp) {

        const weekDays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
        var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
        
        // Multiply by 1000 to make it milliseconds 
        const date =  new Date(timestamp * 1000);

        const dayName = weekDays[date.getUTCDay()];
        const dayValue = date.getDate();
        const monthValue = months[date.getMonth()];
        const fullDate = date.toLocaleDateString('en-EN', { weekday: 'long', month: 'short', day: 'numeric'});
        
        return {
            dayName: dayName,
            dayValue: dayValue,
            monthName: monthValue,
            fullDate: fullDate
        } ;
    }

    $scope.getOnlyHours = function (timestamp) {

        const date = new Date(timestamp);
        const h = date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: '2-digit', hourCycle: 'h24'})
        const hours = h;

        return hours;
    }

    // Based on the table located in 
    // https://uk-air.defra.gov.uk/air-pollution/daqi
    $scope.airQualityText = function(index) {
        
        // Very Good
        if(index <= 3) {
            return 'Very Good'
        }

        // Average
        if(index > 3 && index <= 6) {
            return 'Average'
        }

        // Bad
        if(index > 6 && index <= 9) {
            return 'Bad'
        }

        // Very Bad
        if(index === 10) {
            return 'Very Bad'
        }
    }

    // Set the City clicked on the search dropdown list 
    $scope.setCity = function (selectedCity) {
        
        // Make available on the $scope
        $scope.city.selectedCity = selectedCity;
        
        // Call the Service to retrieve the forecast
        getCityForecast(selectedCity);

        // Set the selected city on the text input
        $scope.city.inputName = selectedCity;

        // Reset cityList array for a new search
        $scope.cityList = [];
    }

    $scope.setDayDetail = function(detail) {
        $scope.forecastDetailDay = detail;
    }
}
]);