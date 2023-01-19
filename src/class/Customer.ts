export class Customer {
    constructor(
        private id: string,
        private full_name: string,
        private cpf: string,
        private email: string,
        private birth_date: Date,
        private created_at: Date,
        private updated_at: Date
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

    public getCreatedAt() {
        return this.created_at
    }

    public getUpdatedAt() {
        return this.updated_at
    }
}