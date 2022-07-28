import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of,map,tap } from 'rxjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Res {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: Object;
}

interface Rate {
  date:string;
  valueCur:number
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {

  // https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-07-01&end_date=2022-07-26&symbols=THB&base=EUR&apikey=GtGVbhwIzcuVJ9sIv2KZBhmPbW3b8TrQ
  // https://apilayer.com/marketplace/exchangerates_data-api#details-tab

  constructor(private http:HttpClient) {}
  
  apiKey:string = "GtGVbhwIzcuVJ9sIv2KZBhmPbW3b8TrQ"
  symbol:string = "THB"
  base:string = "USD"


  ngOnInit(): void {
    of(1).pipe(map((v)=>{
      let startDate = new Date(Date.now())
      let endDate = new Date(Date.now())
      startDate.setDate(startDate.getDate()-8)
      endDate.setDate(endDate.getDate()-1)
      let startDateStr = startDate.toISOString().slice(0,10)
      let endDateStr = endDate.toISOString().slice(0,10)

      // console.log(startDateStr,endDateStr)

      let apiUrl = `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDateStr}&end_date=${endDateStr}&symbols=${this.symbol}&base=${this.base}&apikey=${this.apiKey}`
      return apiUrl
    }),
    map((apiurl)=>{
      this.http.get<Res>(apiurl).pipe(
        map((res)=>{
          console.log(res)
          return this.displayRate(res.rates)
        })
        ,map((res)=>{
          for(let i of res){
            this.avgRate += (i.valueCur/8)
          }
          return this.diffRate(res)
        })
        ,tap((res)=>this.createGraph(res))
        ).subscribe()
    })
    ).subscribe()
  }

  avgRate:number=0

  displayRate(rates:Object){
    let ratesList:Rate[] = []
    for (const [key, value] of Object.entries(rates)){
      let rate:Rate = {
        date: '',
        valueCur: 0
      }
      for (const [k, v] of Object.entries(value)){
        rate.date = key
        if(typeof(v)==="number"){
          rate.valueCur = v
        }
      }
      ratesList.push(rate)
    }
    return ratesList
  }


  diffRate(ratesList:Rate[]){
    let ratesDiffList:Rate[] = []
    for(let i = 1;i<ratesList.length;i++){
      let diffRate:Rate = {
        date: '',
        valueCur: 0
      }
      diffRate.date = ratesList[i].date
      diffRate.valueCur = ratesList[i].valueCur - ratesList[i-1].valueCur
      ratesDiffList.push(diffRate)
    }
    return ratesDiffList
  }

  createGraph(ratesDiffList:Rate[]){
    const chart = new Chart("graph",{
      type:'bar',
      data:{
        labels: ratesDiffList.map(diffRate => diffRate.date),
        datasets:[{
          label:'THB Change',
          data: ratesDiffList.map(diffRate => diffRate.valueCur),
          backgroundColor:'rgba(255, 99, 132)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x:{
            grid:{
              display:false
            }
          },
          y: {
            grid:{
              display:false
            },
            beginAtZero: false
          }
        }
      }
    })
  }

}
