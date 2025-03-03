import styles from "./Button.module.scss";

const Button = ({ children, type = "button", theme = "primary", onClick, className, overrideClass, ...rest }) => {
  const typeStyling = styles[`btn-${theme}`] || "";
  const classes = overrideClass ? className : `${className} ${styles["button"]} ${typeStyling}`;

  return (
    <button className={classes} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
