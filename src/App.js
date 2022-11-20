
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/Store/store';
import { ConfigProvider } from 'antd';
import Router from './Router/Router';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider direction="rtl">
          <Router />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
