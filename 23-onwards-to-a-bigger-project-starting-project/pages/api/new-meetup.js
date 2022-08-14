// /api/new-meetup
const url = "https://react-http-f0957-default-rtdb.firebaseio.com/meetups.json";
async function handler(req, response) {
  if (req.method === "POST") {
    const data = req.body;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const receivedRes = await res.json();
    console.log(receivedRes);
    response.status(200).json({ message: "added", data: receivedRes });
  }
}

export default handler;
