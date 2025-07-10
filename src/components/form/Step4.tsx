import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import FormValues, { Plan, Addon } from "../../types/form.types"
import { formatCurrency } from "../../helpers";

type Step4Props = {
  plans: Plan[];
  addons: Addon[];
  handleNav: (index: number) => Promise<void>;
};

export default function Step4({ plans, addons, handleNav }: Step4Props) {
  const { getValues } = useFormContext<FormValues>();

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.name === getValues("plan")),
    [getValues("plan")],
  );
  const selectedAddons = useMemo(
    () => addons.filter((addon) => getValues(`addons.${addon.name}`)),
    [getValues("addons")],
  );

  const totalPrice = useMemo(() => {
    const planPrice = selectedPlan ? selectedPlan.price : 0;
    const addonsPrice = selectedAddons.reduce(
      (acc, addon) => acc + addon.price,
      0,
    );
    return planPrice + addonsPrice;
  }, [selectedPlan, selectedAddons]);

  return (
    <div>
      <h1 className="my-3 md:mt-8">Resumé</h1>
      <p className="mb-5 md:mb-10">
      Vérifiez à nouveau que tout semble OK avant de confirmer.
      </p>

      <div className="flex flex-col rounded-xl bg-brand-magnolia p-5">
        <div className="flex items-center justify-between border-b pb-5">
          <div className="flex flex-col text-left">
            <h6 className="capitalize">
              {getValues("plan")} ({getValues("billing")})
            </h6>
            <button className="w-min" onClick={() => handleNav(2)}>
              <p className="text-xs underline hover:no-underline md:text-sm">
                Changer
              </p>
            </button>
          </div>
          <span className="text-nowrap font-bold text-brand-marine-blue">
            {getValues("billing") === "annuel"
              ? selectedPlan?.yearlyPrice
              : selectedPlan?.monthlyPrice}
          </span>
        </div>
        {addons.every((addon) => !getValues(`addons.${addon.name}`)) ? (
          <p className="mt-4 text-xs md:text-sm">Pas de garanties</p>
        ) : (
          addons.map(
            (addon) =>
              getValues(`addons.${addon.name}`) && (
                <div className="mt-4 flex justify-between" key={addon.name}>
                  <p className="text-xs md:text-sm">{addon.title}</p>
                  <span className="text-nowrap text-xs text-brand-marine-blue md:text-sm">
                    {getValues("billing") === "annuel"
                      ? addon.yearlyPrice
                      : addon.monthlyPrice}
                  </span>
                </div>
              ),
          )
        )}
      </div>

      <div className="flex items-center justify-between p-3 pt-5 md:p-8">
        <p>
          Total (par {getValues("billing") === "annuel" ? "année" : "mois"})
        </p>
        <span className="text-lg font-bold text-brand-purplish-blue md:text-xl">
          +
          {getValues("billing") === "annuel"
            ? formatCurrency(totalPrice * 10)
            : formatCurrency(totalPrice)}
          /{getValues("billing") === "annuel" ? "an" : "mo"}
        </span>
      </div>
    </div>
  );
}