import type {
  PaymentMethodsType,
  ShippingAddressType,
} from "@/feature/shipping";

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

export const MOCK_PAYMENT_METHODS: PaymentMethodsType[] = [
  {
    id: "pm_1",
    brand: "visa",
    last4: "3532",
    expiry: "06/2027",
    isDefault: true,
  },
  {
    id: "pm_2",
    brand: "mastercard",
    last4: "4934",
    expiry: "	2028/8",
    isDefault: false,
  },
];

export const MOCK_SHIPPING_ADDRESSES: ShippingAddressType[] = [
  {
    id: "addr_1",
    name: "Mr. Juvenal Little",
    address: "Overland Park, 	Kansas, 6920 W 105th St",
    phone: "+1 (941) 538-6941",
    isDefault: true,
  },
  {
    id: "addr_2",
    name: "Giuseppe Batz V",
    address: "Saltillo, Mississippi, 104 Desert Cv",
    phone: "+1 (662) 869-1611",
    isDefault: false,
  },
];
