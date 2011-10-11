require 'haml'
class Template
  def output(file, page)
    @file, @page = file, page
    File.open("public/#{page}.html", 'w') do |file|
      Haml::Engine.new(layout).def_method(self, :render)
      file.write self.render
    end
  end

  def layout
    IO.read("./src/views/layout.html.haml")
  end

  def stories
    import :stories
  end

  def visuals
    import :visuals
  end

  def import(file)
    Haml::Engine.new(IO.read("./src/views/pages/#{@file}/#{file}.html.haml")).render
  end
end
