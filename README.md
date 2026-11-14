# Prima Machinery Co. | Website

Static website for **www.primamachinery.com**. It is plain HTML/CSS/JavaScript, so there is no build step, no server code and no database. It can be hosted free on most static hosts.

## Folder structure

```
index.html          Home
about.html          About Us
products.html       Product catalogue (search + category filters)
product.html        Product detail page (product.html?id=<machine-id>)
gallery.html        Photo gallery with lightbox
catalogue.html      E-Catalogue (Download PDF via the browser's print/save-as-PDF)
contact.html        Contact details, enquiry form, map
404.html            Not-found page
robots.txt, sitemap.xml
assets/
  css/style.css     All styling
  js/config.js      ← Company details (phone, e-mail, WhatsApp, address, form endpoint)
  js/products.js    ← Machine catalogue (names, models, descriptions, specs, photos)
  js/site.js        Header, footer, WhatsApp button, shared helpers
  js/pages.js       Page logic (search, filters, product pages, form)
  img/logo.svg, logo-white.svg, favicon.svg
  img/products/     ← Put machine photos here
  img/gallery/      ← Optional extra photos (workshop, dispatch, exhibitions)
```

## 1. Add your machine photos

Copy photos into `assets/img/products/` using these exact file names (JPG). Until a photo is added, the site shows a neutral "Machine photo coming soon" image.

| Machine | File names |
|---|---|
| Paper Cutting Machine (blue) | `paper-cutting-machine-1.jpg`, `-2.jpg`, `-3.jpg` |
| Paper Corrugation Machine (black) | `paper-corrugation-machine-1.jpg`, `-2.jpg`, `-3.jpg` |
| PRIMA-35 Die Punching Machine | `prima-35-die-punching-machine-1.jpg`, `-2.jpg`, `-3.jpg` |
| Other machines | `<machine-id>-1.jpg` (see the `images` field in `products.js`) |

Tips for good photos:
- Use a landscape photo about 1600 px wide and under about 300 KB. You can compress it free at squoosh.app (choose WebP or MozJPEG, quality 75).
- A white or light-grey background looks best. Remove distracting backgrounds with a tool such as remove.bg or Photoshop and export on white.
- If you use `.webp`, change the extension in `products.js` to match.

## 2. Manage products (`assets/js/products.js`)

- **Add a machine:** copy an existing `{ ... }` block, give it a unique `id` (lowercase-with-dashes), then fill in `name`, `model`, `category`, `short`, `description`, `features`, `applications` and `images`.
- **Remove a machine:** delete its block. The machines marked `confirm: true` come from the reference range and still need confirmation. **Delete any that Prima does not offer before launch.**
- **Specifications:** add only verified figures, for example:
  `specs: [["Cutting width", "xx inch"], ["Motor", "x HP"]]`
  If `specs` is empty, the site shows "Specifications available on request".
- **Homepage:** `featured: true` puts a machine on the homepage.
- After adding or removing machines, update `sitemap.xml` to match.

## 3. Company details (`assets/js/config.js`)

Phone, WhatsApp, e-mail, address, business hours, map location and IndiaMART link are all set here. Empty fields are hidden on the site.

## 4. Enquiry form

- **Default (no setup):** submitting the form opens WhatsApp to +91 98157 47736 with the enquiry already filled in: name, phone, machine name + model, and message. The customer only has to press Send. A "Send by E-mail" button is also available.
- **Optional, to receive enquiries by e-mail automatically:** create a free form at formspree.io (or web3forms.com) using primamachinerycom@yahoo.co.in. Then paste the form URL into `formEndpoint` in `config.js`, e.g. `formEndpoint: "https://formspree.io/f/abcdwxyz"`.

The form includes validation and a hidden anti-spam field.

## 5. Preview locally

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
npx http-server -p 8080
```

## 6. Hosting

**Live address: https://adi26nova12.github.io/prima-machines/** (GitHub Pages, repository `adi26nova12/prima-machines`).

The repo includes:
- `.nojekyll`, which serves files as they are, with no Jekyll processing
- `404.html`, which GitHub Pages uses automatically for missing pages

**Turn on GitHub Pages (one time)**
1. On GitHub, open the repository and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Source: Deploy from a branch**, then **Branch: `main`** and folder **`/ (root)`**, and click **Save**.
3. Within a minute or two the site is live at the address above.

### Later: connecting www.primamachinery.com (once the domain is bought)
1. Replace `https://adi26nova12.github.io/prima-machines` with `https://www.primamachinery.com` in every file (`config.js`, the HTML files, `sitemap.xml`, `robots.txt`).
2. Add a file named `CNAME` containing `www.primamachinery.com`.
3. At the domain registrar, add these DNS records:
   - `CNAME`: `www` → `adi26nova12.github.io`
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Push, then in **Settings → Pages** wait for the DNS check to pass and tick **Enforce HTTPS**.

**Updating the site later**
```bash
git add .
git commit -m "Update site"
git push
```
GitHub Pages redeploys automatically after every push to `main`.

### Other hosting options

**Recommended: Netlify or Cloudflare Pages.** Both are free, include HTTPS, and are fast in India.

**Netlify (simplest)**
1. Create a free account at netlify.com.
2. Go to **Add new site → Deploy manually** and drag this whole folder onto the page. The site goes live on a `*.netlify.app` address.
3. Go to **Domain management → Add a domain** and enter `www.primamachinery.com`.
4. At your domain registrar (GoDaddy, BigRock, Hostinger, etc.), open the DNS settings for primamachinery.com and add:
   - `CNAME` record: `www` → `<your-site>.netlify.app`
   - `A` record: `@` → `75.2.60.5` (Netlify load balancer; use the value Netlify shows you)
5. Netlify issues a free SSL certificate automatically, usually within an hour. Set `www.primamachinery.com` as the primary domain so `primamachinery.com` redirects to it.
6. To update the site later, drag the folder again under **Deploys**, or connect a GitHub repository for automatic deploys.

**Cloudflare Pages:** create a project, upload the folder, then add the custom domain. If the domain's DNS is on Cloudflare, the records are created automatically.

**Existing cPanel / shared hosting:** upload all files to `public_html/` with File Manager or FTP, then enable SSL (AutoSSL / Let's Encrypt) in cPanel. To show the custom 404 page, add a `.htaccess` file containing `ErrorDocument 404 /404.html`.

## 7. After launch

1. Add the site to **Google Search Console**, verify the domain, and submit `https://www.primamachinery.com/sitemap.xml`.
2. Create or update your **Google Business Profile** for Amritsar with the website link.
3. Add the website link to your IndiaMART profile and WhatsApp Business profile.

## Before going live — checklist

- [ ] Machine photos added to `assets/img/products/`
- [ ] Model numbers for the paper cutting and corrugation machines (`model` in `products.js`)
- [ ] Verified technical specifications (optional; shown only when added)
- [ ] Unconfirmed machines removed from `products.js` (and `sitemap.xml`)
- [ ] Company history / year established added in `about.html`, and the yellow reminder note removed
- [ ] Exact address and business hours added in `config.js` (optional)
- [ ] `formEndpoint` set if you want enquiries by e-mail (optional)
