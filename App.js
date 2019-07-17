import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider as PaperProvider } from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import codePush from "react-native-code-push";

import Navigation from './App/Navigation/index.navigation';
import theme from './App/Theme/theme'
import { setTopLevelNavigator } from './App/Services/navigation.service';
import NotifyService from './App/Services/notify.service';


class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <React.Fragment>
        <PaperProvider theme={theme} >
          <Navigation
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef);
            }}
          />
          <DropdownAlert ref={ref => NotifyService.register(ref)} />
        </PaperProvider>
      </React.Fragment>
    );
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIAT
};

App = codePush(codePushOptions)(App);

export default App;