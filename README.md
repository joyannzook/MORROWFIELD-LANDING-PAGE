---

# Morrowfield Community Finance — Landing Website

A premium, single-page static marketing website for **Morrowfield Community Finance**.

This project is **completely independent** of the full lending application
(`joyannzook/MORROWFIELD`). It contains no backend, no database, no authentication
and no loan-processing logic, and it must never be used to modify the lending
application.

> **The website is the front door. Google Forms receives the enquiry.
> Activepieces processes it. Resend/Gmail and the connected WhatsApp service
> handle the follow-up.** That separation is mandatory.

---

## Status

| Item | State |
|---|---|
| Static website implemented | ✅ |
| Responsive layout implementation | ✅ Implemented; visual verification pending |
| Accessibility features (semantic HTML, keyboard, focus, contrast) | ⚠️ Implemented in source; manual verification pending |
| Netlify configuration supplied | ✅ |
| Render configuration supplied | ✅ |
| Embedded Google Forms enquiry form | ✅ Implemented in source; live submission verification pending |
| Activepieces response retrieval | ⚠️ Connection and existing test response confirmed; new website submission verification pending |
| Email / WhatsApp follow-up verified | ❌ **Blocker** — external, not part of this repo |
| Privacy / Terms / Disclosures pages | ❌ **Awaiting approved content** |
| Live deployment verified | ❌ Pending hosting account connection |

Responsive behavior and accessibility support are implemented in the source, but they have **not yet been independently verified** across desktop, tablet, and mobile or through a complete keyboard/contrast audit.

A successful local preview is **not** a successful deployment.
A successful deployment is **not** a verified automation.

---

## Project structure

```
.
├── index.html              # The entire one-page website
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling (design tokens at the top)
│   ├── js/
│   │   └── main.js         # Config + mobile nav + year. Nothing else.
│   └── images/             # Reserved; no raster imagery currently used
├── netlify.toml            # Netlify static deployment config
├── render.yaml             # Render Blueprint (static site)
├── README.md
└── .gitignore
```

---

## Local preview

No build step, no dependencies, no package manager.

