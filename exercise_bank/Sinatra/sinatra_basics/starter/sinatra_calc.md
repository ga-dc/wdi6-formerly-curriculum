#Sinatra Calculator

###Objective:
- Build a simple Sinatra app with GET and POST

###Prompt
- You will be building a calculator once again, but this time it will work with the internet.
- You should make git commits as you finish each phase, so you can see the history.

###Specification:
- When they visit the homepage (GET) (`/`), a user should see some text to welcome them to the calculator
- When they visit the `/calculator` page (GET), a user should be able to see all of the calculations that have been done in the past
- A user can see a the third calculation they've done in the past by visiting `/calculator/3` (GET). Same with any other number. If the calculation doesn't exist, they should see text saying that the id wasn't found.
- A user can POST an Addition calculation to `/calculator/add` by providing 2 numbers as parameters.
  - Use the POSTman Chrome extension to try out your POST
- Same with `/calculator/subtract`, `/calculator/multiply`, and `/calculator/divide`
- The calculator can add, subtract, multiply and divide.

###Bonus
- Translate one line of your DC Metro app to Sinatra
  - Example: When I visit `/dc_metro/woodleyp/farragutn` using a GET, I should see "Your trip length from woodleyp to farragutn is 2 stops." in the browser.
