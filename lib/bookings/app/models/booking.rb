require 'active_model'

class Booking
  include ActiveModel::Validations
  
  validates_presence_of :name
  validates_presence_of :phone
  validates_numericality_of :guests
  validate :validate_booked_at

  attr_accessor :attributes
  
  def initialize(attributes = {})
    @attributes = attributes
  end

  def read_attribute_for_validation(key)
    @attributes[key]
  end

  def method_missing name, *params
    if @attributes[name]
      return @attributes[name]
    end
    raise NoMethodError
  end
  
  private

  def convert_created_at
    begin
      self.created_at = Date.civil(self.year.to_i, self.month.to_i, self.day.to_i)
    rescue ArgumentError
      false
    end
  end

  def validate_booked_at
    return errors.add("booked_at", "is in the past") if booked_at <= Time.now
    return errors.add("booked_at", "bookings are not accepted for today") if booked_at.to_date.today?
    return errors.add("booked_at", "is on an invalid day") unless Diary.day_valid? booked_at
    return errors.add("booked_at", "is outside of booking hours") unless Diary.hour_valid? booked_at
    return errors.add("booked_at", "only accepts bookings on the hour, or at half past") unless Diary.minutes_valid? booked_at
  end
end
