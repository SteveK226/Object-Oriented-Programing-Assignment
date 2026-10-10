// Exercise 4 — Inheritance
//
// Run:  node ex4_inheritance.ts
//
// Do not modify the Student class.

class Student {
  private name: string;
  private id: string;
  private credits = 0;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  protected getCreditLimit(): number {
    return 21;
  }

  addCredits(amount: number): boolean {
    if (!Number.isInteger(amount) || amount <= 0) return false;
    if (this.credits + amount > this.getCreditLimit()) return false;
    this.credits += amount;
    return true;
  }

  getCredits(): number {
    return this.credits;
  }

  describe(): string {
    return `${this.name} (${this.id}): ${this.credits} credits`;
  }
}

class GraduateStudent extends Student {
  private advisor: string;

  constructor(name: string, id: string, advisor: string) {
    super(name, id);
    this.advisor = advisor;
  }

  // TODO 4.1 — Graduate students may take at most 12 credits.
  // Override the one method that decides the limit. Do not copy addCredits().

  // TODO 4.2 — Override describe(). Reuse the parent's description with super.describe(),
  // then append ", advisor: <advisor>".
  // First, try writing `this.name` inside describe() and read the compiler error.
  // Do not change Student to fix it.
  protected override getCreditLimit(): number {
    return 12;
  }

  override describe(): string {
    return super.describe() + ", advisor: " + this.advisor;
  }
}

// TODO 4.3 — Bug hunt. Visiting students may take at most 6 credits,
// but the check "4.3" fails. Add the `override` keyword to the method below,
// read the compiler message, and fix the bug.
class VisitingStudent extends Student {
  protected override getCreditLimit(): number {
    return 6;
  }
}

// TODO 4.4 — The description of every student, in order.
function summarize(students: Student[]): string[] {
  return students.map((s) => s.describe());
}

// TODO 4.5 — The total number of credits of all students.
function totalCredits(students: Student[]): number {
  let total = 0;
  for (const s of students) {
    total += s.getCredits();
  }
  return total;
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

check("4.1 an undergraduate may take 21 credits", () => {
  const awa = new Student("Awa", "S-001");
  return awa.addCredits(18) && awa.addCredits(3);
});
check("4.1 a graduate student may not exceed 12 credits", () => {
  const fatou = new GraduateStudent("Fatou", "G-001", "Dr. Diop");
  return fatou.addCredits(9) === true && fatou.addCredits(6) === false;
});
check("4.1 the whole-number rule still applies to graduate students", () =>
  new GraduateStudent("Fatou", "G-001", "Dr. Diop").addCredits(2.5) === false);
check("4.2 a graduate student's description", () => {
  const fatou = new GraduateStudent("Fatou", "G-001", "Dr. Diop");
  fatou.addCredits(9);
  return fatou.describe() === "Fatou (G-001): 9 credits, advisor: Dr. Diop";
});
check("4.3 a visiting student may not exceed 6 credits", () => {
  const ibrahima = new VisitingStudent("Ibrahima", "V-001");
  return ibrahima.addCredits(6) === true && ibrahima.addCredits(1) === false;
});

const group: Student[] = [
  new Student("Awa", "S-001"),
  new GraduateStudent("Fatou", "G-001", "Dr. Diop"),
];
group[0].addCredits(15);
group[1].addCredits(9);

check("4.4 summarize a mixed group", () =>
  summarize(group).join(" | ") ===
    "Awa (S-001): 15 credits | Fatou (G-001): 9 credits, advisor: Dr. Diop");
check("4.5 total credits of a mixed group", () => totalCredits(group) === 24);

console.log(`\n${passed} / ${total} checks passed`);
