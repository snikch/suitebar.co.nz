require 'haml'
class Template
  def build
    puts "Beginning build"
    pages.each do |page|
      @page_info = page
      puts "- Rendering #{page.at 0}"
      output page.at(1), page.at(2)
    end
    puts "Finished"
  end

  def output(page, file_name)
    @file, @page = file_name, page
    File.open("public/#{file_name}.html", 'w') do |file|
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
    import "pages/#{@page}/#{file}.html.haml"
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
