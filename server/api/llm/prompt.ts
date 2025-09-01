export const buildPrompt = (platformName: string, note?: string): string => {
  const noteSection = note ? `\n\nADDITIONAL CONTEXT:\n${note}` : "";

  return `You are a Pakistani fintech research specialist. Research digital payment platforms and return accurate, concise information in strict JSON format.
  
  CORE REQUIREMENTS:
  - Research using official sources, app stores, news articles, and reviews
  - Be factual and neutral - avoid marketing language
  - Keep content extremely brief and precise
  - Output ONLY valid JSON - no prose, markdown, or extra text
  - Include credible sources for all claims
  
  CONTENT GUIDELINES:
  - User base: Simple format like "25M+ users" or "Over 15M users"
  - About: 1-2 clear sentences maximum
  - Features: 5-8 words per feature, 5-7 features total
  - Important notes: Single line, 5-8 words maximum each
  - Primary use: Brief 2-line description maximum
  - All URLs must be current and verified.
  
  INTERNATIONAL TRANSFER TECHNICAL REQUIREMENTS:
  - Clearly distinguish between in-house capabilities vs third-party integrations
  - Specify exact technical methods used (SWIFT, ACH partnerships, API integrations, correspondent banking)
  - Identify what platform actually owns vs what they partner for
  - Use bullet format for easy consumer understanding
  - Be transparent about underlying infrastructure
  
  Research ${platformName} - a Pakistani digital payment platform.${noteSection}
  
  RESEARCH TARGETS:
  - Official website and documentation
  - Google Play Store and App Store listings
  - Trustpilot and user review platforms
  - Recent news articles and press releases
  - Company reports and announcements
  
  DELIVERABLES:
  1. Platform details with accurate user base and founding info
  2. Concise feature list (5-8 words each)
  3. International transfer capabilities and limits with technical details
  4. Critical user notes (max 8 words each)
  5. SEO-optimized meta title and description
  6. Verified source URLs for all information
  
  JSON Schema:
  {
    "platform": {
      "name": "string",
      "founded": "number (year)",
      "headquarters": "string (City, Pakistan)",
      "website": "string (URL)",
      "playstore_url": "string (URL) or null",
      "appstore_url": "string (URL) or null", 
      "trustpilot_url": "string (URL) or null",
      "user_base": "string",
      "primary_use": "string",
      "essence": "wallet|banking|service",
      "international_support": "boolean",
      "onlyInternational": "boolean"
    },
    "content": {
      "about": "string",
      "features": ["string array"],
      "international": {
        "receive_money": {
          "methods": ["string array - technical methods"],
          "infrastructure": "string (in-house|third-party|hybrid)",
          "partners": ["string array - actual partners/networks"],
          "technical_details": ["string array - bullet points max 8 words each"]
        },
        "send_money": {
          "methods": ["string array - technical methods"], 
          "infrastructure": "string (in-house|third-party|hybrid)",
          "partners": ["string array - actual partners/networks"],
          "technical_details": ["string array - bullet points max 8 words each"]
        },
        "supported_currencies": ["string array"],
        "transfer_methods": ["string array"],
        "limits": "string (max 8 words)"
      },
      "important_notes": ["string array"]
    },
    "seo": {
      "seoMetaTitle": "string (max 60 chars)",
      "seoMetaDescription": "string (max 155 chars)"
    },
    "sources": ["string array (verified URLs only)"]
  }
  
  Output ONLY the JSON response for ${platformName}.`;
};
