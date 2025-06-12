async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const log = document.getElementById("chat-log");
  log.innerHTML += `<p><strong>Tú:</strong> ${message}</p>`;
  input.value = "";

fetch('http://localhost:3000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'hola' })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('ERROR EN FETCH:', err));
}

async function enviarMensaje() {
  const mensaje = document.getElementById('mensaje').value;

  try {
    const respuesta = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensaje })
    });

    const data = await respuesta.json();

    document.getElementById('respuesta').innerText = data.reply || 'Sin respuesta';
  } catch (err) {
    console.error('ERROR EN FETCH:', err);
    document.getElementById('respuesta').innerText = 'Error al conectar con el servidor';
  }
}
