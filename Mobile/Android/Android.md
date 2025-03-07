## Severity levels

1. Assert
2. Error
3. Warn(ing)
4. Info
5. Debug
6. Verbose

You set log levels and each ascending level outputs scopes more level groups, first being only assert logs are seen, then on error level assert + error and so on.

```java
//info level
Log.i(location, message);
//debug level
Log.d(location, message);
//warn level
Log.w(location, message);
```

## Activities

Activities are like windows. Your app could have a default activity that is opened upon launch, but some apps could have separate entrance points (e.g. notification) and it could open a different activity. 

Activities should have their concerns separated, meaning they should not depend on each other. In special cases this might be unavoidable. For dependency look at intents. They are used to pass down data through activities. 

## Intent

Let's say you have an activity and it has a button that opens another different activity. You can transfer data between activities using intents. 

## Views

Views are the elements added to the activity

## Attributes

It's where all configuration for a view, like it's position, color, text, id, etc. And it is described inside the view's XML

```java
<TextView 
  android:text="Hello world"
  android:clickable="true"
/>
```

## Permissions

