Lab 1 Answers

Part 1
Question 1. No. There is only one course and one list, so two functions are enough and a class would add nothing.

Part 2
Prediction 1. An error during execution.

Question 2. The program crashed with `TypeError: Cannot read properties of undefined (reading 'length')` on the first line of `enroll` (`if (enrolledStudents[courseIndex].length >= ...)`), when `enroll(2, "Ibrahima")` was called. `enrolledStudents[2]` doesn't exist because only `courseNames` got the push. Nothing warned me before running; the editor showed no error.

Prediction 2. `enroll(0, "Ibrahima")` does nothing. The length (0 or more) is always `>= -100`, so the function returns right away. There is no error.

Question 3. I would have to search the whole codebase for every place that writes to `capacities`, because any function anywhere can change it. With ten developers and 100,000 lines that could take a very long time, and I would probably need a debugger or logs to find who changed it.

Part 3
Question 4. The capacity invariant: the number of enrolled students must never be more than the course capacity.

3.1 Table

| Function | Edited? | Are you certain it needed (or did not need) the check? |
|---|---|---|
| `addCourse` | Yes | Yes, it must push `true` into the new array or the arrays stop being synchronized |
| `enroll` | Yes | Yes, this is the main way to register |
| `importEnrollment` | Yes | Not really, it depends on whether an import counts as a registration. I decided yes |
| `transferStudent` | Yes | Not really, I decided a transfer into a closed course is not allowed |
| `withdraw` | No | Fairly sure, leaving a closed course should still be possible |
| `printCourse` | No | Yes, it only prints |

Question 5. 4 functions edited (plus the new `closeRegistration`).

Question 6. I decided that a transfer into a closed course is not allowed. The decision is only recorded in the `if` I added in `transferStudent` and a comment above it. The next developer has to find that function to know about it.

Part 4
Prediction 3. No. Each object has its own `enrolledStudents` array, so enrolling into `oop` only changes `oop`.

Question 7. 1 method edited (`enroll`), plus the new `closeRegistration` method. Compared with 4 in Question 5: all the code that changes the student list is inside the class, so the rule goes in one place.

Part 5
Question 8. Encapsulation. The fields are public, so outside code can change them directly. They should be `private` so that only the class's methods can change them.
