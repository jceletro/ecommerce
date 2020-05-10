# Ecommerce JC Eletro

[Roadmap do Projeto](Ecommerce%20JC%20Eletro%20448f41f35ff84fbc85813ea20b8b522b/Roadmap%20do%20Projeto%200bcf99a0dd184b5e9239652caf15a56f.md)

[Cronograma de Entrega de Software](Ecommerce%20JC%20Eletro%20448f41f35ff84fbc85813ea20b8b522b/Cronograma%20de%20Entrega%20de%20Software%2075c4cc85570241b590f54c94669d6c06.csv)

## Como rodar esse projeto

Clone esse repositório digitando o seguinte comando em seu terminal:

```bash
git clone https://github.com/jceletro/ecommerce.git
```

Para rodar esse projeto é necessario  que você tenha o Node.JS instalado, e o Framework Adonis.JS.

Com as dependecias instaladas, na pasta do projeto rode o seguinte comendo para instalar as dependências do projeto:

```bash
yarn
# ou se usa NPM rode
npm install
```

### Migrações

Com o banco de dados configurado no arquivo .env, rode o seguinte comando em seu terminal:

```bash
adonis migration:run
```