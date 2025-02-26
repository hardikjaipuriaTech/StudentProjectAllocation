import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas
    ) { }

  headerData: any = {}
  isAdmin = localStorage.getItem("isAdmin") ? true : false;
  isUserStudent = localStorage.getItem("isUserStudent") ? true : false;
  isUserSupervisor = localStorage.getItem("isUserSupervisor") ? true : false;

  logout(){
    localStorage.clear()
    this.router.navigate(["/"])
  }

  openMenu(content: any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}

  ngOnInit(): void {
    let data: string = localStorage.getItem("data") || "";
    this.headerData = JSON.parse(data);
  }
}
