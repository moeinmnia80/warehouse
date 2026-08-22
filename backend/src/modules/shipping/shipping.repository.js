import db from "../../config/db.js";

export const findShippingByUserId = (id) =>
  db.shipping.findMany({
    where: { userId: id },
    include: {
      invoice: true,
      packages: {
        include: {
          items: true,
        },
      },
    },
  });

export const findShippingByShippingId = (id) =>
  db.shipping.findFirst({
    where: { shipmentId: id },
    include: {
      invoice: true,
      packages: {
        include: {
          items: true,
        },
      },
    },
  });

export const createNewShipping = (newShippingData) =>
  db.shipping.create({
    data: {
      shipmentId: newShippingData.shipmentId,
      userId: newShippingData.userId,
      carrier: newShippingData.carrier,
      status: newShippingData.status,
      notice: newShippingData.notice ?? null,
      description: newShippingData.description ?? null,
      charge: newShippingData.charge ?? null,
      createdAt: newShippingData.createdAt,
      shippedAt: newShippingData.shippedAt ?? null,
      deliveredAt: newShippingData.deliveredAt ?? null,
      invoice: newShippingData.invoice
        ? {
            create: {
              ...newShippingData.invoice,
            },
          }
        : undefined,
      packages: {
        create: newShippingData?.packages.map((pkg) => ({
          barcode: pkg.barcode,
          packageId: pkg.packageId,
          shipmentId: newShippingData.shipmentId,
          vendor: pkg.vendor,
          dataReceived: pkg.dataReceived,
          itemValues: pkg.itemValues,
          totalValues: pkg.totalValues,
          weight: pkg.weight,
          statusLabel: pkg.statusLabel,
          statusDetails: pkg.statusDetails,
          recipient: pkg.recipient,
          address: pkg.address,

          items: pkg.items?.length
            ? {
                create: pkg.items.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  valuePerUnit: item.valuePerUnit,
                  notice: item.notice ?? null,
                })),
              }
            : undefined,

          invoices: pkg.invoices?.length
            ? {
                create: pkg.invoices.map((inv) => ({
                  url: inv.url,
                  name: inv.name,
                  size: inv.size,
                  type: inv.type,
                })),
              }
            : undefined,

          images: pkg.images?.length
            ? {
                create: pkg.images.map((img) => ({
                  url: img.url,
                  name: img.name,
                  size: img.size,
                  type: img.type,
                })),
              }
            : undefined,
        })),
      },
    },
    include: {
      invoices: true,
      packages: {
        include: {
          items: true,
          invoices: true,
          images: true,
        },
      },
    },
  });

export const upsertShippingInvoice = (shipmentId, file) =>
  db.invoice.upsert({
    where: { shipmentId: shipmentId },
    update: {
      url: file.path,
      name: file.originalname || "invoice",
      size: file.size || 0,
      type: file.mimetype || "application/pdf",
    },
    create: {
      url: file.path,
      name: file.originalname || "invoice",
      size: file.size || 0,
      type: file.mimetype || "application/pdf",
      shipmentId: shipmentId,
    },
  });
