require 'haml'
class Template
  def build
    pages.each do |page|
      output page.at(1), page.at(2)
    end
  end

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
    import_section :stories
  end

  def visuals
    import_section :visuals
  end

  def header
    import "_header.html.haml"
  end

  def import_section(file)
    import "pages/#{@file}/#{file}.html.haml"
  end

  def import(location)
    Haml::Engine.new(IO.read("./src/views/#{location}")).def_method(self, :render)
    render
  end

  def pages
    [
      [ "About", :about, :index],
      [ "Cocktails", :drinks_cocktails, "drinks-cocktails" ],
      [ "Spirits", :drinks_spirits, "drinks-spirits" ],
      [ "Wine &amp; Beer", :drinks_beer_wine, "drinks-wine-beer" ],
      [ "Food", :food, :food ],
      [ "People", :bartenders, :bartenders ],
      [ "Contact", :contact, "contact-us" ],
    ]
  end

  def link_to(title, link)
    "<a href=\"#{link}\">#{title}</a>"
  end
end
