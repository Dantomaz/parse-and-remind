import styles from "./Input.module.scss";

const Input = ({
  id,
  type = "text",
  className,
  label,
  labelClassName,
  labelStyle,
  containerClassName,
  containerStyle,
  register,
  formState,
  formError,
  showError,
  ...rest
}) => {
  const error = formState?.errors?.[id]?.message || formError;
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";

  const InputCheckbox = () => {
    return (
      <div className={`${styles["checkbox-group"]} ${containerClassName || ""}`} style={containerStyle}>
        <input id={id} type={type} className={`${styles["checkbox"]} ${className || ""}`} {...register} {...rest} />
        {label && (
          <label htmlFor={id} className={`${styles["checkbox-label"]} ${labelClassName || ""}`} style={labelStyle}>
            {label}
          </label>
        )}
        {showError && error && <span className={styles["error-message"]}>{error}</span>}
      </div>
    );
  };

  const InputRadio = () => {
    return (
      <div className={`${styles["radio-group"]} ${containerClassName || ""}`} style={containerStyle}>
        <input id={id} type={type} className={`${styles["radio"]} ${className || ""}`} {...register} {...rest} />
        {label && (
          <label htmlFor={id} className={`${styles["radio-label"]} ${labelClassName || ""}`} style={labelStyle}>
            {label}
          </label>
        )}
        {showError && error && <span className={styles["error-message"]}>{error}</span>}
      </div>
    );
  };

  const InputText = () => {
    return (
      <div className={`${styles["input-group"]} ${containerClassName || ""}`} style={containerStyle}>
        {label && (
          <label htmlFor={id} className={`${styles["input-label"]} ${labelClassName || ""}`} style={labelStyle}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={`${styles["input-field"]} ${error && styles["input-field-error"]} ${className || ""}`}
          {...register}
          {...rest}
        />
        {showError && error && <span className={styles["error-message"]}>{error}</span>}
      </div>
    );
  };

  return isCheckbox ? <InputCheckbox /> : isRadio ? <InputRadio /> : <InputText />;
};

export default Input;
