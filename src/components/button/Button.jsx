import styles from "./Button.module.scss";

const Button = ({ children, onClick, className, overrideClass, ...rest }) => {
  const classes = overrideClass ? className : `${className} ${styles["button"]}`;

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
