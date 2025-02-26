import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/services/api-service.service';
import {StudentService} from 'src/app/services/student.service';

@Component({
    selector: 'app-my-preferences',
    templateUrl: './my-preferences.component.html',
    styleUrls: ['./my-preferences.component.css']
})

export class MyPreferencesComponent implements OnInit {
    constructor(
        private APIService: ApiService,
        private StudentService: StudentService
    ) {
    }

    projectList: any = []
    projectPreferenceList: any = []
    // selectedPreference = null
    infoMessage = ""
    projectStatus = ""
    // Define an array to capture user preferences
    userPreferences: any[] = [];
    duplicatePreferenceIndices: number[] = [];
    hasDuplicatePreference = false;

    getStudentProjectPreferenceList() {
        this.APIService.dashboardAPI()
            .subscribe((response: any) => {
                console.log(response);
                this.projectStatus = response?.data?.projectStatus || "";
                this.projectList = response.data.studentProjectPreference;
                this.initializeUserPreferences();
                // this.projectPreferenceList = response.data.projectPreference;
            })
    }

    initializeUserPreferences() {
        this.userPreferences = this.projectList.map((project: any) => {
            return {
                project: project,
                preferenceNumber: 1, // Set a default preference number
            };
        });

    }

    submitChoice() {
        // console.log(this.selectedPreference);
        const preferences = this.userPreferences.map((preference) => {
            return {
                project: preference.project._id,
                preferenceNumber: preference.preferenceNumber,
            };
        });

      const preferenceCounts = this.userPreferences.reduce((counts, preference) => {
        counts[preference.preferenceNumber] = (counts[preference.preferenceNumber] || 0) + 1;
        return counts;
      }, {});

      const duplicateIndices = this.userPreferences
        .map((preference, i) => preferenceCounts[preference.preferenceNumber] > 1 ? i : -1)
        .filter(i => i !== -1);

      if (duplicateIndices.length > 0) {
        this.hasDuplicatePreference = true;
        return;
      }

      // If no duplicates, proceed with submission logic
      this.hasDuplicatePreference = false;


        /*const preferences = this.projectList.map((project: { _id: any; preference: any; }) => {
          return {
            project: project._id,  // Assuming your project's MongoDB _id is used
            preferenceNumber: project.preference,
          };
        });*/
        this.StudentService.submitProjectPreferences(preferences)
            .subscribe((response: any) => {
                console.log(response);
                if (response?.status) {
                    this.infoMessage = "Preferences submitted successfully."
                }
                this.getStudentProjectPreferenceList()
            })
    }

  validatePreference(index: number) {
    const preferenceNumber = this.userPreferences[index].preferenceNumber;

    // Reset previous validation
    this.duplicatePreferenceIndices = [];
    this.hasDuplicatePreference = false;

    // Check for duplicate preference numbers
    const preferenceCounts = this.userPreferences.reduce((counts, preference) => {
      counts[preference.preferenceNumber] = (counts[preference.preferenceNumber] || 0) + 1;
      return counts;
    }, {});

    if (preferenceCounts[preferenceNumber] > 1) {
      this.duplicatePreferenceIndices = this.userPreferences
        .map((preference, i) => preference.preferenceNumber === preferenceNumber ? i : -1)
        .filter(i => i !== -1);

      this.hasDuplicatePreference = true;
    }
  }

    ngOnInit(): void {
        this.getStudentProjectPreferenceList()
    }
}
