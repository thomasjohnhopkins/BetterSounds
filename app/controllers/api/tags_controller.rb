
class Api::TagsController < ApplicationController
def index
  @tags = Tag.all

  render :index
end

def create
  @tag = Tag.save(name: params[:name])
  render :show
end

private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
