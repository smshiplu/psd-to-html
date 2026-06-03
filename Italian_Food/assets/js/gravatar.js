async function sha256(message) {
  // 1. Encode the string message into a Uint8Array buffer
  const msgBuffer = new TextEncoder().encode(message);                    

  // 2. Hash the buffer using the native Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // 3. Convert the resulting ArrayBuffer to an array of bytes
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // 4. Convert bytes to a hexadecimal string representation
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function showGravatar(email) {
  const hash = await sha256(email);
  // console.log(hash); 

  
  // Avatar URL using the same email hash
  const avatarUrl = `https://0.gravatar.com/avatar/${hash}`;

  // console.log(avatarUrl); // https://0.gravatar.com/avatar/733fedf8e8f2b6990d7f2640364f80c0bb6113c132fd6d5413d7df626abf2228

  // Usage in HTML
  // <img src="https://0.gravatar.com/avatar/733fedf8e8f2b6990d7f2640364f80c0bb6113c132fd6d5413d7df626abf2228" alt="User avatar" />

}

// How to use it in your code:
const email = "nasiruddinshiplu@gmail.com";
showGravatar(email);