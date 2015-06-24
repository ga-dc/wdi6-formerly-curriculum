class TodosController < ApplicationController
  def index
    @todos = Todo.order("created_at ASC").all

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @todos }
    end
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo
    else
      render status: 400, nothing: true
    end
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update(todo_params)
      render json: @todo
    else
      render status: 400, nothing: true
    end
  end

  def destroy
    @todo = Todo.find(params[:id])

    if @todo.destroy
      render json: {}
    else
      render status: 400, nothing: true
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:task, :done)
  end
end
