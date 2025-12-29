import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 
const Login: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 초기화
  const location = useLocation(); // 현재 URL 및 navigate로 전달된 state 접근을 위한 useLocation 훅 초기화
 
  // 현재 윈도우 너비를 상태로 관리 (반응형 스타일 적용에 사용)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 사용자 아이디 입력을 위한 상태
  const [username, setUsername] = useState('');
  // 사용자 비밀번호 입력을 위한 상태
  const [password, setPassword] = useState('');
  // 로그인 시도 및 결과 등 각종 로그 메시지를 저장할 상태
  const [logMessages, setLogMessages] = useState<string[]>([]);
 
  // 윈도우 크기 변경 시 windowWidth 상태를 업데이트하는 useEffect
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
 
    // 'resize' 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (클린업 함수)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때 한 번만 실행
 
  // 회원가입 페이지에서 로그인 페이지로 넘어왔을 때 특정 메시지를 표시하는 useEffect
  // location.state를 사용하여 회원가입 성공 여부 (fromSignupSuccess)를 확인
  useEffect(() => {
    // location.state가 존재하고, fromSignupSuccess 속성이 true일 경우
    if (location.state && location.state.fromSignupSuccess) {
      addLog("회원가입이 완료되었습니다! 이제 로그인해주세요."); // 로그 기록에 추가
      alert("회원가입이 완료되었습니다! 이제 로그인해주세요."); // 사용자에게 알림 메시지 표시
      // 메시지 표시 후, location.state를 제거하여 새로고침 시 메시지가 다시 뜨는 것을 방지
      // replace: 현재 히스토리 스택을 대체 (뒤로가기 시 이전 상태로 돌아가지 않음)
      // state: {} : location.state를 비워줌
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]); // location.state 또는 navigate가 변경될 때마다 실행
 
  // 로그 메시지를 logMessages 상태에 추가하는 헬퍼 함수
  const addLog = (message: string) => {
    // 이전 로그 메시지 배열에 새 메시지를 현재 시간과 함께 추가
    setLogMessages(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
 
  // '회원가입' 버튼 클릭 시 회원가입 페이지로 이동하는 함수
  const handleGoToSignup = () => {
    navigate('/signup'); // '/signup' 경로로 이동
  };
 
  // 로그인 버튼 제출 이벤트 핸들러
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 기본 동작(페이지 새로고침) 방지
 
    addLog('--- 로그인 시도 ---'); // 로그인 시도 로그 기록
    addLog(`입력된 아이디: "${username}"`); // 입력된 아이디 로그 기록
    addLog(`입력된 비밀번호 (확인용): "${password}"`); // 입력된 비밀번호 로그 기록
 
    // localStorage에서 'registeredUser' 키로 저장된 사용자 정보(JSON 문자열) 가져오기
    const registeredUserString = localStorage.getItem('registeredUser');
    let registeredUser = null;
 
    // 저장된 사용자 정보가 있을 경우
    if (registeredUserString) {
      try {
        // JSON 문자열을 JavaScript 객체로 파싱
        registeredUser = JSON.parse(registeredUserString);
      } catch (error) {
        // 파싱 오류 발생 시 로그 기록 및 registeredUser를 null로 설정
        addLog('Error parsing registered user from localStorage: ' + error);
        registeredUser = null;
      }
    }
 
    // 등록된 사용자가 있고, 입력된 아이디와 비밀번호가 일치하는지 확인
    if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
      addLog(`로그인 성공: 등록된 아이디 "${username}"와 일치`); // 로그인 성공 로그 기록
      alert(`환영합니다, ${username}님!`); // 환영 메시지 알림
      navigate('/'); // 메인 페이지로 이동
    } else if (username.trim() === '') { // 아이디가 비어있는 경우
      addLog('로그인 실패: 아이디가 비어 있습니다.'); // 로그 기록
      alert('아이디를 입력해주세요.'); // 알림 메시지
    } else if (password.trim() === '') { // 비밀번호가 비어있는 경우
      addLog('로그인 실패: 비밀번호가 비어 있습니다.'); // 로그 기록
      alert('비밀번호를 입력해주세요.'); // 알림 메시지
    } else { // 아이디 또는 비밀번호가 일치하지 않는 경우
      addLog(`로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.`); // 로그 기록
      alert('아이디 또는 비밀번호가 올바르지 않습니다.'); // 알림 메시지
    }
    addLog('--- 로그인 시도 종료 ---'); // 로그인 시도 종료 로그 기록
  };
 
  // 현재 윈도우 너비에 따라 동적으로 스타일을 가져옴 (반응형 디자인)
  const currentStyles = getStyles(windowWidth);
 
  return (
    <div style={currentStyles.container}>
      {/* glowingText는 현재 display: 'none'으로 설정되어 있어 보이지 않음 */}
      <h2 style={currentStyles.glowingText}></h2>
 
      <div style={currentStyles.loginBox}>
        <form onSubmit={handleLogin} style={currentStyles.loginFormContent}>
          <p style={currentStyles.loginInfoText}>로그인 정보를 입력해주세요.</p>
          <input
            type="text"
            placeholder="아이디"
            style={currentStyles.input}
            value={username} // username 상태와 연결
            onChange={(e) => setUsername(e.target.value)} // 입력 값 변경 시 username 상태 업데이트
          />
          <input
            type="password"
            placeholder="비밀번호"
            style={currentStyles.input}
            value={password} // password 상태와 연결
            onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 password 상태 업데이트
          />
          <button type="submit" style={currentStyles.loginButton}>
            로그인
          </button>
        </form>
      </div>
 
      {/* 계정 없음 안내 및 회원가입 버튼 영역 */}
      <div style={currentStyles.signupPrompt}>
        <p style={{ margin: '0', display: 'inline' }}>계정이 없으신가요?</p>
        <button onClick={handleGoToSignup} style={{ ...currentStyles.goToSignupButton, display: 'inline' }}>
          회원가입
        </button>
      </div>
 
      {/* 접속 기록을 표시하는 영역 */}
      <div style={currentStyles.logContainer}>
        <h3>접속 기록</h3>
        <div style={currentStyles.logBox}>
          {/* logMessages 배열을 매핑하여 각 로그 메시지를 <p> 태그로 표시 */}
          {logMessages.map((msg, index) => (
            <p key={index} style={currentStyles.logMessage}>{msg}</p>
          ))}
        </div>
      </div>
 
    </div>
  );
};
 
