"use client";

import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

type Step = "landing" | "assessment" | "lead" | "results";

type Answers = {
  governanceFramework: number;
  boardRoles: number;
  riskOversight: number;
  complianceReview: number;
  strategicAlignment: number;
  boardEvaluation: number;
};

const initialAnswers: Answers = {
  governanceFramework: 3,
  boardRoles: 3,
  riskOversight: 3,
  complianceReview: 3,
  strategicAlignment: 3,
  boardEvaluation: 3,
};

const scoreLabel = (score: number) => {
  if (score >= 85) return "High Governance Maturity";
  if (score >= 65) return "Established Governance";
  if (score >= 45) return "Developing Governance";
  return "Foundational Governance";
};

export default function HomePage() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [user, setUser] = useState({
    name: "",
    organisation: "",
    email: "",
  });
  const [savingLead, setSavingLead] = useState(false);
  const [startingCheckout, setStartingCheckout] = useState(false);

  const categories = useMemo(() => {
    return [
      {
        title: "Governance Framework",
        value: answers.governanceFramework,
        description: "Policies, structure, and governance foundations are in place.",
      },
      {
        title: "Board Roles & Accountability",
        value: answers.boardRoles,
        description: "Directors, executives, and committees understand responsibilities.",
      },
      {
        title: "Risk & Oversight",
        value: answers.riskOversight,
        description: "Risk monitoring and oversight practices support decision-making.",
      },
      {
        title: "Compliance Review",
        value: answers.complianceReview,
        description: "Compliance obligations are reviewed, documented, and monitored.",
      },
      {
        title: "Strategic Alignment",
        value: answers.strategicAlignment,
        description: "Board activities are aligned to mission, strategy, and performance.",
      },
      {
        title: "Board Evaluation",
        value: answers.boardEvaluation,
        description: "Board effectiveness is reviewed and improved over time.",
      },
    ];
  }, [answers]);

  const totalScore = useMemo(() => {
    const values = Object.values(answers);
    const max = values.length * 5;
    const sum = values.reduce((acc, current) => acc + current, 0);
    return Math.round((sum / max) * 100);
  }, [answers]);

  const handleAnswerChange = (key: keyof Answers, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLeadSubmit = async () => {
    if (!user.name || !user.organisation || !user.email) {
      alert("Please complete your name, organisation, and email.");
      return;
    }

    try {
      setSavingLead(true);

      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          answers,
          totalScore,
          submittedAt: new Date().toISOString(),
        }),
      });

      setStep("results");
    } catch (error) {
      console.error(error);
      alert("There was a problem saving the details.");
    } finally {
      setSavingLead(false);
    }
  };

  const handlePayment = async () => {
    try {
      setStartingCheckout(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          totalScore,
        }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      alert("Unable to start payment.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong starting checkout.");
    } finally {
      setStartingCheckout(false);
    }
  };

  return (
    <main className="boardium-page">
     <Header onStart={() => setStep("assessment")} />

      {step === "landing" && (
        <>
          <section className="hero-section">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="mini-kicker">BOARDIUM GOVERNANCE HEALTH CHECK</div>
                <h1>Streamlining Governance, Empowering Strategy.</h1>
                <p>
                  A simple governance assessment tool designed to help boards,
                  executives, and organisations identify strengths, gaps, and next-step priorities.
                </p>

                <div className="hero-actions">
                  <button className="primary-btn" onClick={() => setStep("assessment")}>
                    Start Assessment
                  </button>
                  <a className="secondary-btn" href="#overview">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="hero-card">
                <div className="logo-mark">b</div>
                <h3>Board-ready in minutes</h3>
                <p>
                  Capture governance insights, generate a professional summary,
                  and unlock a downloadable PDF report after payment.
                </p>
              </div>
            </div>
          </section>

          <section id="overview" className="overview-section">
            <div className="container">
              <div className="section-heading">
                <span>BOARDIUM SERVICES</span>
                <h2>Let&apos;s take your governance review to the next level</h2>
                <p>
                  This practical health check provides a quick snapshot of governance maturity
                  across structure, accountability, risk, compliance, and board effectiveness.
                </p>
              </div>

              <div className="feature-grid">
                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Practical assessment</h3>
                  <p>
                    A clear, easy-to-complete multi-section review suitable for boards,
                    not-for-profits, and SME organisations.
                  </p>
                </article>

                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Instant scoring</h3>
                  <p>
                    View your governance maturity score immediately with category-level breakdowns
                    to support discussion and planning.
                  </p>
                </article>

                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Professional PDF report</h3>
                  <p>
                    Download a branded board-ready report with your organisation name,
                    date, results summary, and recommendations.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </>
      )}

      {step === "assessment" && (
        <section id="assessment" className="tool-section">
          <div className="container">
            <div className="tool-shell">
              <div className="tool-header">
                <div>
                  <span className="eyebrow">ASSESSMENT</span>
                  <h2>Governance Health Check</h2>
                  <p>Rate each area from 1 to 5 based on your current governance maturity.</p>
                </div>

                <button className="text-btn" onClick={() => setStep("landing")}>
                  Back
                </button>
              </div>

              <div className="question-list">
                <QuestionRow
                  title="Governance Framework"
                  description="Do you have clear governance structures, policies, and decision-making processes in place?"
                  value={answers.governanceFramework}
                  onChange={(value) => handleAnswerChange("governanceFramework", value)}
                />

                <QuestionRow
                  title="Board Roles & Accountability"
                  description="Are board, executive, and committee roles clearly defined and understood?"
                  value={answers.boardRoles}
                  onChange={(value) => handleAnswerChange("boardRoles", value)}
                />

                <QuestionRow
                  title="Risk & Oversight"
                  description="Does your board actively oversee risk, controls, and organisational performance?"
                  value={answers.riskOversight}
                  onChange={(value) => handleAnswerChange("riskOversight", value)}
                />

                <QuestionRow
                  title="Compliance Review"
                  description="Are legal, regulatory, and policy compliance obligations regularly reviewed?"
                  value={answers.complianceReview}
                  onChange={(value) => handleAnswerChange("complianceReview", value)}
                />

                <QuestionRow
                  title="Strategic Alignment"
                  description="Is the board aligned to strategic priorities, mission, and organisational outcomes?"
                  value={answers.strategicAlignment}
                  onChange={(value) => handleAnswerChange("strategicAlignment", value)}
                />

                <QuestionRow
                  title="Board Evaluation"
                  description="Do you review board effectiveness and identify opportunities for improvement?"
                  value={answers.boardEvaluation}
                  onChange={(value) => handleAnswerChange("boardEvaluation", value)}
                />
              </div>

              <div className="assessment-footer">
                <div className="score-preview">
                  <span>Current score</span>
                  <strong>{totalScore}%</strong>
                </div>

                <button className="primary-btn" onClick={() => setStep("lead")}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {step === "lead" && (
        <section className="tool-section">
          <div className="container">
            <div className="tool-shell lead-shell">
              <div className="tool-header">
                <div>
                  <span className="eyebrow">YOUR DETAILS</span>
                  <h2>Before viewing your results</h2>
                  <p>Please provide your details so we can personalise the report.</p>
                </div>

                <button className="text-btn" onClick={() => setStep("assessment")}>
                  Back
                </button>
              </div>

              <div className="lead-grid">
                <label>
                  Full Name
                  <input
                    value={user.name}
                    onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </label>

                <label>
                  Organisation
                  <input
                    value={user.organisation}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, organisation: e.target.value }))
                    }
                    placeholder="Enter organisation name"
                  />
                </label>

                <label className="full-width">
                  Email Address
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </label>
              </div>

              <div className="assessment-footer">
                <div className="score-preview">
                  <span>Your score</span>
                  <strong>{totalScore}%</strong>
                </div>

                <button className="primary-btn" onClick={handleLeadSubmit} disabled={savingLead}>
                  {savingLead ? "Saving..." : "View Results"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {step === "results" && (
        <section id="results" className="results-section">
          <div className="container">
            <div className="results-hero">
              <div>
                <span className="eyebrow">RESULTS SUMMARY</span>
                <h2>{scoreLabel(totalScore)}</h2>
                <p>
                  This snapshot highlights your current governance maturity across key board and oversight areas.
                </p>
              </div>

              <div className="score-badge">
                <span>Total Score</span>
                <strong>{totalScore}%</strong>
              </div>
            </div>

            <div className="result-grid">
              {categories.map((item) => (
                <div key={item.title} className="result-card">
                  <div className="result-card-top">
                    <h3>{item.title}</h3>
                    <span>{item.value}/5</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className="report-cta">
              <div>
                <h3>Unlock your full board-ready PDF report</h3>
                <p>
                  Includes your organisation name, date, summary score, category results,
                  and a professionally formatted document for download.
                </p>
              </div>

              <button className="primary-btn" onClick={handlePayment} disabled={startingCheckout}>
                {startingCheckout ? "Redirecting..." : "Download Full Report — $149"}
              </button>
            </div>
          </div>
        </section>
      )}

     <Footer />
    </main>
  );
}

function QuestionRow({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="question-row">
      <div className="question-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="rating-group">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={value === num ? "rating-pill active" : "rating-pill"}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}