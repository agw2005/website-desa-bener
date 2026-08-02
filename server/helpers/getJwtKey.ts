import { decodeBase64 } from "@std/encoding/base64";

let cachedJwtKey: CryptoKey | null = null;

export const getJwtKey = async (): Promise<CryptoKey> => {
  if (cachedJwtKey) return cachedJwtKey;

  const jwtKeyString = Deno.env.get("JWT_KEY");
  if (!jwtKeyString) throw new Error("JWT_KEY environment variable is missing");

  const jwtKeyBytes = decodeBase64(jwtKeyString);
  cachedJwtKey = await crypto.subtle.importKey(
    "raw",
    jwtKeyBytes,
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
  return cachedJwtKey;
};
