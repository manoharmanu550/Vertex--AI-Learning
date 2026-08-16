import { useState } from "react";

function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://https://vertex-ai-learning.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setRole("student");

      if (onRegister) {
        onRegister();
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create your LMS-AI account</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <button type="submit">Create Account</button>
        </form>

        {message && <p>{message}</p>}

        <p>
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;