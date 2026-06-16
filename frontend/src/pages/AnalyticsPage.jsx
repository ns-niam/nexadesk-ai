import {
  useEffect,
  useState
} from "react";

import {
  getCustomerActivity,
  getFeedbacks,
  getFeedbackStats,
  searchCustomer,
  getTopIntents
}
  from "../services/api";

function AnalyticsPage() {

  const [
    activities,
    setActivities
  ] = useState([]);

  const [
    feedbacks,
    setFeedbacks
  ] = useState([]);

  const [
    feedbackStats,
    setFeedbackStats
  ] = useState(null);

  const [
    searchName,
    setSearchName
  ] = useState("");

  const [
    customerResult,
    setCustomerResult
  ] = useState(null);

  const [
    topIntents,
    setTopIntents
  ] = useState([]);


  useEffect(() => {


    const loadAnalytics =
      async () => {

        try {

          const activityData =
            await getCustomerActivity();

          const feedbackData =
            await getFeedbacks();

          const statsData =
            await getFeedbackStats();

          const intentsData =
            await getTopIntents();

          setActivities(
            activityData.customers || []
          );

          setFeedbacks(
            feedbackData.feedbacks || []
          );

          setFeedbackStats(
            statsData
          );
          setTopIntents(
            intentsData.intents || []
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

  const handleCustomerSearch =
    async () => {

      if (!searchName) {
        return;
      }

      try {

        const data =
          await searchCustomer(
            searchName
          );

        setCustomerResult(
          data
        );

      } catch (
      error
      ) {

        console.log(error);
      }
    };

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

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "30px",
        }}
      >

        <h2>
          Customer Search
        </h2>

        <br />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <input
            value={searchName}
            onChange={(e) =>
              setSearchName(
                e.target.value
              )
            }
            placeholder="Enter customer name"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={
              handleCustomerSearch
            }
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Search
          </button>

        </div>

        {customerResult?.customers?.length > 0 && (

          <div
            style={{
              marginTop: "20px",
            }}
          >

            {customerResult.customers.map(
              (
                customer,
                index
              ) => (

                <div
                  key={index}
                  style={{
                    background: "#111827",
                    padding: "18px",
                    borderRadius: "12px",
                    border:
                      "1px solid #374151",
                    marginBottom: "10px",
                  }}
                >

                  <h3>
                    👤 {customer[1]}
                  </h3>

                  <p>
                    Customer ID:
                    {" "}
                    {customer[0]}
                  </p>

                  <p>
                    Total Requests:
                    {" "}
                    {customer[2]}
                  </p>

                  <p>
                    Open Tickets:
                    {" "}
                    {customer[3]}
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "30px",
        }}
      >

        <h2>
          Top Customer Intents
        </h2>

        <br />

        {topIntents.length === 0 ? (

          <p>
            No intent data available.
          </p>

        ) : (

          topIntents
            .slice(0, 5)
            .map(
              (
                intent,
                index
              ) => (

                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    padding: "10px 0",
                    borderBottom:
                      "1px solid #374151",
                  }}
                >

                  <span>
                    {intent[0]}
                  </span>

                  <strong>
                    {intent[1]}
                  </strong>

                </div>

              )
            )

        )}

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

      {feedbackStats && (

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "14px",
              minWidth: "220px",
            }}
          >
            <h3>
              Total Feedbacks
            </h3>

            <h1>
              {
                feedbackStats.total_feedbacks
              }
            </h1>
          </div>

          <div
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "14px",
              minWidth: "220px",
            }}
          >
            <h3>
              Average Rating
            </h3>

            <h1>
              ⭐ {
                feedbackStats.average_rating
              }
            </h1>
          </div>

        </div>

      )}

      <h2>
        Customer Feedbacks
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "20px",
        }}
      >
        Customer satisfaction and service quality reviews.
      </p>

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
