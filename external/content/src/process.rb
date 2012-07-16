#!/usr/bin/env ruby

output = {}
%w[ wine ].each do |file_name|
  IO.readlines(file_name << ".txt").each do |line|
    # get the wine varietal
    matches = line.match(/^([a-zA-Z\s,&-]+)[\d+|ml\s]+/)
    next unless matches
    header = matches[1].strip
    # remove it from the line, and the glass sizes
    line.gsub!(header,'')
    line.gsub!(/^\s[\d+|ml\s]+/, '')
    line.strip!
    wines = []
    current = []
    state = :start
    line.split(' ').each do |chunk|
      if state == :start
        puts "adding chunk to last"
        current << chunk
        current << ''
        state = :name
      elsif state == :name
        current.last << ' ' + chunk
        state = :price && current << '' if chunk =~ /[0-9\.]+/
      elsif state == :price
        state = :region unless chunk =~ /[0-9\.]+/
        current << ' ' + chunk
      elsif state == :region
        if chunk =~ /[0-9]+|NV/
          wines << current.strip
          current = chunk
          state = :start
        else
          current << ' ' + chunk
        end
      end
      output[header] = wines
    end
  end
  raise output.inspect
end
