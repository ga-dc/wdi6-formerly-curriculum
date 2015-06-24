function squeeze(string){
  return string.replace(/(\w)(\1+)/g, '$1')
}