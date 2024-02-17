'use strict';

angular.module('weatherAppModule').service('getCityService', ['$http', '$log', '$q','configs', function($http, $log, $q, configs){

     /*
    Weather API - Weather Forecast for 7 Days 
    For the purpose of this exercise, the forecast is fixed to 7 days
    */

    this.getCityForecastWeather = function(cityName) {
        
        const defer = $q.defer();

        // Request Query Params
        const params = {
            q: cityName,
            days: 8,
          //  aqi: 'yes',
            key: configs.WEATHER_API_KEY
        };

        $http.get(configs.WEATHER_API_PATH + '/forecast.json', {params: params}).then(function (response) {

            if (response.data && response.status) {

                const status = response.status;
                if (status === 200) {
                    if (response.data) {

                        var cityData = {
                            current: response.data.current,
                            forecast: response.data.forecast
                        } ;
                        
                        defer.resolve(cityData);

                    } else {
                        $log.error('[getCityForecastWeather] failed - No data returned');
                        defer.reject({
                            errorCode: '[getCityForecastWeather] failed - No data returned'
                        });
                    }

                } else {
                    const error = { 
                        status: status,
                        errorCode: response.data.error.code,
                        errorMessage: response.data.error.message
                    }

                    $log.error('[getCityForecastWeather] Error - ', error);
                    defer.reject(error);
                }

            } else {
                $log.error('[getCityForecastWeather] Error - No response data or status');
                defer.reject({
                    errorCode: '[getCityForecastWeather] Error - No response data or status'
                });
            }

        }, function (httpErrorResponse) {
            const error = {
                status: httpErrorResponse.status,
                errorCode: httpErrorResponse.data.error.code,
                errorMessage: httpErrorResponse.data.error.message
            }
            $log.error('[getCityForecastWeather] Error - ', error);
            defer.reject(error);
        });

        return defer.promise;
    }
}])