﻿# matching_game

 
React와 Vite를 사용하여 만든 카드 매칭 게임입니다.    
<br/>
**카드 선택 및 비교**   
useEffect 훅을 활용해 두 카드를 선택한 후 비교하는 로직을 처리했습니다.
두 카드가 일치하면 matched 속성을 true로 설정하여 매칭된 카드를 표시하고, 일치하지 않으면 resetTurn() 함수를 호출하여 1초 후에 카드를 뒤집습니다.
<br/><br/>
**게임 리셋기능(카드섞기)**   
shuffleCard 함수는 카드를 랜덤하게 섞고, Math.random()을 사용하여 각 카드에 고유한 ID를 부여하여 리렌더링 시 안정성을 높였습니다.
또한, useState를 사용하여 섞인 카드 배열을 상태로 관리하고, 게임 리셋기능을 구현했습니다
<br/><br/>
**승리 메시지**   
모든 카드가 매칭되면 게임 승리 메시지가 화면에 나타납니다. useEffect 훅을 사용하여 카드의 상태를 모니터링하고, 모든 카드가 매칭되었을 때 게임이 종료되도록 했습니다.

#
