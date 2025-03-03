import { useFieldArray, useForm } from "react-hook-form";
import { HiMinus, HiPlus } from "react-icons/hi";
import { transformReminderMinutesToDifferentUnits } from "../../../api/googleCalendarApi";
import { isStringBlank } from "../../../utils";
import Button from "../../button/Button";
import Input from "../../input/Input";
import Select from "../../select/Select";
import styles from "./EventEditForm.module.scss";

const EventEditForm = ({ event, onSubmit, form }) => {
  const { register, handleSubmit, formState, watch, control } = useForm({
    defaultValues: { ...transformReminderMinutesToDifferentUnits(event) },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "reminders.overrides" });

  const isDefaultReminderSet = watch("reminders.useDefault");

  const addReminder = () => {
    append({});
  };

  const removeReminder = (index) => {
    remove(index);
  };

  const SelectReminderOptions = ({ index }) => {
    return (
      <div className={styles["select-container"]}>
        <Button className={styles["button"]} theme="ghost" onClick={() => removeReminder(index)}>
          <HiMinus />
        </Button>
        <Select defaultValue="popup" register={{ ...register(`reminders.overrides[${index}].method`) }}>
          field
          <Select.Option value="popup">Popup</Select.Option>
          <Select.Option value="email">E-mail</Select.Option>
        </Select>
        <Input
          id={`reminder${index}`}
          type="number"
          defaultValue={1}
          register={{
            ...register(`reminders.overrides[${index}].time`, {
              validate: {
                notNegative: (number) => number > 0 || "Time has to be a positive number",
              },
            }),
          }}
          formState={formState}
          showError
        />
        <Select defaultValue="days" register={{ ...register(`reminders.overrides[${index}].units`) }}>
          <Select.Option value="minutes">minutes</Select.Option>
          <Select.Option value="hours">hours</Select.Option>
          <Select.Option value="days">days</Select.Option>
          <Select.Option value="weeks">weeks</Select.Option>
        </Select>
      </div>
    );
  };

  return (
    <form id={form} className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="title"
        type="text"
        register={{
          ...register("summary", {
            required: "Title is required",
            validate: {
              notBlank: (title) => !isStringBlank(title) || "Title cannot be empty",
            },
          }),
        }}
        formState={formState}
        showError
      />
      <Input
        id="reminderDefault"
        type="checkbox"
        label="Default reminder"
        register={{
          ...register("reminders.useDefault"),
        }}
      />
      {!isDefaultReminderSet && (
        <div className={styles["gap"]}>
          <div className={styles["select-group"]}>
            {fields.map((field, index) => (
              <SelectReminderOptions key={index} index={index} />
            ))}
          </div>

          <Button className={styles["button"]} theme="ghost" onClick={addReminder}>
            <HiPlus />
            Add reminder
          </Button>
        </div>
      )}
    </form>
  );
};

export default EventEditForm;
