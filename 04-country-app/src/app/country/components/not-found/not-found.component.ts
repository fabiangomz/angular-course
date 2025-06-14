import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

@Component({
    selector: 'country-not-found',
    imports: [],
    templateUrl: './not-found.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
    location = inject(Location)

    goBack(): void {
        this.location.back()
    }
}
