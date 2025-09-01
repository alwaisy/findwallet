import { mkdir, writeFile } from "fs/promises";
import { createError, defineEventHandler, readBody } from "h3";
import { join } from "path";
import type { WalletPlatform } from "~/lib/schema";
import { LLMWalletPlatformSchema } from "~/lib/schema";

interface RequestBody {
  walletName: string;
  logoPath: string;
  slug: string;
  note?: string;
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as RequestBody;
  const { walletName, logoPath, slug, note } = body;

  // Validate required parameters
  if (!walletName || !logoPath || !slug) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Missing required parameters: walletName, logoPath, and slug are required",
    });
  }

  try {
    // Call the LLM API to get wallet data
    const llmResponse = await $fetch("/api/llm/wallet", {
      method: "POST",
      body: {
        platformName: walletName,
        ...(note ? { note } : {}),
      },
    });

    // Validate the LLM response against our schema
    const validationResult = LLMWalletPlatformSchema.safeParse(llmResponse);
    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.errors);
      return {
        error: true,
        message: "LLM response validation failed",
        validationErrors: validationResult.error.errors,
        receivedData: llmResponse,
      };
    }

    // Append the logo path and ensure slug is correct
    const finalWalletData: WalletPlatform = {
      ...validationResult.data,
      platform: {
        ...validationResult.data.platform,
        logo: logoPath,
        slug: slug,
      },
    };

    // Ensure the wallets directory exists
    const walletsDir = join(process.cwd(), "content", "wallets");
    await mkdir(walletsDir, { recursive: true });

    // Create the JSON file
    const filePath = join(walletsDir, `${slug}.json`);
    const jsonContent = JSON.stringify(finalWalletData, null, 2);

    await writeFile(filePath, jsonContent, "utf-8");

    return {
      success: true,
      message: `Wallet data created successfully for ${walletName}`,
      filePath: `content/wallets/${slug}.json`,
      data: finalWalletData,
    };
  } catch (error: unknown) {
    const errorObj = error as { status?: number; message?: string };

    throw createError({
      statusCode: errorObj?.status || 500,
      statusMessage: errorObj?.message || "Failed to create wallet data",
    });
  }
});
