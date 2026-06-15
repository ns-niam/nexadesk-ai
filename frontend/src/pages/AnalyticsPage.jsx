import {
useEffect,
useState
} from "react";

import {
getCustomerActivity,
getFeedbacks
} from "../services/api";

function AnalyticsPage() {

const [
activities,
setActivities
] = useState([]);

const [
feedbacks,
setFeedbacks
] = useState([]);

useEffect(() => {


const loadAnalytics =
  async () => {

  try {

    const activityData =
      await getCustomerActivity();

    const feedbackData =
      await getFeedbacks();

    setActivities(
      activityData.customers || []
    );

    setFeedbacks(
      feedbackData.feedbacks || []
    );

  } catch (
    error
  ) {

    console.log(
      error
    );
  }
};

loadAnalytics();


}, []);

return (


<div
  style={{
    padding: "30px",
    color: "white",
    overflowY: "auto",
    height: "100vh",
  }}
>

  <h1>
    Analytics Center
  </h1>

  <p
    style={{
      color: "#9ca3af",
      marginBottom: "30px",
    }}
  >
    Customer activity and feedback insights.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    }}
  >

    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "14px",
      }}
    >
      <h3>
        Customer Activities
      </h3>

      <h1>
        {activities.length}
      </h1>
    </div>

    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "14px",
      }}
    >
      <h3>
        Feedback Records
      </h3>

      <h1>
        {feedbacks.length}
      </h1>
    </div>

  </div>

  <h2>
    Customer Activity
  </h2>

  <br />

{activities.length === 0 ? (

  <p>No customer activity available.</p>

) : (

  activities.map(
    (
      activity,
      index
    ) => (

      <div
        key={index}
        style={{
          background: "#1f2937",
          padding: "18px",
          marginBottom: "15px",
          borderRadius: "14px",
          border:
            "1px solid #374151",
        }}
      >
        <h3>
          Customer:
          {" "}
          {activity[0]}
        </h3>

        <p>
          Total Requests:
          {" "}
          {activity[1]}
        </p>

        <p>
          Open Tickets:
          {" "}
          {activity[2]}
        </p>
      </div>

    )
  )

)}



  <br />
  <br />

  <h2>
    Customer Feedbacks
    <p
  style={{
    color: "#9ca3af",
    marginBottom: "20px",
  }}
>
  Customer satisfaction and service quality reviews.
</p>
  </h2>

  <br />

  {feedbacks.length === 0 ? (

  <p>
    No feedback records available.
  </p>

) : (

  feedbacks.map(
    (
      feedback,
      index
    ) => (

      <div
        key={index}
        style={{
          background: "#1f2937",
          padding: "18px",
          marginBottom: "15px",
          borderRadius: "14px",
          border:
            "1px solid #374151",
        }}
      >

        <h3>
          Ticket:
          {" "}
          {feedback[1]}
        </h3>

        <p>
         <span
  style={{
    background: "#16a34a",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  }}
>
  ⭐ {feedback[2]}/5
</span>
        </p>

        <p>
          Feedback:
        </p>

        <div
          style={{
            background: "#111827",
            padding: "12px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          {feedback[3]}
        </div>

      </div>

    )
  )

)}

</div>


);
}

export default AnalyticsPage;
