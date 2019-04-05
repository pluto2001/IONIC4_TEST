import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(public fb: AngularFireDatabase) {}
  ngOnInit() {
    this.fb
      .object("/DHT_NOW")
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
      });
  }
}
