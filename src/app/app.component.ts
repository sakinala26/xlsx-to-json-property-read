import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  constructor() {}

  onFileChange(event: Event) {
    let workBook = null;
    let jsonData = null;
    let arr: any;
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;

    const reader = new FileReader();
    let file = fileList[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      workBook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workBook.Sheets[sheet]
        );
        jsonData = JSON.stringify(rowObject);
      });

      let a = JSON.parse(jsonData);
      console.log(a, ':data');
      for (let i = 0; i < a.length; i++) {
        const name = a[i].Name;
        console.log(name, ':filter particular field data');
      }
    };
    reader.readAsBinaryString(file);
  }

  // this method is for download
  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute(
        'href',
        `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      );
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }
}
