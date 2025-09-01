import { queryCollection } from "#imports";
import type { WalletPlatform } from "~/lib/schema";

// Fetch all wallets from @nuxt/content (wallets collection)
export async function fetchWallets(): Promise<WalletPlatform[]> {
  try {
    const items = await queryCollection("wallets").all();
    // Filter out null/undefined entries and validate structure
    return (items as WalletPlatform[]).filter((item): item is WalletPlatform =>
      Boolean(
        item &&
          typeof item === "object" &&
          "platform" in item &&
          item.platform &&
          typeof item.platform === "object" &&
          "slug" in item.platform &&
          item.platform.slug
      )
    );
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
  }
}

// Fetch wallets by essence (wallet, banking, service)
export async function fetchWalletsByEssence(
  essence: string
): Promise<WalletPlatform[]> {
  try {
    const items = await queryCollection("wallets").all();
    return (items as WalletPlatform[]).filter((item): item is WalletPlatform =>
      Boolean(
        item &&
          typeof item === "object" &&
          "platform" in item &&
          item.platform &&
          typeof item.platform === "object" &&
          "slug" in item.platform &&
          item.platform.slug &&
          item.platform.essence === essence
      )
    );
  } catch (error) {
    console.error("Error fetching wallets by essence:", error);
    return [];
  }
}

// Fetch wallets with international support
export async function fetchInternationalWallets(): Promise<WalletPlatform[]> {
  try {
    const items = await queryCollection("wallets").all();
    return (items as WalletPlatform[]).filter((item): item is WalletPlatform =>
      Boolean(
        item &&
          typeof item === "object" &&
          "platform" in item &&
          item.platform &&
          typeof item.platform === "object" &&
          "slug" in item.platform &&
          item.platform.slug &&
          item.platform.international_support === true
      )
    );
  } catch (error) {
    console.error("Error fetching international wallets:", error);
    return [];
  }
}
