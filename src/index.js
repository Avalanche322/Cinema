import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux/rootReducer';

const store = createStore(rootReducer,  composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
<React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
</React.StrictMode>,
document.getElementById('root')
);
reportWebVitals();
