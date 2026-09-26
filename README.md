# Bíblia para Todos — site institucional

Site institucional estático para uma ONG que distribui bíblias e apoia projetos de leitura, cuidado e pertencimento. O projeto foi desenvolvido somente com **HTML5 semântico, CSS3 e JavaScript puro**, sem Bootstrap, React ou outras bibliotecas de interface.

## Páginas

- `index.html`: apresentação da ONG, missão, visão, valores, números de impacto e chamada para voluntariado.
- `projetos.html`: seis iniciativas sociais em cards, com público beneficiado e seção de impacto.
- `cadastro.html`: formulário de cadastro de voluntários e doadores.

## Estrutura

```text
ONG-Solidaria/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   ├── banner.jpg
│   ├── voluntarios.jpg
│   └── projetos.jpg
└── README.md
```

## Como executar

Abra `index.html` diretamente no navegador. Para uma experiência mais próxima de produção, sirva a pasta com qualquer servidor HTTP local, por exemplo:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

O site não possui backend: o formulário valida os dados no navegador e exibe uma mensagem de sucesso sem transmitir informações. Em uma implantação real, o evento de envio deve ser conectado a uma API segura, com política de privacidade e armazenamento compatível com a LGPD.

## Boas práticas implementadas

A marcação usa `header`, `nav`, `main`, `section`, `article`, `aside` e `footer`, com apenas um `h1` por página e hierarquia de títulos consistente. Todas as imagens têm texto alternativo, os campos têm `label` associado, a navegação funciona por teclado e o foco possui destaque visual. Também foi incluído um link para pular ao conteúdo principal e suporte a `prefers-reduced-motion`.

O formulário utiliza validação nativa com `required`, `minlength`, `maxlength`, `pattern`, `type="email"` e `type="date"`. O arquivo `js/script.js` adiciona máscaras de CPF, telefone e CEP, mensagens de erro acessíveis e feedback de sucesso após o preenchimento válido.

## Identidade visual

A interface combina verde profundo, verde sálvia, coral e amarelo suave em uma direção institucional acolhedora. A tipografia usa **DM Sans** e **Playfair Display** via Google Fonts; se o acesso externo estiver indisponível, as famílias de fallback do sistema assumem o lugar.
