import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";

import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory';

import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import ChartContainer from './components/ChartContainer';
// import NowWhat from "./components/NowWhat";

// import { OperationData } from "@apollo/react-hooks/lib/data/OperationData";

//Apollo links conf
const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql'
});
const wsLink = new WebSocketLink( {
	uri: 'ws://react.eogresources.com/graphql',
	options: {
		reconnect: true
	}
});
const link = split(
	( { query } ) => {
		const { kind, operation } = getMainDefinition( query );
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink
);
const cache = new InMemoryCache();
const client = new ApolloClient({link,cache});

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#FF5A5F"
    },
    secondary: {
      main: "#484848"
    },
    background: {
      main: "#767676"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Wrapper>
          <Header />
          {/* <NowWhat /> */}
          <ToastContainer />
        </Wrapper>
      </ApolloProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
