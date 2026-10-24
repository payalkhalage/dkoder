
import { useState } from "react";
import {
  Handshake,
  GraduationCap,
  Code2,
  Users,
  Trophy,
  BriefcaseBusiness,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Send,
  Building2,
  Mail,
  Phone,
  UserRound,
  Sparkles,
} from "lucide-react";
import "./MOU.css";

const partnershipAreas = [
  {
    icon: Code2,
    title: "Technical Workshops",
    description:
      "Organize coding sessions, hands-on training, and technology workshops for students.",
  },
  {
    icon: Trophy,
    title: "Hackathons & Events",
    description:
      "Collaborate on coding competitions, innovation challenges, and student tech events.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career Opportunities",
    description:
      "Explore potential internship awareness, career guidance, and industry-readiness activities.",
  },
  {
    icon: BookOpen,
    title: "Learning Programs",
    description:
      "Support peer learning, technical resources, and skill-development initiatives.",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit your interest",
    description: "Share your college details and the collaboration you have in mind.",
  },
  {
    number: "02",
    title: "Discuss the opportunity",
    description: "Connect to discuss goals, responsibilities, and possible activities.",
  },
  {
    number: "03",
    title: "Review the proposal",
    description: "Both parties review the proposed scope and terms of collaboration.",
  },
  {
    number: "04",
    title: "Formalize the MOU",
    description: "If mutually agreed, finalize and sign the formal agreement.",
  },
];

