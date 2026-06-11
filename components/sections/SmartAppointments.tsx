"use client";

import { useState } from "react";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import PhoneFrame from "@/components/primitives/PhoneFrame";

const SLOTS = ["Thu · 9:00 AM", "Thu · 9:30 AM", "Thu · 10:15 AM"];

export default function SmartAppointments() {
  const [selected, setSelected] = useState(1);

  return (
    <Section id="appointments" surface="dusty">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            kicker="Smart appointments"
            title={
              <>
                Appointments should feel
                <span className="block text-ink/55">like a conversation.</span>
              </>
            }
            intro="No forms. No hunting through a calendar. Say when, pick a slot, done."
          />

          <Reveal y={22} className="mt-8">
            <div className="rounded-[1.6rem] border border-ink/10 bg-paper p-6 shadow-float sm:p-7">
              <div className="rounded-2xl bg-ink px-5 py-4 text-paper">
                <p className="text-[0.7rem] uppercase tracking-wider text-paper/50">
                  The doctor says
                </p>
                <p className="mt-1 text-[0.98rem] leading-snug">
                  “Schedule a review next Thursday morning.”
                </p>
              </div>

              <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wider text-ink-faint">
                Suggested slots
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {SLOTS.map((s, i) => {
                  const active = i === selected;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-pressed={active}
                      className={`tnum rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "border-appt bg-appt text-paper"
                          : "border-hairline bg-paper text-ink hover:border-appt/50"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-done/25 bg-done/10 px-5 py-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-done text-paper">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm font-medium text-ink">
                  Booked · {SLOTS[selected].replace(" · ", " ")} · Review
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The real schedule */}
        <Reveal y={28} className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/50 blur-3xl" />
          <PhoneFrame
            src="/media/app-schedule.png"
            alt="The Odovox schedule: a month calendar with the day's appointments"
            className="relative max-w-[270px]"
          />
        </Reveal>
      </div>
    </Section>
  );
}
