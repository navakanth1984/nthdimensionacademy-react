# Contributing to NTH Dimension Academy

## Branch Strategy (ADLC)

```
feature/your-change
        ↓  (merge via PR)
    develop  →  staging.nthdimensionacademy.com  (test + feedback)
        ↓  (merge via PR when approved)
      main   →  nthdimensionacademy.com  (production)
```

## Environments

| Branch | Environment | URL | Purpose |
|---|---|---|---|
| `main` | Production | https://nthdimensionacademy.com | Live users |
| `develop` | Staging | Vercel preview URL | Testing & feedback |
| `feature/*` | Preview | Vercel preview URL (per PR) | Dev work |

## Workflow

### 1. Start a new change
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Build and test locally
```bash
npm run dev       # http://localhost:5173
```

### 3. Push to staging for feedback
```bash
git add <files>
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a PR → develop on GitHub
# Vercel auto-builds a preview URL — share this for feedback
```

### 4. Merge to develop (staging)
- PR reviewed → merge into `develop`
- Vercel auto-deploys staging URL
- Share staging URL with testers for sign-off

### 5. Promote to production
- Open PR: `develop` → `main`
- Review the diff, confirm staging is good
- Merge → Vercel auto-deploys to https://nthdimensionacademy.com

## Commit Message Format

```
type(scope): short description

feat     → new feature
fix      → bug fix
style    → CSS / visual only
refactor → code restructure, no behaviour change
chore    → config, deps, tooling
```

Examples:
```
feat(mobile): add thumb-zone bottom nav
fix(atlas): remove overlay button blocking mobile nav
feat(training): add DP-750 and DP-800 course cards
```

## Rules

- **Never push directly to `main`** — always via PR from `develop`
- **Test on staging first** — get at least one round of feedback before promoting to prod
- **One feature per branch** — keeps PRs small and easy to review
- **Deploy to prod only when staging is stable** — if staging is broken, fix it before merging

## Atlas Sub-directories

Each exam has its own atlas page in `public/`:
```
public/
  dp600-atlas/   ← DP-600 Analytics Engineer
  dp700-atlas/   ← DP-700 Data Engineer
  dp750-atlas/   ← DP-750 Lakehouse
  dp800-atlas/   ← DP-800 Data Science
  ai103-atlas/   ← AI-103 AI Engineer
```

When adding a new atlas, also update:
- `src/App.jsx` → `handleNodeClick` and `handleBeginAscent`
- `src/components/Training.jsx` → course cards array
- `src/components/SyllabusModal.jsx` → `syllabusData` object
- `public/assets/mobile-atlas-nav.js` → injected into the atlas HTML
