import {
    AfterViewInit,
    Component,
    computed,
    ElementRef,
    inject,
    viewChild,
} from '@angular/core'
import { ListComponent } from '../../components/list/list.component'
import { GifService } from '../../services/gifs.service'
import { ScrollStateService } from '../../shared/services/scroll-state.service'

@Component({
    selector: 'app-trending-page',
    imports: [],
    templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
    scrollStateService = inject(ScrollStateService)
    gifService = inject(GifService)

    scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

    ngAfterViewInit(): void {
        const scrollDiv = this.scrollDivRef()?.nativeElement

        if (!scrollDiv) return

        scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
    }
    gifs = computed(() => {
        this.gifService = inject(GifService)
    })

    onScroll(event: Event) {
        const scrollDiv = this.scrollDivRef()?.nativeElement

        if (!scrollDiv) return

        const scrollTop = scrollDiv.scrollTop

        const clientHight = scrollDiv.clientHeight
        const scrollHeight = scrollDiv.scrollHeight
        const isAtBottom = scrollTop + clientHight + 300 >= scrollHeight
        this.scrollStateService.trendingScrollState.set(scrollTop)
        if (isAtBottom) {
            this.gifService.loadTrendingGifs()
        }
    }
}
