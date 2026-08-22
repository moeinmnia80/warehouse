export class Shipping {
  constructor({
    shipmentId = "SHP-" + crypto.randomUUID(),
    userId,
    carrier,
    status = "register",
    notice = "",
    description = "",
    charge = null,
    createdAt = new Date(),
    shippedAt = null,
    deliveredAt = null,
    invoice = null,
    packages = [],
  } = {}) {
    this.shipmentId = shipmentId;
    this.userId = userId;
    this.carrier = carrier;
    this.status = status;
    this.notice = notice;
    this.description = description;
    this.charge = charge;
    this.createdAt = createdAt;
    this.shippedAt = shippedAt;
    this.deliveredAt = deliveredAt;
    this.invoice = invoice;
    this.packages = packages;
  }

  toJSON() {
    return {
      shipmentId: this.shipmentId,
      userId: this.userId,
      carrier: this.carrier,
      status: this.status,
      notice: this.notice,
      description: this.description,
      charge: this.charge,
      createdAt: this.createdAt,
      shippedAt: this.shippedAt,
      deliveredAt: this.deliveredAt,
      invoice: this.invoice,
      packages: this.packages,
    };
  }
}
