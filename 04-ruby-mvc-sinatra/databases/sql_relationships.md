# Relationships in SQL / SQL JOINs

- Define what a foreign key is
- Distinguish between keys, foreign keys, and indexes
- Describe what it means for a database to be normalized
- explain what primary keys are and how they are used
- Use JOIN types to combine data


## Joins

Add books!
books: title, published_at

Then fill it in.  Don't forget the relationship to author.

Bonus: Try it with Ruby.


## Joins

- Inner Join
  - Combines records that match both sides
- Left/Right Join
  - Combines records of one side with matching record from other side, and fills in null for remaining
- Outer join
  - Combines all records of both sides with matching record from other side, and fills in null for remaining.

- Huh?
  - Try it yourself

```
SELECT * FROM books INNER JOIN books ON (books.author_id = author.id);

SELECT * FROM authors INNER JOIN books ON (books.author_id = author.id);

SELECT authors.*, book.title FROM authors INNER JOIN books ON (books.author_id = author.id);

SELECT authors.*, books.*
FROM authors
LEFT OUTER JOIN books
ON (books.author_id = author.id);

SELECT authors.*, books.*
FROM authors
LEFT JOIN books
ON (books.author_id = author.id);
```

http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
