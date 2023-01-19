export class Product {
    constructor(
        private id: string,
        private name: string,
        private category: string,
        private status: string,
        private quantity: number,
        private created_at: Date,
        private updated_at: any = null,
        private deleted_at: any = null
    ){
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getCategory() {
        return this.category
    }

    public getStatus() {
        return this.status
    }

    public getQuantity() {
        return this.quantity
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getUpdatedAt() {
        return this.updated_at
    }

    public getDeletedAt() {
        return this.deleted_at
    }
}