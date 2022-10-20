
class Voucher{
    #voucherID;
    #voucherName;
    #offer;
    #validFrom;
    #validTo;
    constructor(newVoucher)
    {
        this.#voucherID = newVoucher.id;
        this.#voucherName = newVoucher.name;
        this.#offer = newVoucher.offer;
        this.#validFrom = newVoucher.valid_from;
        this.#validTo = newVoucher.valid_to;
    }   
    get voucherID()
    {
        return this.voucherID;
    }
    get voucherName()
    {
        return this.voucherName;
    }
    set voucherName(newName)
    {
        this.voucherName = newName;
    }
    get offer()
    {
        return this.offer;
    }
    set offer(newOffer)
    {
        this.offer = newOffer;
    }
    get validFrom()
    {
        return this.validFrom;
    }
    set validFrom(newDate)
    {
        this.validFrom = newDate;
    }
    get validTo()
    {
        return this.validTo;
    }
    set validTo(newDate)
    {
        this.validTo = newDate;
    }
}
module.exports = Voucher;