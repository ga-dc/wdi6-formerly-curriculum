#DC Metro App

###Learning Objectives:
  * exercise your problem modeling skills (whiteboard first!!!)
  * practice working with collections
  * continue practicing your git commands (ABC = "Always Be Committing")
  

###The Program:
- You will be creating a program that models a simple subway system.
- The program takes the line and stop that a user is getting on at and the line
and stop that user is getting off at and prints the total number of stops for the trip.

### The Deets:
- There are 3 subway lines:
  - The Red line, which has the following stops: 
    - Woodley Park
    - Dupont Circle
    - Farragut North
    - __Metro Center__
    - Judiciary Square
    - Union Station
    
    
   * The Fictional "Turquoise" line, which has the following stops: 
     * Crystal City
     * __Metro Center__
     * Shaw-Howard
     * Beltwater
   
   * The Orange line, which has the following stops: 
     - Farragut West
     - McPherson Sq
     - __Metro Center__
     - Federal Triangle
     - Smithsonian
     - L'enfant Plaza
     

###The Process
1) Before you start coding away, close your laptops and draw a diagram of the metro lines with their stops and how they intersect.

2) Write out---step by step, in plain English---how you would find the number of stops between the Woodley Park stop on the Red line and the Beltwater stop on the Turqoise line. What values do you need, and how will you use them?
	
3) Re-open your laptops and set up your data at the top of your program; the kindly DC Metro Authority has gone to the trouble of arranging your data for you:

```ruby
red = ['Woodley Park', 'Dupont Circle', 'Farragut North', 'Metro Center', 'Union Station']
turquoise = ['Crystal City', 'Metro Center', 'Shaw-Howard', 'Beltwater']
orange = ['Farragut West', 'McPherson Sq', 'Metro Center', 'Federal Triangle', 'Smithsonian', "L'enfant Plaza"]

dc_metro = {}
dc_metro[:red] = red
dc_metro[:turquoise] = turquoise
dc_metro[:orange] = orange
```

4) Build your program from the ground up, starting with single-line functionality:
  - Assume that the Red line is the only subway line first.
    - The user should be given a list of all the stops on the Red line
    - The user should be able to enter the stop that they want to get on at
    - The user should be able to enter the stop that they want to get off at
    - The user should be told the number of stops for their trip

5) Now move on to two-line functionality (Red and Turqoise)
  - The user should be asked what line they want to get on
  - The user should be given a list of all the stops on that line
  - The user should be able to enter the stop that they want to get on at
  - The user should be asked what line they want to get off
  - The user should be given a list of all the stops on that line
  - The user should be able to enter the stop that they want to get off at
  - The user should be told the number of stops for their trip

6) Now move on to three-line functionality (Red, Turqoise, and Orange)
  - Make your program work with all three lines
