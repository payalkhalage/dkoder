

import { useEffect, useState } from "react";
import {
  Code2,
  Menu,
  X,
  ChevronDown,
  Accessibility,
  LayoutGrid,
} from "lucide-react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage =
    location.pathname === "/" || location.pathname === "/home";

  const isLearnActive =
    isHomePage &&
    ["courses", "resources", "tutorials"].includes(activeSection);

  const closeMenus = () => {
    setMenuOpen(false);
    setLearnOpen(false);
  };

  // Track which homepage section is currently visible.
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = [
      "home",
      "resources",
      "tutorials",
      "courses",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -45% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);


  useEffect(() => {
    closeMenus();
    setActiveSection("home");
  }, [location.pathname]);

  const scrollToSection = (id) => {
    closeMenus();

    if (!isHomePage) {
      navigate("/", {
        state: { scrollTo: id },
      });
      return;
    }

    if (id === "home") {
      setActiveSection("home");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      setActiveSection(
        ["courses", "resources", "tutorials"].includes(id)
          ? id
          : "home"
      );

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.info(`Section "${id}" will be added later.`);
    }
  };

  const navigateTo = (path) => {
    closeMenus();
    navigate(path);
  };

  const homeActive =
    isHomePage && !isLearnActive;



    
useEffect(() => {
  if (!isHomePage || !location.state?.scrollTo) return;

  const sectionId = location.state.scrollTo;

  const frame = requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(
      ["courses", "resources", "tutorials"].includes(sectionId)
        ? sectionId
        : "home"
    );

    
    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  });

  return () => cancelAnimationFrame(frame);
}, [isHomePage, location.state, location.pathname, navigate]);

  return (
    <header className="dk-navbar">
      <div className="dk-navbar-inner">
       
        <button
          className="dk-brand"
          onClick={() => scrollToSection("home")}
          aria-label="DKoder home"
        >
          <span className="dk-brand-icon">
            <Code2 size={25} strokeWidth={2.5} />
          </span>

          <span className="dk-brand-name">
            DKoder<span>.</span>
          </span>
        </button>

        
        <button
          className="dk-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`dk-nav-links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <button
            className={`dk-nav-link ${homeActive ? "is-active" : ""}`}
            onClick={() => scrollToSection("home")}
            aria-current={homeActive ? "page" : undefined}
          >
            Home
          </button>

         
          <div className="dk-learn-wrapper">
            <button
              className={`dk-nav-link dk-learn-trigger ${
                isLearnActive ? "is-active" : ""
              }`}
              onClick={() => setLearnOpen(!learnOpen)}
              aria-expanded={learnOpen}
              aria-current={isLearnActive ? "page" : undefined}
            >
              Learn
              <ChevronDown
                size={16}
                className={learnOpen ? "chevron-rotated" : ""}
              />
            </button>

            {learnOpen && (
              <div className="dk-learn-dropdown">
                <button
                  className={
                    activeSection === "courses" && isHomePage
                      ? "dropdown-active"
                      : ""
                  }
                  onClick={() => scrollToSection("courses")}
                >
                  Courses
                </button>

                <button
                  className={
                    activeSection === "resources" && isHomePage
                      ? "dropdown-active"
                      : ""
                  }
                  onClick={() => scrollToSection("resources")}
                >
                  Learning Resources
                </button>

                <button
                  className={
                    activeSection === "tutorials" && isHomePage
                      ? "dropdown-active"
                      : ""
                  }
                  onClick={() => scrollToSection("tutorials")}
                >
                  Tutorials
                </button>
              </div>
            )}
          </div>

          <button
            className={`dk-nav-link ${
              location.pathname === "/hackathons" ? "is-active" : ""
            }`}
            onClick={() => navigateTo("/hackathons")}
            aria-current={
              location.pathname === "/hackathons" ? "page" : undefined
            }
          >
            Hackathons
          </button>

          <button
            className={`dk-nav-link ${
              location.pathname === "/colleges" ? "is-active" : ""
            }`}
            onClick={() => navigateTo("/colleges")}
            aria-current={
              location.pathname === "/colleges" ? "page" : undefined
            }
          >
            For Colleges
          </button>

          <button
            className={`dk-nav-link ${
              location.pathname === "/mou" ? "is-active" : ""
            }`}
            onClick={() => navigateTo("/mou")}
            aria-current={
              location.pathname === "/mou" ? "page" : undefined
            }
          >
            Apply for MOU
          </button>
        </nav>

        
        <div className="dk-nav-actions">
          <button
            className="dk-accessibility"
            aria-label="Accessibility options"
            title="Accessibility options"
            onClick={() => {
              alert("Accessibility options will be added here.");
            }}
          >
            <Accessibility size={23} />
          </button>

          <button
            className="dk-dashboard"
            onClick={() => navigateTo("/dashboard")}
          >
            <LayoutGrid size={19} />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    </header>
  );
}
