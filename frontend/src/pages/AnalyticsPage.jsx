import {
  useEffect,
  useState
} from "react";

import {
  getCustomerActivity,
  getFeedbacks
} from "../services/api";

function AnalyticsPage() {

  // States

  const [
    activities,
    setActivities
  ] = useState([]);

  const [
    feedbacks,
    setFeedbacks
  ] = useState([]);

  // Effects

  useEffect(() => {

    const loadAnalytics =
      async () => {

      try {

        const activityData =
          await getCustomerActivity();

        const feedbackData =
          await getFeedbacks();

        setActivities(
          activityData.activities || []
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

  // UI

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
      }}
    >
      <h1>
        Analytics
      </h1>

      <br />

      <h2>
        Customer Activity
      </h2>

      <br />

      {activities.length === 0 ? (

        <p>
          No activity data
        </p>

      ) : (

        activities.map(
          (
            activity,
            index
          ) => (

            <div
              key={index}
              style={{
                background:
                  "#1f2937",
                padding:
                  "12px",
                marginBottom:
                  "10px",
                borderRadius:
                  "10px",
              }}
            >
              {
                JSON.stringify(
                  activity
                )
              }
            </div>
          )
        )

      )}

      <br />
      <br />

      <h2>
        Feedbacks
      </h2>

      <br />

      {feedbacks.length === 0 ? (

        <p>
          No feedbacks
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
                background:
                  "#1f2937",
                padding:
                  "12px",
                marginBottom:
                  "10px",
                borderRadius:
                  "10px",
              }}
            >
              {
                JSON.stringify(
                  feedback
                )
              }
            </div>
          )
        )

      )}

    </div>
  );
}

export default AnalyticsPage;
