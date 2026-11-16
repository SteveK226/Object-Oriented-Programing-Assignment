class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }

  includes(item: T): boolean {
    return this.items.includes(item);
  }
}

class Book {
  private title: string;
  private borrower: string | undefined;
  private reservations = new Queue<string>();

  constructor(title: string) {
    this.title = title;
  }

  borrow(member: string): boolean {
    if (this.borrower === member || this.reservations.includes(member)) return false;

    if (this.borrower === undefined) {
      this.borrower = member;
      return true;
    }

    this.reservations.enqueue(member);
    return false;
  }

  giveBack(): boolean {
    if (this.borrower === undefined) return false;

    this.borrower = this.reservations.dequeue();
    return true;
  }

  getBorrower(): string | undefined {
    return this.borrower;
  }

  waiting(): number {
    return this.reservations.size();
  }
}

const numberQueue = new Queue<number>();
numberQueue.enqueue(10);
numberQueue.enqueue(20);
console.log(numberQueue.includes(20), numberQueue.includes(30));

const book = new Book("So Long a Letter");
console.log(book.borrow("Awa"), book.borrow("Moussa"), book.borrow("Fatou"));
console.log(book.getBorrower(), book.waiting());
console.log(book.borrow("Moussa"), book.waiting());
console.log(book.giveBack(), book.getBorrower(), book.waiting());
console.log(book.giveBack(), book.giveBack(), book.giveBack(), book.getBorrower());


/*
```mermaid
classDiagram
  class Book {
    -string title
    -string borrower
    -Queue~string~ reservations
    +borrow(member: string) boolean
    +giveBack() boolean
    +getBorrower() string | undefined
    +waiting() number
  }
  class Queue~T~ {
    -T[] items
    +enqueue(item: T) void
    +dequeue() T | undefined
    +size() number
    +includes(item: T) boolean
  }
  Book "1" *-- "1" Queue~string~ : reservations
``` 
*/
