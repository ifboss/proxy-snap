export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ status: "error", message: "URL não informada" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("url", url);

    const response = await fetch("https://snapsave.app/action.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0"
      },
      body: formData.toString()
    });

    if (!response.ok) {
      return res.status(500).json({ status: "error", message: "Erro ao acessar SnapSave" });
    }

    const html = await response.text();
    return res.status(200).send(html);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro interno", details: error.message });
  }
}
