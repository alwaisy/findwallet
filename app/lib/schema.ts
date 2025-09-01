import { z } from "zod";

// Essence enum
export const EssenceEnum = z.enum([
  "wallet", // Digital wallets (JazzCash, SadaPay, NayaPay)
  "banking", // Banking platforms (UBL Omni, Meezan Bank, Faysal Bank)
  "service", // International money transfer (Wise, Payoneer, Western Union)
]);
export type Essence = z.infer<typeof EssenceEnum>;

// Platform basic information schema
const PlatformSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  slug: z.string().min(1, "Platform slug is required"),
  founded: z.number().int().positive("Founded year must be a positive integer"),
  headquarters: z.string().min(1, "Headquarters location is required"),
  website: z.string().url("Website must be a valid URL"),
  logo: z.string().min(1, "Logo path is required"),
  playstore_url: z
    .string()
    .url("Play Store URL must be a valid URL")
    .nullable()
    .optional(),
  appstore_url: z
    .string()
    .url("App Store URL must be a valid URL")
    .nullable()
    .optional(),
  trustpilot_url: z
    .string()
    .url("Trustpilot URL must be a valid URL")
    .nullable()
    .optional(),
  user_base: z.string().min(1, "User base information is required"),
  primary_use: z.string().min(1, "Primary use description is required"),
  essence: EssenceEnum,
  international_support: z.boolean(),
  onlyInternational: z.boolean(),
});

// International support schema (normalized)
const InternationalMethodDetailSchema = z.object({
  methods: z.array(z.string()).optional(),
  infrastructure: z
    .enum(["in-house", "third-party", "hybrid", "none", "not available"]) // accept LLM phrasing
    .optional(),
  partners: z.array(z.string()).optional(),
  technical_details: z.array(z.string()).optional(),
});

const InternationalSchema = z.object({
  receive_money: z
    .union([z.string(), InternationalMethodDetailSchema])
    .optional(),
  send_money: z.union([z.string(), InternationalMethodDetailSchema]).optional(),
  supported_currencies: z.array(z.string()).optional(),
  transfer_methods: z.array(z.string()).optional(),
  limits: z.string().optional(),
});

// SEO schema
const SEOSchema = z.object({
  seoMetaTitle: z.string().min(1, "SEO meta title is required"),
  seoMetaDescription: z.string().min(1, "SEO meta description is required"),
});

// Sources schema
const SourcesSchema = z.array(z.string().url("Source URL must be valid"));

// Content schema (site schema)
const ContentSchema = z.object({
  about: z.string().min(1, "About description is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  international: InternationalSchema,
  important_notes: z
    .array(z.string())
    .min(1, "At least one important note is required"),
  reviews: z
    .array(
      z.object({
        name: z.string().min(1, "Review source name is required"),
        link: z.string().url("Review URL must be valid"),
      })
    )
    .optional(),
  further_reading: z
    .array(
      z.object({
        name: z.string().min(1, "Further reading name is required"),
        link: z.string().url("Further reading URL must be valid"),
      })
    )
    .optional(),
});

// LLM response schema (omits slug and logo from platform, and excludes reviews/further_reading from content)
const LLMPlatformSchema = PlatformSchema.omit({ slug: true, logo: true });
const LLMContentSchema = ContentSchema.omit({
  reviews: true,
  further_reading: true,
});
export const LLMWalletPlatformSchema = z.object({
  platform: LLMPlatformSchema,
  content: LLMContentSchema,
  seo: SEOSchema,
  sources: SourcesSchema,
});

// Main wallet platform schema
export const WalletPlatformSchema = z.object({
  platform: PlatformSchema,
  content: ContentSchema,
  seo: SEOSchema,
  sources: SourcesSchema,
});

// Type exports
export type WalletPlatform = z.infer<typeof WalletPlatformSchema>;
export type LLMWalletPlatform = z.infer<typeof LLMWalletPlatformSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type International = z.infer<typeof InternationalSchema>;
export type SEO = z.infer<typeof SEOSchema>;
export type Sources = z.infer<typeof SourcesSchema>;

// Validation helper function
export function validateWalletPlatform(data: unknown): WalletPlatform {
  return WalletPlatformSchema.parse(data);
}

// Partial schema for updates
export const PartialWalletPlatformSchema = WalletPlatformSchema.partial();
export type PartialWalletPlatform = z.infer<typeof PartialWalletPlatformSchema>;
