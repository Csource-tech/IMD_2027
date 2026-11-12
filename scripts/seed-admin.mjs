import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";

const uri = process.env.MONGODB_URI;
const username = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
async function promptPassword() {
  if (process.env.ADMIN_INITIAL_PASSWORD) return process.env.ADMIN_INITIAL_PASSWORD;
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error("Run this script in an interactive terminal to enter the initial password securely.");
  }

  const readline = createInterface({ input: stdin, output: stdout, terminal: false });
  readline.close();
  stdout.write("Initial admin password (input hidden): ");
  stdin.setRawMode(true);
  stdin.resume();
  return new Promise((resolve, reject) => {
    let value = "";
    const finish = (error) => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stdout.write("\n");
      if (error) reject(error);
      else resolve(value);
    };
    const onData = (chunk) => {
      for (const char of chunk.toString("utf8")) {
        if (char === "\u0003") return finish(new Error("Cancelled."));
        if (char === "\r" || char === "\n") return finish();
        if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
        else value += char;
      }
    };
    stdin.on("data", onData);
  });
}

const password = await promptPassword();

if (!uri) throw new Error("MONGODB_URI is required.");
if (!password) throw new Error("The initial admin password cannot be empty.");
if (Buffer.byteLength(password, "utf8") > 72) throw new Error("bcrypt passwords must not exceed 72 UTF-8 bytes.");

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "imd2027");
  const passwordHash = await bcrypt.hash(password, 12);
  await db.collection("admins").updateOne(
    { username },
    { $set: { username, passwordHash, role: "admin", active: true, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
  console.log(`Admin account '${username}' stored with a bcrypt hash.`);
} finally {
  await client.close();
}
