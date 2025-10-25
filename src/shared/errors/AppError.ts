class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message); // Chama o construtor da classe Error
    this.statusCode = statusCode;
    this.name = 'AppError'; // Define o nome do erro

    // 👇 Essencial para TypeScript e herança correta
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
