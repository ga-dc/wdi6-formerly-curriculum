### What does a router do?
Matches an HTTP request to the corresponding controller action
* So something like this `get "/students/2"` is directed to the students controller show route

### What does a route look like in Rails?

`get "/students/:id", to "students#show"`
