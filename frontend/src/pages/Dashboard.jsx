import {
  ClipboardList,
  Users,
  Building2,
  CheckCircle2,
  Plus,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div>

      <div className="page-heading">

        <div>
          <p className="eyebrow">
            CONTRACTOR TRAINING
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="page-description">
            Monitor and manage contractor training
            activities at UBL Khordha.
          </p>
        </div>

        <Link
          to="/new-session"
          className="primary-button"
        >
          <Plus size={18} />
          New Session
        </Link>

      </div>


      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon green">
            <ClipboardList size={22} />
          </div>

          <div>
            <span>Total Sessions</span>
            <strong>24</strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon blue">
            <Users size={22} />
          </div>

          <div>
            <span>Trained Workers</span>
            <strong>156</strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            <Building2 size={22} />
          </div>

          <div>
            <span>Contractors</span>
            <strong>8</strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon purple">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>19</strong>
          </div>

        </div>

      </div>


      <div className="content-card">

        <div className="card-header">

          <div>
            <h2>
              Recent Training Sessions
            </h2>

            <p>
              Latest contractor training activities
            </p>
          </div>

          <Link to="/sessions">
            View All
          </Link>

        </div>


        <div className="empty-state">

          <ClipboardList size={40} />

          <h3>
            No live data yet
          </h3>

          <p>
            Training sessions will appear here
            after connecting MongoDB.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;