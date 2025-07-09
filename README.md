# Sistema CRUD com autenticação via Keycloak

Este projeto é um CRUD simples de pessoas, com front-end em React e back-end em Spring Boot. O login é feito via Keycloak (OAuth2), e o sistema só permite deletar se o usuário tiver papel de administrador.

## Tecnologias usadas

- Java 17 + Spring Boot
- Banco H2 em memória
- React com Vite
- Keycloak (rodando via Docker)

---

## Como rodar

### 1. Keycloak

Abra um terminal e rode:

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.3 start-dev
```

Depois acesse [http://localhost:8080](http://localhost:8080) e:

1. Faça login com `admin` / `admin`
2. Crie um novo realm: `meu-realm`
3. Crie um client:
   - Nome: `frontend-client`
   - Tipo: `public`
   - URL de redirecionamento: `http://localhost:5173/*`
4. Crie um papel chamado `admin`
5. Crie um usuário:
   - Nome de usuário: `usuario`
   - Defina a senha e **desative** a opção "Senha temporária"
   - Vá em "Role Mappings" e adicione o papel `admin`

---

### 2. Back-end

No terminal, entre na pasta do back:

```bash
cd backend-springboot-keycloak
```

Depois rode:

```bash
./mvnw spring-boot:run
```

O back sobe em `http://localhost:8081`

---

### 3. Front-end

Em outro terminal:

```bash
cd frontend-react-keycloak
npm install
npm run dev
```

O front vai abrir em `http://localhost:5173` e já redireciona pro login.

---

## Observações

- A API só permite deletar registros se o token do usuário contiver o papel `admin`.
- Os dados são salvos em banco H2 em memória. Reiniciou, somem.

---

## Sobre

Esse projeto foi desenvolvido como entrega final de disciplina. O foco principal era integrar autenticação segura com backend REST e proteger as operações com base no papel do usuário.
