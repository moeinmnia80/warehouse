import db from "../../config/db.js";

export const findSuiteByUserId = async (userId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const [suite, totalPackages] = await db.$transaction([
    db.suite.findUnique({
      where: { userId },
      include: {
        packages: {
          skip,
          take: limit,
          include: {
            items: true,
            invoices: true,
            images: true,
          },
        },
      },
    }),

    db.package.count({
      where: {
        suite: {
          userId,
        },
      },
    }),
  ]);

  if (!suite) return null;

  return {
    suite,
    pagination: {
      total: totalPackages,
      page,
      limit,
      totalPages: Math.ceil(totalPackages / limit),
      hasNextPage: skip + limit < totalPackages,
      hasPrevPage: page > 1,
    },
  };
};

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
