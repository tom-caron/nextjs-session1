# `README.md`

````md
# LinkUp — Application sociale avec Next.js

LinkUp est une application sociale développée avec **Next.js** dans le cadre du projet d’évaluation M2 DEVFLSTK.

L’application permet aux utilisateurs de se connecter avec GitHub, publier des posts, liker des contenus, consulter des profils et commenter les publications.

## Fonctionnalité choisie

### A — Système de commentaires

J’ai choisi d’implémenter la fonctionnalité **A : Système de commentaires**.

Les utilisateurs connectés peuvent commenter un post.  
Les commentaires sont enregistrés en base de données avec Prisma et apparaissent directement sur la page détaillée du post.

Fonctionnalités ajoutées :

- Modèle Prisma `Comment`
- Relation entre `User`, `Post` et `Comment`
- Migration Prisma dédiée
- Endpoint `GET /api/posts/[id]/comments`
- Server Action `createComment`
- Validation serveur avec Zod
- Formulaire de commentaire accessible uniquement aux utilisateurs connectés
- Affichage des commentaires sur `/posts/[id]`
- Loading UI et Error UI sur la page de détail d’un post

## Stack technique

- Next.js
- TypeScript
- Prisma
- SQLite en développement
- NextAuth / Auth.js v5
- GitHub OAuth
- Zod
- Server Actions
- CSS classique

## Installation du projet

Cloner le projet :

```bash
git clone LIEN_DU_REPO_GITHUB
cd nextjs-session1
````

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="file:./dev.db"

AUTH_SECRET="votre_secret_nextauth"
AUTH_GITHUB_ID="votre_client_id_github"
AUTH_GITHUB_SECRET="votre_client_secret_github"
NEXTAUTH_URL="http://localhost:3000"
```

Générer le client Prisma :

```bash
npx prisma generate
```

Appliquer les migrations :

```bash
npx prisma migrate dev
```

Lancer le seed :

```bash
npx prisma db seed
```

Lancer le serveur de développement :

```bash
npm run dev
```

L’application est disponible sur :

```txt
http://localhost:3000
```

## Variables d’environnement

| Variable             | Description                                 |
| -------------------- | ------------------------------------------- |
| `DATABASE_URL`       | URL de connexion à la base de données       |
| `AUTH_SECRET`        | Secret utilisé par NextAuth                 |
| `AUTH_GITHUB_ID`     | Client ID de l’application OAuth GitHub     |
| `AUTH_GITHUB_SECRET` | Client Secret de l’application OAuth GitHub |
| `NEXTAUTH_URL`       | URL de l’application                        |

## Fonctionnement de l’authentification

L’authentification est gérée avec **NextAuth / Auth.js v5**.

L’utilisateur peut se connecter avec GitHub.
Une fois connecté, sa session est disponible dans l’application grâce à `SessionProvider`, `useSession()` côté client et `auth()` côté serveur.

Les posts et commentaires sont associés à l’utilisateur connecté via son `user.id`.

## Fonctionnement des commentaires

Sur une page de post détaillée `/posts/[id]`, l’utilisateur peut consulter :

* le contenu du post
* l’auteur du post
* le nombre de likes
* la liste des commentaires
* un formulaire pour ajouter un commentaire s’il est connecté

Lorsqu’un commentaire est envoyé :

1. La Server Action `createComment` vérifie la session utilisateur.
2. Le contenu est validé avec Zod.
3. Le commentaire est créé en base avec Prisma.
4. La page du post est revalidée avec `revalidatePath`.
5. Le commentaire apparaît dans la liste.

## Routes principales

| Route                      | Description                                |
| -------------------------- | ------------------------------------------ |
| `/`                        | Fil d’actualité                            |
| `/explore`                 | Liste des utilisateurs                     |
| `/profile`                 | Profil de l’utilisateur connecté           |
| `/profile/[id]`            | Profil public d’un utilisateur             |
| `/posts/[id]`              | Page détaillée d’un post avec commentaires |
| `/api/posts`               | API des posts                              |
| `/api/posts/[id]`          | API d’un post précis                       |
| `/api/posts/[id]/comments` | API des commentaires d’un post             |
| `/api/auth/[...nextauth]`  | Routes NextAuth                            |

## Commandes utiles

```bash
npm run dev
```

Lance le serveur de développement.

```bash
npm run build
```

Lance le build de production.

```bash
npx prisma studio
```

Ouvre Prisma Studio pour visualiser la base de données.

```bash
npx prisma migrate dev --name nom_de_migration
```

Crée une nouvelle migration Prisma.

```bash
npx prisma generate
```

Génère le client Prisma.

```bash
npx prisma db seed
```

Relance le seed de la base de données.

## Déploiement

Lien Vercel :

```txt
COLLER_ICI_LE_LIEN_VERCEL
```

Lien GitHub :

```txt
https://github.com/tom-caron/nextjs-session1
```

## Notes techniques

Les mutations importantes utilisent des **Server Actions** avec validation Zod, notamment :

* création de post
* création de commentaire

Les données sont persistées avec Prisma et ne sont pas stockées en mémoire.

## Auteur

Projet réalisé dans le cadre du cours Next.js M2 DEVFLSTK.

````

Pense juste à remplacer :

```txt
LIEN_DU_REPO_GITHUB
COLLER_ICI_LE_LIEN_VERCEL
COLLER_ICI_LE_LIEN_DU_REPO_GITHUB
````

par tes vrais liens quand tu les auras.
