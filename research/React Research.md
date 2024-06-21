





# REACT







<details>

<summary><strong>Table of Contents</strong></summary>
<strong>1. Introduction to React</strong><br>
1.1 What is React?<br>
1.2 Why Use React?<br>
1.3 Key Concepts (Components, State, Props)<br><br>
<strong>2. Setting Up Your Development Environment</strong><br>
2.1 Installing Node.js and npm<br>
2.2 Understanding Create React App<br>
2.3 Navigating the Project Structure<br><br>
<strong>3. Building Your First React Component</strong><br>
3.1 Creating a Simple Component<br>
3.2 JSX: JavaScript XML<br>
3.3 Rendering Components<br><br>
<strong>4. Managing State and Props</strong><br>
4.1 Introduction to State<br>
4.2 Working with Props<br><br>
<strong>5. Component Lifecycle</strong><br>
5.1 Understanding the Component Lifecycle<br>
5.2 Mounting, Updating, and Unmounting<br><br>
<strong>6. Handling Events and User Input</strong><br>
6.1 Event Handling in React<br>
6.2 Forms and Controlled Components<br>
6.3 Conditional Rendering<br><br>
<strong>7. Styling React Components</strong><br>
7.1 Inline Styles<br>
7.2 Using CSS Modules<br>
7.3 Popular CSS-in-JS Libraries<br><br>
<strong>8. Working with Lists and Keys</strong><br>
8.1 Lists<br>
8.2 Keys<br><br>
<strong>9. Routing with React Router</strong><br>
9.1 Setting Up React Router<br>
9.2 Creating Routes and Navigation<br><br>
<strong>10. Sources</strong><br>

</details>





# 1. Introduction to React
React is a front-end JavaScript library for making user interfaces. JSX is an XML syntax extension to JavaScript. Vite is a JavaScript bundler that takes the React JSX code and turns it into raw HTML, CSS, and JavaScript files that can be used by browsers. The files can then be hosted and served to end users. Vite makes the developer process faster because it is optimized for small to medium sized projects with faster build times. Since React is catered towards large scale and highly complex projects it can be overkill for the smaller projects.

<strong>1.1 What is React?</strong>

- Origin: React was first developed by Facebook in 2011 and was later open-sourced. It has since gained immense popularity in the web development community.

- Declarative: React uses a declarative approach to building UIs, which means you describe what you want your UI to look like, and React takes care of updating it when data changes.

- Component-Based: React is centered around the concept of components. Components are reusable building blocks that can be combined to create complex user interfaces.

- Virtual DOM (Document Object Model): One of React's key optimizations is the use of a virtual DOM. It keeps a lightweight copy of the actual DOM and updates it efficiently to minimize browser reflows and repaints.

- JavaScript and JSX: React code is primarily written in JavaScript, but it uses JSX (JavaScript XML) for defining component structures in a syntax that resembles HTML.


<strong>1.2 Why Use React?</strong>

- Efficiency: React's virtual DOM allows for efficient updates, making it ideal for building responsive and fast web applications.

- Reusability: Components are reusable, which encourages a modular and maintainable code structure.

- Community and Ecosystem: React has a vibrant community and a vast ecosystem of libraries and tools that enhance development.

- Performance: React's architecture ensures that your application runs smoothly, even as it scales.

- Popular Adoption: Many tech giants and startups use React, ensuring its relevance in the industry.


<strong>1.3 Key Concepts (Components, State, Props)</strong>

- Components: In React, everything is a component. Components are self-contained, reusable pieces of UI that can be composed to create complex interfaces.

- Virtual DOM: React's virtual DOM is an in-memory representation of the actual DOM. It allows React to make efficient updates and minimize direct interaction with the real DOM.

- State: State represents the data that a component needs to keep track of. It enables components to be dynamic and responsive to user interactions.

- Props (Properties): Props are a way of passing data from parent to child components. They make it easy to share information between components.

- Declarative Programming: React encourages a declarative programming style, where you describe the desired outcome rather than the step-by-step instructions to achieve it.

- Component-Based Architecture: React promotes building applications as a tree of components, each responsible for a specific part of the UI.

- Single Page Applications (SPAs): React is commonly used in SPAs, where a single HTML page is dynamically updated instead of loading multiple pages from the server.


# 2. Setting Up Your Development Environment
<strong>2.1 Installing Node.js and npm</strong>

