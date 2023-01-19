export class Order {
    constructor(
        private id: string,
        private created_at: Date,
        private product_id: string,
        private customer_id: string
    ){
    }

    public getId() {
        return this.id
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getProductId() {
        return this.product_id
    }

    public getCustomerId() {
        return this.customer_id
    }
}