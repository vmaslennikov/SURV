import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-managmenttabel',
  templateUrl: './managmenttabel.component.html',
  styleUrls: ['./managmenttabel.component.scss']
})
export class ManagmenttabelComponent implements OnInit {

  personId: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) {
    route.params.subscribe(({ id }) => {
      this.personId = id;
    });
  }

  ngOnInit() {
  }

}
