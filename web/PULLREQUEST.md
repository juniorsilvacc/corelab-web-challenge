## Ferramentas e Tecnologias Utilizadas

- [Frontend 💻](./web):
  - [React](https://pt-br.reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [NextJS](https://nextjs.org/)
  - [SCSS](https://sass-lang.com/)
  - [Axios](https://axios-http.com/ptbr/docs/intro)

### Layout

A aplicação contém 5 páginas, sendo elas: Página Home(todos os anúncios), Meus Anúncios, Cadastrar Veículo, Login e Cadastro. As páginas Meus Anúncios e Cadastrar Veículo só podem ser acessadas por usuários autenticados. O usuário logado não pode acessar páginas de não autenticado, caso tente acessar será redirecionamento para a página de Meus Veículos.

### Cards

Através dos cards que o usuário pode favoritar, editar e excluir algum anúncio de veículos. O usuário autenticado pode editar ou excluir apenas anúncios próprios, podendo também favoritar.

### Header

O header para usuário não autenticado será mostrado as páginas Entrar e Cadastrar, quando usuário é autenticado o header é mostrado as páginas de Home, Meus Veículos, Cadastrar Veículos e Logout.
