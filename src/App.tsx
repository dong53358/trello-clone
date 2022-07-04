import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, minutesState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChansge = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      ></input>
      <input
        onChange={onHoursChansge}
        value={hours}
        type="number"
        placeholder="Hours"
      ></input>
    </div>
  );
}

export default App;
