import { useRef, useState } from 'react';

import ForwardComponent from '@/pages/ref/childs/Foward.tsx';

export default function Ref() {
  /* ref
  -> DOM 에 직접 접근하여 조작을을 해야할 필요성이 있을때 사용하는 키워드
  ---> ex) input focus
  -> ref 를 자식 컴포넌트의 props 로 전달해야하는 경우라면 forwardRef 를 사용한다.
  ---> ex) dialog
  */

  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleOpenDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };
  const handleCloseDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogText, setDialogText] = useState<string>('');

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };
  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.disabled = true;
      inputRef.current.value = '';
    }
  };
  return (
    <section>
      <h2>Ref</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input ref={inputRef} disabled />
        <button onClick={focusInput}>focus</button>
        <button onClick={resetInput}>reset</button>
      </div>
      <button onClick={handleOpenDialog}>Open Dialog</button>
      <ForwardComponent
        ref={dialogRef}
        dialogText={dialogText}
        setDialogText={setDialogText}
        handleCloseDialog={handleCloseDialog}
      />
    </section>
  );
}
