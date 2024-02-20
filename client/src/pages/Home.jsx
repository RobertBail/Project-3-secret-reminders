import { useQuery } from "@apollo/client";

import ReminderList from "../components/ReminderList";
import ReminderForm from "../components/ReminderForm";

import { QUERY_REMINDERS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_REMINDERS);

  const reminders = data?.reminders || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <ReminderForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ReminderList
              reminders={reminders}
              title="Some Secret Reminder(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
