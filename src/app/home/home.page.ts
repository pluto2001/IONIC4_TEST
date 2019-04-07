import { Component, OnInit, OnDestroy } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { MyserviceService } from '../services/myservice.service';
export interface Screen {
  width: Number;
  thick: Number;
}
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  public thresholdConfig = {
    "0": { color: "rgb(13, 206, 240)" },
    "40": { color: "orange" },
    "75.5": { color: "red" }
  };
  public screenDisplay: Screen = {
    width: 0,
    thick: 0
  };

  public dataDht: any = null;
  public sw_toggle: boolean = false;
  public interval: any = null;
  constructor(public fb: AngularFireDatabase , public ms : MyserviceService) {
    //  this.fb.list("/logs").push({
    //   Temperature: Math.random(),
    //   Humididy: Math.random(),
    //   time:
    //    new Date().getDate() +
    //     "/" +
    //     (new Date().getMonth() + 1) +
    //     "/" +
    //     new Date().getFullYear()
    // })
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.fb
      .object("/DHT_NOW")
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.dataDht = value;
      });
    this.fb
      .object("/sw_1")
      .valueChanges()
      .subscribe((value: boolean) => {
        //console.log(value);
        this.sw_toggle = value;
      });
    this.interval = setInterval(() => {
      this.screenDisplay = {
        width: screen.availWidth / 2.5,
        thick: screen.availWidth / 40
      };
      //console.log(this.screenDisplay)
    }, 100);
  }

  public sw_onChange() {
    // console.log(this.sw_toggle);
    this.fb.object("/sw_1").set(this.sw_toggle);
  }
}
