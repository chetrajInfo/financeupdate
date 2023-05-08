import { Component } from '@angular/core';
import { format, addDays, differenceInDays } from 'date-fns';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'financewebblog';
  currentTime: string | undefined;
  //dateAfterTenDays: string;
  //daysDifference: number;
  timer: any;

  constructor() {
    //const currentDate = new Date();
    //this.today = format(currentDate, 'PPpp');
    //this.dateAfterTenDays = format(addDays(currentDate, 10), 'PPpp');
    //this.daysDifference = differenceInDays(addDays(currentDate, 10), currentDate);
  }
 

  ngOnInit() {
    const currentDate = new Date();
    this.updateCurrentTime();
    //this.dateAfterTenDays = format(addDays(currentDate, 10), 'Pp');
    //this.daysDifference = differenceInDays(addDays(currentDate, 10), currentDate);

    // Update the time every second (1000ms)
    this.timer = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.timer);
  }

  updateCurrentTime() {
    this.currentTime = format(new Date(), 'Pp');
  } 
  
}
