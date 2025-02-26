import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string = "Student Project Allocation System";

    constructor(
        private router: Router
    ) {
    }

    userData: any = {}

    logout() {
        localStorage.clear()
        this.router.navigate(["/"])
    }

    ngOnInit(): void {
        let data: string = localStorage.getItem("data") || "";
        this.userData = JSON.parse(data);
    }
}
