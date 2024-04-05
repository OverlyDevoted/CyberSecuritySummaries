# MongoDB

NoSQL database.

## Connection

In `Database access` tab create your admin user. And use it's credentials in the connection string.

### NodeJS

For JavaScript, go to `Overview` tab, press `Connect new`, select `NodeJS` and copy the string. You can add `dbName` property to the end to specify which database to connect to. 

## Atlas commands 

| Command | Description |
| - | - |
| `show dbs` | Shows all databases |
| `use <database>` | Makes you use a database |
| `show collections` | shows collections on the current db |
| `db.collection.find({})` | Gets all records for that collection |
| `db.collection.find({propertyToFilterBy:"filterValue"})` | You can filter by specifying properties and their values |
| `db.collection.find({}).limit` | You can limit the amount of results |
| `db.collection.countDocuments({property:value})` | It's possible to count the amount of properties |
| `db.collection.find({numberProp:{$lt:value}})` | Comparison for number properties. $lt translates to less that. There's also $gt |

## Aggregation

Gives more sophisticated query capabilities

To aggregate 

```js
db.collection.aggregate([
    {$modifier:{}}
])
```

Modifiers:

| Modifier | Description | Example |
| - | - | - |
| `$match` | Let's you retrieve only specified properties of specified value | `db.flats.aggregate([{$match:{miestas:"Vilnius"}}])` |
| `$group` | Let's you to group records by a field | `db.flats.aggregate([{$group:{_id:"$miestas"}}])` |  
| `$sum` | Sums one column | `db.flats.aggregate([{$group:{_id:"$miestas", kaina:{$sum:"$kaina"}}}])` |
| `$sort` | Sorts records by a specified property | `db.flats.aggregate([{$group:{_id:"$miestas", kaina:{$sum:"$kaina"}},$sort:{kaina:-1}}])` |
| `$in` | Let's you select fields based on their properties with `$match` | `db.flats.aggregate([{$match:{miestas:{$in: ["Vilnius", "Kaunas"]}}}{$group:{_id:"$miestas", kaina:{$sum:"$kaina"}}},{$sort:{kaina:-1}}])` |