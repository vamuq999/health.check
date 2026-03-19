"use client";

import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

type Step = "landing" | "assessment" | "lead" | "results";

const sections = [
  {
    title: "Board structure",
    questions: [
      "Clear board and management roles",
      "Skills matrix reviewed annually",
      "Board succession planning in place",
      "Board charter or governance framework is current",
      "Role descriptions exist for Chair and Directors",
    ],
  },
  {
    title: "Risk and compliance",
    questions: [
      "Risk register reviewed regularly",
      "Key legal and regulatory obligations are documented",
      "Delegations or authorities are current",
      "Policies are reviewed on a set cycle",
      "Compliance reporting is provided to the board",
    ],
  },
  {
    title: "Finance and oversight",
    questions: [
      "Board receives meaningful financial reports",
      "Budget monitoring is consistent",
      "Reserves or cash policy is documented",
      "Audit or independent review is conducted",
      "Financial risks are clearly understood",
    ],
  },
  {
    title: "Culture and effectiveness",
    questions: [
      "Conflicts of interest are managed well",
      "Board performance is reviewed annually",
      "Meetings focus on strategy, not only operations",
      "Directors feel safe to challenge",
      "CEO or Executive performance is reviewed annually",
    ],
  },
] as const;

type Answers = Record<string, number>;

type Lead = {
  name: string;
  organisation: string;
  email: string;
};

function getScoreBand(score: number) {
  if (score >= 85) return "High Governance Maturity";
  if (score >= 65) return "Established Governance";
  if (score >= 45) return "Developing Governance";
  return "Foundational Governance";
}

function getPriorityActions(score: number) {
  if (score >= 85) {
    return [
      "Maintain strong governance disciplines and review them annually",
      "Continue board development and capability uplift",
      "Use the assessment as a benchmarking tool over time",
    ];
  }

  if (score >= 65) {
    return [
      "Clarify key governance roles and accountability",
      "Strengthen board reporting and oversight cadence",
      "Address lower-scoring governance areas in the next 12 months",
    ];
  }

  if (score >= 45) {
    return [
      "Formalise governance structures and review cycles",
      "Improve risk oversight and compliance visibility",
      "Introduce a board improvement plan with clear ownership",
    ];
  }

  return [
    "Clarify governance roles and responsibilities",
    "Strengthen risk oversight processes",
    "Improve board reporting quality",
  ];
}

function getRoadmap() {
  return [
    "Q1: Address key risks",
    "Q2: Strengthen systems",
    "Q3: Embed practices",
    "Q4: Review progress",
  ];
}

