import { defineCollection, defineContentConfig } from "@nuxt/content";
import { WalletPlatformSchema } from "./app/lib/schema";

export default defineContentConfig({
  collections: {
    wallets: defineCollection({
      type: "page",
      source: {
        include: "wallets/*.json",
      },
      schema: WalletPlatformSchema,
    }),
  },
});
