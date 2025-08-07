
  async function askPassword() {
    const inputPassword = prompt("Enter security Password :");
    const inputPassword2 = prompt("Enter protection password :");
    if (!inputPassword) return;
    if (!inputPassword2) return;
    try {
      const response = await fetch('./data/1stlayer.json');
      const data = await response.json();
      const response2 = await fetch('./data/2ndlayer.json');
      const data2 = await response2.json();

      if (inputPassword === data.password1236 || inputPassword === data.password2036) {
        if (inputPassword2 === data2.password120 || inputPassword2 === data2.password231) {
          window.location.href = 'adminPanal.html';
          alert("Access granted! Redirecting to admin panel...");
        } else {
          alert("Incorrect 2nd layer password! Access denied.");
        }
      } else {
        alert("Incorrect 1st layer password! Access denied.");
      }
    } catch (err) {
      alert("Failed to load password file.");
      console.error(err);
    }
  }