export default function HomePage() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<Lead>({
    name: "",
    organisation: "",
    email: "",
  });
  const [savingLead, setSavingLead] = useState(false);
  const [startingCheckout, setStartingCheckout] = useState(false);

  const totalQuestions = useMemo(
    () => sections.reduce((sum, section) => sum + section.questions.length, 0),
    []
  );

  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => Number(value) > 0).length,
    [answers]
  );

  const score = useMemo(() => {
    const values = Object.values(answers);
    if (!values.length) return 0;
    const total = values.reduce((sum, value) => sum + Number(value), 0);
    return Math.round((total / (values.length * 4)) * 100);
  }, [answers]);

  const categoryScores = useMemo(() => {
    return sections.map((section) => {
      const values = section.questions.map((question) => answers[question] || 0);
      const total = values.reduce((sum, value) => sum + Number(value), 0);
      const categoryScore = values.length
        ? Math.round((total / (values.length * 4)) * 100)
        : 0;

      return {
        title: section.title,
        score: categoryScore,
      };
    });
  }, [answers]);

  const topRisks = useMemo(() => {
    return Object.entries(answers)
      .filter(([, value]) => Number(value) <= 2)
      .map(([question]) => question)
      .slice(0, 3);
  }, [answers]);

  const priorityActions = useMemo(() => getPriorityActions(score), [score]);
  const roadmap = useMemo(() => getRoadmap(), []);

  function handleAnswer(question: string, value: number) {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  }

  function handleContinueToLead() {
    if (answeredCount < totalQuestions) {
      alert("Please answer all questions before continuing.");
      return;
    }

    setStep("lead");
  }

  async function handleLeadSubmit() {
    if (!lead.name || !lead.organisation || !lead.email) {
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
          ...lead,
          score,
          categoryScores,
          topRisks,
          answers,
          submittedAt: new Date().toISOString(),
        }),
      });

      setStep("results");
    } catch (error) {
      console.error(error);
      alert("There was a problem saving the lead.");
    } finally {
      setSavingLead(false);
    }
  }

  async function handlePayment() {
    try {
      setStartingCheckout(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lead,
          score,
        }),
      });

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      alert("Unable to start checkout.");
    } catch (error) {
      console.error(error);
      alert("There was a problem starting payment.");
    } finally {
      setStartingCheckout(false);
    }
  }

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
                  A practical governance health check for not-for-profit boards,
                  designed to identify strengths, expose risks, and support clearer
                  next-step action.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-btn"
                    onClick={() => setStep("assessment")}
                  >
                    Start Assessment
                  </button>

                  <a className="secondary-btn" href="#overview">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="hero-card">
                <div className="logo-mark">b</div>
                <h3>Board-ready diagnostic</h3>
                <p>
                  Complete the assessment, review your governance maturity score,
                  and unlock a professional report tailored to your organisation.
                </p>
              </div>
            </div>
          </section>

          <section id="overview" className="overview-section">
            <div className="container">
              <div className="section-heading">
                <span>BOARDIUM SERVICES</span>
                <h2>Quick insight across the areas that matter most</h2>
                <p>
                  This tool provides a rapid governance diagnostic across board
                  structure, risk and compliance, finance and oversight, and culture
                  and effectiveness.
                </p>
              </div>

              <div className="feature-grid">
                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Rapid assessment</h3>
                  <p>
                    A simple structured review designed for not-for-profits and
                    board-led organisations.
                  </p>
                </article>

                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Clear scoring</h3>
                  <p>
                    Instantly view overall governance maturity, category breakdowns,
                    and key risk areas.
                  </p>
                </article>

                <article className="feature-card">
                  <div className="feature-top" />
                  <h3>Professional output</h3>
                  <p>
                    Unlock a branded board-ready report with priorities, actions,
                    and a practical roadmap.
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
                  <p>
                    Rate each statement from 1 to 4 based on your current governance
                    maturity.
                  </p>
                </div>

                <button className="text-btn" onClick={() => setStep("landing")}>
                  Back
                </button>
              </div>

              <div className="question-list">
                {sections.map((section) => (
                  <div key={section.title} className="question-section-card">
                    <div className="question-section-heading">
                      <h3>{section.title}</h3>
                      <p>
                        Rate each statement from 1 to 4, where 1 is low maturity and
                        4 is strong practice.
                      </p>
                    </div>

                    <div className="question-section-items">
                      {section.questions.map((question) => (
                        <QuestionRow
                          key={question}
                          title={question}
                          value={answers[question] || 0}
                          onChange={(value) => handleAnswer(question, value)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="assessment-footer">
                <div className="score-preview">
                  <span>
                    Answered {answeredCount} of {totalQuestions}
                  </span>
                  <strong>{score}%</strong>
                </div>

                <button className="primary-btn" onClick={handleContinueToLead}>
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
                  <p>
                    Please provide your details so we can personalise the report
                    and capture your assessment.
                  </p>
                </div>

                <button className="text-btn" onClick={() => setStep("assessment")}>
                  Back
                </button>
              </div>

              <div className="lead-grid">
                <label>
                  Full Name
                  <input
                    value={lead.name}
                    onChange={(e) =>
                      setLead((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your full name"
                  />
                </label>

                <label>
                  Organisation
                  <input
                    value={lead.organisation}
                    onChange={(e) =>
                      setLead((prev) => ({
                        ...prev,
                        organisation: e.target.value,
                      }))
                    }
                    placeholder="Enter organisation name"
                  />
                </label>

                <label className="full-width">
                  Email Address
                  <input
                    type="email"
                    value={lead.email}
                    onChange={(e) =>
                      setLead((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Enter email address"
                  />
                </label>
              </div>

              <div className="assessment-footer">
                <div className="score-preview">
                  <span>Your score preview</span>
                  <strong>{score}%</strong>
                </div>

                <button
                  className="primary-btn"
                  onClick={handleLeadSubmit}
                  disabled={savingLead}
                >
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
                <h2>{getScoreBand(score)}</h2>
                <p>
                  This governance snapshot highlights your organisation’s current
                  maturity across key board and oversight areas.
                </p>
              </div>

              <div className="score-badge">
                <span>Total Score</span>
                <strong>{score}%</strong>
              </div>
            </div>

            <div className="result-grid">
              {categoryScores.map((category) => (
                <div key={category.title} className="result-card">
                  <div className="result-card-top">
                    <h3>{category.title}</h3>
                    <span>{category.score}%</span>
                  </div>
                  <p>
                    Category-level result based on your responses in this governance
                    area.
                  </p>
                </div>
              ))}
            </div>

            <div className="results-detail-grid">
              <div className="detail-panel">
                <h3>Top Risks</h3>
                {topRisks.length ? (
                  <ul>
                    {topRisks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No major low-scoring risks identified.</p>
                )}
              </div>

              <div className="detail-panel">
                <h3>Priority Actions</h3>
                <ul>
                  {priorityActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-panel">
                <h3>12 Month Roadmap</h3>
                <ul>
                  {roadmap.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="report-cta">
              <div>
                <h3>Unlock your full Boardium report</h3>
                <p>
                  Includes organisation details, assessment date, score summary,
                  category breakdowns, risks, and practical next-step actions.
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={handlePayment}
                disabled={startingCheckout}
              >
                {startingCheckout
                  ? "Redirecting..."
                  : "Unlock Full Report — AUD $149"}
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
  value,
  onChange,
}: {
  title: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="question-row">
      <div className="question-copy">
        <h3>{title}</h3>
      </div>

      <div className="rating-group">
        {[1, 2, 3, 4].map((num) => (
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