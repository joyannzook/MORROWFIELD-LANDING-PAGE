# Morrowfield Community Finance — Landing Website

A premium, single-page static marketing website for **Morrowfield Community Finance**.

This project is independent of the full lending application ([`joyannzook/MORROWFIELD`](https://github.com/joyannzook/MORROWFIELD)). Do not modify that repository as part of this project.

> **The website is the front door. Google Forms receives the enquiry. Activepieces processes it. Resend/Gmail and the connected WhatsApp service handle follow-up.** That separation is mandatory.

## Architecture

- Plain HTML, CSS and lightweight vanilla JavaScript.
- No build step, package manager, framework, backend, database or authentication.
- Static hosting from the repository root on Netlify or Render.
- One enquiry destination, configured in `assets/js/main.js`.
- No third-party scripts, external fonts, analytics, or duplicated automation.

## Project structure

```text
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/.gitkeep
├── netlify.toml
├── render.yaml
├── README.md
└── .gitignore
```

## Local preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Enquiry configuration

Set the approved Google Form URL in the single `GOOGLE_FORM_URL` constant in `assets/js/main.js`. Until the operator supplies and verifies that URL, the placeholder must remain and the site is not integration-complete.

Do not add `mailto:`, `wa.me`, standalone email/WhatsApp triggers, a replacement form, a website backend, a submission database, or duplicated Activepieces logic.

## Approved indicative loan categories

| Category | Indicative amount |
|---|---:|
| Small | $1,000–$5,000 |
| Medium | $10,000–$20,000 |
| Large | $25,000–$100,000 |

These ranges are not offers, approvals, commitments to lend, or guarantees of eligibility, availability or funding. Do not invent rates, APR, fees, repayment terms, eligibility criteria, company registration, licensing, contact details, addresses, testimonials or legal claims.

## Status and outstanding approvals

- [x] Static HTML, CSS and JavaScript source populated.
- [x] Netlify and Render static hosting configuration supplied.
- [ ] Google Form URL supplied and configured.
- [ ] Existing Activepieces trigger verified with the operator.
- [ ] Email and WhatsApp follow-up verified.
- [ ] Privacy Policy, Terms and lending disclosures approved.
- [ ] Production domain and live deployment verified.
- [ ] Functional, responsive, accessibility and deployment QA completed.

A successful local preview is not a successful deployment. A successful deployment is not a verified automation.

## Deployment

### Netlify
- Connect this repository.
- Leave the build command empty.
- Publish directory: `.`.

### Render
- Create a Blueprint from `render.yaml`, or create a Static Site manually.
- Leave the build command empty.
- Publish directory: `.`.
- Do not create a Web Service, database or background worker for this site.

## Quality assurance

Test navigation, mobile menu behaviour, FAQ details, all enquiry links, exact loan amounts, no-JavaScript usability, keyboard navigation, visible focus, reduced-motion behaviour, asset paths and responsive layouts at 360px, 390px, 768px, 1024px and 1440px. Confirm there are no `mailto:` or `wa.me` links and no invented legal or lending claims.

## Project isolation

This repository is `joyannzook/MORROWFIELD-LANDING-PAGE`. The full lending application repository `joyannzook/MORROWFIELD` must remain untouched.
