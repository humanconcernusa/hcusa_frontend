"use client";

import { addOnAmount, type DonateAddOn, type DonatePurpose } from "@/content/donate";
import { CardIcon, detailsField, money } from "./hero-parts";

/*
  The details half of the hero popup: the purpose pills, the reader's name and email, the
  optional organization, and the button that opens the card step. All the state lives in the form.

  The billing address is not here: it sits on the card step, where it has always been. The card
  step asks for it first and starts the payment from there, so the card fields can be drawn with
  the key that comes back with the payment.
*/

export function DetailsStep({
  addOns,
  chosenAddOns,
  addOnValues,
  onToggleAddOn,
  onAddOnValue,
  purposes,
  chosen,
  purposeError,
  onTogglePurpose,
  firstName,
  lastName,
  email,
  organization,
  isOrganization,
  onFirstName,
  onLastName,
  onEmail,
  onOrganization,
  onToggleOrganization,
  nameError,
  emailError,
  totalLabel,
  showTotal,
  cardError,
  onOpenCard,
}: {
  /* The extras this form offers. Empty means the section is not drawn at all. */
  addOns: DonateAddOn[];
  chosenAddOns: string[];
  addOnValues: Record<string, Record<string, string>>;
  onToggleAddOn: (id: string) => void;
  onAddOnValue: (addOnId: string, key: string, value: string) => void;
  /* The purposes the admin gave this popup. Empty means the section is not drawn at all. */
  purposes: DonatePurpose[];
  /* The ids of the ones the donor picked. */
  chosen: string[];
  purposeError: string;
  onTogglePurpose: (id: string) => void;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  isOrganization: boolean;
  onFirstName: (value: string) => void;
  onLastName: (value: string) => void;
  onEmail: (value: string) => void;
  onOrganization: (value: string) => void;
  onToggleOrganization: (on: boolean) => void;
  nameError: string;
  emailError: string;
  totalLabel: string;
  showTotal: boolean;
  cardError: string;
  onOpenCard: () => void;
}) {
  return (
    <>
      <div className="mt-5 border-t border-divider" />

      {/* The extras sit above the purposes, so the donor picks them before the cause. */}
      {addOns.length > 0 ? (
        <>
          <p className="mt-5 text-[0.8125rem] font-normal text-ink">Add-ons</p>
          <div className="mt-2.5 flex flex-col gap-2">
            {addOns.map((addOn) => {
              const selected = chosenAddOns.includes(addOn.id);
              const values = addOnValues[addOn.id] ?? {};
              const inputs = addOn.pricing.inputs;

              return (
                <div
                  key={addOn.id}
                  className={`rounded-lg border px-3 py-3 transition-colors ${
                    selected ? "border-action" : "border-line"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggleAddOn(addOn.id)}
                      className="mt-1 size-4 shrink-0 accent-action"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[0.875rem] font-medium text-ink">
                          {addOn.iconEmoji.length > 0 ? `${addOn.iconEmoji} ` : ""}
                          {addOn.name}
                        </span>
                        <span className="shrink-0 text-[0.8125rem] font-semibold text-action">
                          {money(addOnAmount(addOn, values))}
                        </span>
                      </span>

                      {addOn.shortDescription.length > 0 ? (
                        <span className="mt-0.5 block text-[0.75rem] text-body">
                          {addOn.shortDescription}
                        </span>
                      ) : null}
                    </span>
                  </label>

                  {selected && inputs.length > 0 ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {inputs.map((input) => {
                        const current = values[input.key] ?? String(input.defaultValue ?? "");

                        return (
                          <label key={input.key} className="text-[0.75rem] text-body">
                            {input.label}
                            {input.type === "select" ? (
                              <select
                                value={current}
                                onChange={(event) =>
                                  onAddOnValue(addOn.id, input.key, event.target.value)
                                }
                                className="mt-1 min-h-9 w-full rounded-md border border-line bg-surface px-2 text-[0.8125rem] text-ink outline-none focus:border-action"
                              >
                                {input.options.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                inputMode="numeric"
                                value={current}
                                onChange={(event) =>
                                  onAddOnValue(addOn.id, input.key, event.target.value)
                                }
                                className="mt-1 min-h-9 w-full rounded-md border border-line bg-surface px-2 text-[0.8125rem] text-ink outline-none focus:border-action"
                              />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-5 border-t border-divider" />
        </>
      ) : null}

      {/* Only a form the admin has given purposes to shows this section. */}
      {purposes.length > 0 ? (
        <>
          <p className="mt-5 text-[0.8125rem] font-normal text-ink">Choose Donation Purpose</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {purposes.map((purpose) => {
              const selected = chosen.includes(purpose.id);

              return (
                <button
                  key={purpose.id}
                  type="button"
                  onClick={() => onTogglePurpose(purpose.id)}
                  aria-pressed={selected}
                  className={`min-h-9 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors ${
                    selected
                      ? "border-action text-action"
                      : "border-line text-body hover:border-action/40 hover:text-action"
                  }`}
                >
                  {purpose.name}
                </button>
              );
            })}
          </div>

          {purposeError.length > 0 ? (
            <p role="alert" className="mt-2 text-[0.8125rem] text-action">
              {purposeError}
            </p>
          ) : null}

          <div className="mt-5 border-t border-divider" />
        </>
      ) : null}

      <p className="mt-5 text-[0.8125rem] font-normal text-ink">Your details</p>

      {/* First and last name sit side by side. Whichever is left empty turns red. */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="hero-first-name" className="sr-only">
            First name
          </label>
          <input
            id="hero-first-name"
            aria-required="true"
            aria-invalid={nameError.length > 0 && firstName.trim().length === 0}
            aria-describedby={nameError.length > 0 ? "hero-name-error" : undefined}
            value={firstName}
            onChange={(event) => onFirstName(event.target.value)}
            placeholder="First name"
            className={`${detailsField} ${
              nameError.length > 0 && firstName.trim().length === 0
                ? "border-action"
                : "border-line"
            }`}
          />
        </div>

        <div>
          <label htmlFor="hero-last-name" className="sr-only">
            Last name
          </label>
          <input
            id="hero-last-name"
            aria-required="true"
            aria-invalid={nameError.length > 0 && lastName.trim().length === 0}
            aria-describedby={nameError.length > 0 ? "hero-name-error" : undefined}
            value={lastName}
            onChange={(event) => onLastName(event.target.value)}
            placeholder="Last name"
            className={`${detailsField} ${
              nameError.length > 0 && lastName.trim().length === 0
                ? "border-action"
                : "border-line"
            }`}
          />
        </div>
      </div>
      {nameError.length > 0 ? (
        <p id="hero-name-error" role="alert" className="mt-1 text-[0.8125rem] text-action">
          {nameError}
        </p>
      ) : null}

      <label htmlFor="hero-email" className="sr-only">
        Your email
      </label>
      <input
        id="hero-email"
        type="email"
        aria-required="true"
        aria-invalid={emailError.length > 0}
        aria-describedby={emailError.length > 0 ? "hero-email-error" : undefined}
        value={email}
        onChange={(event) => onEmail(event.target.value)}
        placeholder="Enter your email"
        className={`${detailsField} ${emailError.length > 0 ? "border-action" : "border-line"}`}
      />
      {emailError.length > 0 ? (
        <p id="hero-email-error" role="alert" className="mt-1 text-[0.8125rem] text-action">
          {emailError}
        </p>
      ) : null}

      {/* Giving as an organization is optional, and it opens the name field when ticked. */}
      <label className="mt-4 flex cursor-pointer items-center gap-3 text-[0.8125rem] text-body">
        <input
          type="checkbox"
          checked={isOrganization}
          onChange={(event) => onToggleOrganization(event.target.checked)}
          className="size-4 shrink-0 accent-action"
        />
        Donating as an Organization
      </label>

      {isOrganization ? (
        <>
          <label htmlFor="hero-organization" className="sr-only">
            Organization
          </label>
          <input
            id="hero-organization"
            value={organization}
            onChange={(event) => onOrganization(event.target.value)}
            placeholder="Organization"
            className={`${detailsField} border-line`}
          />
        </>
      ) : null}

      {/* The sum the card will be charged, sitting right above the button. */}
      {showTotal ? (
        <p className="mt-6 text-[0.8125rem] text-body">
          Total amount: <span className="font-semibold text-ink">{totalLabel}</span>
        </p>
      ) : null}

      {/* The card route opens the card step in place. It is the only way to pay, so it fills the row. */}
      <div className="donate-actions mt-3">
        <button
          type="button"
          onClick={onOpenCard}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-action bg-surface px-2 text-[0.875rem] font-semibold whitespace-nowrap text-action transition-colors hover:bg-tint max-sm:min-h-11"
        >
          <CardIcon />
          Debit/Credit Card
        </button>

        {cardError.length > 0 ? (
          <p role="alert" className="mt-4 text-center text-[0.8125rem] text-action">
            {cardError}
          </p>
        ) : null}
      </div>
    </>
  );
}
