require 'haml'
class Template
  def build
    puts "Beginning build"
    File.open("public/index.html", 'w') do |file|
      Haml::Engine.new(layout).def_method(self, :render)
      file.write self.render
    end
    puts "Finished"
  end

  def layout
    IO.read("./src/views/layout.html.haml")
  end

  def stories
    pages.map do |page|
      puts "- Rendering story #{page.at 0}"
      @page = page
      import_section :stories
    end.join
  end

  def visuals
    pages.map do |page|
      puts "- Rendering story #{page.at 0}"
      @page = page
      import_section :visuals
    end.join
  end

  def script
    begin
      import_section :script
    rescue
    end
  end

  def header
    import "_header.html.haml"
  end

  def import_section(file)
    import "pages/#{@page.at(1)}/#{file}.html.haml"
  end

  def import(location)
    Haml::Engine.new(IO.read("./src/views/#{location}")).def_method(self, :render)
    render
  end

  def pages
    [
      [ "About", :about, :index],
      [ "Cocktails", :drinks_cocktails, "drinks-cocktails" ],
      [ "Wine", :drinks_wine, "drinks-wine" ],
      [ "Beer", :drinks_beer, "drinks-beer"],
      [ "Spirits", :drinks_spirits, "drinks-spirits" ],
      [ "Food", :food, :food ],
      [ "People", :bartenders, :bartenders ],
      [ "Contact", :contact, "contact-us" ],
    ]
  end

  def link_to(title, link)
    "<a href=\"##{title.downcase}\">#{title}</a>"
  end
end
