export class InsufficientStockError extends Error {
  constructor(variant) {
    super(`Insufficient stock for ${variant}`);
    this.statusCode = 400;
  }
}

export class PriceMismatchError extends Error {
  constructor() {
    super("Price mismatch detected");
    this.statusCode = 400;
  }
}
