const users = [
    { username: 'admin', password: 'admin123', token: 'admin-token' },
    { username: 'user', password: 'user123', token: 'user-token' },
  ];
  
  export function login({ username, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          resolve({
            status: 200,
            data: { token: user.token, message: 'Login successful' },
          });
        } else {
          reject({
            status: 401,
            error: 'Invalid username or password',
          });
        }
      }, 1000); // Simulates a network delay
    });
  }
  