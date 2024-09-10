import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './store/index.ts'
import { fetchCatsAction, userRegisterAction } from './store/api-actions.ts';
import { Provider } from 'react-redux';

store.dispatch(userRegisterAction());
store.dispatch(fetchCatsAction());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
