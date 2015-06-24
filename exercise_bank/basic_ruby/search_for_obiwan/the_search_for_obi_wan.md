##The Search for Obi-Wan

C-3PO is a well-known protocol droid from the Star Wars universe, famed for having a frantic resolve and for directing snappy emotional outbursts at his droid life-mate, R2-D2. Your task is to write a program modelling a simple interaction with C-3PO as he searches for the reclusive Jedi Master, Obi-Wan Kenobi.

**NOTE:** This lesson not only reinforces, but also builds upon what you learned yesterday, so you will likely have to Google a certain bit of Ruby syntax.

1. Create a new Ruby file called `searching_for_obi_wan.rb` in your work folder.
2. C-3PO should:
   * introduce himself as "C-3P0, human-cyborg relations."
   * ask the user's name
   * print  "It is a pleasure to meet you, **name**. Have you ever met a protocol droid before?"
   * print  "**user_answer**? How interesting, for someone from around these parts."
   * print  "I'm terribly sorry for prying, but you don't by any chance go by the alias of Obi-Wan Kenobi, do you? (Answer "I do" or "I don't")"
   * If the user answers 'I do' **OR** 'i do' **OR** 'I DO' **OR** 'i Do'
     * print  "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you."
   * Otherwise:
     * print  "I've really enjoyed speaking with you, **name**, but if you'll please excuse me, I have to help my friend find someone named Obi-Wan Kenobi."
     * prompt the user to enter their favorite farewell.
     * print "**fav_farewell** to you too."
     * print "Well R2, I suppose we'll just have to keep looking."
     * print "R2-D2: (Agreeable droid noises)"
