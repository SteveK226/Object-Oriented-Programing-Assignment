class StudentList {
  private students: string[] = [];

  add(student: string): void {
    this.students.push(student);
  }

  contains(student: string): boolean {
    return this.students.includes(student);
  }

  count(): number {
    return this.students.length;
  }

  clear(): void {
    this.students = [];
  }
}

class Course {
  private students = new StudentList();

  enroll(student: string): boolean {
    if (this.students.contains(student) || this.students.count() >= 3) return false;
    this.students.add(student);
    return true;
  }

  getEnrollmentCount(): number {
    return this.students.count();
  }
}

const oop = new Course();
console.log(oop.enroll("Awa"), oop.enroll("Mamadou"), oop.enroll("Fatou"), oop.enroll("Ibrahima"));
console.log(oop.getEnrollmentCount());
