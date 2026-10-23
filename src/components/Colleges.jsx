
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  GraduationCap,
  ArrowUpRight,
  Code2,
  Laptop,
  Building2,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import "./Colleges.css";

const colleges = [
  {
    name: "Engineering & Technology",
    shortName: "ET",
    city: "Pune",
    type: "Engineering",
    courses: ["Computer Science", "IT", "AI & Data Science"],
    description:
      "Explore engineering programs, coding communities, and technology-focused learning opportunities.",
    accent: "purple",
  },
  {
    name: "Computer Science College",
    shortName: "CS",
    city: "Mumbai",
    type: "Computer Science",
    courses: ["BCA", "B.Sc. Computer Science", "MCA"],
    description:
      "Discover computer science pathways, software development, and student tech activities.",
    accent: "yellow",
  },
  {
    name: "Innovation & Technology Institute",
    shortName: "IT",
    city: "Bengaluru",
    type: "Engineering",
    courses: ["Computer Engineering", "AI & ML", "Information Technology"],
    description:
      "Explore technology education, innovation projects, and opportunities to build practical skills.",
    accent: "pink",
  },
  {
    name: "Digital Learning College",
    shortName: "DL",
    city: "Hyderabad",
    type: "Computer Science",
    courses: ["BCA", "B.Sc. IT", "MCA"],
    description:
      "Find learning pathways for programming, web development, and digital technologies.",
    accent: "blue",
  },
  {
    name: "Future Skills Institute",
    shortName: "FS",
    city: "Nagpur",
    type: "Engineering",
    courses: ["CSE", "Electronics", "AI & Data Science"],
    description:
      "Explore technical study options and start planning your next learning steps.",
    accent: "green",
  },
  {
    name: "Business & Digital Studies",
    shortName: "BD",
    city: "Nashik",
    type: "Other",
    courses: ["BBA", "B.Com.", "Business Analytics"],
    description:
      "Discover business and digital learning pathways for your future career.",
    accent: "orange",
  },
];

const cityOptions = [
  "All Cities",
  "Pune",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Nagpur",
  "Nashik",
];

const categoryOptions = [
  "All Colleges",
  "Engineering",
  "Computer Science",
  "Other",
];

