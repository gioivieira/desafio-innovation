export class Customer {
    constructor(
        private id: string,
        private full_name: string,
        private cpf: string,
        private email: string,
        private birth_date: Date,
        private status: string,
        private created_at: Date,
        private updated_at: any = null,
        private deleted_at: any = null
    ){
    }

    public getId() {
        return this.id
    }

    public getFullName() {
        return this.full_name
    }

    public getCpf() {
        return this.cpf
    }

    public getEmail() {
        return this.email
    }

    public getBirthDate() {
        return this.birth_date
    }

    public getStatus() {
        return this.status
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