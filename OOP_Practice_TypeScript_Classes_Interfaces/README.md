# Object-Oriented Programming — DAUST Fall 2026

# Practice Session — TypeScript, Classes, and Interfaces

**Duration:** 1 hour 20 minutes
**Requires:** Node.js (v22+), VS Code

## How This Session Works

The folder contains five exercise files. Each file has **TODOs** to complete and, at the bottom, **checks** that test your work.

```text
ex1_types.ts          types, unions, optional parameters, narrowing
ex2_course.ts         a class that protects its rules
ex3_interfaces.ts     interfaces, implements, structural typing
ex4_inheritance.ts    extends, override, super
```

Open the **folder** in VS Code (File → Open Folder), not individual files. Then run an exercise:

```bash
node ex1_types.ts
```

Each check prints one status:

```text
PASS    your code is correct
FAIL    your code runs but gives the wrong result
TODO    this part is not implemented yet
ERROR   your code crashed; the message says why
```

## Rules

1. Replace each `throw new Error("TODO");` with your implementation.
2. Do not modify anything below the line **Checks — do not modify below this line**.
3. An exercise is finished when **every check passes and the file has no red underline**.
4. Some TODOs ask you to uncomment lines that must show a red underline. That is intended: those lines prove the compiler protects your design. Comment them again afterwards.

Remember: `node` runs your code without type-checking it. The red underlines in VS Code are the only type check. A file can print `PASS` everywhere and still be wrong if the editor shows errors.

## The Exercises

### Exercise 1 — Types

Literal union types, optional parameters, narrowing with `typeof`, handling `undefined`, and replacing `any` with precise types.

Think about: after TODO 1.1, why does `"unknown"` become a compile error? In TODO 1.5, why does `find` return `string | undefined`?

### Exercise 2 — A Class That Protects Its Rules

`private`, `readonly`, constructor validation, and a `Course` that enforces its own invariants.

Think about: in TODO 2.6, the return type is already `readonly string[]`. Why is that not enough, and what does the last check demonstrate?

### Exercise 3 — Interfaces

Two unrelated classes, `Course` and `Workshop`, implement the same interface. Functions work with the interface, not with a specific class.

Think about: the check file passes an object literal, `externalEvent`, to `totalEnrollment`. It is not a `Course` or a `Workshop`. Why does TypeScript accept it?

### Exercise 4 — Inheritance

A `GraduateStudent` specialises `Student` by overriding only what differs. TODO 4.3 contains a bug that only the `override` keyword reveals.

Think about: `summarize` is written once and only knows the type `Student`. Why does it print the advisor for Fatou?

### Exercise 5 — Composition

A `Department` *has* courses and delegates decisions to them.

Think about: why is `Department` not written as `class Department extends Array<Course>`? Why must `registerStudent` not check the course's capacity itself?

## If You Finish Early

In `ex5_composition.ts`, add a class `LabCourse extends Course` that only accepts students who completed safety training (a `recordSafetyTraining(studentId)` method). Register a lab course in the department and verify that `registerStudent` returns `"refused"` for an untrained student, without changing `Department` at all.

## Optional — Type-Check the Whole Folder

If TypeScript is installed in the folder (`npm install -D typescript`), this command checks every file using the included `tsconfig.json`:

```bash
npx tsc
```

No output means no type errors.
