export default defineEventHandler(async (_event) => {
  return {
    message: "LLM API is working!",
    timestamp: new Date().toISOString(),
    endpoints: {
      wallet: "/api/llm/wallet (POST)",
      test: "/api/llm/test (GET)",
    },
    usage: {
      method: "POST",
      url: "/api/llm/wallet",
      body: {
        platformName: "JazzCash",
      },
    },
  };
});
