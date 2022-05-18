# Coupang-Price-Per-Piece

- 본 스크립트는 쿠팡(Coupang)에서 제품의 개당 가격을 대략 판단하여 보여주는 UserScript 기반 브라우저 확장기능 입니다.
- 동작 방식: 제품의 제목에 표시된 패턴을 분석하여 총 개수를 계산하고, 이에 따른 개당 가격을 계산하여 표시해줍니다. 따라서 일정한 패턴을 지닌 로켓배송, 로켓프레시 제품에 대해 상대적으로 잘 동작합니다.
- 주의: 스크립트가 제품의 개당 가격을 잘못 계산함으로 인하여 발생하는 금전적 손해에 대해 개발자는 책임지지 않습니다. 참고용으로만 사용해주세요.

## Preview

![Preview1](https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/images/preview.png)

![Preview2](https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/images/preview2.png)

## Install

Coupang-Price-Per-Piece 의 설치 방법을 설명합니다.

### STEP 1. ScriptManager

본 확장기능은 유저스크립트의 형태로 개발되었으며, 스크립트 설치를 위해 먼저 자신의 브라우저에 맞는 유저스크립트 관리자의 설치가 필요합니다. 아래 링크에서 유저스크립트 관리 확장기능인 Tampermonkey 를 설치하십시오. (동작 테스트는 Chrome, Firefox 에서만 했습니다.)

- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

> 본 스크립트는 Tampermonkey 외의 스크립트 매니저에서는 정상 동작하지 않을 수 있습니다.

### STEP 2. UserScript

- 유저스크립트 관리 확장기능 설치 후, 아래의 링크를 클릭하여 스크립트를 설치합니다.

- [Install](https://github.com/nomomo/Coupang-Price-Per-Piece/raw/main/Coupang-Price-Per-Piece.user.js) from [https://github.com/nomomo/Coupang-Price-Per-Piece/raw/main/Coupang-Price-Per-Piece.user.js](https://github.com/nomomo/Coupang-Price-Per-Piece/raw/main/Coupang-Price-Per-Piece.user.js)

> 본 스크립트를 사용 시 제품이 많은 화면에서 잠깐 브라우저가 멈출 수 있습니다.
> 주의: 본 스크립트를 설치 및 사용하며 브라우저 과부하로 인한 응답 없음/뻗음으로 인한 데이터 손실이나 본 스크립트 설치로 인해 발생하는 다른 문제에 대하여 개발자는 책임지지 않음(보고된 문제는 없음)  
> Coupang 접속에 문제가 생기거나 클립 재생이 안 되는 문제 등이 발생하는 경우, Tampermonkey 의 관리 메뉴에서 이 스크립트를 끄거나 삭제해주세요.

- 이것으로 설치는 끝입니다. 즐겁게 사용하세요~

## Settings

- Coupang 에 접속한 상태에서, Toolbar 의 Tampermonkey 아이콘 - Coupang-Price-Per-Piece - 상세 설정 열기를 클릭하여 설정을 변경할 수 있습니다.

![Setting1](https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/images/settings.png)

![Setting2](https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/images/settings2.png)

## Bug report

- 버그 리포트 & 건의사항은 아래의 링크로 보내주세요.
- nomotg@gmail.com

## Change log

### 0.0.1 (2022-05-19)

- Initial commit

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>　<a href="https://toon.at/donate/636947867320352181" target="_blank"><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/assets/toonation_b11.gif" height="60" alt="Donate with Toonation" /></a>
