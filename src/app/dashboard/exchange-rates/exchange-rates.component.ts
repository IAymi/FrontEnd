import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Res {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: Object;
}

// interface Rates {
//   '2022-07-01': _20220701;
//   '2022-07-02': _20220701;
//   '2022-07-03': _20220701;
//   '2022-07-04': _20220701;
//   '2022-07-05': _20220701;
//   '2022-07-06': _20220701;
//   '2022-07-07': _20220701;
//   '2022-07-08': _20220701;
//   '2022-07-09': _20220701;
//   '2022-07-10': _20220701;
//   '2022-07-11': _20220701;
//   '2022-07-12': _20220701;
//   '2022-07-13': _20220701;
//   '2022-07-14': _20220701;
//   '2022-07-15': _20220701;
//   '2022-07-16': _20220701;
//   '2022-07-17': _20220701;
//   '2022-07-18': _20220701;
//   '2022-07-19': _20220701;
//   '2022-07-20': _20220701;
//   '2022-07-21': _20220701;
//   '2022-07-22': _20220701;
//   '2022-07-23': _20220701;
//   '2022-07-24': _20220701;
//   '2022-07-25': _20220701;
//   '2022-07-26': _20220701;
// }

// interface _20220701 {
//   THB: number;
// }

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {

  // https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-07-01&end_date=2022-07-26&symbols=THB&base=EUR&apikey=GtGVbhwIzcuVJ9sIv2KZBhmPbW3b8TrQ
  // https://apilayer.com/marketplace/exchangerates_data-api#details-tab

  constructor(private http:HttpClient) {}
  
  startDate = new Date(Date.now())
  endDate = new Date(Date.now())
  startDateString:string = ""
  endDateString:string = ""
  apiKey:string = "GtGVbhwIzcuVJ9sIv2KZBhmPbW3b8TrQ"
  symbol:string = "THB"
  base:string = "USD"
  apiUrl:string = ""

  data:Res = {
    success: false,
    timeseries: false,
    start_date: '',
    end_date: '',
    base: '',
    rates: {}
  }

  ngOnInit(): void {
    this.findDate()
    setTimeout(()=>{
      this.getData()
    },3000) 
  }

  findDate(){
    this.startDate.setDate(this.startDate.getDate()-8)
    this.endDate.setDate(this.endDate.getDate()-1)
    // console.log(this.startDate)
    // console.log(this.endDate)
    this.startDateString = this.startDate.toISOString().slice(0,10)
    this.endDateString = this.endDate.toISOString().slice(0,10)
    console.log(this.startDateString,this.endDateString)
    this.apiUrl = `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${this.startDateString}&end_date=${this.endDateString}&symbols=${this.symbol}&base=${this.base}&apikey=${this.apiKey}`
  }

  getData(){
    this.http.get<Res>(this.apiUrl).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }

}
