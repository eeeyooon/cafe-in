![header](https://capsule-render.vercel.app/api?type=waving&color=0:ffcc55,100:f2ab46)

# 🍰 카페 인 - Cafe in 🍩

<br/>

카페에 꼭 필요한 서비스 ! 메뉴 주문 및 카페 운영 관리 서비스 **Cafe-in**입니다. 🐰

**Cafe-in**의 프로젝트 진행 방식 및 과정은 [Wiki 페이지](https://github.com/Cafe-Manage-Service-CAFE-IN/cafe-in/wiki)에서 확인할 수 있습니다.

<br/>
<br/>

**[💛 Cafe-in 사용 해보기](https://cafe-in.web.app)**

- 시작 페이지의 `고양이 발 🐾`을 클릭하면 관리자 로그인 페이지로 이동합니다. 로그인 비밀번호는 `0716`입니다.

- 모두가 접속할 수 있는 서비스이기 때문에, 불건전한 테스트는 삼가해주시길 바랍니다. 🥰

<br>
<br>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FCafe-Manage-Service-CAFE-IN&count_bg=%23fcc&title_bg=%23555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## 프로젝트 구성원 🐰

<br/>

|  [강지윤 FE](https://github.com/eeeyooon)  |  [안유진 FE](https://github.com/Anyudbwls)  |  [오소민 FE](https://github.com/somin00)  |
| :----------------------------------------: | :-----------------------------------------: | :---------------------------------------: |
| <img width="200" alt="강지윤 깃허브 프로필 이미지" src="https://github.com/eeeyooon.png"> | <img width="200" alt="안유진 깃허브 프로필 이미지" src="https://github.com/Anyudbwls.png">| <img width="200" alt="오소민 깃허브 프로필 이미지" src="https://github.com/somin00.png">


<br/>
<br/>

## 프로젝트 개요

**💡 프로젝트 주제** : 메뉴 주문 및 카페 운영 관리 서비스

**🏃🏻‍♂️ 프로젝트 구현 기간** : 2023.07.16 ~ 2023.08.22

**🖼 디자인 시안** : [Cafe-in Figma](https://www.figma.com/file/nOaYQCWHk4QwtT78UCXp7E/%EC%B9%B4%ED%8E%98-%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8?type=design&node-id=6-2&mode=design&t=HRTTTvBhBAgtHyV2-0)

<br/>

## 기술 스택

<img src="https://img.shields.io/badge/NPM v.9.1.2-CB3837?style=flat&logo=npm&logoColor=white"/> <img src="https://img.shields.io/badge/Node v.18.12.1-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Git v.2.35.1-F05032?style=flat&logo=Git&logoColor=white"/>

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=ReactRouter&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=Recoil&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white"/>

<br/>
<br/>

## 디자인 시안

<img src="https://github.com/eeeyooon/moonbucks/assets/102462534/f4ef925e-92c4-46ad-b1ba-0f632f07178b" alt="카페 인 디자인 시안" width="800">


<br/>
<br/>

## 핵심 기능 소개

### 1. 메뉴 조회 및 메뉴 주문

- 카테고리 별로 메뉴를 조회할 수 있고, 특정 카테고리는 메뉴 선택 시 옵션을 추가할 수 있습니다.
- 메뉴별 옵션 및 수량을 선택할 수 있습니다.
- 유저는 결제 시에, 포인트 적립과 포인트 사용이 가능합니다.

### 2. 메뉴 관리

- 서비스 관리자는 카테고리, 메뉴를 추가 및 수정, 삭제할 수 있습니다.
- 카테고리 별 옵션 추가 가능 여부, 재고 상태를 관리할 수 있습니다.

### 3. 대기 신청 및 대기 관리

- 서비스 관리자는 카페 운영 상황에 따라 대기 가능과 대기 마감을 선택할 수 있습니다.
- 대기 가능 시, 사용자는 대기 신청을 할 수 있습니다.
- 서비스 관리자는 대기 상황을 보며 대기 취소, 착석완료를 설정할 수 있고 대기 명단을 확인할 수 있습니다.

<br/>
<br/>

## 서비스 기능 목록

### 🎈 사용자 모드

1. 메뉴 조회 및 메뉴 주문
2. 포인트 적립 및 포인트 사용
3. 대기 신청

<br/>

### 🍒 관리자 모드

1. 메뉴 및 카테고리 관리
2. 대기 관리
3. 주문 관리
4. 매출 내역 조회
5. 포인트 내역 조회
6. 테마 및 색상 설정

<br/>
<br/>

## 성능 및 웹 접근성 개선

LightHouse 기준 모든 페이지의 접근성, 권장사항, 검색엔진 점수를 100점으로 맞추었고 성능은 90점 이상이 나오도록 개선하였습니다.

- 키보드로 접근 가능하게 설정하고 색상 대비 (일반 텍스트의 경우 4.5:1, 대형 텍스트의 경우 3:1)을 맞추었습니다.
- `aria-*`를 활용하여 웹 접근성을 높였습니다.
- `React.memo`, `useMemo`, `useCallback`을 활용하여 메모이제이션 작업을 통해 불필요한 렌더링을 줄였습니다.
- 이미지 요소에 `alt` 속성을 추가하였습니다.

<br/>

<img src="https://github.com/eeeyooon/moonbucks/assets/102462534/8fb2dfca-934d-4fb7-ac0f-b73775e85013" width="600">

<br/>
<br/>

## 라이브러리

```
"dependencies": {
		"@testing-library/jest-dom": "^5.17.0",
		"@testing-library/react": "^13.4.0",
		"@testing-library/user-event": "^13.5.0",
		"@types/jest": "^27.5.2",
		"@types/node": "^16.18.38",
		"@types/react": "^18.2.15",
		"@types/react-dom": "^18.2.7",
		"@types/react-router-dom": "^5.3.3",
		"@types/styled-components": "^5.1.26",
		"eslint": "^8.45.0",
		"eslint-config-prettier": "^8.8.0",
		"eslint-plugin-prettier": "^5.0.0",
		"firebase": "^10.1.0",
		"prettier": "^3.0.0",
		"prop-types": "^15.8.1",
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-router-dom": "^6.14.2",
		"react-scripts": "5.0.1",
		"recoil": "^0.7.7",
		"styled-components": "^6.0.4",
		"styled-reset": "^4.5.1",
		"typescript": "^4.9.5",
		"web-vitals": "^2.1.4"
	}
```

<!-- ## 역할 분담 👩🏻‍💻

| 이름   | 역할                                                                                                    |
| ------ | :------------------------------------------------------------------------------------------------------ |
| 강지윤 | **[사용자]** 대기 신청 <br> **[관리자]** 대기 관리, 매출 내역 조회, 포인트 내역 조회, 테마 및 색상 설정 |
| 안유진 | **[사용자]** 메뉴 주문 <br/> **[관리자]** 포인트 내역 조회                                              |
| 오소민 | **[관리자]** 로그인, 메뉴 관리, 주문 관리                                                               | -->

<br/>
<br/>

![footer](https://capsule-render.vercel.app/api?section=footer&type=waving&color=0:f2ab46,100:FFC000)
