"use client";

import { useState, type FormEvent } from "react";
import { useDict } from "@/lib/language/LanguageProvider";

const FIELD =
  "w-full rounded-xl border border-petrole/15 bg-white px-4 py-3 font-sans text-sm text-petrole placeholder:text-petrole/40 transition-colors focus:border-corail focus:outline-none";
const LABEL = "mb-2 block text-xs font-semibold uppercase tracking-wide text-petrole/60";

export default function ContactForm() {
  const { contactPage, services } = useDict();
  const { form } = contactPage;
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    services.trade.title,
    services.operationnel.title,
    services.consumer.title,
    services.rp.title,
    services.distribution.title,
    services.social.title,
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {form.overline}
        </p>
        <h2 className="font-display text-3xl font-semibold text-petrole md:text-5xl">
          {form.headline}
        </h2>
      </div>

      <div className="mt-12">
        {submitted ? (
          <div className="mx-auto max-w-lg rounded-[28px] bg-petrole p-10 text-center">
            <p className="font-display text-2xl font-semibold text-white">
              {form.thanksTitle}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/70">
              {form.thanksBody}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor="name">
                  {form.labels.name} *
                </label>
                <input id="name" name="name" required className={FIELD} placeholder={form.placeholders.name} />
              </div>
              <div>
                <label className={LABEL} htmlFor="company">
                  {form.labels.company}
                </label>
                <input id="company" name="company" className={FIELD} placeholder={form.placeholders.company} />
              </div>
              <div>
                <label className={LABEL} htmlFor="email">
                  {form.labels.email} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={FIELD}
                  placeholder={form.placeholders.email}
                />
              </div>
              <div>
                <label className={LABEL} htmlFor="phone">
                  {form.labels.phone}
                </label>
                <input id="phone" name="phone" className={FIELD} placeholder={form.placeholders.phone} />
              </div>
              <div>
                <label className={LABEL} htmlFor="service">
                  {form.labels.service}
                </label>
                <select id="service" name="service" defaultValue="" className={FIELD}>
                  <option value="" disabled>
                    {form.serviceOptionsPlaceholder}
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                  <option>{form.otherOption}</option>
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="budget">
                  {form.labels.budget}
                </label>
                <select id="budget" name="budget" defaultValue="" className={FIELD}>
                  <option value="" disabled>
                    {form.budgetOptionsPlaceholder}
                  </option>
                  {form.budgetOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className={LABEL} htmlFor="message">
                {form.labels.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={FIELD}
                placeholder={form.placeholders.message}
              />
            </div>

            <label className="mt-6 flex items-start gap-3 font-sans text-xs text-petrole/60">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-corail" />
              {form.consent}
            </label>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-petrole px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail sm:w-auto"
            >
              {form.submit}
            </button>

            <p className="mt-4 font-sans text-xs text-petrole/50">{form.note}</p>
          </form>
        )}
      </div>
    </div>
  );
}