export default function Colleges() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [category, setCategory] = useState("All Colleges");
  const [selectedCollege, setSelectedCollege] = useState(null);

  const filteredColleges = useMemo(() => {
    const term = search.trim().toLowerCase();

    return colleges.filter((college) => {
      const matchesSearch =
        !term ||
        college.name.toLowerCase().includes(term) ||
        college.city.toLowerCase().includes(term) ||
        college.courses.some((course) =>
          course.toLowerCase().includes(term)
        );

      const matchesCity = city === "All Cities" || college.city === city;
      const matchesCategory =
        category === "All Colleges" || college.type === category;

      return matchesSearch && matchesCity && matchesCategory;
    });
  }, [search, city, category]);

  return (
    <main className="colleges-page">
      {/* Hero */}
      <section className="colleges-hero">
        <div className="college-orb college-orb-one" />
        <div className="college-orb college-orb-two" />

        <div className="colleges-hero-content">
          <span className="colleges-eyebrow">
            <Sparkles size={15} />
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Find your college.
            <br />
            <span>Shape your future.</span>
          </h1>

          <p>
            Explore colleges, discover courses, and find a learning path
            that matches your ambitions.
          </p>

          <div className="college-search">
            <Search size={21} />
            <input
              type="search"
              placeholder="Search colleges, cities, or courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search colleges, cities, or courses"
            />
            {search && (
              <button
                type="button"
                className="college-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="college-hero-tags">
            <span><Code2 size={15} /> Tech-focused learning</span>
            <span><GraduationCap size={16} /> Course discovery</span>
            <span><MapPin size={15} /> Explore by city</span>
          </div>
        </div>

        <div className="college-hero-art" aria-hidden="true">
          <div className="college-art-circle">
            <div className="college-art-building">
              <Building2 size={100} strokeWidth={1.25} />
            </div>
            <span className="college-art-cap">
              <GraduationCap size={43} />
            </span>
            <span className="college-art-code">
              <Code2 size={28} />
            </span>
            <span className="college-art-sparkle"><Sparkles size={22} /></span>
          </div>
          <div className="college-art-note">
            <span className="college-note-icon"><Laptop size={20} /></span>
            <span>
              <strong>Learn. Build. Grow.</strong>
              <small>Your journey, your future.</small>
            </span>
          </div>
        </div>
      </section>

      {/* Search results and filters */}
      <section className="college-directory">
        <div className="college-section-heading">
          <div>
            <span className="college-section-kicker">EXPLORE YOUR OPTIONS</span>
            <h2>Find your <span>place</span></h2>
            <p>Start exploring courses and college options.</p>
          </div>

          <div className="college-result-count">
            <GraduationCap size={19} />
            <strong>{filteredColleges.length}</strong>
            <span>{filteredColleges.length === 1 ? "result" : "results"}</span>
          </div>
        </div>

        <div className="college-filters">
          <div className="college-filter-label">
            <SlidersHorizontal size={17} />
            <span>Filter by</span>
          </div>

          <div className="college-filter-group">
            {categoryOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={`college-filter-chip ${
                  category === option ? "selected" : ""
                }`}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="college-city-select">
            <MapPin size={17} />
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              aria-label="Filter by city"
            >
              {cityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        {/* College cards */}
        {filteredColleges.length > 0 ? (
          <div className="college-grid">
            {filteredColleges.map((college, index) => (
              <article
                className="college-card"
                key={college.name}
                style={{ "--card-index": index }}
              >
                <div className={`college-card-visual ${college.accent}`}>
                  <div className="college-card-top">
                    <span className="college-type-label">
                      {college.type}
                    </span>
                    <span className="college-card-icon">
                      <GraduationCap size={21} />
                    </span>
                  </div>

                  <div className="college-monogram">
                    {college.shortName}
                  </div>

                  <div className="college-visual-decoration">
                    <Building2 size={94} strokeWidth={1} />
                  </div>
                </div>

                <div className="college-card-body">
                  <div className="college-location">
                    <MapPin size={15} />
                    {college.city}
                  </div>

                  <h3>{college.name}</h3>
                  <p className="college-description">{college.description}</p>

                  <div className="college-course-heading">
                    <Code2 size={16} />
                    Popular study areas
                  </div>

                  <div className="college-course-tags">
                    {college.courses.map((course) => (
                      <span key={course}>{course}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="college-view-button"
                    onClick={() => setSelectedCollege(college)}
                  >
                    Explore college
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="college-empty-state">
            <span><Search size={27} /></span>
            <h3>No matching colleges found</h3>
            <p>Try another keyword or reset your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCity("All Cities");
                setCategory("All Colleges");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="college-bottom-cta">
        <div className="college-cta-icon"><GraduationCap size={32} /></div>
        <div>
          <span>YOUR JOURNEY STARTS WITH A CHOICE</span>
          <h2>Dream big. Choose your next step.</h2>
          <p>Keep exploring and find the path that feels right for you.</p>
        </div>
        <a href="#college-directory" onClick={(event) => {
          event.preventDefault();
          document.querySelector(".college-directory")?.scrollIntoView({
            behavior: "smooth",
          });
        }}>
          Explore colleges <ArrowUpRight size={18} />
        </a>
      </section>

      {/* College details modal */}
      {selectedCollege && (
        <div
          className="college-modal-backdrop"
          onClick={() => setSelectedCollege(null)}
          role="presentation"
        >
          <section
            className="college-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="college-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="college-modal-close"
              onClick={() => setSelectedCollege(null)}
              aria-label="Close college details"
            >
              <X size={21} />
            </button>

            <div className={`college-modal-icon ${selectedCollege.accent}`}>
              <GraduationCap size={34} />
            </div>
            <span className="college-section-kicker">COLLEGE OVERVIEW</span>
            <h2 id="college-modal-title">{selectedCollege.name}</h2>
            <p className="college-modal-location">
              <MapPin size={17} /> {selectedCollege.city}
            </p>
            <p>{selectedCollege.description}</p>

            <h3>Study areas</h3>
            <div className="college-course-tags">
              {selectedCollege.courses.map((course) => (
                <span key={course}>{course}</span>
              ))}
            </div>

            <p className="college-demo-note">
              Demo profile: replace this example with verified college
              information, official links, and admission details before launch.
            </p>

            <button
              type="button"
              className="college-view-button"
              onClick={() => setSelectedCollege(null)}
            >
              Close overview <X size={17} />
            </button>
          </section>
        </div>
      )}

      <p className="college-data-disclaimer">
        These college profiles are illustrative demo content, not verified
        listings of real institutions.
      </p>
    </main>
  );
}
