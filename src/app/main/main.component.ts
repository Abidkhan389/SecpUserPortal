import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { topic } from './topics';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  @ViewChild('myTable') table: any;
  heading:'Main Page';
  subheading = '';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  rows: any[] = topic;
  count=topic.length
  tableParams= { start: 0, limit: 10, sort: '', order: 'ASC', search: null };;
  stateModel: {};
  constructor(private router :Router) { 
  }

  ngOnInit(): void {

  }

  viewDetail(row){
    this.router.navigate(['/presentation'])
  }


  resetTable() {
    this.tableParams.search = null;
  }

  onChangeLimit(limit) {
    this.table.offset = 0;
    this.tableParams.limit = limit;
    this.tableParams.start = 0;
  }

  onSort($event) {
    this.tableParams.sort = $event.column.prop;
    this.tableParams.order = $event.newValue;
    this.tableParams.start = 0;
  }


  setPage(params) {
    this.tableParams.start = params.offset != null ? params.offset : this.tableParams.start;
    this.tableParams.limit = params.limit != null ? params.limit : this.tableParams.limit;
    this.tableParams.sort = params.sortBy != null ? params.sortBy : this.tableParams.sort;
    this.tableParams.start = this.tableParams.start * params.pageSize;
  }

}
