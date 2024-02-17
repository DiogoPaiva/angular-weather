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

### Restrictions

Since this project was developed in an older and deprecated framework `AngularJs`, there were some constraints regarding using up-to-date features or libraries.

This project does not have `SASS` or `SCSS` because it needs `Grunt` and `Ruby` to pre-process the SCSS into plain CSS.
Including those tools will cause several incompatibility issues with the deprecated library dependencies, and all their peer-dependencies.
So, for the simplicity of this exercise, it will be used plain `CSS`.

### Assumptions

1- For the weather forecast, it will only show 7 days ahead.
2- The initial value for the city is "Lisboa", so that it can render a weather forecast on the initial page load;
3- The language by default is English;
4- For the search city input, it will only dispatch the search if there are at least 2 characters.
