import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { projectFeedback } from '../projectFeedback';

@Component({
  selector: 'app-project-feedback',
  templateUrl: './project-feedback.component.html',
  styleUrls: ['./project-feedback.component.css'],
})
export class ProjectFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  currentRate = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  feedbackId: number;
  currentFeedback: projectFeedback;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  projectList = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.feedbackId = params['id'];
    });

    this.projectService
      .getProjectFeedbackUserId(this.feedbackId)
      .subscribe((feedback: any) => {
        this.currentFeedback = feedback;
      });

    const user = JSON.parse(sessionStorage.getItem('loginUser'));
    const userName = user[0].name;
    const userId = this.currentFeedback.userId ?? user[0].id;
    const project = this.currentFeedback.projectId ?? null;
    this.feedbackForm = this.formBuilder.group({
      employeeName: [userName, Validators.required],
      employeeNumber: [userId, Validators.required],
      employeeProject: [project, Validators.required],
      employeeComments: ['', Validators.required],
    });

    this.getProjectList();
  }

  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(
      (projects: any) => {
        console.log('Projects data--->', projects);
        this.projectList = projects;
      },
      (error) => {
        console.error('Error in projects service', error);
      },
      () => {
        console.info('All projects get getched');
      }
    );
  }
  feedback() {
    /**
     *     {
      "id": 2,
      "projectId": 2,
      "userId": 2,
      "feedback": {
        "rating": 4,
        "comments": "fsdcsdfdsfsdfs"
      }
    }
     */
    const feedback = {
      projectId: parseInt(this.feedbackForm.value.employeeProject, 10),
      userId: this.feedbackForm.value.employeeNumber,
      feedback: {
        rating: this.selectedValue,
        comments: this.feedbackForm.value.employeeComments,
      },
    };

    this.projectService.addEditProjectFeedback(feedback).subscribe((data) => {
      console.info('Feedback creation status :', data);
      this.router.navigate(['/project/projectList']);
    });
  }
}
