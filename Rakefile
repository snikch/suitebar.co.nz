desc "Generate the story views"

task :build do
  require './src/engine/template.rb'
  renderer.build
end

def renderer
  @template ||= Template.new
end
