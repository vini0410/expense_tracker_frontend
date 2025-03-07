export class Expense {
  id?: string;
  description: string;
  amount: string;
  category: string;
  userId: string;

  constructor(
    id: string,
    description: string,
    amount: string,
    category: string,
    userId: string
  ) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.userId = userId;
  }
}
