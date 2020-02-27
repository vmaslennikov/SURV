import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup, MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { addMonths, format } from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/shared/Models/company';
import { Person } from 'src/app/shared/Models/person';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { DatasourcesService } from 'src/app/shared/services/datasources.service';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { Tabel } from 'src/app/shared/Models/tabel';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'ngx-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.scss']
})
export class ManagmentComponent implements OnInit {
  get Year() {
    return this.consts.Year;
  }
  get Month() {
    return this.consts.Month;
  }
  get Company() {
    return this.consts.CompanyId;
  }
  get Person() {
    return this.consts.currentUser.User.Id;
  }
  public sortProps: any = ['fullName'];
  public items: any[];
  public loading = false;

  treeControl = new NestedTreeControl<any>(node => node.children);
  dsTree = new MatTreeNestedDataSource<any>();

  userDataTree: TreeNode[] = [];

  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;
  @ViewChild('monthsTabGroup') monthsTabGroup: MatTabGroup;
  @ViewChild('companiesTabGroup') companiesTabGroup: MatTabGroup;
  @ViewChild('tree') tree;

  Years: any[] = Array.from({ length: 12 }, (x, i) => {
    const temp = 2010 + i;
    return { title: temp, active: temp === this.consts.Year };
  });
  Months: any[] = Array.from({ length: 12 }, (x, i) => {
    return {
      title: i,
      // active: i == (this.consts.Month - 1),
      name: format(new Date(this.Year, i), 'MMMM', { locale: ruLocale })
    };
  });
  Companies: Company[] = [];
  Users: Person[] = [];
  Tabels: Tabel[] = [];
  treeList: any[];

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0

  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.getItems(1);
  }
  setMonth(index: number) {
    this.consts.Month = parseInt(this.Months[index].title, 10) + 1;
    this.getItems(1);
  }
  setCompany(index: number) {
    this.consts.CompanyId = this.Companies[index].Id;
    this.getItems(1);
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public datastore: Datastore,
    public datasource: DatasourcesService,
    public toastrService: ToastrService,
    public consts: ConstsService
  ) {}

  ngOnInit() {
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(
      o => o.title === this.consts.Year
    );
    this.monthsTabGroup.selectedIndex = this.Months.findIndex(
      o => o.title === this.consts.Month - 1
    );
    this.Companies = this.consts.Companies;
    if (this.consts.CompanyId) {
      this.companiesTabGroup.selectedIndex = this.Companies.findIndex(
        o => o.Id === this.consts.CompanyId
      );
    }
    this.getItems(1);
    // this.onResize();
  }

  getModel() {
    return Person;
  }

  getQueryParams(page: number): any {
    const dt = new Date(this.Year, this.Month - 1, 1);
    return {
      sort: this.sortProps,
      page: { size: 1000, number: page },
      include: 'manager,companies'
    };
  }

  getItems(page: number) {
    this.dsTree.data = [];
    this.items = [];
    this.Tabels = [];
    this.treeList = [];
    if (this.Users.length) {
      this.fillProperties();
    } else {
      this.datastore
        .findAll(
          this.getModel(),
          this.getQueryParams(page),
          this.consts.noCacheHeaders
        )
        .subscribe(
          (items: JsonApiQueryData<Person>) => {
            this.Users = items.getModels();
            this.fillProperties();
            this.loading = false;
          },
          (error): void => {
            this.loading = false;
          }
        );
    }
  }

  fillProperties() {
    const dt = new Date(this.Year, this.Month - 1);
    const dt2 = addMonths(dt, 1);
    const minDate = new Date('1970-01-01T00:00:00');
    const allPersons = this.Users;
    this.items = this.Users.filter(o => {
      const correct =
        o.ddateFrom < dt2 &&
        (!o.ddateTill || (o.ddateTill && o.ddateTill > dt));
      if (!correct) {
        const temp = allPersons.filter(p => p.manager && p.manager.id === o.id);
        if (temp.length > 0) {
          const temp2 = temp.filter(p => p.manager && p.manager.id === o.id);
          if (
            temp2.filter(
              p2 =>
                p2.ddateFrom < dt2 &&
                (!p2.ddateTill || (p2.ddateTill && p2.ddateTill > dt))
            ).length > 0
          ) {
            return true;
          }
        }
      }
      return correct;
    });

    this.treeList = this.list_to_tree(this.items).filter(
      o => o.companies.filter(c => c.id === this.Company.toString()).length > 0
    );
    this.userDataTree = [];
    for (let index = 0; index < this.treeList.length; index++) {
      const element = this.treeList[index];
      this.userDataTree.push(this.createNode(element));
    }
    // this.treeControl.dataNodes = treeList;
    // this.dsTree.data = treeList;
    // console.log(JSON.stringify(this.dataSource.data));
    // this.total_records = this.items.length;
    this.datastore
      .findAll(
        Tabel,
        {
          // sort: this.sortProps,
          // page: { size: 500, number: 1 },
          include: 'person,company',
          // ,services,services.service,services.project,services.hours',
          filter: {
            'company.id': this.Company,
            year: this.Year,
            month: this.Month
          }
          // &filter[company.id]=eq:1&filter[person.id]=eq:232&filter[year]=eq:2012&filter[month]=eq:10&
        },
        this.consts.noCacheHeaders
      )
      .subscribe(
        (jtabels: JsonApiQueryData<Tabel>) => {
          this.Tabels = jtabels.getModels();
          this.loading = false;
          this.treeControl.dataNodes = this.treeList;
          this.dsTree.data = this.treeList;
        },
        (error): void => {
          this.loading = false;
        }
      );
  }

  createNode(o) {
    const t = {
      data: {
        Id: o.id,
        fullName: o.fullName,
        created: false,
        filled: false,
        approved: false
      },
      children: [],
      leaf: o.children.length === 0,
      expanded: true
    };
    for (let index = 0; index < o.children.length; index++) {
      const element = o.children[index];
      t.children.push(this.createNode(element));
    }
    return t;
  }

  list_to_tree(list: any[]) {
    const map = {},
      roots = [],
      cList = {};
    let node: { manager: { id: string | number } }, i: number;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      const c01 = node['companies'].map(o => o.id);
      if (node.manager) {
        // if you have dangling branches check that map[node.parentId] exists
        // if (!list[map[node.manager.id]].children) {
        //   list[map[node.manager.id]].children = [];
        // }
        const c02 = node.manager['companies'].map(o => o.id);
        const difference = c01.filter(x => !c02.includes(x));
        difference.forEach(o => {
          if (!cList[o]) {
            cList[o] = [];
          }
          cList[o].push(node);
        });
        list[map[node.manager.id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    // fix: сотудники, состоящие в 2х компаниях, но их руководитель  только в 1.
    roots.forEach(r => {
      const temp = r.companies.map(o => o.id);
      temp.forEach(element => {
        cList[element].forEach(e => {
          const clone = {};
          clone['id'] = e.id;
          clone['fullName'] = e.fullName;
          clone['companies'] = e.companies;
          clone['children'] = [];
          r.children.push(clone);
        });
      });
    });
    if (this.consts.IsAdmin || this.consts.IsBoss) {
      return roots;
    } else {
      return [list[map[this.consts.currentUserId]]];
    }
  }
  getTabelInfoClass(pId, type) {
    const pTabels = this.Tabels.filter(t => t.person && t.person.id === pId);
    switch (type) {
      case 1:
        return pTabels && pTabels.length > 0 ? 't-yes' : 't-no';
        break;
      case 2:
        return pTabels && pTabels.length > 0 && pTabels[0].fill
          ? 't-yes'
          : 't-no';
        break;
      case 3:
        return pTabels && pTabels.length > 0 && pTabels[0].approve
          ? 't-yes'
          : 't-no';
        break;
      default:
        break;
    }
  }
  getTabelInfo2(pId, type) {
    const pTabels = this.Tabels.filter(t => t.person && t.person.id === pId);
    switch (type) {
      case 1:
        return pTabels && pTabels.length > 0
          ? '<span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true" style="color:green">add_circle</span>'
          : '<span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true" style="color:red">remove_circle</span>';
        break;
      case 2:
        return pTabels && pTabels.length > 0 && pTabels[0].fill
          ? '<span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true" style="color:green">add_circle</span>'
          : '<span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true" style="color:red">remove_circle</span>';
        break;
      case 3:
        return pTabels && pTabels.length > 0 && pTabels[0].approve
          ? '<span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true" style="color:green">add_circle</span>'
          : '<span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true" style="color:red">remove_circle</span>';
        break;
      default:
        break;
    }
  }
  getTabelInfo(p: Person) {
    // <mat-icon _ngcontent-c10="" class="mat-icon material-icons" role="img" aria-hidden="true">chevron_right</mat-icon>
    const pTabels = this.Tabels.filter(t => t.person && t.person.id === p.id);
    if (pTabels && pTabels.length > 0) {
      const pTabel = pTabels[0];
      return [
        'Создан: <span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true">add</span>',
        'Заполнен: ' +
          (pTabel.fill
            ? '<span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true">add</span>'
            : '<span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true">remove</span>'),
        'Согласован: ' +
          (pTabel.approve
            ? '<span class="mat-icon material-icons mat-icon-add" role="img" aria-hidden="true">add</span>'
            : '<span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true">remove</span>')
      ].join(', ');
    }
    return [
      'Создан: <span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true">remove</span>',
      'Заполнен: <span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true">remove</span>',
      'Согласован: <span class="mat-icon material-icons mat-icon-remove" role="img" aria-hidden="true">remove</span>'
    ].join(', ');
  }

  openTabel(id: string) {
    if (id) {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }

  exapandORcollapse(nodes, eOc: boolean) {
    // nodes.forEach(node => {
    //   this.expandChildren(node);
    // });
    nodes.forEach(node => {
      this.expandRecursive(node, eOc);
    });
  }

  expandChildren(node: TreeNode) {
    if (node.children) {
      node.expanded = true;
      for (const cn of node.children) {
        this.expandChildren(cn);
      }
    }
  }

  // expandAll() {
  //   this.filesTree6.forEach(node => {
  //     this.expandRecursive(node, true);
  //   });
  // }

  // collapseAll() {
  //   this.filesTree6.forEach(node => {
  //     this.expandRecursive(node, false);
  //   });
  // }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    node['selected'] = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

}
