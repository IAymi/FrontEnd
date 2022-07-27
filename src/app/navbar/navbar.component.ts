import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() menuCollapse:boolean = false
  @Output() menuCollapseChange = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  collapse():void{
    this.menuCollapse = !this.menuCollapse
    this.menuCollapseChange.emit(this.menuCollapse)
  }
}
