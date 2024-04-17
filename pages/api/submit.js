export default async function handler(req, res) {
  const { name, email, message } = JSON.parse(req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email, or message" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const request = await fetch(
    "https://api.airtable.com/v0/app7EnI3b3BrVRDBI/tblcC0OxDa0YRpjKM/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${(process.env.AIRTABLE_API_KEY =
          "patSzBF69jYCVh1jz.826b183ebefc2f41dc1850c4ea66460fee0083c10c8a72dbeb0522c8cc6ca6eb")}`,
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          Message: message,
        },
      }),
    }
  );

  if (request.ok) {
    return res.status(200).json({ message: "Success" });
  }
}
