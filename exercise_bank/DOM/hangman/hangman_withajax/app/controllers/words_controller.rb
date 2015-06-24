class WordsController < ApplicationController
  def random
    render json: Word.order("RANDOM()").first
  end
end