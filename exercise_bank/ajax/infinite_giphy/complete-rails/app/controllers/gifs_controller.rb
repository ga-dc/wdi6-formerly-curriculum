class GifsController < ApplicationController

  def index
  end

  def search
    results = HTTParty.get("http://api.giphy.com/v1/gifs/search?q=" + params[:keyword] + "&api_key=dc6zaTOxFJmzC&limit=100")
    render json: results 
  end

end