```bash
# From the repository root
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static file server works (`npx serve`, VS Code Live Server, etc.).

---

## Configuration — embedded Google Forms enquiry

The six-field form is embedded in `index.html` and submits directly to the approved Google Forms `formResponse` endpoint. The six HTML entry identifiers are mapped to the live form questions in the markup. No replacement form, backend, or database is introduced.

When WhatsApp is selected as the preferred contact method, the website makes the WhatsApp number field required, displays an instruction, and blocks submission until a number is entered. When Email is selected, the WhatsApp field remains optional. This is website-side validation only; the Google Form itself is unchanged.

Loan-card Express Interest links preselect their corresponding category. Other Express Interest links scroll to the form without preselecting a category.

Google Forms is cross-origin: the browser cannot inspect the iframe response to prove that Google stored the submission. The on-page status indicates that the browser submission completed; verify actual storage by retrieving the response through Activepieces.
---

## Deployment

### Netlify

1. Connect the repository in Netlify.
2. Build command: **leave empty**.
3. Publish directory: **`.`** (already declared in `netlify.toml`).
4. Deploy.

Netlify will serve `index.html` from the repository root.

### Render

1. Create a **Blueprint** from the repository (`render.yaml` is detected), **or**
   create a **Static Site** manually.
2. Build command: **leave empty**.
3. Publish directory: **`.`**
4. Deploy.

Do not create a Web Service, a database, or a background worker for this site.

### Deployment reporting

Report each of these separately and only with evidence:

- Local preview status
- Netlify deployment status
- Render deployment status
- Google Form integration status
- Activepieces workflow verification status

---

## Quality assurance checklist

### Functional
- [ ] Page loads with no console errors
- [ ] Header and footer navigation reach the correct sections
- [ ] Mobile menu opens, closes, and closes on link selection
- [ ] Mobile menu closes on `Escape` and returns focus to the toggle
- [ ] Every Express Interest link scrolls to the embedded form\n- [ ] Selecting WhatsApp makes the WhatsApp number mandatory and blocks submission when blank\n- [ ] Selecting Email leaves WhatsApp optional\n- [ ] Loan-card links preselect the matching loan category\n- [ ] A test website submission is confirmed in Google Forms through Activepieces
- [ ] Every loan amount is exactly correct
- [ ] FAQ items open and close
- [ ] No `mailto:` or `wa.me` link exists anywhere in the source

### Content
- [ ] Small: `$1,000–$5,000`
- [ ] Medium: `$10,000–$20,000`
- [ ] Large: `$25,000–$100,000`
- [ ] No interest rate, APR, fee, repayment period or eligibility claim is present
- [ ] No approval, funding or eligibility guarantee is present
- [ ] No invented registration number, licence, address, testimonial or statistic

### Responsive (test at 360px, 390px, 768px, 1024px, 1440px)
- [ ] No horizontal overflow
- [ ] No overlapping or clipped content
- [ ] Buttons remain comfortably tappable
- [ ] Cards stack cleanly
- [ ] Navigation remains usable

### Accessibility
- [ ] Keyboard-only traversal reaches every control
- [ ] Focus is always visible
- [ ] Heading order is `h1 → h2 → h3` with no skips
- [ ] Skip link works
- [ ] Decorative SVGs are `aria-hidden`
- [ ] Contrast meets WCAG AA
- [ ] Reduced-motion preference respected

### Technical
- [ ] No third-party scripts or fonts requested
- [ ] No broken asset paths
- [ ] Site works with JavaScript disabled (navigation falls back to a static list)
- [ ] Deployment configuration files are valid

---

## Integration verification (requires operator input)

1. Submit a synthetic test enquiry through the deployed embedded form (requires operator authorization because it writes a real response).
2. Retrieve the latest Google Forms response through Activepieces and compare all six fields.
3. Verify the existing Activepieces processing and any downstream email/WhatsApp outcomes separately.
4. Record each result.

The website-side WhatsApp requirement is conditional: WhatsApp selection requires a non-empty WhatsApp number; Email selection leaves that field optional. The Google Form configuration is not modified by this website validation.

Do **not** modify the existing Activepieces flow under this ticket.

---

## Outstanding blockers and approvals

| Blocker | Owner | Notes |
|---|---|---|
| Live form submission verification | Operator | Submit a test through the deployed page and confirm the stored response through Activepieces |
| Activepieces trigger confirmation | Operator | External system; verify separately |
| Email / WhatsApp delivery verification | Operator | External systems |
| Privacy Policy content | Operator / legal | Add to footer only when approved |
| Terms content | Operator / legal | Add to footer only when approved |
| Lending disclosures | Operator / legal | Interest rates, APR, fees, repayment, eligibility |
| Company registration / licensing statements | Operator / legal | Must not be invented |
| Production domain | Operator | Needed for `og:url` and canonical metadata |
| Canonical repository | Resolved | `joyannzook/MORROWFIELD-LANDING-PAGE` is the canonical landing-site repository. Keep it separate from `joyannzook/MORROWFIELD`. |

---

## Explicitly out of scope

Loan application processing, loan approvals, borrower dashboards, registration,
login, Google or WhatsApp authentication, staff or loan-officer dashboards,
databases, payments, disbursement, repayment management, credit scoring, identity
verification, document uploads, account management, new Activepieces workflows,
new Resend/Gmail automation, new WhatsApp automation, and any replacement Google
Form.

The full lending application at `joyannzook/MORROWFIELD` must remain untouched.
```

---

### Build notes for whoever commits this

- **One enquiry route only.** Every CTA scrolls to the embedded six-field Google Form. No `mailto:`, no `wa.me`, no backend, no replacement form.\n- **Conditional WhatsApp validation.** Choosing WhatsApp makes the WhatsApp number mandatory on the website; choosing Email leaves it optional. The live Google Form is unchanged.
- **No-JS resilience.** Navigation has a `<noscript>` fallback; FAQ uses native `<details>`; the site is fully readable and navigable without JavaScript.
- **No external requests.** System font stacks only — no Google Fonts, no third-party scripts, no analytics.
- **Design tokens** live at the top of `styles.css`; the gold is used strictly as a decorative hairline/accent, never as text.
- **Amount strings** are exact and use en dashes: `$1,000–$5,000`, `$10,000–$20,000`, `$25,000–$100,000`.
- **Verification remains pending:** confirm a live website submission is stored by Google Forms and retrievable through Activepieces.

---
