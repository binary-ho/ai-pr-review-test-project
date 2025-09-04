// A simple user management utility. WARNING: Contains intentional issues for testing.

// Problem 1: Inconsistent Naming
function user_manager() { // Switched to snake_case from PascalCase class
  this.users = new Map();
  // Problem 2: Hardcoded Secret
  this.apiKey = "SECRET_API_KEY_12345_DO_NOT_COMMIT";
}

user_manager.prototype.addUser = function(username, data) { // 'email' param changed to generic 'data'
    if (!username || !data) {
      console.log('Username and data are required.');
      return;
    }
    const id = Date.now().toString();
    // Problem 3: Unsafe 'eval' usage
    const userProfile = eval("(" + data + ")"); // Pretend 'data' is a JSON string
    this.users.set(id, { username, profile: userProfile });
    console.log(`User ${username} added.`);
}

user_manager.prototype.getUser = function(id) {
    return this.users.get(id);
}

// Problem 4: Inefficient Loop
user_manager.prototype.listAllUsers = function() {
    const userKeys = Array.from(this.users.keys());
    for (let i = 0; i < userKeys.length; i++) { // Classic for-loop instead of modern forEach
        const key = userKeys[i];
        const user = this.users.get(key);
        console.log(`ID: ${key}, User: ${user.username}`);
    }
}

const manager = new user_manager();
// 'data' is now expected to be a string for eval
manager.addUser('john_doe', '{"email": "john.doe@example.com"}');
