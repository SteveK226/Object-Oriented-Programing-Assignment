// Exercise 1 — Types
//
// Run:  node ex1_types.ts
//
// Complete each TODO. Where you see `throw new Error("TODO");`,
// replace that line with your implementation.

// TODO 1.1 — A student status is exactly one of: "active", "suspended", "graduated".
// Replace `string` with a union of literal types.
type StudentStatus = "active" | "suspended" | "graduated";

// After TODO 1.1, uncomment the next line. The editor must underline it in red.
// const invalid: StudentStatus = "unknown";

// TODO 1.2 — Return true only for an active student.
function canEnroll(status: StudentStatus): boolean {
  return status === "active";
}

// TODO 1.3 — Format a number of credits.
//   formatCredits(15)          → "15 credits"
//   formatCredits(3, "hours")  → "3 hours"
// `unit` is optional. What is its type inside the function? Handle the missing case.
function formatCredits(amount: number, unit?: string): string {
  if (unit === undefined) {
    return amount + " credits";
  }
  return amount + " " + unit;
}

// TODO 1.4 — Normalize a student ID, which can arrive as a number or as text.
//   parseStudentId(42)             → "DAUST-0042"   (numbers: prefix + 4 digits)
//   parseStudentId("  daust-0007 ") → "DAUST-0007"   (text: trimmed, upper case)
// Use `typeof` to narrow the type.
function parseStudentId(input: string | number): string {
  if (typeof input === "number") {
    return "DAUST-" + String(input).padStart(4, "0");
  }
  return input.trim().toUpperCase();
}

// TODO 1.5 — Look up a student ID in a list.
//   lookupMessage(["DAUST-0001", "DAUST-0042"], "DAUST-0042") → "Found DAUST-0042"
//   lookupMessage(["DAUST-0001"], "DAUST-9999")               → "No student with id DAUST-9999"
// Use `ids.find(...)`. Hover over its result: what is the type, and why?
function lookupMessage(ids: string[], id: string): string {
  const found = ids.find((x) => x === id);
  if (found === undefined) {
    return "No student with id " + id;
  }
  return "Found " + found;
}

// TODO 1.6 — This function runs, but its types say nothing.
// a) Replace both `any` with precise types.
// b) average([]) currently returns NaN. Change the return type to `number | undefined`
//    and return `undefined` for an empty list.
function average(values: number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }
  let sum = 0;
  for (const value of values) {
    sum += value;
  }
  return sum / values.length;
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

check("1.2 an active student can enroll", () => canEnroll("active") === true);
check("1.2 a suspended student cannot enroll", () => canEnroll("suspended") === false);
check("1.2 a graduated student cannot enroll", () => canEnroll("graduated") === false);
check("1.3 default unit", () => formatCredits(15) === "15 credits");
check("1.3 custom unit", () => formatCredits(3, "hours") === "3 hours");
check("1.4 a number is padded", () => parseStudentId(42) === "DAUST-0042");
check("1.4 text is normalized", () => parseStudentId("  daust-0007 ") === "DAUST-0007");
check("1.5 an existing ID is found", () =>
  lookupMessage(["DAUST-0001", "DAUST-0042"], "DAUST-0042") === "Found DAUST-0042");
check("1.5 a missing ID is reported", () =>
  lookupMessage(["DAUST-0001"], "DAUST-9999") === "No student with id DAUST-9999");
check("1.6 average of a list", () => average([10, 20]) === 15);
check("1.6 average of an empty list", () => average([]) === undefined);

console.log(`\n${passed} / ${total} checks passed`);
