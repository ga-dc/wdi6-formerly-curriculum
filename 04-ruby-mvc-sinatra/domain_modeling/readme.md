# Problem Modeling & ERD
## Learning Objectives

- Draw an Entity Relationship Diagram (ERD) using proper notation
- Identify and diagram a one-to-one, one-to-many, many-to-many relationship between d ta entities (physical/virtual)
- Create a domain model by listing its parts (entities, relationships, attributes a d behavior)
- Distinguish between entities & attributes (and when you should use one over the o her)
- Discuss data normalization needs and techniques

### Framing
User stories clarify the features we need for a good user experience.  We use them to prioritize order and scope.  Today, we will identify the information required to support those user stories.  We refer to this as the Domain, or Domain Model.  The Domain Model specifies the data and the relationships between this data.  We use it to decide what needs to be persisted.

### Talking Points
* When problem modeling, we often think of things in terms of nouns and verbs
* The verbs can be completely captured in code, and since code is saved, they are saved
* The nouns are represented with placeholders in code (objects, variables, etc)
* The actual data attached to nouns needs to be persisted! Eg. Game scores, the To-Do list, student list

#**I do**

#### Domain Modeling
- Attributes only, not behavior.
- A domain model in problem solving and software engineering is a conceptual model of all the topics related to a specific problem.
- It describes the various entities, their attributes, roles, and relationships, plus the constraints that govern the problem domain.
- __It does not describe solutions to the problem.__

#### ERD?
- An ERD is a tool we use to visualize and describe the data relating to the major entities that will exist in out programs.
- Ultimately lends itself to planning out and creating our database table structure.
- We keep our data separate from our behavior.
- Looks like:
![](http://voormedia.github.io/rails-erd/images/orchard-bachman.png)

- The squares represent our entities and are filled with the attributes associated with our entity.
- The arrows between the squares represent the specic ways in which our various entities relate to one another.
  - There are several types of relationships:
    - One-to-one
      - Usually denotes that one entity should be an attribute of the other
      - Exception is something like a profile to a user
    - One-to-many
    - Many-to-many
      - Often require the creation of a join table.

- What would iTunes look like?
![](https://cdzdfw2009.files.wordpress.com/2009/06/mc_erd2.jpg)

### Library

**You do in pairs**

* Draw an ERD for a library
* **Make sure to walk among tables and provide guidance wrt syntax of ERD, validity of attributes**
* Settle on a common library schema

* Books
	* title
	* author
	* year
	* genre
	* pages

## Modeling Notes
### Why?

1. Allows you to name your purpose
2. List possible:
	* Entities (Nouns)
	* Attributes (Adjectives)
	* Relationships
	* Reduce unnecessary entities
	* Behaviors (verbs)
3. Implement
