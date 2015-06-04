## Command Line Weather Forecast

You've been tasked with creating a command line tool for retrieving the current weather conditions in a given city. For example, running `ruby weather.rb 'green bay' 'WI'` in the command line should output: `THE CURRENT TEMPERATURE IS: 60.5 DEGREES F`

#### Step 1

Sign up for an API key at the [weather underground developer center](http://www.wunderground.com/weather/api/d/login.html).

#### Step 2

Read the Weather Underground API documentation to determine how to structure your query.

#### Step 3

Write your program so that it meets the specification above. (We haven't taught you how Ruby handles arguments passed in the command line, so google it.)

#### Step 4

Add the hourly forecast to your program. You should have the additional output of something like this:

```
8:00 AM : 8 degrees F
9:00 AM : 7 degrees F
10:00 AM : 10 degrees F
11:00 AM : 13 degrees F
12:00 PM : 16 degrees F
1:00 PM : 15 degrees F
2:00 PM : 13 degrees F
3:00 PM : 12 degrees F
4:00 PM : 11 degrees F
5:00 PM : 11 degrees F
6:00 PM : 10 degrees F
7:00 PM : 8 degrees F
8:00 PM : 7 degrees F
9:00 PM : 5 degrees F
10:00 PM : 4 degrees F
11:00 PM : 2 degrees F
12:00 AM : 1 degrees F
1:00 AM : 1 degrees F
2:00 AM : 1 degrees F
3:00 AM : 1 degrees F
4:00 AM : 2 degrees F
5:00 AM : 2 degrees F
6:00 AM : 3 degrees F
7:00 AM : 6 degrees F
8:00 AM : 9 degrees F
9:00 AM : 12 degrees F
10:00 AM : 17 degrees F
11:00 AM : 22 degrees F
12:00 PM : 27 degrees F
1:00 PM : 27 degrees F
2:00 PM : 27 degrees F
3:00 PM : 27 degrees F
4:00 PM : 26 degrees F
5:00 PM : 24 degrees F
6:00 PM : 23 degrees F
7:00 PM : 22 degrees F
```

## Bonus

* Alter your output for the hourly to only show the forecast for every 3 hours.
* Add the text description of the condition expected for that time too.
