# CloudBlock website

cloudblock.cloud 홈페이지입니다. 정적 사이트(HTML/CSS/JS)이고 GitHub Pages(`LunarJiwon/cloudblock-website`, `main` 브랜치 루트)에서 호스팅합니다.

- 실시간 서버 상태: mcsrvstat.us API로 1분마다 확인. 테스트할 때는 주소 뒤에 `?status=<호스트>`를 붙이면 됩니다.
- 주간 경쟁 카운트다운: 매주 월요일 00:00 UTC
- 디스코드 버튼은 `app.js`의 `CONFIG.discordUrl`을 채우면 나타납니다.
- CSS/JS를 바꾸면 `index.html`의 `?v=` 숫자를 올려야 방문자 캐시가 갱신됩니다.

## 도메인 연결

2026-10-06 연결 완료: https://cloudblock.cloud (HTTPS 강제, http·www는 자동으로 이동). DNS는 hosting.co.kr에서 관리합니다.

| 종류 | 이름 | 값 |
| --- | --- | --- |
| A | @ | 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153 |
| CNAME | www | lunarjiwon.github.io |
| A | play | 175.113.6.150 (프록시 없이) |
| SRV | _minecraft._tcp | 0 5 25565 play.cloudblock.cloud |
