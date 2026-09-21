export const SHIPPING_METHODS = [
  { id: "dhl-express", label: "DHL Express", price: 59.14, default: true },
  {
    id: "fedex-priority",
    label: "FedEx Priority",
    price: 45.2,
    default: false,
  },
  { id: "ups-ground", label: "UPS Ground", price: 22.99, default: false },
];

export const PACKING_OPTIONS = [
  { id: "fragile-stickers", price: 1.8, label: "Fragile stickers" },
  { id: "extra-padding", price: 2.29, label: "Extra padding" },
  { id: "gift-wrap", price: 4, label: "Gift wrap" },
];

export const SHIPPING_PREFERENCES = [
  { id: "insurance", price: 15, label: "Insurance" },
];

export const EXPORT_DOCS = [
  { id: "commercial-invoice", price: 2, label: "Commercial invoice" },
  { id: "certificate-of-origin", price: 2, label: "Certificate of origin" },
];

export const FIELD_NAMES = {
  shippingMethod: "shippingMethod",
  packingOptions: "packingOptions",
  shippingPreferences: "shippingPreferences",
  exportDocumentation: "exportDocumentation",
};

export const DEFAULT_PAYMENT_METHOD = {
  id: "default",
  cardNumber: "",
  expiry: "",
  isDefault: false,
};

export const DEFAULT_SHIPPING_ADDRESSES = {
  id: "default",
  userId: "",
  addressPrimary: "select shipping address",
  addressSecondary: "",
  fullName: "",
  country: "",
  province: "",
  city: "",
  postalCode: "",
  countryCode: "",
  phoneNumber: "",
  isDefault: false,
};
