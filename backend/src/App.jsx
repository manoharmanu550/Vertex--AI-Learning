import { useState, useEffect } from "react";
import "./App.css";

/* =====================================================
   ANIMATED AI ROBOT CHATBOT
===================================================== */

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi there! 👋 How can I help you learn Java today?",
    },
  ]);

  const sendMessage = async (customMessage = null) => {
    const userMessage = (
      customMessage !== null ? customMessage : message
    ).trim();

    if (!userMessage || loading) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://https://vertex-ai-learning.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Chatbot request failed"
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "ai",
          text:
            "Sorry 😕 I am temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Hi there! 👋 How can I help you?",
      },
    ]);
  };

  return (
    <>
      {/* FLOATING ROBOT */}

      <button
        className="robot-floating-button"
        onClick={() => setOpen(!open)}
        aria-label="Open Vertex AI Tutor"
      >
        <div className="robot-mascot">

          <div className="robot-antenna">
            <span></span>
          </div>

          <div className="robot-body">

            <div className="robot-face">
              <span className="robot-eye"></span>
              <span className="robot-eye"></span>
            </div>

            <div className="robot-mouth"></div>

          </div>

          <div className="robot-arm robot-arm-left"></div>
          <div className="robot-arm robot-arm-right"></div>

        </div>

        <span className="robot-online-dot"></span>
      </button>

      {/* CHAT WINDOW */}

      {open && (
        <div className="chatbot-window">

          {/* HEADER */}

          <div className="chatbot-header">

            <div className="chatbot-title-area">

              <div className="chatbot-avatar">
                <div className="mini-robot">
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div>
                <h3>Vertex AI Tutor</h3>

                <span className="chatbot-status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>

            </div>

            <div className="chatbot-header-actions">

              <button
                onClick={clearChat}
                title="Clear chat"
              >
                ↻
              </button>

              <button
                onClick={() => setOpen(false)}
                title="Close"
              >
                ×
              </button>

            </div>

          </div>

          {/* MESSAGES */}

          <div className="chatbot-messages">

            {messages.map((item, index) => (

              <div
                key={index}
                className={
                  item.role === "user"
                    ? "chat-message user-message"
                    : "chat-message ai-message"
                }
              >

                {item.role === "ai" && (
                  <div className="message-avatar">
                    <div className="mini-robot">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}

                <div className="message-content">
                  {item.text}
                </div>

              </div>

            ))}

            {/* TYPING ANIMATION */}

            {loading && (

              <div className="chat-message ai-message">

                <div className="message-avatar">
                  <div className="mini-robot">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="message-content typing-message">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            )}

          </div>

          {/* SUGGESTIONS */}

          <div className="chatbot-suggestions">

            <button
              onClick={() =>
                sendMessage(
                  "Explain polymorphism in Java in a simple way"
                )
              }
            >
              💡 Polymorphism
            </button>

            <button
              onClick={() =>
                sendMessage(
                  "Explain OOP concepts in Java"
                )
              }
            >
              🧠 OOP
            </button>

            <button
              onClick={() =>
                sendMessage(
                  "Ask me a Java interview question"
                )
              }
            >
              🎯 Interview
            </button>

          </div>

          {/* INPUT */}

          <form
            className="chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >

            <input
              type="text"
              placeholder="Hi there! How can I help you?"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              disabled={loading}
            />

            <button
              type="submit"
              disabled={
                loading || !message.trim()
              }
              className="chatbot-send"
            >
              ➤
            </button>

          </form>

        </div>
      )}
    </>
  );
}


/* =====================================================
   MAIN APP
===================================================== */

