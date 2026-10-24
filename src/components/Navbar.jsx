
import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  Code2,
  GraduationCap,
  LayoutGrid,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Navbar.css";

const learnItems = [
  {
    id: "courses",
    title: "Courses",
    description: "Build skills with structured learning.",
    icon: GraduationCap,
  },
  {
    id: "resources",
    title: "Learning Resources",
    description: "Explore useful guides and materials.",
    icon: BookOpen,
  },
  {
    id: "tutorials",
    title: "Tutorials",
    description: "Learn concepts step by step.",
    icon: Code2,
  },
];

const panelContent = {
  hackathons: {
    eyebrow: "CREATE · COMPETE · GROW",
    title: "Turn your ideas into something real.",
    description:
      "Discover hackathons, collaborate with other builders, and put your skills into action.",
    icon: CalendarDays,
    action: "Explore Hackathons",
    route: "/hackathons",
  },
  colleges: {
    eyebrow: "FOR EDUCATION",
    title: "Bring DKoder to your campus.",
    description:
      "Explore opportunities for colleges to connect students with coding, projects, and technology events.",
    icon: Building2,
    action: "Explore College Programs",
    route: "/colleges",
  },
  mou: {
    eyebrow: "LET'S COLLABORATE",
    title: "Build a stronger learning community.",
    description:
      "Interested in an institutional collaboration? Explore DKoder's MOU opportunities.",
    icon: GraduationCap,
    action: "Explore MOU",
    route: "/mou",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activePanel, setActivePanel] = useState(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const navLinksRef = useRef(null);
  const navItemRefs = useRef({});
  const learnWrapperRef = useRef(null);

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home";

  const isLearnActive =
    isHomePage &&
    ["courses", "resources", "tutorials"].includes(activeSection);

  const activeNavKey = isLearnActive
    ? "learn"
    : activePanel
      ? activePanel
      : isHomePage
        ? activeSection === "home"
          ? "home"
          : activeSection
        : location.pathname === "/hackathons"
          ? "hackathons"
          : location.pathname === "/colleges"
            ? "colleges"
            : location.pathname === "/mou"
              ? "mou"
              : location.pathname === "/dashboard"
                ? "dashboard"
                : "";

  const closeMenus = () => {
    setMenuOpen(false);
    setLearnOpen(false);
  };

  const closePanel = () => setActivePanel(null);

  const scrollToSection = (id) => {
    closeMenus();
    closePanel();

    if (!isHomePage) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    setActiveSection(id);

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const navigateTo = (path) => {
    closeMenus();
    closePanel();
    navigate(path);
  };

  const handleLearnItem = (id) => {
    setLearnOpen(false);
    setMenuOpen(false);
    scrollToSection(id);
  };

  const openPanel = (panel) => {
    closeMenus();
    setActivePanel((current) => (current === panel ? null : panel));
  };

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
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId || !isHomePage) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveSection(targetId);
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state, isHomePage, navigate]);

  useEffect(() => {
    closeMenus();
    closePanel();
  }, [location.pathname]);

 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenus();
        closePanel();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        learnWrapperRef.current &&
        !learnWrapperRef.current.contains(event.target)
      ) {
        setLearnOpen(false);
      }

      if (
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        !event.target.closest(".dk-nav-actions")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  
  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = navItemRefs.current[activeNavKey];
      const container = navLinksRef.current;

      if (!activeItem || !container || menuOpen) {
        setIndicator((current) => ({
          ...current,
          visible: false,
        }));
        return;
      }

      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setIndicator({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        visible: true,
      });
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [
    activeNavKey,
    menuOpen,
    learnOpen,
    location.pathname,
  ]);

  const setNavRef = (key) => (element) => {
    navItemRefs.current[key] = element;
  };

  const PanelIcon = activePanel
    ? panelContent[activePanel]?.icon
    : Sparkles;

  return (
    <>
      <header className="dk-navbar">
        <div className="dk-navbar-inner">
          <button
            type="button"
            className="dk-brand"
            onClick={() => scrollToSection("home")}
            aria-label="DKoder home"
          >
            <span className="dk-brand-icon">
              <Code2 size={23} strokeWidth={2.5} />
            </span>

            <span className="dk-brand-name">
              DKoder<span className="dk-brand-dot">.</span>
            </span>
          </button>

          <button
            type="button"
            className="dk-mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((current) => !current);
              setLearnOpen(false);
            }}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav
            className={`dk-nav-links ${menuOpen ? "mobile-open" : ""}`}
            ref={navLinksRef}
            aria-label="Main navigation"
          >
            <span
              className={`dk-active-indicator ${
                indicator.visible ? "indicator-visible" : ""
              }`}
              style={{
                "--indicator-left": `${indicator.left}px`,
                "--indicator-width": `${indicator.width}px`,
              }}
              aria-hidden="true"
            />

            <button
              ref={setNavRef("home")}
              type="button"
              className={`dk-nav-link ${
                activeNavKey === "home" ? "is-active" : ""
              }`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>

            <div
              className="dk-learn-wrapper"
              ref={learnWrapperRef}
            >
              <button
                ref={setNavRef("learn")}
                type="button"
                className={`dk-nav-link dk-learn-trigger ${
                  activeNavKey === "learn" ? "is-active" : ""
                }`}
                aria-expanded={learnOpen}
                onClick={() => {
                  setLearnOpen((current) => !current);
                  setActivePanel(null);
                }}
              >
                Learn
                <ChevronDown
                  size={15}
                  className={learnOpen ? "chevron-open" : ""}
                />
              </button>

              {learnOpen && (
                <div className="dk-learn-dropdown dk-menu-enter">
                  <div className="dk-dropdown-heading">
                    <span className="dk-dropdown-eyebrow">
                      YOUR LEARNING SPACE
                    </span>
                    <strong>Where will you grow next?</strong>
                  </div>

                  {learnItems.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`dk-learn-item ${
                          activeSection === item.id
                            ? "dropdown-active"
                            : ""
                        }`}
                        onClick={() => handleLearnItem(item.id)}
                      >
                        <span className="dk-learn-item-icon">
                          <ItemIcon size={19} />
                        </span>

                        <span className="dk-learn-item-copy">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>

                        <ArrowRight
                          size={16}
                          className="dk-learn-arrow"
                        />
                      </button>
                    );
                  })}

                  <div className="dk-dropdown-footer">
                    <Sparkles size={15} />
                    Small steps. Big ideas.
                  </div>
                </div>
              )}
            </div>

            <button
              ref={setNavRef("hackathons")}
              type="button"
              className={`dk-nav-link ${
                activeNavKey === "hackathons" ? "is-active" : ""
              }`}
              onClick={() => openPanel("hackathons")}
            >
              Hackathons
            </button>

            <button
              ref={setNavRef("colleges")}
              type="button"
              className={`dk-nav-link ${
                activeNavKey === "colleges" ? "is-active" : ""
              }`}
              onClick={() => openPanel("colleges")}
            >
              For Colleges
            </button>

            <button
              ref={setNavRef("mou")}
              type="button"
              className={`dk-nav-link ${
                activeNavKey === "mou" ? "is-active" : ""
              }`}
              onClick={() => openPanel("mou")}
            >
              Apply for MOU
            </button>

            <div className="dk-mobile-actions">
              <button
                type="button"
                className="dk-mobile-dashboard"
                onClick={() => navigateTo("/dashboard")}
              >
                <LayoutGrid size={17} />
                Dashboard
                <ArrowRight size={16} />
              </button>
            </div>
          </nav>

          <div className="dk-nav-actions">
            <button
              type="button"
              className="dk-accessibility"
              aria-label="Accessibility information"
              title="Accessibility"
              onClick={() =>
                setActivePanel((current) =>
                  current === "accessibility"
                    ? null
                    : "accessibility"
                )
              }
            >
              <Accessibility size={19} />
            </button>

            <button
              ref={setNavRef("dashboard")}
              type="button"
              className={`dk-dashboard ${
                activeNavKey === "dashboard" ? "is-active" : ""
              }`}
              onClick={() => navigateTo("/dashboard")}
            >
              <LayoutGrid size={17} />
              Dashboard
              <ArrowRight size={16} className="dk-dashboard-arrow" />
            </button>
          </div>
        </div>
      </header>

      {activePanel && (
        <div
          className="dk-panel-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel();
          }}
        >
          <section
            className="dk-feature-panel dk-panel-enter"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dk-panel-title"
          >
            <button
              type="button"
              className="dk-panel-close"
              aria-label="Close panel"
              onClick={closePanel}
            >
              <X size={20} />
            </button>

            {activePanel === "accessibility" ? (
              <>
                <span className="dk-panel-icon">
                  <Accessibility size={25} />
                </span>
                <span className="dk-panel-eyebrow">
                  ACCESSIBILITY
                </span>
                <h2 id="dk-panel-title">
                  A better experience for everyone.
                </h2>
                <p>
                  DKoder supports keyboard navigation and reduced-motion
                  preferences. Use Tab to move through controls and
                  Enter or Space to activate them.
                </p>
                <button
                  type="button"
                  className="dk-panel-secondary"
                  onClick={closePanel}
                >
                  Got it
                </button>
              </>
            ) : (
              <>
                <span className="dk-panel-icon">
                  {PanelIcon && <PanelIcon size={25} />}
                </span>

                <span className="dk-panel-eyebrow">
                  {panelContent[activePanel]?.eyebrow}
                </span>

                <h2 id="dk-panel-title">
                  {panelContent[activePanel]?.title}
                </h2>

                <p>
                  {panelContent[activePanel]?.description}
                </p>

                <button
                  type="button"
                  className="dk-panel-primary"
                  onClick={() =>
                    navigateTo(panelContent[activePanel].route)
                  }
                >
                  {panelContent[activePanel]?.action}
                  <ArrowRight size={17} />
                </button>

                <div className="dk-panel-decoration" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}