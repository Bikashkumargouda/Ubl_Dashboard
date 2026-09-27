import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewTrainingSession.css";

const API = "http://localhost:5000";

const contractors = [
  "M/s Banshidhar Parida",
  "Maa Bateswari",
  "NIS",
  "JSR",
  "SIS",
];

const workersByContractor = {
  "M/s Banshidhar Parida": [
    {
      id: "BP001",
      name: "Rakesh Kumar",
      designation: "Helper",
    },
    {
      id: "BP002",
      name: "Suresh Pradhan",
      designation: "Operator",
    },
    {
      id: "BP003",
      name: "Amit Nayak",
      designation: "Technician",
    },
  ],

  "Maa Bateswari": [
    {
      id: "MB001",
      name: "Rajesh Das",
      designation: "Helper",
    },
    {
      id: "MB002",
      name: "Manoj Sahu",
      designation: "Operator",
    },
  ],

  NIS: [
    {
      id: "NIS001",
      name: "Ajay Kumar",
      designation: "Helper",
    },
    {
      id: "NIS002",
      name: "Bikram Singh",
      designation: "Technician",
    },
  ],

  JSR: [
    {
      id: "JSR001",
      name: "Sanjay Rout",
      designation: "Operator",
    },
    {
      id: "JSR002",
      name: "Debashish Behera",
      designation: "Helper",
    },
  ],

  SIS: [
    {
      id: "SIS001",
      name: "Rahul Das",
      designation: "Security",
    },
    {
      id: "SIS002",
      name: "Prakash Nayak",
      designation: "Security",
    },
  ],
};

const topics = [
  "Safety Induction",
  "Fire Safety",
  "PPE Awareness",
  "Working at Height",
  "Electrical Safety",
  "Hazardous Substances / MSDS",
  "Emergency Preparedness",
  "Toolbox Talk",
];

