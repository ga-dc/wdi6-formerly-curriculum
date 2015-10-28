# Getting PGSQL

  - Mac: http://postgresapp.com/
    - Download
    - Move it to `/Applications`
    - We want to use it from the command line, so we add it to the search path.
      - `$ atom ~/.bash_profile`
      - Add this line:
     `export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin`
     - save and close.
     - Update your terminal.
    - Then open the app and click "Open psql"
  - Linux
    - `apt-get install postgresql-9.4`
  - All
    - Verify your installation, by running `psql` in your terminal.  You should see:

```
$ psql
psql (9.4.4)
Type "help" for help.

matt=#
```  

### Common Mistake

If you see this when your run `psql`, you have not started the PostgresApp first.

```
$ psql
psql: could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```
