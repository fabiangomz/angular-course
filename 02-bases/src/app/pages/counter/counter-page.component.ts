import { Component, signal } from '@angular/core'

@Component({
    templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
    counter: number = 10
    counterSignal = signal(10)

    increaseBy(value: number): void {
        this.counter += value
        this.counterSignal.update((current) => current + value)
    }

    resetCounter(): void {
        this.counter = 10
        this.counterSignal.set(0)
    }
}
