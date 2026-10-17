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
    if (!Number.isInteger(amount)) return false;
    if (amount <= 0) return false;
    if (this.credits + amount > this.getCreditLimit()) return false;
    this.credits += amount;
    return true;
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

  protected override getCreditLimit(): number {
    return 12;
  }

  override describe(): string {
    return `${super.describe()}, advisor: ${this.advisor}`;
  }
}

const awa = new Student("Awa", "S-001");
const fatou = new GraduateStudent("Fatou", "G-001", "Dr. Diop");

console.log(awa.addCredits(18), fatou.addCredits(9), fatou.addCredits(6));
console.log(awa.describe());
console.log(fatou.describe());
console.log(awa.addCredits(2.5), fatou.addCredits(2.5));   // false false

const everyone: Student[] = [awa, fatou];

for (const student of everyone) {
  console.log(student.describe());
}
