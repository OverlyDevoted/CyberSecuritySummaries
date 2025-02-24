[Courtesy of Brian Holt](https://sql.holt.courses/lessons/data/inserts)

# Data Definition

## Create table

```sql
CREATE TABLE ingredients (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  title VARCHAR (255) UNIQUE NOT NULL 
);
```

the long id line creates a column that has an incrementing id. Basically the first record will have the id of 1, the second of 2 and so on.

## Insert

```sql
INSERT INTO ingredients (title) VALUES ('Bell pepper');
```

When running transactions it is sometimes beneficial to not split them up and, for example, insert many rows not with individual inserts. It's good as SQL is transactional, it means if any part of the query would fail, everything that was inserted/updated/deleted would get rolled back.

## Dropping tables

DROP TABLE ingredients;

## Altering tables

Creating new columns 

```sql
ALTER TABLE ingredients ADD COLUMN image VARCHAR (255);
```

The syntax for specifying the attributes for a column is the same as when creating a table.

## Dropping a column 

```sql
ALTER TABLE ingredients DROP COLUMN image;
```

## Data manipulation

## Inserting multiple values

Single quotes in SQL means "this is a literal value". Double quotes in SQL mean "this is an identifier of some variety".

```sql
INSERT INTO "ingredients" (
 "title", "image", "type" -- Notice the " here
) VALUES (
  'broccoli', 'broccoli.jpg', 'vegetable' -- and the ' here
),
('banana', 'banana.jpg', 'fruit');
```

## On conflict 

Some of these you may have already inserted (like the red pepper.) This is telling PostgreSQL that if a row exists already to just do nothing about it. We could also do something like:

```sql
INSERT INTO ingredients (
  title, image, type
) VALUES
  ( 'watermelon', 'banana.jpg', 'this won''t be updated' )
ON CONFLICT (title) DO UPDATE SET image = excluded.image;
```

This is what people in the business would call an "upsert" (insert and update in one). Insert if that title doesn't exist, update if it does.

So when we run this you will notice that watermelon record will have banana image

## Updating

```sql
UPDATE ingredients SET image='watermelonFunny.jpg' WHERE title='watermelon';
```

You can return what was updated like this with a `RETURNING` keyword

```sql
UPDATE ingredients SET image='watermelon.jpg' WHERE title='watermelon' RETURNING id, title, image;
```

Update multiple rows:

```sql
INSERT INTO ingredients (title, image, type) VALUES ('something', 'image1.jpg', 'unidentified'), ('something2', 'image1.jpg', 'unidentified');
```

```sql
UPDATE ingredients SET image='image2.jpg' WHERE type='unidentified' RETURNING *;   
```

Deleting multiple records (it's of course based on the where clause, so it's would not be different from deleting a single records)

```sql
DELETE FROM ingredients WHERE image='image2.jpg' RETURNING *;
```

## Data Query

Basic:

```sql
SELECT * FROM ingredients
```

## Keywords

### LIMIT and OFFSET

Limits the amount of records returned by a query

```sql
SELECT * FROM ingredients LIMIT 5;
```

OFFSET is something that offsets the the start of query. If someone inserts while retrieving the offset would include records in previous page. This problem could be solved with indexes

```sql
SELECT * FROM ingredients LIMIT 5 OFFSET 5;
```

### WHERE (conditional)

```sql
SELECT title FROM ingredients WHERE type = 'fruit';
```

```sql
SELECT title FROM ingredients WHERE type = 'vegetable' and id < 20;
```

### ORDER BY (sorting)

```sql
SELECT title FROM ingredients WHERE type = 'fruit' ORDER BY title;
```

```sql
SELECT title FROM ingredients WHERE type = 'fruit' ORDER BY title DESC;
```

### Fuzzy matching

```sql
SELECT * FROM ingredients WHERE title LIKE '%pota%';
```

This is a very limited fuzzy matching of text. This is not doing things like dropping "stop words" (like and, the, with, etc.) or handling plurals, or handling similar spellings (like color vs colour). Postgres can do this, and we'll get there later with indexes.

## Built-in Functions

### Concat

Concatenates strings

```sql
SELECT * FROM ingredients WHERE CONCAT(title, type) LIKE '%fruit%';
```

### LOWER and UPPER

```sql
SELECT * FROM ingredients WHERE LOWER(CONCAT(title, type)) LIKE LOWER('%fRuIt%');
```

There's also ILIKE which will eliminate case sensitivity in comparisons.

With LIKE keyword there was some type of SQL regex thing going on. We had `%` which means 0 or infinite amount of characters. So you can create a bunch of different regex'es with that. `b%t` may crete many different words with many letters in between b and t. There is also `_` - underscore matches 1 and only one symbol. So - `b_t` but, bet; but not - belt, burnt and so on. 

## Foreign keys as relationships

### Foreign key

Often created in one-to-many relationships

Imagine we have a table

```sql
CREATE TABLE recipes (
  recipe_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) UNIQUE NOT NULL,
  body TEXT
);
INSERT INTO recipes
  (title, body)
VALUES
  ('cookies', 'very yummy'),
  ('empanada','ugh so good'),
  ('jollof rice', 'spectacular'),
  ('shakshuka','absolutely wonderful'),
  ('khachapuri', 'breakfast perfection'),
  ('xiao long bao', 'god I want some dumplings right now');
```

Now let's say you wanted to create a table that would store photos for a recipe. A single photo would only have one recipe it belongs to, but a single recipe might have multiple photos. That's how you would create this relationship in SQL:

```sql
CREATE TABLE recipes_photos (
  photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  url VARCHAR(255) NOT NULL,
  recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE
);
```
With references you can specify what happens to a record when a record that is referenced inside the record is deleted.

### ON DELETE

- ON DELETE CASCADE: if the references row is deleted, delete this too
- ON DELETE SET NULL: sets to null
- ON DELETE NO ACTION: throws an error. In this case if we tried to delete a recipe without deleting it's photos, we would get an error.

### Double relationship

Usually this is created for many-to-many tables. You have to create a constraint of primary key that specifies both table, for example ids as primaries. This will create uniqueality and you won't be able to insert same pair of ids into the table as it will error.

```sql
CREATE TABLE recipe_ingredients (
  recipe_id INT REFERENCES recipes(recipe_id) ON DELETE NO ACTION,
  ingredient_id INT REFERENCES ingredients(ingredient_id) ON DELETE NO ACTION,
  CONSTRAINT recipe_ingredients_pk PRIMARY KEY (recipe_id, ingredients_id) 
);
```

## CHECK

CHECK is a type of constraint that allows you to set conditions on the data. One example of them could be enforcing the use of enumerated values. Test if a constant length value like zip code is 5 characters (US) or that age isn't negative. 

```sql
ALTER TABLE ingredients ADD CONSTRAINT ingredient_type_enum CHECK (type IN ('vegetable', 'fruit', 'meat', 'other'));
```

Type is the column name in ingredients. You can also create CHECK constraints while creating the table
