# Rumo — Companion de Reflexão

Companion de reflexão emocional baseado em EFT (Sue Johnson) e Método Gottman.

## Estrutura

```
index.html      → app completa
manifest.json   → configuração PWA
sw.js           → service worker (offline)
icons/          → ícones da app
```

## Deploy no GitHub Pages (gratuito)

1. Cria um repositório no GitHub (ex: `rumo`)
2. Faz upload de todos os ficheiros para a raiz
3. Em **Settings → Pages → Source**, selecciona `main` branch, pasta `/ (root)`
4. A app fica disponível em `https://[teu-user].github.io/rumo`

## Instalar como PWA no iOS

1. Abre a URL no **Safari** (obrigatório — Chrome/Firefox não suportam PWA no iOS)
2. Toca em **Partilhar** (ícone de seta para cima, em baixo)
3. **"Adicionar ao Ecrã de Início"**
4. A app abre em ecrã completo, sem barra do browser

## Chave API Anthropic (para conversa com IA)

1. Cria conta em [console.anthropic.com](https://console.anthropic.com)
2. Gera uma API key (começa com `sk-ant-`)
3. Na app: **Percurso → Definições → API Key Anthropic**
4. Cola a chave e toca em "Guardar chave"

A chave é guardada apenas no teu dispositivo via `localStorage`.  
É enviada directamente para `api.anthropic.com` — nunca passa por terceiros.

## Dados

Todos os dados (diário, intenções, reflexões) ficam guardados localmente  
no dispositivo via `localStorage`. Não existe servidor, não existe conta.

Se limpares os dados do browser/Safari, os registos são apagados.