function App() {

  const [user, setUser] = useState(null);

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [selectedLesson, setSelectedLesson] =
    useState(null);
  const [forgotPassword, setForgotPassword] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");
const [resetPassword, setResetPassword] =
  useState(false);

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");
const [completedLessons, setCompletedLessons] =
  useState([]);
const [lessonNotification, setLessonNotification] =
  useState("");
const [assignmentAnswer, setAssignmentAnswer] =
  useState("");
const [assignmentResult, setAssignmentResult] =
  useState("");

const [showAssignmentResult, setShowAssignmentResult] =
  useState(false);

  /* =====================================================
     COURSE DATA
  ===================================================== */

  const courses = [

    {
      id: 1,

      title:
        "Java Programming",

      description:
        "Learn Java from basics to advanced",

      instructor_name:
        "Manohar",
    },

  ];


  /* =====================================================
     LESSON DATA
  ===================================================== */

  const lessons = [

    {
      id: 1,

      title:
        "What is Java?",

      description:
        "Understand Java and why it is one of the most popular programming languages.",

      explanation:
        "Java is a high-level, object-oriented programming language developed by Sun Microsystems. Java is widely used for web applications, desktop applications, Android development and enterprise software.",
 videoUrl:
  "https://www.youtube.com/embed/GoXwIVyNvX0",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
assignment:
    "Write a Java program that prints Hello, Java! on the screen.",
    },

    {
      id: 2,

      title:
        "Features of Java",

      description:
        "Learn the important features that make Java powerful.",

      explanation:
        "Java is simple, object-oriented, platform independent, secure, robust and supports multithreading. Java follows the idea of Write Once, Run Anywhere.",
videoUrl:
  "https://www.youtube.com/embed/s7UgQ7_1KQY",
      code: `public class Main {
    public static void main(String[] args) {

        System.out.println("Simple");
        System.out.println("Object-Oriented");
        System.out.println("Platform Independent");

    }
}`,
    },

    {
      id: 3,

      title:
        "Installing Java",

      description:
        "Learn how to install and verify Java on your computer.",

      explanation:
        "To start Java programming, you need the Java Development Kit (JDK). After installing the JDK, you can verify the installation using the java -version command.",
videoUrl:
  "https://www.youtube.com/embed/2SeCLXF3s6w",

      code: `java -version
javac -version`,
    },

    {
      id: 4,

      title:
        "Variables and Data Types",

      description:
        "Learn how to store different types of data in Java.",

      explanation:
        "A variable is a named memory location used to store data. Java provides primitive data types such as int, double, char and boolean.",
videoUrl:
  "https://www.youtube.com/embed/xk4_1vDrzzo",

      code: `public class Main {
    public static void main(String[] args) {

        int age = 22;
        double salary = 25000.50;
        char grade = 'A';
        boolean active = true;

        System.out.println(age);
        System.out.println(salary);
        System.out.println(grade);
        System.out.println(active);

    }
}`,
    },

    {
      id: 5,

      title:
        "Operators",

      description:
        "Learn arithmetic, relational and logical operators.",

      explanation:
        "Operators are symbols used to perform operations on variables and values. Java supports arithmetic, relational, logical, assignment and other operators.",
videoUrl:
  "https://www.youtube.com/embed/RbjB3SIaabM",

      code: `public class Main {
    public static void main(String[] args) {

        int a = 10;
        int b = 5;

        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);

    }
}`,
    },

    {
      id: 6,

      title:
        "Classes and Objects",

      description:
        "Understand the foundation of object-oriented programming.",

      explanation:
        "A class is a blueprint for creating objects. An object is an instance of a class. Classes contain variables and methods.",
videoUrl:
  "https://www.youtube.com/embed/iyycjZKoZGs",

      code: `class Student {

    String name;

    void display() {
        System.out.println(name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
            new Student();

        student.name =
            "Manohar";

        student.display();

    }
}`,
    },

    {
      id: 7,

      title:
        "Constructors",

      description:
        "Learn how constructors initialize Java objects.",

      explanation:
        "A constructor is a special method that is automatically called when an object is created. It is commonly used to initialize object data.",
videoUrl:
  "https://www.youtube.com/embed/pgBk8HC7jbU",

      code: `class Student {

    String name;

    Student(String name) {
        this.name = name;
    }
}

public class Main {

    public static void main(String[] args) {

        Student s =
            new Student("Manohar");

        System.out.println(s.name);

    }
}`,
    },

    {
      id: 8,

      title:
        "Inheritance",

      description:
        "Learn how one class can inherit properties from another class.",

      explanation:
        "Inheritance allows a child class to reuse properties and methods of a parent class. It helps achieve code reusability.",
videoUrl:
  "https://www.youtube.com/embed/XSuybcFfLx4",
      code: `class Animal {

    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog =
            new Dog();

        dog.eat();
        dog.bark();

    }
}`,
    },

    {
      id: 9,

      title:
        "Polymorphism",

      description:
        "Understand one of the most important OOP concepts.",

      explanation:
        "Polymorphism means many forms. In Java, polymorphism can be achieved through method overloading and method overriding.",
videoUrl:
  "https://www.youtube.com/embed/vnnH04VXGFs",

      code: `class Animal {

    void sound() {
        System.out.println(
            "Animal sound"
        );
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println(
            "Dog barks"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal =
            new Dog();

        animal.sound();

    }
}`,
    },

    {
      id: 10,

      title:
        "Encapsulation",

      description:
        "Learn how to protect data using encapsulation.",

      explanation:
        "Encapsulation means wrapping data and methods together inside a class. Private variables and public getter/setter methods are commonly used.",
videoUrl:
  "https://www.youtube.com/embed/b9y0qGr3QHI",

      code: `class Student {

    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}`,
    },

    {
      id: 11,

      title:
        "Exception Handling",

      description:
        "Learn how Java handles runtime errors.",

      explanation:
        "Exception handling allows a program to handle unexpected situations without crashing. Java uses try, catch, finally, throw and throws.",
videoUrl:
  "https://www.youtube.com/embed/1XAfapkBQjk",

      code: `public class Main {

    public static void main(String[] args) {

        try {

            int result =
                10 / 0;

            System.out.println(result);

        } catch (ArithmeticException e) {

            System.out.println(
                "Cannot divide by zero"
            );

        }

    }
}`,
    },

    {
      id: 12,

      title:
        "Collections Framework",

      description:
        "Learn how to store and manage groups of objects.",

      explanation:
        "The Java Collections Framework provides classes and interfaces such as ArrayList, HashSet and HashMap for storing and manipulating collections of data.",
videoUrl:
  "https://www.youtube.com/embed/9ToiwX8cfWc",

      code: `import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {

        ArrayList<String> names =
            new ArrayList<>();

        names.add("Manohar");
        names.add("Java");

        System.out.println(names);

    }
}`,
    },

    {
      id: 13,

      title:
        "Multithreading",

      description:
        "Learn how Java performs multiple tasks simultaneously.",

      explanation:
        "Multithreading allows multiple threads to execute concurrently. It is useful for improving application responsiveness and performance.",
videoUrl:
  "https://www.youtube.com/embed/r_MbozD32eo",
      code: `class MyThread extends Thread {

    public void run() {

        System.out.println(
            "Thread is running"
        );

    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread =
            new MyThread();

        thread.start();

    }
}`,
    },

    {
      id: 14,

      title:
        "File Handling",

      description:
        "Learn how to read and write files using Java.",

      explanation:
        "Java provides classes such as File, FileReader and FileWriter for working with files.",
videoUrl:
  "https://www.youtube.com/embed/B1A41Jx0LPs",

      code: `import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args)
        throws IOException {

        FileWriter writer =
            new FileWriter("data.txt");

        writer.write(
            "Hello Java"
        );

        writer.close();

    }
}`,
    },

    {
      id: 15,

      title:
        "Java Streams",

      description:
        "Learn how to process collections using streams.",

      explanation:
        "Java Streams provide a modern way to process collections using operations such as filter, map and collect.",
videoUrl:
  "https://www.youtube.com/embed/t1-YZ6bF-g0",

      code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
            Arrays.asList(
                1, 2, 3, 4, 5
            );

        numbers.stream()
            .filter(n -> n % 2 == 0)
            .forEach(
                System.out::println
            );

    }
}`,
    },

  ];
const completedCount = completedLessons.filter(
  (progress) =>
    progress.course_id === selectedCourse?.id &&
    progress.completed
).length;

const progressPercentage =
  lessons.length > 0
    ? Math.round(
        (completedCount / lessons.length) * 100
      )
    : 0;


  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response =
        await fetch(
          "http://https://vertex-ai-learning.onrender.com/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Login failed"
        );

      }

      const loggedInUser = {

        name:
          data.user?.name ||
          "Manohar",

        email:
          data.user?.email ||
          email,

      };

      setUser(loggedInUser);

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

      }

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  /* =====================================================
     REGISTER
  ===================================================== */

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response =
        await fetch(
          "http://https://vertex-ai-learning.onrender.com/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              password,
              role: "student",
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Registration failed"
        );

      }

      alert(
        "Registration successful! Please login."
      );

      setIsRegister(false);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://https://vertex-ai-learning.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: resetEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Password reset request failed"
        );
      }

      alert(
        data.message ||
        "Password reset link sent to your email."
      );

      setForgotPassword(false);
      setResetEmail("");

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };
const handleResetPassword = async () => {
  try {
    setLoading(true);
    setError("");

    if (!newPassword || !confirmPassword) {
      throw new Error("Please enter both passwords");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      throw new Error("Invalid or missing reset link");
    }

    const response = await fetch(
      "http://https://vertex-ai-learning.onrender.com/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Password reset failed"
      );
    }

    alert("Password reset successful. Please login.");

    setNewPassword("");
    setConfirmPassword("");

    window.location.href = "/";
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
  /* =====================================================
     LOGOUT
  ===================================================== */

const fetchCompletedLessons = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch(
      "http://https://vertex-ai-learning.onrender.com/api/progress",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch progress"
      );
    }

    setCompletedLessons(data);

  } catch (error) {
    console.error("Progress fetch error:", error);
  }
};  
const handleLogout = () => {

    setUser(null);

    setSelectedCourse(null);

    setSelectedLesson(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setEmail("");

    setPassword("");

  };
useEffect(() => {
  fetchCompletedLessons();
}, []);


  /* =====================================================
     LOGIN / REGISTER
  ===================================================== */

  if (!user) {

    return (

      <div className="auth-container">

        <div className="auth-card">

          <h2>
            Vertex AI
          </h2>

          <p className="auth-subtitle">
            Learning Management System
          </p>
{new URLSearchParams(window.location.search).get("token") ? (
  <div>
    <h2>Reset Password</h2>

    <p>Enter your new password.</p>

    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Confirm New Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />

    {error && (
      <p className="error-message">
        {error}
      </p>
    )}

    <button
      type="button"
      onClick={handleResetPassword}
      disabled={loading}
    >
      {loading ? "Please wait..." : "Reset Password"}
    </button>
  </div>
) : forgotPassword ? (  <div>
    <h2>Forgot Password</h2>

    <p>Enter your email to reset your password.</p>

    <input
      type="email"
      placeholder="Enter your email"
      value={resetEmail}
      onChange={(e) => setResetEmail(e.target.value)}
      required
    />

    <button type="button" onClick={handleForgotPassword}>
      Send Reset Link
    </button>

    <button
      type="button"
      onClick={() => {
        setForgotPassword(false);
        setResetEmail("");
        setError("");
      }}
    >
      Back to Login
    </button>
  </div>
) : (

          <form
            onSubmit={
              isRegister
                ? handleRegister
                : handleLogin
            }
          >

            {isRegister && (

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            )}

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <div style={{ position: "relative" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    required
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
  >
    {showPassword ? "Hide" : "Show"}
  </button>

</div>
<div
  onClick={() => {
    setForgotPassword(true);
    setError("");
  }}
  style={{
    marginTop: "8px",
    textAlign: "right",
    color: "#67e8f9",
    fontSize: "12px",
    cursor: "pointer",
  }}
>
  Forgot Password?
</div>

            {error && (

              <p className="error-message">
                {error}
              </p>

            )}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account"
                : "Login"}

            </button>

          </form>
)}

          <p className="auth-switch">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {

                setIsRegister(
                  !isRegister
                );

                setError("");

              }}
            >

              {isRegister
                ? "Login"
                : "Register"}

            </button>

          </p>

        </div>

      </div>

    );

  }


  /* =====================================================
     LESSON PAGE
  ===================================================== */

  if (selectedLesson) {

    const currentIndex =
      lessons.findIndex(
        (lesson) =>
          lesson.id ===
          selectedLesson.id
      );

    const previousLesson =
      currentIndex > 0
        ? lessons[currentIndex - 1]
        : null;

    const nextLesson =
      currentIndex <
      lessons.length - 1
        ? lessons[currentIndex + 1]
        : null;

    return (

      <div className="app">

        <header className="header">

          <h1>
            Vertex AI
          </h1>

          <p>
            Learning Management System
          </p>

          <p>
            Welcome, {user.name}
          </p>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </header>
<main className="container lesson-page">
<div className="lesson-content-space">
 {lessonNotification && (
  <div className="lesson-success-toast">
    <div className="success-icon">✓</div>

    <div>
      <strong>Lesson Completed!</strong>
      <p>{lessonNotification}</p>
    </div>

    <button
      onClick={() => setLessonNotification("")}
    >
      ×
    </button>
  </div>

)}

          <button
            onClick={() =>
              setSelectedLesson(null)
            }
          >
            ← Back to Course
          </button>

          <h2>
            {selectedLesson.title}
          </h2>

          <p>
            {selectedLesson.description}
          </p>

          <br />

          <h2>
            Lesson
          </h2>

          <article className="course-card">

            <h3>
              {selectedLesson.title}
            </h3>

            <p>
              {selectedLesson.explanation}
            </p>

            <br />
{selectedLesson.videoUrl && (
  <>
    <h3>
      Video Lesson
    </h3>

    <iframe
      width="100%"
      height="400"
      src={selectedLesson.videoUrl}
      title={selectedLesson.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />

    <br />
    <br />
  </>
)}

            <h3>
              Example
            </h3>

            <pre>
              <code>
                {selectedLesson.code}
              </code>
            </pre>
{selectedLesson.assignment && (
  <>
    <br />

    <h3>
      📝 Assignment
    </h3>

    <p>
      {selectedLesson.assignment}
    </p>
  </>
)}
<textarea
  placeholder="Write your answer here..."
  rows="6"
  value={assignmentAnswer}
  onChange={(e) =>
    setAssignmentAnswer(e.target.value)
  }
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
  }}
/>
<br />
<br />

<button
  onClick={async () => {
    if (!assignmentAnswer.trim()) {
      alert("Please write your answer first.");
      return;
    }

    try {
      const response = await fetch(
        "http://https://vertex-ai-learning.onrender.com/api/chat/evaluate-assignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignment: selectedLesson.assignment,
            answer: assignmentAnswer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Assignment evaluation failed"
        );
      }

      setAssignmentResult(data.result);
setShowAssignmentResult(true);

setAssignmentAnswer("");
    } catch (error) {
      console.error("Assignment evaluation error:", error);
      alert(error.message);
    }
  }}
>
  Submit Assignment
</button>
{showAssignmentResult && (
  <div className="assignment-result-box">
    <h3>🤖 AI Evaluation</h3>
    <p>{assignmentResult}</p>

    <button
      onClick={() => setShowAssignmentResult(false)}
    >
      Close
    </button>
  </div>
)}

          </article>

          <br />

          <div>

            {previousLesson && (

              <button
                onClick={() =>
                  setSelectedLesson(
                    previousLesson
                  )
                }
              >
                ← Previous
              </button>

            )}

            {" "}

            {nextLesson && (

              <button
                onClick={() =>
                  setSelectedLesson(
                    nextLesson
                  )
                }
              >
                Next →
              </button>

            )}

          </div>

          <br />

          <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        "http://https://vertex-ai-learning.onrender.com/api/progress/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            course_id: selectedCourse.id,
            lesson_id: selectedLesson.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to complete lesson"
        );
      }

      setAssignmentResult("🎉 Lesson completed successfully!");
      setLessonNotification("Lesson completed successfully!");
setCompletedLessons((prev) => {
  const alreadyCompleted = prev.some(
    (progress) =>
      progress.course_id === selectedCourse.id &&
      progress.lesson_id === selectedLesson.id
  );

  if (alreadyCompleted) {
    return prev;
  }

  return [
    ...prev,
    {
      course_id: selectedCourse.id,
      lesson_id: selectedLesson.id,
      completed: true,
    },
  ];
});

      setSelectedLesson(null);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }}
>
  ✓ Complete Lesson
</button>
          </div>
        </main>

        <Chatbot />

      </div>

    );

  }


  /* =====================================================
     COURSE DETAILS
  ===================================================== */

  if (selectedCourse) {

    return (

      <div className="app">

        <header className="header">

          <h1>
            Vertex AI
          </h1>

          <p>
            Learning Management System
          </p>

          <p>
            Welcome, {user.name}
          </p>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </header>

        <main className="container">

          <button
            onClick={() =>
              setSelectedCourse(null)
            }
          >
            ← Back to Courses
          </button>

          <h2>
            {selectedCourse.title}
          </h2>

          <p>
            {selectedCourse.description}
          </p>

          <p>

            <strong>
              Instructor:
            </strong>{" "}

            {selectedCourse.instructor_name}

          </p>

          <br />

          <h2>
            Course Content
          </h2>
{lessonNotification && (
  <div className="lesson-success-toast">
    <div className="success-icon">✓</div>

    <div>
      <strong>Lesson Completed!</strong>
      <p>{lessonNotification}</p>
    </div>

    <button
      onClick={() => setLessonNotification("")}
    >
      ×
    </button>
  </div>
)}
           <div className="progress-section">

  <div className="progress-header">
    <span>Course Progress</span>
    <strong>{progressPercentage}%</strong>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${progressPercentage}%`,
      }}
    ></div>
  </div>

  <p>
    {completedCount} of {lessons.length} lessons completed
  </p>

