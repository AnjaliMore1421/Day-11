# Day 11 – Full Real Deep Content

## Deep Theory

### 1)React Architecture: Rendering Engine & Reconciliation Algorithm

React is a JavaScript library for building user interfaces based on reusable components. Its architecture is designed to update the UI efficiently whenever data changes.

---

## 1. Component-Based Architecture

React applications are built using components.

A component is an independent and reusable piece of UI.

### Examples
- Header
- Sidebar
- Login Form
- Button

Each component manages its own structure and logic.

```jsx
function Welcome() {
  return <h1>Hello User</h1>;
}
```

This makes the code:
- reusable
- maintainable
- scalable

---

## 2. Rendering Engine

The rendering engine is responsible for converting React components into elements visible on the browser screen.

### Rendering Flow
**JSX → React Elements → Virtual DOM → Real DOM**

---

### Step 1: JSX

JSX is HTML-like syntax written inside JavaScript.

```jsx
const element = <h1>Hello</h1>;
```

---

### Step 2: React Elements

JSX is converted into JavaScript objects.

```javascript
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

These objects are lightweight representations of the UI.

---

### Step 3: Virtual DOM

React stores UI in memory using a **Virtual DOM**.

The Virtual DOM is a JavaScript copy of the actual DOM.

It helps React compare UI changes without directly touching the browser DOM every time.

---

### Step 4: Real DOM Update

After comparing changes, React updates only the required part of the browser DOM.

This improves performance.

---

## 3. Reconciliation Algorithm

Reconciliation is the process React uses to compare the **old Virtual DOM** with the **new Virtual DOM**.

This process is also called **diffing**.

Its main purpose is to find what changed and update only that part.

---

## 4. How Reconciliation Works

### Initial UI
```jsx
<h1>Hello</h1>
```

### After State Change
```jsx
<h1>Hello Anjali</h1>
```

React compares both Virtual DOM trees.

### Old
```jsx
<h1>Hello</h1>
```

### New
```jsx
<h1>Hello Anjali</h1>
```

It finds that only the text has changed.

So instead of reloading the full page, it updates only the text node.

---

## 5. Diffing Algorithm Rules

React follows some rules for fast comparison.

---

### Rule 1: Different Element Types

If element types change, React destroys the old tree and creates a new one.

### Example
```jsx
<div>Hello</div>
```

to

```jsx
<span>Hello</span>
```

React replaces the entire node.

---

### Rule 2: Same Element Type

If types are the same, React updates only changed attributes.

### Example
```jsx
<button className="red">Click</button>
```

to

```jsx
<button className="blue">Click</button>
```

Only the class changes.

---

### Rule 3: List Elements and Keys

For lists, React uses **keys** to identify items.

```jsx
{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}
```

Keys help React update only changed list items.

Without keys, performance decreases.

---

## 6. Fiber Architecture

Modern React uses **Fiber architecture**.

Fiber is the new reconciliation engine introduced to improve rendering performance.

### Features
- incremental rendering
- task prioritization
- pause and resume work
- smoother UI updates

This helps React handle large applications efficiently.

---

## 7. State Update Flow

When state changes:

```jsx
setCount(count + 1);
```

React performs:

1. create new Virtual DOM
2. compare with old Virtual DOM
3. find difference
4. update Real DOM

This process is fast because only required nodes are changed.

## 2)JSX Compilation Under the Hood (Babel)

JSX allows us to write **HTML-like syntax inside JavaScript**, but browsers cannot understand JSX directly.  
So, before execution, **Babel transpiles JSX into normal JavaScript** that the browser can run.

### Example JSX
```jsx
const element = <h1>Hello Anjali</h1>;
```

### After Babel Compilation
```javascript
const element = React.createElement(
  "h1",
  null,
  "Hello Anjali"
);
```

### Important Points
- Babel is a **JavaScript compiler / transpiler**
- It converts **JSX → `React.createElement()`**
- Makes code **browser-compatible**
- Supports modern **ES6+ features**
- Improves **developer readability**

### React Element Output
After compilation, React creates an object like:

```javascript
{
  type: "h1",
  props: {
    children: "Hello Anjali"
  }
}
```

This object is used to create the **Virtual DOM**.

So, JSX is basically **syntactic sugar for `React.createElement()`**.

## 3)Functional Components vs Class Components

In React, components can be created in **two ways: Functional Components and Class Components**.

---

### 1. Functional Components

Functional components are simple **JavaScript functions** that return JSX.

```jsx
function Welcome() {
  return <h1>Hello Anjali</h1>;
}
```

#### Important Points
- Simple and easy to write
- Uses **Hooks** (`useState`, `useEffect`)
- Better readability

---

### 2. Class Components

Class components are created using **ES6 classes** and extend `React.Component`.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello Anjali</h1>;
  }
}
```

