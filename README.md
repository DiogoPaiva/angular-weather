# angular-weather

An Weather application using AngularJs framework

### INSTALL NOTES:

##### 1- Install Dependencies by running the following command:

`yarn install --modules-folder app/libs`

##### 2- Theres is a need to run this also, since http-server needs to be installed globally:

`yarn global add http-server`

### RUN APPLICATION

Just run this command:

`yarn start`

### Assumptions

1- For the weather forecast, it will only show 7 days ahead.
2- For the search city input, it will only dispatch the search if there are at least 2 characters.
3- On this project, and because it uses `AngularJs` without `Grunt`, for the simplicity of this exercise, it will be used `CSS` instead of `SASS`.
To achieve this integration, it is needed to install `Ruby` globally and `Grunt` and this will cause some issues with deprecated library dependencies.
