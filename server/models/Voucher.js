
class Voucher{
    
    constructor(newVoucher)
    {
        this.#voucherID = newVoucher.voucherID;
        this.#voucherName = newVoucher.voucherName;
        this.#offer = newVoucher.offer;
        this.#validFrom = newVoucher.validFrom;
        this.#validTo = newVoucher.validTo;
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