import { useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import DatePicker from "../components/date";
import Spinner from "../components/spinner";
import Header from "../components/header";
import Budget from "@/components/budget";
import Category from "@/components/category";
import Activities from "@/components/activities";
import SelectOptions from "@/components/options";

export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const filterColors = (inputValue) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

export default function Plan() {
  const [formParams, setFormParams] = useState({
    destination: null,
    start_date: null,
    days: null,
    budget: null,
    group_type: null,
    travelers: null,
    interests: null,
    cuisineTypes: null,
  });
  const [formParamsError, setFormParamsError] = useState({});

  // console.log(formParams);

  const updateFormParams = useCallback(
    (newVal) => {
      if (!newVal) return;
      const [key] = Object.entries(newVal)[0];

      setFormParams({ ...formParams, ...newVal });

      setFormParamsError({ ...formParamsError, [key]: false });
    },
    [setFormParams, setFormParamsError, formParams, formParamsError]
  );

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let _formParamsError = {};

      Object.keys(formParams).forEach((key) => {
        if (!formParams[key]) {
          _formParamsError = Object.assign(_formParamsError, { [key]: true });
        }
      });

      setFormParamsError(_formParamsError);
    },
    [setFormParams, setFormParamsError, formParams, formParamsError]
  );

  return (
    <>
      <Header />
      <div className="text-center flex-1">
        <div className="container mx-auto mb-20 sm:mb-32 mt-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 sm:flex-[0_0_55%] sm:mx-auto">
              <div className="text-2xl sm:text-4xl font-medium mb-8 sm:mb-12 font-IBMPlex">
                Tell us your travel preferences
              </div>
              <form className="flex flex-col gap-10" onSubmit={onFormSubmit}>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      What is destination of choice?
                    </div>
                  </div>
                  <div>
                    <AsyncSelect
                      id="selectbox"
                      instanceId="selectbox"
                      cacheOptions
                      loadOptions={loadOptions}
                      hideSelectedOptions={true}
                      defaultOptions
                      className="react-select-container"
                      classNamePrefix="react-select"
                      backspaceRemovesValue
                      isClearable
                      onChange={(selectedVal) => {
                        if (!selectedVal) return;
                        const { value } = selectedVal;
                        updateFormParams({ destination: value });
                      }}
                    />
                    {formParamsError?.destination ? (
                      <div>Please select a destination</div>
                    ) : null}
                  </div>
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      When are you planning to travel?
                    </div>
                  </div>
                  <div className="border">
                    <DatePicker onChangeCallback={updateFormParams} />
                  </div>
                  {formParamsError?.start_date ? (
                    <div>Please select the start date your of your journey</div>
                  ) : null}
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      How many days are you planning to travel?
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-lg md:text-lg">Day</div>
                    <Spinner onChangeCallback={updateFormParams} />
                  </div>
                  {formParamsError?.travelers ? (
                    <div>Please select atleast one of traveler</div>
                  ) : null}
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      What is Your Budget?
                    </div>
                    <p className="-mt-4 mb-4 sm:mb-6 text-sm sm:text-base text-zinc-700 font-light">
                      The budget is exclusively allocated for activities and
                      dining purposes.
                    </p>
                  </div>
                  <div className="category">
                    <Budget onChangeCallback={updateFormParams} />
                    {formParamsError?.budget ? (
                      <div>Please select a destination</div>
                    ) : null}
                  </div>
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Who do you plan on traveling with on your next adventure?
                    </div>
                  </div>
                  <div className="category">
                    <Category onChangeCallback={updateFormParams} />
                    {formParamsError?.group_type ? (
                      <div>Please select a destination</div>
                    ) : null}
                  </div>
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Which activities are you interested in?
                    </div>
                  </div>
                  <div className="category">
                    <Activities onChangeCallback={updateFormParams} />
                    {formParamsError?.interests ? (
                      <div>Please select a destination</div>
                    ) : null}
                  </div>
                </div>
                <hr className="my-8"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Would you like to have these options?
                    </div>
                  </div>
                  <div className="">
                    <SelectOptions onChangeCallback={updateFormParams} />
                    {formParamsError?.cuisineTypes ? (
                      <div>Please select a destination</div>
                    ) : null}
                  </div>
                </div>
                <div className="w-full fixed bottom-0 left-0 py-4 border-t-2 bg-white border-gray-300 px-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-zinc-900 rounded-lg text-white font-medium py-3 px-8 w-fit text-center flex items-center justify-center gap-2 text-sm sm:text-base hover:opacity-90 transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
