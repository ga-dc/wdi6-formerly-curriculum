#Twitter, but better
---

##THE GOAL
- Twitter is a thing but you can do better. You're going to make a micro blogging application called **GROWLER** using **Sinatra**. All the cool things we've covered this week will be put to use!

- **user stories:**
  - The user can write growls (micro blogs) of 142 characters maximum
  - The user can visit their page where they should see all their growls
  - The user can see all growls posted by other users
  - The user can sign up / sign in

##PHASES

###PHASE 1 - NO COMPUTERS
- **Pseudo Code** and break it down into small steps
  - Think about how you will persist data
  - Think about the different **models** you will set up and their **associations**
  - Divide the different actions of your application into `get` and `post` requests and think about the paths you will create
  - Take time to answer those questions:
    - How will a user create an account?
    - How will a user write a growl?
  - Include some wireframes if you feel good!

###PHASE 2 - SET UP A GIT REPO
- Start coding
- Set up a database and your `schema.sql`
- Set up your models and a connection to active record
- Think about your associations
- Think about the validations you may need
- Using `pry` and `binding.pry` make sure that your associations are working by making some objects
- Create a `seed.rb` file that will hold all your seeding data
  - Make one user and keep track of their id
  - Make a bunch of growls for that user
  - Seed your database with that data
  - Using `binding.pry` make sure that your data has been persisted

###PHASE 3 - PAIR PROGRAMMING
- Time to set up some `get` routes!
- You will need paths to: 
  - All the posts
  - A user's profile page
    - The user's profile page should show all their growls
  - A single growl's page
- Set up and build your views in a `views` folder
- How will you take the user from one page to the other?
- Using the data you have seeded, make sure that it shows up on your pages!

- **Bonus**:
  - Add multiple users to your database
  - Allow user to "log in" with their email
  - Make the routes work for any user that logs in

###PHASE 4 - SWITCHED PAIR PROGRAMMING
- Move on to the `post` routes
  - How will the user create growls?
  - How will you persist that information into your database?
  - How will you make sure that it works with your associations? (*hint*: your paths)
  - What view will the user see once their growl is saved? (How will they get there?)

- **Bonus**:
  - Allow any user that logs in to create growls

###PHASE 5
- Show your creations!
- Things you will cover:
  - Demo
  - Process
  - What did you struggle with / How did you solve it?
  - Most proud of
  - Things to do differently
- **Every one has to talk**


- **BONUSes**
  - Add a tagging functionality 
  - Add a search by tags functionality
  - Add a search by user functionality (this should display all the user's posts)
  - Add a commenting functionality
  - Add some CSS and make it pretty :)