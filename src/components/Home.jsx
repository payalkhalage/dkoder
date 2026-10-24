
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Trophy,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  Rocket,
  Play,
  Terminal,
  Braces,
  Zap,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Handshake,
  Building2,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import RobotMascot from "./RobotMascot";
import "./Home.css";

const learningCards = [
  {
    number: "01",
    title: "Learn to Code",
    description:
      "Build your programming foundation with learning resources made for your journey.",
    icon: Code2,
    tag: "START LEARNING",
    className: "card-purple",
    target: "tutorials",
  },
  {
    number: "02",
    title: "Explore Resources",
    description:
      "Discover useful guides, tutorials, and resources to strengthen your skills.",
    icon: BookOpen,
    tag: "KEEP EXPLORING",
    className: "card-yellow",
    target: "resources",
  },
  {
    number: "03",
    title: "Join Hackathons",
    description:
      "Challenge yourself, work on ideas, and gain practical project experience.",
    icon: Trophy,
    tag: "BUILD SOMETHING",
    className: "card-pink",
    target: "hackathons",
  },
  {
    number: "04",
    title: "Grow Together",
    description:
      "Connect with fellow learners and take the next step in your developer journey.",
    icon: Users,
    tag: "FIND YOUR PEOPLE",
    className: "card-blue",
    target: "colleges",
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const learningSteps = [
  {
    number: "01",
    title: "Build Your Foundation",
    subtitle: "Start here",
    description: "Learn programming basics, variables, loops, and functions.",
    icon: BookOpen,
    skills: ["Programming basics", "Logic building"],
  },
  {
    number: "02",
    title: "Solve Daily Challenges",
    subtitle: "Practice mode",
    description: "Strengthen problem-solving with coding questions and MCQs.",
    icon: Code2,
    skills: ["Coding problems", "MCQ practice"],
  },
  {
    number: "03",
    title: "Build Real Projects",
    subtitle: "Create something",
    description: "Apply your knowledge to practical projects and experiments.",
    icon: Rocket,
    skills: ["Hands-on projects", "Debugging"],
  },
  {
    number: "04",
    title: "Get Interview Ready",
    subtitle: "Reach your goal",
    description: "Prepare with mock tests, revision, and interview practice.",
    icon: Trophy,
    skills: ["Mock exams", "Interview prep"],
  },
];

export default function Home() {
  const navigate = useNavigate();


  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (index) => {
    setCompletedSteps((previous) =>
      previous.includes(index)
        ? previous.filter((step) => step !== index)
        : [...previous, index]
    );

    setActiveStep(index);
  };

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".dk-home [data-reveal]"
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => {
      element.style.setProperty(
        "--reveal-delay",
        `${element.dataset.delay || 0}ms`
      );
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="dk-home">

      <section className="dk-hero" id="home">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid-pattern" />

        <div
          className="dk-hero-content"
          data-reveal="left"
        >
          <div className="hero-pill">
            <Sparkles size={15} />
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
          </div>

          <h1>
            Think it.
            <br />
            <span className="gradient-text">Code it.</span>
            <br />
            <span className="hero-outline">Become it.</span>
          </h1>

          <p className="hero-description">
            Your space to learn coding, discover opportunities, build real
            projects, and grow into the developer you want to become.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => scrollToSection("tutorials")}
            >
              Start Learning <ArrowRight size={19} />
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/hackathons")}
            >
              <Play size={17} fill="currentColor" />
              Explore Opportunities
            </button>
          </div>

          <div className="hero-note">
            <span className="note-icon">
              <Zap size={16} />
            </span>
            <span>Learn by doing. Grow by building.</span>
          </div>
        </div>

        <div
          className="dk-hero-visual"
          data-reveal="right"
          data-delay="150"
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="floating-code code-top">
            <Braces size={18} />
            <span>build(you);</span>
          </div>

          <RobotMascot />

          <div className="floating-code code-bottom">
            <Terminal size={18} />
            <span>hello, developer!</span>
          </div>

          <div className="visual-label">
            <span className="status-dot" />
            <span>YOUR CODING COMPANION</span>
          </div>
        </div>

        <div className="hero-bottom-fade" />
      </section>

      <section className="dk-learning-section" id="resources">
        <div
          className="section-heading"
          data-reveal="up"
        >
          <span className="section-eyebrow">
            <Sparkles size={15} /> THE DKODER EXPERIENCE
          </span>

          <h2>
            Your journey from <span>learner to creator.</span>
          </h2>

          <p>
            Everything you need to practice, build projects, and discover
            opportunities — all in one place.
          </p>
        </div>

        <div className="learning-grid">
          {learningCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                className={`learning-card ${card.className}`}
                key={card.number}
                data-reveal="up"
                data-delay={index * 120}
              >
                <div className="card-topline">
                  <span className="card-number">{card.number}</span>

                  <span className="card-icon">
                    <Icon size={24} strokeWidth={2} />
                  </span>
                </div>

                <span className="card-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>

                <button
                  className="card-link"
                  onClick={() => {
                    if (card.target === "hackathons") {
                      navigate("/hackathons");
                    } else if (card.target === "colleges") {
                      navigate("/colleges");
                    } else {
                      scrollToSection(card.target);
                    }
                  }}
                  aria-label={`Explore ${card.title}`}
                >
                  Explore <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dk-why-section">
        <div
          className="why-content"
          data-reveal="left"
        >
          <span className="section-eyebrow">WHY DKODER?</span>

          <h2>
            Learn skills. <span>Build confidence.</span> Create your future.
          </h2>

          <p>
            Your developer journey is about more than just writing code.
            Practice your skills, collaborate with others, and turn what
            you learn into something meaningful.
          </p>

          <div className="why-points">
            <div className="why-point">
              <span className="why-check">✓</span>
              <div>
                <h3>Practice by doing</h3>
                <p>
                  Strengthen your coding skills through regular practice.
                </p>
              </div>
            </div>

            <div className="why-point">
              <span className="why-check">✓</span>
              <div>
                <h3>Discover opportunities</h3>
                <p>
                  Explore hackathons, events, and learning experiences.
                </p>
              </div>
            </div>

            <div className="why-point">
              <span className="why-check">✓</span>
              <div>
                <h3>Grow together</h3>
                <p>
                  Help students and institutions connect through technology.
                </p>
              </div>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/hackathons")}
          >
            Explore Opportunities <ArrowRight size={19} />
          </button>
        </div>

        <div
          className="why-visual"
          data-reveal="right"
          data-delay="150"
        >
          <div className="why-visual-glow" />

          <div className="why-code-card">
            <div className="why-code-header">
              <span />
              <span />
              <span />
              <p>your_future.java</p>
            </div>

            <div className="why-code-body">
              <p>
                <span>01</span> <b>class</b> YourFuture {"{"}
              </p>
              <p>
                <span>02</span> &nbsp; learnSkills();
              </p>
              <p>
                <span>03</span> &nbsp; buildProjects();
              </p>
              <p>
                <span>04</span> &nbsp; exploreOpportunities();
              </p>
              <p>
                <span>05</span> &nbsp; keepGrowing();
              </p>
              <p>
                <span>06</span> {"}"}
              </p>

              <div className="why-code-message">
                <Sparkles size={17} />
                Your potential has no limits.
              </div>
            </div>
          </div>

          <div className="why-floating-badge">
            <Rocket size={20} />
            <span>Keep building!</span>
          </div>
        </div>
      </section>

      <section className="dk-cta" id="hackathons">
        <div className="cta-decoration cta-decoration-one" />
        <div className="cta-decoration cta-decoration-two" />

        <div
          className="cta-icon"
          data-reveal="scale"
        >
          <Rocket size={30} />
        </div>

        <div
          className="cta-copy"
          data-reveal="up"
          data-delay="100"
        >
          <span className="section-eyebrow">
            YOUR JOURNEY STARTS NOW
          </span>

          <h2>
            Have an idea?
            <br />
            <span>Make it happen.</span>
          </h2>

          <p>
            Take the next step in your developer journey. Learn something new,
            join an event, and start building.
          </p>
        </div>

        <div data-reveal="right" data-delay="200">
          <button
            className="cta-button"
            onClick={() => navigate("/hackathons")}
          >
            Explore Hackathons <ArrowRight size={19} />
          </button>
        </div>
      </section>


      <section className="dk-learning-path" id="tutorials">
        <div className="path-heading" data-reveal="up">
          <span className="section-eyebrow">
            <Sparkles size={15} /> YOUR NEXT LEVEL STARTS HERE
          </span>

          <h2>
            Every step takes you <span>closer to your goal.</span>
          </h2>

          <p>
            Follow your path, practice consistently, and turn what you
            learn into real skills.
          </p>
        </div>

        <div className="path-progress">
          <div className="path-progress-top">
            <span>YOUR LEARNING JOURNEY</span>
            <strong>
              {completedSteps.length} / {learningSteps.length} completed
            </strong>
          </div>

          <div className="path-progress-track">
            <div
              className="path-progress-fill"
              style={{
                width: `${(completedSteps.length / learningSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="learning-road">
          <svg
            className="learning-road-svg"
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="road-shadow"
              d="M60 120 C160 15 250 15 330 120 S500 225 580 120 S750 15 940 120"
            />
            <path
              className="road-base"
              d="M60 120 C160 15 250 15 330 120 S500 225 580 120 S750 15 940 120"
            />
            <path
              className="road-animated"
              d="M60 120 C160 15 250 15 330 120 S500 225 580 120 S750 15 940 120"
            />
          </svg>

          <div className="learning-road-cards">
            {learningSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = completedSteps.includes(index);

              return (
                <article
                  className={`path-card ${completed ? "path-card-complete" : ""} ${activeStep === index ? "path-card-active" : ""
                    }`}
                  key={step.number}
                  data-reveal="up"
                  data-delay={index * 120}
                >
                  <div className="path-node-wrap">
                    <span className="path-node-halo" />
                    <button
                      className="path-node"
                      type="button"
                      onClick={() => toggleStep(index)}
                      aria-label={`${completed ? "Mark incomplete" : "Mark complete"}: ${step.title}`}
                      aria-pressed={completed}
                    >
                      {completed ? (
                        <span className="path-node-check">✓</span>
                      ) : (
                        <Icon size={23} />
                      )}
                    </button>
                  </div>

                  <div className="path-card-content">
                    <span className="path-step-label">
                      STEP {step.number} · {step.subtitle}
                    </span>

                    <h3>{step.title}</h3>
                    <p>{step.description}</p>

                    <div className="path-skills">
                      {step.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <button
                      className="path-action"
                      onClick={() => {
                        setActiveStep(index);
                        toggleStep(index);
                      }}
                    >
                      {completed ? "Completed" : "Mark as complete"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="path-finish" data-reveal="scale">
          <div className="path-finish-icon">
            <Trophy size={25} />
          </div>

          <div>
            <strong>
              {completedSteps.length === learningSteps.length
                ? "Amazing! You've completed your journey."
                : "Your next breakthrough is one step away."}
            </strong>
            <p>
              Keep practising. Every problem you solve builds confidence.
            </p>
          </div>
        </div>
      </section>


      <footer className="dk-footer">
        <div className="footer-contact-strip">
          <a
            className="footer-contact-card"
            href="tel:+918754200247"
            data-reveal="up"
            data-delay="0"
          >
            <span className="footer-contact-icon">
              <Phone size={22} />
            </span>

            <span className="footer-contact-copy">
              <small>CALL US</small>
              <strong>+91 87542 00247</strong>
            </span>

            <ArrowUpRight
              className="footer-contact-arrow"
              size={19}
            />
          </a>

          <a
            className="footer-contact-card"
            href="https://wa.me/918754200247"
            target="_blank"
            rel="noreferrer"
            data-reveal="up"
            data-delay="100"
          >
            <span className="footer-contact-icon">
              <MessageCircle size={22} />
            </span>

            <span className="footer-contact-copy">
              <small>WHATSAPP</small>
              <strong>Chat with our team</strong>
            </span>

            <ArrowUpRight
              className="footer-contact-arrow"
              size={19}
            />
          </a>

          <a
            className="footer-contact-card"
            href="mailto:support@dkoder.co.in"
            data-reveal="up"
            data-delay="200"
          >
            <span className="footer-contact-icon">
              <Mail size={22} />
            </span>

            <span className="footer-contact-copy">
              <small>EMAIL SUPPORT</small>
              <strong>support@dkoder.co.in</strong>
            </span>

            <ArrowUpRight
              className="footer-contact-arrow"
              size={19}
            />
          </a>
        </div>

        <div className="footer-main">
          <div
            className="footer-about"
            data-reveal="up"
          >
            <a
              href="#home"
              className="footer-brand"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="footer-brand-icon">
                <Code2 size={27} />
              </span>

              DKoder<span className="footer-brand-dot">.</span>
            </a>

            <p>
              Your space to learn coding, discover opportunities, build
              projects, and grow into the developer you want to become.
            </p>

            <div className="footer-office">
              <span className="footer-office-icon">
                <MapPin size={22} />
              </span>

              <div>
                <strong>Our office</strong>
                <p>
                  Campus 1A, No. 143, Dr. M.G.R. Road,
                  <br />
                  Perungudi, Chennai 600096, Tamil Nadu
                </p>
              </div>
            </div>

            <button
              className="footer-partner-button"
              onClick={() => navigate("/mou")}
            >
              <Handshake size={20} />
              Apply for MOU
              <ArrowRight size={18} />
            </button>
          </div>

          <div
            className="footer-column"
            data-reveal="up"
            data-delay="100"
          >
            <h3>
              <GraduationCap size={24} />
              For students
            </h3>

            <a
              href="#tutorials"
              onClick={() => scrollToSection("tutorials")}
            >
              Practice &amp; Learn
            </a>
            <a
              href="#resources"
              onClick={() => scrollToSection("resources")}
            >
              Learning Resources
            </a>
            <a
              href="#tutorials"
              onClick={() => scrollToSection("tutorials")}
            >
              Coding Tutorials
            </a>
            <button onClick={() => navigate("/hackathons")}>
              Events &amp; Hackathons
            </button>
            <button onClick={() => navigate("/colleges")}>
              Explore Colleges
            </button>
          </div>

          <div
            className="footer-column"
            data-reveal="up"
            data-delay="200"
          >
            <h3>
              <Building2 size={24} />
              For institutions
            </h3>

            <button onClick={() => navigate("/colleges")}>
              Explore Colleges
            </button>
            <button onClick={() => navigate("/mou")}>
              Apply for MOU
            </button>
            <button onClick={() => navigate("/mou")}>
              Partner with DKoder
            </button>
            <button onClick={() => navigate("/mou")}>
              Host an Event
            </button>
          </div>

          <div
            className="footer-column"
            data-reveal="up"
            data-delay="300"
          >
            <h3>
              <Trophy size={24} />
              Programmes
            </h3>

            <button onClick={() => navigate("/hackathons")}>
              Hackathons
            </button>
            <button onClick={() => navigate("/hackathons")}>
              Coding Challenges
            </button>
            <a
              href="#resources"
              onClick={() => scrollToSection("resources")}
            >
              Learning Resources
            </a>
            <a
              href="#tutorials"
              onClick={() => scrollToSection("tutorials")}
            >
              Student Projects
            </a>
          </div>

          <div
            className="footer-column"
            data-reveal="up"
            data-delay="400"
          >
            <h3>
              <Headphones size={24} />
              Help &amp; support
            </h3>

            <a href="mailto:support@dkoder.co.in">
              Contact Support
            </a>
            <a
              href="https://wa.me/918754200247"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
            <a href="mailto:support@dkoder.co.in?subject=Account%20Help">
              Account Help
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} DKoder. All rights reserved.
          </p>
          <p>Built for learners. Designed for growth.</p>
        </div>
      </footer>

      <div id="courses" className="dk-anchor" />
      <div id="colleges" className="dk-anchor" />
      <div id="mou" className="dk-anchor" />
    </div>
  );
}
