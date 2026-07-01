# Déploiement Hostinger — État actuel (2026-07-01)

Ce document décrit exactement ce qui a été fait pour déployer le site **complexe-scolaire-afrika.com** sur le VPS Hostinger (le même serveur que evoyamwana.com), et comment continuer à partir d'ici.

## Vue d'ensemble

```
complexe-scolaire-afrika.com / www...   →  Traefik (HTTPS, Let's Encrypt)  →  container csa-web (nginx, build Vite statique)
api.complexe-scolaire-afrika.com        →  Traefik (HTTPS, Let's Encrypt)  →  container csa-api (Node/Express, port 4001)
csa-api                                 →  Gmail SMTP (envoi d'email du formulaire de contact)
```

Contrairement à evoyamwana, ce site n'a **pas de base de données**. Le seul rôle du petit backend (`csa-api`) est de recevoir les soumissions du formulaire de contact et de les envoyer par email via SMTP Gmail.

## Infrastructure

- Même VPS que evoyamwana : `srv1797721`, IP publique `31.97.53.228`.
- Accès : terminal navigateur Hostinger (hPanel → VPS → Docker Manager → Terminal), ou `ssh hostinger` depuis le Mac (déjà configuré).
- Le projet n'apparaît pas dans la liste "Docker projects" du panneau Hostinger (comme evoyamwana) car il a été lancé directement via `docker compose` en ligne de commande, pas via l'interface "Compose" de Hostinger. Ça ne change rien au fonctionnement.

## Le formulaire de contact

Le composant `src/components/sections/Contact.tsx` était à l'origine un faux formulaire : `handleSubmit` faisait juste `preventDefault()` et affichait un message de succès sans rien envoyer. Il a été modifié pour appeler une vraie API :

```ts
const apiUrl = import.meta.env.VITE_API_URL || ''
const res = await fetch(`${apiUrl}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

Un état `status` (`idle` / `loading` / `error`) a été ajouté pour désactiver le bouton pendant l'envoi et afficher un message d'erreur si ça échoue.

### Le backend (`server/`)

Petit serveur Express + Nodemailer (`server/server.js`), une seule route `POST /contact` qui envoie un email via **SMTP Gmail** :

- Expéditeur : `complexescolaireafrika1988@gmail.com`
- Authentification : mot de passe d'application Gmail (16 caractères), généré depuis Google Account → Sécurité → Validation en deux étapes → Mots de passe des applications.
- Destinataire : la même boîte Gmail (`complexescolaireafrika1988@gmail.com`).

Ces valeurs sont dans le fichier `.env` sur le VPS (`/root/complexe-scolaire-afrika/.env`, pas dans git) :

```
SMTP_USER=complexescolaireafrika1988@gmail.com
SMTP_PASS=<mot de passe d'application, 16 caractères>
CONTACT_TO=complexescolaireafrika1988@gmail.com
CORS_ORIGIN=https://complexe-scolaire-afrika.com,https://www.complexe-scolaire-afrika.com
VITE_API_URL=https://api.complexe-scolaire-afrika.com
```

Si le mot de passe d'application Gmail doit être régénéré un jour (perte, changement de sécurité du compte), il suffit de modifier ce fichier `.env` sur le VPS et de relancer :
```bash
cd /root/complexe-scolaire-afrika
docker compose up -d --force-recreate api
```

## Fichiers ajoutés au repo

Le repo est **https://github.com/BertonLutina/complexe-scolaire-afrika** (public).

```
Dockerfile          # multi-stage : build Vite (node:20-bookworm-slim) puis nginx:alpine pour servir dist/
nginx.conf           # config nginx, fallback SPA (try_files $uri /index.html)
server/              # mini API contact (Express + Nodemailer)
  Dockerfile
  server.js
  package.json / package-lock.json
docker-compose.yml    # 2 services : web + api
.env.example          # template safe (à copier en .env sur le VPS avec les vraies valeurs)
.gitignore            # exclut node_modules, dist, .netlify, .env
.dockerignore
src/vite-env.d.ts     # nécessaire pour que `import.meta.env.VITE_API_URL` compile avec TypeScript
```

### Piège rencontré : `.dockerignore` cassait le build de l'API

Le premier `.dockerignore` excluait le dossier `server/` en pensant limiter le contexte du build web — mais Docker n'a qu'un seul `.dockerignore` pour tout le contexte, donc ça empêchait aussi `COPY server/server.js ./` dans le Dockerfile de l'API. Corrigé en retirant `server` du `.dockerignore`.

### Piège rencontré : erreur TypeScript `import.meta.env`

Le build (`tsc && vite build`) échouait avec `Property 'env' does not exist on type 'ImportMeta'` car le projet n'avait pas les types Vite. Corrigé en ajoutant `src/vite-env.d.ts` avec `/// <reference types="vite/client" />` (fichier standard généré par défaut par les templates Vite, absent ici).

## DNS (Gandi)

Zone `complexe-scolaire-afrika.com` modifiée via l'éditeur Gandi (vue simple, enregistrement par enregistrement) :
- `@ A 31.97.53.228` (remplace l'ancienne IP `217.70.184.38`)
- `www A 31.97.53.228` (nouveau — l'ancien `www CNAME webredir.vip.gandi.net` a été supprimé car il entrait en conflit)
- `api A 31.97.53.228` (nouveau)
- Tous les enregistrements mail existants (MX, SPF, DKIM `gm1/gm2/gm3._domainkey`, `webmail` CNAME) ont été laissés intacts.

## Workflow git

Comme pour evoyamwana, les commits/push doivent être faits **depuis le Mac de l'utilisateur**, pas depuis le sandbox Claude (même bug de permission `.git/index.lock` rencontré). Le repo est cloné sur le VPS dans `/root/complexe-scolaire-afrika`.

Pour livrer une nouvelle version :

```bash
# en local, sur le Mac
cd /Users/creaafde/CascadeProjects/complexe-scolaire-afrika
git add -A
git commit -m "..."
git push

# sur le VPS
cd /root/complexe-scolaire-afrika
git pull
docker compose build
docker compose up -d
```

## Commandes utiles

```bash
cd /root/complexe-scolaire-afrika

docker compose ps
docker compose logs -f web
docker compose logs -f api

# tester l'API de contact directement
curl -X POST https://api.complexe-scolaire-afrika.com/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+243000000000","message":"Test"}'
```

## Vérification finale (2026-07-01)

- `https://complexe-scolaire-afrika.com` → HTTP/2 200, certificat Let's Encrypt valide (expire 29 sept. 2026).
- `https://www.complexe-scolaire-afrika.com` → HTTP/2 200.
- `https://api.complexe-scolaire-afrika.com/health` → `{"status":"ok"}`.
- Test réel du formulaire de contact via `curl` → `{"ok":true}`, email bien reçu dans la boîte Gmail.

## Netlify

L'ancienne config Netlify (`netlify.toml`) existe toujours dans le repo mais n'est plus utilisée en production — le VPS Hostinger est la source de vérité pour `complexe-scolaire-afrika.com`.
