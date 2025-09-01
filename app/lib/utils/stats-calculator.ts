import type { WalletPlatform } from "~/lib/schema";

export interface WalletStats {
  totalUsers: string;
  totalPlatforms: number;
  internationalPlatforms: number;
  localPlatforms: number;
  walletServices: number;
  bankingServices: number;
  internationalServices: number;
}

export function calculateWalletStats(wallets: WalletPlatform[]): WalletStats {
  if (!wallets || wallets.length === 0) {
    return {
      totalUsers: "0",
      totalPlatforms: 0,
      internationalPlatforms: 0,
      localPlatforms: 0,
      walletServices: 0,
      bankingServices: 0,
      internationalServices: 0,
    };
  }

  // Parse user base numbers from strings like "Over 15M customers", "1M+ users", etc.
  const parseUserBase = (userBase: string): number => {
    const lower = userBase.toLowerCase();

    // Handle "Over XM" format
    const overMatch = lower.match(/over\s+(\d+(?:\.\d+)?)m/i);
    if (overMatch) return Math.floor(parseFloat(overMatch[1]) * 1000000);

    // Handle "XM+" format
    const plusMatch = lower.match(/(\d+(?:\.\d+)?)m\+/i);
    if (plusMatch) return Math.floor(parseFloat(plusMatch[1]) * 1000000);

    // Handle "XM" format
    const mMatch = lower.match(/(\d+(?:\.\d+)?)m/i);
    if (mMatch) return Math.floor(parseFloat(mMatch[1]) * 1000000);

    // Handle "XK+" format
    const kPlusMatch = lower.match(/(\d+(?:\.\d+)?)k\+/i);
    if (kPlusMatch) return Math.floor(parseFloat(kPlusMatch[1]) * 1000);

    // Handle "XK" format
    const kMatch = lower.match(/(\d+(?:\.\d+)?)k/i);
    if (kMatch) return Math.floor(parseFloat(kMatch[1]) * 1000);

    // Handle plain numbers
    const numMatch = lower.match(/(\d+)/);
    if (numMatch) return parseInt(numMatch[1]);

    return 0;
  };

  // Calculate total users
  const totalUsers = wallets.reduce((sum, wallet) => {
    return sum + parseUserBase(wallet.platform.user_base);
  }, 0);

  // Count platforms by type
  const internationalPlatforms = wallets.filter(
    (w) => w.platform.international_support
  ).length;
  const localPlatforms = wallets.filter(
    (w) => !w.platform.international_support
  ).length;
  const walletServices = wallets.filter(
    (w) => w.platform.essence === "wallet"
  ).length;
  const bankingServices = wallets.filter(
    (w) => w.platform.essence === "banking"
  ).length;
  const internationalServices = wallets.filter(
    (w) => w.platform.essence === "service"
  ).length;

  // Format total users
  const formatTotalUsers = (num: number): string => {
    if (num >= 1000000) {
      const millions = (num / 1000000).toFixed(1);
      return `${millions}M+`;
    }
    if (num >= 1000) {
      const thousands = (num / 1000).toFixed(1);
      return `${thousands}K+`;
    }
    return `${num}+`;
  };

  return {
    totalUsers: formatTotalUsers(totalUsers),
    totalPlatforms: wallets.length,
    internationalPlatforms,
    localPlatforms,
    walletServices,
    bankingServices,
    internationalServices,
  };
}
