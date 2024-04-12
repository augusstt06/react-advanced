import { ChangeEvent, Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react';

interface ForwardProps {
  dialogText: string;
  setDialogText: Dispatch<SetStateAction<string>>;
  handleCloseDialog: () => void;
}
const ForwardComponent = forwardRef((props: ForwardProps, ref: ForwardedRef<HTMLDialogElement>) => {
  const { dialogText, setDialogText, handleCloseDialog } = props;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDialogText(e.target.value);
  };
  return (
    <dialog ref={ref}>
      <h1>Child Dialog Component</h1>
      <h2>{dialogText}</h2>
      <input type='text' value={dialogText} onChange={handleChangeInput} />
      <button onClick={handleCloseDialog}>Close</button>
    </dialog>
  );
});
export default ForwardComponent;
