// Exercise 2 — A class that protects its rules
//
// Run:  node ex2_course.ts

class Course {
  // TODO 2.1 — Encapsulation.
  // `code` must never change after construction: make it readonly.
  // The three other fields must not be reachable from outside the class: make them private.
  readonly code: string;
  private capacity: number;
  private enrolledStudents: string[] = [];
  private registrationOpen = true;

  constructor(code: string, capacity: number) {
    // TODO 2.2 — A course cannot be created with an invalid capacity.
    // If `capacity` is not a positive whole number, throw new Error("Invalid capacity").
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Invalid capacity");
    }
    this.code = code;
    this.capacity = capacity;
  }

  // TODO 2.3 — Enroll a student. Return false if:
  //   - registration is closed
  //   - the student is already enrolled
  //   - the course is full
  // Otherwise, enroll the student and return true.
  enroll(studentId: string): boolean {
    if (!this.registrationOpen) return false;
    if (this.enrolledStudents.includes(studentId)) return false;
    if (this.isFull()) return false;
    this.enrolledStudents.push(studentId);
    return true;
  }

  // TODO 2.4 — Withdraw a student. Return false if the student is not enrolled.
  withdraw(studentId: string): boolean {
    const index = this.enrolledStudents.indexOf(studentId);
    if (index === -1) return false;
    this.enrolledStudents.splice(index, 1);
    return true;
  }

  closeRegistration(): void {
    this.registrationOpen = false;
  }

  // TODO 2.5 — Two read-only queries.
  isFull(): boolean {
    return this.enrolledStudents.length >= this.capacity;
  }

  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }

  // TODO 2.6 — Return the enrolled students, without giving the caller
  // a way to modify the internal array. (Returning `this.enrolledStudents` is not enough:
  // the check below explains why.)
  getStudents(): readonly string[] {
    return [...this.enrolledStudents];
  }
}

// After TODO 2.1, uncomment these lines. Each assignment must be underlined in red.
// Then run the file with the lines still uncommented. What happens, and why?
// Comment them again before continuing.
//
// const test = new Course("CS201", 30);
// test.code = "HACKED";
// test.capacity = -100;
// test.enrolledStudents.push("Intruder");
// test.registrationOpen = true;

// ---------------------------------------------------------------
// Checks — do not modify below this line
// ---------------------------------------------------------------

let passed = 0;
let total = 0;

function check(label: string, test: () => boolean): void {
  total++;
  try {
    if (test()) {
      passed++;
      console.log(`PASS  ${label}`);
    } else {
      console.log(`FAIL  ${label}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message === "TODO" ? `TODO  ${label}` : `ERROR ${label} (${message})`);
  }
}

function throws(action: () => unknown): boolean {
  try {
    action();
    return false;
  } catch (error) {
    return !(error instanceof Error && error.message === "TODO");
  }
}

check("2.2 capacity 0 is rejected", () => throws(() => new Course("CS201", 0)));
check("2.2 a negative capacity is rejected", () => throws(() => new Course("CS201", -5)));
check("2.2 a fractional capacity is rejected", () => throws(() => new Course("CS201", 2.5)));
check("2.2 a valid capacity is accepted", () => !throws(() => new Course("CS201", 30)));

check("2.3 a student can enroll", () => new Course("CS201", 30).enroll("DAUST-0001") === true);
check("2.3 no duplicate enrollment", () => {
  const course = new Course("CS201", 30);
  course.enroll("DAUST-0001");
  return course.enroll("DAUST-0001") === false;
});
check("2.3 capacity is respected", () => {
  const course = new Course("CS201", 2);
  course.enroll("DAUST-0001");
  course.enroll("DAUST-0002");
  return course.enroll("DAUST-0003") === false;
});
check("2.3 a closed course refuses students", () => {
  const course = new Course("CS201", 30);
  course.closeRegistration();
  return course.enroll("DAUST-0001") === false;
});

check("2.4 an enrolled student can withdraw", () => {
  const course = new Course("CS201", 30);
  course.enroll("DAUST-0001");
  return course.withdraw("DAUST-0001") === true && course.getEnrollmentCount() === 0;
});
check("2.4 a student who is not enrolled cannot withdraw", () =>
  new Course("CS201", 30).withdraw("DAUST-0001") === false);

check("2.5 enrollment count", () => {
  const course = new Course("CS201", 30);
  course.enroll("DAUST-0001");
  course.enroll("DAUST-0002");
  return course.getEnrollmentCount() === 2;
});
check("2.5 isFull", () => {
  const course = new Course("CS201", 1);
  const before = course.isFull();
  course.enroll("DAUST-0001");
  return before === false && course.isFull() === true;
});

check("2.6 getStudents returns the enrolled students", () => {
  const course = new Course("CS201", 30);
  course.enroll("DAUST-0001");
  course.enroll("DAUST-0002");
  return course.getStudents().join(",") === "DAUST-0001,DAUST-0002";
});
check("2.6 the caller cannot modify the internal list", () => {
  const course = new Course("CS201", 30);
  course.enroll("DAUST-0001");
  const list = course.getStudents() as string[];   // a cast removes `readonly`...
  list.push("Intruder");                           // ...so only a copy protects the course
  return course.getEnrollmentCount() === 1;
});

console.log(`\n${passed} / ${total} checks passed`);
