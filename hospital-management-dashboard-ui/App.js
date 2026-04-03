import React, { useState } from "react";

/* Header */
function Header() {
  return (
    <header style={styles.header}>
      <h1>🏥 Hospital Management Dashboard</h1>
    </header>
  );
}

/* Sidebar */
function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    "Dashboard",
    "Doctors",
    "Patients",
    "Appointments",
  ];

  return (
    <aside style={styles.sidebar}>
      {menuItems.map((item) => (
        <div
          key={item}
          onClick={() => setActiveTab(item)}
          style={{
            ...styles.menuItem,
            background:
              activeTab === item ? "#2563eb" : "transparent",
            color: activeTab === item ? "white" : "#111",
          }}
        >
          {item}
        </div>
      ))}
    </aside>
  );
}

/* Dashboard */
function Dashboard() {
  const services = [
    "Emergency Care",
    "OPD Services",
    "Pharmacy",
    "Laboratory",
    "ICU Support",
    "Appointment Booking",
  ];

  return (
    <div style={styles.page}>
      {/* Welcome Banner */}
      <div style={styles.dashboardBanner}>
        <h1 style={{ margin: 0 }}>
          🏥 CityCare Hospital
        </h1>
        <p style={{ marginTop: "8px" }}>
          Welcome to Hospital Management Dashboard
        </p>
      </div>

      {/* Services Section */}
      <h2 style={{ marginTop: "30px" }}>
        Hospital Services
      </h2>

      <div style={styles.serviceGrid}>
        {services.map((service, index) => (
          <div key={index} style={styles.serviceCard}>
            <h3>{service}</h3>
            <p>Available 24/7</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={{ marginTop: "30px" }}>
        Quick Actions
      </h2>

      <div style={styles.serviceGrid}>
        <div style={styles.actionCard}>
          📅 Book Appointment
        </div>
        <div style={styles.actionCard}>
          👨‍⚕️ View Doctors
        </div>
        <div style={styles.actionCard}>
          🧾 Patient Records
        </div>
      </div>
    </div>
  );
}
/* Stat Card */
function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h3>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>
        {value}
      </p>
    </div>
  );
}

/* Doctors */
function Doctors() {
  return (
    <div style={styles.page}>
      <h2>Available Doctors</h2>
      <DoctorCard
        name="Dr. Anjali More"
        department="Cardiology"
      />
      <DoctorCard
        name="Dr. Riya Sharma"
        department="Neurology"
      />
    </div>
  );
}

/* Patients */
function Patients() {
  return (
    <div style={styles.page}>
      <h2>Patients List</h2>
      <div style={styles.card}>Rahul Patil</div>
      <div style={styles.card}>Sneha Joshi</div>
      <div style={styles.card}>Amit Shah</div>
    </div>
  );
}

/* Doctor Card */
function DoctorCard({ name, department }) {
  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <p>{department}</p>
    </div>
  );
}

/* Appointments */
function Appointments() {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Load existing appointments from localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const handleBooking = () => {
    if (!patientName || !doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const newAppointment = {
      patientName,
      doctor,
      date,
      time,
    };

    const updatedAppointments = [
      ...appointments,
      newAppointment,
    ];

    // Update state
    setAppointments(updatedAppointments);

    // Save to localStorage
    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    // Clear input fields
    setPatientName("");
    setDoctor("");
    setDate("");
    setTime("");
  };

  return (
    <div style={styles.page}>
      <h2>Book Appointment</h2>

      <input
        style={styles.input}
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) =>
          setPatientName(e.target.value)
        }
      />

      <select
        style={styles.input}
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
      >
        <option value="">Select Doctor</option>
        <option>Dr. Anjali More</option>
        <option>Dr. Riya Sharma</option>
      </select>

      <input
        style={styles.input}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        style={styles.input}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={handleBooking}
      >
        Book Now
      </button>

      <div style={{ marginTop: "30px" }}>
        <h3>Booked Appointments</h3>

        {appointments.length === 0 ? (
          <p>No appointments yet</p>
        ) : (
          appointments.map((appt, index) => (
            <div key={index} style={styles.card}>
              <h4>{appt.patientName}</h4>
              <p>{appt.doctor}</p>
              <p>Date: {appt.date}</p>
              <p>Time: {appt.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
/* Main App */
export default function App() {
  const [activeTab, setActiveTab] =
    useState("Dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "Doctors":
        return <Doctors />;
      case "Patients":
        return <Patients />;
      case "Appointments":
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.layout}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div style={{ flex: 1 }}>{renderPage()}</div>
      </div>
    </div>
  );
}

/* Styles */
const styles = {
  header: {
    background: "#2563eb",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },

  layout: {
    display: "flex",
    minHeight: "100vh",
  },

  sidebar: {
    width: "220px",
    background: "#f3f4f6",
    padding: "20px",
  },

  menuItem: {
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  page: {
    padding: "30px",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "180px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  input: {
    display: "block",
    width: "300px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  /* Attractive Dashboard Banner */
  dashboardBanner: {
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  },

  /* Services Grid */
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },

  /* Service Cards */
  serviceCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  /* Quick Action Cards */
  actionCard: {
    background: "#10b981",
    color: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "600",
    cursor: "pointer",
  },
};
