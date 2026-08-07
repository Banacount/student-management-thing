### Idea!

A simple system written in javascript that uses the node runtime,
This is primary in the perspective of teachers.

- A teacher can register and login (might add email support lmao).
- Teacher can add students in their accounts.
- A teacher can do basic crud operations on their students.
- Student item contains grades, subjects, totals etc.
- Grade item is also inside the Student item.
- Grade item contains grade, subject etc.
- The teacher could also do crud operations on the grades(per Student item).

### Prerequisites for me

> I need to learn basic authentication in node.

> Learn project architectures for management.

> Learn database queries to handle user interaction.

> A whole lotta javascript fock.

---

#### Teacher Account Operations (1st layer)
- Add students.
- Delete students (with reason).
- Edit student details.
- Sort the viewing of students.

#### Per Student Operations (2nd layer)
- Add grade item along with the subject.
- Delete grade items (with reason).
- Edit grade items (with reason).
- Sort the viewing of grades.

#### Global Operations (all layer)
- Store reasons for the admin to review and allow.
- Log the reasons and clean them after a certain size.

> The log texts should be stored in a file not in a database
to avoid the overusage of database thingies lol

### File structure (Monolith Layout)

```txt
project-root
|- server/
|- client/
|_ package.json
```
