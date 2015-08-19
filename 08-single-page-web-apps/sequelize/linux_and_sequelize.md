# Linux and Sequelize

Our research indicates that sequelize uses a "host" connection instead of a "local" connection.  "Host" connections require a password.  We have two options:
1. add a password to the default user (`$ whoami`).  This means that we would have to add username/password to every db configuration (including Rails).
2. (preferred) Create a new role for use with Sequelize.

We're providing instructions for the second option.

1. Create the new role, with a password.
```
CREATE ROLE sequelize_user WITH SUPERUSER PASSWORD 'sequelize_password';
```

2.  Update config/connection.js

Replace this line:
```
var sequelize = new Sequelize("postgres:///tunr_db");
```
with:
```
var sequelize = new Sequelize('postgres://sequelize_user:sequelize_password@localhost:5432/tunr_db');
```
