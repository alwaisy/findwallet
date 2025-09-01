<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Features Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Zap class="w-5 h-5" />
          Key Features
        </CardTitle>
        <CardDescription>
          What makes {{ wallet.platform.name }} unique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div
            v-for="(feature, index) in wallet.content.features"
            :key="index"
            class="flex items-start gap-3 p-1 bg-muted/30 rounded-lg"
          >
            <Check class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span class="text-sm text-foreground">{{ feature }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- International Section -->
    <Card v-if="wallet.platform.international_support">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Globe class="w-5 h-5" />
          International Services
        </CardTitle>
        <CardDescription>
          {{
            wallet.platform.international_support
              ? "Supports international transactions"
              : "Local services only"
          }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <!-- Receive Money -->
          <div>
            <h4 class="font-medium text-foreground mb-2">Receive Money</h4>
            <!-- String shape -->
            <p
              v-if="
                typeof wallet.content.international.receive_money === 'string'
              "
              class="text-sm text-muted-foreground"
            >
              {{ wallet.content.international.receive_money }}
            </p>
            <!-- Object shape -->
            <div
              v-else-if="wallet.content.international.receive_money"
              class="space-y-2"
            >
              <div
                v-if="
                  wallet.content.international.receive_money.methods?.length
                "
              >
                <div class="space-y-1">
                  <div
                    v-for="method in wallet.content.international.receive_money
                      .methods"
                    :key="method"
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check class="w-3 h-3 text-primary" />
                    {{ method }}
                  </div>
                </div>
              </div>
              <div
                v-if="wallet.content.international.receive_money.infrastructure"
                class="text-sm text-muted-foreground"
              >
                Infrastructure:
                {{ wallet.content.international.receive_money.infrastructure }}
              </div>
              <div
                v-if="
                  wallet.content.international.receive_money.partners?.length
                "
              >
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="partner in wallet.content.international.receive_money
                      .partners"
                    :key="partner"
                    variant="secondary"
                  >
                    {{ partner }}
                  </Badge>
                </div>
              </div>
              <div
                v-if="
                  wallet.content.international.receive_money.technical_details
                    ?.length
                "
              >
                <div class="space-y-1">
                  <div
                    v-for="detail in wallet.content.international.receive_money
                      .technical_details"
                    :key="detail"
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check class="w-3 h-3 text-primary" />
                    {{ detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Send Money -->
          <div>
            <h4 class="font-medium text-foreground mb-2">Send Money</h4>
            <!-- String shape -->
            <p
              v-if="typeof wallet.content.international.send_money === 'string'"
              class="text-sm text-muted-foreground"
            >
              {{ wallet.content.international.send_money }}
            </p>
            <!-- Object shape -->
            <div
              v-else-if="wallet.content.international.send_money"
              class="space-y-2"
            >
              <div
                v-if="wallet.content.international.send_money.methods?.length"
              >
                <div class="space-y-1">
                  <div
                    v-for="method in wallet.content.international.send_money
                      .methods"
                    :key="method"
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check class="w-3 h-3 text-primary" />
                    {{ method }}
                  </div>
                </div>
              </div>
              <div
                v-if="wallet.content.international.send_money.infrastructure"
                class="text-sm text-muted-foreground"
              >
                Infrastructure:
                {{ wallet.content.international.send_money.infrastructure }}
              </div>
              <div
                v-if="wallet.content.international.send_money.partners?.length"
              >
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="partner in wallet.content.international.send_money
                      .partners"
                    :key="partner"
                    variant="secondary"
                  >
                    {{ partner }}
                  </Badge>
                </div>
              </div>
              <div
                v-if="
                  wallet.content.international.send_money.technical_details
                    ?.length
                "
              >
                <div class="space-y-1">
                  <div
                    v-for="detail in wallet.content.international.send_money
                      .technical_details"
                    :key="detail"
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check class="w-3 h-3 text-primary" />
                    {{ detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Supported Currencies -->
          <div>
            <h4 class="font-medium text-foreground mb-2">
              Supported Currencies
            </h4>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="currency in wallet.content.international
                  .supported_currencies"
                :key="currency"
                :title="getCurrencyTitle(currency)"
                class="flex items-center gap-1"
              >
                <Icon
                  v-if="getCurrencyIcon(currency)"
                  :name="getCurrencyIcon(currency)!"
                  :size="24"
                />
                <Icon
                  v-else-if="getCountryFlag(currency)"
                  :name="getCountryFlag(currency)!"
                  :size="24"
                />
                <span v-else class="text-xs">{{ currency }}</span>
              </div>
            </div>
          </div>

          <!-- Transfer Methods -->
          <div>
            <h4 class="font-medium text-foreground mb-2">Transfer Methods</h4>
            <div class="space-y-2">
              <div
                v-for="method in wallet.content.international.transfer_methods"
                :key="method"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check class="w-3 h-3 text-primary" />
                {{ method }}
              </div>
            </div>
          </div>

          <!-- Limits -->
          <div>
            <h4 class="font-medium text-foreground mb-2">Transfer Limits</h4>
            <p class="text-sm text-muted-foreground">
              {{ wallet.content.international.limits }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Check, Globe, Zap } from "lucide-vue-next";
import type { WalletPlatform } from "~/lib/schema";

interface Props {
  wallet: WalletPlatform;
}

defineProps<Props>();

// Currency icon mapping
const currencyIcons: Record<string, string> = {
  USD: "noto:dollar-banknote",
  EUR: "noto:euro-banknote",
  GBP: "noto:pound-banknote",
};

// Country flag mapping
const countryFlags: Record<string, string> = {
  AED: "twemoji:flag-united-arab-emirates",
  SAR: "twemoji:flag-saudi-arabia",
  PKR: "twemoji:flag-pakistan",
};

// Get currency icon based on currency code
const getCurrencyIcon = (currency: string): string | null => {
  return currencyIcons[currency] || null;
};

// Get country flag based on currency code
const getCountryFlag = (currency: string): string | null => {
  return countryFlags[currency] || null;
};

// Get currency title for tooltip
const getCurrencyTitle = (currency: string): string => {
  const currencyNames: Record<string, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    AED: "UAE Dirham",
    SAR: "Saudi Riyal",
    PKR: "Pakistani Rupee",
  };

  return currencyNames[currency] || currency;
};
</script>
