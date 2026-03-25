import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import useAuthSession from './firebase/useAuthSession';

const AppInner: React.FC = () => {
  useAuthSession();
  return <AppRouter />;
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppInner />
  </Provider>
);

export default App;