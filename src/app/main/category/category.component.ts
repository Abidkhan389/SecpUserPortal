import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent extends DropDownUtils implements OnInit {
  categoryArr: any[] = [];

  constructor(protected lookupService: LookUpService, protected router: Router) {
    super(lookupService, router)
    this.GetAllCategories(data => this.categoryArr = data);
  
  }

  ngOnInit(): void {
  }
}
