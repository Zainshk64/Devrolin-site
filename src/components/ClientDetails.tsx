"use client";
import React, { useState } from "react";
import Link from "next/link";
import { clientDummyData, type Client } from "@/lib/clientDummyData";

// ─── Helper ───────────────────────────────────────────────────────────────────
const fmt = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

// ─── Invoice Modal ────────────────────────────────────────────────────────────
interface InvoiceModalProps {
  client: Client;
  onClose: () => void;
}

const InvoiceModal = ({ client, onClose }: InvoiceModalProps) => {
  const [form, setForm] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    amount: String(client.totalBudget),
    description: `Final payment for: ${client.projectTitle}`,
    notes: "",
    paymentMethod: "bank_transfer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔌 Future: POST to your backend API here
    console.log("Invoice payload:", form);
    alert(`Invoice ${form.invoiceNumber} created!`);
    onClose();
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="inv-backdrop" onClick={handleBackdrop}>
      <div className="inv-modal">
        {/* Header */}
        <div className="inv-modal__header">
          <div className="inv-modal__header-left">
            <span className="inv-modal__tag">NEW INVOICE</span>
            <h2 className="inv-modal__title">Set Payment</h2>
            <p className="inv-modal__sub">
              {client.name} &mdash; {client.company}
            </p>
          </div>
          <button className="inv-modal__close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form className="inv-form" onSubmit={handleSubmit}>
          {/* Row 1 — Invoice meta */}
          <div className="inv-form__row">
            <div className="inv-form__group">
              <label className="inv-form__label">Invoice Number</label>
              <input
                className="inv-form__input"
                type="text"
                name="invoiceNumber"
                value={form.invoiceNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inv-form__group">
              <label className="inv-form__label">Invoice Date</label>
              <input
                className="inv-form__input"
                type="date"
                name="invoiceDate"
                value={form.invoiceDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inv-form__group">
              <label className="inv-form__label">Due Date</label>
              <input
                className="inv-form__input"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2 — Description + Amount */}
          <div className="inv-form__row">
            <div className="inv-form__group inv-form__group--wide">
              <label className="inv-form__label">Description</label>
              <input
                className="inv-form__input"
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inv-form__group">
              <label className="inv-form__label">Amount ({client.currency})</label>
              <input
                className="inv-form__input inv-form__input--amount"
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          {/* Row 3 — Payment method */}
          <div className="inv-form__row">
            <div className="inv-form__group inv-form__group--wide">
              <label className="inv-form__label">Payment Method</label>
              <select
                className="inv-form__select"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="wise">Wise</option>
                <option value="crypto">Crypto</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="inv-form__group">
            <label className="inv-form__label">Notes (optional)</label>
            <textarea
              className="inv-form__textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional terms or notes for the client..."
            />
          </div>

          {/* Summary strip */}
          <div className="inv-summary">
            <div className="inv-summary__item">
              <span>Project</span>
              <strong>{client.projectTitle}</strong>
            </div>
            <div className="inv-summary__item">
              <span>Total Budget</span>
              <strong>{fmt(client.totalBudget, client.currency)}</strong>
            </div>
            <div className="inv-summary__item">
              <span>Already Paid</span>
              <strong>{fmt(client.amountPaid, client.currency)}</strong>
            </div>
            <div className="inv-summary__item inv-summary__item--highlight">
              <span>Invoice Amount</span>
              <strong>{fmt(Number(form.amount) || 0, client.currency)}</strong>
            </div>
          </div>

          {/* Actions */}
          <div className="inv-form__actions">
            <button type="button" className="inv-btn inv-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="inv-btn inv-btn--primary">
              <span>Generate Invoice</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── ProgressBlock (now receives onInvoice) ───────────────────────────────────
const ProgressBlock = ({
  client,
  onInvoice,
}: {
  client: Client;
  onInvoice: () => void;
}) => (
  <div className="cd-progress">
    <div className="cd-progress__header">
      <span className="cd-progress__label">{client.progressLabel}</span>
      <span className="cd-progress__percent">{client.progressPercent}%</span>
    </div>
    <div className="cd-progress__track">
      <div
        className={`cd-progress__fill${
          client.progressPercent === 100 ? " cd-progress__fill--complete" : ""
        }`}
        style={{ width: `${client.progressPercent}%` }}
      />
    </div>
    <div className="cd-progress__dates">
      <span>Start: {client.startDate}</span>
      <span>End: {client.endDate}</span>
    </div>

    {/* ✅ Only shown when progress = 100% */}
    {client.progressPercent === 100 && (
      <button className="cd-invoice-trigger" onClick={onInvoice}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
        Add Invoice
      </button>
    )}
  </div>
);

// ─── Other sub-components (unchanged) ────────────────────────────────────────

const MilestoneSection = ({ client }: { client: Client }) => {
  if (!client.milestones) return null;
  return (
    <div className="cd-card">
      <p className="cd-card__label">Milestone Breakdown</p>
      <div className="cd-milestones">
        {client.milestones.map((m, i) => (
          <div className="cd-milestone" key={i}>
            <div className={`cd-milestone__dot cd-milestone__dot--${m.status}`}>
              <div className="cd-milestone__line" />
            </div>
            <div className="cd-milestone__info">
              <div className="cd-milestone__title">{m.title}</div>
              <div className="cd-milestone__date">Due: {m.dueDate}</div>
            </div>
            <div className="cd-milestone__right">
              <div className="cd-milestone__amount">{fmt(m.amount, client.currency)}</div>
              <div className={`cd-milestone__badge cd-milestone__badge--${m.status}`}>
                {m.status.replace("-", " ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HourlySection = ({ client }: { client: Client }) => {
  if (!client.hourlyLogs) return null;
  const maxHours = Math.max(...client.hourlyLogs.map((l) => l.hours));
  return (
    <div className="cd-card cd-hourly">
      <p className="cd-card__label">Hourly Logs</p>
      <div className="cd-hourly__rate-banner">
        <span>Hourly Rate</span>
        <strong>{fmt(client.hourlyRate || 0, client.currency)}/hr</strong>
        <em>Total logged: {client.totalHoursLogged} hrs</em>
      </div>
      <table className="cd-hourly__table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Hours</th>
            <th className="cd-hourly__bar-cell">Effort</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {client.hourlyLogs.map((log, i) => (
            <tr key={i}>
              <td>{log.week}</td>
              <td>{log.hours} hrs</td>
              <td className="cd-hourly__bar-cell">
                <div className="cd-hourly__bar">
                  <div style={{ width: `${(log.hours / maxHours) * 100}%` }} />
                </div>
              </td>
              <td>{fmt(log.hours * log.rate, client.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DocEmbed = ({ url }: { url: string }) => (
  <div className="cd-card cd-doc">
    <p className="cd-card__label">Project Document</p>
    <div className="cd-doc__frame-wrapper">
      <iframe src={url} title="Project Document" allow="autoplay" loading="lazy" />
      <div className="cd-doc__overlay-bar">
        <span>Google Docs — read only preview</span>
        <a href={url.replace("/preview", "/edit")} target="_blank" rel="noreferrer">
          Open in Docs ↗
        </a>
      </div>
    </div>
  </div>
);

const StatGrid = ({ client }: { client: Client }) => {
  const remaining = client.totalBudget - client.amountPaid;
  return (
    <div className="cd-stat-grid">
      <div className="cd-stat cd-stat--accent">
        <div className="cd-stat__label">Total Budget</div>
        <div className="cd-stat__value">{fmt(client.totalBudget, client.currency)}</div>
        <div className="cd-stat__sub">{client.currency}</div>
      </div>
      <div className="cd-stat cd-stat--green">
        <div className="cd-stat__label">Paid</div>
        <div className="cd-stat__value">{fmt(client.amountPaid, client.currency)}</div>
        <div className="cd-stat__sub">{client.progressPercent}% of total</div>
      </div>
      <div className="cd-stat">
        <div className="cd-stat__label">Remaining</div>
        <div className="cd-stat__value">{fmt(remaining < 0 ? 0 : remaining, client.currency)}</div>
        <div className="cd-stat__sub">outstanding</div>
      </div>
      <div className="cd-stat">
        <div className="cd-stat__label">Pay Model</div>
        <div className="cd-stat__value" style={{ fontSize: "1rem", textTransform: "capitalize" }}>
          {client.paymentType}
        </div>
        <div className="cd-stat__sub">
          {client.paymentType === "hourly"
            ? `${fmt(client.hourlyRate || 0, client.currency)}/hr`
            : `${client.milestones?.length} milestones`}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface ClientDetailsProps {
  id: string;
}

const ClientDetails = ({ id }: ClientDetailsProps) => {
  const [showInvoice, setShowInvoice] = useState(false);
  const client = clientDummyData.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div className="client-not-found">
        <h2>Client Not Found</h2>
        <p>No client exists with ID #{id}</p>
        <Link href="/" style={{ color: "#e87b2b", marginTop: "16px", display: "inline-block" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const statusClass = `client-hero__status-badge client-hero__status-badge--${client.status}`;

  return (
    <div className="client-page">
      {/* Invoice modal — rendered at top level so it overlays everything */}
      {showInvoice && (
        <InvoiceModal client={client} onClose={() => setShowInvoice(false)} />
      )}

      {/* Hero */}
      <div className="client-hero">
        <div className="client-hero__inner">
          <div className="client-hero__avatar" style={{ background: client.avatarColor }}>
            {client.avatar}
          </div>
          <div className="client-hero__meta">
            <p className="client-hero__company">{client.company}</p>
            <h1 className="client-hero__name">{client.name}</h1>
            <p className="client-hero__project">{client.projectTitle}</p>
          </div>
          <span className={statusClass}>
            {client.status === "active"
              ? "● Active"
              : client.status === "completed"
              ? "✓ Completed"
              : "⏸ On Hold"}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="client-layout">
        <div className="client-main">
          <div className="cd-card">
            <p className="cd-card__label">Project Overview</p>
            <h2 className="cd-card__title">{client.projectTitle}</h2>
            <p className="cd-card__body">{client.projectDetails}</p>
            <ProgressBlock client={client} onInvoice={() => setShowInvoice(true)} />
          </div>

          <DocEmbed url={client.googleDocUrl} />

          {client.paymentType === "milestone" && <MilestoneSection client={client} />}
          {client.paymentType === "hourly" && <HourlySection client={client} />}
        </div>

        <div className="client-sidebar">
          <StatGrid client={client} />
          <div className="cd-card">
            <p className="cd-card__label">Project Timeline</p>
            <div className="cd-timeline">
              {[
                { key: "Client ID", val: `#${String(client.id).padStart(4, "0")}` },
                { key: "Start Date", val: client.startDate },
                { key: "End Date", val: client.endDate },
                {
                  key: "Status",
                  val: client.status,
                  color:
                    client.status === "active"
                      ? "#2be87b"
                      : client.status === "completed"
                      ? "#e87b2b"
                      : "#e84b4b",
                },
                { key: "Progress", val: `${client.progressPercent}%` },
              ].map(({ key, val, color }) => (
                <div className="cd-timeline__row" key={key}>
                  <span className="cd-timeline__key">{key}</span>
                  <span
                    className="cd-timeline__val"
                    style={color ? { color, textTransform: "capitalize" } : undefined}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;