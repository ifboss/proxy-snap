export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ status: "error", message: "URL não informada" });
  }

  try {
    const response = await fetch(`https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ status: "error", message: "Erro ao acessar API do Cobalt" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro interno", details: error.message });
  }
}
