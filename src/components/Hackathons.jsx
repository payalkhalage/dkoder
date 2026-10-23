
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Code2,
  MapPin,
  Trophy,
  Users,
  Search,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Hackathons.css";

const opportunities = [
  {
    title: "Build for the Future",
    category: "Innovation",
    mode: "Online",
    level: "Beginner friendly",
    description:
      "Create a practical solution to a real-world problem and turn your idea into a working prototype.",
    tags: ["Innovation", "Teamwork", "Projects"],
    icon: Sparkles,
    color: "purple",
    status: "Explore",
  },
  {
    title: "CodeSprint",
    category: "Coding",
    mode: "Online",
    level: "All levels",
    description:
      "Challenge your problem-solving skills with programming tasks and algorithmic thinking.",
    tags: ["Java", "Problem Solving", "DSA"],
    icon: Code2,
    color: "yellow",
    status: "Explore",
  },
  {
    title: "Campus Innovators",
    category: "Student Innovation",
    mode: "Online / Offline",
    level: "Students",
    description:
      "Collaborate with other learners, develop a prototype, and present your solution.",
    tags: ["Students", "Ideas", "Team Projects"],
    icon: Trophy,
    color: "pink",
    status: "Explore",
  },
];

const filters = ["All", "Coding", "Innovation", "Student Innovation"];

export default function Hackathons() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.category === activeFilter;

    const searchText =
      `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();

    return matchesFilter && searchText.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="hackathons-page">
      <section className="hackathons-hero">
        <div className="hack-glow hack-glow-one" />
        <div className="hack-glow hack-glow-two" />

        <button className="hack-back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={17} /> Back to Home
        </button>

        <div className="hack-hero-content">
          <span className="hack-eyebrow">
            <Sparkles size={15} /> DISCOVER. BUILD. COMPETE.
          </span>

          <h1>
            Turn your ideas
            <br />
            into <span>real impact.</span>
          </h1>

          <p>
            Discover hackathons, coding competitions, and innovation
            opportunities to test your skills and build something meaningful.
          </p>

          <div className="hack-hero-stats">
            <div>
              <Trophy size={20} />
              <span>Compete & grow</span>
            </div>
            <div>
              <Users size={20} />
              <span>Build with teams</span>
            </div>
            <div>
              <Code2 size={20} />
              <span>Show your skills</span>
            </div>
          </div>
        </div>

        <div className="hack-hero-art" aria-hidden="true">
          <div className="hack-art-orbit" />
          <div className="hack-art-card">
            <Trophy size={62} strokeWidth={1.5} />
            <span>YOUR NEXT BIG IDEA</span>
            <strong>STARTS HERE</strong>
            <div className="hack-art-code">{"{ build. compete. grow(); }"}</div>
          </div>
          <div className="hack-floating-icon hack-float-code">
            <Code2 size={23} />
          </div>
          <div className="hack-floating-icon hack-float-spark">
            <Sparkles size={22} />
          </div>
        </div>
      </section>

      <section className="hackathons-content">
        <div className="hack-section-heading">
          <div>
            <span className="hack-section-label">YOUR NEXT OPPORTUNITY</span>
            <h2>Explore opportunities<span>.</span></h2>
            <p>Find a challenge that matches your interests.</p>
          </div>

          <div className="hack-search">
            <Search size={18} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search opportunities..."
              aria-label="Search opportunities"
            />
          </div>
        </div>

        <div className="hack-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="hackathon-grid">
          {filteredOpportunities.map((item) => {
            const Icon = item.icon;

            return (
              <article className="hackathon-card" key={item.title}>
                <div className={`hack-card-icon ${item.color}`}>
                  <Icon size={25} />
                </div>

                <div className="hack-card-category">{item.category}</div>
                <h3>{item.title}</h3>
                <p className="hack-card-description">{item.description}</p>

                <div className="hack-card-meta">
                  <span><MapPin size={15} /> {item.mode}</span>
                  <span><Users size={15} /> {item.level}</span>
                </div>

                <div className="hack-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <button
                  className="hack-card-button"
                  onClick={() =>
                    window.alert(
                      "This is a sample opportunity card. We can connect real hackathon listings and registration links next."
                    )
                  }
                >
                  Explore opportunity <ArrowUpRight size={17} />
                </button>
              </article>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="hack-empty-state">
            <Search size={28} />
            <h3>No matching opportunities</h3>
            <p>Try another keyword or select a different category.</p>
          </div>
        )}

        <div className="hack-submit-banner">
          <div className="hack-submit-icon"><CalendarDays size={26} /></div>
          <div>
            <h3>Your next project could start here.</h3>
            <p>Keep exploring, keep building, and keep learning.</p>
          </div>
          <button onClick={() => navigate("/")}>
            Explore DKoder <ArrowLeft size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}
