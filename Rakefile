desc "Generate the story views"

task :build do
  require './src/engine/template.rb'
  { about: :index }.each do |file, page|
    renderer.output file, page
  end
end

def renderer
  @template ||= Template.new
end
