## 1. What columns violate 1NF?

The columns of food_code and food_description violate 1NF, because they include multiple values separated by a comma.
The date formatting is incorrect for some of the rows.

## 2. What entities do you recognize that could be extracted?

The entities that could be extracted from this table are Members, Dinners, Venues and Foods.

## 3. Name all the tables and columns that would make a 3NF compliant solution

For each entity i would start with making a table:

Members --> member_id, member_address

Dinners --> dinner_id, dinner_date

Venues --> venue_code, venue_description

Foods --> food_code, food_description

We would then need some junction tables to connect the data to each other.

j.table 1
member_id + dinner_id

j.table 2
dinner_id + venue_code

j.table 3
dinner_id + food_code
