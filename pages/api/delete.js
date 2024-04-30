export default async function deleteHandler(req, res) {
  const { id } = JSON.parse(req.body);

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const request = await fetch(
    `https://api.airtable.com/v0/app7EnI3b3BrVRDBI/tblcC0OxDa0YRpjKM/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${(process.env.AIRTABLE_API_KEY =
          "patSzBF69jYCVh1jz.826b183ebefc2f41dc1850c4ea66460fee0083c10c8a72dbeb0522c8cc6ca6eb")}`,
      },
    }
  );

  if (request.ok) {
    return res.status(200).json({ message: "Success" });
  }
}
