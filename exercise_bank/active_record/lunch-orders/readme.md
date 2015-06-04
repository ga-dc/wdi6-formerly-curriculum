# Lunch Orders Redux

Take the existing lunch orders app, and make it persist data to the database.

## Set Up the DB

1. Create the database
  - `psql`
  - `CREATE DATABASE lunch_orders;`
  - `\c lunch_orders`

2. Create the Schema File
  - Orders have the following attributes:
    1. id
    2. name 
    3. order
  - Paste it into psql

3. Connect the app to active record.
  - Maybe you can leverage some old code?

4. Make the data persist!

## Bonus

Add a menu that allows users to:

1. View all orders
2. Create a new order
3. Edit an order
4. Delete an order

