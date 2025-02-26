import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-proposal',
  templateUrl: './project-proposal.component.html',
  styleUrls: ['./project-proposal.component.css']
})
export class ProjectProposalComponent implements OnInit {
  proposalForm: FormGroup;
  proposals: any[] = [];
  editMode = false;
  selectedProposalIndex: number = -1;
  successMessage: string = '';
  errorMessage: string = '';

  @ViewChild('confirmDialog') confirmDialogTemplate!: TemplateRef<any>;

  constructor(
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private apiService: ApiService
  ) {
    this.proposalForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      justification:  ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProposals();
  }

  proposeProject() {
    console.log(this.proposalForm.value);
    if(!this.editMode) {

      this.apiService.addNewProject(this.proposalForm.value)
        .subscribe((response: any) => {
            console.log(response);
            this.successMessage = 'Project proposal created successfully!';
            this.errorMessage = '';
            this.loadProposals()
          },
          error => {
            this.successMessage = '';
            this.errorMessage = 'Failed to create the project proposal. Please fill in all of the fields and try again';
          })
    }else{
      console.log(this.proposalForm.value)
      this.apiService.updateProject(this.proposalForm.value)
        .subscribe((response: any) => {
            console.log(response);
            this.successMessage = 'Project proposal updated successfully!';
            this.errorMessage = '';
            this.loadProposals()
          },
          error => {
            this.successMessage = '';
            this.errorMessage = 'Failed to update the project proposal. Please fill in all of the fields and try again';
          })
    }
  }

  loadProposals(): void {
    this.apiService.getProposals().subscribe((response: any) => {
      this.proposals = response.data;
      console.log(this.proposals)
    });
  }

  /*createOrUpdateProposal(): void {
    if (this.proposalForm.valid) {
      const proposalData = this.proposalForm.value;

      if (this.editMode) {
        // Update proposal
        this.apiService.updateProposal(this.selectedProposalIndex, proposalData).subscribe(() => {
          this.clearForm();
          this.loadProposals();
        });
      } else {
        // Create new proposal
        this.apiService.createProposal(proposalData).subscribe(() => {
          this.clearForm();
          this.loadProposals();
        });
      }
    }
  }*/

  editProposal(index: number): void {
    this.editMode = true;
    this.selectedProposalIndex = index;

    const selectedProposal = this.proposals[index];
    this.proposalForm.patchValue({
      _id : selectedProposal._id,
      title: selectedProposal.title,
      description: selectedProposal.description,
      justification: selectedProposal.justification,
      status: selectedProposal.status
    });
  }

  deleteProposal(index: number): void {
    this.selectedProposalIndex = index;

    const selectedProposal = this.proposals[index];
    this.proposalForm.patchValue({
      id: selectedProposal._id,
    });
  }

  openConfirmDialog(index: number) {
    const dialogRef = this.dialog.open(this.confirmDialogTemplate, {
      width: '250px', // Set the width according to your preference
      data: {
        index: index,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        this.deleteProposal(index);
      }
    });
  }

  prepareDelete(index: number) {
    // Store the index of the proposal to be deleted
   // this.proposalToDeleteIndex = index;

    // Trigger the confirm modal programmatically
   // $('#confirmModalButton').click();
  }

  confirmDelete() {
    // deleteProposal(index);

   // $('#confirmModal').modal('hide');
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedProposalIndex = -1;
    this.clearForm();
  }

  clearForm(): void {
    this.proposalForm.reset();
    this.editMode = false;
    this.selectedProposalIndex = -1;
    this.successMessage = '';
    this.errorMessage='';
  }
}
