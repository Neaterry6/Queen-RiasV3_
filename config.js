const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "ɓrõƙêñ titan",
    ownerNumber: process.env.OWNER_NUMBER || "2348039896597",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtwN1ZtSjdINGxaY1NRdHZJRnlWbEl1RldRNFFyQ0U2SWRyeGh0SGNYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnhTUEFlMU5vMlNiUzZqK0ZlTXVET0V1S0c0a2NPVFpNcklJQTM3R3JHTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSWpka0hibG9SZU5EaWJmdDduekk2WUs0ZzRrZWdxbDVhU0J3VmZabEZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzVFluTFFVNEkyUmplZDVTbjZEWnpZN2xzOHFhaVNiT0MxVkxpOWFENUNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlCYW9idEJaTEJ0TWs2Ynd6Zzh4VTl4a2loRjdLTmg2TFRucWtiTEI5bVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZQanFMVGVjZzFJVnBwQkdyRE9ZU3JUT1laQnErT05tOUdBV1dsOElkQmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUp1dndWT2hRbGRJLysvWlZ1NGFuM0MwKzIzcFhGNDlsT2s2RGM4dWpVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicktHcGgrRDNZSnN6OTY4V0lzQ0cvYWhkRzhYKzlMa1N4UFg4Smd6TXdDZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVuQ2JLZnFDQ1d3ZE92UE5XVFNrdkVGeGU0SDMzWG1YQW42OEpHcVBpT2dhVUR6Sy8vcStQUlpUWjNHWEtjSXYzUnU3aEVPanJEMVFvd0lReHJQUEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUyLCJhZHZTZWNyZXRLZXkiOiJTdk5zNFVnWXVzcXVEcVFIdmxXK1RacUlQUUpDTnZXTFhVRkwxdHluY1NFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBQUhGNzkxTCIsIm1lIjp7ImlkIjoiMjM0ODAzOTg5NjU5Nzo3NUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIxMjg5Nzc1Mzk5NzUwNDo3NUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXdTNOd0RFTy9McXNBR0dCY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhGSVNHZnVvVno0TEZrR21hQWladjcvaTVBUUxCZFUyTDFydDJPaXdrWDA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJlSVpqYUdEaCtRWStqcjVWRHJ1REttNnorc0JocVd2WFBZYnIwUlNhTkZmSmoxL1EyMGdKQmhzdjAvNFI1K0kwb2pNQTI5OU5ZZFZZZlVtVkpZTERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2U1FMYXNld09iQXVYM1VMUVpkeEUrS0pwZnArdURFaTZ5L3JhNW8xK0dBYkJMaG5NNVpmYm1sL0NuanNtblhYRnlTNFAra29ISjNkRjRRckoycytEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMzk4OTY1OTc6NzVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkJTRWhuN3FGYytDeFpCcG1nSW1iKy80dVFFQ3dYVk5pOWE3ZGpvc0pGOSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NTI4MzE3LCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
