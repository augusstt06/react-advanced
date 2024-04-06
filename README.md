# React Advanced

## 1. Rendering

### References
- [왜 useCallback, React.memo, useMemo를 사용할까?(리랜더링 줄이기 전략)](https://www.youtube.com/watch?v=HHKV9XbXUOw)
    
리액트에서 화면의 렌더링을 야기하는 요인들은 다음과 같다.
- state(setState) 의 변경
- props 의 변화
- 중앙 관리 상태의 변화 (Redux, Recoil...)
- 부모 컴포넌트의 리렌더링

따라서 무분별하게 setState 나 부모자식관계를 설정한다면 불필요한 리렌더링이 일어나 성능저하를 야기할 수 밖에 없기 때문에, 우리는 여러 방법을 통하여 렌더링 최적화를 실시 해야 한다,

리액트의 렌더링 최적화의 대표적인 방법에는  `useMemo`, `useCallback`, `React.memo` 가 있다.

### useMemo
React Hook 중 하나로, CPU 연산이 많은 함수를 캐싱하기 위해 사용한다.
```typescript
export default function Rendering() {
  const [immutable] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    console.log('increment');
    setCount(count + 1);
  };
  const calculate = () => {
    console.log('do calculating...');
    return (immutable + 2 * 2 * 1000 * 27) / 28;
  };

  return (
    <section>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <p>Calculate value : {calculate()}</p>
    </section>
  );
}
```
위 코드를 실행해 보면, 버튼을 클릭할때마다 calculate 함수가 재실행되는 것을 콘솔을 통해 알 수 있다.

그런데 버튼을 클릭해도 immutable 의 값은 변하지 않기 때문에 calculate 의 반환값 역시 같다.
즉, 렌더링할때마다 불필요한 연산을 계속해서 실시하고 있는 것이다.

이러한 상황에서 `useMemo`를 사용 할 수 있다. 
```typescript
export default function Rendering() {
    const [immutable, setImmutable] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        console.log('increment');
        setCount(count + 1);
    };
    const changeImmutable = () => {
        console.log('changeImmutable');
        setImmutable(immutable + 1);
    };

    // 불필요한 연산을 useMemo로 최적화
    const calculate = useMemo(() => {
        console.log('do calculating using useMemo...');
        return (immutable + 2 * 2 * 1000 * 27) / 28;
    }, [immutable]);

    return (
        <section>
            <h2>Count: {count}</h2>
    <div style={{ display: 'flex', gap: '20px' }}>
    <button onClick={increment}>Increment</button>
        <button onClick={changeImmutable}>Change Immutable</button>
    </div>

    <p>Calculate value : {calculate}</p>
    </section>
);
}
```
이렇게 `useMemo`를 사용하여 결과값을 캐싱해주어, dependency array 에 들어있는 변수의 값이 변하지 않는다면, 해당 함수는 동일한 결과값을 가지는 연산을 다시 실시 하지 않는다.

실제로 increment 버튼을 클릭시 `calculate`가 다시 연산되지 않는데 반하여,  change Immutable 버튼을 클릭시, dependency array 의 값이 바뀌기 때문에 연산을 다시 실시하는것을 볼 수 있다.

### useCallback
위에서 사용한 useMemo 와 비슷하게 사용되는 훅으로 `useCallback`이 있다.
마찬가지로, 렌더링 최적화를 위해 사용되는 훅인데 바로 간단한 예시를 보도록 하자.

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';

const set = new Set();
export default function Callback() {
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount((prev) => prev + 1);
    const log = () => console.log('re');
    set.add(log);
    console.log(set);

    return (
        <section>
            <button>
                <Link to={'/rendering'}>Go to Rendering page</Link>
            </button>
            <p>count : {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
);
}
```

위의 코드에서 Increment 버튼을 클릭하면 컴포넌트의 리렌더링이 일어나며 내부의 선언된 객체들이 모두 재선언, 실행된다.
실제로 콘솔창을 열어보면 버튼을 클릭 할때 마다`set`에 새로운 `log` 함수가 추가되는것을 확인 할수 있다. 

그런데 `log` 함수는 리렌더링을 실시할때마다 실행하는 내용이 변경되지 않기때문에 새롭게 생성될 필요가 없는 함수이다.
이런 경우에 `useCallback` 을 사용할 수 있다.

```typescript
const log = useCallback(() => console.log('re'), []);
```
`useCallback`은 **useMemo 가 반환값을 캐싱**하는것과 달리 **함수를 캐싱**할 수 있도록 해준다.
`log` 함수를 useCallback 을 사용한 코드로 변경해서 다시 Increment 버튼을 눌러보면 최초에 log 함수가 set 에 추가된 이후 추가되지 않는 것을 확인 할수 있다.


### React.memo

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ComponentMemo() {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const propsFn = () => {};
  return (
    <section>
      <button>
        <Link to={'/rendering'}>Go to Rendering page</Link>
      </button>
      <p>count : {count}</p>
      <button onClick={increment}>Increment</button>
      <ChildComponent onClick={propsFn} />
    </section>
  );
}

const ChildComponent = ({ onClick }: { onClick: () => void }) => {
  console.log('child component is rendering!');
  return <button onClick={onClick}>Child component</button>;
};
```
간단한 부모자식의 관계로 이루어진 컴포넌트이다. 자식 컴포넌트에 전달된 함수는 부모컴포넌트에서 사용되는 변수인 `count`, `setCount`와 관련이 전혀 없는 함수이다.

이때, Increment 버튼을 클릭하면 과연 자식컴포넌트의 `console.log`는 다시 찍힐까?

당연히, 부모 컴포넌트에서 사용되는 상태의 변화로 부모 컴포넌트가 리렌더링 되면서 자식 컴포넌트 또한 리렌더링된다.

이때, 변경되는 상태와 관련이 없는 `propsFn` 는 변경이 없어 보이지만, 실제로 리렌더링시 원래 할당되어 있던 메모리 주소와 다른 곳에 할당되기 때문에 자식 컴포넌트에서는 props 의 변경이 일어났다고 인식힌다.

그런데, 자식 컴포넌트는 변하는 상태값과 전혀 관련이 없기에, props 와 관련이 없는 상태의 변경에는 자식 컴포넌트는 리렌더링 시키지 않고 싶다면 어떻게 해야할까?

우리가 해야할 일은 2가지이다.
1. **`propsFn`을 캐싱하기**
2. **자식 컴포넌트를 캐싱하기**

`propsFn`을 캐싱하는 것은 위에서 우리가 사용한 `useCallback` 훅을 사용하면 된다. 그렇다면 자식 컴포넌트를 캐싱하는것은?
이것이 바로 `React.memo` 이다.

```typescript
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ComponentMemo() {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const propsFn = useCallback(() => {}, []);
  return (
    <section>
      <button>
        <Link to={'/rendering'}>Go to Rendering page</Link>
      </button>
      <p>count : {count}</p>
      <button onClick={increment}>Increment</button>
      <ChildComponent onClick={propsFn} />
    </section>
  );
}

const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('child component is rendering!');
  return <button onClick={onClick}>Child component</button>;
});
```

수정 후의 코드를 보면 `propsFn`을 `useCallback`을 사용하여 캐싱한다. 여기까지 했다면 리액트 랜더링의 `commit phase`에 대해서는 최적화가 이루어졌다.

하지만 아직 `render phase`에 대한 최적화가 이루어지지 않았고, 이것을 바로 `React.memo`를 통하여 최적화를 실시해주면 비로소 버튼 클릭시 자식 컴포넌트가 리렌더링 되지 않는 것을 확인 할 수 있다.. 
