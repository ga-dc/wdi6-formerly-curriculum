## Relational Data

Within a relational database, all database records (rows) are assigned an ID, or *primary key*. Records may then reference other *foreign keys* (keys from other tables) to create relationships between records.

**houses**

| id | name        | color   |
|:-- |:----------- |:------- |
| 1  | Gryffindor  | Red     |
| 2  | Ravenclaw   | Purple  |
| 3  | Hufflepuff  | Yellow  |
| 4  | Slytherin   | Green   |

---

**students**

| id | first_name | last_name | house |
|:-- |:---------- |:--------- |:----- |
| 1  | Harry      | Potter    | 1     |
| 2  | Ron        | Weasly    | 1     |
| 3  | Hermionie  | Granger   | 1     |
| 4  | Draco      | Malfoy    | 4     |

*(each student has a foreign-key relationship to a house)*

---

**subjects**

| id | subjects                      |
|:-- |:----------------------------- |
| 1  | Charms                        |
| 2  | Potions                       |
| 3  | Herbology                     |
| 4  | Defense Against the Dark Arts |
| 5  | Quiddich                      |

---

**rel_students_subjects**

| id | student_id | subject_id |
|:-- |:---------- |:---------- |
| 1  | 1          | 4          |
| 2  | 3          | 1          |
| 3  | 3          | 2          |
| 4  | 1          | 5          |
| 5  | 2          | 5          |


*(a relationship table maps many students to many subjects)*