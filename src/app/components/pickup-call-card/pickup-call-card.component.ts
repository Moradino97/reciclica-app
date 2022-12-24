import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent implements OnInit {

  @Input() hasHeader : boolean | undefined;
  @Input() hasFooter:boolean | undefined ;

  @Input() status:string | undefined;
  @Input() updatedAt:string | undefined;
  @Input() createdAt:string | undefined;
  @Input() notes: string | undefined;
  @Input() value: string | undefined;
  constructor() { }

  ngOnInit() {}

}
