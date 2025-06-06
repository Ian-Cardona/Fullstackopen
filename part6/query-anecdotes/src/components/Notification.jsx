import { useNotificationValue } from "./CounterContext";

const Notification = () => {
  const notification = useNotificationValue();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  console.log("notification", notification);

  return notification === "" ? null : <div style={style}>{notification}</div>;
};

export default Notification;
