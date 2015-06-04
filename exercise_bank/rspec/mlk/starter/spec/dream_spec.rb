require_relative '../lib/dream'

describe "The Dream:" do

# I have a dream that one day this nation will
# rise up and live out the true meaning of its
# creed - we hold these truths to be self-
# evident: that all men are created equal.

  describe "our nation" do
    let(:nation) { Nation.new }

    it "holds this truth to be self evident" do
      expect(nation.creed).to be_kind_of(String)
      expect(nation.creed).to match "all men are created equal"
    end

    it "one day will rise up" do
      expect(nation.rise_up?).to be_true
    end
  end

# I have a dream that one day on the red hills
# of Georgia the sons of former slaves and the 
# sons of former slave-owners will be able to 
# sit down together at a table of brotherhood.

  describe State do
    let(:state) { State.new("Ohio") }

    it "has a name" do
      expect(state.name).to be_kind_of(String)
    end

  end

  describe "Georgia" do
    let(:georgia) { State.new("Georgia") }

    it "has people" do
      expect(georgia.people).to be_kind_of(Array)
      expect(georgia.people.count).to be > 0
    end

    it "has sons of former slaves" do
      expect(georgia.people.first).to be_kind_of(Hash)
      expect(georgia.people.find {|person| person[:ancestors] == "slaves"}).to be_true
    end

    it "has sons of former slave-owners" do
      expect(georgia.people.find {|person| person[:ancestors] == "slave-owners"}).to be_true
    end

    context "table of brotherhood" do
      before do
        @sons_of_former_slaves = georgia.people.select do |person|
          person[:ancestors] == "slaves"
        end
        @sons_of_former_slave_owners = georgia.people.select do |person|
          person[:ancestors] == "slave-owners"
        end
      end

      it "allows all to sit down together" do
        expect(georgia.table_of_brotherhood).to be_kind_of(Array)
        expect(georgia.table_of_brotherhood).not_to include(@sons_of_former_slaves.first)
        expect { georgia.sit_at_table(
          @sons_of_former_slaves + @sons_of_former_slave_owners
        ) }.not_to raise_error
        expect(georgia.table_of_brotherhood).to include(@sons_of_former_slaves.first)
      end
    end
  end

  # I have a dream that one day even the state 
  # of Mississippi, a desert state, sweltering 
  # with the heat of injustice and oppression, 
  # will be transformed into an oasis of freedom 
  # and justice.

  describe "Mississippi" do
    let(:mississippi) { State.new("Mississippi") }

    it "will be emancipated" do
      expect { mississippi.emancipate }.to \
        change { mississippi.status }.from(
          "a state sweltering with the heat of injustice and oppression" 
        ).to( 
          "an oasis of freedom and justice" 
        )
    end
  end

  # I have a dream that one day, down in 
  # Alabama, with its vicious racists, with its
  # governor having his lips dripping with the 
  # words of interposition and nullification; 
  # one day right there in Alabama little black 
  # boys and little black girls will be able to
  # join hands with little white boys and white 
  # girls as sisters and brothers.

  describe "Alabama" do
    let(:alabama) { State.new("Alabama") }
    let(:boys_and_girls) do 
      alabama.people.select do |person|
        person[:age] < 19
      end
    end

    it "has children" do
      expect(alabama.people.find {|person| person[:age].nil?} ).to be nil
      expect(boys_and_girls.count).to be >= 2
    end

    it "has white and black children" do
      expect( boys_and_girls.select {|p| p[:color] == "white"}.count ).to be > 0
      expect( boys_and_girls.select {|p| p[:color] == "black"}.count ).to be > 0
    end

    context "will see them" do
      let(:black_children) { boys_and_girls.select {|p| p[:color] == "black"} }
      let(:white_children) { boys_and_girls.select {|p| p[:color] == "white"} }
      
      it "join hands as brothers and sisters" do
        expect { Nation.join_hands(white_children, black_children) }.not_to raise_error
      end
    end

  end

  # I have a dream that my four little children 
  # will one day live in a nation where they 
  # will not be judged by the color of their 
  # skin but by the content of their character.

  describe "our future" do
    let(:nation) { Nation.new }

    it "does not judge by color of skin" do
      expect( nation.judge_by(:color) ).to be_false
    end

    it "judges by content of character" do
      expect( nation.judge_by(:character) ).to be_true
    end
  end

  # I have a dream today!

  # I have a dream that one day every valley 
  # shall be exalted, every hill and mountain 
  # shall be made low, the rough places will be 
  # made plain, and the crooked places will be 
  # made straight, and the glory of the Lord 
  # shall be revealed, and all flesh shall see 
  # it together.

  # This is our hope. This is the faith that I
  # will go back to the South with. With this 
  # faith we will be able to hew out of the moun-
  # tain of despair a stone of hope.

  # With this faith we will be able to transform
  # the jangling discords of our nation into a 
  # beautiful symphony of brotherhood. With this 
  # faith we will be able to work together, to 
  # pray together, to struggle together, to go to 
  # jail together, to stand up for freedom to-
  # gether, knowing that we will be free one day.

  # This will be the day, this will be the day 
  # when all of God's children will be able to 
  # sing with a new meaning: "My country, 'tis of
  # thee, sweet land of liberty, of thee I sing. 
  # Land where my fathers died, land of the pil-
  # grim's pride, from every mountainside, let 
  # freedom ring." And if America is to be a 
  # great nation, this must become true.

  describe Freedom do

  # And so let freedom ring 
  #   from the prodigious hilltops of New Hampshire. 
  # Let freedom ring from 
  #   the mighty mountains of New York. 
  # Let freedom ring from 
  #   the heightening Alleghenies of Pennsylvania! 
  # Let freedom ring from 
  #   the snow-capped Rockies of Colorado. 
  # Let freedom ring from 
  #   the curvaceous peaks of California. 

    describe "#ring" do
      let(:freedom){Freedom.new}
      let(:new_hampshire){ State.new("New Hampshire") }
      let(:new_york){      State.new("New York") }

      it "from many states" do
        expect(freedom.ring(new_hampshire)).to be_kind_of(Array)
      end

      it "from the prodigious hilltops of New Hampshire" do
        expect(freedom.ring(new_hampshire)).to include(new_hampshire)
      end

      it "from the mighty mountains of New York" do
        expect(new_york).not_to be_ringing
        freedom.ring new_york
        expect(new_york).to be_ringing
      end

      context "(THIS IS THE BONUS AND IS HARD!)" do
        let(:pennsylvania){  State.new("Pennsylvania") }
        let(:colorado){      State.new("Colorado") }
        let(:california){    State.new("California") }
        let(:washington_dc){ State.new("Washington, DC") }

        it "only in states (taxation without representation)" do
          expect(freedom.ring(washington_dc)).not_to include(washington_dc)
        end

        it "from Pennsylvania, Colorado and California" do
          freedom.ring(pennsylvania, colorado, california)
          expect(freedom.ring).to include(pennsylvania)
          expect(pennsylvania).to be_ringing
          expect(freedom.ring).to include(colorado)
          expect(colorado).to be_ringing
          expect(freedom.ring).to include(california)
          expect(california).to be_ringing
        end
      end
    end
  end
end

  # But not only that. 
    
  # Let freedom ring from
  #   Stone Mountain of Georgia. 
  # Let freedom ring from 
  #   Lookout Mountain of Tennessee. 
  # Let freedom ring from 
  #   every hill and every molehill of Mississippi,
  # ... from every mountainside, let freedom ring!

  # And when this happens, when we allow freedom 
  # to ring, when we let it ring from every village
  # and every hamlet, from every state and every 
  # city, we will be able to speed up that day when 
  # all of God's children, black men and white men, 
  # Jews and Gentiles, Protestants and Catholics, 
  # will be able to join hands and sing in the words
  # of the old Negro spiritual: 

  # "Free at last! Free at last! thank God Almighty,
  #   we are free at last!"