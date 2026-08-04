import type { PaymentMethods } from "@/feature/shipping";

export const SHIPPING_METHODS = [
  { id: "dhl-express", label: "DHL Express", price: 59.14 },
  { id: "fedex-priority", label: "FedEx Priority", price: 45.2 },
  { id: "ups-ground", label: "UPS Ground", price: 22.99 },
];

export const PACKING_OPTIONS = [
  { id: "fragile-stickers", label: "Fragile stickers" },
  { id: "extra-padding", label: "Extra padding" },
  { id: "gift-wrap", label: "Gift wrap" },
];

export const SHIPPING_PREFERENCES = [{ id: "insurance", label: "Insurance" }];

export const EXPORT_DOCS = [
  { id: "commercial-invoice", label: "Commercial invoice" },
  { id: "certificate-of-origin", label: "Certificate of origin" },
];

export const FIELD_NAMES = {
  shippingMethod: "shippingMethod",
  packingOptions: "packingOptions",
  shippingPreferences: "shippingPreferences",
  exportDocumentation: "exportDocumentation",
};

export const MOCK_PAYMENT_METHODS: PaymentMethods[] = [
  {
    id: "pm_1",
    brand: "visa",
    last4: "1234",
    expiry: "06/2027",
    isDefault: true,
  },
  {
    id: "pm_2",
    brand: "mastercard",
    last4: "1234",
    expiry: "06/2027",
    isDefault: false,
  },
];

export const MOCK_SHIPPING_ADDRESSES = {
  id: "addr_1",
  name: "Robert Fox",
  address: "Alex Lokien Kaya Ser'i Katki 12A Willemstad Curacao",
  phone: "+1 (941) 538-6941",
  isDefault: true,
};
