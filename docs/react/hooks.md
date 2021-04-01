## Hook 使用指南

### useRef

`useRef` 之所以名字中有 ref 是因为它经常用在 `<div ref={myRef} />` 的场景中，可以实现与 DOM 元素的绑定：

``` jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向绑定的 input 元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

> 在 class 组件中，可以使用 `this.myRef = React.createRef();` 达到同样的效果

除了用于绑定 DOM 元素，`useRef` 还可以在函数式组件中实现 class 组件里属性的效果，做到在整个组件的生命周期保持值的一致性，并且在值发生改变时不触发组件的重新渲染。 例如在下面的代码中，用 `intervalRef.current` 记录计时器的 id，然后在组件清理阶段停止计时器：

``` js
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```
