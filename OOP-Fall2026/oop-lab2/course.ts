class Course {
  private capacity = 30;
  private enrolledStudents: string[] = [];
  private registrationOpen = true;

  enroll(student: string): boolean {
    if (!this.registrationOpen) {
      return false;
    }
    if (this.enrolledStudents.includes(student)) {
      return false;
    }
    if (this.enrolledStudents.length >= this.capacity) {
      return false;
    }
    this.enrolledStudents.push(student);
    return true;
  }

  closeRegistration(): void {
    this.registrationOpen = false;
  }

  withdraw(student: string): boolean {
    const pos = this.enrolledStudents.indexOf(student);
    if (pos < 0) {
      return false;
    }
    this.enrolledStudents.splice(pos, 1);
    return true;
  }

  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }
}

// Part 5 — the registration page, Tell version
function registerStudent(course: Course, student: string): void {
  course.enroll(student);
}

const oop = new Course();
const databases = new Course();

oop.enroll("Awa");
oop.enroll("Mamadou");
databases.enroll("Fatou");

console.log(oop.getEnrollmentCount());        // 2
console.log(databases.getEnrollmentCount());  // 1

console.log(oop.enroll("Awa"));   // false — already enrolled

registerStudent(oop, "Ibrahima");
console.log(oop.getEnrollmentCount());        // 3

oop.closeRegistration();
console.log(oop.enroll("Ousmane"));   // false

console.log(oop.withdraw("Mamadou"));  // true
console.log(oop.withdraw("Mamadou"));  // false — already withdrawn
console.log(oop.getEnrollmentCount());        // 2
