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
