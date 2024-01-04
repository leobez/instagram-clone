# Reactgram

<hr> 

O site esta sendo hospedado com os serviços [netlify](https://www.netlify.com/)

API sendo hoestada localmente com uso do [ngrok](https://ngrok.com/docs/getting-started/)

API atualmente desativada.

O site pode ser acessado [aqui](https://reactgramleobez.netlify.app/)

<hr>

Site clone do instagram, feito durante o curso de React na [Udemy](https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/)

Site feito com o propósito de unificar conhecimento Frontend e Backend, utilizando das tecnologias React, Nodejs, Express.js e o banco de dados mongoDB.

<hr>

## Backend

O sistema foi feito utilizando da arquitetura MVC (Model View Controller).

- Models (`User` e `Photo`) representam os moldes das entidades do sistema. Aqui são definidos seus atributos. 

- Views representam a visualização da informação pelo usuário final, algo que é tratado no Frontend.

- Controllers permitem determinar as funções referentes a cada um dos Models. Funções essas que serão acessadas pelos endpoints da API.

Através do framework Express, foram criados endpoints que possibilitam executar alguma ação no banco de dados.

Os endpoints foram separadas entre rotas de cada uma das entidades do sistema, no caso: `User` e `Photo`.

### User endpoints

<hr>

`/api/users/register`: POST. Registra o usuário no banco de dados.

`/api/users/login`: POST. Valida o usuário no sistema, através de uma validação no banco de dados.

`/api/users/profile`: GET. Recupera informações sobre o usuário atual.

`/api/users/`: PUT. Edita informações do usuário atual. 

`/api/users/:id`: GET. Recupera informações sobre um usuário de determinado `id`.

### Photo endpoints

<hr>

`/api/photos/`: POST. 

`/api/photos/:id`: DELETE. Exclui uma fotos do banco de dados baseado em seu `id`.

`/api/photos/`: GET. Recupera todas as fotos do banco de dados. 

`/api/photos/user/:id`: GET. Recupera todas as fotos de um determinado usuário.

`/api/photos/search`: GET. Recupera fotos baseado em uma query, através do argumento `?q=`.

`/api/photos/:id`: GET. Recupera uma foto baseado em seu `id`.

`/api/photos/:id`: PUT. Edita as informações de uma foto. 

`/api/photos/like/:id`: PUT. Edita o atributo likes[] da foto. 

`/api/photos/comment/:id`: PUT. Edita o atributo comments[] da foto.

<hr>

## Frontend

O Frontend do site foi criado com React, além do uso do Redux a fim de gerenciar os estados da aplicação. 

Com o Redux, foram criados `services` e `slices` a fim de gerenciar a conexão com os endpoints da API e os estados provenientes dessa conexão. 

Foram criados funções, tanto nos `services` como no `slices` para cada ação possível no sistema, que já foram tratadas na seção de Backend.


