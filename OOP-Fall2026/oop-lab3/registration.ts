class Course {
  private capacity: number;
  private enrolledStudents: string[] = [];
  private registrationOpen = true;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  enroll(student: string): boolean {
    if (!this.registrationOpen) return false;
    if (this.enrolledStudents.includes(student)) return false;
    if (this.enrolledStudents.length >= this.capacity) return false;
    this.enrolledStudents.push(student);
    return true;
  }

  closeRegistration(): void {
    this.registrationOpen = false;
  }

  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }
}

class AlwaysOpenCourse extends Course {
  override closeRegistration(): void {
  }
}

class LabCourse extends Course {
  private trainedStudents: string[] = [];

  recordSafetyTraining(student: string): void {
    if (!this.trainedStudents.includes(student)) {
      this.trainedStudents.push(student);
    }
  }

  override enroll(student: string): boolean {
    if (!this.trainedStudents.includes(student)) return false;
    return super.enroll(student);
  }
}

function endRegistrationPeriod(courses: Course[]): void {
  for (const course of courses) {
    course.closeRegistration();
  }
}

const oop = new Course(30);
const seminar = new AlwaysOpenCourse(30);

endRegistrationPeriod([oop, seminar]);

console.log(oop.enroll("Late Student"));
console.log(seminar.enroll("Late Student"));

const physicsLab = new LabCourse(2);

console.log(physicsLab.enroll("Awa"));       // untrained
physicsLab.recordSafetyTraining("Awa");
physicsLab.recordSafetyTraining("Mamadou");
physicsLab.recordSafetyTraining("Fatou");
console.log(physicsLab.enroll("Awa"));
console.log(physicsLab.enroll("Awa"));       // duplicate
console.log(physicsLab.enroll("Mamadou"));
console.log(physicsLab.enroll("Fatou"));     // course full
