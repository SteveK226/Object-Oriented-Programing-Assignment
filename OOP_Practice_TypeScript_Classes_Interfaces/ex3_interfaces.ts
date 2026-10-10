// Exercise 3 — Interfaces
//
// Run:  node ex3_interfaces.ts

// TODO 3.1 — Anything that can describe itself has a method `describe(): string`.
interface Describable {
  describe(): string;
}

// TODO 3.2 — Something students can register for is Describable, and also has:
//   enroll(studentId: string): boolean
//   getEnrollmentCount(): number
// Use `extends` to build on Describable instead of repeating describe().
interface Registrable extends Describable {
  enroll(studentId: string): boolean;
  getEnrollmentCount(): number;
}

// TODO 3.3 — Declare that Course implements Registrable.
class Course implements Registrable {
  readonly code: string;
  private capacity: number;
  private enrolledStudents: string[] = [];

  constructor(code: string, capacity: number) {
    this.code = code;
    this.capacity = capacity;
  }

  enroll(studentId: string): boolean {
    if (this.enrolledStudents.includes(studentId)) return false;
    if (this.enrolledStudents.length >= this.capacity) return false;
    this.enrolledStudents.push(studentId);
    return true;
  }

  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }

  describe(): string {
    return `${this.code}: ${this.enrolledStudents.length}/${this.capacity} students`;
  }
}

// TODO 3.3 — Declare that Workshop implements Registrable too.
// Workshop and Course are unrelated classes: neither extends the other.
class Workshop implements Registrable {
  readonly title: string;
  private participants: string[] = [];
  private cancelled = false;

  constructor(title: string) {
    this.title = title;
  }

  enroll(studentId: string): boolean {
    if (this.cancelled) return false;
    if (this.participants.includes(studentId)) return false;
    this.participants.push(studentId);
    return true;
  }

  cancel(): void {
    this.cancelled = true;
  }

  getEnrollmentCount(): number {
    return this.cancelled ? 0 : this.participants.length;
  }

  // TODO 3.4 — Once Workshop implements Registrable, the compiler reports a missing member.
  // Add it. Format:
  //   "Workshop Git Basics: 2 participants"
  //   "Workshop Git Basics: cancelled"
  describe(): string {
    if (this.cancelled) {
      return `Workshop ${this.title}: cancelled`;
    }
    return `Workshop ${this.title}: ${this.participants.length} participants`;
  }
}

// TODO 3.5 — Total number of students across any registrable items.
function totalEnrollment(items: Registrable[]): number {
  let total = 0;
  for (const item of items) {
    total += item.getEnrollmentCount();
  }
  return total;
}

// TODO 3.6 — The description of each item, in order.
function describeAll(items: Describable[]): string[] {
  return items.map((item) => item.describe());
}

// TODO 3.7 — Course information. `room` is optional: add it to the interface.
//   { code: "CS201", title: "Object-Oriented Programming", room: "B12" }
//     → "CS201 — Object-Oriented Programming (Room B12)"
//   { code: "CS202", title: "Web Development" }
//     → "CS202 — Web Development (Room TBA)"
interface CourseInfo {
  code: string;
  title: string;
  room?: string;
}

function formatInfo(info: CourseInfo): string {
  const room = info.room ?? "TBA";
  return `${info.code} — ${info.title} (Room ${room})`;
}

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

const oop = new Course("CS201", 30);
oop.enroll("DAUST-0001");

const git = new Workshop("Git Basics");
git.enroll("DAUST-0001");
git.enroll("DAUST-0002");

const cancelledWorkshop = new Workshop("Docker");
cancelledWorkshop.enroll("DAUST-0003");
cancelledWorkshop.cancel();

// Not a class instance: an object literal with the right shape.
const externalEvent = {
  enroll: (studentId: string) => true,
  getEnrollmentCount: () => 5,
  describe: () => "External event: 5 participants",
};

check("3.4 a workshop describes itself", () =>
  describeAll([git])[0] === "Workshop Git Basics: 2 participants");
check("3.4 a cancelled workshop says so", () =>
  describeAll([cancelledWorkshop])[0] === "Workshop Docker: cancelled");
check("3.5 total across a course and a workshop", () => totalEnrollment([oop, git]) === 3);
check("3.5 any object with the right shape counts", () =>
  totalEnrollment([oop, externalEvent]) === 6);
check("3.6 descriptions of different classes", () =>
  describeAll([oop, git]).join(" | ") === "CS201: 1/30 students | Workshop Git Basics: 2 participants");

const withRoom = { code: "CS201", title: "Object-Oriented Programming", room: "B12" };
const withoutRoom = { code: "CS202", title: "Web Development" };

check("3.7 with a room", () => formatInfo(withRoom) === "CS201 — Object-Oriented Programming (Room B12)");
check("3.7 without a room", () => formatInfo(withoutRoom) === "CS202 — Web Development (Room TBA)");

console.log(`\n${passed} / ${total} checks passed`);
