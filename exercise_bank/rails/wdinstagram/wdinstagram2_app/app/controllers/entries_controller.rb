class EntriesController < ApplicationController

  def index
    @entries = Entry.all
    render :index
  end

  def new
    render :new
  end

  def create
    entry = Entry.new
    entry.author = params[:author]
    entry.photo_url = params[:photo_url]
    entry.date_taken = params[:date_taken]

    entry.save

    redirect_to "/entries"
  end

  def show
    @entry = Entry.find(params[:id])
    render :show
  end

end