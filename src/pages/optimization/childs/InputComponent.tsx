import { useRef, useState } from 'react';

export default function InputComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nameInput, setNameInput] = useState<string>('');

  /*
  Input 에 onChange=(e) => setState(e.target.value)를 사용하는것이 일반적이지만 text 가 하나하나 입력 될때마다 컴포넌트가 리렌더링 된다는 단점 존재
  onChange -> onKeyUp Event 로 해당 기능을 대체하여 렌더링 최적화
  * */
  const inputEvent = () => {
    if (!inputRef.current || inputRef.current.value === '') {
      setNameInput('');
      return;
    }
    const writeWord = inputRef.current.value.toLowerCase();
    setTimeout(() => {
      if (writeWord === inputRef.current?.value.toLowerCase()) setNameInput(writeWord);
    }, 400);
  };

  console.log('Input Component is rendering');
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>{nameInput}</h3>
      <input
        ref={inputRef}
        type='text'
        placeholder='Write name'
        onKeyUp={inputEvent}
        // value={nameInput}
        // onChange={(e) => setNameInput(e.target.value)}
      />
    </section>
  );
}
