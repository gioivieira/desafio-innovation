export class Order {
    constructor(
        private id: string,
        private created_at: Date,
        private quantity: number,
        private fk_products: string,
        private fk_customers: string
    ){
    }

    public getId() {
        return this.id
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getQuantity() {
        return this.quantity
    }

    public getProductId() {
        return this.fk_products
    }

    public getCustomerId() {
        return this.fk_customers
    }
}