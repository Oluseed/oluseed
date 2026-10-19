import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes';
import { ContentProvider } from './content/ContentProvider';
import { LocaleProvider } from './i18n/LocaleProvider';

const App: React.FC = () => {
  return (
    <LocaleProvider>
      <ContentProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ContentProvider>
    </LocaleProvider>
  );
};

export default App;
