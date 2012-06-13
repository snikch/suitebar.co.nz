class Diary

  def self.day_valid? date
    # Sun, thur, fri, sat
    date.sunday? || date.thursday? || date.friday? || date.saturday?
  end

  def self.hour_valid? date
    date.hour >= 18 && date.hour <= 22
  end

  def self.minutes_valid? date
    [0, 30].include? date.minute
  end
end
