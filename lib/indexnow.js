/* IndexNow ownership key. This is NOT a secret: it is published at
   INDEXNOW_KEY_PATH on the live domain, which is exactly how IndexNow verifies
   that whoever submits URLs controls the site. Committing it is fine.

   To rotate it: change the value here, redeploy (so the key file updates), and
   the next submission uses the new key. */

export const INDEXNOW_KEY = "7f3a9b2c8e1d4f6a5b0c9d8e2f1a3b4c";

/* Where the key file is served (see app/indexnow.txt/route.js). IndexNow lets
   the key file live anywhere on the host as long as we pass keyLocation. */
export const INDEXNOW_KEY_PATH = "/indexnow.txt";
