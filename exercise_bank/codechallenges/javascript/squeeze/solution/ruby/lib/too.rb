def too_to_to(string)
  string.gsub!(/(\w)(\1+)/, '\1')
end