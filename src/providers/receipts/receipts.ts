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

  // // 메뉴 사진
  // receipt_00_position = [
  //   [32, 11, 31], // 쌍별이 아약 토스트
  //   [34, 17, 30], // 벅스 블루베리 크림치즈 토스트
  //   [33, 10, 33], // 장수애 콘치즈
  //   [33,  7, 35], // 수벌번데기 시리얼바
  //   [34, 10, 30], // 노오븐 티라미수
  //   [35, 13, 30], // 비건참치 풀무치 카나페
  //   [33, 10, 33], // 누애 녹차 쉐이크
  //   [33, 11, 32], // 고소애 피자
  //   [36, 17, 30], // 꽃벵이 동충하초 두부샐러드
  //   [36, 14, 30], // 슈퍼 밀웜 딸기바나나 쉐이크
  // ];

  // //글자
  // receipt_images_position = [
  //   // left top
  //   [[11,  7, 35], [ 6, 44, 17], [60,  7, 28], [63, 34, 22], [33, 66, 18],],                  // 쌍별이 아약 토스트
  //   [[10,  7, 29], [ 7, 50, 25], [60,  7, 25], [65, 50, 30],],                                  // 벅스 블루베리 크림치즈 토스트
  //   [[ 9,  5, 35], [ 4, 47, 26], [65,  7, 30], [60, 55, 34],],                                  // 장수애 콘치즈
  //   [[10,  4, 17], [ 3, 40, 34], [58,  5, 40], [63, 42, 35], [52, 71, 25],],                  // 수벌번데기 시리얼바
  //   [[11,  2, 34], [ 6, 34, 25], [11, 70, 25], [60,  2, 31], [65, 34, 25], [58, 68, 36],],   // 노오븐 티라미수
  //   [[12,  3, 30], [ 6, 37, 27], [16, 63, 21], [60,  4, 36], [67, 44, 27],],                         // 비건참치 풀무치 카나페
  //   [[13,  2, 25], [ 9, 39, 18], [18, 68, 16], [61,  2, 12], [65, 34, 20], [60, 63, 12],],           // 누애 녹차 쉐이크
  //   [[ 9,  2, 29], [ 8, 49, 19], [64,  3, 28], [67, 36, 24], [61, 66, 27],],                   // 고소애 피자
  //   [[13,  2, 22], [10, 53, 26], [63,  2, 21], [67, 51, 28],],                                  // 꽃벵이 동충하초 두부샐러드
  //   [[14,  3, 22], [ 7, 39, 25], [12, 68, 30], [65, 14, 19], [68, 56, 12],],                    // 슈퍼 밀웜 딸기바나나 쉐이크
  // ];

  // //아이콘
  // receipt_icons_position = [
  //   // left top
  //   [[13, 10, 21], [12, 59, 14], [65, 10, 15], [66, 39, 20], [52, 62, 14], [67, 69,  7],],               // 쌍별이 아약 토스트
  //   [[14, 19, 13], [23, 64, 14], [78, 15, 14], [66, 63, 17], [83, 57,  7],],                           // 벅스 블루베리 크림치즈 토스트
  //   [[12, 10, 20], [25, 55, 18], [67,  9, 28], [90, 18,  7], [65, 62, 15],],                             // 장수애 콘치즈
  //   [[20, 10, 14], [15, 56, 15], [33, 56, 15], [67,  5, 24], [75, 45, 16], [78, 70, 18],],               // 수벌번데기 시리얼바
  //   [[ 5,  6, 16], [20,  8, 15], [15, 38, 19], [32, 56, 18], [65,  5, 17], [66, 35, 24], [65, 76, 24],],    // 노오븐 티라미수
  //   [[10,  6, 21], [10, 30, 24], [39, 53, 24], [64, 12, 30], [71, 49, 16],],                             // 비건참치 풀무치 카나페
  //   [[25,  8, 15], [19, 39, 15], [30, 64, 15], [70,  1, 19], [65, 40, 13], [71, 62, 16],],               // 누애 녹차 쉐이크
  //   [[12, 13, 17], [24, 61, 18], [67,  8, 15], [69, 37, 20], [66, 70, 16], [81, 73,  7],],               // 고소애 피자
  //   [[14, 11, 17], [19, 54, 25], [71, 10, 18], [63, 57, 18],],                                        // 꽃벵이 동충하초 두부샐러드
  //   [[20,  9, 15], [11, 40, 19], [40, 69, 14], [70, 21, 17], [67, 61, 13],],                          // 슈퍼 밀웜 딸기바나나 쉐이크
  // ];

  // sub_recipes = [
  //   "건조 쌍별귀뚜라미(가루), 비건 달걀, 식빵, 비건 마요네즈, 설탕",
  //   "건조 수벌번데기(가루), 건조 백장감(가루), 블루베리잼, 비건 크림치즈",
  //   "건조 장수애(가루), 비건 마요네즈, 비건 피자치즈,\n스위트콘, 소금, 후추",
  //   "건조 수벌번데기(가루), 비건 버터, 다크 초콜릿,\n볶은귀리, 뮤즐리, 아몬드",
  //   "건조 메뚜기(가루), 비건 달걀, 비건 크림치즈, 비건 생크림,\n설탕, 카스테라, 인스턴트 커피(카누), 코코아가루",
  //   "비건 풀무치(가루), 비건참치, 오이, 양파,\n방울토마토, 비건 마요네즈, 후추",
  //   "건조 누에(가루), 오틀리(귀리우유), 녹차가루, 얼음",
  //   "건조 밀웜(가루), 밀가루 토르티야, 토마토소스, 통조림콘,\n피망, 양송이 버섯, 올리브, 비건 피자치즈",
  //   "건조 흰점박이 꽃무지(가루), 동충하초 발사믹 드레싱,\n두부, 어린채소, 방울토마토",
  //   "건조 아메리카 왕거저리(가루), 오틀리(귀리우유),\n바나나나, 딸기, 시럽, 얼음",
  // ]

  recipes_image = [
    'assets/imgs/alternative food/UI pages_221212/01.png',
    'assets/imgs/alternative food/UI pages_221212/02.png',
    'assets/imgs/alternative food/UI pages_221212/03.png',
    'assets/imgs/alternative food/UI pages_221212/04.png',
    'assets/imgs/alternative food/UI pages_221212/05.png',
    'assets/imgs/alternative food/UI pages_221212/06.png',
    'assets/imgs/alternative food/UI pages_221212/07.png',
    'assets/imgs/alternative food/UI pages_221212/08.png',
    'assets/imgs/alternative food/UI pages_221212/09.png',
    'assets/imgs/alternative food/UI pages_221212/10.png',
  ]



  constructor(public http: HttpClient) {
    console.log('Hello ReceiptsProvider Provider');
  }

  get_recipes_image(num)
  {
    if(num < 1) num = 1;
    else if(num > 10) num = 10;
    return this.recipes_image[num - 1];
  }

  // get_receipts_positions(num)
  // {
  //   var result = [];
  //   result.push(this.receipt_00_position[num - 1]);
  //   result.push(this.receipt_images_position[num - 1]);
  //   result.push(this.receipt_icons_position[num - 1]);
  //   // result.push(this.receipt_title_position[num - 1]);
  //   return result;
  // }

  // get_subrecipes(num)
  // {
  //   return this.sub_recipes[num - 1];
  // }
}
