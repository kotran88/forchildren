import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReceiptsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReceiptsProvider {

  // receipt_image_count = [5, 4, 4, 5, 6, 5, 6, 5, 4, 5];

  receipt_00_position = [
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
    [1254, 546],
  ];
  receipt_images_position = [
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
    [[783.5, 473], [783.5, 984], [1801.5, 475], [1890.5, 800], [1784.5, 1114],],
  ];

  receipt_icons_position = [
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
    [[842,594], [1052,1037], [1871,553], [1911,811], [1846,1166]],
  ];

  /*
    .recipe1{z-index: 2; left: 783.5px; top: 473px;}
    .recipe2{z-index: 2; left: 783.5px; top: 984px;}
    .recipe3{z-index: 2; left: 1801.5px; top: 475px;}
    .recipe4{z-index: 2; left: 1890.5px; top: 800px;}
    .recipe5{z-index: 2; left: 1784.5px; top: 1114px;}

    .icon0{left: 1254px; top: 546px;}

    .icon1{left: 842px; top: 594px;}
    .icon2{left: 1052px; top: 1037px;}
    .icon3{left: 1871px; top: 553px;}
    .icon4{left: 1911px; top: 811px;}
    .icon5{left: 1846px; top: 1166px;}
    .icon5-1{left: 2092px; top: 1192px;}
  */

  constructor(public http: HttpClient) {
    console.log('Hello ReceiptsProvider Provider');
  }

  get_receipts_positions(num)
  {
    var result = [];
    result.push(this.receipt_00_position[num - 1]);
    result.push(this.receipt_images_position[num - 1]);
    result.push(this.receipt_icons_position[num - 1]);
    return result;
  }
}
