Lab 3 Answers

Part 1
Question 1. 2 places: `addCredits()` in `Student` and in `GraduateStudent`. With exchange and doctoral students in their own copied classes, it would be 4.

Part 2
Prediction 1.
text
true true true
Awa (S-001): 18 credits
Fatou (G-001): 15 credits

`GraduateStudent` now uses the parent's `addCredits()` (limit 21) and `describe()` (no advisor).

Question 2.
text
'super' must be called before accessing 'this' in the constructor of a derived class. ts(17009)


Prediction 2. No, this time it will crash.

Question 3. The error was `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`. In a subclass, the object is created by the parent's constructor, so before `super()` runs, `this` doesn't exist yet. The parent part (name, id, credits) has to be built first.

Question 4.
text
Property 'name' is private and only accessible within class 'Student'. ts(2341)

`name` exists in the object, but `private` means it can only be used by code written inside the `Student` class. A subclass is other code, so it can't access it.

Part 3
Question 5.
text
This member cannot have an 'override' modifier because it is not declared in the base class 'Student'. Did you mean 'describe'? ts(4117)

The compiler suggests `describe`.

Prediction 3. `Fatou (G-001): 9 credits`. The parent's `describe()` runs because `describ()` is a different method that is never called, so there's no advisor.

Question 6. `override` protects me from thinking I replaced a parent method when I actually created a new one (because of a typo or a renamed method).

Prediction 4. First line: `true true false`. Last line: `false false`.

Question 7. `GraduateStudent`'s version (12). `this` is the real object, which is a `GraduateStudent`, so `this.getCreditLimit()` calls its override, even if the code is written in `Student`.

Question 8. 1 place (`Student.addCredits()`), compared with 2 in Question 1, and it stays 1 even with more kinds of students.

Prediction 5. Yes. Fatou's line includes her advisor.

Part 4
Prediction 6. No red underlines, because `add` and `clear` are public methods inherited from `StudentList`. The counts will be 5 and 0.

Question 9. They broke the no-duplicate rule (Awa twice), the capacity rule (5 students for a capacity of 3), and `clear()` removed every student without any withdraw. The compiler didn't object because `Course extends StudentList`, so `add()` and `clear()` are public methods of `Course` too.

Question 10.
text
Property 'add' does not exist on type 'Course'. ts(2339)


Prediction 7. No. It will crash, because the method really isn't there.

Question 11. With `private`, the field is still in the object and only the compiler hides it. With composition, `Course` doesn't have an `add()` method at all. Only the `StudentList` inside it has one, so even at runtime there's nothing to call and the only way in is `enroll()`.

Part 5
Prediction 8.
text
false
true


Question 12. `AlwaysOpenCourse` is at fault. A subclass must keep the promises of its parent: when `closeRegistration()` is called, registration must be closed, so code written for `Course` must still work with any subclass.

Question 13.
1.`Course.enroll()` already checks the rules (closed, duplicate, capacity), so we don't copy them and they stay in one place.
2.`enrolledStudents` is private in `Course`, so `LabCourse` can't add to it directly anyway. If the rules in `Course` change, `LabCourse` gets the change automatically.

Question 14. `enroll()` already promised that it can return `false` and refuse a student. Adding one more reason to refuse keeps that promise, and the course rules still apply. `closeRegistration()` promised that the course would be closed, and `AlwaysOpenCourse` doesn't do it.

Part 6
| Design | Is-a? | Substitutable? | Stable? | Verdict |
|---|---|---|---|---|
| `GraduateStudent extends Student` | Yes | Yes | Yes | Good inheritance |
| `Course extends StudentList` | No (a course has a list) | No (`add`/`clear` break the rules) | — | Use composition |
| `AlwaysOpenCourse extends Course` | Yes on paper | No (ignores `closeRegistration`) | Yes | Bad, broken promise |
| `LabCourse extends Course` | Yes | Yes (keeps `enroll`'s promise) | Yes | Good inheritance |

Question 15. No. It passes is-a (a TA is a student) and maybe substitutable, but it fails the "stable" test: Mamadou is a TA for only one year, and an object can't change its class. I would use composition instead: a `Student` that has a role (for example a `TeachingAssistantRole` or a list of roles) that can be added and removed.
