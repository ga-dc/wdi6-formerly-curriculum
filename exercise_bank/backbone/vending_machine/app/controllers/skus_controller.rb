class SkusController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_sku, only:[:show, :update, :destroy]

  def create

  end

  def index
    render json: Sku.all.order(:id)
  end

  def show
    render json: @sku
  end

  def update
    @sku.update_attributes(update_params)
    @sku.save
    render json: @sku
  end

  def destroy
    @sku.destroy
    render json: {}
  end

  private

    def find_sku
      @sku = Sku.find(params[:id])
    end

    def update_params
      params.permit(:quantity)
    end
end
