import ReactDOM from 'react-dom';
import 'lib-flexible';
import App from './App'
import './style/index.scss'
import fastclick from 'fastclick';

fastclick.attach(document.body);

ReactDOM.render(App, document.getElementById('root'));

