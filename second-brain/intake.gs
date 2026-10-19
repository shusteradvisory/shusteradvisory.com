// Intake for shusteradvisory.com/second-brain/: emails each submission to Matt.
// Master copy: second-brain/intake.gs in the shusteradvisory.com repo.
// Deploy once: Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
// After an edit: Deploy > Manage deployments > edit > Version: New version.
// A brand-new deployment changes the URL and breaks the form.

const TO = 'matt@shusteradvisory.com';
const SUBJECT = '[Second brain setup] ';
const DAILY_EMAIL_CAP = 50;
const MAX_LEN = 2000;
const FIELDS = ['name', 'email', 'business', 'role', 'team', 'ai', 'week', 'people', 'tools', 'briefing', 'timezone'];

function doPost(e) {
  try {
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (d.zq) return reply({ ok: true }); // hidden field only bots fill
    const v = {};
    FIELDS.forEach(k => { v[k] = String(d[k] || '').trim().slice(0, MAX_LEN); });
    if (!v.name || !v.email) return reply({ ok: false, error: 'missing name or email' });
    if (!underCap()) return reply({ ok: false, error: 'daily limit' });

    MailApp.sendEmail({
      to: TO,
      replyTo: v.email,
      subject: SUBJECT + (v.business || v.name),
      body: FIELDS.map(k => k + ': ' + v[k]).join('\n\n'),
    });
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function underCap() {
  const props = PropertiesService.getScriptProperties();
  const key = 'sent-' + Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd');
  const n = Number(props.getProperty(key) || 0);
  if (n >= DAILY_EMAIL_CAP) return false;
  props.setProperty(key, String(n + 1));
  return true;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
