import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

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
  constructor(public fb: AngularFireDatabase) {}

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
  }

  public onDelete(key: string) {
    // console.log(key);
    if (confirm("ยืนยันการลบข้อมูล")) {
      this.dataLogs = [];
      this.fb.object("/logs/" + key).remove();
    }
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
