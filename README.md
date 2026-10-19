# shusteradvisory.com

Public website for Shuster Advisory, served by GitHub Pages at
https://shusteradvisory.com (custom domain set by `CNAME`).

Public site only. Nothing from the venture wiki, the CRM, or any client or
patient information goes in this repo.

- `index.html`: the home page. No build step.
- `second-brain/index.html`: "Matt's Owner-Operator Second Brain Guide". This
  is the master source of that guide; there is no other copy. Its setup
  prompt sits in the page as a template and is shown after the form.
- `second-brain/intake.gs`: master copy of the Google Apps Script web app
  (in the matt@shusteradvisory.com Google account, project "Second brain
  intake") that emails each form submission to matt@shusteradvisory.com with
  the subject "[Second brain setup] <business>". To change it: edit here,
  paste into Apps Script, then Deploy > Manage deployments > edit > Version:
  New version. A new deployment changes the URL, which is set as `ENDPOINT`
  in the page's script, and breaks the form until updated.
- Form answers are emailed only. They are never stored in this repo.
- `assets/`: logo and icon files are copies of `brand/` in the private
  consultant-workspace repo, which is the master. Don't edit them here;
  re-copy when the master changes.
- `assets/matt-shuster.jpg`: the headshot, resized from
  `brand/matt-shuster-headshot.jpg` (master).
- `assets/shuster-logo.png`, `assets/shuster-logo-email.png` and
  `assets/shuster-icon-email.png` are not used by
  the page; they are hosted so tools
  that take an image URL (Gmail signature) can link to it.
