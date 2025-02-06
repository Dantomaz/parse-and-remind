import styles from "./Button.module.scss";

const Button = ({ children, onClick, className, overrideClass }) => {
  const classes = overrideClass ? className : `${className} ${styles["button"]}`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
