import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() totalCount;
  @Input() pageSize;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {
    this.totalCount =0;
    this.pageSize =0;
   }

  ngOnInit(): void {
  }

  onPagerChange(event:any)
  {
    this.pageChanged.emit(event);
  }

}