- Node.js: Visit [nodejs.org](https://nodejs.org/) to download the installer for your operating system. Node.js is a JavaScript runtime that allows you to execute JavaScript on the server side and includes npm, which is used to manage packages (libraries and tools) for your project.

- npm: Once Node.js is installed, npm is available by default. You can verify the installation by opening your terminal or command prompt and running ‘node -v’ and ‘npm -v’. These commands should display the installed Node.js and npm versions.




# 3. Building Your First React Component
<strong>3.1 Creating a Simple Component</strong>

- Step 1: Export the Component
The standard JavaScript syntax export default is a prefix that lets you mark the main function in a file so you can import it from other files.

- Step 2: Define the Function
With the 'function Profile() { }' declaration you define a JavaScript function with the name Profile.

- Step 3: Add Markup
The component returns an '<img />' tag with 'src' and 'alt' attributes. This syntax is called JSX, and it lets you embed markup inside JavaScript. Return statements can be written like this:
```js
return <img src =”image link” alt=”name of image” />;
```
OR like this (if on more than 1 line):
```js
return (
<div>
<img src =”image link” alt=”name of image” />;
</div>
);
```
<strong>3.2 JSX: JavaScript XML</strong>

JavaScript XML is a syntax extension to JavaScript which makes it easier for developers as a visual aid to help them when using React. It essentially describes what the UI should look like.

<strong>3.3 Rendering Components</strong>

Components can be nested within other components. For example, you can create a gallery that has multiple components of images inside it.

```js
function Profile() {
  return (
    <img
src="https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0W
mvOXPd9CNzaUcwcibiGao3CL.jpg"
alt="example image name"
    />
  );
}
```
```js
export default function Gallery() {
  return (
    <section>
      <h1>Gallery Title</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```




# 4. Managing State and Props


<strong>4.1 Introduction to State</strong>

State is a fundamental concept in React that allows components to store and manage data that can change over time. State enables components to be dynamic and responsive to user interactions.

- State Initialization: You can initialize state within a component using the ‘useState’ hook or by defining a ‘state’ object in a class component's constructor.

- Updating State: State can be updated using the ‘setState’ function or by using the functional form of ‘setState’, which ensures that state updates are based on the previous state.

- Asynchronous State Updates: State updates in React are asynchronous. This means that you should not rely on the immediate state update when setting or modifying state.

- Local vs. Shared State: Consider whether a piece of state should be local to a component or shared among multiple components. React provides solutions like Context API and Redux for managing shared state.

Example: 
```js
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
```


<strong>4.2 Working with Props</strong>

Props, short for properties, are a way to pass data from a parent component to a child component in React. 

- Passing Props: Props are passed from parent to child components as attributes. You define them in the parent component and access them in the child component.

- Immutable Props: Props in React are immutable, which means that a child component cannot modify the props it receives from its parent.

- Default Props: You can specify default values for props using the ‘defaultProps’ property, ensuring that your component works gracefully even if certain props are not provided.

- Prop Types: Using PropTypes (or TypeScript in TypeScript projects) allows you to specify the expected types of props, which can help catch type-related errors during development.

- Destructuring Props: ES6 destructuring syntax makes it easy to extract specific props from the props object, improving code readability.

Example: 
```js
function Car(props) {
  return <h2>I am a { props.brand }!</h2>;
}

function Garage() {
  return (
    <>
	    <h1>Who lives in my garage?</h1>
	    <Car brand="Ford" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```




# 5. Component Lifecycle

   
<strong>5.1 Understanding the Component Lifecycle</strong>

There are 3 main phases in a React component lifecycle. These phases are Mounting, Updating and Unmounting. You can monitor and manipulate a component during this lifecycle.


<strong>5.2 Mounting, Updating, and Unmounting</strong>

<em>Mounting</em> is when you put elements into the DOM. There are 4 methods that get called (in this order) when mounting a component: 'constructor()', 'getDerivedStateFromProps()', 'render()', 'componentDidMount()'.

The next phase is <em>Updating</em>. Whenever there is a change in the component’s state or props, a component is updated. There are 5 methods that get called (in this order) when a component is updated: 'getDerivedStateFromProps()', 'shouldComponentUpdate()', 'render()', 'getSnapshotBeforeUpdate()', 'componentDidUpdate()'. Every other method besides 'render()' is optional and will be called if defined.

The next phase is <em>Unmounting</em>. This is when a component is removed from the DOM. There is only 1 method that gets called when a component is unmounted: 'componentWillUnmount()'.




# 6. Handling Events and User Input

   
<strong>6.1 Event Handling in React</strong>

- Event Handling Syntax: Event handlers are typically defined as functions and attached to JSX elements using the onEvent naming convention. For example, ‘onClick’, ‘onChange’, and ‘onSubmit’ are common event handlers.

- Passing Data with Events: You can pass additional data to event handlers by defining custom functions and using arrow functions or the bind method. This allows you to access data related to the event or the component's state.

- Event Object: React event handlers receive a synthetic event object, which is a cross-browser wrapper for the native event. This object contains information about the event, such as the target element and event type.

Example: 
```js
function Football() {
  const shoot = () => {
    alert("Great Shot!");
  }

  return (
    <button onClick={shoot}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```


<strong>6.2 Forms and Controlled Components</strong>

React provides a concept called "controlled components" to manage form elements

- Controlled Components: In React, form elements like ‘input’, ‘textarea’, and ‘select’ are controlled by state. This means that their values are controlled by React's state and updated through event handlers.

Example: 
```js
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```


<strong>6.3 Conditional Rendering</strong>

Conditional rendering allows you to display or hide elements based on certain conditions. Please consult the [Conditional Rendering documentation](https://legacy.reactjs.org/docs/conditional-rendering.html) on how to apply this in your code.  





# 7. Styling React Components

   
<strong>7.1 Inline Styles</strong>

In inline styling we create objects of style and render them inside the components in style attribute using the React technique to incorporate JavaScript variable inside the JSX (Using ‘{ }’ )


<strong>7.2 Using CSS Modules</strong>

A CSS module is a simple CSS file but, by default when it is imported every class name and animation inside the CSS module is scoped locally to the component that is importing it. Also a CSS file name should follow the format ‘filename.module.css’. This allows us to use a valid name for CSS classes without worrying about conflicts with other class names in your application.
To use CSS modules, create a normal CSS file and import the module you have created from within your component using this syntax:
```js
import styles from './filename.module.css
```


<strong>7.3 Popular CSS-in-JS Libraries</strong>

Some popular CSS-in-JS Libraries include: Styled Components, CSS Modules, Styled JSX, Emotion, JSS, Styled System, Stitches, Windi CSS, Theme UI and vanilla-extract.




# 8. Working with Lists and Keys
Lists are a common part of user interfaces, and React provides efficient ways to render, update, and manage lists of items dynamically.


<strong>8.1 Lists</strong>

- Dynamic Content Rendering: React lists are a feature for rendering dynamic content. They allow developers to display arrays of data or dynamically generated elements in a structured way, such as a list of user comments, product cards, or search results.

- Using the 'map' Function: You create React lists by using the ‘map’ function on an array. This function iterates over each item in the array, allowing you to create React elements for each item and return them as a list.

Example: 
```js
function Car(props) {
  return <li>I am a { props.brand }</li>;
}

function Garage() {
  const cars = [
    {id: 1, brand: 'Ford'},
    {id: 2, brand: 'BMW'},
    {id: 3, brand: 'Audi'}
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car key={car.id} brand={car.brand} />)}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```


<strong>8.2 Keys</strong>

- Key Prop Purpose: The key prop is an attribute used within lists to help React identify each item uniquely.

- Uniqueness Requirement: Keys should be unique among siblings in the list. They don't need to be globally unique but must be unique within the scope of the list to which they belong.

- Optimizing Rendering: React uses keys to determine which items have changed, been added, or been removed in a list. Without keys, React may re-render the entire list when changes occur, which can be inefficient.

Example: 
```js
function ListItem(props) {

 // Correct! There is no need to specify the key here:
 return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>

   // Correct! Key should be specified inside the array.
   <ListItem key={number.toString()} value={number} />
 );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```




# 9. Routing with React Router

    
<strong>9.1 Setting Up React Router</strong>

To install React Router, all you have to do is run
```
npm install react-router-dom@6
```
in your project terminal. If you are using yarn, run
```
yarn add react-router-dom@6.
```
Next you have to make React Router available anywhere in your app by opening the index.js file in the src folder and import BrowserRouter from react-router-dom and then wrap the root (App) component in it.


<strong>9.2 Creating Routes and Navigation</strong>

First, multiple components will need to be made in order to navigate between them (For example we will create Home, About and Contact components). Since the App component acts as the root component where the React code gets rendered from initially, we will be creating all our routes in it.

Example:
```js
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </div>
  )
}

export default App
```
<em>Routes</em> is a container for all the routes that will be created. <em>Route</em> is used to create a single route, and it takes in 2 attributes: 'path' (URL path of the component which is named whatever you want), and 'element' (specifies the component the route should render).

We now need to use Link to navigate the routes. For example, we can create this Link:
```js
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
      <Link to="contact">Click to view our contact page</Link>
    </div>
  );
}

export default Home;
```
When you click the link it will go through your routes and render the component with the pathname specified.




# 10. Sources


https://legacy.reactjs.org/docs/faq-state.html 

https://www.w3schools.com/react/react_state.asp 

https://www.w3schools.com/react 

https://en.m.wikipedia.org/wiki/React_(software)

https://www.reddit.com/r/reactjs/comments/138tx9f/what_is_the_difference_between_plain_react_vs/#:~:text=React%20is%20exclusively%20a%20UI,and%20served%20to%20end%20users.

https://www.w3schools.com/whatis/whatis_react.asp

https://dev.to/musabdev/create-react-app-vs-vite-choosing-the-right-build-tool-for-your-project-3ni1#:~:text=Vite%20is%20optimized%20for%20speed,further%20enhances%20the%20development%20experience.


https://react.dev/learn/your-first-component

https://www.w3schools.com/react/react_lifecycle.asp

https://www.geeksforgeeks.org/8-ways-to-style-react-components/

https://stackdiary.com/css-in-js-libraries/

https://www.freecodecamp.org/news/how-to-use-react-router-version-6/
