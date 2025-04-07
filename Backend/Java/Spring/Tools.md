## Jackson

Performs conversion between Java and Json. Does this by marshalling to Java objects and unmarshalling when converting back to Json.

This is used when receiving JSON requests and sending Java objects as responses.

Spring web does works with Jackson seamlessly and you don't have to write any additional code.

`ObjectMapper` can be used to convert Java objects to JSON

`objectMapper.writeValueAsString(object);`

To do the opposite you can:

`objectMapper.readValue(json, TargetClass.class);`

It is possible to map different properties from json to different Java object properties. The default behavior is to map properties of the same name together.

It could be done by adding an annotation of `JsonProperty("name")`

If we have some unrecognized properties passed inside our JSON it is possible to ignore it with `@JsonIgnore(ignoreUnknown = true)` at the top of the class.

There is also other things you can configure with Jackson.

## Model mapper

A simple object mapper

Can be used to map DTOs to Entities 

An alternative is MapStruct which uses more of an annotation-based approach.

