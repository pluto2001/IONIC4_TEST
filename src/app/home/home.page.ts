import { MicrogearService } from "./../services/microgear.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { MyserviceService } from "../services/myservice.service";
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
    "0": { color: "rgb(77, 240, 13)" },
    "40": { color: "rgb(240, 66, 13)" },
    "75.5": { color: "rgb(240, 217, 13)" }
  };
  public screenDisplay: Screen = {
    width: 0,
    thick: 0
  };

  public dataDht: any = null;
  public sw_toggle: boolean = false;
  public interval: any = null;
  constructor(
    public fb: AngularFireDatabase,
    public ms: MyserviceService,
    public microgear: MicrogearService
  ) {
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
    console.log(this.microgear.microgear());
    let microgear = this.microgear.microgear();

    microgear.on("connected", () => {
      microgear.subscribe("/ionic/+");
      microgear.subscribe("/arduino/+");
    });
    microgear.on("message", function(topic: any, msg: any) {
      
      console.log(topic + "->" + msg);
    });

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
    let microgear = this.microgear.microgear();
    this.fb
      .object("/sw_1")
      .set(this.sw_toggle)
      .then(() => {
        microgear.publish("/ionic/sw1", this.sw_toggle + "");
      });
  }
}
