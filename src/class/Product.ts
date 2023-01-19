export class Product {
    constructor(
        private id: string,
        private name: string,
        private category: string,
        private status: string,
        private quantity: number,
        private created_at: Date,
        private updated_at: Date,
        private deleted_at: Date
    ){
        this.id = id
        this.name = name
        this.category = category
        this.status = status
        this.quantity = quantity
        this.created_at = created_at
        this.updated_at = updated_at
        this.deleted_at = deleted_at
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