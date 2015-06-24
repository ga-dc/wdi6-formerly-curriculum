# Codebar Workshops and Members

Codebar has two different types of Members; Students and Coaches. All members have the attribute `full_name`.

Additionally, each Student also has an about attribute with information about why they want to learn programming, and each Coach has a bio and skills.

Codebar also has Workshops. A workshop has:

- a date
- a venue_name
- coaches and
- students

Create an `add_participant` method that accepts a member attribute. If the Member is a Coach, add them to the coaches list. If a Member is a Student, add them to the students list.

Create another method print_details that outputs the details of the workshop.

Make your code work for the following calls and print out the response you can see in the comments below.

```ruby
workshop = Workshop.new("12/03/2014", "Shutl")

jane = Student.new("Jane Doe", "I am trying to learn programming and need some help")
lena = Student.new("Lena Smith", "I am really excited about learning to program!")
vicky = Coach.new("Vicky Ruby", "I want to help people learn coding.")
vicky.add_skill("HTML")
vicky.add_skill("JavaScript")
nicole = Coach.new("Nicole McMillan", "I have been programming for 5 years in Ruby and want to spread the love")
nicole.add_skill("Ruby")

workshop.add_participant(jane)
workshop.add_participant(lena)
workshop.add_participant(vicky)
workshop.add_participant(nicole)
workshop.print_details
#
# Workshop - 12/03/2014 - Venue: Shutl
#
# Students
# 1. Jane Doe - I am trying to learn programming and need some help
# 2. Lena Smith - I am really excited about learning to program!
#
# Coaches
# 1. Vicky Ruby - HTML, JavaScript
#    I want to help people learn coding.
# 2. Nicole McMillan - Ruby
#    I have been programming for 5 years in Ruby and want to spread the love
#
```

## Bonus

The print_details method does a number of different things, like printing out: workshop details, the list of Students and the list of Coaches.

Create a method to print the workshop details, a method to print out the students and one to print out the coaches. Call these from print_details instead of having all the code there. Also, make sure that these methods cannot be invoked from outside the class.

