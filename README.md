# Proposta Comercial — Adailton Melo

Proposta comercial interativa para a gestão de redes sociais da marca **Treino Sem Molezinha**, de Adailton Melo.

## Recursos

- identidade visual em preto, branco e laranja;
- apresentação dos serviços e estratégia de conteúdo;
- comparação interativa entre os planos Essencial, Intermediário e Premium;
- cálculo automático do investimento do primeiro mês;
- detalhes expansíveis da página de vendas;
- mensagem personalizada e contato direto pelo WhatsApp;
- animações responsivas e suporte a preferência de movimento reduzido.

## Publicação

O projeto gera uma versão estática com Next.js e é publicado automaticamente no GitHub Pages a cada envio para a branch `main`.

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/proposta-comercial-adailton-melo npm run build:pages
```

O resultado estático é criado na pasta `out`.
