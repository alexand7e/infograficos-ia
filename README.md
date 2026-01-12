# Infográficos Educacionais de IA — Governo do Piauí

## Visão Geral
- 10 infográficos cobrindo fundamentos de IA, de forma progressiva.
- Padrão visual consistente com cabeçalho e rodapé institucionais.
- SVGs animados e otimizados por tópico.
- Modo de alto contraste acessível.
- Servidor Express com rotas e cache.

## Conteúdo
- Páginas: `1.page.html` a `10.page.html`
- SVGs: `assets/svgs/*.svg`
- Servidor: `server.js`

## Instalação
1. Requisitos: Node.js 18+
2. Instale dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Acesse:
   - `http://localhost:3000/infografico/1` (navegação com `<` e `>`)

## Rotas
- `/` - Página de introdução
- `/roadmap` - Roadmap completo com 15 tópicos
- `/infografico/1` a `/infografico/10` - Infográficos individuais
- `/sitemap.xml` - Sitemap para SEO
- `/robots.txt` - Arquivo robots.txt para crawlers
- Arquivos servidos com cache estático (assets) e cache em memória (páginas).

## Acessibilidade
- Botão “Alto Contraste” no cabeçalho de cada página.
- Ajuste de cores e sublinhado de links para melhor legibilidade.

## SEO
- Metadados por página: título, descrição, palavras-chave e canonical.
- Open Graph básico configurado.
- Sitemap XML (`/sitemap.xml`) com todas as páginas do site.
- Robots.txt configurado para permitir indexação.
- Links para sitemap nas páginas principais.

### Configuração da URL Base
Para produção, configure a variável de ambiente `BASE_URL` com a URL do seu domínio:
```bash
export BASE_URL=https://www.governo.piaui.gov.br/ia
npm start
```

O servidor substituirá automaticamente `https://example.com` no sitemap.xml pela URL configurada.

## Estrutura dos Tópicos
1. Ciclo de Machine Learning
2. Redes Neurais Artificiais
3. Transformers
4. LLMs
5. Deep Learning
6. Backpropagation
7. CNNs
8. RNN vs LSTM vs Transformer
9. Função de Perda e Otimização
10. Evolução da IA (1950–2017)

## Desenvolvimento
- Tailwind via CDN (não requer build)
- FontAwesome via CDN
- Animações CSS embutidas nos SVGs (independentes)

## Performance
- `express.static` com `maxAge` e `immutable` para assets
- Cache em memória para HTML servido por rotas

## Licença
- MIT
