import type { WalletPlatform } from "../schema";

export const mockWallets: WalletPlatform[] = [
  {
    platform: {
      name: "JazzCash",
      slug: "jazzcash",
      founded: 2012,
      headquarters: "Islamabad, Pakistan",
      website: "https://www.jazzcash.com.pk",
      logo: "/wallets/jazzcash.jpeg",
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.jazzcash.jazzcash",
      appstore_url: "https://apps.apple.com/pk/app/jazzcash/id1234567890",
      trustpilot_url: "https://www.trustpilot.com/review/jazzcash.com.pk",
      user_base: "Over 15 million registered users",
      primary_use:
        "Digital payments, money transfers, bill payments, and mobile banking",
      essence: "wallet",
      international_support: true,
      onlyInternational: false,
    },
    content: {
      about:
        "JazzCash is Pakistan's leading digital financial services platform, offering a comprehensive suite of payment solutions. Launched by Jazz (formerly Mobilink), it has become the most trusted digital wallet in Pakistan, serving millions of users across the country.",
      features: [
        "Instant money transfers to any mobile number",
        "Bill payments for utilities, mobile, and internet",
        "Online shopping and e-commerce payments",
        "ATM withdrawals without card",
        "International remittances",
        "Digital savings account",
        "Insurance and investment products",
        "Business payment solutions",
        "Government tax payments",
      ],
      international: {
        receive_money:
          "Receive international remittances from over 50 countries including UAE, USA, UK, and Saudi Arabia",
        send_money:
          "Send money internationally to select countries with competitive exchange rates",
        supported_currencies: ["PKR", "USD", "AED", "SAR", "GBP", "EUR"],
        transfer_methods: ["Bank Transfer", "Cash Pickup", "Mobile Wallet"],
        limits:
          "Daily limit: PKR 500,000 for local transfers, PKR 1,000,000 for international remittances",
      },
      important_notes: [
        "Requires CNIC verification for full account activation",
        "Biometric verification available at JazzCash shops",
        "24/7 customer support available",
        "Free registration and no monthly fees",
        "Compatible with all mobile networks",
      ],
    },
    seo: {
      seoMetaTitle: "JazzCash - Digital Wallet Pakistan",
      seoMetaDescription:
        "JazzCash: digital payments, transfers, bills, and mobile banking in Pakistan.",
    },
    sources: [
      "https://www.jazzcash.com.pk",
      "https://play.google.com/store/apps/details?id=com.jazzcash.jazzcash",
    ],
  },
  {
    platform: {
      name: "SadaPay",
      slug: "sadapay",
      founded: 2019,
      headquarters: "Islamabad, Pakistan",
      website: "https://www.sadapay.pk",
      logo: "/wallets/sadapay.jpeg", // SadaPay logo is in jazzcash.jpeg file
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.sadapay.app",
      appstore_url: "https://apps.apple.com/pk/app/sadapay/id1234567894",
      trustpilot_url: "https://www.trustpilot.com/review/sadapay.pk",
      user_base: "Over 2 million registered users",
      primary_use: "Modern digital wallet with virtual and physical cards",
      essence: "wallet",
      international_support: false,
      onlyInternational: false,
    },
    content: {
      about:
        "SadaPay is Pakistan's first digital wallet with a focus on modern banking features. It offers virtual and physical cards, making it unique among Pakistani digital wallets. The platform emphasizes user experience and modern fintech features.",
      features: [
        "Virtual and physical debit cards",
        "Online and offline payments",
        "Money transfers to other SadaPay users",
        "Bill payments and utilities",
        "Mobile top-up services",
        "International online payments",
        "QR code payments",
        "Digital savings",
        "Real-time transaction tracking",
        "Modern user interface",
      ],
      international: {
        receive_money: "Currently no international remittance support",
        send_money: "No international money transfer capabilities",
        supported_currencies: ["PKR"],
        transfer_methods: ["Local transfers only"],
        limits: "Daily limit: PKR 200,000 for local transfers",
      },
      important_notes: [
        "CNIC verification required for card issuance",
        "Virtual cards available instantly",
        "Physical cards delivered to your address",
        "Works internationally for online payments",
        "No hidden fees or charges",
        "Modern app with excellent UX",
      ],
    },
    seo: {
      seoMetaTitle: "SadaPay - Modern Digital Wallet Pakistan",
      seoMetaDescription:
        "SadaPay: virtual & physical cards, payments, bills, and savings.",
    },
    sources: [
      "https://www.sadapay.pk",
      "https://play.google.com/store/apps/details?id=com.sadapay.app",
    ],
  },
  {
    platform: {
      name: "UBL Omni",
      slug: "ubl-omni",
      founded: 2014,
      headquarters: "Karachi, Pakistan",
      website: "https://www.ubldigital.com/omni",
      logo: "/wallets/ubl.webp", // UBL logo is in meezan.jpeg file
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.ubl.omni",
      appstore_url: "https://apps.apple.com/pk/app/ubl-omni/id1234567893",
      trustpilot_url: "https://www.trustpilot.com/review/ubldigital.com",
      user_base: "Over 6 million registered users",
      primary_use: "Digital banking and payment services by UBL Bank",
      essence: "banking",
      international_support: true,
      onlyInternational: false,
    },
    content: {
      about:
        "UBL Omni is United Bank Limited's digital banking platform that provides comprehensive financial services. It combines UBL's banking expertise with modern technology to offer secure and convenient digital banking solutions.",
      features: [
        "Digital account opening and management",
        "Money transfers and payments",
        "Bill payments and utilities",
        "Mobile top-up services",
        "Investment and savings products",
        "Insurance solutions",
        "International remittances",
        "QR code payments",
        "ATM services without card",
        "Business payment solutions",
      ],
      international: {
        receive_money:
          "Receive international remittances through UBL's global network and partnerships",
        send_money:
          "Send money internationally using UBL's correspondent banking relationships",
        supported_currencies: ["PKR", "USD", "AED", "SAR", "GBP", "EUR", "AUD"],
        transfer_methods: [
          "Bank Transfer",
          "Cash Pickup",
          "Account Credit",
          "Mobile Wallet",
        ],
        limits:
          "Daily limit: PKR 800,000 for local transfers, PKR 1,500,000 for international remittances",
      },
      important_notes: [
        "CNIC verification required for full access",
        "Linked to UBL's branch network",
        "Competitive exchange rates for international transfers",
        "24/7 customer support",
        "Advanced fraud protection",
      ],
    },
    seo: {
      seoMetaTitle: "UBL Omni - Digital Banking Pakistan",
      seoMetaDescription:
        "UBL Omni: digital banking, payments, bills, remittances, and services.",
    },
    sources: [
      "https://www.ubldigital.com/omni",
      "https://play.google.com/store/apps/details?id=com.ubl.omni",
    ],
  },
  {
    platform: {
      name: "Meezan Bank",
      slug: "meezan",
      founded: 1997,
      headquarters: "Karachi, Pakistan",
      website: "https://www.meezanbank.com",
      logo: "/wallets/meezan.jpeg", // Meezan logo is in sadapay.jpeg file
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.meezanbank.app",
      appstore_url: "https://apps.apple.com/pk/app/meezan-bank/id1234567895",
      trustpilot_url: "https://www.trustpilot.com/review/meezanbank.com",
      user_base: "Over 4 million registered users",
      primary_use: "Islamic digital banking and payment services",
      essence: "banking",
      international_support: true,
      onlyInternational: false,
    },
    content: {
      about:
        "Meezan Bank is Pakistan's first and largest Islamic bank, offering Shariah-compliant digital banking solutions. The bank combines traditional Islamic banking principles with modern digital technology.",
      features: [
        "Islamic banking services",
        "Digital account management",
        "Money transfers and payments",
        "Bill payments and utilities",
        "Investment products",
        "International remittances",
        "QR payments",
        "ATM services",
        "Business banking",
        "Islamic financing solutions",
      ],
      international: {
        receive_money:
          "Receive international remittances through Islamic banking network",
        send_money:
          "Send money internationally with Shariah-compliant services",
        supported_currencies: ["PKR", "USD", "AED", "SAR", "GBP", "EUR"],
        transfer_methods: ["Bank Transfer", "Cash Pickup", "Account Credit"],
        limits:
          "Daily limit: PKR 1,000,000 for local transfers, PKR 2,000,000 for international remittances",
      },
      important_notes: [
        "Shariah-compliant banking services",
        "CNIC verification required",
        "Linked to Meezan Bank branches",
        "Islamic investment products available",
        "24/7 customer support",
      ],
    },
    seo: {
      seoMetaTitle: "Meezan Bank - Islamic Digital Banking Pakistan",
      seoMetaDescription:
        "Meezan Bank: Islamic digital banking, payments, remittances, and services.",
    },
    sources: [
      "https://www.meezanbank.com",
      "https://play.google.com/store/apps/details?id=com.meezanbank.app",
    ],
  },
  {
    platform: {
      name: "NayaPay",
      slug: "nayapay",
      founded: 2020,
      headquarters: "Karachi, Pakistan",
      website: "https://www.nayapay.com",
      logo: "/wallets/nayapay.png", // NayaPay logo is in ubl.webp file
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.nayapay.app",
      appstore_url: "https://apps.apple.com/pk/app/nayapay/id1234567896",
      trustpilot_url: "https://www.trustpilot.com/review/nayapay.com",
      user_base: "Over 1 million registered users",
      primary_use: "Modern digital payments and financial services",
      essence: "wallet",
      international_support: false,
      onlyInternational: false,
    },
    content: {
      about:
        "NayaPay is a modern digital payment platform focused on providing seamless financial services. It offers innovative payment solutions with a user-friendly interface.",
      features: [
        "Digital payments and transfers",
        "Bill payments and utilities",
        "Mobile top-up services",
        "QR code payments",
        "Digital savings",
        "Business payment solutions",
        "Real-time notifications",
        "Secure transactions",
        "Modern user interface",
        "Customer support",
      ],
      international: {
        receive_money: "Currently no international remittance support",
        send_money: "No international money transfer capabilities",
        supported_currencies: ["PKR"],
        transfer_methods: ["Local transfers only"],
        limits: "Daily limit: PKR 100,000 for local transfers",
      },
      important_notes: [
        "CNIC verification required",
        "Modern app design",
        "Secure payment processing",
        "Real-time transaction updates",
        "No hidden charges",
      ],
    },
    seo: {
      seoMetaTitle: "NayaPay - Digital Payments Pakistan",
      seoMetaDescription:
        "NayaPay: digital payments, bills, QR, savings, and notifications.",
    },
    sources: [
      "https://www.nayapay.com",
      "https://play.google.com/store/apps/details?id=com.nayapay.app",
    ],
  },
  {
    platform: {
      name: "Faysal Bank",
      slug: "faysal",
      founded: 1994,
      headquarters: "Karachi, Pakistan",
      website: "https://www.faysalbank.com",
      logo: "/wallets/faysal.png", // Faysal logo is in faysal.png file
      playstore_url:
        "https://play.google.com/store/apps/details?id=com.faysalbank.app",
      appstore_url: "https://apps.apple.com/pk/app/faysal-bank/id1234567897",
      trustpilot_url: "https://www.trustpilot.com/review/faysalbank.com",
      user_base: "Over 3 million registered users",
      primary_use: "Digital banking and Islamic financial services",
      essence: "banking",
      international_support: true,
      onlyInternational: false,
    },
    content: {
      about:
        "Faysal Bank provides comprehensive digital banking solutions with a focus on Islamic banking principles. The bank offers modern financial services through its digital platform.",
      features: [
        "Digital banking services",
        "Islamic banking products",
        "Money transfers and payments",
        "Bill payments and utilities",
        "Investment solutions",
        "International remittances",
        "QR payments",
        "ATM services",
        "Business banking",
        "Islamic financing",
      ],
      international: {
        receive_money:
          "Receive international remittances through Faysal Bank network",
        send_money: "Send money internationally with competitive rates",
        supported_currencies: ["PKR", "USD", "AED", "SAR", "GBP", "EUR"],
        transfer_methods: ["Bank Transfer", "Cash Pickup", "Account Credit"],
        limits:
          "Daily limit: PKR 800,000 for local transfers, PKR 1,500,000 for international remittances",
      },
      important_notes: [
        "Islamic banking services available",
        "CNIC verification required",
        "Linked to Faysal Bank branches",
        "Competitive exchange rates",
        "24/7 customer support",
      ],
    },
    seo: {
      seoMetaTitle: "Faysal Bank - Digital Banking Pakistan",
      seoMetaDescription:
        "Faysal Bank: digital banking, Islamic services, payments, and remittances.",
    },
    sources: [
      "https://www.faysalbank.com",
      "https://play.google.com/store/apps/details?id=com.faysalbank.app",
    ],
  },
];

export default mockWallets;
