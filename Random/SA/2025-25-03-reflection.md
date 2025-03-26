id vs uuid
sveikieji skaiciai greiciau negu lengviau palygint
sunkiau pokint db
reik random uuid turi random uuid - patogu
atskirimas su id gali but sunkiau jei many to one relationships
su uuid lengviau dirbt is patirties. Kodel gi ne UUID visur. Consistency irgi svarbus.
API architekturai pastovumas trumps 
uuid nelabai del indeksu

Mentor prefers app level things. Updating dates, generating UUIDs `UUUI.randomUUID`. Maybe it is easier to take care of things. KEEP IT SIMPLE??

`@Authentication` kaip isresolvinti zmogu
kokia esme useriu. Turi savo serveri ir turim kelias DB serverius.

schemas:
    public
    profiles
    quiz
users:
    postgres rootinis useris, naudot ant kiek retai kiek imanoma
    reik sukurt useris quiz-app-user
    gali tik quiz kazka valdyt
    rasyt skaityt, updatint, deleteint 
    liquibase migracijomis irgi reik tureti useri (gal ir galima postgres)

code first database migration

duot JWT anonymous