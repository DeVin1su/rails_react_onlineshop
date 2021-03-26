class Api::V1::OrdersController < ApplicationController
  def index
    order = Order.all.order(created_at: :desc)
    render json: order, include: ['order_products', 'products', 'user']
  end

  def create
    @order = Order.create!(order_params)

    if params.has_key?(:products)

      order_products = params[:products].map do |i|
        product = Product.find(i[:id])
        OrderProduct.new(product: product, quantity: i[:quantity])
      end
      
      @order.order_products << order_products
      # payment.order_products << order_products
    end

    # products = Product.find(params[:products].map { |product| product[:id] })
    # @order.products << products

    if @order
      render json: @order
    else
      render json: order.errors
    end
  end

  def show
    if order
      render json: order, include: ['order_products', 'products', 'user']
    else
      render json: order.errors
    end
  end

  private

  def order_params
    params.permit(:amount, :user_id)
    # params.permit(:amount, product_ids: [])
  end
  
  def order
    @order ||= Order.find(params[:id])
  end
end
