def valid_ip?(address)
  address.split(".").all? do |number|
    number.to_i <= 255 && number.to_i >= 0
  end
end