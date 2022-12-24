import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {




  @Input() updatedAt:string | undefined;
  @Input() createdAt:string | undefined;
  @Input() notes: string | undefined;
  @Input() value: string | undefined;
  constructor(private router : Router) { }

  ngOnInit() {}

  goToPickUpCalls(){
    this.router.navigate(['pickup-calls']);
  }
}
