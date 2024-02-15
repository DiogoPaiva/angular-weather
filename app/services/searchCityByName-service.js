'use strict';

angular.module('weatherAppModule').service('searchCityNameService', ['$http', '$log', '$q','configs', function($http, $log, $q, configs){
   
     /*
    Weather API - Get City Names
    @param - Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name
    @return - array of City
    @model    
    { 
        id: int,
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        url: string
    }
    */

    this.searchCityByName = function(cityName) {

        console.log("PARAM ENTRADA NO SERVICE getCityNames: ", cityName);
        
                const defer = $q.defer();
        
                // Request Query Params
                const params = {
                    q: cityName,
                    key: configs.WEATHER_API_KEY
                };

                $http.get(configs.WEATHER_API_PATH + '/search.json', {params: params}).then(function (response) {
        
                    if (response.data && response.status) {
                        const status = response.status;
                        
                        if (status === 200) {
                            if (response.data) {
        
                                const cityData = response.data;
                                defer.resolve(cityData);
        
                            } else {
                                $log.error('cityData failed - No data returned');
                                defer.reject({
                                    errorCode: 'UNKNOWN_ERROR'
                                });
                            }
        
                        } else {
                            const error = { 
                                status: status,
                                errorCode: response.data.error.code,
                                errorMessage: response.data.error.message
                            }

                            $log.error('cityData failed - ', error);
                            defer.reject(error);
                        }
        
                    } else {
                        $log.error('cityData failed - No response data or status');
                        defer.reject({
                            errorCode: 'UNKNOWN_ERROR'
                        });
                    }
        
                }, function (httpErrorResponse) {
                    $log.error('cityData failed - ', httpErrorResponse);
                    defer.reject(httpErrorResponse);
                });
        
                return defer.promise;
        
            }
}])