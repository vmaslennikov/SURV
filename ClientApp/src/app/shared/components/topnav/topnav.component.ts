import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'date-fns';
import { ErrormessageFormComponent } from 'src/app/pages/admin/errormessages/errormessage.component';

import { Person } from '../../Models/person';
import { Datastore } from '../../services/datastore.service';
import { Hrmonth } from './../../Models/hrmonth';
import { Hryear } from './../../Models/hryear';
import { ConstsService } from './../../services/consts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  public pushRightClass: string;
  public user: any;
  public yearNeedApprove: boolean;
  public monthNeedApprove: boolean;
  public yearId: string;
  public monthId: string;
  constructor(
    public router: Router,
    private translate: TranslateService,
    private consts: ConstsService,
    private datastore: Datastore,
    private dialogService: MatDialog,
    public  toastrService: ToastrService,
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd
        // && window.innerWidth <= 992
        && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  get cDate(): Date {
    const d = new Date();
    d.setDate(1);
    return d;
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.consts.HasUser.subscribe(
      auth => {
        if (auth === true) {
          this.user = this.consts.currentUser.User;
        }
      }
    );
    const d = this.cDate;
    const qMonth = {
      page: { size: 1, number: 1 },
      filter: { 'date': new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0) }
    };
    const qYear = {
      page: { size: 1, number: 1 },
      filter: { 'date': new Date(d.getFullYear(), 0, 1, 0, 0, 0) }
    };
    this.datastore.findAll(Hrmonth, qMonth, this.consts.noCacheHeaders).subscribe(r => {
      const items = r.getModels();
      this.monthNeedApprove = items.length === 0;
      this.monthId = items.length > 0 ? items[0].id : null;
    });
    this.datastore.findAll(Hryear, qYear, this.consts.noCacheHeaders).subscribe(r => {
      const items = r.getModels();
      this.yearNeedApprove = items.length === 0;
      this.yearId = items.length > 0 ? items[0].id : null;
    });
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  addSupportMessage() {
    this.dialogService.open(ErrormessageFormComponent);
  }

  approveMonth() {
    if (!this.monthId) {
      const d = this.cDate;
      const item = this.datastore.createRecord(Hrmonth);
      item.active = true;
      item.date = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0);
      item.title = format(item.date , 'YYYY.MM.DD');
      item.approveDate = new Date();
      this.datastore.findRecord(Person, this.consts.currentUserId.toString()).subscribe(
        (p: Person) => {
          item.approveperson = this.datastore.peekRecord(Person, this.consts.currentUserId.toString());
          item.save({include: 'approveperson'}).subscribe(
            (data) => {
              this.monthNeedApprove = false;
              // console.log(post);
              this.showToast('Месяц подтвержден.');
            },
          );
        }
      );
    }
  }

  approveYear() {
    if (!this.yearId) {
      const item = this.datastore.createRecord(Hryear);
      item.active = true;
      item.date = new Date(this.cDate.getFullYear(), 0, 1, 0, 0, 0);
      item.title = format(item.date , 'YYYY год');
      item.approveDate = new Date();
      this.datastore.findRecord(Person, this.consts.currentUserId.toString()).subscribe(
        (p: Person) => {
          item.approveperson = this.datastore.peekRecord(Person, this.consts.currentUserId.toString());
          item.save({include: 'approveperson'}).subscribe(
            (data) => {
              this.yearNeedApprove = false;
              // console.log(post);
              this.showToast('Год подтвержден.');
            },
          );
        }
      );
    }
  }

  showToast(message: string,
    position = 'top-right',
    status = 'Success') {
    this.toastrService.info(message, `Информационное сообщение`);
  }
}
