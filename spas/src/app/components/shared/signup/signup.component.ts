import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

interface SignUpInterface {
  name: string,
  email: string,
  password: string,
  userType: string,
  rollno?: string,
  errorMessage?: string,
  successMessage?: string,
}

@Component({
  selector: 'app-student-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {
  }

  signupData: SignUpInterface = {
    name: "",
    email: "",
    password: "",
    userType: "student",
    rollno: "",
    errorMessage: "",
    successMessage: "",
  }

  signup() {
    console.log(this.signupData);
    // return
    const payload = {...this.signupData};

    if (payload.userType === "supervisor") {
      delete payload.rollno;
    }
    console.log(payload);

    this.signupData.errorMessage = ""
    this.AuthService.signupAPI(payload)
      .subscribe((response: any) => {
        console.log(response);
        if (response && response.status === "created") {
          localStorage.setItem("token", response.token);
          if (payload.userType === "supervisor") {
            localStorage.setItem("isUserSupervisor", "true");
          } else if (payload.userType === "student") {
            localStorage.setItem("isUserStudent", "true");
          }
          localStorage.setItem("data", JSON.stringify(response?.data || {}));
          this.signupData.successMessage = "User created successfully."

          setTimeout(() => {
            this.router.navigate(["/"])
          }, 1500);
        }
      }, (error) => {
        console.log(error);
        if (error.status) {
          this.signupData.errorMessage = "Something went wrong."
        }
      })
  }

  ngOnInit(): void {
  }
}
