const Input = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};

export default Input;
