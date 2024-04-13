export class LambdaError extends Error {
  public statusCode: number;

  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const wrapWithErrorHandling = async (
  fn: () => Promise<{
    statusCode: number;
    body: string;
  }>,
) => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (error instanceof LambdaError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }

    console.error({ error });

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
