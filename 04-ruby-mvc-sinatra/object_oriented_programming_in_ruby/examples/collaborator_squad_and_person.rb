class Person
  attr_reader :name
  def initialize(name)
    @name = name
  end
end

class Squad
  def initialize(name)
    @name = name
    @students = []
  end

  def students
    return @students
  end

  def add_student(student)
    @students.push(student)
  end
end

walter = Person.new("Walter")
robert = Person.new("Robert")

ada = Squad.new("Ada")

ada.add_student(walter)
ada.add_student(robert)

ada.students # array of students (people instances)
ada.students[0] # the first student (1 instance of person)
ada.students[0].name # calling name on that person