</div>
          <div className="courses">

            {lessons.map(
              (lesson) => (

                <article
                  className="course-card"
                  key={lesson.id}
                >

                  <h3>
                    {lesson.title}
                  </h3>

                  <p>
                    {lesson.description}
                  </p>

                  <br />

                 <button
  onClick={() =>
    setSelectedLesson(lesson)
  }
>
  {completedLessons.some(
    (progress) =>
      progress.course_id === selectedCourse.id &&
      progress.lesson_id === lesson.id &&
      progress.completed
  )
    ? "✓ Completed"
    : "Start Lesson →"}
</button>
                </article>

              )
            )}

          </div>

        </main>

        <Chatbot />

      </div>

    );

  }


  /* =====================================================
     DASHBOARD
  ===================================================== */

  return (

    <div className="app">

      <header className="header">

        <h1>
          Vertex AI
        </h1>

        <p>
          Learning Management System
        </p>

        <p>
          Welcome, {user.name}
        </p>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <main className="container">

        <h2>
          Available Courses
        </h2>

        <div className="courses">

          {courses.map(
            (course) => (

              <article
                className="course-card"
                key={course.id}
              >

                <h3>
                  {course.title}
                </h3>

                <p>
                  {course.description}
                </p>

                <br />

                <p>

                  <strong>
                    Instructor:
                  </strong>{" "}

                  {course.instructor_name}

                </p>

                <br />

                <button
                  onClick={() =>
                    setSelectedCourse(
                      course
                    )
                  }
                >
                  Start Learning →
                </button>

              </article>

            )
          )}

        </div>

      </main>

      <Chatbot />

    </div>

  );

}


export default App;