import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {LoggingService, LogLevel} from "../../../services/logging.service";

@Component({
    selector: 'app-student-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private AuthService: AuthService,
        private LoggingService : LoggingService,
        private router: Router
    ) {
    }

    loginData = {
        email: "",
        password: "",
        errorMessage: ""
    }

    login() {
        console.log(this.loginData);
        this.LoggingService.log(this.loginData.email, LogLevel.Debug);
        this.loginData.errorMessage = ""
        this.AuthService.loginAPI(this.loginData)
            .subscribe((response: any) => {
                console.log(response);
                if (response && response.status === "success") {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("data", JSON.stringify(response?.data || {}));

                    if (response.data.userType === "admin") {
                        console.log("Admin user logged in")
                        localStorage.setItem("isAdmin", "true");
                    } else if  (response.data.userType === "student"){
                      console.log("Student logged in")
                        localStorage.setItem("isUserStudent", "true");
                    } else if  (response.data.userType === "supervisor"){
                      // lecturer
                      console.log("Supervisor logged in")
                      localStorage.setItem("isUserSupervisor", "true");
                    }


                    setTimeout(() => {
                        this.router.navigate(["/project-list-view"])
                    }, 200);
                }
            }, (error) => {
                console.log(error);
                if (error.status) {
                    this.loginData.errorMessage = "Details entered are incomplete or incorrect";
                }
            })
    }

    ngOnInit(): void {
    }
}
