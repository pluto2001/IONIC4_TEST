import { Injectable } from "@angular/core";

declare let Microgear: any;

@Injectable({
  providedIn: "root"
})
export class MicrogearService {
  constructor() {}

  public microgear() {
    let microgear = Microgear.create({
      key: "wG5laC0ics61CMk",
      secret: "INoHIX4NqtU2Xblg0WL3eT2HL",
      alias: "MyApp"
    });

    microgear.connect("ION4");
    return microgear;
  }
}
