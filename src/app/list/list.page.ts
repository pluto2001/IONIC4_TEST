import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { MyserviceService } from "../services/myservice.service";
import { AlertController } from "@ionic/angular";

export interface data {
  key: String;
  payload: any;
}

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  public dataLogs: Array<any> = [];
  public searchlogs: string = "";
  public datalogsSearch: Array<any> = [];
  constructor(
    public fb: AngularFireDatabase,
    public asa: MyserviceService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.fb
      .list("/logs")
      .snapshotChanges()
      .subscribe((value: any) => {
        // console.log(value);
        this.dataLogs = [];

        value.forEach(element => {
          this.dataLogs.push({
            key: element.key,
            payload: element.payload.val()
          });
        });
        console.log(this.dataLogs);
        this.onSearch("");
      });
    this.onSearch(this.searchlogs);
  }

  public onDelete(key: string) {
    this.asa
      .presentAlertConfirm("ทดสอบ Alert")
      .then((value: Boolean) => {
        this.dataLogs = [];
        this.fb.object("/logs/" + key).remove();
      })
      .catch(async (reason: boolean) => {
        const alert = await this.alertController.create({
          header: "Alert",

          message: "ยกเลิกแล้ว",
          buttons: ["OK"]
        });

        await alert.present();
      });
  }
  public onSearch(text: string) {
    let txt = new RegExp(this.searchlogs, "gi");
    this.datalogsSearch =
      text.length > 0
        ? this.dataLogs.filter(
            (c: any) =>
              c.payload.time.search(txt) != -1 ||
              c.payload.Humididy.toString().search(txt) != -1 ||
              c.payload.Temperature.toString().search(txt) != -1
          )
        : this.dataLogs;
  }

  public comvertJson(data: data) {
    return JSON.stringify(data);
  }
}
