# Backend - Spring Boot com Keycloak

### Rodar o projeto

1. Certifique-se de que o Keycloak está rodando em `http://localhost:8080` com o realm `meu-realm`.
2. Navegue até a pasta do projeto e rode:

```
./mvnw spring-boot:run
```

3. A API estará disponível em `http://localhost:8081/pessoas`.

Inclui autenticação JWT via Keycloak e autorização com roles.