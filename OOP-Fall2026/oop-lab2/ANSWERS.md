Lab 2 Answers

Part 1
Prediction 1. All three will run and succeed, because the fields are public.

Part 2
Question 1.
text
Property 'capacity' is private and only accessible within class 'Course'. ts(2341)

(The same for `enrolledStudents` and `registrationOpen`.)

Part 3
Prediction 2. The program will run, and the three bypass attempts will still succeed.

Question 2. `node` removes the type annotations and runs the code without checking types, and `private` disappears with them. `private` is only checked by the TypeScript compiler, before the program runs (in the editor or with `tsc`), so at runtime the fields are normal public properties.

Part 4
Question 3. `getEnrollmentCount()` returns a number, a copy of information. The caller can't change the course with it. `getEnrolledStudents()` would return the real array (a reference), so the caller could do `getEnrolledStudents().push("Intruder")` and skip all the rules in `enroll()`, just like bypass attempt 2.

Part 5
Question 4. The caller can break the capacity rule, the no-duplicate rule and the closed-registration rule, because it does the checks itself and pushes directly into the list. Two pages could also check different things. Every time a rule is added (prerequisites, holds, deadlines), every caller like this has to be found and changed, and the ones that are forgotten will accept students they should refuse.

`course.enroll(student)` replaces the whole block, and the class doesn't need any of the four getters (see `registerStudent` in `course.ts`).

Part 6 — Book
1- The invariant.A book can't be borrowed if it is already borrowed, and it can only be given back if it is borrowed.
2- The responsibility. The `Book` itself decides.
3- The state. A title and a borrowed status. Both are `private`, especially `borrowed`.
4- The behaviour. `borrow()` returns `false` if the book is already borrowed, otherwise marks it borrowed and returns `true`. `giveBack()` returns `false` for a book that is not borrowed, otherwise marks it available and returns `true`.
5- The window. `isAvailable(): boolean` (and `getTitle()` to display it).

Prediction 3.
text
true
false
true
false


Question 5. I tried `book.borrowed = false;` from outside. The editor rejects it:
text
Property 'borrowed' is private and only accessible within class 'Book'. ts(2341)

