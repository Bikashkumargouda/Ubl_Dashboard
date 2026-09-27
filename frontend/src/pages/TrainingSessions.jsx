import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TrainingSessions.css";

// const API = "http://localhost:5000";
const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function TrainingSessions() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FETCH TRAINING SESSIONS
  // ============================================

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/api/training`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch training sessions."
        );
      }

      setSessions(data);
    } catch (fetchError) {
      console.error("Fetch sessions error:", fetchError);

      setError(
        fetchError.message ||
        "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // ============================================
  // FILTER SESSIONS
  // ============================================

  const filteredSessions = sessions.filter((session) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      session.contractor
        ?.toLowerCase()
        .includes(searchText) ||
      session.topic
        ?.toLowerCase()
        .includes(searchText) ||
      formatDate(session.trainingDate)
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ============================================
  // FORMAT DATE
  // ============================================

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ============================================
  // FORMAT TIME
  // ============================================

  function formatTime(time) {
    if (!time) return "-";

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix = hour >= 12 ? "PM" : "AM";

    const formattedHour =
      hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour}:${minutes} ${suffix} `;
  }

  // ============================================
  // SUMMARY
  // ============================================

  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.status === "Completed"
  ).length;

  const totalWorkers = sessions.reduce(
    (total, session) =>
      total + Number(session.workerCount || 0),
    0
  );

  return (
    <div className="training-sessions-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <div className="sessions-header">
        <div>
          <h1>Training Sessions</h1>

          <p>
            View and manage contractor training
            session records.
          </p>
        </div>

        <Link
          to="/new-session"
          className="new-session-btn"
        >
          + New Training Session
        </Link>
      </div>

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="session-summary">
        <div className="summary-card">
          <span>Total Sessions</span>
          <strong>{totalSessions}</strong>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <strong>{completedSessions}</strong>
        </div>

        <div className="summary-card">
          <span>Total Workers</span>
          <strong>{totalWorkers}</strong>
        </div>
      </div>

      {/* ========================================
          FILTERS
      ======================================== */}

      <div className="sessions-toolbar">
        <input
          type="text"
          placeholder="Search contractor, topic or date..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="sessions-error">
          {error}
        </div>
      )}

      {/* ========================================
          LOADING
      ======================================== */}

      {loading ? (
        <div className="sessions-loading">
          Loading training sessions...
        </div>
      ) : (
        /* ======================================
           TABLE
        ====================================== */

        <div className="sessions-table-container">
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contractor</th>
                <th>Training Topic</th>
                <th>Workers</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSessions.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="no-sessions"
                  >
                    No training sessions found.
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => (
                  <tr key={session._id}>
                    <td>
                      {formatDate(
                        session.trainingDate
                      )}
                    </td>

                    <td>
                      <strong>
                        {session.contractor}
                      </strong>
                    </td>

                    <td>{session.topic}</td>

                    <td>
                      <span className="worker-count">
                        {session.workerCount}
                      </span>
                    </td>

                    <td>
                      {formatTime(session.startTime)}
                      {" - "}
                      {formatTime(session.endTime)}
                    </td>

                    <td>
                      <span
                        className={`status - badge ${session.status
                          ?.toLowerCase()
                          .replace(" ", "-")
                          } `}
                      >
                        {session.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() =>
                          alert(
                            `Training Topic: ${session.topic} \nContractor: ${session.contractor} \nWorkers: ${session.workerCount} `
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrainingSessions;

