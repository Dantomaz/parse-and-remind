import styles from "./Select.module.scss";

const Option = ({ children, className, ...props }) => {
  return (
    <option className={`${styles["option"]} ${className || ""}`} {...props}>
      {children}
    </option>
  );
};

const Select = ({ children, id, className, register, ...props }) => {
  return (
    <select id={id} className={`${styles["select"]} ${className || ""}`} {...register} {...props}>
      {children}
    </select>
  );
};

Select.Option = Option;

export default Select;
