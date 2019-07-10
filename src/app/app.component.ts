import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';
import { ProgressService } from './services/progress.service';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GAIA';
    progress: boolean = false;
    mostrarMenu: boolean = false;
    admin: boolean = false;
    usuario: any = {};
    notifications: Array<any> = [];
    notifyUser: boolean = false;
    activeNots: number;

    constructor(
        private authService: AuthServiceService,
        private authIn: AuthInComponent,
        private progressServ: ProgressService,
        private router: Router,
        private notification: NotificationService
    ) { }

    ngOnInit() {
        this.authService.mostrarMenuEmitter.subscribe(
            res => {
                this.mostrarMenu = res;
                this.usuario = this.authService.getUser();
                this.fetchNot();
                setInterval(() => {
                    this.fetchNot();
                }, 10000);
            }
        );
        this.progressServ.progressEmitter.subscribe(res => {
            this.progress = res;
        });
    }

    fetchNot() {
        this.activeNots = 0;
        this.notification.listar(this.usuario._id)
            .subscribe(
                (nots: Array<any>) => {
                    this.notifications = nots.sort(
                        (a, b) => {
                            const aT = new Date(a.date).getTime();
                            const bT = new Date(b.date).getTime();
                            if (aT > bT) {
                                return -1;
                            }
                            if (aT < bT) {
                                return 1;
                            }
                            return 0;
                        }
                    );
                    if (this.notifications.length < 1) this.notifyUser = false;
                    this.notifications.forEach(not => {
                        if (not.state == 'created') this.activeNots ++;
                    })
                },
                err => console.error(err)
            );
    }

    logOut() {
        this.authIn.logOut();
    }

    feedback() {
        if (this.usuario.admin) {
            this.router.navigate(['feedbacks']);
        } else this.router.navigate(['feedback']);
    }

    notifyToggle() {
        this.notifyUser = !this.notifyUser;
    }

    readNot(list) {
        const send = { ids: list };
        this.notification.ler(send)
            .subscribe(
                res => this.fetchNot(),
                err => console.log(err)
            );
    }

    clearNots() {
        this.notifications.forEach(
            not => {
                this.deleteNot(not._id)
            }
        )
    }

    deleteNot(id: string, event?: Event) {
        if(event) event.cancelBubble = true;
        this.notification.apagar(id)
            .subscribe(
                res => {
                    this.fetchNot();
                },
                err => console.log(err)
            );
    }
}
