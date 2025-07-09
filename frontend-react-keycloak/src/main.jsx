import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'meu-realm',
  clientId: 'frontend-client'
});

keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
  if (authenticated) {
    console.log("Token:", keycloak.token);
    console.log("Papéis:", keycloak.tokenParsed?.realm_access?.roles);

    ReactDOM.createRoot(document.getElementById('root')).render(
      <App keycloak={keycloak} />
    );
  } else {
    window.location.reload();
  }
}).catch(error => {
  console.error("Erro ao iniciar Keycloak:", error);
});