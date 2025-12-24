# MaxBeauty - App de Análise de Pele com IA

Aplicativo web de análise de pele com inteligência artificial, desenvolvido com foco mobile-first e interface em português brasileiro.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Zustand** (state management)
- **React Hook Form** (formulários)

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📱 Páginas

- `/` - Landing page
- `/onboarding` - Quiz de onboarding (5 steps)
- `/analyze` - Upload/captura de foto (com câmera mobile)
- `/analyzing` - Loading durante análise
- `/results` - Dashboard de resultados
- `/routine` - Rotina de skincare personalizada
- `/compare` - Comparação Antes/Depois
- `/offer` - Tela de oferta/checkout

## 🎨 Design System

- **Cores primárias**: Rosa suave (#E8B4B8), Marrom escuro (#67595E)
- **Tipografia**: Playfair Display (headings), Inter (body)
- **Componentes**: Cards, Buttons, Progress bars com animações suaves
- **Mobile-first**: Interface otimizada para dispositivos móveis

## 📝 Funcionalidades

- ✅ Quiz interativo de onboarding
- ✅ Upload de fotos e captura via câmera (mobile)
- ✅ Análise simulada de pele com métricas
- ✅ Rotina personalizada de skincare
- ✅ Comparação antes/depois
- ✅ Interface totalmente em português brasileiro
- ✅ Design mobile-first responsivo

## 🚢 Deploy no Vercel

### 1. Conectar ao GitHub

```bash
# Criar repositório no GitHub primeiro, depois:
git remote add origin https://github.com/SEU_USUARIO/maxbeauty.git
git branch -M main
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `maxbeauty`
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Clique em "Deploy"

O Vercel detectará automaticamente as configurações do Next.js e fará o deploy.

### 3. Variáveis de Ambiente (se necessário)

Se no futuro você adicionar variáveis de ambiente, configure-as no painel do Vercel:
- Settings → Environment Variables

## 📝 Notas

Este é um protótipo visual (v.0) com dados mockados. Todas as funcionalidades são simuladas para apresentação ao cliente.

## 🔧 Próximos Passos

- [ ] Integração com API real de análise facial
- [ ] Backend com banco de dados
- [ ] Autenticação de usuários
- [ ] Storage de imagens
- [ ] Sistema de pagamento

## 📄 Licença

Este projeto é privado e proprietário.