export default function MOU() {
  const [formData, setFormData] = useState({
    collegeName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    partnership: "Technical Workshops",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <main className="mou-page">
      {/* Hero */}
      <section className="mou-hero">
        <div className="mou-hero-glow mou-glow-one" />
        <div className="mou-hero-glow mou-glow-two" />

        <div className="mou-hero-content">
          <span className="mou-eyebrow">
            <Handshake size={16} />
            DKODER COLLEGE PARTNERSHIPS
          </span>

          <h1>
            Together, let's build
            <br />
            <span>the future of tech.</span>
          </h1>

          <p>
            Partner with DKoder to create meaningful learning experiences,
            encourage innovation, and help students grow their technical skills.
          </p>

          <a className="mou-primary-button" href="#mou-interest">
            Explore partnership <ArrowRight size={18} />
          </a>

          <div className="mou-hero-highlights">
            <span><CheckCircle2 size={16} /> Student-focused initiatives</span>
            <span><CheckCircle2 size={16} /> Collaborative learning</span>
          </div>
        </div>

        <div className="mou-hero-visual" aria-hidden="true">
          <div className="mou-visual-ring mou-ring-one" />
          <div className="mou-visual-ring mou-ring-two" />

          <div className="mou-handshake-card">
            <div className="mou-handshake-icon">
              <Handshake size={68} strokeWidth={1.5} />
            </div>
            <span>COLLABORATE</span>
            <strong>Learn more. Build more.</strong>
            <div className="mou-visual-tags">
              <span>COLLEGES</span>
              <span>STUDENTS</span>
              <span>TECH</span>
            </div>
          </div>

          <div className="mou-float-icon mou-float-cap">
            <GraduationCap size={27} />
          </div>
          <div className="mou-float-icon mou-float-code">
            <Code2 size={25} />
          </div>
          <div className="mou-float-icon mou-float-users">
            <Users size={24} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mou-section">
        <div className="mou-section-heading">
          <span className="mou-kicker">WHY PARTNER WITH DKODER?</span>
          <h2>
            Turn collaboration into
            <br />
            <span>student opportunities.</span>
          </h2>
          <p>
            Work together on initiatives that connect learning, practical
            experience, and the student technology community.
          </p>
        </div>

        <div className="mou-benefits-grid">
          <article className="mou-benefit-card">
            <span className="mou-benefit-icon purple">
              <GraduationCap size={26} />
            </span>
            <h3>Student Development</h3>
            <p>
              Encourage practical learning, collaboration, and confidence
              through technical activities.
            </p>
          </article>

          <article className="mou-benefit-card">
            <span className="mou-benefit-icon yellow">
              <Code2 size={26} />
            </span>
            <h3>Hands-on Experience</h3>
            <p>
              Plan coding workshops, project-building sessions, and
              technology-focused events.
            </p>
          </article>

          <article className="mou-benefit-card">
            <span className="mou-benefit-icon pink">
              <Users size={26} />
            </span>
            <h3>Community Building</h3>
            <p>
              Create opportunities for students and educators to learn,
              share ideas, and work together.
            </p>
          </article>

          <article className="mou-benefit-card">
            <span className="mou-benefit-icon blue">
              <Sparkles size={26} />
            </span>
            <h3>Innovation & Ideas</h3>
            <p>
              Encourage student-led ideas, creative problem-solving, and
              collaborative projects.
            </p>
          </article>
        </div>
      </section>

      {/* Partnership areas */}
      <section className="mou-areas-section">
        <div className="mou-section-heading">
          <span className="mou-kicker">POSSIBILITIES TO EXPLORE</span>
          <h2>
            One partnership.
            <br />
            <span>Many ways to grow.</span>
          </h2>
        </div>

        <div className="mou-areas-grid">
          {partnershipAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <article className="mou-area-card" key={area.title}>
                <div className="mou-area-number">
                  0{index + 1}
                </div>
                <div className="mou-area-icon">
                  <Icon size={25} />
                </div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      
      <section className="mou-process-section">
        <div className="mou-section-heading">
          <span className="mou-kicker">HOW IT WORKS</span>
          <h2>
            From first conversation
            <br />
            <span>to collaboration.</span>
          </h2>
          <p>A clear process to explore a possible college partnership.</p>
        </div>

        <div className="mou-steps">
          {steps.map((step) => (
            <article className="mou-step" key={step.number}>
              <div className="mou-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      
      <section className="mou-contact-section" id="mou-interest">
        <div className="mou-contact-copy">
          <span className="mou-kicker">LET'S START A CONVERSATION</span>
          <h2>
            Interested in
            <br />
            <span>partnering with us?</span>
          </h2>
          <p>
            Tell us about your institution and the kind of collaboration
            you would like to explore.
          </p>

          <div className="mou-contact-points">
            <div>
              <span><Building2 size={20} /></span>
              <p>
                <strong>For colleges & institutions</strong>
                <small>Share your institution's details.</small>
              </p>
            </div>
            <div>
              <span><Mail size={20} /></span>
              <p>
                <strong>Start with an enquiry</strong>
                <small>Discuss potential partnership activities.</small>
              </p>
            </div>
            <div>
              <span><Handshake size={20} /></span>
              <p>
                <strong>Mutual agreement</strong>
                <small>Formal terms require review by both parties.</small>
              </p>
            </div>
          </div>
        </div>

        <div className="mou-form-card">
          {!submitted ? (
            <>
              <div className="mou-form-heading">
                <span className="mou-form-heading-icon">
                  <Send size={21} />
                </span>
                <div>
                  <h3>Partnership enquiry</h3>
                  <p>Fields marked * are required.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <label>
                  College / Institution name *
                  <span className="mou-input-wrap">
                    <Building2 size={17} />
                    <input
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      placeholder="Enter institution name"
                      required
                    />
                  </span>
                </label>

                <div className="mou-form-row">
                  <label>
                    Contact person *
                    <span className="mou-input-wrap">
                      <UserRound size={17} />
                      <input
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                      />
                    </span>
                  </label>

                  <label>
                    Designation
                    <input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. HOD, Principal"
                    />
                  </label>
                </div>

                <div className="mou-form-row">
                  <label>
                    Official email *
                    <span className="mou-input-wrap">
                      <Mail size={17} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@college.edu"
                        required
                      />
                    </span>
                  </label>

                  <label>
                    Phone number
                    <span className="mou-input-wrap">
                      <Phone size={17} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Contact number"
                      />
                    </span>
                  </label>
                </div>

                <label>
                  Interested partnership area *
                  <select
                    name="partnership"
                    value={formData.partnership}
                    onChange={handleChange}
                    required
                  >
                    <option>Technical Workshops</option>
                    <option>Hackathons & Events</option>
                    <option>Career Opportunities</option>
                    <option>Learning Programs</option>
                    <option>Multiple Areas</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Tell us about your idea
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What kind of collaboration would you like to explore?"
                    rows={4}
                  />
                </label>

                <button type="submit" className="mou-submit-button">
                  Submit enquiry <ArrowRight size={18} />
                </button>

                <p className="mou-form-disclaimer">
                  This demo form does not send or store information yet.
                  Connect a secure backend before using it for real enquiries.
                </p>
              </form>
            </>
          ) : (
            <div className="mou-success-state" role="status">
              <span><CheckCircle2 size={38} /></span>
              <h3>Enquiry form completed!</h3>
              <p>
                Your details are displayed in this demo only. No enquiry has
                been sent yet because the form is not connected to a backend.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Back to form
              </button>
            </div>
          )}
        </div>
      </section>

      <p className="mou-page-note">
        An enquiry does not constitute an MOU or guarantee a partnership.
        Any formal agreement is subject to mutual review and signature.
      </p>
    </main>
  );
}
