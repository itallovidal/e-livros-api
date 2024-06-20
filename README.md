# Setup do Projeto
Para que tudo rode perfeitamente precisamos instalar e configurar algumas coisas.

### Baixe as dependências

Para baixar as dependências necessárias para o projeto, utilize:

```bash
npm install
```

### Configure o Docker
Crie um container executando o código abaixo ou executando o script do arquivo docker-compose.yaml.

```bash
docker compose up -d
```

Depois de criar o docker, temos que configurar as tabelas. Com o script abaixo iremos atualizar nosso container com as tabelas.

```bash
npx prisma migrate dev
```

### Rodando o projeto
Para startar o projeto basta executar o comando abaixo.
```bash
npm run start:dev
```