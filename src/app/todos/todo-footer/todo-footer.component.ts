import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actionsFiltro from 'src/app/filtro/filtro.actions';
import * as actionsTodo from 'src/app/todos/todo.actions'

@Component({
    selector: 'app-todo-footer',
    templateUrl: './todo-footer.component.html',
    styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

    filtroActual: actionsFiltro.filtrosValidos = 'todos';
    filtros: actionsFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
    pendientes: number = 0;
    // o

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.subscribe(state => {
            this.filtroActual = state.filtro;
            this.pendientes = state.todos.filter(todo => !todo.completado).length;
        })
    }

    cambiarFiltro(filtro: actionsFiltro.filtrosValidos) {
        // Esto es igual a lo de abajo
        // this.store.dispatch(actions.setFiltro({filtro: filtro}))
        this.store.dispatch(actionsFiltro.setFiltro({ filtro }))
    }

    limpiarCompletados(){
        if (this.pendientes > 0) {
            this.store.dispatch(actionsTodo.limpiarCompletados());
        }
    }

}
