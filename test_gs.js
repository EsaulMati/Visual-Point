const url = "https://script.google.com/macros/s/AKfycbwQj8IvUA9RHHC2JZeFT-m_WSj2MDVaOj0-1UDnIdzS3XiQCRntMTWN9tV-w9IAhL4j/exec";

const payload = {
  nombre: "Testing System",
  empresa: "Test",
  email: "test@test.com",
  telefono: "123456",
  asunto: "Test",
  mensaje: "Test"
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(res => res.text())
.then(data => console.log("Response:", data))
.catch(err => console.error("Error:", err));
