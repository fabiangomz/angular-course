import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
interface MenuOptions {
    label: string
    subLabel: string
    route: string
    icon: string
}
@Component({
    selector: 'gifs-side-menu-options',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
    menuOptions: MenuOptions[] = [
        {
            icon: 'fa-solid fa-chart-line',
            label: 'Trending',
            subLabel: 'Gifs Populares',
            route: '/dashboard/trending',
        },
        {
            icon: 'fa-solid fa-magnifying-glass',
            label: 'Buscador',
            subLabel: 'Buscador gifs',
            route: '/dashboard/search',
        },
    ]
}
