import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [schedule, setschedule] = useState([]);
  const [dates, setDates] = useState("2021-05-19");
  useEffect(() => {
    fetch("/schedule.json")
      .then((res) => res.json())
      .then((data) => setschedule(data));
  }, []);
  let fullDate = [];
  let itemDate = [];
  for (const dates of schedule) {
    if (itemDate.indexOf(dates.item_date) === -1) {
      itemDate.push(dates.item_date);
      fullDate.push(dates.schedule_time.split(" ")[1]);
    }
  }

  const matchedDate = schedule.filter((element) => element.item_date === dates);
  const result = matchedDate.map((element) =>
    new Date(element.schedule_time).toDateString()
  );
  let scheduleCount = {};
  result.forEach((x) => (scheduleCount[x] = (scheduleCount[x] || 0) + 1));
  let totalSchedule = [];
  for (const [key, value] of Object.entries(scheduleCount)) {
    if (key && value) {
      totalSchedule.push(
        `${key.split(" ")[2]}th ${key.split(" ")[1]} : ${value} Scheduled`
      );
    }
  }
  const handleDates = (date) => {
    setDates(date);
  };

  return (
    <Container className=" pt-3">
      <h1 style={{ fontFamily: "cursive" }} className="text-center mb-5">
        Scheduler :{" "}
      </h1>
      <Row
        className="align-items-center justify-content-around bg-secondary rounded mb-5"
        xs={1}
        sm={1}
        md={2}
        lg={2}
      >
        <Col>
          <Row
            className="p-5"
            style={{ overflowY: "scroll", height: "450px" }}
            md={4}
          >
            {itemDate.map((date) => (
              <div
                key={date}
                onClick={() => handleDates(date)}
                className="dates"
              >
                {new Date(date).toDateString()}
              </div>
            ))}
          </Row>
        </Col>
        <Col className="ps-5">
          <ul className="list-inline text-white">
            {totalSchedule.map((value) => (
              <li key={value} className="pb-3">
                <h4>{value}</h4>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
