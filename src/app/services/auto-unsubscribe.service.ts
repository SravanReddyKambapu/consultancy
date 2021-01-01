import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class AutoUnsubscribe implements OnDestroy{
    protected subscriptions: Array<Subscription> = [];
constructor() {}
    ngOnDestroy() {
        this.subscriptions.forEach(subscription=>subscription.unsubscribe());
        this.subscriptions =[];
    }
}