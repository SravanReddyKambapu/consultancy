export class Items {
    id: any;
    customer: string;
    store: string;
    token: string;
    constructor(data: any) {
        this.id=data.id;
        this.customer=data.customer;
        this.store = data.store;
        this.token=data.token;
    }
}
