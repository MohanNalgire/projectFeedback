import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/login/user.interface';
import { UtilService } from 'src/app/utils.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projectFeedbackList = [];
  projectFeedbackCols: string[];

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  allProjects;
  allUsers;
  mySubscription: any;

  constructor(
    private projectService: ProjectService,
    private utilService: UtilService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjectFeedback().subscribe(
      (feedbacks: any) => {
        console.log('getAllProjectFeedback data', feedbacks);

        forkJoin([
          this.authService.getAllUsers(),
          this.projectService.getProjects(),
        ]).subscribe((data) => {
          this.allUsers = data[0];
          this.allProjects = data[1];
          // console.log('forkjoin data', data, this.allUsers, this.allProjects);

          feedbacks.map((feedback) => {
            const userName = this.allUsers.filter(
              (e) => e.id === feedback.userId
            )[0]?.name;
            const projectName = this.allProjects.filter(
              (e) => e.id === feedback.projectId
            )[0]?.name;

            this.projectFeedbackList.push({
              id: feedback.id,
              user: userName,
              project: projectName,
              feedback: feedback.feedback,
            });
          });

          this.projectFeedbackCols = this.utilService.nestedObjectKeys(
            this.projectFeedbackList[0]
          );
        });
      },
      (error) => console.error('getAllProjectFeedback', error),
      () => console.info('getAllProjectFeedback completed')
    );
  }

  feedbackEdit(feedbackId) {
    this.projectService.editFeedback(feedbackId);
  }
  feedbackDelete(feedbackId) {
    this.projectService.deleteFeedback(feedbackId).subscribe((data) => {
      if (data?.status === 200 && data?.ok === true) {
        this.router.navigate([this.router.url]);
      }
    });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
