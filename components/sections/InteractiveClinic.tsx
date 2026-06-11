"use client";

import { useState } from "react";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";

type Room = {
  id: string;
  name: string;
  note: string;
  hover: string;
};

const ROOMS: Room[] = [
  { id: "reception", name: "Reception", note: "The queue updates itself. The front desk always knows who is next and who owes what.", hover: "hover:bg-peach" },
  { id: "consult", name: "Consult room", note: "The dentist speaks the diagnosis, prescription and plan. Records write themselves before the patient stands up.", hover: "hover:bg-sage" },
  { id: "xray", name: "X-ray", note: "Images attach to the right tooth on the right visit, with no manual filing.", hover: "hover:bg-dusty" },
  { id: "treatment", name: "Treatment", note: "Procedures are logged by voice mid-treatment. Gloves stay on, hands stay free.", hover: "hover:bg-sage" },
  { id: "billing", name: "Billing", note: "Treatment flows to invoice to payment, reconciled the moment work is done.", hover: "hover:bg-mustard" },
  { id: "lab", name: "Lab", note: "Crowns, aligners and dentures are tracked from impression to fit.", hover: "hover:bg-warmgrey" },
];

export default function InteractiveClinic() {
  const [active, setActive] = useState("consult");
  const room = ROOMS.find((r) => r.id === active)!;

  return (
    <Section id="clinic" surface="paper">
      <SectionHeading
        kicker="The clinic, end to end"
        title="One clinic. One continuous workflow."
        intro="Hover a room to see what changes when the clinic runs on speech."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
        {/* Floor plan */}
        <div className="grid grid-cols-2 gap-2.5 rounded-[1.5rem] border border-ink/15 bg-paper-alt p-2.5 sm:grid-cols-3">
          {ROOMS.map((r) => {
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                type="button"
                onMouseEnter={() => setActive(r.id)}
                onFocus={() => setActive(r.id)}
                onClick={() => setActive(r.id)}
                aria-pressed={isActive}
                className={`group relative flex min-h-[120px] flex-col justify-between rounded-2xl border p-4 text-left transition-colors duration-300 sm:min-h-[150px] ${r.hover} ${
                  isActive
                    ? "border-ink/30 bg-card"
                    : "border-hairline bg-paper"
                }`}
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-faint">
                  {String(ROOMS.indexOf(r) + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-ink">
                  {r.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active room detail */}
        <div className="flex flex-col justify-center rounded-[1.5rem] border border-hairline bg-card p-7">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
            {room.name}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-ink">{room.note}</p>
        </div>
      </div>
    </Section>
  );
}
