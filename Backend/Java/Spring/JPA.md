## Entity

Entity represents a row in a table. JPA has annotations and entities are annotated with `@Entity` and Java will automatically handle database creation.

## Relationships

## One-to-many

We will create a one-to-many relationship between objects POST and CATEGORY

```java
@Entity
@Table(name = "category")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() == obj.getClass()) return false;

        Category category = (Category) obj;
        return Objects.equals(this.id, category.id) &&
            Objects.equals(this.title, category.title);
    }

    @Override
    public int hashCode() { return Objects.hash(id, title); }
}
```

### Cascading

It is important to consider column lifecycle and how important it is to related entities. If entities have independent lifecycles they should not cascade.

## Repositories

By extending JpaRepository we can create entity repository interfaces that will have some basic CRUD implemented at runtime by Spring Data JPA

```java
package com.devtiro.blog.repositories;
import com.devtiro.blog.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
}
```

```java
save(User entity)
findById(UUID id)
findAll()
delete(User entity)
deleteById(UUID id)
```
