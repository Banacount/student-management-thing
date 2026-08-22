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
---

### Data Structure and Operations
> "Model" meaning in this project

A model can have its own directory and
within that directory it has a class
that represents all of its  attributes.

Attributes ex: fullname, id, latest_changed.

Each model directory can also have a utility.js
file where it could reshape or output a
different data based off of the attributes of the
model from the class. Also each model will have a
model.js file where it contains the data structure
of the model and its operations or methods.

> Basically two files commonly, since this is
a solo small project:

```txt
utility.js
model.js
```

---

### To-do
* Add the data structure for each model to clear up things.
* Maybe refactor the code or this documentation.
* Finish the model for grades.
* Maybe separate the middleware functions.

### Progress
You can login and register a teacher and after
logging in you could add students. For now there is
no way to add a grade.

```txt
http://localhost:5959/
```

Just send a json body request to
the routes with the filled data

> __/register__
```txt
request_method: POST

body json data structure:
{
    "username": ( required ),
    "password": ( required ),
    "fullname": ( required )
}

additions: 
the "fullname" attribute needs to be a string
that's structured like this ->

(LAST_NAME FIRST_NAME MIDDLE_NAME).

This is for parsing purposes later on.
```

> __/login__
```txt
request_method: POST

body json data structure:
{
    "username": ( required ),
    "password": ( required ),
}

additions:
After requesting with the properly filled
and valid data; this will return a Bearer
authentication token that's valid for about
5 minutes.
```

> __/get_teacher__
```txt
request_method: GET

additions:
When requesting you need to have an
authentication token from the login
route.

This will return all kinds of data that
is relevant to the teacher.
```

> __/add_student__
```txt
request_method: GET

body json data structure:
{
    "student_name": ( required ),
}

additions:
Yeah the name string structure needs to be this ->

(LAST_NAME FIRST_NAME MIDDLE_NAME).

Again for parsing purposes.
```
