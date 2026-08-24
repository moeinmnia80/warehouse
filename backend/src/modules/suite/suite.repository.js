import db from "../../config/db.js";

export const findSuiteByUserId = (userId) =>
  db.suite.findUnique({
    where: { userId },
    include: {
      packages: {
        include: {
          items: true,
          invoices: true,
          images: true,
        },
      },
    },
  });

export const createNewSuite = (newSuite) =>
  db.suite.create({
    data: {
      userId: newSuite.userId,
      name: newSuite.name,
      zonePrefix: newSuite.zonePrefix,
      description: newSuite.description ?? null,
    },
  });

export const updateSuite = (suiteId, data) =>
  db.suite.update({
    where: { id: suiteId },
    data,
  });

export const findPackageByUserIdAndId = (userId, packageId) =>
  db.package.findFirst({
    where: {
      packageId,
      suite: { userId },
    },
    include: {
      suite: true,
      invoices: true,
      images: true,
      items: true,
    },
  });

export const addInvoicesToPackage = (packageId, invoicesData) =>
  db.invoice.createMany({
    data: invoicesData.map((inv) => ({
      url: inv.url,
      name: inv.name,
      size: inv.size,
      type: inv.type,
      packageId,
    })),
  });

export const deleteInvoiceById = (invoiceId) =>
  db.invoice.delete({
    where: { id: invoiceId },
  });

export const addImagesToPackage = (packageId, imagesData) =>
  db.image.createMany({
    data: imagesData.map((img) => ({
      url: img.url,
      name: img.name,
      size: img.size,
      type: img.type,
      packageId,
    })),
  });

export const deleteImageById = (imageId) =>
  db.image.delete({
    where: { id: imageId },
  });
