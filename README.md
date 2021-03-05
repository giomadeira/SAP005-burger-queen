![img](src/img/logo.png)

## Índice

- [1. Introdução](#1-Introdução)
- [2. Sobre o NaBrasa](#2-sobre-o-nabrasa)
- [3. Histórias de Usuários](#3-histórias-de-usuários)
- [4. Planejamento e Organização](#4-planejamento-e-organização)
- [5. Tecnologias Utlizadas](#5-tecnologias-utilizadas)
- [6. Implementação Futuras](#6-implemetações-futuras)
- [7. Desenolvedoras](#7-desenvolvedoras)


---

## 1. Introdução

Projeto realizado durante o [Bootcamp Laboratória](https://github.com/Laboratoria) onde foi proposto o desafio de criar uma aplicação 100% por demanda para uma hamburgueria em crescimento. Desenvolvemos uma aplicação responsiva para Tablet responsável por fazer a gestão da hamburgueria de forma sincronizada e eficiente entre os setores de salão e cozinha

## 2. Sobre o NaBrasa

> Nós temos 2 menus. Um muito simples para o café da manhã:
>
> | Ítem                  | Preço R\$ |
> | --------------------- | --------- |
> | Café americano        | 5         |
> | Café com leite        | 7         |
> | Misto Quente          | 10        |
> | Suco de fruta natural | 7         |
>
> E outro menu para o resto do dia:
>
> | Ítem                | Preço   |
> | ------------------- | ------- |
> | **Hambúrgueres**    | **R\$** |
> | Hambúrguer simples  | 10      |
> | Hambúrguer duplo    | 15      |
> | **Acompanhamentos** | **R\$** |
> | Batata frita        | 5       |
> | Anéis de cebola     | 5       |
> | **Bebidas**         | **R\$** |
> | Água 500ml          | 5       |
> | Água 750ml          | 7       |
> | Refrigerante 500ml  | 7       |
> | Refrigerante 750ml  | 10      |
> 

>
> **Importante:** Os clientes podem escolher entre hambúrgueres de carne bovina,
> frango ou vegetariano. Além disso, por um adicional de R\$ 1,00 , eles podem
> adicionar queijo **ou** ovo.
>
> Nossos clientes são bastante indecisos, por isso é muito comum que eles mudem o
> seu pedido várias vezes antes de finalizar.

A interface deve mostrar os dois menus (café da manhã e restante do dia), cada
um com todos os seus _produtos_. O usuário deve poder escolher que _produtos_
adicionar e a interface deve mostrar o _resumo do pedido_ com o custo total.


## 3. Oraganização de Tarefas

Trabalhamos durante 4 sprints de acordo com as Histórias de Usuários fornecidas pelo _Product Owner_

---

#### História de usuário 1: Criar perfil

- [ ] Poder realizar cadastro com e-mail, senha e função.
- [ ] Poder realizar login com e-mail e senha.
- [ ] Redirecionar para a tela correta.

![Watch the video](https://media.giphy.com/media/TnQkPIdIDYlu5Z5ieG/giphy.gif)

----

#### História de usuário 2: Anotar pedidos

- [ ] Digitar o nome do cliente e mesa.
- [ ] Filtrar _menu_ para _café da manhã_ e _almoço/jantar_.
- [ ] Adicionar item ao pedido.
- [ ] Excluir item do pedido.
- [ ] Mostrar _resumo_ do pedido com todos os itens e o total.
- [ ] Enviar para a cozinha (isso deve salvar o pedido).

![Watch the video](https://media.giphy.com/media/X3N98f46rnlAVNgNim/giphy.gif)

---

#### História de usuário 3: Ver pedidos na cozinha

- [ ] Visualizar pedidos pendentes para produção.
- [ ] Marcar pedido como pronto para entrega.
- [ ] Ver histórico dos pedidos

![Watch the video](https://media.giphy.com/media/OIMG4WrAjJEaejfwAF/giphy.gif)

---

#### HU 4: Entrega de pedidos

- [ ] Visualizar pedidos pendentes para entrega.
- [ ] Marcar pedido como entregue ao cliente.

![Watch the video](https://media.giphy.com/media/Ckng20AcVXlvm5w4yQ/giphy.gif)

---

## 7. Dicas e leituras complementares

### Primeros passos

- Para iniciar este projeto você terá que fazer um _fork_ e _clone_ deste repositório

- Crie um projeto usando `create-react-app`

- Leia a documentação da [Burger Queen API](https://lab-api-bq.herokuapp.com/api-docs/)

---


- [Postman](https://www.postman.com/)

#### Testes

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/)

#### Configuração de ESLint

- [ESLint + Prettier](https://henriquetavares.com/pt-br/setting-eslint-on-reactjs-and-react-native/)

#### Deploy

- [Opções de deploy com Create React App](https://create-react-app.dev/docs/deployment)
- [Deploy + Netlify (vídeo)](https://drive.google.com/file/d/1hzlB8dl4m0OnLLY2-WpjSLcU7eYTURRk/view)
- [Deploy + Heroku (vídeo)](https://drive.google.com/file/d/1eqx6yuwJnAU-R83ta89tgEem7ABZigNG/view)
- [Deploy + Vercel (vídeo)](https://drive.google.com/file/d/1Q9q1iVnRrWeEhGRns0r5OOeiqloQug8y/view)

---

