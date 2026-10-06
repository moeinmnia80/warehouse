import db from "../../config/db.js";

export const findSuiteByUserId = async (userId, page = 1, limit = 10) => {
  if (limit === "all") {
    const suite = await db.suite.findUnique({
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

    if (!suite) return null;

    return {
      suite,
      pagination: {
        total: suite.packages.length,
        page: 1,
        limit: "all",
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  const safePage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const safeLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
  const skip = (safePage - 1) * safeLimit;

  const [suite, totalPackages] = await Promise.all([
    db.suite.findUnique({
      where: { userId },
      include: {
        packages: {
          skip,
          take: safeLimit,
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
        suite: { userId },
      },
    }),
  ]);

  if (!suite) return null;

  return {
    suite,
    pagination: {
      total: totalPackages,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(totalPackages / safeLimit),
      hasNextPage: skip + safeLimit < totalPackages,
      hasPrevPage: safePage > 1,
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