#### Important Points
- Uses lifecycle methods
- Manages state using `this.state`
- Uses `this` keyword

---

### Key Difference

| Functional Component | Class Component |
|---------------------|-----------------|
| Function based | Class based |
| Uses Hooks | Uses lifecycle methods |
| Simple syntax | More complex syntax |
| Preferred in modern React | Mostly legacy code |

So, functional components are preferred today because they are simpler and use Hooks.

## 4)Props Immutability Concept

In React, **props are immutable**, which means they are **read-only** and cannot be modified by the component that receives them. Props are used to pass data from a **parent component to a child component**, allowing data to flow in a **one-way direction** from parent to child.

This one-way data flow helps React applications stay **predictable, easy to debug, and maintainable**.

---

### Example

```jsx
function Child(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  return <Child name="Anjali" />;
}
```

In this example, the `name` prop is passed from the `App` component (parent) to the `Child` component.

The child component can **use the value**, but it should **never modify it directly**.

---

### Why Props Are Immutable?

- Maintains one-way data flow
- Keeps components predictable
- Prevents accidental data modification
- Makes debugging easier
- Improves rendering consistency

So, props should always be treated as **read-only values passed from parent to child**, and any changes must be handled by the parent component.

## 5)State vs Props – Deep Clarity

In React, **State** and **Props** are both used to manage data, but their purpose and behavior are different.

---

### Props

**Props (Properties)** are used to pass data from a **parent component to a child component**.

They are **read-only (immutable)**, which means the child component **cannot modify them directly**.

```jsx
function Child(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  return <Child name="Anjali" />;
}
```

Here, `name` is passed as a prop from `App` to `Child`.

---

### State

**State** is used to store data that belongs to a component and can **change over time**.

Whenever state changes, React automatically **re-renders the component**.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Here, `count` is the state of the component.

---

### Key Difference

| Props | State |
|---|---|
| Passed from parent to child | Managed inside the component |
| Read-only | Mutable using setter |
| Used for communication | Used for dynamic data |
| Cannot be changed by child | Can be updated |

---


- **Props = external data**
- **State = internal data**

For example, if a parent sends a user name, it is a **prop**.  
If a counter value changes on button click, it is **state**.

So, **props are for passing data, while state is for managing changing data inside the component**. 


## 6)Component Lifecycle Simplified in Function Components

In React function components, the component lifecycle is mainly handled using the **`useEffect` Hook**.  
It helps us manage actions when a component is **created (mounted), updated, or removed (unmounted)**.

---

### 1. Mounting

Mounting means when the component is **rendered for the first time**.

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

The empty dependency array `[]` means this runs **only once after the first render**.

---

### 2. Updating

Updating means when **state or props change** and the component re-renders.

```jsx
useEffect(() => {
  console.log("Component Updated");
}, [count]);
```

This runs whenever `count` changes.

---

### 3. Unmounting

Unmounting means when the component is **removed from the UI**.

```jsx
useEffect(() => {
  return () => {
    console.log("Component Unmounted");
  };
}, []);
```

The returned function is called the **cleanup function**.

---

### Simplified Lifecycle Flow

- **Mount** → component loads first time
- **Update** → data changes
- **Unmount** → component removed

So, in function components, **`useEffect` replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`**.

