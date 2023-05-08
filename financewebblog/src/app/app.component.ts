import { Component } from '@angular/core';
import { format, addDays, differenceInDays } from 'date-fns';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { HttpClient } from '@angular/common/http'; // import HttpClient
import { interval } from 'rxjs';




interface ExchangeRateData {
  rates: { [key: string]: number};
}

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


  currencies = ['GBP','EUR','CHF', 'AUD', 'CAD', 'INR', 'JPY','CNY','NPR','NZD','SGD','KRW'];
  currencyData: { [key: string]: any } = {};


  constructor(private http: HttpClient) { } // add private http: HttpClient to the constructor


  ngOnInit() {
    const currentDate = new Date();
    this.updateCurrentTime();
    //this.dateAfterTenDays = format(addDays(currentDate, 10), 'Pp');
    //this.daysDifference = differenceInDays(addDays(currentDate, 10), currentDate);

    // Update the time every second (1000ms)
    this.timer = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

    // Call the getCurrencyData() method every second
    interval(1000).subscribe(() => {
      this.getCurrencyData();
    });
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.timer);
  }

  updateCurrentTime() {
    this.currentTime = format(new Date(), 'Pp');
  }


  getCurrencyData() {
    // Define the API endpoint and API key
    const apiKey = 'bc5517787b5b49b5aab23f522877b04b';
    const endpoint = 'https://openexchangerates.org/api/latest.json';
    // Use the HttpClient service to retrieve the currency data for each currency
    this.http.get<ExchangeRateData>(`${endpoint}?app_id=${apiKey}`).subscribe(data => {
      this.currencies.forEach(currency => {
        this.currencyData[currency] = data.rates[currency].toFixed(2);
      });
    });
  }


  /*
  getCurrencyData() {
    // Define the API endpoint and API key
    const apiKey = 'bc5517787b5b49b5aab23f522877b04b';
    const endpoint = 'https://openexchangerates.org/api/latest.json';
  
    // Use the HttpClient service to retrieve the currency data for each currency
    this.http.get(`${endpoint}?app_id=${apiKey}`).subscribe(data => {
      this.currencies.forEach(currency => {
        this.currencyData[currency] = data.rates[currency];
      });
    });
  }
  */

}
