import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ListComponent } from '../../components/list/list.component'
import { GifService } from '../../services/gifs.service'

@Component({
    selector: 'app-search-page',
    imports: [ListComponent],
    templateUrl: './search-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
    gifService = inject(GifService)
    onSearch = (search: string) => {
        console.log('search', search)

        this.gifService.searchGifs(search)
    }
}
