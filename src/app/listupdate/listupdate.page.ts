import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-listupdate",
  templateUrl: "./listupdate.page.html",
  styleUrls: ["./listupdate.page.scss"]
})
export class ListupdatePage implements OnInit {
  public formUpdate: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    public fb: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit() {
    let dataRoute = JSON.parse(this.route.snapshot.paramMap.get("data"));
    //console.log(JSON.parse(dataRoute));
    this.formUpdate = this.formBuild.group({
      key: [dataRoute.key, Validators.required],
      Humididy: [dataRoute.payload.Humididy, Validators.required],
      Temperature: [dataRoute.payload.Temperature, Validators.required],
      time: [dataRoute.payload.time, Validators.required]
    });
  }

  public onUpdate() {
    let keyUpdate = this.formUpdate.value.key;

    if (confirm("ยืนยันการแก้ไข")) {
      delete this.formUpdate.value.key;
      this.fb
        .object("/logs/" + keyUpdate)
        .update(this.formUpdate.value)
        .then((value: any) => {
          this.router.navigate(["/list"]);
        })
        .catch((reason: any) => {});
    }
  }
}
