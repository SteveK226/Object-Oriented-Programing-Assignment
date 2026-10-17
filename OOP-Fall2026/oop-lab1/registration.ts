let courseNames: string[] = [];
let capacities: number[] = [];
let enrolledStudents: string[][] = [];
let registrationOpen: boolean[] = [];

function addCourse(name: string, capacity: number): void {
  courseNames.push(name);
  capacities.push(capacity);
  enrolledStudents.push([]);
  registrationOpen.push(true);
}

function enroll(courseIndex: number, student: string): void {
  if (!registrationOpen[courseIndex]) {
    return;
  }
  if (enrolledStudents[courseIndex].length >= capacities[courseIndex]) {
    return;
  }
  enrolledStudents[courseIndex].push(student);
}

function printCourse(courseIndex: number): void {
  console.log(
    courseNames[courseIndex] + ":",
    enrolledStudents[courseIndex],
    "capacity " + capacities[courseIndex]
  );
}

function importEnrollment(courseIndex: number, student: string): void {
  if (!registrationOpen[courseIndex]) {
    return;
  }
  enrolledStudents[courseIndex].push(student);
}


function transferStudent(student: string, fromCourse: number, toCourse: number): void {
  if (!registrationOpen[toCourse]) {
    return;
  }
  const list = enrolledStudents[fromCourse];
  const pos = list.indexOf(student);
  if (pos >= 0) {
    list.splice(pos, 1);
    enrolledStudents[toCourse].push(student);
  }
}

function withdraw(courseIndex: number, student: string): void {
  const list = enrolledStudents[courseIndex];
  const pos = list.indexOf(student);
  if (pos >= 0) {
    list.splice(pos, 1);
  }
}

function closeRegistration(courseIndex: number): void {
  registrationOpen[courseIndex] = false;
}

addCourse("Object-Oriented Programming", 30);
addCourse("Databases", 40);

enroll(0, "Awa");
enroll(0, "Mamadou");
enroll(1, "Fatou");

printCourse(0);
printCourse(1);

closeRegistration(0);
enroll(0, "Ousmane");
printCourse(0);        // Ousmane must not appear
