## Requests

### POST

You should not always use POST when creating new records. Mostly POST is used, when the ID is auto-generated somehow and in the case it is not, you would provide it in the URL `/resource/:id` and set the method to PUT.

POST returns the inserted record. 

Both return 201 on success

### PUT and PATCH

PUT is the full update. In these requests the full list of attributes has to be included in the request.

PATCH requests mean partial updates. Ideally, not all attributes must be included.

Both of these usually return the updated objects.

### GET

When looking by ID, usually 404 is returned when not found.

But when retrieving all records, usually a filled or empty array is returned.

### DELETE

Returns 204 even when not existing. But error could also be returned. Based on your meaning.
