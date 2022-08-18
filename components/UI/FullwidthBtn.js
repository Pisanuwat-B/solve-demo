import styles from './FullwidthBtn.module.css';

const FullwidthBtn = (props) => {
  return (
    <div className={`${styles.button} ${styles[props.color]} ${styles[props.size]}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default FullwidthBtn;
