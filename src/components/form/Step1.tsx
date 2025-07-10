import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormValues from "../../types/form.types";
import { Input } from "rsuite";

export default function Step1() {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col">
      <h1 className="my-3 md:mt-8">Informations Personnelles</h1>
      <p className="mb-5 md:mb-10">
        Veuillez renaeigner les champs.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex grow justify-between">
            <label htmlFor="name">Nom</label>
            {errors.name && (
              <span className="text-xs font-bold text-brand-strawberry-red md:text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <input
            type="text"
            id="name"
            placeholder="e.g. Stephen King"
            className={errors.name && "border-brand-strawberry-red border border-solid border-gray-300 rounded"}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex grow justify-between">
            <label htmlFor="email">Adresse Email</label>
            {errors.email && (
              <span className="text-xs font-bold text-brand-strawberry-red md:text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <input
            type="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            className={"border-brand-strawberry-red border border-solid border-gray-300 rounded"}
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex grow justify-between">
            <label htmlFor="phone">Telephone</label>
            {errors.phone && (
              <span className="text-xs font-bold text-brand-strawberry-red md:text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                className={`phone-input ${errors.phone && "*:border-brand-strawberry-red border border-solid border-gray-300 rounded"}`}
                value={value}
                onChange={onChange}
                defaultCountry="US"
                placeholder="e.g. +1 234 567 890"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}