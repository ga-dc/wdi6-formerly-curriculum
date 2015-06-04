#Sinatra Games

###Specification:

- GET `/coin_toss`
	- returns "Heads" or "Tails"
- GET `/dice_roll`
    - returns a number between 1 and 6
- GET `/magic8ball/will%20it%20snow%20tomorrow`
 	- returns the question asked (in this case, "Will it snow tomorrow?"), followed by a random magic 8 ball response (see below)
- GET `/rps/rock`
	- returns the computer's random choice, followed by the outcome of the rps game.
      - __Example:__ "The computer chose (computer's choice). You (win/lose/tie)!"

###Magic 8 Ball Responses

```Ruby
[ 
  "It is certain", 
  "It is decidedly so", 
  "Without a doubt", 
  "Yes definitely",
  "You may rely on it",
  "As I see it yes",
  "Most likely",
  "Outlook good",
  "Yes", "Signs point to yes", 
  "Reply hazy try again", 
  "Ask again later",
  "Better not tell you now", 
  "Cannot predict now", 
  "Concentrate and ask again",
  "Don't count on it", 
  "My reply is no", 
  "My sources say no",
  "Outlook not so good", 
  "Very doubtful"
]
```
