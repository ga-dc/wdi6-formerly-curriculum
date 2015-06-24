class Simon	
	def self.echo(word)
		word
	end 

	def self.shout(str)
		str.upcase
	end 

	def self.repeat(word, y=2)
		arr = []
		y.times do 
			arr << word
			end 
			arr.join(' ') 
	end 

	def self.start_of_word(word, y)
		word[0..y-1]
	end 

	def self.first_word(str)
		str.split.first
	end 

	def self.titleize(str)
		arr = str.capitalize.split
		little_word = ['and', 'the', 'over', 'with']
		 arr.map {|x| little_word.include?(x)? x : x.capitalize}.join(' ')
		
	end 
end 