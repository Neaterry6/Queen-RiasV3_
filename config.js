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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZnVnJ5eVp4Mm1ONFFidWszZGZuWEs0SE9kKzdEdUFCaE1MN0ljMEIwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVNWWnJVcTlwQ1hmdzhwSlYxeTd4M05pVjlTT1prWnZ3aXJjMzluWExWRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjT0szWXNSUnQvWVlqNWNaZGJrbUpOd0dqc1FVZEk4ZmJuNncwOXkvSlZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4NzV2Q081NVEyOHFjdG1sZXVoTVhXR2dmRHdySXgvdzZvK1dOOUU3VHpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNIekp3bldUaU1KTWxhVUhobnZySk9zM1k1em9OTGNMYmkxek9XYjJpbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVkdyt3MkVYeXdKSk1DcG5FeHhwVlNZcTRqVU9pTGxjTHBtMnpaZDU5WE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNhd25GbHd5ZjdoN2l4azlxdVZjZG5qMUMrd1o2U3IwRmlpM0k2S0pHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWxQa25vbW4vcG5sQUxiZnE1cFFSRzlZbFFsRUdVQXVMNXNyV2N2OEh5Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill0elJWa3J2Z0FycVozVlhhdVNQbUcwakdrSitiYzdvb0tEK055UjNOY0FPZ3htOGs1QWxsbXB1ZWJxNTlWMTZpc25wMnhqbXdUWlY5UmtkMlBXd2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJRK2lnV1F1bjlSZjZucUljYm9QVzJLc1VsbWJBOENZWkxjUmRkd1hjcUtBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJOQlZaMVdGQyIsIm1lIjp7ImlkIjoiMjM0ODAzOTg5NjU5Nzo3M0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIxMjg5Nzc1Mzk5NzUwNDo3M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXdTNOd0RFSkNocXNBR0dCVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhGSVNHZnVvVno0TEZrR21hQWladjcvaTVBUUxCZFUyTDFydDJPaXdrWDA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkhsOFE5UkRKdUlYVHRxVEtvemdBeHQ1TnhabHZ2eURhNU0xUUdBZUloMEZIVVhmZGRKSStnT3RqMnVHNTNTZFMvNVIzblRKVi9PN29GblJrQlU1c0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4RjdpSTNKaG5ETUw4c0VQNVh5cnZuL1BoR3FQc2FxVEVFNkZSaWg0dFlQTStSWWRueFovdDU4MFhZTWMyMDdERnFNWXp4aGNXMjVDTlpUYTdrajhqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMzk4OTY1OTc6NzNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkJTRWhuN3FGYytDeFpCcG1nSW1iKy80dVFFQ3dYVk5pOWE3ZGpvc0pGOSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NTIyODQ2LCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
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
