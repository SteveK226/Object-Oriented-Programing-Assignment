class Book {
  private title: string;
  private borrowed = false;

  constructor(title: string) {
    this.title = title;
  }

  borrow(): boolean {
    if (this.borrowed) {
      return false;
    }
    this.borrowed = true;
    return true;
  }

  giveBack(): boolean {
    if (!this.borrowed) {
      return false;
    }
    this.borrowed = false;
    return true;
  }

  isAvailable(): boolean {
    return !this.borrowed;
  }

  getTitle(): string {
    return this.title;
  }
}

const book = new Book("Clean Code");
console.log(book.borrow());   // true
console.log(book.borrow());   // false
console.log(book.giveBack()); // true
console.log(book.giveBack()); // false
console.log(book.getTitle(), book.isAvailable());
