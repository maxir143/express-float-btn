import ReactDOM from 'react-dom/client'
import { App } from './App'

ReactDOM.hydrateRoot(
  document.getElementById('app'),
  <App />
)
console.log('hydrated')
