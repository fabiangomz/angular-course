import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    signal,
    viewChild,
} from '@angular/core'
import mapboxgl from 'mapbox-gl'
import { environment } from '../../../environments/environment.development'
mapboxgl.accessToken = environment.mapboxKey

interface Marker {
    id: string
    mapboxMarker: mapboxgl.Marker
}
@Component({
    selector: 'app-markers-page',
    imports: [],
    templateUrl: './markers-page.component.html',
    styles: `div {
    width: 100vw;
    height: calc(100vh - 64px);
  }`,
})
export class MarkersPageComponent implements AfterViewInit {
    zoom = signal(14)
    divElement = viewChild<ElementRef>('map')
    map = signal<mapboxgl.Map | null>(null)
    markers = signal<Marker[]>([])
    coordinates = signal({
        lng: -122.40985,
        lat: 37.793085,
    })

    zoomEffect = effect(() => {
        if (!this.map()) {
            return
        }
        this.map()?.zoomTo(this.zoom())
    })

    async ngAfterViewInit() {
        if (!this.divElement()) {
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 80))

        const element = this.divElement()!.nativeElement
        const { lat, lng } = this.coordinates()
        const map = new mapboxgl.Map({
            container: element,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: this.zoom(),
        })

        const marker = new mapboxgl.Marker({
            draggable: false,
            color: '#FF0000',
        })
            .setLngLat([lng, lat])
            .addTo(map)

        this.mapListeners(map)
    }

    mapListeners(map: mapboxgl.Map) {
        map.on('zoomend', (event) => {
            const newZoom = event.target.getZoom()
            this.zoom.set(newZoom)
        })

        map.on('moveend', (event) => {
            const center = event.target.getCenter()
            this.coordinates.set(center)
        })

        map.on('click', (event) => this.mapClick(event))

        map.addControl(new mapboxgl.FullscreenControl())
        map.addControl(new mapboxgl.NavigationControl())

        this.map.set(map)
    }

    mapClick(event: mapboxgl.MapMouseEvent) {
        if (!this.map()) {
            return
        }

        const map = this.map()!
        const { lng, lat } = event.lngLat
        const marker = new mapboxgl.Marker({
            draggable: true,
            color: '#FF0000',
        })
            .setLngLat([lng, lat])
            .addTo(map)

        const newMarker: Marker = {
            id: crypto.randomUUID(),
            mapboxMarker: marker,
        }

        this.markers.update((markers) => [newMarker, ...markers])
        console.log(this.markers())
    }
}
