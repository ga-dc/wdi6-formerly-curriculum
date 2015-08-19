# Linux and Sequelize

If you are having authentication errors when connecting to your database, the following should help.  Our research indicates that Sequelize uses a "host" connection instead of a "local" connection.  "Host" connections require a password.  We have two options:

1. add a password to the default user (`$ whoami`).  This means that we would have to add username/password to every db configuration (including Rails).

2. (preferred) Create a new role for use with Sequelize.

We're providing instructions for the second option.

1. Create the new role, with a password. Start `psql` and run:
```
CREATE ROLE sequelize_user WITH SUPERUSER LOGIN PASSWORD 'sequelize_password';
```

2.  In the tunr_node_hbs app, update db/connection.js

Replace this line:
```
var sequelize = new Sequelize("postgres:///tunr_db");
```
with:
```
# workaround for linux "host" connection. See: linux_and_sequelize.md
var sequelize = new Sequelize('postgres://sequelize_user:sequelize_password@localhost:5432/tunr_db');
```