function NewTrainingSession() {
  const navigate = useNavigate();

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getInitialForm = () => ({
    brewery: "United Breweries Limited – Khordha",
    contractor: "",
    workers: [],
    trainingDate: getToday(),
    startTime: "",
    endTime: "",
    topic: "",
    status: "Completed",
  });

  const [formData, setFormData] = useState(getInitialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // ==========================================
  // HANDLE NORMAL INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // HANDLE CONTRACTOR
  // ==========================================

  const handleContractorChange = (event) => {
    const contractor = event.target.value;

    setFormData((previous) => ({
      ...previous,
      contractor,
      workers: [],
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // ADD WORKER
  // ==========================================

  const handleWorkerChange = (event) => {
    const workerId = event.target.value;

    if (!workerId) {
      return;
    }

    const contractorWorkers =
      workersByContractor[formData.contractor] || [];

    const selectedWorker = contractorWorkers.find(
      (worker) => worker.id === workerId
    );

    if (!selectedWorker) {
      return;
    }

    const alreadySelected = formData.workers.some(
      (worker) => worker.id === selectedWorker.id
    );

    if (alreadySelected) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      workers: [
        ...previous.workers,
        selectedWorker,
      ],
    }));

    event.target.value = "";

    setError("");
    setSuccess("");
  };

  // ==========================================
  // REMOVE WORKER
  // ==========================================

  const removeWorker = (workerId) => {
    setFormData((previous) => ({
      ...previous,
      workers: previous.workers.filter(
        (worker) => worker.id !== workerId
      ),
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {
    if (!formData.contractor) {
      return "Please select a contractor.";
    }

    if (formData.workers.length === 0) {
      return "Please select at least one participating employee.";
    }

    if (!formData.trainingDate) {
      return "Please select training date.";
    }

    if (!formData.startTime) {
      return "Please select start time.";
    }

    if (!formData.endTime) {
      return "Please select end time.";
    }

    if (formData.endTime <= formData.startTime) {
      return "End time must be later than start time.";
    }

    if (!formData.topic) {
      return "Please select training topic.";
    }

    if (!formData.status) {
      return "Please select status.";
    }

    return "";
  };

  // ==========================================
  // SAVE TRAINING SESSION
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    const payload = {
      brewery: formData.brewery,

      contractor: formData.contractor,

      workers: formData.workers.map((worker) => ({
        employeeId: worker.id,
        name: worker.name,
        designation: worker.designation,
      })),

      workerCount: formData.workers.length,

      trainingDate: formData.trainingDate,

      startTime: formData.startTime,

      endTime: formData.endTime,

      topic: formData.topic,

      status: formData.status,
    };

    console.log("Sending training data:", payload);

    try {
      const response = await fetch(
        `${API}/api/training`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to save training session."
        );
      }

      setSuccess(
        "Training session saved successfully."
      );

      setFormData(getInitialForm());

      setTimeout(() => {
        navigate("/sessions");
      }, 1000);
    } catch (saveError) {
      console.error(
        "Training save error:",
        saveError
      );

      setError(
        saveError.message ||
        "Unable to connect to the backend server."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CLEAR FORM
  // ==========================================

  const handleClear = () => {
    setFormData(getInitialForm());
    setError("");
    setSuccess("");
  };

  // ==========================================
  // AVAILABLE WORKERS
  // ==========================================

  const contractorWorkers =
    workersByContractor[formData.contractor] || [];

  const remainingWorkers =
    contractorWorkers.filter(
      (worker) =>
        !formData.workers.some(
          (selectedWorker) =>
            selectedWorker.id === worker.id
        )
    );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="new-training-page">

      {/* PAGE HEADER */}

      <div className="new-training-header">
        <div>
          <h1>New Training Session</h1>

          <p>
            Create and record a new contractor
            training session.
          </p>
        </div>
      </div>

      <form
        className="training-form"
        onSubmit={handleSubmit}
      >

        {/* ====================================
            TRAINING INFORMATION
        ==================================== */}

        <div className="form-section">

          <div className="section-title">
            <h2>Training Information</h2>

            <p>
              Enter the basic details of the
              training session.
            </p>
          </div>

          <div className="form-grid">

            {/* BREWERY */}

            <div className="form-group full-width">
              <label>Brewery</label>

              <input
                type="text"
                value={formData.brewery}
                disabled
              />
            </div>

            {/* CONTRACTOR */}

            <div className="form-group">
              <label>
                Contractor{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                value={formData.contractor}
                onChange={
                  handleContractorChange
                }
              >
                <option value="">
                  Select Contractor
                </option>

                {contractors.map(
                  (contractor) => (
                    <option
                      key={contractor}
                      value={contractor}
                    >
                      {contractor}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* WORKER COUNT */}

            <div className="form-group">
              <label>Worker Count</label>

              <input
                type="number"
                value={
                  formData.workers.length
                }
                readOnly
              />
            </div>

            {/* DATE */}

            <div className="form-group">
              <label>
                Training Date{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="date"
                name="trainingDate"
                value={
                  formData.trainingDate
                }
                onChange={handleChange}
              />
            </div>

            {/* TOPIC */}

            <div className="form-group">
              <label>
                Training Topic{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
              >
                <option value="">
                  Select Training Topic
                </option>

                {topics.map((topic) => (
                  <option
                    key={topic}
                    value={topic}
                  >
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            {/* START TIME */}

            <div className="form-group">
              <label>
                Start Time{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="time"
                name="startTime"
                value={
                  formData.startTime
                }
                onChange={handleChange}
              />
            </div>

            {/* END TIME */}

            <div className="form-group">
              <label>
                End Time{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="time"
                name="endTime"
                value={
                  formData.endTime
                }
                onChange={handleChange}
              />
            </div>

            {/* STATUS */}

            <div className="form-group">
              <label>
                Status{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Completed">
                  Completed
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* ====================================
            PARTICIPATING EMPLOYEES
        ==================================== */}

        <div className="form-section">

          <div className="section-title">
            <h2>
              Participating Employees
            </h2>

            <p>
              Select the employees who attended
              the training.
            </p>
          </div>

          <div className="form-group">

            <label>
              Employee{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              disabled={
                !formData.contractor
              }
              defaultValue=""
              onChange={
                handleWorkerChange
              }
            >
              <option value="">
                {!formData.contractor
                  ? "Select contractor first"
                  : "Select employee"}
              </option>

              {remainingWorkers.map(
                (worker) => (
                  <option
                    key={worker.id}
                    value={worker.id}
                  >
                    {worker.id} -{" "}
                    {worker.name} (
                    {worker.designation})
                  </option>
                )
              )}
            </select>

          </div>

          {/* SELECTED EMPLOYEES */}

          {formData.workers.length > 0 && (
            <div className="selected-workers">

              <h3>
                Selected Employees (
                {formData.workers.length}
                )
              </h3>

              <div className="worker-list">

                {formData.workers.map(
                  (worker) => (
                    <div
                      className="worker-tag"
                      key={worker.id}
                    >

                      <div>
                        <strong>
                          {worker.name}
                        </strong>

                        <span>
                          {worker.id} ·{" "}
                          {worker.designation}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeWorker(
                            worker.id
                          )
                        }
                      >
                        ×
                      </button>

                    </div>
                  )
                )}

              </div>
            </div>
          )}

        </div>

        {/* ====================================
            ERROR MESSAGE
        ==================================== */}

        {error && (
          <div className="form-message error">
            {error}
          </div>
        )}

        {/* ====================================
            SUCCESS MESSAGE
        ==================================== */}

        {success && (
          <div className="form-message success">
            {success}
          </div>
        )}

        {/* ====================================
            ACTION BUTTONS
        ==================================== */}

        <div className="form-actions">

          <button
            type="button"
            className="btn-secondary"
            onClick={handleClear}
            disabled={saving}
          >
            Clear
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Training Session"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default NewTrainingSession;

