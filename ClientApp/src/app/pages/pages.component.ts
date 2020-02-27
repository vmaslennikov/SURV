import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_HR, MENU_ITEMS_COORDINATOR, MENU_ITEMS_USER, MENU_ITEMS_PM } from './pages-menu';
import { ConstsService } from '../shared/services/consts.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public consts: ConstsService) { }
  navItems: any[];

  config: any = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: '',
    // listBackgroundColor: `rgb(208, 241, 239)`,
    // fontColor: `rgb(8, 54, 71)`,
    // backgroundColor: `rgb(208, 241, 239)`,
    // selectedListFontColor: `red`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
  };

  ngOnInit() {
    const isAdmin = this.consts.IsAdmin;
    const isHR = this.consts.IsHr;
    const isPM = this.consts.IsPM;
    const isCoordinator = this.consts.IsCoordinator;
    const isManager = this.consts.IsManager || this.consts.IsBoss;
    const item = {
      label: 'Табели подчиненных',
      // icon: 'nb-home',
      link: '/pages/managment',
      items: []
    };
    const repItem = {
      label: 'Отчеты',
      link: '/pages/reports',
    };
    const pmItem = {
      label: 'Проекты',
      link: '/pages/pm',
    };
    const hrItem = {
      label: 'HR',
      // icon: 'nb-menu',
      items: [
        {
          label: 'Персональный календарь',
          link: '/pages/usercalendars',
        },
        {
          label: 'Календарь рабочих дней',
          link: '/pages/workdayscalendar',
        },
        {
          label: 'Подтверджение года',
          link: '/pages/hryears',
        },
        {
          label: 'Подтверджение месяца',
          link: '/pages/hrmonths',
        },
      ],
    };

    let m = [];
    if (isAdmin) {
      this.navItems = MENU_ITEMS;
      return;
    } else if (isHR) {
      m = MENU_ITEMS_HR;
      if (isManager) { m.splice(3, 0, item); }
      if (isCoordinator) { m.push(repItem); }
      if (isPM) { m.push(pmItem); }
    } else if (isCoordinator) {
      m = MENU_ITEMS_COORDINATOR;
      if (isManager) { m.splice(3, 0, item); }
      if (isHR) { m.push(hrItem); }
      if (isPM) { m.push(pmItem); }
    } else if (isPM) {
      m = MENU_ITEMS_PM;
      if (isManager) { m.splice(3, 0, item); }
      if (isHR) { m.push(hrItem); }
      if (isCoordinator) { m.push(repItem); }
    } else {
      m = MENU_ITEMS_USER;
      if (isManager) { m.splice(3, 0, item); }
      if (isPM) { m.push(pmItem); }
    }
    this.navItems = m;
  }
}
