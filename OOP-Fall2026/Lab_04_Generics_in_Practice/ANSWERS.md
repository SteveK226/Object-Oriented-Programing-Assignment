Lab 4 Answers — Generics in Practice

Part 1 — The Problem

Prediction 1. TypeScript reports no red underline because any disables checking for awa. Running prints Awa, then throws a TypeError because Member has no describe() method.

Question 1: Using any gives up static type checking, so memberList.add(42) is accepted and then fails at runtime when the list calls getId().

Question 2: The diagnostic says Property getId does not exist on type T. TypeScript cannot assume an unconstrained T has that method, so the type must be constrained to HasId.

Question 3: TypeScript uses structural typing. Book and Member have the required getId method, so they satisfy HasId without explicitly declaring that they implement it.

Part 2 — A Generic Catalog

Question 4. (a) The catalog's type parameter prevents adding a Member to a book catalog. (b) The HasId constraint prevents using number because it has no getId() method. (c) find may return undefined, so the check is required before using found.describe().

Prediction 2. No test call needs to change: the map changes how the catalog stores entries, while its public methods and results remain the same.

Question 5. Callers use the same add, find, and count methods, so changing the private representation from an array to a map does not change the public interface.

Question 6. For example, books.all().push(new Book("B-001", "Duplicate")); would mutate the catalog's internal array and bypass add. Returning a fresh array means this push only changes the caller's copy.

Part 3 — Generic or Not?

Question 7. The diagnostic says Property 'describe' does not exist on type 'Borrowable'. The method promises only a Borrowable, whose contract includes lateFee but not describe; the compiler cannot promise that every returned item has describe.

Prediction 3. worstOverall is inferred as Book | Laptop | undefined (or the equivalent common borrowable input type, depending on inference). The describe() call is not accepted because Laptop has no describe method; lateFee() is available on both choices.

Question 8. A generic is useful when the function returns an input value and should preserve that input's type for its caller. Here mostCostly, generic over the item type constrained to Borrowable returns T, while a mixed input can infer a union type that safely exposes only members shared by the input alternatives.

Part 4 — A Generic Class as a Part

Question 9. The Book field instantiates the queue as string queue, so T is chosen at that use site and means a member name (string). If Book inherited directly from a queue of strings, the inherited public operations could bypass its borrowing rules; for example, book.enqueue("Moussa"); would put a name in the queue without applying borrow checks.

Question 10. The first borrow("Moussa") returns false after adding Moussa to the waiting queue. The second returns false because Moussa is already waiting and nothing changes. A boolean does not tell the caller which reason produced false.

Question 11. Book composes a string queue as its reservations field (composition/has-a). A queue is a part of a book's reservation behavior and should not make a book itself usable as a queue; the 1 to 1 association means each Book owns one queue, and the queue stores zero or more names.

Part 5 — What Generics Cannot Do

Prediction 4. The red underline says T is only a type and cannot be used as a runtime value. If run despite the diagnostic, T has been erased and evaluating value instanceof T throws a ReferenceError (T is not defined).

Prediction 5. The first line prints Things Fall Apart; the second prints NaN, because the JSON object has no copies property and undefined + 1 is NaN.

Question 12. TypeScript types and generic parameters are erased when Node runs the file, so they cannot validate or identify runtime values. A generic type argument on parseJson is only a compile-time promise; data from JSON or another external source must be checked with runtime validation at the boundary where it enters the program.

Part 6 — Ratings

Question 13. If best() returned HasId, callers would lose the specific item type and could no longer use subtype-specific methods such as Book.describe() or Member.getName() without narrowing or casting.




