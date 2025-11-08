# ClockClock 웹 프로젝트 계획

## 1. 사용자 요구사항

- Human since 1983의 'ClockClock' 작품을 웹 버전으로 구현.
- React 기반으로 개발.
- 시계침의 움직임은 CSS transition을 최대한 활용.

### 컴포넌트 구조 요구사항

1.  **`Clock` 컴포넌트**
    -   구성 요소: 원판 (배경), 시침, 분침.
    -   Props를 통해 시침과 분침의 위치(각도)를 설정할 수 있어야 함.

2.  **`ClockClock` 컴포넌트**
    -   여러 개의 `Clock` 컴포넌트를 그리드(Grid) 형태로 배열.
    -   현재 시간을 문자로 표현.

3.  **`ClockBlock` (문자 단위 그룹)**
    -   `ClockClock`은 여러 개의 `ClockBlock`으로 구성.
    -   `ClockBlock`은 하나의 문자를 표현하는 `Clock` 그룹.
    -   특정 문자열을 입력받아, 해당 문자를 `ClockBlock`으로 표시할 수 있는지 확인하고, 표시하는 기능을 포함해야 함.

## 2. 제안된 구현 계획

1.  **프로젝트 설정**
    -   Vite를 사용하여 `clock-clock` 디렉터리에 React + TypeScript 프로젝트를 생성.
    -   기본적인 CSS 파일 설정.

2.  **`Clock` 컴포넌트 구현**
    -   시계의 기본 단위 컴포넌트 생성.
    -   Props로 `hourAngle`, `minuteAngle`을 받아 CSS `transform: rotate()`로 시곗바늘 위치 제어.

3.  **문자-각도 맵 정의**
    -   숫자 ('0'-'9') 및 기타 문자 (':')를 표현하기 위한 시곗바늘 각도 데이터를 JSON 또는 객체 형태로 정의.
    -   예: `{'1': [angle1, angle2, ...]}`

4.  **`ClockBlock` 컴포넌트 구현**
    -   하나의 문자를 표시하는 컴포넌트.
    -   Props로 `char` (표시할 문자)를 받음.
    -   문자-각도 맵을 참조하여 내부 `Clock` 컴포넌트들에 각도 값을 전달.

5.  **`ClockClock` 메인 컴포넌트 구현**
    -   최상위 컴포넌트로, 실시간으로 현재 시각을 표시.
    -   `useEffect`와 `setInterval`을 사용해 1초마다 시간 업데이트.
    -   시간 문자열을 각 `ClockBlock` 컴포넌트로 렌더링.

6.  **통합 및 스타일링**
    -   `App.tsx`에 `ClockClock` 컴포넌트를 렌더링.
    -   전체적인 디자인을 CSS로 다듬어 원작의 미적 감각을 재현.

## 3. 다음 단계

- Vite 프로젝트 생성 및 의존성 설치.
