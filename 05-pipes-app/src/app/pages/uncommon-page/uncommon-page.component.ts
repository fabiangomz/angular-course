import { Component, signal } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import {
    AsyncPipe,
    I18nPluralPipe,
    I18nSelectPipe,
    JsonPipe,
    KeyValuePipe,
    SlicePipe,
} from '@angular/common'

const client1 = {
    name: 'Fabian',
    gender: 'male',
    age: 27,
    address: 'salamanca',
}

const client2 = {
    name: 'Ana',
    gender: 'female',
    age: 25,
    address: 'salamanca',
}

@Component({
    selector: 'app-uncommon-page',
    imports: [
        CardComponent,
        I18nSelectPipe,
        I18nPluralPipe,
        SlicePipe,
        JsonPipe,
        KeyValuePipe,
        AsyncPipe,
    ],
    templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
    profile = {
        name: 'Fabian',
        gender: 25,
        address: 'salamanca',
    }

    promiseValue: Promise<string> = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hola mundo')
        }, 3000)
    })

    client = signal(client1)

    invitationMap = {
        male: 'invitarlo',
        female: 'invitarla',
    }

    clientsMap = signal({
        '=0': 'no tenemos clientes esperando',
        '=1': 'tenemos un cliente esperando',
        other: 'tenemos # clientes esperando',
    })

    changeClient() {
        this.client.set(this.client() === client1 ? client2 : client1)
    }

    clients = signal(['Maria', 'Pedro', 'Juan', 'Ana'])

    deleteClient() {
        this.clients.set(this.clients().slice(0, -1))
    }
}