// 윈도우 너비에 따라 다른 스타일을 반환하는 함수 (반응형 디자인 적용)
const getStyles = (width: number) => {
  const isMobile = width < 768; // 너비가 768px 미만이면 모바일 환경으로 간주
 
  return {
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column', // 'column'으로 명시적 타입 캐스팅
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // 최소 높이를 뷰포트 높이의 100%로 설정
      backgroundColor: '#fcfcfd', // 하늘색 배경색  backgroundColor: '#E0F7FA'
      fontFamily: 'Arial, sans-serif',
      padding: isMobile ? '10px' : '20px', // 모바일과 데스크톱 패딩 다르게 적용
      boxSizing: 'border-box' as 'border-box',
    },
    glowingText: {
      fontSize: isMobile ? '2em' : '3em',
      color: '#fff',
      textShadow: '0 0 10px #00e676, 0 0 20px #00e676, 0 0 30px #00e676, 0 0 40px #00e676',
      animation: 'glow 1.5s ease-in-out infinite alternate',
      marginBottom: '30px',
      display: 'none', // 현재는 화면에 보이지 않도록 설정
    },
    loginBox: {
      backgroundColor: '#ffffff',
      padding: isMobile ? '25px' : '40px',
      borderRadius: '10px',
      // 박스 그림자 효과 (모바일과 데스크톱에서 다르게 적용)
      boxShadow: `
        ${isMobile ? '2px 2px 0px #e5e5e5' : '3px 3px 0px #d0d0d0'},
        ${isMobile ? '4px 4px 0px #cccccc' : '6px 6px 0px #b0b0b0'},
        ${isMobile ? '6px 6px 0px #b3b3b3' : '9px 9px 0px #909090'},
        ${isMobile ? '8px 8px 10px rgba(0, 0, 0, 0.15)' : '12px 12px 15px rgba(0, 0, 0, 0.2)'}
      `,
      width: '100%',
      maxWidth: isMobile ? '320px' : '400px',
      textAlign: 'center' as 'center',
      marginBottom: '30px',
      position: 'relative' as 'relative',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
    },
    loginFormContent: {
      width: '100%',
      paddingTop: isMobile ? '15px' : '20px',
    },
    loginInfoText: {
      marginTop: '0',
      marginBottom: isMobile ? '15px' : '20px',
      fontSize: isMobile ? '0.9em' : '1em',
    },
    input: {
      width: 'calc(100% - 20px)', // 패딩을 고려한 너비
      padding: isMobile ? '10px 8px' : '12px 10px',
      margin: '8px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: isMobile ? '0.9em' : '1em',
    },
    loginButton: {
      width: '100%',
      padding: isMobile ? '10px' : '12px',
      backgroundColor: '#4CAF50', // 초록색 배경
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: isMobile ? '1em' : '1.1em',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s ease', // 호버 효과를 위한 트랜지션
      // 인라인 스타일에서는 '&:hover'와 같은 가상 선택자를 직접 적용할 수 없습니다.
      // 이를 구현하려면 CSS 모듈, Styled Components, 또는 외부 CSS 파일을 사용해야 합니다.
    },
    signupPrompt: {
      textAlign: 'center' as 'center',
      marginTop: isMobile ? '15px' : '20px',
      color: '#666',
    },
    // 회원가입
    goToSignupButton: {
      padding: isMobile ? '8px 15px' : '10px 20px',
      backgroundColor: 'transparent',
      color: '#007bff', // 파란색 텍스트
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9em' : '1em',
      marginTop: '10px',
      transition: 'color 0.3s ease', // 호버 효과를 위한 트랜지션
      // 인라인 스타일에서는 '&:hover'와 같은 가상 선택자를 직접 적용할 수 없습니다.
    },
    // 로그 기록 컨테이너 스타일
    logContainer: {
      backgroundColor: '#fcfcfd',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '30px',
      width: '100%',
      maxWidth: isMobile ? '320px' : '400px',
      textAlign: 'left' as 'left',
      maxHeight: '200px', // 최대 높이 설정
      overflowY: 'auto' as 'auto', // 내용이 많아지면 스크롤바 생성
      // 움푹 들어간 효과를 위한 inset box-shadow
      boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.9)',
      transition: 'box-shadow 0.3s ease-in-out', // 부드러운 효과를 위해 트랜지션 추가
    },
    logBox: {
      // 로그 메시지 목록을 감싸는 박스에 추가적인 스타일이 필요하면 여기에 추가
    },
    logMessage: {
      margin: '5px 0',
      fontSize: isMobile ? '0.85em' : '0.95em', // 글자 크기 살짝 키움
      color: '#333',
      wordBreak: 'break-word' as 'break-word', // 긴 메시지 줄 바꿈
    },
  };
};
 
export default Login;