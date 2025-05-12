import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface Prize {
  discount: string;
  category: string;
}

@Component({
  selector: 'app-spin-win',
  templateUrl: './scratch-win.component.html',
  styleUrls: ['./scratch-win.component.css'],
  animations: [
    trigger('spinWheel', [
      state('spinning', style({
        transform: 'rotate({{degrees}}deg)'
      }), { params: { degrees: 0 } }),
      state('stopped', style({
        transform: 'rotate({{degrees}}deg)'
      }), { params: { degrees: 0 } }),
      transition('* => *', animate('3s ease-out'))
    ])
  ]
})
export class SpinWinComponent implements OnInit {
  isSpinning = false;
  currentRotation = 0;
  winningPrize: Prize | null = null;
  discountCode: string = '';
  
  prizes: Prize[] = [
    { discount: '50% OFF', category: 'FLIGHT' },
    { discount: '30% OFF', category: 'STORE' },
    { discount: '40% OFF', category: 'HOTEL' },
    { discount: '20% OFF', category: 'FLIGHT' },
    { discount: 'TRY AGAIN', category: 'STORE' },
    { discount: '25% OFF', category: 'HOTEL' }
  ];

  constructor() { }

  ngOnInit(): void { }

  spin(): void {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    this.winningPrize = null;
    this.discountCode = '';

    // Get current rotation normalized to 360 degrees
    const currentAbsoluteRotation = this.currentRotation % 360;
    
    // Random number of full rotations (8-12) for dramatic effect
    const fullRotations = Math.floor(Math.random() * 5) + 8;
    
    // Random prize selection (0-5)
    const prizeIndex = Math.floor(Math.random() * this.prizes.length);
    
    // Calculate the target angle for the selected prize
    // Each section is 60 degrees (360/6)
    // We add 30 degrees to point to the center of the section
    const targetAngle = (prizeIndex * 60) + 30;
    
    // Calculate the shortest rotation to reach the target
    let finalRotation = (fullRotations * 360) + targetAngle - currentAbsoluteRotation;
    
    // Ensure we always rotate clockwise
    if (finalRotation < 0) {
      finalRotation += 360;
    }
    
    // Update the wheel rotation
    this.currentRotation += finalRotation;

    setTimeout(() => {
      this.isSpinning = false;
      this.winningPrize = this.prizes[prizeIndex];
      if (this.winningPrize.discount !== 'TRY AGAIN') {
        this.generateDiscountCode();
      }
    }, 3100);
  }

  private generateDiscountCode(): void {
    let prefix = 'SAVE';
    const discountValue = this.winningPrize?.discount || '';
    if (discountValue.includes('20%')) {
      prefix = 'SAVE20';
    } else if (discountValue.includes('30%')) {
      prefix = 'SAVE30';
    } else if (discountValue.includes('50%')) {
      prefix = 'SAVE50';
    }
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.discountCode = `${prefix}-${randomStr}`;
  }
}
