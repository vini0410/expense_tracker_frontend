export class Expense {
  id: string | null;
  description: string;
  amount: string;
  category: string;
  userId: string;

  constructor(
    id: string | null,
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
