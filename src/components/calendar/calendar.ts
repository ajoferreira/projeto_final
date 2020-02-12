import { Component, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
    selector: 'ion-calendar',
    template: `
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col col-auto (click)="back()">
                <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            </ion-col>
            <ion-col col-auto>
                <div>{{displayYear}} / {{displayMonth + 1}} </div>
            </ion-col>
            <ion-col col-auto (click)="forward()">
                <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col class="center calendar-header-col" *ngFor="let head of weekHead">{{head}}</ion-col>
        </ion-row>

        <ion-row class="calendar-row" *ngFor="let week of weekArray;let i = index">
            <ion-col class="center calendar-col" (click)="daySelect(day,i,j)" 
            *ngFor="let day of week;let j = index" 
            [ngClass]="[day.isThisMonth?'this-month':'not-this-month',day.isToday?'today':'',day.isSelect?'select':'']">
                {{day.date}}
            </ion-col>
        </ion-row>

    </ion-grid>
`
})

export class Calendar {

    @Output() onDaySelect = new EventEmitter<dateObj>();

    currentYear: number;

    currentMonth: number;

    currentDate: number;

    currentDay: number;

    displayYear: number;

    displayMonth: number;

    dateArray: Array<dateObj> = []; // Matriz de todos os dias mostrados neste mês

    weekArray = [];// Matriz segurando cada linha do calendário

    lastSelect: number = 0; // Acompanhe onde você clicou pela última vez

    // weekHead: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    weekHead: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];


    constructor() {
        this.currentYear = moment().year();
        this.currentMonth = moment().month();
        this.currentDate = moment().date();
        this.currentDay = moment().day();
    }

    ngOnInit() {
        this.today()
    }

    // Ir para hoje
    today() {
        this.displayYear = this.currentYear;
        this.displayMonth = this.currentMonth;
        this.createMonth(this.currentYear, this.currentMonth);

        // Marcar hoje como selecionado
        let todayIndex = _.findIndex(this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true
        })
        this.lastSelect = todayIndex;
        this.dateArray[todayIndex].isSelect = true;

        this.onDaySelect.emit(this.dateArray[todayIndex]);
    }

    createMonth(year: number, month: number) {
        this.dateArray = [];// Limpar dados do mês passado
        this.weekArray = [];// Limpar Dados
        let firstDay;// O dia da semana no dia 1º do mês está atualmente selecionado, o que determina quantos dias deve demorar no mês passado. O domingo não mostra o último mês, a segunda mostra o dia do mês anterior e a terça mostra os dois últimos dias do mês
        let preMonthDays;// Dias do mês passado
        let monthDays;// Dias do mês
        let weekDays: Array<dateObj> = [];

        firstDay = moment({ year: year, month: month, date: 1 }).day();
        // Dias do mês passado
        if (month === 0) {
            preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
        } else {
            preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
        }
        // Dias do mês
        monthDays = moment({ year: year, month: month }).daysInMonth();

        // Adicionar os últimos dias do mês passado à matriz
        if (firstDay !== 7) { //Domingo sem mostrar no mês passado
            let lastMonthStart = preMonthDays - firstDay + 1;// Desde o último dia do mês passado
            for (let i = 0; i < firstDay; i++) {
                if (month === 0) {
                    this.dateArray.push({
                        year: year,
                        month: 11,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                } else {
                    this.dateArray.push({
                        year: year,
                        month: month - 1,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                }

            }
        }

        // Adicione dias do mês à matriz
        for (let i = 0; i < monthDays; i++) {
            this.dateArray.push({
                year: year,
                month: month,
                date: i + 1,
                isThisMonth: true,
                isToday: false,
                isSelect: false,
            })
        }

        if (this.currentYear === year && this.currentMonth === month) {
            let todayIndex = _.findIndex(this.dateArray, {
                year: this.currentYear,
                month: this.currentMonth,
                date: this.currentDate,
                isThisMonth: true
            })
            this.dateArray[todayIndex].isToday = true;
        }

        // Adicione o número de dias no próximo mês à matriz, alguns meses mostram 6 semanas e alguns meses mostram 5 semanas
        if (this.dateArray.length % 7 !== 0) {
            let nextMonthAdd = 7 - this.dateArray.length % 7
            for (let i = 0; i < nextMonthAdd; i++) {
                if (month === 11) {
                    this.dateArray.push({
                        year: year,
                        month: 0,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                } else {
                    this.dateArray.push({
                        year: year,
                        month: month + 1,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                }

            }
        }

        // Até agora, todos os dados de data foram adicionados à matriz dateArray

        // Inserir dados da data na nova matriz a cada 7 dias
        for (let i = 0; i < this.dateArray.length / 7; i++) {
            for (let j = 0; j < 7; j++) {
                weekDays.push(this.dateArray[i * 7 + j]);
            }
            this.weekArray.push(weekDays);
            weekDays = [];
        }
    }

    back() {
        // Lidando com questões de ano novo
        if (this.displayMonth === 0) {
            this.displayYear--;
            this.displayMonth = 11;
        } else {
            this.displayMonth--;
        }
        this.createMonth(this.displayYear, this.displayMonth);
    }

    forward() {
        // Lidando com questões de ano novo
        if (this.displayMonth === 11) {
            this.displayYear++;
            this.displayMonth = 0;
        } else {
            this.displayMonth++;
        }
        this.createMonth(this.displayYear, this.displayMonth);
    }

    // Selecione uma data e clique no evento
    daySelect(day, i, j) {
        // Primeiro limpe o status do último clique
        this.dateArray[this.lastSelect].isSelect = false;
        // Salvar este item clicado
        this.lastSelect = i * 7 + j;
        this.dateArray[i * 7 + j].isSelect = true;

        this.onDaySelect.emit(day);
    }
}

// Cada quadrado do calendário
interface dateObj {
    year: number,
    month: number,
    date: number,// What number
    isThisMonth: boolean,// Se é o mês atualmente selecionado
    isToday?: boolean,
    isSelect?: boolean,
}