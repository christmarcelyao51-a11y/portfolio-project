# Portfolio — Christ Marcel

Django (API + admin) + Next.js (frontend). Conçu pour un concours de portfolio :
design distinctif ancré dans ton vrai travail (automatisation, traçabilité
cashew, contenu vidéo, ebook), et un backend qui suit de vraies pratiques de
sécurité plutôt qu'un simple `DEBUG=True` de démo.

## Structure

```
portfolio-project/
  backend/     Django + DRF — API publique en lecture, écriture réservée à l'admin
  frontend/    Next.js 14 (App Router, TypeScript, Tailwind)
```

## Démarrage rapide — Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # puis remplis DJANGO_SECRET_KEY etc.
python manage.py migrate
python manage.py createsuperuser
```

Admin disponible sur `http://localhost:8000/admin/` — c'est là que tu ajoutes
projets, photos, vidéos, compétences, expériences. Aucun autre panneau
d'admin n'est nécessaire : Django admin est déjà l'outil de gestion de
contenu, avec aperçu image/vidéo intégré dans chaque fiche projet.

Génère une vraie clé secrète :
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

## Démarrage rapide — Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Le site tourne sur `http://localhost:3000`.

## Ce qui est sécurisé, et pourquoi

**Backend (Django)**
- Aucun secret en dur : tout passe par `.env` (django-environ). `DEBUG=False`
  imposé en dehors du dev, `ALLOWED_HOSTS` obligatoire en prod.
- Mots de passe hashés en **Argon2** (le hasher recommandé actuellement),
  avec des règles de complexité minimales (12 caractères, pas de mot de
  passe commun/numérique).
- **django-axes** : verrouillage après 5 échecs de connexion (admin ou API),
  30 min de blocage — protège contre le brute-force sur `/admin/`.
- **JWT (SimpleJWT)** pour l'API : access token 15 min, refresh token 7 jours
  avec rotation + blacklist après rotation (un refresh volé devient inutile
  après un seul usage).
- **CORS verrouillé** : seule l'origine du frontend déclarée dans
  `CORS_ALLOWED_ORIGINS` peut appeler l'API — pas de `*`.
- **CSP** (django-csp) : empêche l'exécution de scripts injectés même en cas
  de faille XSS ailleurs.
- **En-têtes de sécurité** : HSTS, `X-Frame-Options: DENY` (anti-clickjacking),
  `X-Content-Type-Options: nosniff`, cookies `Secure`/`HttpOnly`/`SameSite=Strict`.
- **Validation des uploads** (`portfolio_app/validators.py`) : extension et
  taille contrôlées avant écriture sur disque (images ≤ 8 Mo, vidéos ≤ 100 Mo,
  types autorisés seulement) — empêche l'upload de fichiers déguisés.
- **Throttling DRF** : limites par IP/utilisateur, et une limite dédiée très
  stricte sur le formulaire de contact (5/heure) contre le spam.
- Le endpoint de contact est **write-only** : personne ne peut lire les
  messages des autres via l'API, seul le staff via l'admin.

**Frontend (Next.js)**
- Les appels API se font **côté serveur** (Server Components, Server
  Actions) : aucune URL d'API ni logique sensible n'atterrit dans le
  JavaScript envoyé au navigateur pour les pages publiques.
- Le formulaire de contact passe par une **Server Action** avec validation,
  et un champ honeypot invisible en plus du throttling serveur.
- En-têtes de sécurité (CSP, `X-Frame-Options`, `Permissions-Policy`) définis
  dans `next.config.js`.
- Pas de token JWT stocké côté client pour l'instant : le site public est
  entièrement en lecture anonyme. Si tu veux un espace "brouillon" éditable
  depuis le frontend plus tard, on ajoutera un flux de login qui pose le
  refresh token en cookie `HttpOnly` — jamais dans `localStorage`.

## Pour aller plus loin (prochaines étapes possibles)

- 2FA sur le compte admin (`django-otp`) si tu veux un cran de sécurité en plus.
- Déploiement : Postgres géré + backend derrière HTTPS (Railway/Render/VPS +
  Caddy ou Nginx), frontend sur Vercel.
- Ajouter une page "Expériences" (timeline) — le modèle `Experience` existe
  déjà côté API, il ne manque qu'une page qui l'affiche.
- Optimisation des images (Next/Image avec un vrai CDN une fois en prod).

## Contenu à préparer de ton côté

Le design suppose du vrai contenu : remplis dans l'admin ton profil, 3–5
projets avec captures/vidéos (traçabilité cashew, pipeline FootViralX,
ebook, tracker AppSheet…), et tes compétences avec un niveau de maîtrise.
C'est ce contenu réel qui fait la différence dans un concours — pas juste
le style.
